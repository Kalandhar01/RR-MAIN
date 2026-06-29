import type { Metadata } from "next";
import { MarketingChrome } from "@/components/MarketingChrome";
import { OtcExchangeServiceExperience } from "@/components/OtcExchangeServiceExperience";
import { getSiteContent } from "@/lib/api";
import { buildMetadata, pageSeo } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/otc-exchange"], "/otc-exchange");

export default async function OtcExchangeDivisionPage() {
  const content = await getSiteContent();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "OTC Exchange", item: `${SITE_URL}/otc-exchange` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <MarketingChrome content={content}>
        <OtcExchangeServiceExperience />
      </MarketingChrome>
    </>
  );
}
