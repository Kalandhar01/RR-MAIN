import type { Metadata } from "next";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/import-export/blogs"], "/import-export/blogs");

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-32 sm:px-10 lg:px-16">
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Trade & Sourcing Insights
        </h1>
        <div className="space-y-4 text-lg leading-relaxed text-gray-600">
          <p>
            Read insights, updates, and thought leadership from Ractysh Exim
            Private Limited on international trade, global sourcing, supply
            chain trends, and import-export best practices.
          </p>
        </div>
      </div>
    </main>
  );
}
