import type { Metadata } from "next";
import { MarketingChrome } from "@/components/MarketingChrome";
import { OurProjectsPage } from "@/components/OurProjectsPage";
import { getSiteContent } from "@/lib/api";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/our-projects"], "/our-projects");

export default async function OurProjectsRoute() {
  const content = await getSiteContent();

  return (
    <MarketingChrome content={content} className="ractysh-work-typography">
      <OurProjectsPage />
    </MarketingChrome>
  );
}
