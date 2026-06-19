import mongoose, { Schema, Document } from "mongoose";

export interface IRactyshGroup extends Document {
  name: string;
  slug: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  logo?: string;
  status: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const ractyshGroupSchema = new Schema<IRactyshGroup>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    website: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String, default: "India" },
    logo: { type: String },
    status: { type: String, default: "active", index: true },
    metadata: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

export interface IArchitecture extends Document {
  name: string;
  slug: string;
  description?: string;
  projectType?: string;
  location?: string;
  year?: string;
  area?: string;
  status: string;
  coverImage?: string;
  featured: boolean;
  position: number;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const architectureSchema = new Schema<IArchitecture>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    projectType: { type: String, index: true },
    location: { type: String, index: true },
    year: { type: String },
    area: { type: String },
    status: { type: String, default: "draft", index: true },
    coverImage: { type: String },
    featured: { type: Boolean, default: false, index: true },
    position: { type: Number, default: 0 },
    metadata: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

export interface IConstruction extends Document {
  name: string;
  slug: string;
  description?: string;
  projectType?: string;
  location?: string;
  status: string;
  budget?: string;
  timeline?: string;
  clientName?: string;
  coverImage?: string;
  featured: boolean;
  position: number;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const constructionSchema = new Schema<IConstruction>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    projectType: { type: String, index: true },
    location: { type: String, index: true },
    status: { type: String, default: "concept", index: true },
    budget: { type: String },
    timeline: { type: String },
    clientName: { type: String },
    coverImage: { type: String },
    featured: { type: Boolean, default: false, index: true },
    position: { type: Number, default: 0 },
    metadata: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

export interface IOtcExchange extends Document {
  name: string;
  slug: string;
  description?: string;
  serviceType?: string;
  status: string;
  website?: string;
  email?: string;
  phone?: string;
  coverImage?: string;
  featured: boolean;
  position: number;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const otcExchangeSchema = new Schema<IOtcExchange>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    serviceType: { type: String, index: true },
    status: { type: String, default: "active", index: true },
    website: { type: String },
    email: { type: String },
    phone: { type: String },
    coverImage: { type: String },
    featured: { type: Boolean, default: false, index: true },
    position: { type: Number, default: 0 },
    metadata: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

export interface IRealEstate extends Document {
  name: string;
  slug: string;
  description?: string;
  propertyType?: string;
  location?: string;
  status: string;
  investmentValue?: string;
  priceLabel?: string;
  area?: string;
  bedrooms?: string;
  developer?: string;
  coverImage?: string;
  featured: boolean;
  position: number;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const realEstateSchema = new Schema<IRealEstate>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    propertyType: { type: String, index: true },
    location: { type: String, index: true },
    status: { type: String, default: "draft", index: true },
    investmentValue: { type: String },
    priceLabel: { type: String },
    area: { type: String },
    bedrooms: { type: String },
    developer: { type: String },
    coverImage: { type: String },
    featured: { type: Boolean, default: false, index: true },
    position: { type: Number, default: 0 },
    metadata: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

export interface IImportExport extends Document {
  name: string;
  slug: string;
  description?: string;
  serviceType?: string;
  status: string;
  countries?: string[];
  products?: string[];
  website?: string;
  email?: string;
  phone?: string;
  coverImage?: string;
  featured: boolean;
  position: number;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const importExportSchema = new Schema<IImportExport>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    serviceType: { type: String, index: true },
    status: { type: String, default: "active", index: true },
    countries: { type: [String], default: [] },
    products: { type: [String], default: [] },
    website: { type: String },
    email: { type: String },
    phone: { type: String },
    coverImage: { type: String },
    featured: { type: Boolean, default: false, index: true },
    position: { type: Number, default: 0 },
    metadata: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

export const RactyshGroupModel = mongoose.models.RactyshGroup || mongoose.model<IRactyshGroup>("RactyshGroup", ractyshGroupSchema, "ractysh_groups");
export const ArchitectureModel = mongoose.models.Architecture || mongoose.model<IArchitecture>("Architecture", architectureSchema, "architectures");
export const ConstructionModel = mongoose.models.Construction || mongoose.model<IConstruction>("Construction", constructionSchema, "constructions");
export const OtcExchangeModel = mongoose.models.OtcExchange || mongoose.model<IOtcExchange>("OtcExchange", otcExchangeSchema, "otc_exchanges");
export const RealEstateModel = mongoose.models.RealEstate || mongoose.model<IRealEstate>("RealEstate", realEstateSchema, "real_estates");
export const ImportExportModel = mongoose.models.ImportExport || mongoose.model<IImportExport>("ImportExport", importExportSchema, "import_exports");
