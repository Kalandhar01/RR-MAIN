import { Buffer } from "node:buffer";
import { createHash, randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import nodemailer, { type Transporter } from "nodemailer";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma, type CareerApplication } from "@/lib/server/db";
import {
  EmailLayout,
  getRactyshEmailBrand,
  senderFromEnv,
} from "@/lib/server/ractyshEmail";
import { elapsedMs, logSubmissionTiming, runBackgroundJob } from "@/lib/server/backgroundJobs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_RESUME_SIZE = 15 * 1024 * 1024;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const resumeExtensions = [".pdf", ".doc", ".docx"];
const resumeMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/octet-stream",
];

const applicationSchema = z.object({
  position: z.string().trim().min(1, "Position is required.").max(140, "Position is too long."),
  fullName: z.string().trim().min(1, "Please enter your full name.").max(120, "Full name is too long."),
  email: z.string().trim().min(1, "Please enter your email.").max(180, "Email is too long.").refine((v) => emailPattern.test(v), "Please enter a valid email."),
  phone: z.string().trim().min(1, "Please enter your phone number.").max(40, "Phone number is too long."),
  college: z.string().trim().max(240, "College name is too long.").optional().default(""),
  graduationYear: z.string().trim().max(10, "Invalid year.").optional().default(""),
  skills: z.string().trim().max(500, "Skills is too long.").optional().default(""),
  experience: z.string().trim().default("Internship"),
  message: z.string().trim().max(4000, "Message is too long.").optional().default(""),
});

type ApplicationPayload = z.infer<typeof applicationSchema>;

type ApiValidationIssue = { path: string[]; message: string };

type CloudinaryUploadResult = { secure_url?: string; public_id?: string; resource_type?: string };

type ResumeStorageResult = { url: string; provider: "cloudinary" | "local"; providerId?: string };

type ApplicationDoc = CareerApplication;

type DatabaseSaveResult =
  | { ok: true; application: ApplicationDoc }
  | { ok: false; status: number; message: string; error: string; code?: string };

type EmailSendResult =
  | { ok: true; messageId?: string; accepted?: string[]; sentAt: string }
  | { ok: false; status: number; message: string; error: string; missing?: string[] };

type SmtpConfig = {
  host: string; port: number; secure: boolean; user: string; pass: string; from: string; to: string[];
};

const globalForCareerMailer = globalThis as unknown as {
  careerSmtpTransporter?: Transporter;
  careerSmtpKey?: string;
};

function textFromFormData(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function normalizeFormPayload(formData: FormData): ApplicationPayload {
  const position = textFromFormData(formData, "position");
  const skills = textFromFormData(formData, "skills");
  const message = textFromFormData(formData, "message") || textFromFormData(formData, "coverLetter");
  return { position, fullName: textFromFormData(formData, "fullName"), email: textFromFormData(formData, "email"), phone: textFromFormData(formData, "phone"), college: textFromFormData(formData, "college"), graduationYear: textFromFormData(formData, "graduationYear"), skills, experience: textFromFormData(formData, "experience") || "Internship", message };
}

function isUploadedFile(value: FormDataEntryValue | null): value is File {
  return typeof value !== "string" && Boolean(value?.name) && typeof value?.size === "number" && value.size > 0;
}

function isAllowedResume(file: File): boolean {
  const lowerName = file.name.toLowerCase();
  return resumeMimeTypes.includes(file.type) || resumeExtensions.some((ext) => lowerName.endsWith(ext));
}

function validateResume(file: File | null): ApiValidationIssue[] {
  if (!file) return [];
  if (file.size > MAX_RESUME_SIZE) return [{ path: ["resume"], message: "Resume must be 15MB or less." }];
  if (!isAllowedResume(file)) return [{ path: ["resume"], message: "Upload a PDF, DOC or DOCX resume." }];
  return [];
}

function errorDetails(error: unknown): { code?: string; message: string; name?: string } {
  if (error instanceof Error) return { message: error.message, name: error.name };
  return { message: "Unknown career application error." };
}

function logCareerApplication(level: "info" | "error", event: string, details: Record<string, unknown> = {}) {
  const entry = { event, ...details };
  if (level === "error") { console.error("[careers-apply]", entry); return; }
  console.info("[careers-apply]", entry);
}

function errorResponse(status: number, code: string, message: string, body: Record<string, unknown> = {}) {
  return NextResponse.json({ success: false, code, message, ...body }, { status });
}

function cloudinarySignature(params: Record<string, string>, apiSecret: string): string {
  const serialized = Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join("&");
  return createHash("sha1").update(`${serialized}${apiSecret}`).digest("hex");
}

async function uploadResumeToCloudinary(resume: File): Promise<CloudinaryUploadResult | null> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return null;
  const timestamp = String(Math.floor(Date.now() / 1000));
  const folder = process.env.CLOUDINARY_CAREERS_FOLDER || "ractysh-career-applications";
  const signature = cloudinarySignature({ folder, timestamp }, apiSecret);
  const uploadForm = new FormData();
  uploadForm.append("file", resume, resume.name);
  uploadForm.append("folder", folder);
  uploadForm.append("timestamp", timestamp);
  uploadForm.append("api_key", apiKey);
  uploadForm.append("signature", signature);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, { method: "POST", body: uploadForm });
  if (!response.ok) throw new Error(await response.text().catch(() => "Cloudinary upload failed."));
  return (await response.json()) as CloudinaryUploadResult;
}

