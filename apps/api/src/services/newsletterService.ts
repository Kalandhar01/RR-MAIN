import mongoose from "mongoose";
import { NewsletterModel, SubscriberModel, type INewsletter, type ISubscriber } from "../models/Newsletter.js";
import type { NewsletterCreateInput, NewsletterSubscribeInput, NewsletterUpdateInput } from "../validation/newsletter.js";
import { safelyIngestLead, safelyIngestNewsletter } from "./ingestionService.js";
import { isMongoConnected } from "../lib/db.js";

export class NewsletterDatabaseUnavailableError extends Error {
  constructor(message = "Newsletter database is unavailable.") {
    super(message);
    this.name = "NewsletterDatabaseUnavailableError";
  }
}

export class NewsletterNotFoundError extends Error {
  constructor(message = "Newsletter not found.") {
    super(message);
    this.name = "NewsletterNotFoundError";
  }
}

export interface NewsletterDto {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage: string;
  category: string;
  author: string;
  featured: boolean;
  status: string;
  publishDate: string | null;
  tags: string[];
  readTime: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterTickerItem {
  label: string;
  title: string;
  category: string;
  slug: string;
}

let newsletterMongoEnabled = false;

export function setNewsletterPrismaEnabled(value: boolean): void {
  newsletterMongoEnabled = value;
}

function assertDatabase(): void {
  if (!newsletterMongoEnabled) {
    throw new NewsletterDatabaseUnavailableError("Newsletter database is unavailable.");
  }
}

function emptyExecutiveIntelligence() {
  return {
    featured: null,
    latest: null,
    recentIssues: [],
    trending: null,
    ticker: [],
    metrics: {
      subscriberCount: 0,
      issueCount: 0,
      recentPublication: null
    }
  };
}

function iso(value: Date | null | undefined): string | null {
  return value ? value.toISOString() : null;
}

function publicWhere(now = new Date()) {
  return {
    status: "published",
    publishDate: { $lte: now }
  };
}

function slugify(value: string): string {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return slug || `executive-intelligence-${Date.now()}`;
}

function computeReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

function parsePublishDate(value: string | undefined): Date | null | undefined {
  if (value === undefined) return undefined;
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Publish date must be a valid date.");
  }

  return date;
}

function mapNewsletter(record: INewsletter, includeContent = false): NewsletterDto {
  return {
    id: String(record._id),
    title: record.title,
    slug: record.slug,
    excerpt: record.excerpt,
    content: includeContent ? record.content : undefined,
    coverImage: record.coverImage,
    category: record.category,
    author: record.author,
    featured: record.featured,
    status: record.status,
    publishDate: iso(record.publishDate),
    tags: record.tags || [],
    readTime: record.readTime,
    views: record.views,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString()
  };
}

function newsletterIngestionPayload(record: INewsletter, action: "created" | "updated") {
  return {
    id: String(record._id),
    title: record.title,
    slug: record.slug,
    excerpt: record.excerpt,
    category: record.category,
    author: record.author,
    featured: record.featured,
    status: record.status,
    publishDate: iso(record.publishDate),
    tags: record.tags || [],
    action
  };
}

async function ensureUniqueSlug(base: string, existingId?: string): Promise<string> {
  let candidate = slugify(base);
  let suffix = 2;

  while (true) {
    const existing = await NewsletterModel.findOne({ slug: candidate }).select("_id").lean() as { _id: unknown } | null;
    if (!existing || (existingId && String(existing._id) === existingId)) return candidate;

    candidate = `${slugify(base)}-${suffix}`;
    suffix += 1;
  }
}

function publishDateForStatus(status: string, publishDate: Date | null | undefined): Date | null | undefined {
  if (status === "published") {
    return publishDate === undefined || publishDate === null ? new Date() : publishDate;
  }

  if (status === "scheduled") {
    if (!publishDate) {
      throw new Error("Scheduled newsletters require a publish date.");
    }
    return publishDate;
  }

  return publishDate;
}

async function normalizeCreateInput(input: NewsletterCreateInput) {
  const status = input.status;
  const publishDate = publishDateForStatus(status, parsePublishDate(input.publishDate));

  return {
    title: input.title,
    slug: await ensureUniqueSlug(input.slug || input.title),
    excerpt: input.excerpt,
    content: input.content,
    coverImage: input.coverImage,
    category: input.category,
    author: input.author,
    featured: input.featured || false,
    status,
    publishDate,
    tags: input.tags || [],
    readTime: input.readTime || computeReadTime(input.content)
  };
}

