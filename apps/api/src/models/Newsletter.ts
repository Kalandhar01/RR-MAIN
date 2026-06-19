import mongoose, { Schema, Document } from "mongoose";

export interface INewsletter extends Document {
  division: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage: string;
  category: string;
  author: string;
  featured: boolean;
  status: string;
  publishDate?: Date | null;
  tags: string[];
  readTime: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const newsletterSchema = new Schema<INewsletter>(
  {
    division: { type: String, default: "ractysh-group", index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String },
    coverImage: { type: String, default: "" },
    category: { type: String, required: true, index: true },
    author: { type: String, required: true },
    featured: { type: Boolean, default: false, index: true },
    status: { type: String, default: "draft", index: true },
    publishDate: { type: Date, default: null },
    tags: { type: [String], default: [] },
    readTime: { type: String, required: true },
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
);

newsletterSchema.index({ status: 1, publishDate: -1 });
newsletterSchema.index({ division: 1, status: 1, publishDate: -1 });
newsletterSchema.index({ featured: 1, status: 1 });
newsletterSchema.index({ views: -1 });

export const NewsletterModel = mongoose.models.Newsletter || mongoose.model<INewsletter>("Newsletter", newsletterSchema);

export interface ISubscriber extends Document {
  email: string;
  division: string;
  status: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const subscriberSchema = new Schema<ISubscriber>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    division: { type: String, default: "ractysh-group" },
    status: { type: String, default: "active", index: true },
    source: { type: String, default: "executive-intelligence-center" }
  },
  { timestamps: true }
);

subscriberSchema.index({ division: 1, status: 1 });
subscriberSchema.index({ createdAt: -1 });

export const SubscriberModel = mongoose.models.Subscriber || mongoose.model<ISubscriber>("Subscriber", subscriberSchema);

export interface INewsletterSubscriber extends Document {
  email: string;
  division: string;
  createdAt: Date;
}

const newsletterSubscriberSchema = new Schema<INewsletterSubscriber>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    division: { type: String, default: "ractysh-group" }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

newsletterSubscriberSchema.index({ division: 1 });
newsletterSubscriberSchema.index({ createdAt: -1 });

export const NewsletterSubscriberModel = mongoose.models.NewsletterSubscriber || mongoose.model<INewsletterSubscriber>("NewsletterSubscriber", newsletterSubscriberSchema);
