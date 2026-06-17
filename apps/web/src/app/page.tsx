import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Footer } from "@/components/Footer";
import { HomeHeroWhoStoryFlow } from "@/components/HomeHeroWhoStoryFlow";
import { Navbar } from "@/components/Navbar";
import { SubscriptionPopup } from "@/components/SubscriptionPopup";
import { getBlogIndex, getSiteContent } from "@/lib/api";

export const revalidate = 300;

const EnterpriseSolutionsSection = dynamic(
  () => import("@/components/EnterpriseSolutionsSection").then((m) => ({ default: m.EnterpriseSolutionsSection })),
  { ssr: true }
);

const ExecutiveIntelligenceCenter = dynamic(
  () => import("@/components/ExecutiveIntelligenceCenter").then((m) => ({ default: m.ExecutiveIntelligenceCenter })),
  { ssr: true }
);

const HomeServicesSection = dynamic(
  () => import("@/components/HomeServicesSection").then((m) => ({ default: m.HomeServicesSection })),
  { ssr: true }
);

const SecuritySection = dynamic(
  () => import("@/components/SecuritySection").then((m) => ({ default: m.SecuritySection })),
  { ssr: true }
);

const HomeBlogInsightsSection = dynamic(
  () => import("@/components/HomeBlogInsightsSection").then((m) => ({ default: m.HomeBlogInsightsSection })),
  { ssr: true }
);

const FAQSection = dynamic(
  () => import("@/components/consultation/FAQSection").then((m) => ({ default: m.FAQSection })),
  { ssr: true }
);

const FinalCTASection = dynamic(
  () => import("@/components/FinalCTASection").then((m) => ({ default: m.FinalCTASection })),
  { ssr: true }
);

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();

  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    alternates: content.seo.canonicalUrl ? { canonical: content.seo.canonicalUrl } : undefined,
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      images: content.seo.ogImage ? [{ url: content.seo.ogImage }] : undefined
    }
  };
}

export default async function Home() {
  const [content, blogData] = await Promise.all([getSiteContent(), getBlogIndex({ limit: 12 })]);
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ractysh Group",
    url: content.seo.canonicalUrl || "https://ractysh.com",
    description: content.seo.description,
    founder: {
      "@type": "Person",
      name: content.founder.name,
      jobTitle: content.founder.role
    },
    sameAs: content.footer.socialLinks?.map((link) => link.href).filter((href) => href.startsWith("http")) || [],
    makesOffer: content.businessDivisions.map((division) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: division.title,
        description: division.description
      }
    }))
  };

  return (
    <>
      <Navbar logoText={content.nav.logoText} items={content.nav.items} />
      <SubscriptionPopup popup={content.popup} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <main className="homepage-ecosystem relative isolate">
        <div className="pointer-events-none fixed inset-0 z-0 bg-[#F8F6F1]" />
        <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,252,247,0.92)_0%,rgba(248,246,241,0.96)_42%,rgba(245,242,235,1)_100%)]" />
        <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.04] [background-image:linear-gradient(rgba(154,116,40,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(154,116,40,0.5)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="relative z-10">
          <HomeHeroWhoStoryFlow hero={content.hero} divisions={content.divisions} />
          <div id="features" className="scroll-mt-24">
            <EnterpriseSolutionsSection />
          </div>
          <ExecutiveIntelligenceCenter />
          <HomeServicesSection />
          <SecuritySection />
          <HomeBlogInsightsSection data={blogData} />
          <FinalCTASection />
          <FAQSection />
        </div>
      </main>
      <Footer
        headline={content.footer.headline}
        description={content.footer.description}
        links={content.footer.links}
        socialLinks={content.footer.socialLinks}
      />
    </>
  );
}
