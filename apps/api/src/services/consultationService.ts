import mongoose from "mongoose";
import { randomUUID } from "node:crypto";
import {
  ConsultationModel,
  WorkflowStageModel,
  WorkflowLogModel,
  UploadedDocumentModel,
  StatusHistoryModel,
  type IConsultation
} from "../models/Consultation.js";
import {
  workflowStepDefinitions,
  type ConsultationAttachment,
  type ConsultationNotification,
  type ConsultationRecord,
  type ConsultationWorkflowStage,
  type StatusHistoryRecord,
  type UploadedDocumentKind,
  type WorkflowLogRecord,
  type WorkflowStageStatus
} from "../types/consultation.js";
import type { ConsultationSubmissionInput } from "../validation/consultation.js";
import { publishConsultationUpdate } from "./consultationWorkflowEvents.js";
import { safelyIngestDocument, safelyIngestLead } from "./ingestionService.js";
import { isMongoConnected } from "../lib/db.js";

let mongoEnabled = false;
let memoryConsultations: ConsultationRecord[] = [];

export function setConsultationPrismaEnabled(value: boolean): void {
  mongoEnabled = value;
}

function iso(value: Date | string | null | undefined): string | undefined {
  if (!value) return undefined;
  return new Date(value).toISOString();
}

function stageLabelFor(status: WorkflowStageStatus): string {
  if (status === "active") return "Waiting for Approval";
  if (status === "completed") return "Completed";
  if (status === "rejected") return "Rejected";
  if (status === "waiting") return "Waiting";
  return "Locked";
}

function defaultWorkflowStages(now: Date): ConsultationWorkflowStage[] {
  return workflowStepDefinitions.map((step, index) => {
    const isSubmitted = step.key === "consultation_submitted";
    const isInternalReview = step.key === "internal_review";
    const status: WorkflowStageStatus = isSubmitted ? "completed" : isInternalReview ? "active" : "locked";

    return {
      id: randomUUID(),
      key: step.key,
      title: step.title,
      description: step.description,
      position: index + 1,
      status,
      stateLabel: stageLabelFor(status),
      startedAt: isSubmitted || isInternalReview ? now.toISOString() : undefined,
      unlockedAt: isSubmitted || isInternalReview ? now.toISOString() : undefined,
      completedAt: isSubmitted ? now.toISOString() : undefined,
      rejectedAt: undefined,
      updatedAt: now.toISOString(),
      responseDocuments: []
    };
  });
}

async function findConsultation(id: string): Promise<ConsultationRecord | null> {
  try {
    const record = await ConsultationModel.findById(id).lean() as mongoose.FlattenMaps<IConsultation> | null;
    if (!record) return null;

    const [workflowStages, workflowLogs, uploadedDocuments, statusHistory] = await Promise.all([
      WorkflowStageModel.find({ consultationId: record._id }).sort({ position: 1 }).lean(),
      WorkflowLogModel.find({ consultationId: record._id }).sort({ createdAt: -1 }).lean(),
      UploadedDocumentModel.find({ consultationId: record._id }).sort({ createdAt: 1 }).lean(),
      StatusHistoryModel.find({ consultationId: record._id }).sort({ createdAt: -1 }).lean()
    ]);

    const documents = uploadedDocuments.map((doc) => ({
      id: String(doc._id),
      filename: doc.filename,
      mimeType: doc.mimeType,
      size: doc.size,
      url: doc.url || undefined,
      provider: (doc.provider || "metadata") as ConsultationAttachment["provider"],
      providerId: doc.providerId || undefined,
      kind: doc.kind as UploadedDocumentKind,
      stageKey: doc.stageKey || undefined,
      uploadedBy: doc.uploadedBy,
      createdAt: iso(doc.createdAt)
    }));

    const stages = workflowStages.map((stage) => ({
      id: String(stage._id),
      key: stage.key as ConsultationWorkflowStage["key"],
      title: stage.title,
      description: stage.description,
      position: stage.position,
      status: stage.status as WorkflowStageStatus,
      stateLabel: stage.stateLabel,
      startedAt: iso(stage.startedAt),
      unlockedAt: iso(stage.unlockedAt),
      completedAt: iso(stage.completedAt),
      rejectedAt: iso(stage.rejectedAt),
      updatedAt: iso(stage.updatedAt) || new Date().toISOString(),
      responseDocuments: documents.filter((d) => d.kind === "response" && d.stageKey === stage.key)
    }));

    return {
      _id: String(record._id),
      id: String(record._id),
      trackingToken: record.trackingToken,
      fullName: record.fullName,
      companyName: record.companyName,
      emailAddress: record.emailAddress,
      phoneNumber: record.phoneNumber,
      serviceType: record.serviceType as ConsultationSubmissionInput["serviceType"],
      division: record.division,
      budgetRange: record.budgetRange,
      projectTimeline: record.projectTimeline,
      projectDescription: record.projectDescription,
      preferredConsultationType: record.preferredConsultationType as ConsultationSubmissionInput["preferredConsultationType"],
      attachments: documents.filter((d) => d.kind === "submission"),
      documents,
      workflowStages: stages,
      logs: workflowLogs.map((log) => ({
        id: String(log._id),
        consultationId: String(log.consultationId),
        stageId: log.stageId ? String(log.stageId) : undefined,
        stageKey: log.stageKey || undefined,
        action: log.action,
        actorId: log.actorId || undefined,
        actorEmail: log.actorEmail || undefined,
        actorRole: log.actorRole || undefined,
        note: log.note || undefined,
        createdAt: iso(log.createdAt) || new Date().toISOString()
      })),
      statusHistory: statusHistory.map((h) => ({
        id: String(h._id),
        consultationId: String(h.consultationId),
        stageId: h.stageId ? String(h.stageId) : undefined,
        stageKey: h.stageKey || undefined,
        fromStatus: h.fromStatus || undefined,
        toStatus: h.toStatus,
        label: h.label || undefined,
        changedBy: h.changedBy || undefined,
        note: h.note || undefined,
        createdAt: iso(h.createdAt) || new Date().toISOString()
      })),
      currentStageKey: record.currentStageKey as ConsultationRecord["currentStageKey"],
      status: record.status as ConsultationRecord["status"],
      source: record.source,
      notification: {
        sent: record.notificationSent,
        skipped: record.notificationSkipped || undefined,
        error: record.notificationError || undefined,
        sentAt: iso(record.notificationSentAt)
      },
      createdAt: iso(record.createdAt) || new Date().toISOString(),
      updatedAt: iso(record.updatedAt) || new Date().toISOString()
    };
  } catch {
    return null;
  }
}

