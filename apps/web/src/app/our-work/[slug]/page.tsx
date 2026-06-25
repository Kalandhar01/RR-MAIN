import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingChrome } from "@/components/MarketingChrome";
import { OurWorkProjectDetail } from "@/components/OurWorkProjectDetail";
import { getProjectBySlug, getAllProjects } from "@/lib/portfolio-data";
import { getSiteContent } from "@/lib/api";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | RACTYSH Portfolio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const content = await getSiteContent();

  return (
    <MarketingChrome content={content}>
      <OurWorkProjectDetail project={project} />
    </MarketingChrome>
  );
}
