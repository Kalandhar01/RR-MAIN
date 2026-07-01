import { prisma } from "@/lib/server/db";
import { NextRequest, NextResponse } from "next/server";

function normalizeImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return url;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const where = category && category !== "All" ? { category } : undefined;
    const projects = await prisma.portfolioProject.findMany({
      where,
      orderBy: { order: "asc" as const }
    });
    const normalized = projects.map((p) => ({
      ...p,
      coverImage: normalizeImageUrl(p.coverImage as string),
      galleryImages: ((p.galleryImages as string[]) || []).map((img) => normalizeImageUrl(img))
    }));
    return NextResponse.json({ projects: normalized, total: normalized.length });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const project = await prisma.portfolioProject.create({ data: body });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
