import type { Metadata } from "next";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/import-export/export-services"], "/import-export/export-services");

export default function ExportServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-32 sm:px-10 lg:px-16">
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Export Services
        </h1>
        <div className="space-y-4 text-lg leading-relaxed text-gray-600">
          <p>
            Ractysh Exim Private Limited delivers professional export services
            including merchant export, international distribution, export
            documentation, market access facilitation, and cross-border trade
            solutions. We connect Indian products and services with buyers
            across global markets.
          </p>
        </div>
      </div>
    </main>
  );
}
