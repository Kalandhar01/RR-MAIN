import type { Metadata } from "next";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/import-export/import-services"], "/import-export/import-services");

export default function ImportServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-32 sm:px-10 lg:px-16">
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Import Services
        </h1>
        <div className="space-y-4 text-lg leading-relaxed text-gray-600">
          <p>
            Ractysh Exim Private Limited provides comprehensive import services
            including global sourcing, supplier verification, procurement
            coordination, customs clearance, and import documentation. We help
            Indian businesses source quality products from international
            markets efficiently and compliantly.
          </p>
        </div>
      </div>
    </main>
  );
}
