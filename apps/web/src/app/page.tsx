import type { Metadata } from "next";
import { getSiteContent } from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeSections } from "@/components/home/HomeSections";
import { Footer } from "@/components/Footer";
import { SITE_URL, SITE_DESCRIPTION, OG_IMAGE } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();

  return {
    title: "Ractysh Group | One Enterprise. Endless Possibilities.",
    description: SITE_DESCRIPTION,
    keywords: content.seo.keywords,
    alternates: { canonical: SITE_URL },
    openGraph: {
      title: "Ractysh Group | One Enterprise. Endless Possibilities.",
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      siteName: "Ractysh Group",
      type: "website",
      locale: "en_IN",
      images: content.seo.ogImage
        ? [{ url: content.seo.ogImage, width: 1200, height: 630, alt: "Ractysh Group" }]
        : [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Ractysh Group" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Ractysh Group | One Enterprise. Endless Possibilities.",
      description: SITE_DESCRIPTION,
      images: content.seo.ogImage ? [content.seo.ogImage] : [OG_IMAGE],
    },
    robots: { index: true, follow: true },
  };
}

export default async function Home() {
  const content = await getSiteContent();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "Corporation"],
    "@id": `${SITE_URL}/#organization`,
    name: "Ractysh Group",
    alternateName: "RACTYSH",
    legalName: "RACTYSH",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/ractysh-logo.png`,
    description: SITE_DESCRIPTION,
    foundingDate: "2025",
    founder: {
      "@type": "Person",
      name: content.founder.name,
      jobTitle: content.founder.role,
    },
    sameAs: [
      "https://www.linkedin.com/company/ractysh",
      "https://www.instagram.com/ractysh",
      "https://www.facebook.com/ractysh",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Tamil"],
      areaServed: "India",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "Tamil Nadu",
      addressLocality: "Coimbatore",
    },
    knowsAbout: [
      "Architecture", "Construction", "Real Estate",
      "Import & Export", "OTC Exchange", "Interior Design",
      "Infrastructure Development", "Global Trade",
      "Business Consulting", "Financial Services",
    ],
    brand: {
      "@type": "Brand",
      name: "Ractysh",
      description: "Enterprise Group of Companies",
    },
    owns: [
      {
        "@type": "OwnershipInfo",
        typeOfGood: {
          "@type": "Organization",
          name: "Ractysh Design Pvt Ltd",
          alternateName: "Ractysh Design",
          url: `${SITE_URL}/architecture`,
          description: "Premium Architecture & Interior Design",
        },
      },
      {
        "@type": "OwnershipInfo",
        typeOfGood: {
          "@type": "Organization",
          name: "Ractysh Infra Pvt Ltd",
          alternateName: "Ractysh Infra",
          url: `${SITE_URL}/construction`,
          description: "Construction & Infrastructure Development",
        },
      },
      {
        "@type": "OwnershipInfo",
        typeOfGood: {
          "@type": "Organization",
          name: "Ractysh Associates Pvt Ltd",
          alternateName: "Ractysh Associates",
          url: `${SITE_URL}/otc-exchange`,
          description: "OTC & Business Consulting Services",
        },
      },
      {
        "@type": "OwnershipInfo",
        typeOfGood: {
          "@type": "Organization",
          name: "Ractysh Exim Pvt Ltd",
          alternateName: "Ractysh Exim",
          url: `${SITE_URL}/import-export`,
          description: "Global Import & Export Solutions",
        },
      },
      {
        "@type": "OwnershipInfo",
        typeOfGood: {
          "@type": "Organization",
          name: "Ractysh Real Estate Pvt Ltd",
          alternateName: "Ractysh Real Estate",
          url: `${SITE_URL}/real-estate`,
          description: "Property Development & Investment",
        },
      },
    ],
    makesOffer: content.businessDivisions.map((division: { title: string; description: string }) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: division.title,
        description: division.description,
      },
    })),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Ractysh Group",
    image: `${SITE_URL}/brand/ractysh-logo.png`,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "Tamil Nadu",
      addressLocality: "Coimbatore",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Ractysh Group",
    },
    priceRange: "\u20B9\u20B9\u20B9",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Ractysh Group",
    alternateName: "RACTYSH",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/business` },
      { "@type": "ListItem", position: 3, name: "Our Work", item: `${SITE_URL}/our-work` },
      { "@type": "ListItem", position: 4, name: "About", item: `${SITE_URL}/about` },
      { "@type": "ListItem", position: 5, name: "Contact", item: `${SITE_URL}/book-consultation` },
    ],
  };

  return (
    <>
      <Navbar logoText={content.nav.logoText} items={content.nav.items} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="animate-fade-in">
        <HeroSection />
        <HomeSections />
      </main>
      <Footer />
    </>
  );
}
