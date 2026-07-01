import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/server/db";
import { parseEmailList, sendResendEmail } from "@/lib/server/emailDelivery";
import { senderFromEnv } from "@/lib/server/ractyshEmail";
import { getRactyshEmailBrand } from "@/emails/branding";
import { renderInquiryNotificationEmail } from "@/emails/InquiryNotificationEmail";
import type { EmailDeliveryResult } from "@/lib/server/emailDelivery";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_RECIPIENT = "ractysh@gmail.com";

const demoSchema = z.object({
  fullName: z.string().trim().min(1, "Please enter your name.").max(120, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .max(180, "Email is too long.")
    .refine((value) => emailPattern.test(value), "Please enter a valid email."),
  phone: z.string().trim().max(40, "Phone number is too long.").optional(),
  companyName: z.string().trim().max(160, "Company is too long.").optional(),
  discussionTopic: z.string().trim().min(1, "Please select a discussion topic.").max(140, "Topic is too long."),
  message: z.string().trim().max(4000, "Message is too long.").optional()
});

function textFromFormData(formData: FormData, ...keys: string[]): string {
  for (const key of keys) {
    const value = formData.get(key);
    if (typeof value === "string") return value;
  }
  return "";
}

async function requestPayload(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
    const formData = await request.formData();
    return {
      fullName: textFromFormData(formData, "fullName", "name"),
      email: textFromFormData(formData, "email", "emailAddress"),
      phone: textFromFormData(formData, "phone", "phoneNumber"),
      companyName: textFromFormData(formData, "companyName", "company"),
      discussionTopic: textFromFormData(formData, "discussionTopic", "serviceType"),
      message: textFromFormData(formData, "message")
    };
  }
  const json = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  return {
    fullName: typeof json.fullName === "string" ? json.fullName : typeof json.name === "string" ? json.name : "",
    email: typeof json.email === "string" ? json.email : "",
    phone: typeof json.phone === "string" ? json.phone : "",
    companyName: typeof json.companyName === "string" ? json.companyName : typeof json.company === "string" ? json.company : "",
    discussionTopic: typeof json.discussionTopic === "string" ? json.discussionTopic : typeof json.serviceType === "string" ? json.serviceType : "",
    message: typeof json.message === "string" ? json.message : ""
  };
}

export async function POST(request: Request) {
  try {
    const parsed = demoSchema.safeParse(await requestPayload(request));

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Please complete the required booking fields.",
          issues: parsed.error.issues.map((issue) => ({
            path: issue.path.map(String),
            message: issue.message
          }))
        },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toISOString();
    const doc = await prisma.demoInquiry.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone || "",
        companyName: parsed.data.companyName || "",
        discussionTopic: parsed.data.discussionTopic,
        message: parsed.data.message || ""
      }
    });

    const hasResendKey = Boolean(process.env.RESEND_API_KEY);
    let notification: EmailDeliveryResult = { sent: false, skipped: true, error: "RESEND_API_KEY is not configured." };

    if (hasResendKey) {
      const from = senderFromEnv("DEMO_MAIL_FROM", "MAIL_FROM", "CONSULTATION_NOTIFY_FROM", "RESEND_FROM");
      const recipients = parseEmailList(
        process.env.DEMO_MAIL_TO || process.env.MAIL_TO || process.env.CONSULTATION_NOTIFY_TO,
        DEFAULT_RECIPIENT
      );
      const emailContent = await renderInquiryNotificationEmail({
        adminPath: "/admin/contact-inquiries",
        brand: getRactyshEmailBrand(request),
        clientName: parsed.data.fullName,
        company: parsed.data.companyName,
        email: parsed.data.email,
        message: parsed.data.message,
        phone: parsed.data.phone,
        receivedAt: submittedAt,
        requestedService: parsed.data.discussionTopic,
        sourceLabel: "Private Demo Request",
        extraDetails: [
          { label: "Discussion Topic", value: parsed.data.discussionTopic },
          { label: "Received At", value: submittedAt }
        ]
      });
      notification = await sendResendEmail({
        from,
        to: recipients.length ? recipients : [DEFAULT_RECIPIENT],
        replyTo: parsed.data.email,
        subject: `New Ractysh demo request - ${parsed.data.fullName}`,
        text: emailContent.text,
        html: emailContent.html,
        tags: [{ name: "source", value: "book-demo" }]
      });
    }

    if (!notification.sent) {
      return NextResponse.json(
        {
          message: notification.skipped ? "Demo email delivery is not configured." : "Unable to deliver demo request email.",
          submittedAt,
          inquiry: { id: doc.id, stored: true },
          notification
        },
        { status: notification.skipped ? 503 : 502 }
      );
    }

    return NextResponse.json(
      {
        message: "Demo request successfully routed to the enterprise desk.",
        submittedAt,
        inquiry: { id: doc.id, stored: true },
        notification
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Book demo route failed:", error);
    return NextResponse.json({ message: "Unable to route demo request. Please try again." }, { status: 500 });
  }
}
