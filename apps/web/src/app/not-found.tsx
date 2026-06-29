import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Ractysh Group",
  description: "The page you are looking for is not available. Return to Ractysh Group homepage.",
  robots: { index: false, follow: true },
};

export default function NotFoundLayout({ children }: { children: React.ReactNode }) {
  return children;
}
