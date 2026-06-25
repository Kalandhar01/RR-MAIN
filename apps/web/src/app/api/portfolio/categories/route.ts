import { prisma } from "@/lib/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.portfolioCategory.findMany({
      orderBy: { order: "asc" as const }
    });
    return NextResponse.json({ categories: categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug })) });
  } catch {
    return NextResponse.json({ categories: [] });
  }
}
