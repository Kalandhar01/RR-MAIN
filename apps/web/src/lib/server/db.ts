import { randomUUID } from "crypto";
import mongoose, { Schema } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

let cachedConnection: typeof mongoose | null = null;

mongoose.set("bufferTimeoutMS", 30000);

export async function dbConnect(): Promise<typeof mongoose> {
  if (cachedConnection) return cachedConnection;

  if (MONGODB_URI) {
    try {
      cachedConnection = await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000
      });
      return cachedConnection;
    } catch (err) {
      console.warn("[db] Failed to connect to configured MongoDB, falling back to in-memory server:", (err as Error).message);
    }
  } else {
    console.warn("[db] MONGODB_URI is not defined, using in-memory MongoDB server");
  }

  const loadMemoryServer = new Function('return import("mongodb-memory-server")');
  const mod = await loadMemoryServer();
  const server = await mod.MongoMemoryServer.create();
  const uri = server.getUri();
  cachedConnection = await mongoose.connect(uri);
  return cachedConnection;
}

export type CareerApplication = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  message: string;
  resumeUrl: string;
  portfolioUrl: string | null;
  coverLetter: string;
  college: string;
  graduationYear: string;
  skills: string[];
  createdAt: Date;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  division: string;
  createdAt: Date;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
type Delegate = {
  create(args: { data: Record<string, unknown> }): Promise<any>;
  findMany(args?: {
    where?: Record<string, unknown>;
    orderBy?: Record<string, string> | Record<string, string>[];
    take?: number;
    skip?: number;
    select?: Record<string, unknown>;
  }): Promise<any[]>;
  findFirst(args?: {
    where?: Record<string, unknown>;
    orderBy?: Record<string, string> | Record<string, string>[];
    select?: Record<string, unknown>;
  }): Promise<any>;
  count(args?: { where?: Record<string, unknown> }): Promise<number>;
  update(args: { where: { id: string }; data: Record<string, unknown> }): Promise<any>;
  delete(args: { where: { id: string } }): Promise<any>;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

function createDelegate(model: () => mongoose.Model<Record<string, unknown>>): Delegate {
  return {
    async create({ data }) {
      await dbConnect();
      const doc = await model().create(data);
      const obj = typeof doc.toObject === "function" ? doc.toObject() : doc;
      return { ...obj, id: String((obj as Record<string, unknown>)._id) };
    },
    async findMany(args) {
      await dbConnect();
      let query = model().find() as unknown as mongoose.Query<Record<string, unknown>[], Record<string, unknown>>;
      if (args?.where) {
        const filter = { ...args.where };
        if (filter.OR) {
          const orConditions = (filter.OR as Record<string, unknown>[]).map((cond) => {
            const mongoCond: Record<string, unknown> = {};
            for (const [key, val] of Object.entries(cond)) {
              if (typeof val === "object" && val !== null && "in" in val) {
                mongoCond[key] = { $in: (val as { in: unknown[] }).in };
              } else if (typeof val === "object" && val !== null && "hasSome" in val) {
                mongoCond[key] = { $in: (val as { hasSome: unknown[] }).hasSome };
              } else {
                mongoCond[key] = val;
              }
            }
            return mongoCond;
          });
          delete filter.OR;
          query = query.find({ ...filter, $or: orConditions }) as typeof query;
        } else {
          query = query.find(filter) as typeof query;
        }
      }
      if (args?.orderBy) {
        const sort: Record<string, 1 | -1> = {};
        for (const [key, dir] of Object.entries(args.orderBy)) {
          sort[key] = dir === "desc" ? -1 : 1;
        }
        query = query.sort(sort) as typeof query;
      }
      if (args?.skip) query = query.skip(args.skip) as typeof query;
      if (args?.take) query = query.limit(args.take) as typeof query;
      if (args?.select) query = query.select(Object.keys(args.select).join(" ")) as typeof query;
      const docs = await query.lean();
      return (docs as Record<string, unknown>[]).map((d) => ({ ...d, id: String(d._id) }));
    },
    async findFirst(args) {
      await dbConnect();
      const filter: Record<string, unknown> = {};
      if (args?.where) {
        const w = { ...args.where };
        if (w.OR) {
          filter.$or = (w.OR as Record<string, unknown>[]).map((cond) => {
            const m: Record<string, unknown> = {};
            for (const [k, v] of Object.entries(cond)) {
              if (typeof v === "object" && v !== null && "in" in v) {
                m[k] = { $in: (v as { in: unknown[] }).in };
              } else {
                m[k] = v;
              }
            }
            return m;
          });
          delete w.OR;
          Object.assign(filter, w);
        } else {
          Object.assign(filter, w);
        }
      }
      let query = model().findOne(filter);
      if (args?.orderBy) {
        const sort: Record<string, 1 | -1> = {};
        for (const [key, dir] of Object.entries(args.orderBy)) {
          sort[key] = dir === "desc" ? -1 : 1;
        }
        query = query.sort(sort);
      }
      if (args?.select) query = query.select(Object.keys(args.select).join(" "));
      const doc = await query.lean();
      if (!doc) return null;
      return { ...doc as Record<string, unknown>, id: String((doc as Record<string, unknown>)._id) };
    },
    async count(args) {
      await dbConnect();
      const filter = args?.where ? { ...args.where } : {};
      if (filter.OR) {
        const orConditions = (filter.OR as Record<string, unknown>[]).map((cond) => {
          const mongoCond: Record<string, unknown> = {};
          for (const [key, val] of Object.entries(cond)) {
            if (typeof val === "object" && val !== null && "in" in val) {
              mongoCond[key] = { $in: (val as { in: unknown[] }).in };
            } else {
              mongoCond[key] = val;
            }
          }
          return mongoCond;
        });
        delete filter.OR;
        return model().countDocuments({ ...filter, $or: orConditions });
      }
      return model().countDocuments(filter);
    },
    async update({ where, data }) {
      await dbConnect();
      const doc = await model().findByIdAndUpdate(where.id, { $set: data }, { new: true }).lean();
      if (!doc) throw new Error("Document not found");
      return { ...doc, id: String((doc as Record<string, unknown>)._id) };
    },
    async delete({ where }) {
      await dbConnect();
      const doc = await model().findByIdAndDelete(where.id).lean();
      if (!doc) throw new Error("Document not found");
      return { ...doc, id: String((doc as Record<string, unknown>)._id) };
    }
  };
}

const blogSchema = new Schema({
  title: String,
  slug: { type: String, unique: true },
  excerpt: String,
  content: { type: String, default: "" },
  category: String,
  coverImage: String,
  coverImageAlt: String,
  author: { type: String, default: "RACTYSH" },
  publishedAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  readTime: String,
  featured: { type: Boolean, default: false },
  status: { type: String, default: "draft" },
  tags: [String],
  seoTitle: String,
  seoDescription: String,
  canonicalUrl: String,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 }
});

const contactInquirySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  company: String,
  service: String,
  subject: String,
  message: { type: String, required: true },
  sourcePage: String,
  status: { type: String, default: "new" },
  notes: String,
  division: { type: String, default: "ractysh-group" },
  createdAt: { type: Date, default: Date.now }
});
contactInquirySchema.index({ createdAt: -1 });
contactInquirySchema.index({ status: 1, createdAt: -1 });
contactInquirySchema.index({ email: 1 });
contactInquirySchema.index({ name: "text", email: "text", company: "text", message: "text" });

const careerApplicationSchema = new Schema({
  fullName: String,
  email: String,
  phone: String,
  position: String,
  experience: String,
  message: String,
  resumeUrl: String,
  portfolioUrl: String,
  coverLetter: String,
  college: String,
  graduationYear: String,
  skills: [String],
  status: { type: String, default: "new" },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});
careerApplicationSchema.index({ createdAt: -1 });
careerApplicationSchema.index({ status: 1, createdAt: -1 });
careerApplicationSchema.index({ email: 1 });
careerApplicationSchema.index({ position: 1 });
careerApplicationSchema.index({ fullName: "text", email: "text", position: "text" });

const newsletterSubscriberSchema = new Schema({
  email: { type: String, unique: true },
  division: { type: String, default: "ractysh-group" },
  createdAt: { type: Date, default: Date.now }
});

