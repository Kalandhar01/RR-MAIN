import {
  IngestionEventModel,
  LeadModel,
  IngestedProjectModel,
  IngestedDocumentModel,
  IngestedMediaModel,
  type IIngestionEvent
} from "../models/Ingestion.js";
import type {
  DocumentIngestionInput,
  LeadIngestionInput,
  MediaIngestionInput,
  ProjectIngestionInput,
  ProjectUpdateIngestionInput
} from "../validation/ingestion.js";
import { isMongoConnected } from "../lib/db.js";

export class IngestionDatabaseUnavailableError extends Error {
  constructor() {
    super("Enterprise ingestion database is unavailable.");
    this.name = "IngestionDatabaseUnavailableError";
  }
}

export interface EntityIngestionResult {
  eventId: string;
  entityId: string;
  aiSummary: string;
}

export interface NewsletterIngestionInput {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  featured: boolean;
  status: string;
  publishDate: string | null;
  tags: string[];
  action: "created" | "updated";
}

let ingestionMongoEnabled = false;

export function setIngestionPrismaEnabled(value: boolean): void {
  ingestionMongoEnabled = value;
}

function assertDatabase(): void {
  if (!ingestionMongoEnabled) {
    throw new IngestionDatabaseUnavailableError();
  }
}

function excerpt(value: string | undefined, limit = 190): string {
  const trimmed = value?.replace(/\s+/g, " ").trim();
  if (!trimmed) return "";
  return trimmed.length <= limit ? trimmed : `${trimmed.slice(0, limit - 1)}...`;
}

function sourceLabel(sourceType: string): string {
  const labels: Record<string, string> = {
    website_contact_form: "website contact form",
    book_consultation_form: "book consultation form",
    newsletter_form: "newsletter form",
    service_inquiry_form: "service inquiry form",
    career_form: "career form",
    admin_newsletter: "admin newsletter desk",
    admin_project: "admin project desk",
    admin_document: "admin document desk",
    admin_media: "admin media desk",
    api: "API ingestion"
  };

  return labels[sourceType] || "enterprise ingestion";
}

function leadSummary(input: LeadIngestionInput): string {
  const leadState = input.status === "new" ? "New lead" : `${input.status} lead`;
  const parts = [
    `${leadState} from ${sourceLabel(input.sourceType)}`,
    input.service ? `for ${input.service}` : undefined,
    input.location ? `in ${input.location}` : undefined,
    input.companyName ? `from ${input.companyName}` : undefined
  ].filter(Boolean);
  const message = excerpt(input.message);

  return `${parts.join(" ")}.${message ? ` Signal: ${message}` : ""}`;
}

function newsletterSummary(input: NewsletterIngestionInput): string {
  const timing = input.status === "published" ? "published" : input.status;
  return `Newsletter ${input.action}: ${input.title} in ${input.category}, currently ${timing}.${input.excerpt ? ` Brief: ${excerpt(input.excerpt)}` : ""}`;
}

function projectSummary(input: ProjectIngestionInput | ProjectUpdateIngestionInput): string {
  const title = input.title || "Project update";
  const status = input.status ? `status ${input.status}` : "status unchanged";
  const progress = typeof input.progress === "number" ? `${input.progress}% progress` : "progress unchanged";
  const owner = input.owner ? `owned by ${input.owner}` : "owner unassigned";
  const dueDate = input.dueDate ? `due ${input.dueDate.toISOString().slice(0, 10)}` : "without a due date";

  return `${title}: ${status}, ${progress}, ${owner}, ${dueDate}.${input.summary ? ` Brief: ${excerpt(input.summary)}` : ""}`;
}

function documentSummary(input: DocumentIngestionInput): string {
  const project = input.projectName ? ` for ${input.projectName}` : "";
  return `${input.category} document ingested${project}: ${input.filename}.${input.mimeType ? ` Type: ${input.mimeType}.` : ""}`;
}

function mediaSummary(input: MediaIngestionInput): string {
  const tags = input.tags.length ? ` Tags: ${input.tags.join(", ")}.` : "";
  return `${input.kind} media ingested for ${input.category}: ${input.title}.${input.altText ? ` Description: ${excerpt(input.altText)}` : ""}${tags}`;
}

