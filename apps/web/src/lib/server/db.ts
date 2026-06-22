import { randomUUID } from "crypto";
import mongoose, { Schema } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const MONGODB_URI = process.env.MONGODB_URI || "";

let cachedConnection: typeof mongoose | null = null;
let memoryServer: MongoMemoryServer | null = null;

mongoose.set("bufferTimeoutMS", 30000);

async function dbConnect(): Promise<typeof mongoose> {
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

  memoryServer = await MongoMemoryServer.create();
  const uri = memoryServer.getUri();
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
    select?: Record<string, unknown>;
  }): Promise<any[]>;
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
      if (args?.take) query = query.limit(args.take) as typeof query;
      if (args?.select) query = query.select(Object.keys(args.select).join(" ")) as typeof query;
      const docs = await query.lean();
      return (docs as Record<string, unknown>[]).map((d) => ({ ...d, id: String(d._id) }));
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
  author: { type: String, default: "Ractysh Group" },
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

let BlogModel: mongoose.Model<Record<string, unknown>>;
let CareerApplicationModel: mongoose.Model<Record<string, unknown>>;
let NewsletterSubscriberModel: mongoose.Model<Record<string, unknown>>;
let ChatbotQueryModel: mongoose.Model<Record<string, unknown>>;
let ServiceRequestModel: mongoose.Model<Record<string, unknown>>;
let ConsultationModel: mongoose.Model<Record<string, unknown>>;
let DemoInquiryModel: mongoose.Model<Record<string, unknown>>;
let ContactInquiryModel: mongoose.Model<Record<string, unknown>>;

function getModels() {
  BlogModel = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
  CareerApplicationModel = mongoose.models.CareerApplication || mongoose.model("CareerApplication", careerApplicationSchema);
  NewsletterSubscriberModel = mongoose.models.NewsletterSubscriber || mongoose.model("NewsletterSubscriber", newsletterSubscriberSchema);
  ChatbotQueryModel = mongoose.models.ChatbotQuery || mongoose.model("ChatbotQuery", chatbotQuerySchema);
  ServiceRequestModel = mongoose.models.ServiceRequest || mongoose.model("ServiceRequest", serviceRequestSchema);
  ConsultationModel = mongoose.models.Consultation || mongoose.model("Consultation", consultationSchema);
  DemoInquiryModel = mongoose.models.DemoInquiry || mongoose.model("DemoInquiry", demoInquirySchema);
  ContactInquiryModel = mongoose.models.ContactInquiry || mongoose.model("ContactInquiry", contactInquirySchema);
  return { BlogModel, CareerApplicationModel, NewsletterSubscriberModel, ChatbotQueryModel, ServiceRequestModel, ConsultationModel, DemoInquiryModel, ContactInquiryModel };
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
  get contactInquiry() { return createDelegate(() => getModels().ContactInquiryModel); }
};
