import { NextResponse } from "next/server";
import { z } from "zod";
import { inferDivisionFromText } from "@/lib/shared";
import { getRactyshEmailBrand } from "@/emails/branding";
import { renderInquiryNotificationEmail } from "@/emails/InquiryNotificationEmail";
import { parseEmailList, sendResendEmail, type EmailDeliveryResult } from "@/lib/server/emailDelivery";
import { senderFromEnv } from "@/lib/server/ractyshEmail";
import { prisma } from "@/lib/server/db";
import { getServiceRequestService, normalizeServiceRequestRoute } from "@/lib/serviceRequestRoutes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_API_URL = "http://localhost:5000";

const serviceRequestSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(120, "Name is too long."),
  email: z.string().trim().min(1, "Please enter your email.").email("Please enter a valid email.").max(180),
  route: z.string().trim().max(500, "Route is too long.").optional(),
  pageUrl: z.string().trim().max(1000, "Page URL is too long.").optional(),
  division: z.string().trim().max(80).optional()
});

type ServiceRequestInput = z.infer<typeof serviceRequestSchema>;

type ServiceRequestDoc = {
  id: string;
  name: string;
  email: string;
  service: string;
  route: string;
  createdAt: Date;
};

type ServiceRequestStorageResult =
  | {
      ok: true;
      request: ServiceRequestDoc;
      repairedSchema?: string;
    }
  | {
      ok: false;
      status: number;
      message: string;
      error: string;
      code?: string;
    };

function errorDetails(error: unknown): { code?: string; message: string; name?: string } {
  if (error instanceof Error) {
    return { message: error.message, name: error.name };
  }

  return { message: "Unknown service request error." };
}

function logServiceRequestError(message: string, details: Record<string, unknown>) {
  console.error(`[service-request] ${message}`, details);
}

function pageRouteFromUrl(value: string | null | undefined): string {
  if (!value) return "";

  try {
    return normalizeServiceRequestRoute(new URL(value).pathname);
  } catch {
    return "";
  }
}

function routeForRequest(payload: ServiceRequestInput, request: Request): string {
  return (
    normalizeServiceRequestRoute(payload.route) ||
    pageRouteFromUrl(payload.pageUrl) ||
    pageRouteFromUrl(request.headers.get("referer"))
  );
}

function getBackendApiUrl(): string {
  return (process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL).replace(/\/+$/, "");
}

function pageUrlForRequest(payload: ServiceRequestInput, request: Request, route: string): string {
  try {
    if (payload.pageUrl) {
      const supplied = new URL(payload.pageUrl);

      if (normalizeServiceRequestRoute(supplied.pathname) === route) {
        return supplied.href;
      }
    }
  } catch {
    // Fall through to the server origin.
  }

  return new URL(route, request.url).href;
}

async function persistServiceRequest(payload: {
  name: string;
  email: string;
  division: string;
  service: string;
  route: string;
}): Promise<ServiceRequestStorageResult> {
  if (!process.env.MONGODB_URI) {
    const error = "MONGODB_URI is not configured.";
    logServiceRequestError("Database storage is not configured.", { error, route: payload.route, service: payload.service });

    return {
      ok: false,
      status: 503,
      message: "Service request database is not configured.",
      error
    };
  }

  try {
    const request = await prisma.serviceRequest.create({ data: payload });

    return { ok: true, request };
  } catch (error) {
    const details = errorDetails(error);
    logServiceRequestError("Database create failed.", {
      ...details,
      route: payload.route,
      service: payload.service
    });

    return {
      ok: false,
      status: 500,
      message: "Unable to store service request in the database.",
      error: details.message,
      code: details.code
    };
  }
}

async function sendServiceRequestEmail(payload: {
  name: string;
  email: string;
  service: string;
  pageUrl: string;
  timestamp: string;
  requestId: string;
  request: Request;
}): Promise<EmailDeliveryResult> {
  const content = await renderInquiryNotificationEmail({
    adminPath: "/admin/operations",
    brand: getRactyshEmailBrand(payload.request),
    clientName: payload.name,
    company: "Not provided",
    email: payload.email,
    inquiryId: payload.requestId,
    message: `Service request submitted from ${payload.pageUrl}.`,
    receivedAt: payload.timestamp,
    requestedService: payload.service,
    sourceLabel: "Service Request",
    sourceUrl: payload.pageUrl,
    extraDetails: [
      { label: "Page URL", value: payload.pageUrl, href: payload.pageUrl },
      { label: "Received At", value: payload.timestamp }
    ]
  });

  return sendResendEmail({
    from: senderFromEnv("SERVICE_REQUEST_MAIL_FROM", "MAIL_FROM", "RESEND_FROM"),
    to: parseEmailList(process.env.SERVICE_REQUEST_MAIL_TO || process.env.MAIL_TO),
    replyTo: payload.email,
    subject: "New Ractysh Service Request",
    text: content.text,
    html: content.html,
    tags: [{ name: "source", value: "service-request" }],
    idempotencyKey: payload.requestId
  });
}