export async function ingestLead(input: LeadIngestionInput): Promise<EntityIngestionResult> {
  assertDatabase();

  const aiSummary = leadSummary(input);
  const event = await IngestionEventModel.create({
    sourceType: input.sourceType,
    entityType: "lead",
    status: "completed",
    priority: "high",
    source: input.source,
    division: input.division || "ractysh-group",
    service: input.service,
    location: input.location,
    payload: input as unknown as Record<string, unknown>,
    aiSummary,
    startedAt: new Date(),
    processedAt: new Date()
  });

  const lead = await LeadModel.create({
    fullName: input.fullName,
    division: input.division,
    email: input.email,
    phone: input.phone,
    companyName: input.companyName,
    source: input.source,
    sourceType: input.sourceType,
    service: input.service,
    location: input.location,
    status: input.status,
    message: input.message,
    aiSummary,
    metadata: {
      ...input.metadata,
      externalEntityId: input.externalEntityId,
      externalEntityModel: input.externalEntityModel
    },
    ingestionEventId: event._id
  });

  await IngestionEventModel.findByIdAndUpdate(event._id, {
    $set: { entityId: String(lead._id), entityModel: "Lead" }
  });

  return { eventId: String(event._id), entityId: String(lead._id), aiSummary };
}

export async function ingestNewsletter(input: NewsletterIngestionInput): Promise<{ eventId: string; aiSummary: string }> {
  assertDatabase();

  const aiSummary = newsletterSummary(input);
  const event = await IngestionEventModel.create({
    sourceType: "admin_newsletter",
    entityType: "newsletter",
    status: "completed",
    priority: "high",
    source: "admin",
    service: "Executive Intelligence",
    division: "ractysh-group",
    payload: input as unknown as Record<string, unknown>,
    aiSummary,
    entityId: input.id,
    entityModel: "Newsletter",
    startedAt: new Date(),
    processedAt: new Date()
  });

  return { eventId: String(event._id), aiSummary };
}

export async function ingestProject(input: ProjectIngestionInput): Promise<EntityIngestionResult> {
  assertDatabase();

  const aiSummary = projectSummary(input);
  const event = await IngestionEventModel.create({
    sourceType: "admin_project",
    entityType: "project",
    status: "completed",
    priority: input.priority || "high",
    source: "admin",
    division: input.division,
    service: input.division,
    location: input.location,
    payload: input as unknown as Record<string, unknown>,
    aiSummary,
    startedAt: new Date(),
    processedAt: new Date()
  });

  const project = await IngestedProjectModel.create({
    title: input.title,
    division: input.division,
    status: input.status,
    progress: input.progress,
    owner: input.owner,
    dueDate: input.dueDate,
    priority: input.priority,
    budget: input.budget,
    location: input.location,
    summary: input.summary,
    aiSummary,
    metadata: input.metadata as Record<string, unknown>,
    ingestionEventId: event._id
  });

  await IngestionEventModel.findByIdAndUpdate(event._id, {
    $set: { entityId: String(project._id), entityModel: "IngestedProject" }
  });

  return { eventId: String(event._id), entityId: String(project._id), aiSummary };
}

export async function updateIngestedProject(
  id: string,
  input: ProjectUpdateIngestionInput
): Promise<EntityIngestionResult> {
  assertDatabase();

  const aiSummary = projectSummary(input);
  const project = await IngestedProjectModel.findByIdAndUpdate(
    id,
    {
      $set: {
        title: input.title,
        division: input.division,
        status: input.status,
        progress: input.progress,
        owner: input.owner,
        dueDate: input.dueDate,
        priority: input.priority,
        budget: input.budget,
        location: input.location,
        summary: input.summary,
        aiSummary,
        metadata: input.metadata as Record<string, unknown>
      }
    },
    { new: true }
  ).lean();

  if (!project) throw new Error("Ingested project not found.");

  const event = await IngestionEventModel.create({
    sourceType: "admin_project",
    entityType: "project",
    status: "completed",
    priority: project.priority,
    source: "admin",
    division: project.division,
    service: project.division,
    location: project.location,
    payload: { action: "updated", id, changes: input } as unknown as Record<string, unknown>,
    aiSummary,
    entityId: String(project._id),
    entityModel: "IngestedProject",
    startedAt: new Date(),
    processedAt: new Date()
  });

  return { eventId: String(event._id), entityId: String(project._id), aiSummary };
}

export async function ingestDocument(input: DocumentIngestionInput): Promise<EntityIngestionResult> {
  assertDatabase();

  const aiSummary = documentSummary(input);
  const event = await IngestionEventModel.create({
    sourceType: input.sourceType,
    entityType: "document",
    status: "completed",
    priority: "high",
    source: input.uploadedBy || "admin",
    division: input.division,
    service: input.category,
    payload: input as unknown as Record<string, unknown>,
    aiSummary,
    startedAt: new Date(),
    processedAt: new Date()
  });

  const document = await IngestedDocumentModel.create({
    filename: input.filename,
    division: input.division,
    mimeType: input.mimeType,
    size: input.size,
    url: input.url,
    provider: input.provider || "metadata",
    providerId: input.providerId,
    category: input.category,
    projectId: input.projectId,
    projectName: input.projectName,
    uploadedBy: input.uploadedBy || "admin",
    uploadDate: input.uploadDate || new Date(),
    aiSummary,
    metadata: input.metadata as Record<string, unknown>,
    ingestionEventId: event._id
  });

  await IngestionEventModel.findByIdAndUpdate(event._id, {
    $set: { entityId: String(document._id), entityModel: "IngestedDocument" }
  });

  return { eventId: String(event._id), entityId: String(document._id), aiSummary };
}