async function normalizeUpdateInput(id: string, input: NewsletterUpdateInput) {
  const next: Record<string, unknown> = {};

  if (input.title !== undefined) next.title = input.title;
  if (input.excerpt !== undefined) next.excerpt = input.excerpt;
  if (input.content !== undefined) next.content = input.content;
  if (input.coverImage !== undefined) next.coverImage = input.coverImage;
  if (input.category !== undefined) next.category = input.category;
  if (input.author !== undefined) next.author = input.author;
  if (input.featured !== undefined) next.featured = input.featured;
  if (input.tags !== undefined) next.tags = input.tags;

  if (input.slug !== undefined || input.title !== undefined) {
    next.slug = await ensureUniqueSlug(input.slug || input.title || "executive-intelligence", id);
  }

  const status = input.status;
  const parsedPublishDate = parsePublishDate(input.publishDate);

  if (status !== undefined) {
    next.status = status;
    const date = publishDateForStatus(status, parsedPublishDate);
    if (date !== undefined) next.publishDate = date;
  } else if (parsedPublishDate !== undefined) {
    next.publishDate = parsedPublishDate;
  }

  if (input.readTime !== undefined) {
    next.readTime = input.readTime || computeReadTime(input.content || "");
  } else if (input.content !== undefined) {
    next.readTime = computeReadTime(input.content);
  }

  return next;
}

async function normalizeFeatured(id: string, featured: boolean): Promise<void> {
  if (!featured) return;

  await NewsletterModel.updateMany(
    { _id: { $ne: id }, featured: true },
    { $set: { featured: false } }
  );
}

export async function listAdminNewsletters(): Promise<NewsletterDto[]> {
  assertDatabase();

  const newsletters = await NewsletterModel.find()
    .sort({ updatedAt: -1, createdAt: -1 })
    .lean();

  return newsletters.map((record) => mapNewsletter(record as unknown as unknown as INewsletter, true));
}

export async function createNewsletter(input: NewsletterCreateInput): Promise<NewsletterDto> {
  assertDatabase();

  const data = await normalizeCreateInput(input);
  const newsletter = await NewsletterModel.create(data);
  await normalizeFeatured(String(newsletter._id), newsletter.featured);

  const fresh = newsletter.featured
    ? await NewsletterModel.findById(newsletter._id).lean()
    : newsletter.toObject();

  const record = (fresh || newsletter.toObject()) as unknown as unknown as INewsletter;
  await safelyIngestNewsletter(newsletterIngestionPayload(record, "created"));
  return mapNewsletter(record, true);
}

export async function updateNewsletter(id: string, input: NewsletterUpdateInput): Promise<NewsletterDto> {
  assertDatabase();

  const data = await normalizeUpdateInput(id, input);
  const newsletter = await NewsletterModel.findByIdAndUpdate(id, { $set: data }, { new: true }).lean();
  if (!newsletter) throw new NewsletterNotFoundError();
  const n = newsletter as unknown as unknown as INewsletter;

  await normalizeFeatured(id, (data.featured as boolean) || n.featured);

  const fresh = n.featured
    ? await NewsletterModel.findById(id).lean()
    : newsletter;

  const record = (fresh || newsletter) as unknown as unknown as INewsletter;
  await safelyIngestNewsletter(newsletterIngestionPayload(record, "updated"));
  return mapNewsletter(record, true);
}

export async function deleteNewsletter(id: string): Promise<void> {
  assertDatabase();
  await NewsletterModel.findByIdAndDelete(id);
}

export async function getPublicNewsletterBySlug(slug: string): Promise<NewsletterDto | null> {
  try {
    if (!newsletterMongoEnabled) return null;

    const record = await NewsletterModel.findOne({
      slug,
      ...publicWhere()
    }).lean();

    if (!record) return null;

    await NewsletterModel.findByIdAndUpdate((record as unknown as unknown as INewsletter)._id, { $inc: { views: 1 } });
    const updated = await NewsletterModel.findById((record as unknown as unknown as INewsletter)._id).lean();
    return mapNewsletter((updated || record) as unknown as unknown as INewsletter, true);
  } catch (error) {
    if (!newsletterMongoEnabled) return null;
    throw error;
  }
}