function safeResumeFilename(originalName: string): string {
  const ext = path.extname(originalName).toLowerCase() || ".bin";
  const base = path.basename(originalName, ext).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "resume";
  return `${Date.now()}-${randomUUID()}-${base}${ext}`;
}

async function saveResumeLocally(resume: File, resumeBuffer: Buffer): Promise<ResumeStorageResult> {
  const filename = safeResumeFilename(resume.name);
  const uploadDir = path.join(process.cwd(), "public", "uploads", "careers");
  const uploadPath = path.join(uploadDir, filename);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(uploadPath, resumeBuffer);
  return { url: `/uploads/careers/${filename}`, provider: "local" };
}

async function storeResume(resume: File, resumeBuffer: Buffer): Promise<ResumeStorageResult> {
  const cloudinaryUpload = await uploadResumeToCloudinary(resume);
  if (cloudinaryUpload) {
    if (!cloudinaryUpload.secure_url) throw new Error("Cloudinary did not return a resume URL.");
    return { url: cloudinaryUpload.secure_url, provider: "cloudinary", providerId: cloudinaryUpload.public_id };
  }
  return saveResumeLocally(resume, resumeBuffer);
}

function publicResumeLink(request: Request, resumeUrl: string): string {
  try { return new URL(resumeUrl, request.url).href; } catch { return resumeUrl; }
}

async function persistCareerApplication(payload: ApplicationPayload, resumeUrl: string): Promise<DatabaseSaveResult> {
  if (!process.env.MONGODB_URI) {
    return { ok: false, status: 503, message: "Database save failed.", error: "MONGODB_URI is not configured." };
  }
  try {
    const application = await prisma.careerApplication.create({
      data: {
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        position: payload.position,
        experience: payload.experience,
        message: payload.message,
        resumeUrl,
        college: payload.college,
        graduationYear: payload.graduationYear,
        skills: payload.skills.split(",").map((s) => s.trim()).filter(Boolean),
        coverLetter: payload.message,
      },
    });
    return { ok: true, application };
  } catch (error) {
    const details = errorDetails(error);
    return { ok: false, status: 500, message: "Database save failed.", error: details.message, code: details.code };
  }
}

function smtpConfig(): SmtpConfig | { missing: string[] } {
  const host = process.env.SMTP_HOST || (process.env.RESEND_API_KEY ? "smtp.resend.com" : "");
  const portValue = process.env.SMTP_PORT || (host === "smtp.resend.com" ? "465" : "");
  const port = Number(portValue);
  const user = process.env.SMTP_USER || (process.env.RESEND_API_KEY ? "resend" : "");
  const pass = process.env.SMTP_PASS || process.env.RESEND_API_KEY || "";
  const from = senderFromEnv("CAREERS_MAIL_FROM", "MAIL_FROM") || "";
  const toRaw = process.env.CAREERS_RECEIVER_EMAIL || process.env.CAREERS_MAIL_TO || process.env.MAIL_TO || "";
  const to = [...new Set(toRaw.split(",").map((r) => r.trim()).filter((r) => emailPattern.test(r)))];
  const missing: string[] = [];
  if (!host) missing.push("SMTP_HOST");
  if (!port || Number.isNaN(port)) missing.push("SMTP_PORT");
  if (!user) missing.push("SMTP_USER");
  if (!pass) missing.push("SMTP_PASS");
  if (!from) missing.push("CAREERS_MAIL_FROM/MAIL_FROM");
  if (!to.length) missing.push("CAREERS_RECEIVER_EMAIL/CAREERS_MAIL_TO/MAIL_TO");
  if (missing.length) return { missing };
  return { host, port, secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465, user, pass, from, to };
}