const chatbotQuerySchema = new Schema({
  question: String,
  answer: String,
  pageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

const serviceRequestSchema = new Schema({
  name: String,
  email: String,
  division: String,
  service: String,
  route: String,
  status: { type: String, default: "new" },
  createdAt: { type: Date, default: Date.now }
});

const consultationSchema = new Schema({
  fullName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  companyName: { type: String, required: true },
  serviceType: { type: String, required: true },
  division: String,
  projectDescription: { type: String, required: true },
  phoneNumber: String,
  budgetRange: String,
  projectTimeline: String,
  preferredConsultationType: { type: String, default: "Virtual Meeting" },
  trackingToken: { type: String, default: randomUUID, unique: true, sparse: true },
  status: { type: String, default: "new" },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

const demoInquirySchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  companyName: String,
  discussionTopic: { type: String, required: true },
  message: String,
  status: { type: String, default: "new" },
  createdAt: { type: Date, default: Date.now }
});

const portfolioCategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
portfolioCategorySchema.index({ order: 1 });

const portfolioProjectSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, default: "" },
  location: { type: String, default: "" },
  status: { type: String, enum: ["Completed", "Ongoing", "Upcoming"], default: "Ongoing" },
  coverImage: { type: String, default: "" },
  galleryImages: [{ type: String }],
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
portfolioProjectSchema.index({ category: 1, order: 1 });
portfolioProjectSchema.index({ status: 1 });

let BlogModel: mongoose.Model<Record<string, unknown>>;
let CareerApplicationModel: mongoose.Model<Record<string, unknown>>;
let NewsletterSubscriberModel: mongoose.Model<Record<string, unknown>>;
let ChatbotQueryModel: mongoose.Model<Record<string, unknown>>;
let ServiceRequestModel: mongoose.Model<Record<string, unknown>>;
let ConsultationModel: mongoose.Model<Record<string, unknown>>;
let DemoInquiryModel: mongoose.Model<Record<string, unknown>>;
let PortfolioCategoryModel: mongoose.Model<Record<string, unknown>>;
let PortfolioProjectModel: mongoose.Model<Record<string, unknown>>;
let ContactInquiryModel: mongoose.Model<Record<string, unknown>>;

function getModels() {
  BlogModel = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
  CareerApplicationModel = mongoose.models.CareerApplication || mongoose.model("CareerApplication", careerApplicationSchema);
  NewsletterSubscriberModel = mongoose.models.NewsletterSubscriber || mongoose.model("NewsletterSubscriber", newsletterSubscriberSchema);
  ChatbotQueryModel = mongoose.models.ChatbotQuery || mongoose.model("ChatbotQuery", chatbotQuerySchema);
  ServiceRequestModel = mongoose.models.ServiceRequest || mongoose.model("ServiceRequest", serviceRequestSchema);
  ConsultationModel = mongoose.models.Consultation || mongoose.model("Consultation", consultationSchema);
  DemoInquiryModel = mongoose.models.DemoInquiry || mongoose.model("DemoInquiry", demoInquirySchema);
  PortfolioCategoryModel = mongoose.models.PortfolioCategory || mongoose.model("PortfolioCategory", portfolioCategorySchema);
  PortfolioProjectModel = mongoose.models.PortfolioProject || mongoose.model("PortfolioProject", portfolioProjectSchema);
  ContactInquiryModel = mongoose.models.ContactInquiry || mongoose.model("ContactInquiry", contactInquirySchema);
  return { BlogModel, CareerApplicationModel, NewsletterSubscriberModel, ChatbotQueryModel, ServiceRequestModel, ConsultationModel, DemoInquiryModel, PortfolioCategoryModel, PortfolioProjectModel, ContactInquiryModel };
}

export const prisma = {
  async $connect() { return dbConnect(); },
  get blog() { return createDelegate(() => getModels().BlogModel); },
  get careerApplication() { return createDelegate(() => getModels().CareerApplicationModel); },
  get newsletterSubscriber() { return createDelegate(() => getModels().NewsletterSubscriberModel); },
  get chatbotQuery() { return createDelegate(() => getModels().ChatbotQueryModel); },
  get serviceRequest() { return createDelegate(() => getModels().ServiceRequestModel); },
  get consultation() { return createDelegate(() => getModels().ConsultationModel); },
  get demoInquiry() { return createDelegate(() => getModels().DemoInquiryModel); },
  get portfolioCategory() { return createDelegate(() => getModels().PortfolioCategoryModel); },
  get portfolioProject() { return createDelegate(() => getModels().PortfolioProjectModel); },
  get contactInquiry() { return createDelegate(() => getModels().ContactInquiryModel); }
};
