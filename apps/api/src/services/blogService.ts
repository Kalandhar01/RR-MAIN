import { BlogModel, type IBlog } from "../models/Blog.js";
import type { BlogCreateInput, BlogUpdateInput } from "../validation/blog.js";
import { isMongoConnected } from "../lib/db.js";

export class BlogDatabaseUnavailableError extends Error {
  constructor(message = "Blog database is unavailable.") {
    super(message);
    this.name = "BlogDatabaseUnavailableError";
  }
}

export interface BlogPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BlogDto {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage: string;
  coverImageAlt: string | null;
  imageMetadata: Record<string, unknown> | null;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  status: string;
  publishedAt: string | null;
  readTime: string;
  seoTitle: string | null;
  seoDescription: string | null;
  canonicalUrl: string | null;
  views: number;
  likes: number;
  relatedSlugs: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogListOptions {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
}

export interface BlogListPayload {
  blogs: BlogDto[];
  featured: BlogDto | null;
  latest: BlogDto[];
  recentInsights: BlogDto[];
  categories: string[];
  pagination: BlogPagination;
}

let blogMongoEnabled = false;

export function setBlogPrismaEnabled(value: boolean): void {
  blogMongoEnabled = value;
}

function assertDatabase(): void {
  if (!blogMongoEnabled) {
    throw new BlogDatabaseUnavailableError("Blog database is unavailable.");
  }
}

function emptyBlogListPayload(options: BlogListOptions = {}): BlogListPayload {
  const page = parsePage(options.page);
  const limit = parseLimit(options.limit);

  return {
    blogs: [],
    featured: null,
    latest: [],
    recentInsights: [],
    categories: [],
    pagination: pagination(page, limit, 0)
  };
}

function iso(value: Date | null | undefined): string | null {
  return value ? value.toISOString() : null;
}

function publicWhere(now = new Date()) {
  return {
    status: "published",
    $or: [{ publishedAt: null }, { publishedAt: { $lte: now } }]
  };
}

function slugify(value: string): string {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);

  return slug || `blog-${Date.now()}`;
}

function computeReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

function parseDate(value: string | undefined): Date | null | undefined {
  if (value === undefined) return undefined;
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Published date must be a valid date.");
  }

  return date;
}

function mapBlog(record: IBlog, includeContent = false): BlogDto {
  return {
    id: String(record._id),
    title: record.title,
    slug: record.slug,
    excerpt: record.excerpt,
    content: includeContent ? record.content : undefined,
    coverImage: record.coverImage,
    coverImageAlt: record.coverImageAlt || null,
    imageMetadata: (record.imageMetadata as Record<string, unknown>) || null,
    author: record.author,
    category: record.category,
    tags: record.tags || [],
    featured: record.featured,
    status: record.status,
    publishedAt: iso(record.publishedAt),
    readTime: record.readTime,
    seoTitle: record.seoTitle || null,
    seoDescription: record.seoDescription || null,
    canonicalUrl: record.canonicalUrl || null,
    views: record.views,
    likes: record.likes,
    relatedSlugs: record.relatedSlugs || [],
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString()
  };
}

async function ensureUniqueSlug(base: string, existingId?: string): Promise<string> {
  const normalized = slugify(base);
  let candidate = normalized;
  let suffix = 2;

  while (true) {
    const existing = await BlogModel.findOne({ slug: candidate }).select("_id").lean();

    if (!existing || (existingId && String(existing._id) === existingId)) return candidate;

    candidate = `${normalized}-${suffix}`;
    suffix += 1;
  }
}

function publishedAtForStatus(status: string, publishedAt: Date | null | undefined): Date | null | undefined {
  if (status === "published") {
    return publishedAt === undefined || publishedAt === null ? new Date() : publishedAt;
  }

  if (status === "scheduled") {
    if (!publishedAt) {
      throw new Error("Scheduled blogs require a published date.");
    }
    return publishedAt;
  }

  return publishedAt;
}

function parsePage(value: number | undefined): number {
  if (!Number.isFinite(value)) return 1;
  return Math.max(1, Math.floor(Number(value)));
}

function parseLimit(value: number | undefined): number {
  if (!Number.isFinite(value)) return 12;
  return Math.min(48, Math.max(1, Math.floor(Number(value))));
}

function searchFilter(search: string | undefined): Record<string, unknown> | undefined {
  const query = search?.trim();
  if (!query) return undefined;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return {
    $or: [
      { title: { $regex: escaped, $options: "i" } },
      { slug: { $regex: escaped, $options: "i" } },
      { excerpt: { $regex: escaped, $options: "i" } },
      { category: { $regex: escaped, $options: "i" } },
      { author: { $regex: escaped, $options: "i" } }
    ]
  };
}

function categoryFilter(category: string | undefined): Record<string, unknown> | undefined {
  const value = category?.trim();
  if (!value || value === "All Articles") return undefined;
  return { category: value };
}

