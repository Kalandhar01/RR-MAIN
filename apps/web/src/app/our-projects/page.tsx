import type { Metadata } from "next";
import { MarketingChrome } from "@/components/MarketingChrome";
import { OurProjectsPage } from "@/components/OurProjectsPage";
import { getSiteContent } from "@/lib/api";
import { getAllProjects } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Our Work | RACTYSH",
  description:
    "Selected enterprise work shaped through Architecture, Construction, Real Estate, Export & Import and OTC Exchange workflows."
};

export default async function OurProjectsRoute() {
  const content = await getSiteContent();
  const projects = getAllProjects();

  return (
    <MarketingChrome content={content} className="ractysh-work-typography">
      <OurProjectsPage initialProjects={projects} />
    </MarketingChrome>
  );
}
