import type { Metadata } from "next";
import ImportExportProductShowcase from "@/components/ImportExportProductShowcase";
import { buildMetadata, pageSeo, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import type { NavItem } from "@/lib/types";

export const metadata: Metadata = buildMetadata(pageSeo["/import-export"], "/import-export");

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "Corporation"],
  "@id": `${SITE_URL}/import-export/#organization`,
  name: "RACTYSH EXIM",
  legalName: "RACTYSH EXIM",
  alternateName: "Ractysh Exim",
  url: `${SITE_URL}/import-export`,
  description:
    "Ractysh Exim supplies premium building and construction products including granite, marble, tiles, natural stones, furniture, doors, windows, sanitary ware, electrical, plumbing, steel, cement, and interior products to international markets.",
  identifier: "",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Palani",
    addressRegion: "Dindigul",
    postalCode: "624601",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Granite Export",
    "Marble Export",
    "Building Materials",
    "Construction Products",
    "Furniture Export",
    "Natural Stones",
    "International Trade",
    "Product Sourcing",
  ],
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ractysh Exim",
  url: `${SITE_URL}/import-export`,
  areaServed: ["India", "Middle East", "Southeast Asia", "Europe", "North America", "Africa"],
  serviceType: ["Product Export", "Building Materials Supply", "International Sourcing", "Bulk Procurement"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ractysh Exim",
  url: `${SITE_URL}/import-export`,
  description: "Premium building and construction product exports from India.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Import & Export", item: `${SITE_URL}/import-export` },
  ],
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Products", href: "/import-export#products" },
  { label: "Contact", href: "/book-consultation" },
];

export default function ImportExportPage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={professionalServiceSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ImportExportProductShowcase logoText="RACTYSH EXIM" items={navItems} />
    </>
  );
}
