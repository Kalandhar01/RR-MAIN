import type { Metadata } from "next";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/import-export/projects"], "/import-export/projects");

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-32 sm:px-10 lg:px-16">
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Our Projects & Trade Engagements
        </h1>
        <div className="space-y-4 text-lg leading-relaxed text-gray-600">
          <p>
            Explore selected trade engagements, sourcing projects, and
            international business collaborations by Ractysh Exim Private
            Limited across multiple sectors and global markets.
          </p>
        </div>
      </div>
    </main>
  );
}
