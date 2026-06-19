import { isMongoConnected } from "../lib/db.js";
import { BlogModel } from "../models/Blog.js";
import { NewsletterModel, SubscriberModel } from "../models/Newsletter.js";
import { ContactInquiryModel } from "../models/ContactInquiry.js";
import { LeadModel, IngestedProjectModel, IngestedDocumentModel, IngestedMediaModel, IngestionEventModel, ServiceRequestModel } from "../models/Ingestion.js";
import { ConsultationModel } from "../models/Consultation.js";
import { SiteConfigModel, BlogPostModel } from "../models/Content.js";
import { CompanyDivisionModel } from "../models/Business.js";

let mongoEnabled = false;

export function setOperationsPrismaEnabled(value: boolean): void {
  mongoEnabled = value;
}

function hasEnv(key: string): boolean {
  return Boolean(process.env[key]?.trim());
}

function hasAllEnv(keys: string[]): boolean {
  return keys.every(hasEnv);
}

function statusFromConfig(configured: boolean, connected = configured): string {
  if (connected) return "online";
  return configured ? "degraded" : "offline";
}

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86_400);
  const hours = Math.floor((seconds % 86_400) / 3_600);
  const minutes = Math.floor((seconds % 3_600) / 60);

  if (days) return `${days}d ${hours}h`;
  if (hours) return `${hours}h ${minutes}m`;
  return `${Math.max(1, minutes)}m`;
}

function overallStatus(statuses: string[]): string {
  if (statuses.includes("offline")) return "attention";
  if (statuses.includes("degraded")) return "degraded";
  return "healthy";
}

function baseCounts() {
  return {
    content: {
      siteConfigs: 0,
      publishedBlogs: 0,
      draftBlogs: 0,
      publishedNewsletters: 0,
      draftNewsletters: 0,
      subscribers: 0
    },
    intake: {
      newLeads: 0,
      pendingLeads: 0,
      serviceRequests: 0,
      consultations: 0
    },
    intelligence: {
      ingestionEvents7d: 0,
      failedIngestions: 0,
      processingQueue: 0,
      activeProjects: 0,
      delayedProjects: 0,
      documents: 0,
      media: 0
    }
  };
}

