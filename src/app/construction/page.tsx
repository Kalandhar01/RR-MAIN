import type { Metadata } from "next";
import { DivisionPortalPlaceholderPage } from "@/components/DivisionPortalPlaceholderPage";
import { divisionPortalConfig } from "@/data/divisionPortals";

const division = divisionPortalConfig.construction;

export const metadata: Metadata = {
  title: `${division.title} Launching Soon | RACTYSH`,
  description: division.metadataDescription
};

export default function ConstructionDivisionPage() {
  return <DivisionPortalPlaceholderPage division="construction" />;
}
