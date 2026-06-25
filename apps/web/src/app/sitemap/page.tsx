import type { Metadata } from "next";
import { SitemapDirectoryExperience } from "@/components/SitemapDirectoryExperience";
import { getSiteContent } from "@/lib/api";

export const metadata: Metadata = {
  title: "Sitemap | RACTYSH",
  description: "A premium enterprise navigation directory for RACTYSH pages, services and governance records."
};

export default async function SitemapPage() {
  const content = await getSiteContent();
  return <SitemapDirectoryExperience content={content} />;
}
