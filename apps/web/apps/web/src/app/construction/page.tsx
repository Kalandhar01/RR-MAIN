import type { Metadata } from "next";
import { DivisionPortalPlaceholderPage } from "@/components/DivisionPortalPlaceholderPage";
import { divisionPortalConfig } from "@/data/divisionPortals";
import { buildMetadata, pageSeo } from "@/lib/seo";

const division = divisionPortalConfig.construction;

export const metadata: Metadata = buildMetadata(pageSeo["/construction"], "/construction");

export default function ConstructionDivisionPage() {
  return <DivisionPortalPlaceholderPage division="construction" />;
}
