import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/server/cloudinary";

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;
    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const result = await uploadToCloudinary(buffer, {
      folder: `ractysh/portfolio/${slug}`,
      fileName: `${Date.now()}-${file.name}`
    });
    return NextResponse.json({ url: result.url, provider: result.provider, publicId: result.publicId });
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
