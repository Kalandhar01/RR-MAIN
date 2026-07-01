import type { Metadata } from "next";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/import-export/careers"], "/import-export/careers");

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-32 sm:px-10 lg:px-16">
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Careers at Ractysh Exim
        </h1>
        <div className="space-y-4 text-lg leading-relaxed text-gray-600">
          <p>
            Join Ractysh Exim Private Limited. Explore career opportunities in
            international trade, sourcing, logistics, procurement, and global
            business development.
          </p>
        </div>
      </div>
    </main>
  );
}