export async function getOperationsOverview() {
  const now = new Date();
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const databaseConfigured = hasEnv("MONGODB_URI");
  const emailConfigured = hasEnv("RESEND_API_KEY");
  const cloudinaryConfigured = hasAllEnv(["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"]);
  const corsConfigured = hasEnv("WEB_ORIGIN");
  const counts = baseCounts();
  const warnings: string[] = [];
  let databaseError: string | null = null;

  if (!databaseConfigured) {
    warnings.push("MONGODB_URI is missing. Ingestion, newsletters, consultations and admin intelligence cannot persist.");
  }

  if (databaseConfigured && !mongoEnabled) {
    warnings.push("MongoDB URI is configured, but the API could not connect to MongoDB at startup.");
  }

  if (!emailConfigured) {
    warnings.push("RESEND_API_KEY is missing. Contact, consultation, career and service request emails will be skipped or fail.");
  }

  if (!cloudinaryConfigured) {
    warnings.push("Cloudinary credentials are incomplete. Upload flows will keep metadata, but file storage is limited.");
  }

  if (!corsConfigured) {
    warnings.push("WEB_ORIGIN is not configured. Localhost origins are allowed, but production should set explicit origins.");
  }

  if (mongoEnabled) {
    try {
      const [
        siteConfigs,
        publishedBlogs,
        draftBlogs,
        publishedNewsletters,
        draftNewsletters,
        subscribers,
        newLeads,
        pendingLeads,
        serviceRequests,
        consultations,
        ingestionEvents7d,
        failedIngestions,
        processingQueue,
        activeProjects,
        delayedProjects,
        documents,
        media
      ] = await Promise.all([
        SiteConfigModel.countDocuments(),
        BlogPostModel.countDocuments({ status: "published" }),
        BlogPostModel.countDocuments({ status: "draft" }),
        NewsletterModel.countDocuments({ status: "published" }),
        NewsletterModel.countDocuments({ status: { $in: ["draft", "scheduled"] } }),
        SubscriberModel.countDocuments({ status: "active" }),
        LeadModel.countDocuments({ status: "new" }),
        LeadModel.countDocuments({ status: { $in: ["new", "qualified"] } }),
        ServiceRequestModel.countDocuments(),
        ConsultationModel.countDocuments({ status: { $in: ["new", "reviewed", "contacted"] } }),
        IngestionEventModel.countDocuments({ createdAt: { $gte: since } }),
        IngestionEventModel.countDocuments({ status: "failed" }),
        IngestionEventModel.countDocuments({ status: { $in: ["received", "processing"] } }),
        IngestedProjectModel.countDocuments({ status: "active" }),
        IngestedProjectModel.countDocuments({ status: "delayed" }),
        IngestedDocumentModel.countDocuments(),
        IngestedMediaModel.countDocuments()
      ]);

      counts.content = {
        siteConfigs,
        publishedBlogs,
        draftBlogs,
        publishedNewsletters,
        draftNewsletters,
        subscribers
      };
      counts.intake = {
        newLeads,
        pendingLeads,
        serviceRequests,
        consultations
      };
      counts.intelligence = {
        ingestionEvents7d,
        failedIngestions,
        processingQueue,
        activeProjects,
        delayedProjects,
        documents,
        media
      };
    } catch (error) {
      databaseError = error instanceof Error ? error.message : "Unknown MongoDB operations error.";
      warnings.push("Database overview queries failed. Check MongoDB connection and collection availability.");
    }
  }

  const systems = [
    {
      key: "api",
      label: "API Runtime",
      status: "online" as const,
      detail: `Online for ${formatUptime(Math.floor(process.uptime()))}.`
    },
    {
      key: "database",
      label: "Database",
      status: databaseError ? "degraded" : statusFromConfig(databaseConfigured, mongoEnabled),
      detail: databaseError || (mongoEnabled ? "MongoDB connected." : "MongoDB is not connected.")
    },
    {
      key: "email",
      label: "Email Delivery",
      status: statusFromConfig(emailConfigured),
      detail: emailConfigured ? "Resend configured." : "Email delivery key missing."
    },
    {
      key: "media",
      label: "Media Storage",
      status: statusFromConfig(cloudinaryConfigured),
      detail: cloudinaryConfigured ? "Cloudinary configured." : "Uploads will rely on metadata fallback."
    },
    {
      key: "ingestion",
      label: "Ingestion Layer",
      status: mongoEnabled && counts.intelligence.failedIngestions === 0 ? "online" : "degraded",
      detail:
        counts.intelligence.failedIngestions > 0
          ? `${counts.intelligence.failedIngestions} failed ingestion event(s) need review.`
          : "Central ingestion is available."
    }
  ];

  const nextActions = [
    counts.intake.newLeads > 0 ? `Qualify ${counts.intake.newLeads} new lead(s).` : null,
    counts.intelligence.failedIngestions > 0
      ? `Review ${counts.intelligence.failedIngestions} failed ingestion event(s).`
      : null,
    counts.intelligence.delayedProjects > 0 ? `Review ${counts.intelligence.delayedProjects} delayed project(s).` : null,
    counts.content.publishedNewsletters === 0 ? "Publish the first MongoDB-backed newsletter issue." : null,
    warnings.length ? "Resolve configuration warnings before production launch." : null
  ].filter((item): item is string => Boolean(item));

  return {
    generatedAt: now.toISOString(),
    status: overallStatus(systems.map((system) => system.status)),
    environment: process.env.NODE_ENV || "development",
    uptimeSeconds: Math.floor(process.uptime()),
    systems,
    counts,
    warnings,
    nextActions: nextActions.length ? nextActions : ["No immediate operational actions detected."],
    configuration: {
      database: databaseConfigured,
      emailDelivery: emailConfigured,
      mediaStorage: cloudinaryConfigured,
      corsOrigins: corsConfigured
    }
  };
}
