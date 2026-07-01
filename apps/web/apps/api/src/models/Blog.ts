import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  division: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage: string;
  coverImageAlt?: string | null;
  imageMetadata?: Record<string, unknown> | null;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  status: string;
  publishedAt?: Date | null;
  readTime: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  canonicalUrl?: string | null;
  views: number;
  likes: number;
  relatedSlugs: string[];
  aiGenerated?: boolean;
  aiPrompt?: string | null;
  newsletterId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    division: { type: String, default: "ractysh-group", index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String },
    coverImage: { type: String, default: "" },
    coverImageAlt: { type: String, default: null },
    imageMetadata: { type: Schema.Types.Mixed },
    author: { type: String, required: true },
    category: { type: String, required: true, index: true },
    tags: { type: [String], default: [] },
    featured: { type: Boolean, default: false, index: true },
    status: { type: String, default: "draft", index: true },
    publishedAt: { type: Date, default: null },
    readTime: { type: String, required: true },
    seoTitle: { type: String, default: null },
    seoDescription: { type: String, default: null },
    canonicalUrl: { type: String, default: null },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    relatedSlugs: { type: [String], default: [] },
    aiGenerated: { type: Boolean, default: false },
    aiPrompt: { type: String, default: null },
    newsletterId: { type: String, default: null }
  },
  { timestamps: true }
);

blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ division: 1, status: 1, publishedAt: -1 });
blogSchema.index({ featured: 1, status: 1 });
blogSchema.index({ views: -1 });
blogSchema.index({ category: 1, status: 1 });

export const BlogModel = mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);
