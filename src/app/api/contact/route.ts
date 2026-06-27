import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/server/db";
import { sendContactLeadNotification, type ContactLeadPayload } from "@/lib/server/leadNotification";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ─── Lead ID ──────────────────────────────────────────────────────────────────

function generateLeadId(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const hex = Math.random().toString(16).slice(2, 6).toUpperCase();
  return `LD-${y}${m}${d}-${hex}`;
}

// ─── Rate limiting (in-memory) ────────────────────────────────────────────────

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap) {
      if (now > entry.resetAt) rateLimitMap.delete(key);
    }
  }, 5 * 60 * 1000);
}

// ─── Zod schemas ──────────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().min(1, "Email is required").email("Invalid email"),
  phone: z.string().trim().max(40).optional().default(""),
  company: z.string().trim().max(200).optional().default(""),
  service: z.string().trim().max(200).optional().default(""),
  subject: z.string().trim().max(300).optional().default(""),
  message: z.string().trim().min(1, "Message is required").max(5000),
  sourcePage: z.string().trim().max(500).optional().default(""),
  sourceWebsite: z.string().trim().max(500).optional().default(""),
  division: z.string().trim().max(80).optional().default("ractysh-group"),
});

const statusEnum = z.enum(["new", "contacted", "pending", "completed"]);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function isAdmin(request: Request): boolean {
  return request.headers.get("x-admin-secret") === process.env.ADMIN_SECRET;
}

async function extractBody(request: Request): Promise<Record<string, unknown>> {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return request.json();
  }
  if (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    const formData = await request.formData();
    return Object.fromEntries(formData.entries());
  }
  return request.json().catch(() => ({}));
}

const HONEYPOT_FIELDS = ["_honeypot", "website", "url"];

function hasHoneypotValue(body: Record<string, unknown>): boolean {
  for (const field of HONEYPOT_FIELDS) {
    const val = body[field];
    if (typeof val === "string" && val.trim().length > 0) return true;
  }
  return false;
}

// ─── POST ─────────────────────────────────────────────────────────────────────

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await extractBody(request);

    // Honeypot – silently accept but do NOT persist
    if (hasHoneypotValue(body)) {
      return NextResponse.json(
        {
          success: true,
          message: "Your message has been received. We'll get back to you shortly.",
        },
        { status: 201 },
      );
    }

    // Timestamp check – bots fill in < 3 seconds
    if (body._timestamp) {
      const ts = Number(body._timestamp);
      if (!Number.isNaN(ts) && Date.now() - ts < 3000) {
        return NextResponse.json(
          { success: false, message: "Please wait a moment before submitting." },
          { status: 429 },
        );
      }
    }

    // Rate limit
    const ip = getClientIP(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    // Source website: body > Origin > Referer
    const sourceWebsite: string =
      (body.sourceWebsite as string)?.trim() ||
      request.headers.get("origin")?.trim() ||
      request.headers.get("referer")?.trim() ||
      "";

    // Strip internal / spam‑control fields before validation
    const cleanBody = { ...body };
    for (const key of [...HONEYPOT_FIELDS, "_honeypot", "_timestamp", "sourceWebsite"]) {
      delete cleanBody[key];
    }

    const parsed = contactSchema.safeParse(cleanBody);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: parsed.error.issues.map((i) => ({
            path: i.path,
            message: i.message,
          })),
        },
        { status: 400 },
      );
    }

    const leadId = generateLeadId();

    const inquiry = await prisma.contactInquiry.create({
      data: {
        ...parsed.data,
        sourceWebsite,
        leadId,
        status: "new",
      },
    });

    // Fire-and-forget email notification – response never blocked
    const emailPayload: ContactLeadPayload = {
      leadId,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || "",
      service: parsed.data.service || "",
      company: parsed.data.company || "",
      subject: parsed.data.subject || "",
      message: parsed.data.message,
      sourceWebsite,
      submittedAt: new Date().toISOString(),
    };
    sendContactLeadNotification(emailPayload).catch((err) => {
      console.error("[contact] notification error:", err);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received. We'll get back to you shortly.",
        id: inquiry.id,
        leadId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[contact] POST error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

// ─── GET  (admin – paginated, searchable, sortable) ───────────────────────────

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "50", 10) || 50));
    const search = searchParams.get("search")?.trim() || "";
    const statusFilter = searchParams.get("status")?.trim() || "";
    const sortField = searchParams.get("sort")?.trim() || "createdAt";
    const sortOrder = searchParams.get("order") === "asc" ? "asc" : "desc";

    const where: Record<string, unknown> = {};

    if (statusFilter) {
      where.status = statusFilter;
    }

    if (search) {
      const regex = { $regex: search, $options: "i" };
      where.OR = [
        { name: regex },
        { email: regex },
        { company: regex },
        { message: regex },
      ];
    }

    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      prisma.contactInquiry.findMany({
        where,
        orderBy: { [sortField]: sortOrder },
        skip,
        take: limit,
      }),
      prisma.contactInquiry.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      leads,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      pageSize: limit,
    });
  } catch (error) {
    console.error("[contact] GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch leads." },
      { status: 500 },
    );
  }
}

// ─── DELETE (admin – delete by id) ────────────────────────────────────────────

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id")?.trim();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing 'id' query parameter." },
        { status: 400 },
      );
    }

    await prisma.contactInquiry.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Lead deleted." });
  } catch (error) {
    console.error("[contact] DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete lead." },
      { status: 500 },
    );
  }
}

// ─── PATCH (admin – update status) ────────────────────────────────────────────

export async function PATCH(request: Request): Promise<NextResponse> {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body: Record<string, unknown> = await request.json().catch(() => ({}));
    const id = (body.id as string)?.trim();
    const rawStatus = (body.status as string)?.trim();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing 'id' in request body." },
        { status: 400 },
      );
    }

    const parsed = statusEnum.safeParse(rawStatus);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid status. Must be one of: new, contacted, pending, completed.",
        },
        { status: 400 },
      );
    }

    const updated = await prisma.contactInquiry.update({
      where: { id },
      data: { status: parsed.data },
    });

    return NextResponse.json({
      success: true,
      message: "Status updated.",
      lead: updated,
    });
  } catch (error) {
    console.error("[contact] PATCH error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update lead." },
      { status: 500 },
    );
  }
}
