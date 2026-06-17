import mongoose, { type Model, type Document, Schema } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

let cachedConnection: typeof mongoose | null = null;

async function dbConnect(): Promise<typeof mongoose> {
  if (cachedConnection) return cachedConnection;
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined in environment");
  cachedConnection = await mongoose.connect(MONGODB_URI);
  return cachedConnection;
}

type PrismaDelegate<T extends Document> = {
  create(args: { data: Record<string, unknown> }): Promise<T & { id: string }>;
  findMany(args?: {
    where?: Record<string, unknown>;
    orderBy?: Record<string, "asc" | "desc">;
    take?: number;
    select?: Record<string, unknown>;
  }): Promise<(T & { id: string })[]>;
};

function createDelegate<T extends Document>(model: Model<T>): PrismaDelegate<T> {
  return {
    async create({ data }) {
      const doc = await model.create(data);
      return { ...doc.toObject(), id: String(doc._id) } as T & { id: string };
    },
    async findMany(args) {
      let query = model.find();
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
          query = query.and([filter, ...orConditions.map((c) => ({ $or: [c] }))]);
        }
        if (Object.keys(filter).length > 0) query = query.find(filter);
      }
      if (args?.orderBy) {
        const sort: Record<string, 1 | -1> = {};
        for (const [key, dir] of Object.entries(args.orderBy)) {
          sort[key] = dir === "desc" ? -1 : 1;
        }
        query = query.sort(sort);
      }
      if (args?.take) query = query.limit(args.take);
      if (args?.select) query = query.select(Object.keys(args.select).join(" "));
      const docs = await query.lean();
      return (docs as T[]).map((doc) => {
        const d = doc as Record<string, unknown>;
        return { ...d, id: String(d._id) } as T & { id: string };
      });
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

let BlogModel: Model<Document>;
let CareerApplicationModel: Model<Document>;
let NewsletterSubscriberModel: Model<Document>;
let ChatbotQueryModel: Model<Document>;
let ServiceRequestModel: Model<Document>;

function getModels() {
  BlogModel = BlogModel || mongoose.model("Blog", blogSchema);
  CareerApplicationModel = CareerApplicationModel || mongoose.model("CareerApplication", careerApplicationSchema);
  NewsletterSubscriberModel = NewsletterSubscriberModel || mongoose.model("NewsletterSubscriber", newsletterSubscriberSchema);
  ChatbotQueryModel = ChatbotQueryModel || mongoose.model("ChatbotQuery", chatbotQuerySchema);
  ServiceRequestModel = ServiceRequestModel || mongoose.model("ServiceRequest", serviceRequestSchema);
  return { BlogModel, CareerApplicationModel, NewsletterSubscriberModel, ChatbotQueryModel, ServiceRequestModel };
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

export const prisma = {
  async $connect() { return dbConnect(); },
  get blog() { return createDelegate(getModels().BlogModel); },
  get careerApplication() { return createDelegate(getModels().CareerApplicationModel); },
  get newsletterSubscriber() { return createDelegate(getModels().NewsletterSubscriberModel); },
  get chatbotQuery() { return createDelegate(getModels().ChatbotQueryModel); },
  get serviceRequest() { return createDelegate(getModels().ServiceRequestModel); }
};
