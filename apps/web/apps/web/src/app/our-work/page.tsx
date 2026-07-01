import type { Metadata } from "next";
import { MarketingChrome } from "@/components/MarketingChrome";
import { OurProjectsPage } from "@/components/OurProjectsPage";
import { getSiteContent } from "@/lib/api";

export const metadata: Metadata = {
  title: "Our Recent Works | RACTYSH",
  description: "Selected Architecture, Construction, Real Estate, Export-Import and OTC Exchange work from RACTYSH."
};

export default async function OurWorkRoute() {
  const content = await getSiteContent();

  return (
    <MarketingChrome content={content} className="ractysh-work-typography">
      <OurProjectsPage />
    </MarketingChrome>
  );
}
