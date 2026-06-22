import type { Metadata } from "next";
import { getSiteContent } from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeSections } from "@/components/home/HomeSections";
import { Footer } from "@/components/Footer";

export const revalidate = 300;

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
  const content = await getSiteContent();
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <main className="animate-fade-in">
        <HeroSection />
        <HomeSections />
      </main>
      <Footer />
    </>
  );
}