function careerMailer(config: SmtpConfig): Transporter {
  const key = `${config.host}:${config.port}:${config.secure}:${config.user}`;
  if (!globalForCareerMailer.careerSmtpTransporter || globalForCareerMailer.careerSmtpKey !== key) {
    globalForCareerMailer.careerSmtpTransporter = nodemailer.createTransport({
      host: config.host, port: config.port, secure: config.secure,
      auth: { user: config.user, pass: config.pass },
    });
    globalForCareerMailer.careerSmtpKey = key;
  }
  return globalForCareerMailer.careerSmtpTransporter;
}

function buildEmailRows(application: ApplicationDoc, resumeLink: string, submittedAt: string): Array<[string, string]> {
  return [
    ["Candidate Name", application.fullName],
    ["Email", application.email],
    ["Phone", application.phone],
    ["Position", application.position],
    ["College", application.college],
    ["Graduation Year", application.graduationYear],
    ["Skills", Array.isArray(application.skills) ? application.skills.join(", ") : application.skills],
    ["Resume Link", resumeLink],
    ["Submission Time", submittedAt],
    ["Application ID", application.id],
  ];
}

function buildAdminHtmlEmail(params: { application: ApplicationDoc; resumeLink: string; submittedAt: string; request: Request }): string {
  return EmailLayout({
    brand: getRactyshEmailBrand(params.request),
    eyebrow: "Human Resources Desk",
    title: "New internship application received",
    previewText: `${params.application.fullName} applied for ${params.application.position}`,
    sections: [
      {
        title: "Applicant Information",
        fields: [
          { label: "Candidate Name", value: params.application.fullName },
          { label: "Email", value: params.application.email, href: `mailto:${params.application.email}` },
          { label: "Phone", value: params.application.phone },
          { label: "Position", value: params.application.position },
          { label: "College", value: params.application.college },
          { label: "Graduation Year", value: params.application.graduationYear },
          { label: "Skills", value: Array.isArray(params.application.skills) ? params.application.skills.join(", ") : params.application.skills },
          { label: "Resume Link", value: params.resumeLink, href: params.resumeLink },
          { label: "Submission Time", value: params.submittedAt },
        ],
      },
      {
        title: "Message",
        body: params.application.message || "No message provided.",
      },
    ],
  });
}

function buildApplicantConfirmationHtml(application: ApplicationDoc): string {
  return EmailLayout({
    eyebrow: "Application Received",
    title: `Thank you, ${application.fullName}`,
    previewText: `Your application for ${application.position} has been received.`,
    sections: [
      {
        title: "Application Received",
        body: `Dear ${application.fullName},<br><br>Thank you for applying to the <strong>${application.position}</strong> position at RACTYSH.<br><br>We have received your application and our team will review it shortly. If your profile matches our requirements, we will reach out to you within 5–7 business days.<br><br>Here is your application reference number for future correspondence:`,
      },
      {
        title: "Application Reference",
        fields: [
          { label: "Reference Number", value: application.id },
          { label: "Position Applied", value: application.position },
          { label: "Submitted On", value: application.createdAt?.toISOString() || new Date().toISOString() },
        ],
      },
      {
        title: "Next Steps",
        body: "Our recruitment team will review your application and skills. If shortlisted, you will be contacted for an initial screening conversation.<br><br>If you have any questions in the meantime, feel free to reach out to us at <a href=\"mailto:careers@ractysh.com\">careers@ractysh.com</a>.<br><br>Best regards,<br><strong>The Ractysh Talent Team</strong>",
      },
    ],
  });
}