export async function ingestMedia(input: MediaIngestionInput): Promise<EntityIngestionResult> {
  assertDatabase();

  const aiDescription = mediaSummary(input);
  const event = await IngestionEventModel.create({
    sourceType: "admin_media",
    entityType: "media",
    status: "completed",
    priority: "medium",
    source: "admin",
    division: input.division,
    service: input.category,
    payload: input as unknown as Record<string, unknown>,
    aiSummary: aiDescription,
    startedAt: new Date(),
    processedAt: new Date()
  });

  const media = await IngestedMediaModel.create({
    kind: input.kind,
    division: input.division,
    title: input.title,
    altText: input.altText,
    url: input.url,
    category: input.category,
    tags: input.tags,
    projectId: input.projectId,
    metadata: input.metadata as Record<string, unknown>,
    aiDescription,
    ingestionEventId: event._id
  });

  await IngestionEventModel.findByIdAndUpdate(event._id, {
    $set: { entityId: String(media._id), entityModel: "IngestedMedia" }
  });

  return { eventId: String(event._id), entityId: String(media._id), aiSummary: aiDescription };
}

export async function recordFailedIngestion(input: {
  sourceType: string;
  entityType: string;
  source: string;
  service?: string;
  division?: string;
  location?: string;
  priority?: string;
  payload: unknown;
  error: unknown;
}): Promise<void> {
  if (!ingestionMongoEnabled) return;

  const errorMessage = input.error instanceof Error ? input.error.message : "Unknown ingestion failure.";

  await IngestionEventModel.create({
    sourceType: input.sourceType,
    entityType: input.entityType,
    status: "failed",
    priority: input.priority || "high",
    source: input.source,
    division: input.division || "ractysh-group",
    service: input.service,
    location: input.location,
    payload: input.payload as Record<string, unknown>,
    errorMessage,
    aiSummary: `Failed ${input.entityType} ingestion from ${sourceLabel(input.sourceType)}: ${errorMessage}`,
    startedAt: new Date(),
    processedAt: new Date()
  });
}

export async function safelyIngestLead(input: LeadIngestionInput): Promise<EntityIngestionResult | null> {
  try {
    return await ingestLead(input);
  } catch (error) {
    console.error("Lead ingestion failed:", error);
    await recordFailedIngestion({
      sourceType: input.sourceType,
      entityType: "lead",
      source: input.source,
      division: input.division,
      service: input.service,
      location: input.location,
      payload: input,
      error
    }).catch((failedEventError) => {
      console.error("Failed to record lead ingestion failure:", failedEventError);
    });
    return null;
  }
}

export async function safelyIngestNewsletter(input: NewsletterIngestionInput): Promise<void> {
  try {
    await ingestNewsletter(input);
  } catch (error) {
    console.error("Newsletter ingestion failed:", error);
    await recordFailedIngestion({
      sourceType: "admin_newsletter",
      entityType: "newsletter",
      source: "admin",
      service: "Executive Intelligence",
      payload: input,
      error
    }).catch((failedEventError) => {
      console.error("Failed to record newsletter ingestion failure:", failedEventError);
    });
  }
}

export async function safelyIngestDocument(input: DocumentIngestionInput): Promise<EntityIngestionResult | null> {
  try {
    return await ingestDocument(input);
  } catch (error) {
    console.error("Document ingestion failed:", error);
    await recordFailedIngestion({
      sourceType: input.sourceType,
      entityType: "document",
      source: input.uploadedBy || "admin",
      division: input.division,
      service: input.category,
      payload: input,
      error
    }).catch((failedEventError) => {
      console.error("Failed to record document ingestion failure:", failedEventError);
    });
    return null;
  }
}

