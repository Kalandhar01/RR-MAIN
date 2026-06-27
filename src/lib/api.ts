import { cache } from "react";
import { fallbackContent } from "@/data/fallbackContent";
import type { ConsultationRequest, SiteContent } from "@/lib/types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
export const INTERNAL_API_URL = process.env.INTERNAL_API_URL || API_URL;

export function normalizeImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    if (url.startsWith("https://res.cloudinary.com/")) {
      const parts = url.split("/upload/");
      if (parts.length === 2) return `${parts[0]}/upload/f_auto,q_auto/${parts[1]}`;
    }
    return url;
  }
  return url;
}

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

function clientAwareApiUrl(): string {
  return typeof window === "undefined" ? API_URL : "";
}

function serverApiUrl(): string {
  return typeof window === "undefined" ? INTERNAL_API_URL : API_URL;
}

export interface NewsletterSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage: string;
  category: string;
  author: string;
  featured: boolean;
  status: "draft" | "scheduled" | "published" | "archived";
  publishDate: string | null;
  tags: string[];
  readTime: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExecutiveIntelligencePayload {
  featured: NewsletterSummary | null;
  latest: NewsletterSummary | null;
  recentIssues: NewsletterSummary[];
  trending: NewsletterSummary | null;
  ticker: Array<{
    label: string;
    title: string;
    category: string;
    slug: string;
  }>;
  metrics: {
    subscriberCount: number;
    issueCount: number;
    recentPublication: string | null;
  };
}

