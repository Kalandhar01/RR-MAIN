import type { Metadata } from "next";
import { MarketingChrome } from "@/components/MarketingChrome";
import { getSiteContent } from "@/lib/api";
import DirectorsExecutivePage from "@/components/DirectorsExecutivePage";

export const metadata: Metadata = {
  title: "Directors | RACTYSH GROUP",
  description:
    "Meet the Directors driving the RACTYSH vision — Ashok Kumar M (RACTYSH Associates) and C. Naveen (RACTYSH Design). Leadership built on vision, integrity & innovation.",
  openGraph: {
    title: "Directors | RACTYSH GROUP",
    description:
      "Meet the Directors driving the RACTYSH vision across architecture, finance, engineering and business development.",
    url: "/directors"
  }
};

export default async function DirectorsPage() {
  const content = await getSiteContent();

  return (
    <MarketingChrome content={content}>
      <DirectorsExecutivePage />
    </MarketingChrome>
  );
}
