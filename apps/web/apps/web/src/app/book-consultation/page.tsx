import type { Metadata } from "next";
import { MarketingChrome } from "@/components/MarketingChrome";
import { EnterpriseConcierge } from "@/components/consultation/EnterpriseConcierge";
import { getSiteContent } from "@/lib/api";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/book-consultation"], "/book-consultation");

export default async function BookConsultationPage() {
  const content = await getSiteContent();

  return (
    <MarketingChrome content={content} hideFooter>
      <EnterpriseConcierge />
    </MarketingChrome>
  );
}