export interface BlogSummary {
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
  status: "draft" | "scheduled" | "published" | "archived";
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

export interface BlogListPayload {
  blogs: BlogSummary[];
  featured: BlogSummary | null;
  latest: BlogSummary[];
  recentInsights: BlogSummary[];
  categories: string[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

function mergeById<T extends { id: string }>(contentItems: T[] | undefined, fallbackItems: T[]): T[] {
  if (!contentItems?.length) return fallbackItems;

  const fallbackIds = new Set(fallbackItems.map((item) => item.id));
  const contentById = new Map(contentItems.map((item) => [item.id, item]));
  const mergedFallbackOrder = fallbackItems.map((item) => contentById.get(item.id) || item);
  const extraContentItems = contentItems.filter((item) => !fallbackIds.has(item.id));

  return [...mergedFallbackOrder, ...extraContentItems];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeImageUrls<T extends Record<string, any>>(obj: T, imageKeys: string[]): T {
  const result = { ...obj };
  for (const key of imageKeys) {
    const val = result[key];
    if (typeof val === "string") {
      (result as Record<string, unknown>)[key] = normalizeImageUrl(val);
    }
    if (Array.isArray(val)) {
      (result as Record<string, unknown>)[key] = val.map((item: unknown) => (typeof item === "string" ? normalizeImageUrl(item) : item));
    }
  }
  return result;
}

function deepMergeFounder(mongo?: Partial<SiteContent["founder"]> | null, fallback?: SiteContent["founder"]): SiteContent["founder"] {
  if (!mongo) return fallback!;
  return {
    ...fallback!,
    ...mongo,
    image: normalizeImageUrl(mongo.image || fallback!.image),
    heroImage: normalizeImageUrl(mongo.heroImage || fallback!.heroImage),
    gallery: mongo.gallery?.length
      ? mongo.gallery.map((url: string) => normalizeImageUrl(url))
      : fallback!.gallery.map((url: string) => normalizeImageUrl(url)),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMergeArray<T extends Record<string, any>>(
  items: T[] | undefined | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fallbackItems: any[],
  imageFields: string[]
): T[] {
  if (!items?.length) return fallbackItems as T[];
  const fallbackById = new Map(fallbackItems.map((item, i) => [(item as Record<string, unknown>).id as string || String(i), item]));
  return items.map((item) => {
    const id = (item as Record<string, unknown>).id as string | undefined;
    const fallback = id ? fallbackById.get(id) : undefined;
    if (!fallback) return normalizeImageUrls(item, imageFields);
    const merged = { ...fallback, ...item } as T;
    return normalizeImageUrls(merged, imageFields);
  });
}

function normalizeSiteContent(payload: Partial<SiteContent> | null | undefined): SiteContent {
  const content = payload || {};
  const hasEnterpriseNav = Boolean(content.nav?.items?.some((item) => ["Careers", "Blog", "About Us"].includes(item.label)));
  const hasLegalFooter = Boolean(content.footer?.links?.some((item) => item.href.includes("privacy-policy")));

  return {
    ...fallbackContent,
    ...content,
    seo: {
      ...fallbackContent.seo,
      ...content.seo,
      ogImage: normalizeImageUrl((content.seo?.ogImage || fallbackContent.seo.ogImage) as string)
    },
    theme: {
      ...fallbackContent.theme,
      ...content.theme
    },
    nav: hasEnterpriseNav
      ? {
          ...fallbackContent.nav,
          ...content.nav,
          items: content.nav?.items?.length ? content.nav.items : fallbackContent.nav.items
        }
      : fallbackContent.nav,
    hero: {
      ...fallbackContent.hero,
      ...content.hero
    },
    divisions: mergeById(content.divisions, fallbackContent.divisions),
    services: content.services?.length ? content.services : fallbackContent.services,
    projects: content.projects?.length ? content.projects : fallbackContent.projects,
    stats: content.stats?.length ? content.stats : fallbackContent.stats,
    testimonials: content.testimonials?.length ? content.testimonials : fallbackContent.testimonials,
    blogs: content.blogs?.length
      ? content.blogs.map((b) => ({ ...b, image: normalizeImageUrl(b.image) }))
      : [],
    founder: deepMergeFounder(content.founder as Partial<SiteContent["founder"]> | null, fallbackContent.founder),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    directors: deepMergeArray(content.directors as any, fallbackContent.directors, ["image"]),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    businessDivisions: deepMergeArray(content.businessDivisions as any, fallbackContent.businessDivisions, ["image"]),
    locations: content.locations?.length ? content.locations : fallbackContent.locations,
    legal: {
      ...fallbackContent.legal,
      ...content.legal,
      certificateUrl: normalizeImageUrl(content.legal?.certificateUrl || fallbackContent.legal.certificateUrl),
      certificatePreviewUrl: normalizeImageUrl(content.legal?.certificatePreviewUrl || fallbackContent.legal.certificatePreviewUrl),
      documents: content.legal?.documents?.length ? content.legal.documents : fallbackContent.legal.documents
    },
    popup: {
      ...fallbackContent.popup,
      ...content.popup
    },
    googleRatings: {
      ...fallbackContent.googleRatings,
      ...content.googleRatings,
      reviews: content.googleRatings?.reviews?.length ? content.googleRatings.reviews : fallbackContent.googleRatings.reviews
    },
    feedback: {
      ...fallbackContent.feedback,
      ...content.feedback
    },
    careers: {
      ...fallbackContent.careers,
      ...content.careers,
      culture: content.careers?.culture?.length ? content.careers.culture : fallbackContent.careers.culture,
      jobs: content.careers?.jobs?.length ? content.careers.jobs : fallbackContent.careers.jobs,
      internships: content.careers?.internships?.length ? content.careers.internships : fallbackContent.careers.internships
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pages: deepMergeArray(content.pages as any, fallbackContent.pages, ["image"]),
    certifications: content.certifications?.length ? content.certifications : fallbackContent.certifications,
    milestones: content.milestones?.length ? content.milestones : fallbackContent.milestones,
    partners: content.partners?.length ? content.partners : fallbackContent.partners,
    sections: content.sections?.some((section) => section.id === "founder")
      ? content.sections
      : fallbackContent.sections,
    footer: hasLegalFooter
      ? {
          ...fallbackContent.footer,
          ...content.footer,
          links: content.footer?.links?.length ? content.footer.links : fallbackContent.footer.links,
          socialLinks: content.footer?.socialLinks?.length ? content.footer.socialLinks : fallbackContent.footer.socialLinks
        }
      : fallbackContent.footer,
    updatedAt: content.updatedAt || fallbackContent.updatedAt
  };
}

export const getSiteContent = cache(async function getSiteContent(): Promise<SiteContent> {
  try {
    const response = await fetch(`${API_URL}/api/site`, {
      cache: "no-store",
      next: { revalidate: 0 }
    });

    if (!response.ok) return fallbackContent;
    return normalizeSiteContent((await response.json()) as Partial<SiteContent>);
  } catch {
    return fallbackContent;
  }
});

export const getExecutiveIntelligence = cache(async function getExecutiveIntelligence(): Promise<ExecutiveIntelligencePayload | null> {
  try {
    const response = await fetch(`${serverApiUrl()}/api/newsletters?limit=6`, {
      cache: "no-store",
      next: { revalidate: 0 }
    });

    if (!response.ok) return null;
    return (await response.json()) as ExecutiveIntelligencePayload;
  } catch {
    return null;
  }
});

export async function getNewsletterBySlug(slug: string): Promise<NewsletterSummary | null> {
  try {
    const response = await fetch(`${serverApiUrl()}/api/newsletters/${encodeURIComponent(slug)}`, {
      cache: "no-store",
      next: { revalidate: 0 }
    });

    if (!response.ok) return null;
    return (await response.json()) as NewsletterSummary;
  } catch {
    return null;
  }
}

function blogQuery(params: { page?: number; limit?: number; search?: string; category?: string } = {}) {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.search?.trim()) searchParams.set("search", params.search.trim());
  if (params.category?.trim()) searchParams.set("category", params.category.trim());
  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export async function getBlogIndex(params: { page?: number; limit?: number; search?: string; category?: string } = {}): Promise<BlogListPayload | null> {
  try {
    const response = await fetch(`${serverApiUrl()}/api/blogs${blogQuery(params)}`, {
      cache: "no-store",
      next: { revalidate: 0 }
    });

    if (!response.ok) return null;
    const data = (await response.json()) as BlogListPayload;
    return {
      ...data,
      blogs: data.blogs.map((b) => ({ ...b, coverImage: normalizeImageUrl(b.coverImage) })),
      featured: data.featured ? { ...data.featured, coverImage: normalizeImageUrl(data.featured.coverImage) } : null,
      latest: data.latest.map((b) => ({ ...b, coverImage: normalizeImageUrl(b.coverImage) })),
      recentInsights: (data.recentInsights || []).map((b) => ({ ...b, coverImage: normalizeImageUrl(b.coverImage) })),
    };
  } catch {
    return null;
  }
}

export async function getBlogBySlug(slug: string, options: { trackView?: boolean } = {}): Promise<BlogSummary | null> {
  try {
    const trackQuery = options.trackView === false ? "?trackView=0" : "";
    const response = await fetch(`${serverApiUrl()}/api/blogs/${encodeURIComponent(slug)}${trackQuery}`, {
      cache: "no-store",
      next: { revalidate: 0 }
    });

    if (!response.ok) return null;
    const blog = (await response.json()) as BlogSummary;
    return { ...blog, coverImage: normalizeImageUrl(blog.coverImage) };
  } catch {
    return null;
  }
}

export async function getLatestBlogs(limit = 6): Promise<BlogSummary[]> {
  try {
    const response = await fetch(`${serverApiUrl()}/api/blogs/latest?limit=${limit}`, {
      cache: "no-store",
      next: { revalidate: 0 }
    });

    if (!response.ok) return [];
    const payload = (await response.json()) as { blogs: BlogSummary[] };
    return (payload.blogs || []).map((b) => ({ ...b, coverImage: normalizeImageUrl(b.coverImage) }));
  } catch {
    return [];
  }
}

export async function getConsultationWorkflow(id: string, trackingToken: string): Promise<ConsultationRequest> {
  const apiUrl = clientAwareApiUrl();
  const response = await fetch(
    `${apiUrl}/api/consultations/${id}/workflow?trackingToken=${encodeURIComponent(trackingToken)}`,
    {
      cache: "no-store"
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unable to load demo workflow" }));
    throw new ApiRequestError(error.message || "Unable to load demo workflow", response.status);
  }

  return response.json() as Promise<ConsultationRequest>;
}
