import mongoose, { Schema, Document } from "mongoose";

export interface ICompanyDivision extends Document {
  slug: string;
  name: string;
  legalName: string;
  summary: string;
  description?: string | null;
  metric?: string | null;
  registrationNo?: string | null;
  foundedYear?: number | null;
  website?: string | null;
  brandColor: string;
  accentColor: string;
  status: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

const companyDivisionSchema = new Schema<ICompanyDivision>(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    legalName: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, default: null },
    metric: { type: String, default: null },
    registrationNo: { type: String, default: null },
    foundedYear: { type: Number, default: null },
    website: { type: String, default: null },
    brandColor: { type: String, default: "#8b1118" },
    accentColor: { type: String, default: "#d6b45f" },
    status: { type: String, default: "active", index: true },
    position: { type: Number, default: 0 }
  },
  { timestamps: true }
);

companyDivisionSchema.index({ status: 1, position: 1 });

export interface IDomainMapping extends Document {
  domain: string;
  division: string;
  companyId?: mongoose.Types.ObjectId | null;
  status: string;
  primary: boolean;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const domainMappingSchema = new Schema<IDomainMapping>(
  {
    domain: { type: String, required: true, unique: true },
    division: { type: String, required: true },
    companyId: { type: Schema.Types.ObjectId, ref: "CompanyDivision", default: null },
    status: { type: String, default: "active" },
    primary: { type: Boolean, default: false },
    notes: { type: String, default: null }
  },
  { timestamps: true }
);

domainMappingSchema.index({ division: 1, status: 1 });

export interface IServiceOffer extends Document {
  companyId: mongoose.Types.ObjectId;
  division: string;
  slug: string;
  title: string;
  summary: string;
  description?: string | null;
  category: string;
  href?: string | null;
  imageUrl?: string | null;
  heroContent: Record<string, unknown>;
  metrics: Record<string, unknown>;
  images: string[];
  sections: Record<string, unknown>;
  cta: Record<string, unknown>;
  seo: Record<string, unknown>;
  tags: string[];
  status: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

const serviceOfferSchema = new Schema<IServiceOffer>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "CompanyDivision", required: true },
    division: { type: String, default: "ractysh-group" },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, default: null },
    category: { type: String, required: true, index: true },
    href: { type: String, default: null },
    imageUrl: { type: String, default: null },
    heroContent: { type: Schema.Types.Mixed, default: {} },
    metrics: { type: Schema.Types.Mixed, default: [] },
    images: { type: [String], default: [] },
    sections: { type: Schema.Types.Mixed, default: [] },
    cta: { type: Schema.Types.Mixed, default: {} },
    seo: { type: Schema.Types.Mixed, default: {} },
    tags: { type: [String], default: [] },
    status: { type: String, default: "published", index: true },
    position: { type: Number, default: 0 }
  },
  { timestamps: true }
);

serviceOfferSchema.index({ companyId: 1, position: 1 });
serviceOfferSchema.index({ division: 1, status: 1 });

export interface IProject extends Document {
  companyId: mongoose.Types.ObjectId;
  division: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  summary: string;
  description?: string | null;
  year: string;
  status: string;
  clientName?: string | null;
  imageUrl?: string | null;
  featured: boolean;
  position: number;
  metadata: Record<string, unknown>;
  startedAt?: Date | null;
  completedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "CompanyDivision", required: true },
    division: { type: String, default: "ractysh-group" },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true, index: true },
    location: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, default: null },
    year: { type: String, required: true, index: true },
    status: { type: String, default: "concept", index: true },
    clientName: { type: String, default: null },
    imageUrl: { type: String, default: null },
    featured: { type: Boolean, default: false },
    position: { type: Number, default: 0 },
    metadata: { type: Schema.Types.Mixed, default: {} },
    startedAt: { type: Date, default: null },
    completedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

projectSchema.index({ companyId: 1, status: 1 });
projectSchema.index({ division: 1, status: 1 });
projectSchema.index({ division: 1, featured: 1, position: 1 });