export async function getFeaturedNewsletter(): Promise<NewsletterDto | null> {
  try {
    if (!newsletterMongoEnabled) return null;

    const record = await NewsletterModel.findOne({
      featured: true,
      ...publicWhere()
    }).sort({ publishDate: -1, updatedAt: -1 }).lean();

    if (record) return mapNewsletter(record as unknown as unknown as INewsletter);

    const latest = await NewsletterModel.findOne(publicWhere())
      .sort({ publishDate: -1, updatedAt: -1 })
      .lean();

    return latest ? mapNewsletter(latest as unknown as unknown as INewsletter) : null;
  } catch (error) {
    if (!newsletterMongoEnabled) return null;
    throw error;
  }
}

export async function getLatestNewsletter(): Promise<NewsletterDto | null> {
  try {
    if (!newsletterMongoEnabled) return null;

    const record = await NewsletterModel.findOne(publicWhere())
      .sort({ publishDate: -1, updatedAt: -1 })
      .lean();

    return record ? mapNewsletter(record as unknown as unknown as INewsletter) : null;
  } catch (error) {
    if (!newsletterMongoEnabled) return null;
    throw error;
  }
}

export async function getExecutiveIntelligence(limit = 6) {
  try {
    if (!newsletterMongoEnabled) return emptyExecutiveIntelligence();

    const take = Math.min(Math.max(limit, 3), 12);
    const where = publicWhere();
    const [newsletters, featured, latest, trending, subscriberCount, issueCount] = await Promise.all([
      NewsletterModel.find(where)
        .sort({ publishDate: -1, updatedAt: -1 })
        .limit(take)
        .lean(),
      getFeaturedNewsletter(),
      getLatestNewsletter(),
      NewsletterModel.findOne(where).sort({ views: -1, publishDate: -1 }).lean(),
      SubscriberModel.countDocuments({ status: "active" }),
      NewsletterModel.countDocuments(where)
    ]);

    const mapped = newsletters.map((record) => mapNewsletter(record as unknown as unknown as INewsletter));
    const trendingDto = trending ? mapNewsletter(trending as unknown as unknown as INewsletter) : null;
    const ticker: NewsletterTickerItem[] = [
      latest ? { label: "Latest Publication", title: latest.title, category: latest.category, slug: latest.slug } : null,
      featured ? { label: "Featured Insight", title: featured.title, category: featured.category, slug: featured.slug } : null,
      trendingDto ? { label: "Trending Issue", title: trendingDto.title, category: trendingDto.category, slug: trendingDto.slug } : null,
      ...mapped.slice(0, 4).map((item) => ({
        label: "Executive Brief",
        title: item.title,
        category: item.category,
        slug: item.slug
      }))
    ].filter((item): item is NewsletterTickerItem => Boolean(item));

    return {
      featured,
      latest,
      recentIssues: mapped,
      trending: trendingDto,
      ticker,
      metrics: {
        subscriberCount,
        issueCount,
        recentPublication: latest?.publishDate || null
      }
    };
  } catch (error) {
    if (!newsletterMongoEnabled) return emptyExecutiveIntelligence();
    throw error;
  }
}

export async function subscribeToNewsletter(input: NewsletterSubscribeInput) {
  assertDatabase();

  const now = new Date();
  const email = input.email.toLowerCase();

  const subscriber = await SubscriberModel.findOneAndUpdate(
    { email },
    {
      $set: {
        email,
        division: input.division,
        source: input.source || "executive-intelligence-center",
        status: "active",
        updatedAt: now
      }
    },
    { upsert: true, new: true }
  ).lean() as mongoose.FlattenMaps<ISubscriber> | null;

  if (!subscriber) {
    return {
      id: "",
      email,
      status: "active",
      source: input.source || "executive-intelligence-center",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };
  }

  await safelyIngestLead({
    fullName: email.split("@")[0] || "Newsletter Subscriber",
    email,
    division: input.division,
    source: input.source || "executive-intelligence-center",
    sourceType: "newsletter_form",
    service: "Executive Intelligence",
    status: "new",
    message: "Newsletter subscription captured for future client intelligence and communications.",
    metadata: {
      subscriberId: String(subscriber._id),
      subscriptionStatus: subscriber.status
    },
    externalEntityId: String(subscriber._id),
    externalEntityModel: "Subscriber"
  });

  return {
    id: String(subscriber._id),
    email: subscriber.email,
    status: subscriber.status,
    source: subscriber.source,
    createdAt: subscriber.createdAt.toISOString(),
    updatedAt: subscriber.updatedAt.toISOString()
  };
}