export async function getIngestionMonitor() {
  assertDatabase();

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const [
    newLeads,
    newDocuments,
    newNewsletterIssues,
    newMedia,
    failedIngestions,
    processingQueue,
    pendingLeads,
    activeProjects,
    delayedProjects,
    overdueProjects,
    totalEvents,
    todaysEvents,
    highPriorityEvents,
    recentLeads,
    recentEvents
  ] = await Promise.all([
    LeadModel.countDocuments({ status: "new" }),
    IngestedDocumentModel.countDocuments({ createdAt: { $gte: since } }),
    IngestionEventModel.countDocuments({ entityType: "newsletter", createdAt: { $gte: since } }),
    IngestedMediaModel.countDocuments({ createdAt: { $gte: since } }),
    IngestionEventModel.countDocuments({ status: "failed" }),
    IngestionEventModel.countDocuments({ status: { $in: ["received", "processing"] } }),
    LeadModel.countDocuments({ status: { $in: ["new", "qualified"] } }),
    IngestedProjectModel.countDocuments({ status: "active" }),
    IngestedProjectModel.countDocuments({ status: "delayed" }),
    IngestedProjectModel.countDocuments({
      dueDate: { $lt: now },
      status: { $in: ["concept", "active", "delayed"] }
    }),
    IngestionEventModel.countDocuments({ createdAt: { $gte: since } }),
    IngestionEventModel.countDocuments({ createdAt: { $gte: today } }),
    IngestionEventModel.countDocuments({ priority: "high", createdAt: { $gte: since } }),
    LeadModel.find({}, "id fullName email companyName service location status aiSummary createdAt")
      .sort({ createdAt: -1 })
      .limit(6)
      .lean(),
    IngestionEventModel.find({}, "id sourceType entityType status priority source service location entityId entityModel aiSummary errorMessage createdAt processedAt")
      .sort({ createdAt: -1 })
      .limit(12)
      .lean()
  ]);

  const sourceRaw = await IngestionEventModel.aggregate([
    { $match: { createdAt: { $gte: since } } },
    { $group: { _id: "$sourceType", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  const entityRaw = await IngestionEventModel.aggregate([
    { $match: { createdAt: { $gte: since } } },
    { $group: { _id: "$entityType", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  const statusRaw = await IngestionEventModel.aggregate([
    { $match: { createdAt: { $gte: since } } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  return {
    generatedAt: now.toISOString(),
    window: {
      label: "Last 7 days",
      since: since.toISOString()
    },
    metrics: {
      newLeads,
      newDocuments,
      newNewsletterIssues,
      newMedia,
      failedIngestions,
      processingQueue
    },
    activity: {
      totalEvents,
      todaysEvents,
      highPriorityEvents
    },
    sourceBreakdown: sourceRaw.map((item: { _id: string; count: number }) => ({ sourceType: item._id, count: item.count })),
    entityBreakdown: entityRaw.map((item: { _id: string; count: number }) => ({ entityType: item._id, count: item.count })),
    statusBreakdown: statusRaw.map((item: { _id: string; count: number }) => ({ status: item._id, count: item.count })),
    executiveInsights: [
      `${pendingLeads} pending leads require qualification.`,
      `${activeProjects} active projects are visible to the intelligence layer.`,
      `${delayedProjects} delayed projects need review.`,
      `${overdueProjects} active or delayed projects are past due.`
    ],
    recentLeads: recentLeads.map((lead: Record<string, unknown>) => ({
      ...lead,
      createdAt: (lead.createdAt as Date).toISOString()
    })),
    recentEvents: recentEvents.map((event: Record<string, unknown>) => ({
      ...event,
      createdAt: (event.createdAt as Date).toISOString(),
      processedAt: (event.processedAt as Date)?.toISOString() || null
    }))
  };
}

export async function getIngestionKnowledgeSnapshot() {
  assertDatabase();

  const now = new Date();
  const [activeProjects, delayedProjects, latestNewsletters, pendingLeads] = await Promise.all([
    IngestedProjectModel.find({ status: "active" })
      .sort({ priority: -1, dueDate: 1, updatedAt: -1 })
      .limit(12)
      .lean(),
    IngestedProjectModel.find({
      $or: [
        { status: "delayed" },
        { dueDate: { $lt: now }, status: { $in: ["concept", "active"] } }
      ]
    })
      .sort({ dueDate: 1, updatedAt: -1 })
      .limit(12)
      .lean(),
    [], // newsletters are now in MongoDB
    LeadModel.find({ status: { $in: ["new", "qualified"] } })
      .sort({ createdAt: -1 })
      .limit(12)
      .select("id fullName email companyName service location status aiSummary createdAt")
      .lean()
  ]);

  return {
    generatedAt: now.toISOString(),
    activeProjects,
    delayedProjects,
    latestNewsletters: [],
    pendingLeads: pendingLeads.map((lead: Record<string, unknown>) => ({
      ...lead,
      createdAt: (lead.createdAt as Date).toISOString()
    }))
  };
}
