import type { MetadataRoute } from "next";
import { commercialServiceRoutes } from "@/data/commercialServices";
import { servicePageRoutes } from "@/data/servicePages";
import { getSiteContent, getBlogIndex } from "@/lib/api";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSiteContent();
  const baseUrl = SITE_URL;

  const staticRoutes = [
    "",
    "/about",
    "/founder",
    "/directors",
    "/business",
    "/architecture",
    "/construction",
    "/real-estate",
    "/import-export",
    "/otc-exchange",
    "/infrastructure",
    "/our-projects",
    "/our-work",
    "/careers",
    "/blog",
    "/book-consultation",
    "/consultation",
    "/book-demo",
    "/architecture-service",
    "/construction-service",
    "/real-estate-service",
    "/import-export-service",
    "/otc-exchange-service",
    "/privacy-policy",
    "/terms-and-conditions",
    "/cookie-policy",
    "/disclaimer",
    "/disclosure",
    "/copyright-policy",
    "/refund-policy",
    "/trademark-certification",
    "/sitemap",
    "/ractysh-import-export",
    "/ractysh-design",
    "/ractysh-infra",
    "/import-export/about",
    "/import-export/services",
    "/import-export/import-services",
    "/import-export/export-services",
    "/import-export/global-trade",
    "/import-export/industries",
    "/import-export/founder",
    "/import-export/projects",
    "/import-export/blogs",
    "/import-export/careers",
    "/import-export/contact",
  ];

  const serviceRoutes = [
    "/architectural-design",
    "/architectural-lighting-design",
    "/interior-design",
    "/landscape-design",
    "/urban-planning",
    "/elevation-design",
    "/structural-design",
    "/structural-work",
    "/mep-design",
    "/furniture-design",
    "/logo-design",
    "/rendering",
    "/3d-model-visualisation",
    "/turnkey-projects",
    "/project-management",
    "/project-management-consultation",
    "/commercial-building-design",
  ];

  const allRoutes = Array.from(
    new Set([...staticRoutes, ...serviceRoutes, ...commercialServiceRoutes, ...servicePageRoutes])
  );

  const sitemapEntries: MetadataRoute.Sitemap = allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(content.updatedAt),
    changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: route === "" ? 1 : 0.78,
  }));

  try {
    const posts = await getBlogIndex();
    if (Array.isArray(posts)) {
      for (const post of posts) {
        sitemapEntries.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updatedAt || post.createdAt || content.updatedAt),
          changeFrequency: "monthly",
          priority: 0.64,
        });
      }
    }
  } catch {
    // blog API unavailable
  }

  return sitemapEntries;
}
