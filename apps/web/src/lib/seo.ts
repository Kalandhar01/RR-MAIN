import type { Metadata } from "next";

export const SITE_URL = "https://www.ractysh.com";
export const SITE_NAME = "Ractysh Group";
export const COMPANY_LEGAL = "RACTYSH";
export const SITE_DESCRIPTION =
  "Ractysh Group is a diversified enterprise delivering excellence in Architecture, Construction, Real Estate, Import & Export, and Global Business Solutions across India and international markets.";

export const OG_IMAGE = "/brand/ractysh-logo.png";

export interface PageSeo {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
}

export const pageSeo: Record<string, PageSeo> = {
  "/": {
    title: "Ractysh Group | One Enterprise. Endless Possibilities.",
    description: SITE_DESCRIPTION,
    keywords: [
      "Ractysh Group",
      "diversified enterprise",
      "architecture",
      "construction",
      "real estate",
      "import export",
      "global business solutions",
      "Coimbatore",
    ],
  },
  "/architecture": {
    title: "Ractysh Design Pvt Ltd | Premium Architecture & Design Solutions",
    description:
      "Ractysh Design Pvt Ltd delivers premium architecture, interior design, and urban planning solutions for residential, commercial, and institutional projects across India.",
    keywords: ["architecture", "design", "residential", "commercial", "urban planning"],
  },
  "/construction": {
    title: "Ractysh Infra Pvt Ltd | Construction & Infrastructure",
    description:
      "Ractysh Infra Pvt Ltd is a leading construction and infrastructure company specializing in project execution, government contracts, and end-to-end development solutions.",
    keywords: ["construction", "infrastructure", "government contracts", "project management"],
  },
  "/real-estate": {
    title: "Ractysh Real Estate Pvt Ltd | Property Development",
    description:
      "Ractysh Real Estate Pvt Ltd offers premium property acquisition, investment opportunities, and portfolio advisory services across South India.",
    keywords: ["real estate", "property", "investment", "Coimbatore", "residential", "commercial"],
  },
  "/import-export": {
    title: "Ractysh Exim Pvt Ltd | Global Trade Solutions",
    description:
      "Ractysh Exim Pvt Ltd provides global trade and logistics solutions, connecting Indian markets with international opportunities across multiple sectors.",
    keywords: ["import", "export", "global trade", "logistics", "international business"],
  },
  "/otc-exchange": {
    title: "Ractysh Associates Pvt Ltd | OTC Trading Desk",
    description:
      "Ractysh Associates Pvt Ltd operates a private OTC trading desk for institutional-grade transaction coordination, settlement governance, and cross-border deal execution.",
    keywords: ["OTC", "trading desk", "settlement", "institutional", "cross-border"],
  },
  "/about": {
    title: "About Ractysh Group | One Enterprise. Endless Possibilities.",
    description:
      "Learn about Ractysh Group, a diversified enterprise delivering premium Architecture, Construction, Real Estate, Import & Export, and Business Solutions.",
    keywords: ["about", "Ractysh Group", "enterprise", "diversified business"],
  },
  "/careers": {
    title: "Careers at Ractysh Group | Join Our Enterprise Team",
    description:
      "Explore premium career opportunities across Ractysh Group's five divisions: Architecture, Construction, Real Estate, Import & Export, and OTC Exchange.",
    keywords: ["careers", "jobs", "enterprise", "architecture", "construction"],
  },
  "/book-consultation": {
    title: "Book a Consultation | Ractysh Group",
    description:
      "Schedule a consultation with Ractysh Group for architecture, construction, real estate, import-export, or OTC exchange solutions.",
    keywords: ["consultation", "book", "enterprise solutions", "business"],
  },
  "/architecture-service": {
    title: "Architecture Services | Ractysh Design Pvt Ltd",
    description:
      "Ractysh Design Pvt Ltd offers premium architecture, interior design, landscape planning, and 3D visualization services for residential and commercial projects.",
    keywords: ["architecture services", "design", "interior", "landscape", "3D visualization"],
  },
  "/our-projects": {
    title: "Our Work & Projects | Ractysh Group",
    description:
      "Explore selected enterprise work across Architecture, Construction, Real Estate, Import & Export, and OTC Exchange by Ractysh Group.",
    keywords: ["projects", "portfolio", "our work", "enterprise"],
  },
  "/import-export/about": {
    title: "About Ractysh Exim Pvt Ltd | Global Trade & Sourcing Company",
    description:
      "Learn about Ractysh Exim Private Limited, a professional import, export, international trade, sourcing, and global business solutions company based in Tamil Nadu, India.",
    keywords: ["about Ractysh Exim", "global trade company", "import export Tamil Nadu", "international business"],
  },
  "/import-export/services": {
    title: "Import & Export Services | Ractysh Exim Pvt Ltd",
    description:
      "Explore the full range of services from Ractysh Exim Private Limited including global sourcing, procurement, merchant export, supply chain management, and logistics coordination.",
    keywords: ["import services", "export services", "global sourcing", "merchant export", "procurement"],
  },
  "/import-export/import-services": {
    title: "Import Services | Global Procurement & Sourcing | Ractysh Exim",
    description:
      "Ractysh Exim Pvt Ltd offers professional import services including global sourcing, procurement coordination, customs clearance, supplier verification, and international documentation.",
    keywords: ["import services", "global procurement", "sourcing", "customs clearance", "import documentation"],
  },
  "/import-export/export-services": {
    title: "Export Services | Merchant Export & Global Distribution | Ractysh Exim",
    description:
      "Ractysh Exim Pvt Ltd provides comprehensive export services including merchant export, international distribution, export documentation, market access, and cross-border trade solutions.",
    keywords: ["export services", "merchant export", "international distribution", "export documentation", "cross-border trade"],
  },
  "/import-export/global-trade": {
    title: "Global Trade Solutions | International Business | Ractysh Exim",
    description:
      "Ractysh Exim Pvt Ltd delivers international trade solutions, cross-border commerce facilitation, global market access, trade finance coordination, and strategic business expansion services.",
    keywords: ["global trade", "international trade", "cross-border commerce", "trade finance", "business expansion"],
  },
  "/import-export/industries": {
    title: "Industries We Serve | Ractysh Exim Pvt Ltd",
    description:
      "Ractysh Exim Pvt Ltd serves diverse industries including manufacturing, agriculture, textiles, chemicals, pharmaceuticals, engineering goods, and consumer products across global markets.",
    keywords: ["industries served", "manufacturing", "agriculture", "textiles", "pharmaceuticals", "engineering goods"],
  },
  "/import-export/founder": {
    title: "Our Founder | Shaiknoordeen Noorul Fawaz | Ractysh Exim",
    description:
      "Meet Shaiknoordeen Noorul Fawaz, founder of Ractysh Exim Private Limited, driving international trade, global sourcing, and business solutions connecting Indian businesses with worldwide markets.",
    keywords: ["founder", "Shaiknoordeen Noorul Fawaz", "Ractysh Exim founder", "international trade"],
  },
  "/import-export/projects": {
    title: "Our Projects & Trade Engagements | Ractysh Exim Pvt Ltd",
    description:
      "Explore selected trade engagements, sourcing projects, and international business collaborations by Ractysh Exim Private Limited across multiple sectors and global markets.",
    keywords: ["projects", "trade engagements", "sourcing", "international collaborations", "global trade"],
  },
  "/import-export/blogs": {
    title: "Trade & Sourcing Insights | Ractysh Exim Blog",
    description:
      "Read insights, updates, and thought leadership from Ractysh Exim Private Limited on international trade, global sourcing, supply chain trends, and import-export best practices.",
    keywords: ["trade blog", "import export insights", "sourcing trends", "global trade news", "supply chain"],
  },
  "/import-export/careers": {
    title: "Careers at Ractysh Exim | Global Trade Jobs",
    description:
      "Join Ractysh Exim Private Limited. Explore career opportunities in international trade, sourcing, logistics, procurement, and global business development.",
    keywords: ["careers", "trade jobs", "sourcing careers", "logistics jobs", "international trade careers"],
  },
  "/import-export/contact": {
    title: "Contact Ractysh Exim Pvt Ltd | Global Trade Solutions",
    description:
      "Get in touch with Ractysh Exim Private Limited for import, export, global sourcing, procurement, logistics, and international trade solutions. Based in Tamil Nadu, serving global markets.",
    keywords: ["contact Ractysh Exim", "import export enquiry", "trade solutions", "global trade contact"],
  },
  "/founder": {
    title: "Our Founder | Ractysh Group of Companies",
    description:
      "Meet the founder of Ractysh Group, the visionary leadership behind Ractysh Design, Ractysh Infra, Ractysh Associates, Ractysh Exim, and Ractysh Real Estate enterprises.",
    keywords: ["founder", "Ractysh Group founder", "enterprise leadership", "chairman"],
  },
  "/directors": {
    title: "Board of Directors | Ractysh Group",
    description:
      "Meet the board of directors and executive leadership team driving Ractysh Group's five enterprise pillars across Architecture, Construction, Real Estate, Import Export, and OTC Exchange.",
    keywords: ["directors", "board", "executive leadership", "Ractysh Group management"],
  },
  "/blog": {
    title: "Enterprise Blog | Ractysh Group",
    description:
      "Read insights, articles, and thought leadership from Ractysh Group on architecture, construction, real estate, import export, OTC exchange, and enterprise business solutions.",
    keywords: ["blog", "articles", "enterprise insights", "architecture blog", "construction blog"],
  },
  "/our-work": {
    title: "Our Recent Works & Projects | Ractysh Group",
    description:
      "Explore selected architecture, construction, real estate, import-export, and OTC exchange work from Ractysh Group's five enterprise divisions.",
    keywords: ["our work", "projects", "portfolio", "architecture work", "construction projects"],
  },
  "/business": {
    title: "Ractysh Business Ecosystem | Five Enterprise Pillars",
    description:
      "Explore the Ractysh Group five-pillar enterprise ecosystem spanning Architecture, Construction, Real Estate, Import & Export, and OTC Exchange services.",
    keywords: ["business ecosystem", "enterprise pillars", "Ractysh divisions", "corporate group"],
  },
  "/infrastructure": {
    title: "Infrastructure Division | Ractysh Group",
    description:
      "Ractysh Group's infrastructure and construction division delivering large-scale project execution, government contracts, and development solutions.",
    keywords: ["infrastructure", "construction", "government contracts", "development"],
  },
  "/privacy-policy": {
    title: "Privacy Policy | Ractysh Group",
    description:
      "Privacy Policy of Ractysh Group. Learn how we collect, use, store, and protect your personal information in compliance with Indian data protection laws.",
    keywords: ["privacy policy", "data protection", "Ractysh Group privacy"],
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions | Ractysh Group",
    description:
      "Terms and Conditions governing the use of Ractysh Group website, services, and enterprise solutions across all divisions.",
    keywords: ["terms and conditions", "terms of use", "Ractysh Group terms"],
  },
  "/cookie-policy": {
    title: "Cookie Policy | Ractysh Group",
    description:
      "Cookie Policy of Ractysh Group. Understand how we use cookies, tracking technologies, and your choices regarding data collection on our website.",
    keywords: ["cookie policy", "cookies", "tracking", "data privacy"],
  },
  "/disclaimer": {
    title: "Disclaimer | Ractysh Group",
    description:
      "Disclaimer of Ractysh Group regarding the use of our website, content, enterprise services, and professional advice across all divisions.",
    keywords: ["disclaimer", "legal notice", "Ractysh Group disclaimer"],
  },
  "/copyright-policy": {
    title: "Copyright Policy | Ractysh Group",
    description:
      "Copyright Policy of Ractysh Group. Information about intellectual property, content usage rights, and copyright claims.",
    keywords: ["copyright", "intellectual property", "content rights"],
  },
  "/refund-policy": {
    title: "Refund & Cancellation Policy | Ractysh Group",
    description:
      "Refund and cancellation policy of Ractysh Group for consultation services, project engagements, and enterprise solutions across all divisions.",
    keywords: ["refund policy", "cancellation", "Ractysh Group refund"],
  },
  "/disclosure": {
    title: "Disclosure | Ractysh Group",
    description:
      "Important disclosures and regulatory information from Ractysh Group regarding our enterprise services and professional engagements.",
    keywords: ["disclosure", "regulatory", "enterprise disclosure"],
  },
  "/trademark-certification": {
    title: "Trademark Certification | Ractysh Group",
    description:
      "Trademark registration and certification information for Ractysh Group, Ractysh Design, Ractysh Infra, Ractysh Associates, Ractysh Exim, and Ractysh Real Estate.",
    keywords: ["trademark", "certification", "Ractysh trademark", "brand protection"],
  },
  "/book-demo": {
    title: "Book a Demo | Ractysh Group",
    description:
      "Schedule a product or service demonstration with Ractysh Group for enterprise solutions across Architecture, Construction, Real Estate, Import Export, and OTC Exchange.",
    keywords: ["book demo", "product demo", "enterprise demo", "Ractysh demo"],
  },
  "/consultation": {
    title: "Consultation Services | Ractysh Group",
    description:
      "Schedule a professional consultation with Ractysh Group experts for architecture, construction, real estate, import-export, or OTC exchange advisory.",
    keywords: ["consultation", "advisory", "business consultation", "enterprise consultation"],
  },
  "/sitemap": {
    title: "Sitemap | Ractysh Group",
    description:
      "Complete sitemap of Ractysh Group website. Find all pages, services, and enterprise information across our five divisions.",
    keywords: ["sitemap", "site map", "Ractysh Group pages"],
  },
};

export function getPageSeo(pathname: string): PageSeo {
  return pageSeo[pathname] || pageSeo["/"];
}

export function buildMetadata(seo: PageSeo, pathname: string): Metadata {
  const url = `${SITE_URL}${pathname}`;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      images: [OG_IMAGE],
    },
  };
}
