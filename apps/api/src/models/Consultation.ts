import mongoose, { Schema, Document } from "mongoose";

export interface IWorkflowStage extends Document {
  consultationId: mongoose.Types.ObjectId;
  key: string;
  title: string;
  description: string;
  position: number;
  status: string;
  stateLabel: string;
  startedAt?: Date | null;
  unlockedAt?: Date | null;
  completedAt?: Date | null;
  rejectedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const workflowStageSchema = new Schema<IWorkflowStage>(
  {
    consultationId: { type: Schema.Types.ObjectId, ref: "Consultation", required: true },
    key: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    position: { type: Number, required: true },
    status: { type: String, default: "locked" },
    stateLabel: { type: String, default: "Locked" },
    startedAt: { type: Date, default: null },
    unlockedAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },
    rejectedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

workflowStageSchema.index({ consultationId: 1, position: 1 });
workflowStageSchema.index({ consultationId: 1, key: 1 }, { unique: true });

export interface IWorkflowLog extends Document {
  consultationId: mongoose.Types.ObjectId;
  stageId?: mongoose.Types.ObjectId | null;
  stageKey?: string | null;
  action: string;
  actorId?: string | null;
  actorEmail?: string | null;
  actorRole?: string | null;
  note?: string | null;
  metadata?: Record<string, unknown> | null;
  createdAt: Date;
}

const workflowLogSchema = new Schema<IWorkflowLog>(
  {
    consultationId: { type: Schema.Types.ObjectId, ref: "Consultation", required: true },
    stageId: { type: Schema.Types.ObjectId, ref: "WorkflowStage", default: null },
    stageKey: { type: String, default: null },
    action: { type: String, required: true },
    actorId: { type: String, default: null },
    actorEmail: { type: String, default: null },
    actorRole: { type: String, default: null },
    note: { type: String, default: null },
    metadata: { type: Schema.Types.Mixed }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

workflowLogSchema.index({ consultationId: 1, createdAt: -1 });

export interface IUploadedDocument extends Document {
  consultationId: mongoose.Types.ObjectId;
  stageId?: mongoose.Types.ObjectId | null;
  stageKey?: string | null;
  kind: string;
  filename: string;
  mimeType: string;
  size: number;
  url?: string | null;
  provider: string;
  providerId?: string | null;
  uploadedBy: string;
  createdAt: Date;
}

const uploadedDocumentSchema = new Schema<IUploadedDocument>(
  {
    consultationId: { type: Schema.Types.ObjectId, ref: "Consultation", required: true },
    stageId: { type: Schema.Types.ObjectId, ref: "WorkflowStage", default: null },
    stageKey: { type: String, default: null },
    kind: { type: String, default: "submission" },
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    url: { type: String, default: null },
    provider: { type: String, default: "metadata" },
    providerId: { type: String, default: null },
    uploadedBy: { type: String, default: "client" }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

uploadedDocumentSchema.index({ consultationId: 1, kind: 1 });

export interface IStatusHistory extends Document {
  consultationId: mongoose.Types.ObjectId;
  stageId?: mongoose.Types.ObjectId | null;
  stageKey?: string | null;
  fromStatus?: string | null;
  toStatus: string;
  label?: string | null;
  changedBy?: string | null;
  note?: string | null;
  createdAt: Date;
}

const statusHistorySchema = new Schema<IStatusHistory>(
  {
    consultationId: { type: Schema.Types.ObjectId, ref: "Consultation", required: true },
    stageId: { type: Schema.Types.ObjectId, ref: "WorkflowStage", default: null },
    stageKey: { type: String, default: null },
    fromStatus: { type: String, default: null },
    toStatus: { type: String, required: true },
    label: { type: String, default: null },
    changedBy: { type: String, default: null },
    note: { type: String, default: null }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

statusHistorySchema.index({ consultationId: 1, createdAt: -1 });

export interface IConsultation extends Document {
  trackingToken: string;
  division: string;
  fullName: string;
  companyName: string;
  emailAddress: string;
  phoneNumber: string;
  serviceType: string;
  budgetRange: string;
  projectTimeline: string;
  projectDescription: string;
  preferredConsultationType: string;
  source: string;
  status: string;
  currentStageKey: string;
  notificationSent: boolean;
  notificationSkipped: boolean;
  notificationError?: string | null;
  notificationSentAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const consultationSchema = new Schema<IConsultation>(
  {
    trackingToken: { type: String, required: true, unique: true },
    division: { type: String, default: "ractysh-group" },
    fullName: { type: String, required: true },
    companyName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    serviceType: { type: String, required: true },
    budgetRange: { type: String, required: true },
    projectTimeline: { type: String, required: true },
    projectDescription: { type: String, required: true },
    preferredConsultationType: { type: String, required: true },
    source: { type: String, default: "book-consultation-page" },
    status: { type: String, default: "new", index: true },
    currentStageKey: { type: String, default: "internal_review" },
    notificationSent: { type: Boolean, default: false },
    notificationSkipped: { type: Boolean, default: false },
    notificationError: { type: String, default: null },
    notificationSentAt: { type: Date, default: null }
  },
  { timestamps: true }
);

consultationSchema.index({ emailAddress: 1 });
consultationSchema.index({ division: 1, status: 1, createdAt: -1 });
consultationSchema.index({ createdAt: -1 });

export const WorkflowStageModel = mongoose.models.WorkflowStage || mongoose.model<IWorkflowStage>("WorkflowStage", workflowStageSchema);
export const WorkflowLogModel = mongoose.models.WorkflowLog || mongoose.model<IWorkflowLog>("WorkflowLog", workflowLogSchema);
export const UploadedDocumentModel = mongoose.models.UploadedDocument || mongoose.model<IUploadedDocument>("UploadedDocument", uploadedDocumentSchema);
export const StatusHistoryModel = mongoose.models.StatusHistory || mongoose.model<IStatusHistory>("StatusHistory", statusHistorySchema);
export const ConsultationModel = mongoose.models.Consultation || mongoose.model<IConsultation>("Consultation", consultationSchema);