function whereFromOptions(options: BlogListOptions, publicOnly: boolean): Record<string, unknown> {
  const filters: Record<string, unknown>[] = [];
  if (publicOnly) filters.push(publicWhere());
  if (!publicOnly && options.status) filters.push({ status: options.status });

  const category = categoryFilter(options.category);
  if (category) filters.push(category);

  const search = searchFilter(options.search);
  if (search) filters.push(search);

  return filters.length ? { $and: filters } : {};
}

function pagination(page: number, limit: number, total: number): BlogPagination {
  return {
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit))
  };
}

async function normalizeFeatured(id: string, featured: boolean): Promise<void> {
  if (!featured) return;

  await BlogModel.updateMany(
    { _id: { $ne: id }, featured: true },
    { $set: { featured: false } }
  );
}

async function normalizeCreateInput(input: BlogCreateInput): Promise<Partial<IBlog>> {
  const status = input.status;
  const publishedAt = publishedAtForStatus(status, parseDate(input.publishedAt));

  return {
    title: input.title,
    slug: await ensureUniqueSlug(input.slug || input.title),
    excerpt: input.excerpt,
    content: input.content,
    coverImage: input.coverImage,
    coverImageAlt: input.coverImageAlt || null,
    imageMetadata: input.imageMetadata as Record<string, unknown> | undefined,
    author: input.author,
    category: input.category,
    tags: input.tags || [],
    featured: input.featured || false,
    status,
    publishedAt,
    readTime: input.readTime || computeReadTime(input.content),
    seoTitle: input.seoTitle || null,
    seoDescription: input.seoDescription || null,
    canonicalUrl: input.canonicalUrl || null,
    relatedSlugs: input.relatedSlugs || []
  };
}

async function normalizeUpdateInput(id: string, input: BlogUpdateInput): Promise<Record<string, unknown>> {
  const existing = await BlogModel.findById(id).lean();
  if (!existing) throw new Error("Blog not found.");

  const next: Record<string, unknown> = {};

  if (input.title !== undefined) next.title = input.title;
  if (input.excerpt !== undefined) next.excerpt = input.excerpt;
  if (input.content !== undefined) next.content = input.content;
  if (input.coverImage !== undefined) next.coverImage = input.coverImage;
  if (input.coverImageAlt !== undefined) next.coverImageAlt = input.coverImageAlt || null;
  if (input.imageMetadata !== undefined) next.imageMetadata = input.imageMetadata;
  if (input.author !== undefined) next.author = input.author;
  if (input.category !== undefined) next.category = input.category;
  if (input.tags !== undefined) next.tags = input.tags;
  if (input.featured !== undefined) next.featured = input.featured;
  if (input.seoTitle !== undefined) next.seoTitle = input.seoTitle || null;
  if (input.seoDescription !== undefined) next.seoDescription = input.seoDescription || null;
  if (input.canonicalUrl !== undefined) next.canonicalUrl = input.canonicalUrl || null;
  if (input.relatedSlugs !== undefined) next.relatedSlugs = input.relatedSlugs;

  if (input.slug !== undefined || input.title !== undefined) {
    next.slug = await ensureUniqueSlug(input.slug || input.title || existing.title, id);
  }

  const status = input.status;
  const parsedPublishedAt = parseDate(input.publishedAt);

  if (status !== undefined) {
    next.status = status;
    const date = publishedAtForStatus(status, parsedPublishedAt);
    if (date !== undefined) next.publishedAt = date;
  } else if (parsedPublishedAt !== undefined) {
    next.publishedAt = parsedPublishedAt;
  }

  if (input.readTime !== undefined) {
    next.readTime = input.readTime || computeReadTime(input.content || existing.content);
  } else if (input.content !== undefined) {
    next.readTime = computeReadTime(input.content);
  }

  return next;
}

