import type { Metadata } from "next";
import { MarketingChrome } from "@/components/MarketingChrome";
import { getSiteContent } from "@/lib/api";
import DirectorsExecutivePage from "@/components/DirectorsExecutivePage";

export const metadata: Metadata = {
  title: "Directors | RACTYSH GROUP",
  description:
    "Meet the four Directors driving the RACTYSH vision — Ashok Kumar M (RACTYSH Associates), C. Naveen (RACTYSH Design), A. Subash (RACTYSH Infra) and B. Mohamed Jamaldheen (RACTYSH Exim). Leadership built on vision, integrity & innovation.",
  openGraph: {
    title: "Directors | RACTYSH GROUP",
    description:
      "Meet the four Directors driving the RACTYSH vision across Associates, Design, Infra and Exim enterprises.",
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
