import type { Metadata } from "next";
import { MarketingChrome } from "@/components/MarketingChrome";
import { PremiumCareersPage } from "@/components/PremiumCareersPage";
import { getSiteContent } from "@/lib/api";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/careers"], "/careers");

export default async function CareersPage() {
  const content = await getSiteContent();

  return (
    <MarketingChrome content={content}>
      <PremiumCareersPage />
    </MarketingChrome>
  );
}
