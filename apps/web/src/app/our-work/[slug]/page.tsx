import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { MarketingChrome } from "@/components/MarketingChrome";
import { OurWorkProjectDetail } from "@/components/OurWorkProjectDetail";
import { getSiteContent } from "@/lib/api";

interface Props {
  params: Promise<{ slug: string }>;
}

interface ProjectData {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  location: string;
  status: "Completed" | "Ongoing" | "Upcoming";
  coverImage: string;
  galleryImages: string[];
  createdAt?: string;
}

async function fetchProjectBySlug(slug: string): Promise<ProjectData | null> {
  try {
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const res = await fetch(`${protocol}://${host}/api/our-works/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | RACTYSH Portfolio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) notFound();

  const content = await getSiteContent();

  return (
    <MarketingChrome content={content}>
      <OurWorkProjectDetail project={project} />
    </MarketingChrome>
  );
}
