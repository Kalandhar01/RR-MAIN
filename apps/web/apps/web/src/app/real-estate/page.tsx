import type { Metadata } from "next";
import { DivisionPortalPlaceholderPage } from "@/components/DivisionPortalPlaceholderPage";
import { divisionPortalConfig } from "@/data/divisionPortals";
import { buildMetadata, pageSeo } from "@/lib/seo";

const division = divisionPortalConfig["real-estate"];

export const metadata: Metadata = buildMetadata(pageSeo["/real-estate"], "/real-estate");

export default function RealEstateDivisionPage() {
  return <DivisionPortalPlaceholderPage division="real-estate" />;
}
