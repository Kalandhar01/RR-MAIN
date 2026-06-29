import type { Metadata } from "next";
import { buildMetadata, pageSeo } from "@/lib/seo";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = buildMetadata(pageSeo["/refund-policy"], "/refund-policy");

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar logoText="Ractysh Group" items={[]} />
      <main className="mx-auto min-h-screen max-w-4xl px-6 py-32 sm:px-10 lg:px-16">
        <h1 className="mb-8 text-4xl font-bold tracking-tight">Refund & Cancellation Policy</h1>
        <div className="prose prose-lg max-w-none space-y-6 text-gray-600">
          <p>Last updated: 2025</p>
          <h2 className="text-2xl font-semibold text-gray-900">1. Overview</h2>
          <p>
            This Refund and Cancellation Policy applies to all services, consultations,
            and engagements offered by Ractysh Group and its subsidiary enterprises
            including Ractysh Design Pvt Ltd, Ractysh Infra Pvt Ltd, Ractysh Associates
            Pvt Ltd, Ractysh Exim Pvt Ltd, and Ractysh Real Estate Pvt Ltd.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900">2. Consultation Services</h2>
          <p>
            For paid consultation services, cancellations made at least 48 hours before
            the scheduled consultation are eligible for a full refund. Cancellations
            within 48 hours may be subject to a 50% charge.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900">3. Project Engagements</h2>
          <p>
            For project-based engagements, refund terms are governed by the specific
            service agreement executed between the client and the respective Ractysh
            Group enterprise. Please refer to your signed agreement for detailed terms.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900">4. Digital Services</h2>
          <p>
            Fees paid for digital services, once accessed or delivered, are generally
            non-refundable. Exceptions may be made on a case-by-case basis at the
            discretion of the management.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900">5. Processing Time</h2>
          <p>
            Approved refunds will be processed within 15 business days from the date
            of approval and will be credited to the original payment method.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900">6. Contact</h2>
          <p>
            For refund and cancellation requests, please contact us through our
            <Link href="/book-consultation" className="text-ractysh-red hover:underline"> consultation page</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
