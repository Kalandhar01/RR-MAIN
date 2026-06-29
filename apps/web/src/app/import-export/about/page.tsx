import type { Metadata } from "next";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/import-export/about"], "/import-export/about");

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-32 sm:px-10 lg:px-16">
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          About Ractysh Exim
        </h1>
        <div className="space-y-4 text-lg leading-relaxed text-gray-600">
          <p>
            Ractysh Exim Private Limited is a professional import, export,
            international trade, sourcing, and global business solutions company
            based in Tamil Nadu, India. We connect Indian businesses with
            worldwide markets through reliable trade facilitation and supply
            chain expertise.
          </p>
          <p>
            Our team brings deep experience in cross-border trade, procurement
            coordination, logistics management, and international market access.
            We serve as a trusted partner for businesses seeking to expand their
            global footprint.
          </p>
        </div>
      </div>
    </main>
  );
}
