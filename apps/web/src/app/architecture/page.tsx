import type { Metadata } from "next";
import { DivisionPortalPlaceholderPage } from "@/components/DivisionPortalPlaceholderPage";
import { divisionPortalConfig } from "@/data/divisionPortals";
import { buildMetadata, pageSeo } from "@/lib/seo";

const division = divisionPortalConfig.architecture;

export const metadata: Metadata = buildMetadata(pageSeo["/architecture"], "/architecture");

export default function ArchitecturePage() {
  return <DivisionPortalPlaceholderPage division="architecture" />;
}
