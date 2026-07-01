import mongoose, { Schema, Document } from "mongoose";

export interface IIngestionEvent extends Document {
  sourceType: string;
  entityType: string;
  status: string;
  priority: string;
  source: string;
  division: string;
  service?: string | null;
  location?: string | null;
  entityId?: string | null;
  entityModel?: string | null;
  payload: Record<string, unknown>;
  aiSummary?: string | null;
  errorMessage?: string | null;
  startedAt?: Date | null;
  processedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const ingestionEventSchema = new Schema<IIngestionEvent>(
  {
    sourceType: { type: String, required: true, index: true },
    entityType: { type: String, required: true, index: true },
    status: { type: String, default: "received", index: true },
    priority: { type: String, default: "high", index: true },
    source: { type: String, required: true },
    division: { type: String, default: "ractysh-group", index: true },
    service: { type: String, default: null },
    location: { type: String, default: null },
    entityId: { type: String, default: null },
    entityModel: { type: String, default: null },
    payload: { type: Schema.Types.Mixed, default: {} },
    aiSummary: { type: String, default: null },
    errorMessage: { type: String, default: null },
    startedAt: { type: Date, default: null },
    processedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

ingestionEventSchema.index({ createdAt: -1 });
ingestionEventSchema.index({ entityModel: 1, entityId: 1 });

export interface ILead extends Document {
  division: string;
  fullName: string;
  email: string;
  phone?: string | null;
  companyName?: string | null;
  source: string;
  sourceType: string;
  service?: string | null;
  location?: string | null;
  status: string;
  message?: string | null;
  aiSummary?: string | null;
  metadata?: Record<string, unknown> | null;
  ingestionEventId?: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILead>(
  {
    division: { type: String, default: "ractysh-group" },
    fullName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, default: null },
    companyName: { type: String, default: null },
    source: { type: String, required: true },
    sourceType: { type: String, default: "website_contact_form", index: true },
    service: { type: String, default: null, index: true },
    location: { type: String, default: null, index: true },
    status: { type: String, default: "new", index: true },
    message: { type: String, default: null },
    aiSummary: { type: String, default: null },
    metadata: { type: Schema.Types.Mixed },
    ingestionEventId: { type: Schema.Types.ObjectId, ref: "IngestionEvent", default: null }
  },
  { timestamps: true }
);

leadSchema.index({ division: 1, status: 1, createdAt: -1 });
leadSchema.index({ status: 1, createdAt: -1 });

export interface IIngestedProject extends Document {
  title: string;
  division: string;
  status: string;
  progress: number;
  owner?: string | null;
  dueDate?: Date | null;
  priority: string;
  budget?: number | null;
  location?: string | null;
  summary?: string | null;
  aiSummary?: string | null;
  metadata?: Record<string, unknown> | null;
  ingestionEventId?: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const ingestedProjectSchema = new Schema<IIngestedProject>(
  {
    title: { type: String, required: true },
    division: { type: String, default: "ractysh-group" },
    status: { type: String, default: "active", index: true },
    progress: { type: Number, default: 0 },
    owner: { type: String, default: null },
    dueDate: { type: Date, default: null },
    priority: { type: String, default: "high", index: true },
    budget: { type: Number, default: null },
    location: { type: String, default: null },
    summary: { type: String, default: null },
    aiSummary: { type: String, default: null },
    metadata: { type: Schema.Types.Mixed },
    ingestionEventId: { type: Schema.Types.ObjectId, ref: "IngestionEvent", default: null }
  },
  { timestamps: true }
);

ingestedProjectSchema.index({ division: 1, status: 1 });
ingestedProjectSchema.index({ status: 1, dueDate: 1 });
ingestedProjectSchema.index({ priority: 1, dueDate: 1 });

export interface IIngestedDocument extends Document {
  division: string;
  filename: string;
  mimeType: string;
  size?: number | null;
  url?: string | null;
  provider: string;
  providerId?: string | null;
  category: string;
  projectId?: string | null;
  projectName?: string | null;
  uploadedBy: string;
  uploadDate: Date;
  aiSummary?: string | null;
  metadata?: Record<string, unknown> | null;
  ingestionEventId?: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const ingestedDocumentSchema = new Schema<IIngestedDocument>(
  {
    division: { type: String, default: "ractysh-group" },
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, default: null },
    url: { type: String, default: null },
    provider: { type: String, default: "metadata" },
    providerId: { type: String, default: null },
    category: { type: String, required: true, index: true },
    projectId: { type: String, default: null },
    projectName: { type: String, default: null },
    uploadedBy: { type: String, default: "admin" },
    uploadDate: { type: Date, default: Date.now },
    aiSummary: { type: String, default: null },
    metadata: { type: Schema.Types.Mixed },
    ingestionEventId: { type: Schema.Types.ObjectId, ref: "IngestionEvent", default: null }
  },
  { timestamps: true }
);

ingestedDocumentSchema.index({ division: 1, uploadDate: -1 });
ingestedDocumentSchema.index({ category: 1, uploadDate: -1 });

export interface IIngestedMedia extends Document {
  division: string;
  kind: string;
  title: string;
  altText?: string | null;
  url?: string | null;
  category: string;
  tags: string[];
  projectId?: string | null;
  metadata?: Record<string, unknown> | null;
  aiDescription?: string | null;
  ingestionEventId?: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const ingestedMediaSchema = new Schema<IIngestedMedia>(
  {
    division: { type: String, default: "ractysh-group" },
    kind: { type: String, default: "image", index: true },
    title: { type: String, required: true },
    altText: { type: String, default: null },
    url: { type: String, default: null },
    category: { type: String, required: true, index: true },
    tags: { type: [String], default: [] },
    projectId: { type: String, default: null },
    metadata: { type: Schema.Types.Mixed },
    aiDescription: { type: String, default: null },
    ingestionEventId: { type: Schema.Types.ObjectId, ref: "IngestionEvent", default: null }
  },
  { timestamps: true }
);

ingestedMediaSchema.index({ division: 1, createdAt: -1 });
ingestedMediaSchema.index({ createdAt: -1 });

export interface IChatbotQuery extends Document {
  question: string;
  answer: string;
  pageUrl?: string | null;
  createdAt: Date;
}

const chatbotQuerySchema = new Schema<IChatbotQuery>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    pageUrl: { type: String, default: null }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

chatbotQuerySchema.index({ createdAt: -1 });

export interface IServiceRequest extends Document {
  division: string;
  name: string;
  email: string;
  service: string;
  route: string;
  createdAt: Date;
}

const serviceRequestSchema = new Schema<IServiceRequest>(
  {
    division: { type: String, default: "ractysh-group" },
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    service: { type: String, required: true, index: true },
    route: { type: String, required: true }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

serviceRequestSchema.index({ division: 1, createdAt: -1 });
serviceRequestSchema.index({ createdAt: -1 });

export interface ISubscription extends Document {
  email: string;
  source: string;
  status: string;
  consentAt: Date;
  unsubscribedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    source: { type: String, default: "website" },
    status: { type: String, default: "active", index: true },
    consentAt: { type: Date, default: Date.now },
    unsubscribedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

export const IngestionEventModel = mongoose.models.IngestionEvent || mongoose.model<IIngestionEvent>("IngestionEvent", ingestionEventSchema);
export const LeadModel = mongoose.models.Lead || mongoose.model<ILead>("Lead", leadSchema);
export const IngestedProjectModel = mongoose.models.IngestedProject || mongoose.model<IIngestedProject>("IngestedProject", ingestedProjectSchema);
export const IngestedDocumentModel = mongoose.models.IngestedDocument || mongoose.model<IIngestedDocument>("IngestedDocument", ingestedDocumentSchema);
export const IngestedMediaModel = mongoose.models.IngestedMedia || mongoose.model<IIngestedMedia>("IngestedMedia", ingestedMediaSchema);
export const ChatbotQueryModel = mongoose.models.ChatbotQuery || mongoose.model<IChatbotQuery>("ChatbotQuery", chatbotQuerySchema);
export const ServiceRequestModel = mongoose.models.ServiceRequest || mongoose.model<IServiceRequest>("ServiceRequest", serviceRequestSchema);
export const SubscriptionModel = mongoose.models.Subscription || mongoose.model<ISubscription>("Subscription", subscriptionSchema);
