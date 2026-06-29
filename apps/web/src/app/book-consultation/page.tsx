import type { Metadata } from "next";
import { MarketingChrome } from "@/components/MarketingChrome";
import { ConsultationBenefits } from "@/components/consultation/ConsultationBenefits";
import { ConsultationFinalCTA } from "@/components/consultation/ConsultationFinalCTA";
import { ConsultationForm } from "@/components/consultation/ConsultationForm";
import { ConsultationHero } from "@/components/consultation/ConsultationHero";
import { FAQSection } from "@/components/consultation/FAQSection";
import { getSiteContent } from "@/lib/api";
import { buildMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(pageSeo["/book-consultation"], "/book-consultation");

export default async function BookConsultationPage() {
  const content = await getSiteContent();

  return (
    <MarketingChrome content={content}>
      <div className="relative overflow-x-clip bg-[#f8f6ef] text-[#17243a]">
        <div className="overflow-hidden">
          <ConsultationHero />
          <ConsultationForm />
          <ConsultationBenefits />
        </div>
        <div className="overflow-hidden">
          <FAQSection />
          <ConsultationFinalCTA />
        </div>
      </div>
    </MarketingChrome>
  );
}
