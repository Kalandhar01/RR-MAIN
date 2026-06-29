import type { Metadata } from "next";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/disclaimer"], "/disclaimer");

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
