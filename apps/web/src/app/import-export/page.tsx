import type { Metadata } from "next";
import { DivisionPortalPlaceholderPage } from "@/components/DivisionPortalPlaceholderPage";
import { divisionPortalConfig } from "@/data/divisionPortals";
import { buildMetadata, pageSeo, SITE_URL, SITE_NAME } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

const division = divisionPortalConfig["import-export"];

export const metadata: Metadata = buildMetadata(pageSeo["/import-export"], "/import-export");

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "Corporation"],
  "@id": `${SITE_URL}/import-export/#organization`,
  name: "RACTYSH EXIM PRIVATE LIMITED",
  legalName: "RACTYSH EXIM PRIVATE LIMITED",
  alternateName: "Ractysh Exim Pvt Ltd",
  url: `${SITE_URL}/import-export`,
  description:
    "Ractysh Exim Private Limited provides professional import, export, international trade, sourcing, procurement, logistics coordination, and global business solutions connecting Indian businesses with worldwide markets.",
  identifier: "",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Palani",
    addressRegion: "Dindigul",
    postalCode: "624601",
    addressCountry: "IN",
  },
  knowsAbout: [
    "International Trade",
    "Import Services",
    "Export Services",
    "Global Sourcing",
    "Merchant Export",
    "Procurement Solutions",
    "Supply Chain Management",
    "Logistics Coordination",
    "International Procurement",
    "Business Expansion",
    "Cross Border Trade",
    "Export Documentation",
    "Import Documentation",
    "International Distribution",
  ],
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ractysh Exim Pvt Ltd",
  url: `${SITE_URL}/import-export`,
  areaServed: [
    "India",
    "Middle East",
    "Southeast Asia",
    "Europe",
    "North America",
    "Africa",
  ],
  serviceType: [
    "Import Services",
    "Export Services",
    "Global Sourcing",
    "Merchant Export",
    "Procurement Solutions",
    "Supply Chain Management",
    "Logistics Coordination",
    "International Distribution",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ractysh Exim Pvt Ltd",
  url: `${SITE_URL}/import-export`,
  description:
    "Ractysh Exim Private Limited provides professional import, export, international trade, sourcing, procurement, logistics coordination, and global business solutions.",
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
    { "@type": "ListItem", position: 2, name: "Import & Export", item: `${SITE_URL}/import-export` },
  ],
};

export default function ImportExportPage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={professionalServiceSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={breadcrumbSchema} />
      <DivisionPortalPlaceholderPage division="import-export" />
    </>
  );
}
