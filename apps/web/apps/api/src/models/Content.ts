import mongoose, { Schema, Document } from "mongoose";

export interface ISiteConfig extends Document {
  key: string;
  division: string;
  logoText: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  themeMode: string;
  themeAccent: string;
  footerHeadline: string;
  footerDescription: string;
  footerLinks: Record<string, unknown>;
  socialLinks: Record<string, unknown>;
  popupConfig?: Record<string, unknown> | null;
  googleRatings?: Record<string, unknown> | null;
  feedbackConfig?: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}

const siteConfigSchema = new Schema<ISiteConfig>(
  {
    key: { type: String, default: "default", unique: true },
    division: { type: String, default: "ractysh-group" },
    logoText: { type: String, default: "Ractysh" },
    seoTitle: { type: String, required: true },
    seoDescription: { type: String, required: true },
    seoKeywords: { type: [String], default: [] },
    themeMode: { type: String, default: "light" },
    themeAccent: { type: String, default: "#8b1118" },
    footerHeadline: { type: String, required: true },
    footerDescription: { type: String, required: true },
    footerLinks: { type: Schema.Types.Mixed, default: [] },
    socialLinks: { type: Schema.Types.Mixed, default: [] },
    popupConfig: { type: Schema.Types.Mixed, default: null },
    googleRatings: { type: Schema.Types.Mixed, default: null },
    feedbackConfig: { type: Schema.Types.Mixed, default: null }
  },
  { timestamps: true }
);

siteConfigSchema.index({ division: 1 });

export interface INavItem extends Document {
  siteConfigId: mongoose.Types.ObjectId;
  parentId?: mongoose.Types.ObjectId | null;
  label: string;
  description?: string | null;
  href: string;
  position: number;
  visible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const navItemSchema = new Schema<INavItem>(
  {
    siteConfigId: { type: Schema.Types.ObjectId, ref: "SiteConfig", required: true },
    parentId: { type: Schema.Types.ObjectId, ref: "NavItem", default: null },
    label: { type: String, required: true },
    description: { type: String, default: null },
    href: { type: String, required: true },
    position: { type: Number, default: 0 },
    visible: { type: Boolean, default: true }
  },
  { timestamps: true }
);

navItemSchema.index({ siteConfigId: 1, position: 1 });
navItemSchema.index({ siteConfigId: 1, parentId: 1, label: 1 }, { unique: true });

export interface IHeroSection extends Document {
  siteConfigId: mongoose.Types.ObjectId;
  pageSlug: string;
  division: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta?: string | null;
  primaryHref?: string | null;
  secondaryCta?: string | null;
  secondaryHref?: string | null;
  trustLine?: string | null;
  mediaUrl?: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const heroSectionSchema = new Schema<IHeroSection>(
  {
    siteConfigId: { type: Schema.Types.ObjectId, ref: "SiteConfig", required: true },
    pageSlug: { type: String, default: "home" },
    division: { type: String, default: "ractysh-group" },
    eyebrow: { type: String, required: true },
    headline: { type: String, required: true },
    subheadline: { type: String, required: true },
    primaryCta: { type: String, default: null },
    primaryHref: { type: String, default: null },
    secondaryCta: { type: String, default: null },
    secondaryHref: { type: String, default: null },
    trustLine: { type: String, default: null },
    mediaUrl: { type: String, default: null },
    status: { type: String, default: "published", index: true }
  },
  { timestamps: true }
);

heroSectionSchema.index({ siteConfigId: 1, pageSlug: 1 }, { unique: true });
heroSectionSchema.index({ division: 1, pageSlug: 1 });

export interface IPageSection extends Document {
  siteConfigId: mongoose.Types.ObjectId;
  pageSlug: string;
  division: string;
  key: string;
  label: string;
  visible: boolean;
  position: number;
  content: Record<string, unknown>;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const pageSectionSchema = new Schema<IPageSection>(
  {
    siteConfigId: { type: Schema.Types.ObjectId, ref: "SiteConfig", required: true },
    pageSlug: { type: String, required: true },
    division: { type: String, default: "ractysh-group" },
    key: { type: String, required: true },
    label: { type: String, required: true },
    visible: { type: Boolean, default: true },
    position: { type: Number, default: 0 },
    content: { type: Schema.Types.Mixed, default: {} },
    status: { type: String, default: "published", index: true }
  },
  { timestamps: true }
);

pageSectionSchema.index({ siteConfigId: 1, pageSlug: 1, key: 1 }, { unique: true });
pageSectionSchema.index({ division: 1, pageSlug: 1, position: 1 });
pageSectionSchema.index({ pageSlug: 1, position: 1 });

export interface IBlogPost extends Document {
  authorId?: mongoose.Types.ObjectId | null;
  division: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body?: string | null;
  imageUrl?: string | null;
  readingTime?: string | null;
  tags: string[];
  status: string;
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const blogPostSchema = new Schema<IBlogPost>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "TeamMember", default: null },
    division: { type: String, default: "ractysh-group" },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true, index: true },
    excerpt: { type: String, required: true },
    body: { type: String, default: null },
    imageUrl: { type: String, default: null },
    readingTime: { type: String, default: null },
    tags: { type: [String], default: [] },
    status: { type: String, default: "draft", index: true },
    publishedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

blogPostSchema.index({ status: 1, publishedAt: -1 });
blogPostSchema.index({ division: 1, status: 1, publishedAt: -1 });
blogPostSchema.index({ category: 1, status: 1 });

export interface IBlogComment extends Document {
  blogId: mongoose.Types.ObjectId;
  authorName: string;
  authorEmail: string;
  content: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogCommentSchema = new Schema<IBlogComment>(
  {
    blogId: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    authorName: { type: String, required: true },
    authorEmail: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, default: "pending", index: true }
  },
  { timestamps: true }
);

blogCommentSchema.index({ blogId: 1, status: 1 });
blogCommentSchema.index({ createdAt: -1 });

export const SiteConfigModel = mongoose.models.SiteConfig || mongoose.model<ISiteConfig>("SiteConfig", siteConfigSchema);
export const NavItemModel = mongoose.models.NavItem || mongoose.model<INavItem>("NavItem", navItemSchema);
export const HeroSectionModel = mongoose.models.HeroSection || mongoose.model<IHeroSection>("HeroSection", heroSectionSchema);
export const PageSectionModel = mongoose.models.PageSection || mongoose.model<IPageSection>("PageSection", pageSectionSchema);
export const BlogPostModel = mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", blogPostSchema);
export const BlogCommentModel = mongoose.models.BlogComment || mongoose.model<IBlogComment>("BlogComment", blogCommentSchema);