async function captureConsultationIngestion(record: ConsultationRecord): Promise<void> {
  const lead = await safelyIngestLead({
    fullName: record.fullName,
    email: record.emailAddress,
    phone: record.phoneNumber || undefined,
    companyName: record.companyName || undefined,
    source: record.source || "book-consultation-page",
    division: record.division,
    sourceType: "book_consultation_form",
    service: record.serviceType,
    status: "new",
    message: record.projectDescription,
    metadata: {
      budgetRange: record.budgetRange,
      projectTimeline: record.projectTimeline,
      preferredConsultationType: record.preferredConsultationType,
      trackingToken: record.trackingToken
    },
    externalEntityId: record.id,
    externalEntityModel: "Consultation"
  });

  if (!record.documents.length) return;

  await Promise.all(
    record.documents
      .filter((document) => document.kind === "submission")
      .map((document) =>
        safelyIngestDocument({
          sourceType: "book_consultation_form",
          filename: document.filename,
          mimeType: document.mimeType,
          size: document.size,
          url: document.url,
          provider: document.provider || "metadata",
          providerId: document.providerId,
          category: "Consultation Requirement",
          division: record.division,
          projectId: record.id,
          projectName: record.serviceType,
          uploadedBy: "client",
          uploadDate: document.createdAt ? new Date(document.createdAt) : undefined,
          metadata: {
            consultationId: record.id,
            leadId: lead?.entityId,
            stageKey: document.stageKey,
            trackingToken: record.trackingToken
          }
        })
      )
  );
}

