import type { Metadata } from "next";
import { ArchitectureServiceHubPage } from "@/components/ArchitectureServiceHubPage";
import { MarketingChrome } from "@/components/MarketingChrome";
import { getSiteContent } from "@/lib/api";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/architecture-service"], "/architecture-service");

export default async function ArchitectureServicePage() {
  const content = await getSiteContent();

  return (
    <MarketingChrome content={content}>
      <ArchitectureServiceHubPage />
    </MarketingChrome>
  );
}
