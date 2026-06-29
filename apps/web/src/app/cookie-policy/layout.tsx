import type { Metadata } from "next";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/cookie-policy"], "/cookie-policy");

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
