import type { Metadata } from "next";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/terms-and-conditions"], "/terms-and-conditions");

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
