import type { Metadata } from "next";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/import-export/services"], "/import-export/services");

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-32 sm:px-10 lg:px-16">
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Our Services
        </h1>
        <div className="space-y-4 text-lg leading-relaxed text-gray-600">
          <p>
            Ractysh Exim Private Limited offers a comprehensive range of
            import, export, and international trade services designed to help
            businesses navigate global markets with confidence.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Import Services — Global sourcing and procurement</li>
            <li>Export Services — Merchant export and distribution</li>
            <li>Global Trade — Cross-border trade facilitation</li>
            <li>Supply Chain Management — End-to-end logistics</li>
            <li>Procurement Solutions — Strategic sourcing</li>
            <li>Export Documentation — Compliance and paperwork</li>
            <li>Import Documentation — Customs and regulatory</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