export interface IMediaAsset extends Document {
  kind: string;
  title: string;
  altText?: string | null;
  url: string;
  provider: string;
  providerId?: string | null;
  mimeType?: string | null;
  size?: number | null;
  width?: number | null;
  height?: number | null;
  metadata?: Record<string, unknown> | null;
  division: string;
  companyId?: mongoose.Types.ObjectId | null;
  serviceId?: mongoose.Types.ObjectId | null;
  projectId?: mongoose.Types.ObjectId | null;
  teamMemberId?: mongoose.Types.ObjectId | null;
  blogPostId?: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const mediaAssetSchema = new Schema<IMediaAsset>(
  {
    kind: { type: String, default: "image", index: true },
    title: { type: String, required: true },
    altText: { type: String, default: null },
    url: { type: String, required: true },
    provider: { type: String, default: "local" },
    providerId: { type: String, default: null },
    mimeType: { type: String, default: null },
    size: { type: Number, default: null },
    width: { type: Number, default: null },
    height: { type: Number, default: null },
    metadata: { type: Schema.Types.Mixed },
    division: { type: String, default: "ractysh-group" },
    companyId: { type: Schema.Types.ObjectId, ref: "CompanyDivision", default: null },
    serviceId: { type: Schema.Types.ObjectId, ref: "ServiceOffer", default: null },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", default: null },
    teamMemberId: { type: Schema.Types.ObjectId, ref: "TeamMember", default: null },
    blogPostId: { type: Schema.Types.ObjectId, ref: "Blog", default: null }
  },
  { timestamps: true }
);

mediaAssetSchema.index({ division: 1 });

export interface ITeamMember extends Document {
  companyId?: mongoose.Types.ObjectId | null;
  division: string;
  slug: string;
  name: string;
  role: string;
  position?: string | null;
  biography?: string | null;
  leadershipStatement?: string | null;
  imageUrl?: string | null;
  email?: string | null;
  phone?: string | null;
  socialLinks: Record<string, unknown>;
  achievements: string[];
  awards: string[];
  gallery: string[];
  isFounder: boolean;
  isDirector: boolean;
  positionOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const teamMemberSchema = new Schema<ITeamMember>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "CompanyDivision", default: null },
    division: { type: String, default: "ractysh-group" },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    position: { type: String, default: null },
    biography: { type: String, default: null },
    leadershipStatement: { type: String, default: null },
    imageUrl: { type: String, default: null },
    email: { type: String, default: null },
    phone: { type: String, default: null },
    socialLinks: { type: Schema.Types.Mixed, default: [] },
    achievements: { type: [String], default: [] },
    awards: { type: [String], default: [] },
    gallery: { type: [String], default: [] },
    isFounder: { type: Boolean, default: false },
    isDirector: { type: Boolean, default: false },
    positionOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

teamMemberSchema.index({ isFounder: 1, isDirector: 1 });

export interface ICareerJob extends Document {
  companyId?: mongoose.Types.ObjectId | null;
  division: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  summary: string;
  description?: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const careerJobSchema = new Schema<ICareerJob>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "CompanyDivision", default: null },
    division: { type: String, default: "ractysh-group" },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, default: null },
    status: { type: String, default: "published", index: true }
  },
  { timestamps: true }
);

careerJobSchema.index({ division: 1, status: 1 });

export interface ICareerApplication extends Document {
  jobId?: mongoose.Types.ObjectId | null;
  division: string;
  fullName: string;
  email: string;
  phone?: string | null;
  position: string;
  experience: string;
  message: string;
  resumeUrl?: string | null;
  portfolioUrl?: string | null;
  coverLetter?: string | null;
  status: string;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const careerApplicationSchema = new Schema<ICareerApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "CareerJob", default: null },
    division: { type: String, default: "ractysh-group" },
    fullName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, default: null },
    position: { type: String, required: true, index: true },
    experience: { type: String, required: true },
    message: { type: String, required: true },
    resumeUrl: { type: String, default: null },
    portfolioUrl: { type: String, default: null },
    coverLetter: { type: String, default: null },
    status: { type: String, default: "new", index: true },
    notes: { type: String, default: null }
  },
  { timestamps: true }
);

careerApplicationSchema.index({ division: 1, status: 1, createdAt: -1 });
careerApplicationSchema.index({ createdAt: -1 });

export interface IStatistic extends Document {
  companyId?: mongoose.Types.ObjectId | null;
  division: string;
  scope: string;
  label: string;
  value: number;
  suffix: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

const statisticSchema = new Schema<IStatistic>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "CompanyDivision", default: null },
    division: { type: String, default: "ractysh-group" },
    scope: { type: String, default: "global" },
    label: { type: String, required: true },
    value: { type: Number, required: true },
    suffix: { type: String, default: "" },
    position: { type: Number, default: 0 }
  },
  { timestamps: true }
);

statisticSchema.index({ scope: 1, label: 1 }, { unique: true });
statisticSchema.index({ scope: 1, position: 1 });

export interface ITestimonial extends Document {
  division: string;
  quote: string;
  name: string;
  role: string;
  companyName?: string | null;
  rating?: number | null;
  approved: boolean;
  source?: string | null;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    division: { type: String, default: "ractysh-group" },
    quote: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    companyName: { type: String, default: null },
    rating: { type: Number, default: null },
    approved: { type: Boolean, default: false },
    source: { type: String, default: null },
    position: { type: Number, default: 0 }
  },
  { timestamps: true }
);

testimonialSchema.index({ approved: 1, position: 1 });
testimonialSchema.index({ division: 1, approved: 1 });

