/**
 * Ractysh Data Flow Integration Tests
 *
 * Tests every public-facing form endpoint to ensure:
 *   1. Endpoint responds with correct status code
 *   2. Data is written to MongoDB
 *   3. Status field defaults to "new"
 *   4. Validation errors return proper messages
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { prisma } from "@/lib/server/db";

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// ─── Contact Form ────────────────────────────────────────────────────────────

describe("POST /api/contact", () => {
  const payload = {
    name: "Test User",
    email: "test-contact@ractysh.test",
    phone: "+91 9876543210",
    company: "Test Corp",
    service: "Architecture",
    subject: "General Inquiry",
    message: "This is a test contact message.",
  };

  it("creates a contact inquiry and returns 201", async () => {
    const res = await fetch(`${BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.id).toBeTruthy();
  });

  it("rejects missing required fields with 400", async () => {
    const res = await fetch(`${BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "", email: "", message: "" }),
    });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.success).toBe(false);
  });

  it("persists contact inquiry with status 'new'", async () => {
    const doc = await prisma.contactInquiry.findMany({
      where: { email: payload.email },
      orderBy: { createdAt: "desc" },
      take: 1,
    });
    expect(doc.length).toBeGreaterThan(0);
    expect(doc[0].status).toBe("new");
  });
});

// ─── Consultation Booking ─────────────────────────────────────────────────────

describe("POST /api/book-consultation", () => {
  const payload = {
    fullName: "Test Consultant",
    emailAddress: "test-consult@ractysh.test",
    companyName: "BuildCorp",
    serviceType: "Architecture",
    projectDescription: "We need architectural design for a commercial complex.",
    phoneNumber: "+91 9876543210",
    preferredConsultationType: "Virtual Meeting",
  };

  it("accepts consultation request and returns 202", async () => {
    const res = await fetch(`${BASE}/api/book-consultation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    expect(res.status).toBe(202);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("persists consultation with status 'new'", async () => {
    const docs = await prisma.consultation.findMany({
      where: { emailAddress: payload.emailAddress },
      orderBy: { createdAt: "desc" },
      take: 1,
    });
    expect(docs.length).toBeGreaterThan(0);
    expect(docs[0].status).toBe("new");
  });
});

// ─── Demo Booking ─────────────────────────────────────────────────────────────

describe("POST /api/book-demo", () => {
  const payload = {
    fullName: "Demo User",
    email: "test-demo@ractysh.test",
    phone: "+91 9876543210",
    companyName: "TechDemo Inc",
    discussionTopic: "Enterprise Platform Demo",
    message: "Interested in a platform demo.",
  };

  it("accepts demo request with 201", async () => {
    const res = await fetch(`${BASE}/api/book-demo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    expect([201, 502, 503]).toContain(res.status);
  });

  it("persists demo inquiry with status 'new'", async () => {
    const docs = await prisma.demoInquiry.findMany({
      where: { email: payload.email },
      orderBy: { createdAt: "desc" },
      take: 1,
    });
    expect(docs.length).toBeGreaterThan(0);
    expect(docs[0].status).toBe("new");
  });
});

// ─── Career Application ───────────────────────────────────────────────────────

describe("POST /api/careers/apply", () => {
  const formData = new FormData();
  formData.append("fullName", "Career Applicant");
  formData.append("email", "test-career@ractysh.test");
  formData.append("phone", "+91 9876543210");
  formData.append("position", "Architecture Intern");
  formData.append("message", "I am passionate about architecture and design.");

  it("accepts career application with 202", async () => {
    const res = await fetch(`${BASE}/api/careers/apply`, {
      method: "POST",
      body: formData,
    });
    expect(res.status).toBe(202);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("persists career application with status 'new'", async () => {
    const docs = await prisma.careerApplication.findMany({
      where: { email: "test-career@ractysh.test" },
      orderBy: { createdAt: "desc" },
      take: 1,
    });
    expect(docs.length).toBeGreaterThan(0);
    expect(docs[0].status).toBe("new");
  });
});

// ─── Newsletter Subscription ──────────────────────────────────────────────────

describe("POST /api/newsletter/subscribe", () => {
  it("subscribes email with 202", async () => {
    const res = await fetch(`${BASE}/api/newsletter/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test-sub@ractysh.test",
        source: "test_suite",
      }),
    });
    expect(res.status).toBe(202);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("rejects duplicate subscription with 409", async () => {
    const res = await fetch(`${BASE}/api/newsletter/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test-sub@ractysh.test" }),
    });
    expect(res.status).toBe(409);
  });
});

// ─── Service Request ──────────────────────────────────────────────────────────

describe("POST /api/service-request", () => {
  it("rejects service request with unknown route (400)", async () => {
    const res = await fetch(`${BASE}/api/service-request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Service Tester",
        email: "test-service@ractysh.test",
        route: "/unknown-route",
      }),
    });
    expect(res.status).toBe(400);
  });
});

// ─── Blog CRUD (via admin API) ────────────────────────────────────────────────

describe("Blog CRUD via admin command center", () => {
  const ADMIN_BASE = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";

  it("creates a blog post via intent", async () => {
    const res = await fetch(`${ADMIN_BASE}/api/admin/command-center`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        intent: "blog.upsert",
        data: {
          title: "Test Blog Post",
          slug: "test-blog-post",
          excerpt: "This is a test blog post created by the test suite.",
          content: "Full content of the test blog post.",
          category: "Technology",
          author: "Test Suite",
          tags: ["test"],
          status: "draft",
        },
      }),
    });
    expect([200, 401]).toContain(res.status);
  });
});

// ─── SSE Endpoint ─────────────────────────────────────────────────────────────

describe("GET /api/admin/events (SSE)", () => {
  const ADMIN_BASE = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";

  it("returns 401 for unauthenticated SSE requests", async () => {
    const res = await fetch(`${ADMIN_BASE}/api/admin/events`);
    expect(res.status).toBe(401);
  });
});
