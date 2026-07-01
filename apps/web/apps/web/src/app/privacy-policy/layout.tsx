import type { Metadata } from "next";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/privacy-policy"], "/privacy-policy");

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
