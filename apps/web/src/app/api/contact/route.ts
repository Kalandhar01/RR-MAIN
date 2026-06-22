import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/server/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().min(1, "Email is required").email("Invalid email"),
  phone: z.string().trim().max(40).optional().default(""),
  company: z.string().trim().max(200).optional().default(""),
  service: z.string().trim().max(200).optional().default(""),
  subject: z.string().trim().max(300).optional().default(""),
  message: z.string().trim().min(1, "Message is required").max(5000),
  sourcePage: z.string().trim().max(500).optional().default(""),
  division: z.string().trim().max(80).optional().default("ractysh-group"),
});

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let body: Record<string, unknown>;
    if (contentType.includes("application/json")) {
      body = await request.json();
    } else if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries());
    } else {
      body = await request.json().catch(() => ({}));
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })),
      }, { status: 400 });
    }

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || "",
        company: parsed.data.company || "",
        service: parsed.data.service || "",
        subject: parsed.data.subject || "",
        message: parsed.data.message,
        sourcePage: parsed.data.sourcePage || "",
        division: parsed.data.division || "ractysh-group",
        status: "new",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been received. We'll get back to you shortly.",
      id: inquiry.id,
    }, { status: 201 });
  } catch (error) {
    console.error("[contact]", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again.",
    }, { status: 500 });
  }
}
