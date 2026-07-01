import type { Metadata } from "next";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/import-export/global-trade"], "/import-export/global-trade");

export default function GlobalTradePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-32 sm:px-10 lg:px-16">
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Global Trade Solutions
        </h1>
        <div className="space-y-4 text-lg leading-relaxed text-gray-600">
          <p>
            Ractysh Exim Private Limited provides international trade
            solutions, cross-border commerce facilitation, global market
            access, trade finance coordination, and strategic business
            expansion services for companies looking to operate across borders.
          </p>
        </div>
      </div>
    </main>
  );
}
