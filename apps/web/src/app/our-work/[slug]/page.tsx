import type { Metadata } from "next";
import { OurWorkProjectDetail } from "@/components/OurWorkProjectDetail";
import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/server/db";
import { normalizeImageUrl } from "@/lib/api";
import mongoose from "mongoose";

interface Props {
  params: Promise<{ slug: string }>;
}

let ProjectModel: mongoose.Model<Record<string, unknown>>;

function getModel() {
  if (!ProjectModel) {
    const schema = new mongoose.Schema({}, { strict: false, collection: "ourworks" });
    ProjectModel = mongoose.models.OurWork || mongoose.model("OurWork", schema);
  }
  return ProjectModel;
}

async function getProject(slug: string) {
  try {
    await dbConnect();
    const Model = getModel();
    const isObjectId = mongoose.Types.ObjectId.isValid(slug);
    let project: Record<string, unknown> | null = null;
    if (isObjectId) {
      project = await Model.findById(slug).lean() as Record<string, unknown> | null;
    }
    if (!project) {
      project = await Model.findOne({ slug }).lean() as Record<string, unknown> | null;
    }
    if (!project) return null;
    const normalized = JSON.parse(JSON.stringify(project)) as Record<string, unknown>;
    if (typeof normalized.coverImage === "string") {
      normalized.coverImage = normalizeImageUrl(normalized.coverImage as string);
    }
    if (Array.isArray(normalized.galleryImages)) {
      normalized.galleryImages = (normalized.galleryImages as string[]).map((img) => normalizeImageUrl(img));
    }
    return normalized;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title as string} | RACTYSH Portfolio`,
    description: project.description as string | undefined,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return <OurWorkProjectDetail project={project as unknown as Parameters<typeof OurWorkProjectDetail>[0]['project']} />;
}
