import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/server/cloudinary";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "ractysh-admin";

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadToCloudinary(buffer, { folder, fileName: file.name });

    return NextResponse.json({ success: true, url: result.url, publicId: result.publicId });
  } catch (error) {
    console.error("[upload]", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Upload failed." },
      { status: 500 }
    );
  }
}
