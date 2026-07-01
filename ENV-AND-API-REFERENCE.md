# RACTYSH GROUP — Environment Variables & API Reference

**Project:** Ractysh-v2-2 (Monorepo)  
**Date:** June 30, 2026  
**Total Projects:** 6  
**Total Environment Variables:** 95+  
**Total API Endpoints:** 24  

---

## Table of Contents

1. [Monorepo Structure](#1-monorepo-structure)
2. [apps/web — Main Public Website](#2-appsweb--main-public-website)
3. [apps/api — Express.js Backend API](#3-appsapi--expressjs-backend-api)
4. [apps/admin — Admin Panel](#4-appsadmin--admin-panel)
5. [otc-exchange — OTC Exchange](#5-otc-exchange--otc-exchange)
6. [Architecture-Site](#6-architecture-site)
7. [Construction-site](#7-construction-site)
8. [Shared Services Summary](#8-shared-services-summary)
9. [All .env File Locations](#9-all-env-file-locations)

---

## 1. Monorepo Structure

```
Ractysh-v2-2/
├── apps/
│   ├── api/                    → Express.js backend (port 5000)
│   ├── admin/                  → Next.js admin panel (port 3001)
│   └── web/
│       ├── apps/
│       │   ├── api/            → Duplicate Express.js backend (port 5000)
│       │   └── web/            → Next.js public website (port 3000)
│       └── packages/           → Shared packages for web
├── packages/
│   ├── shared/                 → Shared utilities
│   ├── db/                     → MongoDB/Mongoose database layer
│   ├── auth/                   → Authentication (session cookie)
│   ├── ui/                     → UI components
│   └── types/                  → TypeScript types
├── Architecture-Site/          → Standalone Next.js Architecture site
├── Construction-site/          → Standalone Next.js Construction site
├── otc-exchange/               → Standalone Next.js OTC Exchange site
├── scripts/                    → Utility/migration scripts
└── tests/                      → Playwright tests
```

---

## 2. apps/web — Main Public Website

**Framework:** Next.js 15 (App Router) + React 19  
**Port:** 3000  
**Env File:** `apps/web/apps/web/.env.example` + `apps/web/.env.local`

### 2.1 Database

| Variable | Example Value | Description |
|----------|--------------|-------------|
| `MONGODB_URI` | `mongodb+srv://kalandars2004_db_user:ZdMVxbcD92vgkFNH@ractyshcluster.n1ltweb.mongodb.net/ractysh?retryWrites=true&w=majority&appName=RactyshCluster` | MongoDB Atlas connection string |

### 2.2 API / URLs

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000` | Public API base URL |
| `INTERNAL_API_URL` | `http://localhost:5000` | Internal API URL (server-side) |
| `NEXT_PUBLIC_SITE_URL` | `https://ractysh.com` | Public site URL |
| `NEXT_PUBLIC_ADMIN_URL` | `http://localhost:3001` | Admin panel URL |
| `ADMIN_ORIGIN` | `http://localhost:3001` | Admin origin (CORS) |
| `EMAIL_PUBLIC_BASE_URL` | `https://ractysh.com` | Public URL for email links |
| `NEWSLETTER_PUBLIC_BASE_URL` | `https://ractysh.com` | Newsletter public URL |

### 2.3 Email — Resend

| Variable | Value | Description |
|----------|-------|-------------|
| `RESEND_API_KEY` | `re_YYDuCpdD_KHjmr7rj1KfSaGWg1ugXe8tA` | Resend API key |
| `RESEND_FROM` | `Ractysh <noreply@ractysh.com>` | Default sender email |
| `NEWSLETTER_FROM` | `Ractysh Newsletter <newsletter@ractysh.com>` | Newsletter sender |
| `NEWSLETTER_DELIVERY_MODE` | *(empty)* | Set `test` for dev mode |
| `NEWSLETTER_TEST_RECIPIENT` | *(empty)* | Test email recipient |

### 2.4 Email — SMTP / Nodemailer

| Variable | Value | Description |
|----------|-------|-------------|
| `SMTP_HOST` | *(empty, defaults to `smtp.resend.com`)* | SMTP server host |
| `SMTP_PORT` | `587` | SMTP port (465 for TLS) |
| `SMTP_USER` | *(empty, defaults to `resend`)* | SMTP username |
| `SMTP_PASS` | *(empty, defaults to `RESEND_API_KEY`)* | SMTP password |
| `SMTP_SECURE` | `false` | Use TLS |

### 2.5 Email — Recipients (Notification Routing)

| Variable | Value | Description |
|----------|-------|-------------|
| `MAIL_TO` | `ractysh@gmail.com` | General notification recipient |
| `MAIL_FROM` | `Ractysh <noreply@ractysh.com>` | General sender |
| `CONTACT_MAIL_TO` | `ractysh@gmail.com` | Contact form recipient |
| `CONTACT_MAIL_FROM` | `Ractysh Contact <contact@ractysh.com>` | Contact form sender |
| `CONTACT_NOTIFICATION_EMAIL` | *(empty)* | Contact notification (alt) |
| `CONTACT_NOTIFICATION_FROM` | `Ractysh Contact <contact@ractysh.com>` | Contact notification sender |
| `DEMO_MAIL_TO` | `ractysh@gmail.com` | Demo request recipient |
| `DEMO_MAIL_FROM` | `Ractysh Contact <contact@ractysh.com>` | Demo request sender |
| `CAREERS_MAIL_TO` | `ractysh@gmail.com` | Career application recipient |
| `CAREERS_MAIL_FROM` | `Ractysh Careers <careers@ractysh.com>` | Career application sender |
| `CAREERS_RECEIVER_EMAIL` | *(empty)* | Career receiver (alt) |
| `CONSULTATION_NOTIFY_TO` | *(empty)* | Consultation notification recipient |
| `CONSULTATION_NOTIFY_FROM` | `Ractysh Contact <contact@ractysh.com>` | Consultation notification sender |
| `SERVICE_REQUEST_MAIL_TO` | `ractysh@gmail.com` | Service request recipient |
| `SERVICE_REQUEST_MAIL_FROM` | `Ractysh Contact <contact@ractysh.com>` | Service request sender |

### 2.6 Cloudinary

| Variable | Value | Description |
|----------|-------|-------------|
| `CLOUDINARY_CLOUD_NAME` | `dhgvbhjz4` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | `868267851747887` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | `pfL8SLpFj8BpdhF5s-sSDM7bvAo` | Cloudinary API secret |
| `CLOUDINARY_CAREERS_FOLDER` | `ractysh-career-applications` | Career uploads folder |

### 2.7 Auth

| Variable | Value | Description |
|----------|-------|-------------|
| `ADMIN_SECRET` | *(empty)* | Bearer token for admin-only API routes |

### 2.8 API Routes (24 Endpoints)

| # | Route | Methods | Purpose |
|---|-------|---------|---------|
| 1 | `/api/contact` | POST, GET, PATCH, DELETE | Contact form leads (honeypot + rate limiting) |
| 2 | `/api/book-demo` | POST | Private demo booking |
| 3 | `/api/book-consultation` | POST | Consultation booking with file attachments |
| 4 | `/api/service-request` | POST | Service request from division pages |
| 5 | `/api/careers/apply` | POST | Career application with resume upload |
| 6 | `/api/career-application` | POST, GET, PATCH, DELETE | Legacy career application CRUD |
| 7 | `/api/newsletter/subscribe` | POST | Newsletter subscription |
| 8 | `/api/blog` | GET | Blog listing |
| 9 | `/api/blog/[slug]` | GET | Blog by slug |
| 10 | `/api/our-works` | GET | Portfolio works listing |
| 11 | `/api/our-works/[slug]` | GET | Work by slug |
| 12 | `/api/portfolio/projects` | GET | Portfolio projects |
| 13 | `/api/portfolio/projects/[slug]` | GET | Project by slug |
| 14 | `/api/portfolio/projects/[slug]/images` | GET | Project images |
| 15 | `/api/portfolio/categories` | GET | Portfolio categories |
| 16 | `/api/consultations` | GET, POST | Consultations management |
| 17 | `/api/consultations/[id]/events` | GET | Consultation events |
| 18 | `/api/consultations/[id]/workflow` | GET | Consultation workflow |
| 19 | `/api/upload` | POST | File upload |
| 20 | `/api/chatbot` | POST | AI chatbot |
| 21 | `/api/inngest` | POST | Inngest event handler |
| 22 | `/api/dashboard` | GET | Dashboard data |
| 23 | `/api/admin/entity-detail` | GET | Admin entity details |
| 24 | `/api/admin/careers` | GET | Admin careers management |

---

## 3. apps/api — Express.js Backend API

**Framework:** Express.js  
**Port:** 5000  
**Env File:** `apps/api/.env`

### 3.1 Server Configuration

| Variable | Value | Description |
|----------|-------|-------------|
| `PORT` | `5000` | API server port |
| `WEB_ORIGIN` | `http://localhost:3000` | Web frontend origin (CORS) |
| `ADMIN_ORIGIN` | `http://localhost:3001` | Admin panel origin (CORS) |
| `NEXT_PUBLIC_SITE_URL` | `https://ractysh.com` | Public site URL |
| `EMAIL_PUBLIC_BASE_URL` | `https://ractysh.com` | Public URL for email links |

### 3.2 Database

| Variable | Value | Description |
|----------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://kalandars2004_db_user:ZdMVxbcD92vgkFNH@ractyshcluster.n1ltweb.mongodb.net/ractysh?retryWrites=true&w=majority&appName=RactyshCluster` | MongoDB Atlas connection |
| `DATABASE_URL` | *(empty)* | Prisma database URL (unused) |

### 3.3 Email — Resend

| Variable | Value | Description |
|----------|-------|-------------|
| `RESEND_API_KEY` | `re_YYDuCpdD_KHjmr7rj1KfSaGWg1ugXe8tA` | Resend API key |
| `RESEND_FROM` | `Ractysh <noreply@ractysh.com>` | Default sender |
| `NEWSLETTER_FROM` | `Ractysh Newsletter <newsletter@ractysh.com>` | Newsletter sender |

### 3.4 Email — Recipients

| Variable | Value | Description |
|----------|-------|-------------|
| `MAIL_TO` | `ractysh@gmail.com` | General notification recipient |
| `MAIL_FROM` | `Ractysh <noreply@ractysh.com>` | General sender |
| `CONTACT_MAIL_TO` | `ractysh@gmail.com` | Contact form recipient |
| `CONTACT_MAIL_FROM` | `Ractysh Contact <contact@ractysh.com>` | Contact form sender |
| `CONTACT_NOTIFICATION_FROM` | `Ractysh Contact <contact@ractysh.com>` | Contact notification sender |
| `CONSTRUCTION_CONTACT_MAIL_TO` | `ractysh@gmail.com` | Construction contact recipient |
| `CONSTRUCTION_CONTACT_MAIL_FROM` | `Ractysh Construction <contact@ractysh.com>` | Construction contact sender |
| `DEMO_MAIL_TO` | `ractysh@gmail.com` | Demo request recipient |
| `DEMO_MAIL_FROM` | `Ractysh Contact <contact@ractysh.com>` | Demo request sender |
| `CAREERS_MAIL_TO` | `ractysh@gmail.com` | Career application recipient |
| `CAREERS_MAIL_FROM` | `Ractysh Careers <careers@ractysh.com>` | Career application sender |
| `SERVICE_REQUEST_MAIL_TO` | `ractysh@gmail.com` | Service request recipient |
| `SERVICE_REQUEST_MAIL_FROM` | `Ractysh Contact <contact@ractysh.com>` | Service request sender |
| `CONSULTATION_NOTIFY_FROM` | `Ractysh Contact <contact@ractysh.com>` | Consultation notification sender |
| `CONSULTATION_NOTIFY_TO` | *(empty)* | Consultation notification recipient |
| `CONSULTATION_EMAIL_ATTACHMENTS` | `true` | Attach files in consultation emails |

### 3.5 Cloudinary

| Variable | Value | Description |
|----------|-------|-------------|
| `CLOUDINARY_CLOUD_NAME` | `dhgvbhjz4` | Cloud name |
| `CLOUDINARY_API_KEY` | `868267851747887` | API key |
| `CLOUDINARY_API_SECRET` | `pfL8SLpFj8BpdhF5s-sSDM7bvAo` | API secret |
| `CLOUDINARY_CAREERS_FOLDER` | `ractysh-career-applications` | Career uploads folder |

### 3.6 Monitoring & Analytics

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_POSTHOG_KEY` | *(empty)* | PostHog analytics key |
| `NEXT_PUBLIC_POSTHOG_HOST` | `https://app.posthog.com` | PostHog host |
| `NEXT_PUBLIC_SENTRY_DSN` | *(empty)* | Sentry DSN |
| `SENTRY_TRACES_SAMPLE_RATE` | `0.1` | Sentry trace sample rate |
| `BETTER_STACK_API_KEY` | *(empty)* | Better Stack monitoring key |

### 3.7 Inngest (Serverless Functions)

| Variable | Value | Description |
|----------|-------|-------------|
| `INNGEST_EVENT_KEY` | *(empty)* | Inngest event key |
| `INNGEST_SIGNING_KEY` | *(empty)* | Inngest signing key |

---

## 4. apps/admin — Admin Panel

**Framework:** Next.js (App Router)  
**Port:** 3001  
**Env File:** `apps/admin/.env`

### 4.1 AI / LLM

| Variable | Value | Description |
|----------|-------|-------------|
| `OPENROUTER_API_KEY` | *(empty)* | OpenRouter AI API key |
| `OPENROUTER_MODEL` | `anthropic/claude-sonnet-4` | AI model |

### 4.2 API / URLs

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000` | Public API URL |
| `INTERNAL_API_URL` | `http://localhost:5000` | Internal API URL |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Site URL |
| `NEXT_PUBLIC_ADMIN_URL` | `http://localhost:3001` | Admin URL |
| `ADMIN_ORIGIN` | `http://localhost:3001` | Admin origin |

### 4.3 Authentication

| Variable | Value | Description |
|----------|-------|-------------|
| `ADMIN_SESSION_SECRET` | `49f2852cb6e6094467a387ce2d8b39e5aaccde0d357f6db7a205563035de2615` | HMAC session signing key |
| `GOOGLE_CLIENT_ID` | *(empty)* | Google OAuth client ID |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | *(empty)* | Google OAuth client ID (public) |

### 4.4 Database

| Variable | Value | Description |
|----------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://kalandars2004_db_user:ZdMVxbcD92vgkFNH@ractyshcluster.n1ltweb.mongodb.net/ractysh?retryWrites=true&w=majority&appName=RactyshCluster` | MongoDB Atlas connection |
| `DATABASE_URL` | *(empty)* | Prisma URL (unused) |

### 4.5 Cloudinary

| Variable | Value | Description |
|----------|-------|-------------|
| `CLOUDINARY_CLOUD_NAME` | `dhgvbhjz4` | Cloud name |
| `CLOUDINARY_API_KEY` | `868267851747887` | API key |
| `CLOUDINARY_API_SECRET` | `pfL8SLpFj8BpdhF5s-sSDM7bvAo` | API secret |

---

## 5. otc-exchange — OTC Exchange

**Framework:** Next.js  
**Port:** 3000  
**Env File:** `otc-exchange/.env` + `.env.example`

### 5.1 Database

| Variable | Value | Description |
|----------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://kalandars2004_db_user:ZdMVxbcD92vgkFNH@ractyshcluster.n1ltweb.mongodb.net/Ractysh-Main?retryWrites=true&w=majority&appName=RactyshCluster` | MongoDB Atlas (Ractysh-Main DB) |

### 5.2 Cloudinary

| Variable | Value | Description |
|----------|-------|-------------|
| `CLOUDINARY_CLOUD_NAME` | `dhgvbhjz4` | Cloud name |
| `CLOUDINARY_API_KEY` | `868267851747887` | API key |
| `CLOUDINARY_API_SECRET` | `pfL8SLpFj8BpdhF5s-sSDM7bvAo` | API secret |

### 5.3 Email (.env.example)

| Variable | Value | Description |
|----------|-------|-------------|
| `RESEND_API_KEY` | *(empty)* | Resend API key |
| `NEWSLETTER_FROM` | `Ractysh Newsletter <newsletter@ractysh.com>` | Newsletter sender |
| `NEWSLETTER_PUBLIC_BASE_URL` | *(empty)* | Newsletter public URL |
| `NEWSLETTER_DELIVERY_MODE` | *(empty)* | Set `test` for dev |
| `NEWSLETTER_TEST_RECIPIENT` | *(empty)* | Test recipient |
| `OTC_ADMIN_EMAIL` | `ractysh@gmail.com` | OTC admin email |
| `OTC_RESEND_FROM_EMAIL` | `Ractysh OTC <onboarding@resend.dev>` | OTC sender |
| `ADMIN_APP_URL` | *(empty)* | Admin app URL |

---

## 6. Architecture-Site

**Framework:** Next.js  
**Port:** 3000  
**Env Files:** `Architecture-Site/.env` + `.env.local` + `.env.example`

### 6.1 Database

| Variable | Value | Description |
|----------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://kalandars2004_db_user:ZdMVxbcD92vgkFNH@ractyshcluster.n1ltweb.mongodb.net/Ractysh-Main?retryWrites=true&w=majority&appName=RactyshCluster` | MongoDB Atlas (Ractysh-Main DB) |

### 6.2 Cloudinary

| Variable | Value | Description |
|----------|-------|-------------|
| `CLOUDINARY_CLOUD_NAME` | `dhgvbhjz4` | Cloud name |
| `CLOUDINARY_API_KEY` | `868267851747887` | API key |
| `CLOUDINARY_API_SECRET` | `pfL8SLpFj8BpdhF5s-sSDM7bvAo` | API secret |

### 6.3 Email

| Variable | Value | Description |
|----------|-------|-------------|
| `RESEND_API_KEY` | `re_YYDuCpdD_KHjmr7rj1KfSaGWg1ugXe8tA` | Resend API key |

---

## 7. Construction-site

**Framework:** Next.js  
**Port:** 3000  
**Env Files:** `Construction-site/.env` + `.env.local`

### 7.1 Database

| Variable | Value | Description |
|----------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://kalandars2004_db_user:ZdMVxbcD92vgkFNH@ractyshcluster.n1ltweb.mongodb.net/Ractysh-Main?retryWrites=true&w=majority&appName=RactyshCluster` | MongoDB Atlas (Ractysh-Main DB) |

### 7.2 Cloudinary

| Variable | Value | Description |
|----------|-------|-------------|
| `CLOUDINARY_CLOUD_NAME` | `dhgvbhjz4` | Cloud name |
| `CLOUDINARY_API_KEY` | `868267851747887` | API key |
| `CLOUDINARY_API_SECRET` | `pfL8SLpFj8BpdhF5s-sSDM7bvAo` | API secret |

### 7.3 Email

| Variable | Value | Description |
|----------|-------|-------------|
| `RESEND_API_KEY` | `re_YYDuCpdD_KHjmr7rj1KfSaGWg1ugXe8tA` | Resend API key |
| `RESEND_FROM_EMAIL` | `Ractysh Construction <newsletter@ractysh.com>` | Construction sender |

---

## 8. Shared Services Summary

### 8.1 MongoDB Atlas

| Field | Value |
|-------|-------|
| **Cluster** | `ractyshcluster.n1ltweb.mongodb.net` |
| **User** | `kalandars2004_db_user` |
| **Main DB** | `ractysh` |
| **Division DB** | `Ractysh-Main` |
| **Used By** | All 6 projects |

### 8.2 Cloudinary

| Field | Value |
|-------|-------|
| **Cloud Name** | `dhgvbhjz4` |
| **API Key** | `868267851747887` |
| **API Secret** | `pfL8SLpFj8BpdhF5s-sSDM7bvAo` |
| **Careers Folder** | `ractysh-career-applications` |
| **Used By** | All 6 projects |

### 8.3 Resend (Email)

| Field | Value |
|-------|-------|
| **API Key** | `re_YYDuCpdD_KHjmr7rj1KfSaGWg1ugXe8tA` |
| **Primary Sender** | `Ractysh <noreply@ractysh.com>` |
| **Newsletter Sender** | `Ractysh Newsletter <newsletter@ractysh.com>` |
| **Contact Sender** | `Ractysh Contact <contact@ractysh.com>` |
| **Careers Sender** | `Ractysh Careers <careers@ractysh.com>` |
| **Used By** | apps/api, apps/web, Architecture-Site, Construction-site |

### 8.4 Primary Email Recipients

| Service | Recipient |
|---------|-----------|
| General | `ractysh@gmail.com` |
| Contact Form | `ractysh@gmail.com` |
| Demo Requests | `ractysh@gmail.com` |
| Career Applications | `ractysh@gmail.com` |
| Service Requests | `ractysh@gmail.com` |
| Consultations | `ractysh@gmail.com` |

### 8.5 External Services

| Service | Config | Used In |
|---------|--------|---------|
| **OpenRouter (AI)** | `anthropic/claude-sonnet-4` | apps/admin |
| **Google OAuth** | Client ID (empty) | apps/admin |
| **Inngest** | Event + Signing keys (empty) | apps/api |
| **PostHog** | Analytics key (empty) | apps/api |
| **Sentry** | DSN (empty) | apps/api |
| **Better Stack** | API key (empty) | apps/api |

---

## 9. All .env File Locations

| # | File Path | Has Actual Values |
|---|-----------|-------------------|
| 1 | `apps/api/.env` | Yes |
| 2 | `apps/api/.env.example` | Template only |
| 3 | `apps/admin/.env` | Yes |
| 4 | `apps/admin/.env.example` | Template only |
| 5 | `apps/web/.env.local` | Yes |
| 6 | `apps/web/apps/api/.env.example` | Template only |
| 7 | `apps/web/apps/web/.env.example` | Template only |
| 8 | `Construction-site/.env` | Yes |
| 9 | `Construction-site/.env.local` | Yes |
| 10 | `otc-exchange/.env` | Yes |
| 11 | `otc-exchange/.env.example` | Template only |
| 12 | `Architecture-Site/.env` | Yes |
| 13 | `Architecture-Site/.env.local` | Yes |
| 14 | `Architecture-Site/.env.example` | Template only |

---

## 10. Database Mapping

| Project | MongoDB Database | Connection |
|---------|-----------------|------------|
| apps/web | `ractysh` | Atlas cluster |
| apps/api | `ractysh` | Atlas cluster |
| apps/admin | `ractysh` | Atlas cluster |
| otc-exchange | `Ractysh-Main` | Atlas cluster |
| Architecture-Site | `Ractysh-Main` | Atlas cluster |
| Construction-site | `Ractysh-Main` | Atlas cluster |

---

*Document generated from source files at `/home/kdx/Downloads/v4/Ractysh-v2-2`*
