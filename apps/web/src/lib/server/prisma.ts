import mongoose, { Schema } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

let cachedConnection: typeof mongoose | null = null;

async function dbConnect(): Promise<typeof mongoose> {
  if (cachedConnection) return cachedConnection;
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined in environment");
  cachedConnection = await mongoose.connect(MONGODB_URI);
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

function createDelegate(model: mongoose.Model<Record<string, unknown>>): Delegate {
  return {
    async create({ data }) {
      const doc = await model.create(data);
      const obj = typeof doc.toObject === "function" ? doc.toObject() : doc;
      return { ...obj, id: String((obj as Record<string, unknown>)._id) };
    },
    async findMany(args) {
      let query = model.find() as unknown as mongoose.Query<Record<string, unknown>[], Record<string, unknown>>;
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
  category: String,
  coverImage: String,
  coverImageAlt: String,
  publishedAt: Date,
  createdAt: { type: Date, default: Date.now },
  readTime: Number,
  featured: { type: Boolean, default: false },
  status: { type: String, default: "draft" },
  tags: [String]
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
  createdAt: { type: Date, default: Date.now }
});

let BlogModel: mongoose.Model<Record<string, unknown>>;
let CareerApplicationModel: mongoose.Model<Record<string, unknown>>;
let NewsletterSubscriberModel: mongoose.Model<Record<string, unknown>>;
let ChatbotQueryModel: mongoose.Model<Record<string, unknown>>;
let ServiceRequestModel: mongoose.Model<Record<string, unknown>>;

function getModels() {
  BlogModel = BlogModel || mongoose.model("Blog", blogSchema);
  CareerApplicationModel = CareerApplicationModel || mongoose.model("CareerApplication", careerApplicationSchema);
  NewsletterSubscriberModel = NewsletterSubscriberModel || mongoose.model("NewsletterSubscriber", newsletterSubscriberSchema);
  ChatbotQueryModel = ChatbotQueryModel || mongoose.model("ChatbotQuery", chatbotQuerySchema);
  ServiceRequestModel = ServiceRequestModel || mongoose.model("ServiceRequest", serviceRequestSchema);
  return { BlogModel, CareerApplicationModel, NewsletterSubscriberModel, ChatbotQueryModel, ServiceRequestModel };
}

export const prisma = {
  async $connect() { return dbConnect(); },
  get blog() { return createDelegate(getModels().BlogModel); },
  get careerApplication() { return createDelegate(getModels().CareerApplicationModel); },
  get newsletterSubscriber() { return createDelegate(getModels().NewsletterSubscriberModel); },
  get chatbotQuery() { return createDelegate(getModels().ChatbotQueryModel); },
  get serviceRequest() { return createDelegate(getModels().ServiceRequestModel); }
};
