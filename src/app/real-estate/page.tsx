import type { Metadata } from "next";
import { DivisionPortalPlaceholderPage } from "@/components/DivisionPortalPlaceholderPage";
import { divisionPortalConfig } from "@/data/divisionPortals";

const division = divisionPortalConfig["real-estate"];

export const metadata: Metadata = {
  title: `${division.title} Launching Soon | RACTYSH`,
  description: division.metadataDescription
};

export default function RealEstateDivisionPage() {
  return <DivisionPortalPlaceholderPage division="real-estate" />;
}
