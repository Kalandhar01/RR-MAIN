import type { Metadata } from "next";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/import-export/founder"], "/import-export/founder");

export default function FounderPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-32 sm:px-10 lg:px-16">
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Our Founder
        </h1>
        <div className="space-y-4 text-lg leading-relaxed text-gray-600">
          <p>
            Shaiknoordeen Noorul Fawaz is the founder of Ractysh Exim Private
            Limited, driving international trade, global sourcing, and business
            solutions that connect Indian businesses with worldwide markets.
          </p>
        </div>
      </div>
    </main>
  );
}