export interface ILocation extends Document {
  companyId?: mongoose.Types.ObjectId | null;
  division: string;
  name: string;
  address: string;
  outlookLocation?: string | null;
  city?: string | null;
  state?: string | null;
  country: string;
  postalCode?: string | null;
  phone?: string | null;
  email?: string | null;
  hours?: string | null;
  mapEmbedUrl?: string | null;
  position: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const locationSchema = new Schema<ILocation>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "CompanyDivision", default: null },
    division: { type: String, default: "ractysh-group" },
    name: { type: String, required: true },
    address: { type: String, required: true },
    outlookLocation: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    country: { type: String, default: "India" },
    postalCode: { type: String, default: null },
    phone: { type: String, default: null },
    email: { type: String, default: null },
    hours: { type: String, default: null },
    mapEmbedUrl: { type: String, default: null },
    position: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

locationSchema.index({ active: 1, position: 1 });

export interface ILegalDocument extends Document {
  slug: string;
  title: string;
  summary: string;
  body: string;
  fileUrl?: string | null;
  effectiveAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const legalDocumentSchema = new Schema<ILegalDocument>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    body: { type: String, required: true },
    fileUrl: { type: String, default: null },
    effectiveAt: { type: Date, default: null }
  },
  { timestamps: true }
);

export interface ICertification extends Document {
  companyId?: mongoose.Types.ObjectId | null;
  teamMemberId?: mongoose.Types.ObjectId | null;
  division: string;
  title: string;
  issuer: string;
  year: string;
  fileUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const certificationSchema = new Schema<ICertification>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "CompanyDivision", default: null },
    teamMemberId: { type: Schema.Types.ObjectId, ref: "TeamMember", default: null },
    division: { type: String, default: "ractysh-group" },
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    year: { type: String, required: true },
    fileUrl: { type: String, default: null }
  },
  { timestamps: true }
);

certificationSchema.index({ division: 1 });

export interface ITimelineEvent extends Document {
  companyId?: mongoose.Types.ObjectId | null;
  teamMemberId?: mongoose.Types.ObjectId | null;
  division: string;
  year: string;
  title: string;
  description: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

const timelineEventSchema = new Schema<ITimelineEvent>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "CompanyDivision", default: null },
    teamMemberId: { type: Schema.Types.ObjectId, ref: "TeamMember", default: null },
    division: { type: String, default: "ractysh-group" },
    year: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    position: { type: Number, default: 0 }
  },
  { timestamps: true }
);

timelineEventSchema.index({ companyId: 1, position: 1 });
timelineEventSchema.index({ division: 1, position: 1 });

export interface IPartner extends Document {
  name: string;
  description: string;
  website?: string | null;
  logoUrl?: string | null;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

const partnerSchema = new Schema<IPartner>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    website: { type: String, default: null },
    logoUrl: { type: String, default: null },
    position: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const CompanyDivisionModel = mongoose.models.CompanyDivision || mongoose.model<ICompanyDivision>("CompanyDivision", companyDivisionSchema);
export const DomainMappingModel = mongoose.models.DomainMapping || mongoose.model<IDomainMapping>("DomainMapping", domainMappingSchema);
export const ServiceOfferModel = mongoose.models.ServiceOffer || mongoose.model<IServiceOffer>("ServiceOffer", serviceOfferSchema);
export const ProjectModel = mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);
export const MediaAssetModel = mongoose.models.MediaAsset || mongoose.model<IMediaAsset>("MediaAsset", mediaAssetSchema);
export const TeamMemberModel = mongoose.models.TeamMember || mongoose.model<ITeamMember>("TeamMember", teamMemberSchema);
export const CareerJobModel = mongoose.models.CareerJob || mongoose.model<ICareerJob>("CareerJob", careerJobSchema);
export const CareerApplicationModel = mongoose.models.CareerApplication || mongoose.model<ICareerApplication>("CareerApplication", careerApplicationSchema);
export const StatisticModel = mongoose.models.Statistic || mongoose.model<IStatistic>("Statistic", statisticSchema);
export const TestimonialModel = mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", testimonialSchema);
export const LocationModel = mongoose.models.Location || mongoose.model<ILocation>("Location", locationSchema);
export const LegalDocumentModel = mongoose.models.LegalDocument || mongoose.model<ILegalDocument>("LegalDocument", legalDocumentSchema);
export const CertificationModel = mongoose.models.Certification || mongoose.model<ICertification>("Certification", certificationSchema);
export const TimelineEventModel = mongoose.models.TimelineEvent || mongoose.model<ITimelineEvent>("TimelineEvent", timelineEventSchema);
export const PartnerModel = mongoose.models.Partner || mongoose.model<IPartner>("Partner", partnerSchema);