export async function listAdminBlogs(options: BlogListOptions = {}): Promise<BlogListPayload> {
  assertDatabase();

  const page = parsePage(options.page);
  const limit = parseLimit(options.limit);
  const where = whereFromOptions(options, false);
  const skip = (page - 1) * limit;

  const [records, total, featured, latest, insights, categories] = await Promise.all([
    BlogModel.find(where)
      .sort({ updatedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    BlogModel.countDocuments(where),
    BlogModel.findOne({ featured: true }).sort({ updatedAt: -1 }).lean(),
    BlogModel.find().sort({ publishedAt: -1, updatedAt: -1 }).limit(6).lean(),
    BlogModel.find({ category: "Insights" }).sort({ publishedAt: -1, updatedAt: -1 }).limit(6).lean(),
    BlogModel.distinct("category", {})
  ]);

  return {
    blogs: records.map((record) => mapBlog(record as IBlog, true)),
    featured: featured ? mapBlog(featured as IBlog, true) : null,
    latest: latest.map((record) => mapBlog(record as IBlog)),
    recentInsights: insights.map((record) => mapBlog(record as IBlog)),
    categories: categories as string[],
    pagination: pagination(page, limit, total)
  };
}

export async function listPublicBlogs(options: BlogListOptions = {}): Promise<BlogListPayload> {
  try {
    if (!blogMongoEnabled) return emptyBlogListPayload(options);

    const page = parsePage(options.page);
    const limit = parseLimit(options.limit);
    const where = whereFromOptions(options, true);
    const publicFilter = publicWhere();
    const skip = (page - 1) * limit;

    const [records, total, featured, latest, insights, categories] = await Promise.all([
      BlogModel.find(where)
        .sort({ publishedAt: -1, updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BlogModel.countDocuments(where),
      BlogModel.findOne({ featured: true, ...publicFilter }).sort({ publishedAt: -1, updatedAt: -1 }).lean(),
      BlogModel.find(publicFilter).sort({ publishedAt: -1, updatedAt: -1 }).limit(6).lean(),
      BlogModel.find({ ...publicFilter, category: "Insights" }).sort({ publishedAt: -1, updatedAt: -1 }).limit(6).lean(),
      BlogModel.distinct("category", publicFilter)
    ]);

    const latestDtos = latest.map((record) => mapBlog(record as IBlog));

    return {
      blogs: records.map((record) => mapBlog(record as IBlog)),
      featured: featured ? mapBlog(featured as IBlog) : latestDtos[0] || null,
      latest: latestDtos,
      recentInsights: insights.length ? insights.map((record) => mapBlog(record as IBlog)) : latestDtos.slice(0, 3),
      categories: categories as string[],
      pagination: pagination(page, limit, total)
    };
  } catch (error) {
    if (!blogMongoEnabled) return emptyBlogListPayload(options);
    throw error;
  }
}

export async function getFeaturedBlog(): Promise<BlogDto | null> {
  try {
    if (!blogMongoEnabled) return null;

    const record = await BlogModel.findOne({
      featured: true,
      ...publicWhere()
    }).sort({ publishedAt: -1, updatedAt: -1 }).lean();

    if (record) return mapBlog(record as IBlog);

    const latest = await BlogModel.findOne(publicWhere())
      .sort({ publishedAt: -1, updatedAt: -1 })
      .lean();

    return latest ? mapBlog(latest as IBlog) : null;
  } catch (error) {
    if (!blogMongoEnabled) return null;
    throw error;
  }
}

export async function getLatestBlogs(limit = 6): Promise<BlogDto[]> {
  try {
    if (!blogMongoEnabled) return [];

    const records = await BlogModel.find(publicWhere())
      .sort({ publishedAt: -1, updatedAt: -1 })
      .limit(parseLimit(limit))
      .lean();

    return records.map((record) => mapBlog(record as IBlog));
  } catch (error) {
    if (!blogMongoEnabled) return [];
    throw error;
  }
}

export async function getPublicBlogBySlug(slug: string, options: { incrementViews?: boolean } = {}): Promise<BlogDto | null> {
  try {
    if (!blogMongoEnabled) return null;

    const record = await BlogModel.findOne({
      slug,
      ...publicWhere()
    }).lean();

    if (!record) return null;

    if (options.incrementViews !== false) {
      await BlogModel.findByIdAndUpdate(record._id, { $inc: { views: 1 } });
      const updated = await BlogModel.findById(record._id).lean();
      if (updated) return mapBlog(updated as IBlog, true);
    }

    return mapBlog(record as IBlog, true);
  } catch (error) {
    if (!blogMongoEnabled) return null;
    throw error;
  }
}

export async function createBlog(input: BlogCreateInput): Promise<BlogDto> {
  assertDatabase();

  const data = await normalizeCreateInput(input);
  const blog = await BlogModel.create(data);
  await normalizeFeatured(String(blog._id), blog.featured);

  const fresh = blog.featured
    ? await BlogModel.findById(blog._id).lean()
    : blog.toObject();

  return mapBlog((fresh || blog.toObject()) as IBlog, true);
}

export async function updateBlog(id: string, input: BlogUpdateInput): Promise<BlogDto> {
  assertDatabase();

  const data = await normalizeUpdateInput(id, input);
  const blog = await BlogModel.findByIdAndUpdate(id, { $set: data }, { new: true }).lean();
  if (!blog) throw new Error("Blog not found.");

  await normalizeFeatured(id, (data.featured as boolean) || blog.featured);

  const fresh = blog.featured
    ? await BlogModel.findById(id).lean()
    : blog;

  return mapBlog((fresh || blog) as IBlog, true);
}

export async function deleteBlog(id: string): Promise<void> {
  assertDatabase();
  await BlogModel.findByIdAndDelete(id);
}