async function ingestServiceRequestLead(payload: {
  requestId: string;
  name: string;
  email: string;
  service: string;
  route: string;
  pageUrl: string;
}): Promise<string | undefined> {
  try {
    const response = await fetch(`${getBackendApiUrl()}/api/ingestion/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: payload.name,
        email: payload.email,
        source: "service-request",
        sourceType: "service_inquiry_form",
        service: payload.service,
        status: "new",
        message: `Service request submitted from ${payload.route}.`,
        metadata: {
          route: payload.route,
          pageUrl: payload.pageUrl,
          serviceRequestId: payload.requestId
        },
        externalEntityId: payload.requestId,
        externalEntityModel: "ServiceRequest"
      }),
      signal: AbortSignal.timeout(5_000)
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(typeof result?.message === "string" ? result.message : `Ingestion API returned ${response.status}.`);
    }

    return typeof result?.ingestion?.entityId === "string" ? result.ingestion.entityId : undefined;
  } catch (error) {
    logServiceRequestError("Central ingestion bridge failed.", {
      requestId: payload.requestId,
      service: payload.service,
      route: payload.route,
      error: error instanceof Error ? error.message : "Unknown ingestion bridge error."
    });
    return undefined;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const parsed = serviceRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Please complete the required request fields.",
          issues: parsed.error.issues.map((issue) => ({
            path: issue.path.map(String),
            message: issue.message
          }))
        },
        { status: 400 }
      );
    }

    const route = routeForRequest(parsed.data, request);
    const service = getServiceRequestService(route);

    if (!service) {
      logServiceRequestError("No service mapping found for route.", {
        route,
        suppliedRoute: parsed.data.route,
        pageUrl: parsed.data.pageUrl,
        referer: request.headers.get("referer")
      });

      return NextResponse.json({ message: "This page is not configured for service requests." }, { status: 400 });
    }

    const pageUrl = pageUrlForRequest(parsed.data, request, route);
    const stored = await persistServiceRequest({
      name: parsed.data.name,
      email: parsed.data.email,
      division: parsed.data.division || inferDivisionFromText(service, route, pageUrl, request.headers.get("host")),
      service,
      route
    });

    if (!stored.ok) {
      return NextResponse.json(
        {
          message: stored.message,
          request: {
            stored: false,
            storageError: stored.error,
            storageCode: stored.code,
            service,
            route
          }
        },
        { status: stored.status }
      );
    }

    const created = stored.request;
    const timestamp = created.createdAt.toISOString();
    const ingestionId = await ingestServiceRequestLead({
      requestId: created.id,
      name: created.name,
      email: created.email,
      service: created.service,
      route: created.route,
      pageUrl
    });
    const notification = await sendServiceRequestEmail({
      name: created.name,
      email: created.email,
      service: created.service,
      pageUrl,
      timestamp,
      requestId: created.id,
      request
    });

    if (!notification.sent) {
      logServiceRequestError("Resend delivery failed.", {
        requestId: created.id,
        service: created.service,
        route: created.route,
        notification
      });

      return NextResponse.json(
        {
          message: notification.skipped
            ? "Service request email delivery is not configured."
            : "Unable to deliver service request email.",
          request: {
            id: created.id,
            ingestionId,
            stored: true,
            service: created.service,
            route: created.route,
            createdAt: timestamp
          },
          notification
        },
        { status: notification.skipped ? 503 : 502 }
      );
    }

    return NextResponse.json(
      {
        message: "Your request has been securely delivered to the Ractysh enterprise desk.",
        request: {
          id: created.id,
          ingestionId,
          stored: true,
          service: created.service,
          route: created.route,
          createdAt: timestamp,
          repairedSchema: stored.repairedSchema || undefined
        },
        notification
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Service request route failed:", error);

    return NextResponse.json({ message: "Unable to route service request. Please try again." }, { status: 500 });
  }
}