export async function createConsultation(
  input: ConsultationSubmissionInput & { attachments: ConsultationAttachment[]; source: string }
): Promise<ConsultationRecord> {
  const now = new Date();

  if (!mongoEnabled) {
    const id = randomUUID();
    const stages = defaultWorkflowStages(now);
    const submittedStage = stages.find((stage) => stage.key === "consultation_submitted");
    const documents = input.attachments.map((attachment) => ({
      ...attachment,
      id: randomUUID(),
      kind: "submission" as const,
      stageKey: "consultation_submitted" as const,
      uploadedBy: "client",
      createdAt: now.toISOString()
    }));
    const record: ConsultationRecord = {
      ...input,
      _id: id,
      id,
      trackingToken: randomUUID(),
      status: "new",
      currentStageKey: "internal_review",
      attachments: documents,
      documents,
      workflowStages: stages.map((stage) =>
        stage.key === submittedStage?.key ? { ...stage, responseDocuments: [] } : stage
      ),
      logs: [
        {
          id: randomUUID(),
          consultationId: id,
          stageId: submittedStage?.id,
          stageKey: "consultation_submitted",
          action: "submitted",
          actorRole: "client",
          note: "Consultation documents submitted by client.",
          createdAt: now.toISOString()
        }
      ],
      statusHistory: [
        {
          id: randomUUID(),
          consultationId: id,
          stageId: submittedStage?.id,
          stageKey: "consultation_submitted",
          toStatus: "completed",
          label: "Consultation Submitted",
          changedBy: "client",
          createdAt: now.toISOString()
        },
        {
          id: randomUUID(),
          consultationId: id,
          stageKey: "internal_review",
          toStatus: "active",
          label: "Waiting for Approval",
          changedBy: "system",
          createdAt: now.toISOString()
        }
      ],
      notification: { sent: false, skipped: true },
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    memoryConsultations = [record, ...memoryConsultations].slice(0, 200);
    publishConsultationUpdate(id);
    return record;
  }

  const consultation = await ConsultationModel.create({
    trackingToken: randomUUID(),
    fullName: input.fullName,
    division: input.division,
    companyName: input.companyName,
    emailAddress: input.emailAddress,
    phoneNumber: input.phoneNumber,
    serviceType: input.serviceType,
    budgetRange: input.budgetRange,
    projectTimeline: input.projectTimeline,
    projectDescription: input.projectDescription,
    preferredConsultationType: input.preferredConsultationType,
    source: input.source,
    status: "new",
    currentStageKey: "internal_review"
  });

  const stageRows = workflowStepDefinitions.map((step, index) => {
    const isSubmitted = step.key === "consultation_submitted";
    const isInternalReview = step.key === "internal_review";
    const status: WorkflowStageStatus = isSubmitted ? "completed" : isInternalReview ? "active" : "locked";

    return {
      consultationId: consultation._id,
      key: step.key,
      title: step.title,
      description: step.description,
      position: index + 1,
      status,
      stateLabel: stageLabelFor(status),
      startedAt: isSubmitted || isInternalReview ? now : undefined,
      unlockedAt: isSubmitted || isInternalReview ? now : undefined,
      completedAt: isSubmitted ? now : undefined
    };
  });

  const stages = await WorkflowStageModel.insertMany(stageRows);
  const submittedStage = stages.find((s) => s.key === "consultation_submitted");

  if (input.attachments.length) {
    await UploadedDocumentModel.insertMany(
      input.attachments.map((attachment) => ({
        consultationId: consultation._id,
        stageId: submittedStage?._id,
        stageKey: "consultation_submitted",
        kind: "submission",
        filename: attachment.filename,
        mimeType: attachment.mimeType,
        size: attachment.size,
        url: attachment.url,
        provider: attachment.provider || "metadata",
        providerId: attachment.providerId,
        uploadedBy: "client"
      }))
    );
  }

  await WorkflowLogModel.create({
    consultationId: consultation._id,
    stageId: submittedStage?._id,
    stageKey: "consultation_submitted",
    action: "submitted",
    actorRole: "client",
    note: "Consultation documents submitted by client."
  });

  await StatusHistoryModel.insertMany([
    {
      consultationId: consultation._id,
      stageId: submittedStage?._id,
      stageKey: "consultation_submitted",
      toStatus: "completed",
      label: "Consultation Submitted",
      changedBy: "client"
    },
    {
      consultationId: consultation._id,
      stageKey: "internal_review",
      toStatus: "active",
      label: "Waiting for Approval",
      changedBy: "system"
    }
  ]);

  const record = await findConsultation(String(consultation._id));
  if (!record) throw new Error("Consultation workflow could not be loaded after creation.");

  await captureConsultationIngestion(record);
  publishConsultationUpdate(String(consultation._id));
  return record;
}

export async function getConsultationWorkflow(
  id: string,
  trackingToken?: string
): Promise<ConsultationRecord | null> {
  if (!mongoEnabled) {
    const record = memoryConsultations.find((item) => item._id === id || item.id === id);
    if (!record) return null;
    if (trackingToken && record.trackingToken !== trackingToken) return null;
    return record;
  }

  const record = await findConsultation(id);
  if (!record) return null;
  if (trackingToken && record.trackingToken !== trackingToken) return null;
  return record;
}

export async function updateConsultationNotification(
  id: string | undefined,
  notification: ConsultationNotification
): Promise<void> {
  if (!id) return;

  if (!mongoEnabled) {
    memoryConsultations = memoryConsultations.map((record) =>
      record._id === id || record.id === id
        ? {
            ...record,
            notification,
            updatedAt: new Date().toISOString()
          }
        : record
    );
    publishConsultationUpdate(id);
    return;
  }

  await ConsultationModel.findByIdAndUpdate(id, {
    $set: {
      notificationSent: notification.sent,
      notificationSkipped: Boolean(notification.skipped),
      notificationError: notification.error,
      notificationSentAt: notification.sentAt ? new Date(notification.sentAt) : undefined
    }
  });
  publishConsultationUpdate(id);
}