async function sendAdminEmail(params: { application: CareerApplication; request: Request; resume?: File; resumeBuffer?: Buffer }): Promise<EmailSendResult> {
  const config = smtpConfig();
  if ("missing" in config) {
    return { ok: false, status: 503, message: "Email send failed.", error: `Missing env vars: ${config.missing.join(", ")}`, missing: config.missing };
  }
  try {
    const submittedAt = params.application.createdAt.toISOString();
    const resumeLink = publicResumeLink(params.request, params.application.resumeUrl || "");
    const mailOptions: nodemailer.SendMailOptions = {
      from: config.from,
      to: config.to,
      replyTo: params.application.email,
      subject: `New Internship Application - ${params.application.position}`,
      text: buildEmailRows(params.application, resumeLink, submittedAt).map(([l, v]) => `${l}: ${v}`).join("\n"),
      html: buildAdminHtmlEmail({ application: params.application, resumeLink, submittedAt, request: params.request }),
    };
    if (params.resume && params.resumeBuffer) {
      mailOptions.attachments = [{ filename: params.resume.name, content: params.resumeBuffer, contentType: params.resume.type || "application/octet-stream" }];
    }
    const info = await careerMailer(config).sendMail(mailOptions);
    return { ok: true, messageId: info.messageId, accepted: info.accepted as string[] | undefined, sentAt: new Date().toISOString() };
  } catch (error) {
    const details = errorDetails(error);
    return { ok: false, status: 502, message: "Email send failed.", error: details.message };
  }
}

async function sendApplicantConfirmation(application: CareerApplication): Promise<EmailSendResult> {
  const config = smtpConfig();
  if ("missing" in config) {
    return { ok: false, status: 503, message: "Confirmation email failed.", error: `Missing env vars: ${config.missing.join(", ")}` };
  }
  try {
    const info = await careerMailer(config).sendMail({
      from: config.from,
      to: [application.email],
      subject: "Application Received – RACTYSH",
      html: buildApplicantConfirmationHtml(application),
    });
    return { ok: true, messageId: info.messageId, accepted: info.accepted as string[] | undefined, sentAt: new Date().toISOString() };
  } catch (error) {
    const details = errorDetails(error);
    return { ok: false, status: 502, message: "Confirmation email failed.", error: details.message };
  }
}

export async function POST(request: Request) {
  const requestId = randomUUID();
  const startedAt = performance.now();

  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return errorResponse(415, "VALIDATION_FAILED", "Validation failed.", {
        requestId, issues: [{ path: ["content-type"], message: "Applications must be submitted as multipart form data." }],
      });
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (error) {
      return errorResponse(400, "FILE_UPLOAD_FAILED", "File upload failed.", { requestId, error: errorDetails(error).message });
    }

    const normalizedPayload = normalizeFormPayload(formData);
    const parsed = applicationSchema.safeParse(normalizedPayload);
    const resume = formData.get("resume");
    const uploadedResume = isUploadedFile(resume) ? resume : null;
    const resumeIssues = validateResume(uploadedResume);

    if (!parsed.success || resumeIssues.length) {
      const issues: ApiValidationIssue[] = [
        ...(parsed.success ? [] : parsed.error.issues.map((i) => ({ path: i.path.map(String), message: i.message }))),
        ...resumeIssues,
      ];
      return errorResponse(400, "VALIDATION_FAILED", "Validation failed.", { requestId, issues });
    }

    runBackgroundJob("careers-apply-submission", async () => {
      const resumeBuffer = uploadedResume ? Buffer.from(await uploadedResume.arrayBuffer()) : undefined;
      const resumeUrl = uploadedResume && resumeBuffer
        ? (await storeResume(uploadedResume, resumeBuffer)).url
        : "";
      const stored = await persistCareerApplication(parsed.data, resumeUrl);
      if (!stored.ok) return;
      await sendAdminEmail({ application: stored.application, request, resume: uploadedResume || undefined, resumeBuffer });
      await sendApplicantConfirmation(stored.application);
    }, { requestId, email: parsed.data.email, position: parsed.data.position });

    return NextResponse.json({
      success: true, requestId, emailQueued: true,
      submittedAt: new Date().toISOString(),
      message: "Application received successfully. We'll be in touch within 48 hours.",
    }, { status: 202 });
  } catch (error) {
    const details = errorDetails(error);
    return errorResponse(500, "APPLICATION_SUBMISSION_FAILED", "Application submission failed.", { requestId, error: details.message });
  }
}
