"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import {
  ArrowUpRight,
  Building2,
  ChevronRight,
  Clock3,
  DraftingCompass,
  Globe2,
  HardHat,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { BrandLogo } from "@/components/BrandLogo";
import { CompanyContactPanel } from "@/components/CompanyContactPanel";
import { commercialServicePages } from "@/data/commercialServices";
import { servicePages } from "@/data/servicePages";
import { COMPANY_CONTACT } from "@/lib/companyContact";
import type { NavItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getCompanyBrand } from "@/lib/branding";
import { useHeroIntersection } from "@/lib/useHeroIntersection";

interface NavbarProps {
  logoText: string;
  items: NavItem[];
}

interface MegaLink {
  label: string;
  description: string;
  href: string;
  Icon: LucideIcon;
}

interface MegaColumn {
  title: string;
  links: MegaLink[];
}

interface MegaDefinition {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
  columns: MegaColumn[];
}

interface EnterpriseNavItem {
  label: string;
  href: string;
  menu?: MegaDefinition;
  variant?: "link" | "cta";
}

interface SearchItem {
  title: string;
  description: string;
  href: string;
  Icon: LucideIcon;
  keywords: string[];
}

interface MegaPreview {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
}

const ease = [0.22, 1, 0.36, 1] as const;
const searchOverlayEase = [0.215, 0.61, 0.355, 1] as const;
const ecosystemAnchorHref = "/#features";

const menuModels: Record<string, MegaDefinition> = {
  Ecosystem: {
    eyebrow: "RACTYSH",
    title: "Business divisions across one premium enterprise ecosystem.",
    description: "Move between Ractysh business divisions across Architecture, Construction, Real Estate, Import-Export operations and OTC Exchange.",
    image: "/images/photo-1486406146926-c627a92ad1ab.webp",
    ctaLabel: "Explore ecosystem",
    ctaHref: ecosystemAnchorHref,
    columns: [
      {
        title: "Business Divisions",
        links: [
          { label: "Architecture Division", description: "Spatial intelligence, planning and visualization.", href: "https://architects.ractysh.com/", Icon: DraftingCompass },
          { label: "Construction Division", description: "Site execution, MEP and turnkey delivery.", href: "https://construction.ractysh.com/", Icon: HardHat },
          { label: "Real Estate Division", description: "Asset positioning and development advisory.", href: "https://estates.ractysh.com/", Icon: Building2 },
          { label: "Import & Export Division", description: "Global trade and supplier network operations.", href: "https://exports.ractysh.com/", Icon: Globe2 },
          { label: "OTC Exchange Division", description: "Private counterparty and deal-room coordination.", href: "https://exchange.ractysh.com/", Icon: ShieldCheck }
        ]
      }
    ]
  },
  "Our Work": {
    eyebrow: "Selected Work",
    title: "Selected work across five enterprise pillars.",
    description: "An editorial view of Ractysh work across Architecture, Construction, Real Estate, Export-Import, OTC Exchange and enterprise environments.",
    image: "/images/photo-1518005020951-eccb494ad742.webp",
    ctaLabel: "Explore our work",
    ctaHref: "/our-projects",
    columns: [
      {
        title: "Work Index",
        links: [
          { label: "Construction Work", description: "Commercial facilities and turnkey delivery.", href: "/our-projects", Icon: HardHat },
          { label: "Architecture Work", description: "Premium interiors and architectural concepts.", href: "/our-projects", Icon: DraftingCompass },
          { label: "Real Estate Work", description: "Asset positioning and investor-ready property workflows.", href: "/our-projects", Icon: Building2 },
          { label: "Export & Import Hubs", description: "Global trade coordination and enterprise operations.", href: "/our-projects", Icon: Globe2 },
          { label: "OTC Exchange Workflows", description: "Private counterparty and transaction-readiness systems.", href: "/our-projects", Icon: ShieldCheck }
        ]
      }
    ]
  },
  Services: {
    eyebrow: "Commercial Services",
    title: "Professional service offerings with dedicated service routes.",
    description: "Commercial service pathways for clients who need Architecture, Construction, Real Estate, Trade coordination or Private Exchange support.",
    image: "/images/photo-1497366754035-f200968a6e72.webp",
    ctaLabel: "Architecture Service",
    ctaHref: "/architecture-service",
    columns: [
      {
        title: "Professional Service Offerings",
        links: [
          { label: "Architecture Service", description: "Commercial architecture planning and design support.", href: "/architecture-service", Icon: DraftingCompass },
          { label: "Construction Service", description: "Site execution and delivery coordination.", href: "/construction-service", Icon: HardHat },
          { label: "Real Estate Service", description: "Asset positioning and property presentation.", href: "/real-estate-service", Icon: Building2 }
        ]
      },
      {
        title: "Trade and Transaction Services",
        links: [
          { label: "Import & Export Service", description: "Cross-border trade and supplier coordination.", href: "/import-export-service", Icon: Globe2 },
          { label: "OTC Exchange Service", description: "Private transaction-readiness coordination.", href: "/otc-exchange-service", Icon: ShieldCheck }
        ]
      }
    ]
  },
  "About Us": {
    eyebrow: "Company",
    title: "Leadership, locations and enterprise identity.",
    description: `Learn about RACTYSH, the founder, directors, trademark layer and ${COMPANY_CONTACT.locationDisplay}.`,
    image: "/images/photo-1518005020951-eccb494ad742.webp",
    ctaLabel: "About Ractysh",
    ctaHref: "/about",
    columns: [
      {
        title: "Company",
        links: [
          { label: "About Us", description: "Group profile and business model.", href: "/about", Icon: Building2 },
          { label: "Founder Profile", description: "Chairman vision and timeline.", href: "/founder", Icon: ShieldCheck },
          { label: "Directors", description: "Executive leadership profiles.", href: "/directors", Icon: Building2 }
        ]
      }
    ]
  },
  Careers: {
    eyebrow: "Careers",
    title: "Build enterprise systems with Ractysh.",
    description: "Roles and internships across Architecture, Construction, Real Estate, Trade, OTC Exchange and premium client service.",
    image: "/images/photo-1551836022-d5d88e9218df.webp",
    ctaLabel: "View careers",
    ctaHref: "/careers",
    columns: [
      {
        title: "Hiring",
        links: [
          { label: "Open Roles", description: "Current business and technical roles.", href: "/careers", Icon: Building2 },
          { label: "Internships", description: "Design and operations internship paths.", href: "/careers", Icon: DraftingCompass }
        ]
      }
    ]
  },
  Blog: {
    eyebrow: "Insights",
    title: "Enterprise writing for premium decisions.",
    description: "Architecture insights, construction notes, real estate strategy, export-import updates, OTC exchange workflow and company stories.",
    image: "/images/photo-1450101499163-c8848c66ca85.webp",
    ctaLabel: "Read insights",
    ctaHref: "/blog",
    columns: [
      {
        title: "Editorial",
        links: [
          { label: "Architecture Insights", description: "Design and visualization thinking.", href: "/blog", Icon: DraftingCompass },
          { label: "Construction News", description: "Execution and delivery frameworks.", href: "/blog", Icon: HardHat },
          { label: "Real Estate Strategy", description: "Asset positioning and development notes.", href: "/blog", Icon: Building2 },
          { label: "Export & Import Updates", description: "Trade documentation and supplier network notes.", href: "/blog", Icon: Globe2 },
          { label: "OTC Exchange Notes", description: "Private transaction workflow notes.", href: "/blog", Icon: ShieldCheck }
        ]
      }
    ]
  },
  Founder: {
    eyebrow: "Founder",
    title: "Founder vision and enterprise direction.",
    description: "Read the chairman profile, Ractysh timeline and leadership principles behind the group.",
    image: "/images/photo-1518005020951-eccb494ad742.webp",
    ctaLabel: "View founder",
    ctaHref: "/founder",
    columns: [
      {
        title: "Founder Office",
        links: [
          { label: "Founder Profile", description: "Chairman vision and operating philosophy.", href: "/founder", Icon: ShieldCheck },
          { label: "Leadership Timeline", description: "Milestones across the Ractysh journey.", href: "/founder#timeline", Icon: Building2 },
          { label: "Directors", description: "Executive leadership profiles.", href: "/directors", Icon: Building2 }
        ]
      }
    ]
  },
  Directors: {
    eyebrow: "Directors",
    title: "Directors driving the RACTYSH vision.",
    description: "Meet Ashok Kumar M and C. Naveen — the Directors leading RACTYSH Associates and RACTYSH Design.",
    image: "/images/photo-1518005020951-eccb494ad742.webp",
    ctaLabel: "View directors",
    ctaHref: "/directors",
    columns: [
      {
        title: "Director Offices",
        links: [
          { label: "Ashok Kumar M", description: "Director — RACTYSH Associates Pvt Ltd.", href: "/directors", Icon: Building2 },
          { label: "C. Naveen", description: "Director — RACTYSH Design Pvt Ltd.", href: "/directors", Icon: Building2 }
        ]
      }
    ]
  }
};

const navOrder = [
  "Ecosystem",
  "Services",
  "Our Work",
  "About Us",
  "Careers",
  "Blog",
  "Book Consultation",
  "Founder",
  "Directors"
];

const fallbackHref: Record<string, string> = {
  Ecosystem: ecosystemAnchorHref,
  Services: "/architecture-service",
  "Our Work": "/our-projects",
  "About Us": "/about",
  Careers: "/careers",
  Blog: "/blog",
  "Book Consultation": "/book-consultation",
  Founder: "/founder",
  Directors: "/directors"
};

const quickAccessSearchItems: SearchItem[] = [
  {
    title: "Our Work",
    description: "Selected Ractysh environments and enterprise execution",
    href: "/our-projects",
    Icon: DraftingCompass,
    keywords: ["work", "projects", "selected", "portfolio", "infrastructure", "design", "turnkey"]
  },
  {
    title: "About",
    description: "Company profile and identity",
    href: "/about",
    Icon: ShieldCheck,
    keywords: ["about", "company", "profile", "identity", "ractysh"]
  },
  {
    title: "Founder",
    description: "Leadership and enterprise vision",
    href: "/founder",
    Icon: ShieldCheck,
    keywords: ["founder", "chairman", "leadership", "vision", "trust"]
  },
  {
    title: "Directors",
    description: "Executive leadership and director profiles",
    href: "/directors",
    Icon: Building2,
    keywords: ["directors", "leadership", "executive", "ashok", "naveen", "board"]
  },
  {
    title: "Blog",
    description: "Articles and insights",
    href: "/blog",
    Icon: DraftingCompass,
    keywords: ["blog", "insights", "articles", "news", "editorial"]
  }
];

const commercialServiceHrefs = new Set(commercialServicePages.map((service) => service.href));

const serviceSearchItems: SearchItem[] = servicePages.filter((service) => !commercialServiceHrefs.has(service.href)).map((service) => ({
  title: service.eyebrow,
  description: service.summary,
  href: service.href,
  Icon: service.category === "Design Studio" ? DraftingCompass : service.category === "Build Delivery" ? HardHat : Globe2,
  keywords: [service.category, service.eyebrow, service.slug, "service", "premium", "enterprise"]
}));

const commercialServiceSearchItems: SearchItem[] = commercialServicePages.map((service) => ({
  title: service.title,
  description: service.summary,
  href: service.href,
  Icon: service.slug.includes("architecture")
    ? DraftingCompass
    : service.slug.includes("construction")
      ? HardHat
      : service.slug.includes("real-estate")
        ? Building2
        : service.slug.includes("otc")
          ? ShieldCheck
          : Globe2,
  keywords: [service.title, service.slug, "commercial service", "professional service", "service route"]
}));

const globalSearchItems: SearchItem[] = [
  ...quickAccessSearchItems,
  ...commercialServiceSearchItems,
  ...serviceSearchItems,
  {
    title: "Import & Export Division",
    description: "Import-export, global trade and supplier network operating layer",
    href: "/import-export",
    Icon: Globe2,
    keywords: ["import export", "global trade", "supplier network", "trade documentation", "commerce", "division"]
  },
  {
    title: "Architecture Division",
    description: "Spatial intelligence, planning and visualization pillar",
    href: "/architecture",
    Icon: DraftingCompass,
    keywords: ["design", "architecture", "visualization", "spatial", "blueprint"]
  },
  {
    title: "Construction Division",
    description: "Construction, project execution and turnkey delivery pillar",
    href: "/construction",
    Icon: HardHat,
    keywords: ["infra", "infrastructure", "construction", "turnkey", "execution"]
  },
  {
    title: "Real Estate Division",
    description: "Asset positioning, development advisory and investor-ready property workflow",
    href: "/real-estate",
    Icon: Building2,
    keywords: ["real estate", "property", "asset", "development", "leasing", "investor"]
  },
  {
    title: "OTC Exchange Division",
    description: "Private counterparty, deal-room and OTC transaction coordination",
    href: "/otc-exchange",
    Icon: ShieldCheck,
    keywords: ["otc", "exchange", "private deals", "counterparty", "deal room", "transaction"]
  },
  {
    title: "Architecture Service",
    description: "Premium architecture service – design, planning, visualization and spatial systems",
    href: "/architecture-service",
    Icon: DraftingCompass,
    keywords: ["architecture", "service", "design", "planning", "visualization"]
  },
  {
    title: "Our Work",
    description: "Selected environments shaped through Architecture, Construction, Real Estate, Trade and OTC Exchange",
    href: "/our-projects",
    Icon: DraftingCompass,
    keywords: ["work", "projects", "portfolio", "selected work", "architecture", "construction", "real estate", "trade", "otc"]
  },
  {
    title: "About Ractysh",
    description: "Company profile, operating model and enterprise identity",
    href: "/about",
    Icon: ShieldCheck,
    keywords: ["about", "company", "profile", "identity", "ractysh"]
  },
  {
    title: "Blog & Insights",
    description: "Five-pillar enterprise writing and operating insights",
    href: "/blog",
    Icon: DraftingCompass,
    keywords: ["blog", "insights", "articles", "news", "editorial"]
  },
  {
    title: "Enterprise Solutions",
    description: "Integrated ecosystem services for modern enterprises",
    href: "/#enterprise-solutions",
    Icon: ShieldCheck,
    keywords: ["solutions", "enterprise", "ecosystem", "operations", "platform"]
  },
  {
    title: "Project Timeline",
    description: "Operational milestones across the Ractysh ecosystem",
    href: "/#project-timeline",
    Icon: Clock3,
    keywords: ["timeline", "history", "milestones", "journey"]
  },
];

function normalizeLabel(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const navHrefAliases: Record<string, string[]> = {
  "Our Work": ["/our-projects"],
  "Book Consultation": ["/book-consultation"]
};

function isActiveHref(href: string, pathname: string) {
  if ((href === "/business" || href === ecosystemAnchorHref || href === "/#enterprise-solutions") && pathname === "/business") return true;
  if (href === "/architecture-service" && commercialServiceHrefs.has(pathname)) return true;
  if (href.startsWith("/#") || href.startsWith("#")) return pathname === "/";
  return href === pathname || (href !== "/" && pathname.startsWith(href));
}

function buildNavItems(items: NavItem[]): EnterpriseNavItem[] {
  return navOrder.map((label) => {
    const acceptedHrefs = navHrefAliases[label] || [];
    const contentItem = items.find((item) =>
      normalizeLabel(item.label) === normalizeLabel(label) || acceptedHrefs.includes(item.href)
    );
    return {
      label,
      href: label === "Ecosystem" ? ecosystemAnchorHref : contentItem?.href || fallbackHref[label],
      menu: menuModels[label],
      variant: label === "Book Consultation" ? "cta" : "link"
    };
  });
}

const mobileContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.055, delayChildren: 0.12 }
  }
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } }
};

interface MobileChildItem {
  label: string;
  href: string;
  Icon?: LucideIcon;
}

interface MobileNavItem {
  label: string;
  href: string;
  children?: MobileChildItem[];
}

const labelIconMap: Record<string, LucideIcon> = {
  Architecture: DraftingCompass,
  Construction: HardHat,
  "Real Estate": Building2,
  "Import & Export": Globe2,
  "OTC Exchange": ShieldCheck,
};

const commercialServiceChildren = commercialServicePages.map((s) => {
  const name = s.title.replace(" Service", "");
  return { label: s.title, href: s.href, Icon: labelIconMap[name] };
});

const mobileEcosystemChildren: MobileChildItem[] = [
  { label: "Architecture Division", href: "https://architects.ractysh.com/", Icon: DraftingCompass },
  { label: "Construction Division", href: "https://construction.ractysh.com/", Icon: HardHat },
  { label: "Real Estate Division", href: "https://estates.ractysh.com/", Icon: Building2 },
  { label: "Import & Export Division", href: "https://exports.ractysh.com/", Icon: Globe2 },
  { label: "OTC Exchange Division", href: "https://exchange.ractysh.com/", Icon: ShieldCheck },
];

const mobileNavItems: MobileNavItem[] = [
  { label: "Ecosystem", href: ecosystemAnchorHref, children: mobileEcosystemChildren },
  { label: "Services", href: "/architecture-service", children: commercialServiceChildren },
  { label: "Our Work", href: "/our-projects" },
  { label: "Founder", href: "/founder" },
  { label: "Directors", href: "/directors" },
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/book-consultation" },
];

function getMegaPreviewImage(link: MegaLink, fallbackImage: string) {
  const signature = `${link.label} ${link.href}`.toLowerCase();

  if (signature.includes("architecture") || signature.includes("design")) return "/services/showcase-architecture.webp";
  if (signature.includes("construction") || signature.includes("structural") || signature.includes("turnkey")) return "/services/showcase-construction.webp";
  if (signature.includes("real-estate") || signature.includes("real estate") || signature.includes("property")) return "/services/showcase-real-estate.webp";
  if (signature.includes("import") || signature.includes("export") || signature.includes("trade") || signature.includes("supplier")) return "/services/showcase-import-export.webp";
  if (signature.includes("otc") || signature.includes("exchange")) return "/services/showcase-otc-exchange.webp";

  return fallbackImage;
}

function MegaMenu({ item, onClose }: { item: EnterpriseNavItem; onClose: () => void }) {
  const menu = item.menu;
  const [hoveredPreview, setHoveredPreview] = useState<MegaPreview | null>(null);

  useEffect(() => {
    setHoveredPreview(null);
  }, [item.label]);

  if (!menu) return null;

  const defaultPreview: MegaPreview = {
    eyebrow: menu.eyebrow,
    title: menu.title,
    description: menu.description,
    image: menu.image,
    ctaLabel: menu.ctaLabel,
    ctaHref: menu.ctaHref
  };
  const preview = hoveredPreview || defaultPreview;

  return (
    <motion.div
      key={item.label}
      initial={{ opacity: 0, y: 12, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.985 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="absolute inset-x-0 top-[72px] z-10 hidden origin-top text-[#111111] xl:block"
      style={{
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(229,231,235,0.9)",
        boxShadow: "0 24px 80px rgba(17,17,17,0.08), 0 1px 0 rgba(255,255,255,0.78) inset",
        willChange: "opacity, transform"
      }}
    >
      <div
        className={cn(
          "mx-auto grid gap-8 px-8 py-8",
          menu.columns.length === 1
            ? "max-w-[72rem] grid-cols-[minmax(0,30rem)_21rem] justify-center"
            : "max-w-[90rem] grid-cols-[minmax(0,1fr)_21rem]"
        )}
      >
        <div
          className={cn(
            "grid gap-7",
            menu.columns.length >= 3
              ? "grid-cols-3"
              : menu.columns.length === 2
                ? "grid-cols-2"
                : "grid-cols-1"
          )}
        >
          {menu.columns.map((column) => (
            <div key={column.title}>
              <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[#8B1118]">
                {column.title}
              </p>
              <div className="space-y-1">
                {column.links.map((link) => {
                  const Icon = link.Icon;
                  const showLinkPreview = () =>
                    setHoveredPreview({
                      eyebrow: column.title,
                      title: link.label,
                      description: link.description,
                      image: getMegaPreviewImage(link, menu.image),
                      ctaLabel: link.label,
                      ctaHref: link.href
                    });

                  return (
                    <Link
                      key={`${column.title}-${link.label}`}
                      href={link.href}
                      onMouseEnter={showLinkPreview}
                      onFocus={showLinkPreview}
                      onClick={onClose}
                      className="group relative flex cursor-pointer gap-3 overflow-hidden rounded-[16px] border border-transparent bg-transparent px-3 py-3 text-[#111111] shadow-none transition-[background,border-color,transform] duration-200 ease-out hover:translate-x-1 hover:border-[rgba(139,17,24,0.12)] hover:bg-[rgba(139,17,24,0.04)] focus-visible:translate-x-1 focus-visible:border-[rgba(139,17,24,0.12)] focus-visible:bg-[rgba(139,17,24,0.04)] focus-visible:outline-none"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute bottom-3 left-0 top-3 w-[3px] origin-center scale-y-0 rounded-full bg-[#8B1118] transition-transform duration-200 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100"
                      />
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-none border-0 bg-transparent text-[#4B5563] shadow-none transition-colors duration-200 ease-out group-hover:text-[#8B1118] group-focus-visible:text-[#8B1118]">
                        <Icon className="h-4 w-4" strokeWidth={1.9} />
                      </span>
                      <span>
                        <span className="block text-[0.98rem] font-semibold leading-tight text-[#111111] transition-colors duration-200 ease-out group-hover:text-[#8B1118] group-focus-visible:text-[#8B1118]">
                          {link.label}
                        </span>
                        <span className="mt-1 block max-w-[17rem] text-[0.84rem] leading-[1.45] text-[#5B6472] transition-colors duration-200 ease-out group-hover:text-[#374151] group-focus-visible:text-[#374151]">
                          {link.description}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

          <div className="ractysh-luxury-card overflow-hidden bg-white/82 backdrop-blur-[16px]">
          <div className="relative h-36 overflow-hidden bg-[#12090b]">
            <AnimatePresence mode="wait">
              <motion.img
                key={preview.image}
                src={preview.image}
                alt=""
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 0.88, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,9,11,0.04),rgba(18,9,11,0.58))]" />
          </div>
          <div className="p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${preview.title}-${preview.ctaHref}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[#8B1118]">{preview.eyebrow}</p>
                <h3 className="mt-3 font-display text-[1.45rem] font-semibold leading-tight tracking-normal text-[#111111]">
                  {preview.title}
                </h3>
                <p className="mt-3 text-[0.86rem] leading-6 text-[#4B5563]">{preview.description}</p>
                {item.label === "Contact" && !hoveredPreview ? (
                  <CompanyContactPanel mode="consultation" tone="transparent" className="mt-4 sm:grid-cols-1" />
                ) : null}
                <Link
                  href={preview.ctaHref}
                  onClick={onClose}
                  className="mt-5 inline-flex cursor-pointer items-center gap-2 text-[0.86rem] font-semibold text-[#111111] transition-colors duration-200 ease-out hover:text-[#8B1118] focus-visible:text-[#8B1118] focus-visible:outline-none"
                >
                  {preview.ctaLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function matchesSearchItem(item: SearchItem, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  return [item.title, item.description, ...item.keywords].some((value) =>
    value.toLowerCase().includes(normalizedQuery)
  );
}

function GlobalSearchOverlay({
  activeIndex,
  compact,
  inputRef,
  items,
  open,
  query,
  onActiveChange,
  onClose,
  onNavigate,
  onQueryChange
}: {
  activeIndex: number;
  compact: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  items: SearchItem[];
  open: boolean;
  query: string;
  onActiveChange: (index: number) => void;
  onClose: () => void;
  onNavigate: (href: string) => void;
  onQueryChange: (query: string) => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="global-search-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: searchOverlayEase }}
          className="fixed inset-0 z-[260] flex items-start justify-center px-3 pt-3 text-[#211b17] sm:items-center sm:px-6 sm:pt-0"
          onClick={onClose}
          style={{
            background: "rgba(255,255,255,0.18)",
            backdropFilter: compact ? "blur(10px)" : "blur(14px)",
            WebkitBackdropFilter: compact ? "blur(10px)" : "blur(14px)",
            willChange: "opacity"
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[#211b17]/[0.055]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_50%_0%,rgba(214,180,95,0.14),transparent_34rem)]" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Global search"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: searchOverlayEase }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-[520px] overflow-hidden rounded-2xl border border-white/72 bg-[#fffdf8]/92 shadow-[0_34px_110px_rgba(32,24,17,0.22),0_2px_0_rgba(255,255,255,0.85)_inset]"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.74),rgba(255,255,255,0.18)_45%,rgba(214,180,95,0.08))]" />
            <div className="relative flex h-[56px] items-center gap-3 border-b border-[#e9dfcc]/72 px-4">
              <Search className="h-4 w-4 shrink-0 text-[#6A0008]" strokeWidth={2} />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search..."
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent text-[14px] font-medium leading-none text-[#171717] outline-none placeholder:text-[#9a9a9a]"
              />
              <button
                type="button"
                aria-label="Close search"
                onClick={onClose}
                className="shrink-0 rounded-md border border-[#e8ddca] bg-white/76 px-2 py-1 text-[11px] font-medium uppercase tracking-normal text-[#777777] shadow-sm transition duration-150 hover:border-[#C9A15A]/70 hover:bg-white hover:text-[#111111]"
              >
                Esc
              </button>
            </div>

            <div className="relative max-h-[min(22rem,58vh)] overflow-y-auto p-1.5">
              {items.length ? (
                <div className="space-y-0.5">
                  {items.map((item, index) => {
                    const Icon = item.Icon;
                    const selected = activeIndex === index;

                    return (
                      <button
                        key={`${item.title}-${item.href}`}
                        type="button"
                        data-selected={selected ? "true" : undefined}
                        onMouseEnter={() => onActiveChange(index)}
                        onClick={() => onNavigate(item.href)}
                        className={cn(
                          "flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-[14px] font-medium text-[#242424] transition-colors duration-150 hover:bg-[#f7efe0]",
                          selected && "bg-[#f5efe5]"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0 text-[#8f6928]" strokeWidth={1.9} />
                        <span className="min-w-0 flex-1 truncate">{item.title}</span>
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#b0b0b0]" strokeWidth={2} />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-16 items-center px-3 text-[14px] font-medium text-[#777777]">No results</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

export function Navbar({ logoText, items }: NavbarProps) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMounted, setMobileMounted] = useState(false);
  const [mobileExpandedLabels, setMobileExpandedLabels] = useState<Set<string>>(new Set());
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActiveIndex, setSearchActiveIndex] = useState(0);
  const [compactSearch, setCompactSearch] = useState(false);
  const navItems = useMemo(() => buildNavItems(items), [items]);
  const primaryNavItems = useMemo(() => navItems.filter((item) => item.variant !== "cta"), [navItems]);
  const consultationNavItem = useMemo(() => navItems.find((item) => item.variant === "cta"), [navItems]);
  const activeItem = activeLabel ? navItems.find((item) => item.label === activeLabel && item.menu) : null;
  const brandName = logoText && !logoText.toLowerCase().includes("audit") ? logoText : "Ractysh";
  const companyBrand = getCompanyBrand(pathname);
  const isLandscapePlanningRoute = pathname === "/landscape-planning";
  const { navbarVariant } = useHeroIntersection();
  const navbarVariantRef = useRef(navbarVariant);
  navbarVariantRef.current = navbarVariant;
  const displayedSearchItems = useMemo(() => {
    if (!searchQuery.trim()) return quickAccessSearchItems;
    return globalSearchItems.filter((item) => matchesSearchItem(item, searchQuery)).slice(0, 8);
  }, [searchQuery]);

  const toggleMobileExpand = useCallback((label: string) => {
    setMobileExpandedLabels((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }, []);

  const openSearch = useCallback(() => {
    setActiveLabel(null);
    setMobileOpen(false);
    setSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchActiveIndex(0);
  }, []);

  const navigateSearch = useCallback(
    (href: string) => {
      closeSearch();
      router.push(href);
    },
    [closeSearch, router]
  );

  const updateSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
    setSearchActiveIndex(0);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const interactionLocked = Boolean(activeLabel || mobileOpen || searchOpen);
    let lastScrollY = Math.max(window.scrollY, 0);
    let navHidden = false;
    let ticking = false;

    const isMobileViewport = () => window.innerWidth < 768;
    const showDuration = () => (isMobileViewport() ? 0.38 : 0.5);
    const hideDuration = () => (isMobileViewport() ? 0.34 : 0.45);

    const showHeader = (duration = showDuration()) => {
      const currentY = Number(gsap.getProperty(header, "yPercent"));
      const currentOpacity = Number(gsap.getProperty(header, "opacity"));
      if (!navHidden && Math.abs(currentY) < 0.01 && currentOpacity >= 0.999) return;

      navHidden = false;
      gsap.to(header, {
        yPercent: 0,
        opacity: 1,
        duration,
        ease: "power3.out",
        overwrite: "auto"
      });
    };

    const hideHeader = () => {
      if (navHidden || interactionLocked) return;

      navHidden = true;
      gsap.to(header, {
        yPercent: -120,
        opacity: 0.96,
        duration: hideDuration(),
        ease: "power3.out",
        overwrite: "auto"
      });
    };

    const syncHeader = () => {
      const currentScroll = Math.max(window.scrollY, 0);
      const scrolled = currentScroll > 18;
      const insideHomeHero = pathname === "/" && navbarVariantRef.current === "transparent";
      const navBackground = insideHomeHero ? "transparent" : "#FFFFFF";
      const navBorder = insideHomeHero ? "transparent" : "#ECECEC";
      const navShadow = scrolled ? "0 2px 20px rgba(0,0,0,0.05)" : "none";
      const navBlur = scrolled ? "blur(8px)" : "blur(0px)";
      const navText = insideHomeHero ? "#ffffff" : "#111111";
      const mobileBtnBg = insideHomeHero ? "rgba(255,255,255,0.12)" : "#ffffff";
      const mobileBtnBorder = insideHomeHero ? "rgba(255,255,255,0.25)" : "#ECECEC";

      gsap.to(header, {
        "--nav-bg": navBackground,
        "--nav-border": navBorder,
        "--nav-shadow": navShadow,
        "--nav-blur": navBlur,
        "--nav-text": navText,
        "--nav-mobile-btn-bg": mobileBtnBg,
        "--nav-mobile-btn-border": mobileBtnBorder,
        duration: 0.3,
        ease: "power3.out"
      });

      if (isLandscapePlanningRoute) {
        showHeader(currentScroll <= 8 ? 0.24 : showDuration());
        lastScrollY = currentScroll;
        return;
      }

      if (insideHomeHero || currentScroll <= 8 || interactionLocked) {
        showHeader(insideHomeHero || currentScroll <= 8 ? 0.36 : showDuration());
        lastScrollY = currentScroll;
        return;
      }

      if (window.innerWidth >= 1280) {
        showHeader(0.3);
        lastScrollY = currentScroll;
        return;
      }

      const scrollDelta = currentScroll - lastScrollY;
      if (Math.abs(scrollDelta) < 5) return;

      if (scrollDelta > 0) {
        hideHeader();
      } else {
        showHeader();
      }

      lastScrollY = currentScroll;
    };

    const requestSync = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        syncHeader();
      });
    };

    gsap.set(header, {
      yPercent: 0,
      opacity: 1,
      force3D: true,
      transformOrigin: "50% 0%"
    });
    syncHeader();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      gsap.killTweensOf(header);
    };
  }, [activeLabel, isLandscapePlanningRoute, mobileOpen, pathname, searchOpen]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header || pathname !== "/") return;

    const isHero = navbarVariant === "transparent";
    gsap.to(header, {
      "--nav-bg": isHero ? "transparent" : "#FFFFFF",
      "--nav-border": isHero ? "transparent" : "#ECECEC",
      "--nav-text": isHero ? "#ffffff" : "#111111",
      "--nav-mobile-btn-bg": isHero ? "rgba(255,255,255,0.12)" : "#ffffff",
      "--nav-mobile-btn-border": isHero ? "rgba(255,255,255,0.25)" : "#ECECEC",
      "--nav-shadow": isHero ? "none" : "0 2px 20px rgba(0,0,0,0.05)",
      "--nav-blur": isHero ? "blur(0px)" : "blur(8px)",
      duration: 0.3,
      ease: "power3.out",
    });
  }, [navbarVariant, pathname]);

  useEffect(() => {
    const syncSearchMode = () => setCompactSearch(window.innerWidth < 640);

    syncSearchMode();
    window.addEventListener("resize", syncSearchMode);
    return () => window.removeEventListener("resize", syncSearchMode);
  }, []);

  useEffect(() => {
    setMobileMounted(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openSearch();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openSearch]);

  useEffect(() => {
    const body = document.body;
    if (mobileOpen) {
      body.dataset.mobileMenuOpen = "true";
    } else {
      delete body.dataset.mobileMenuOpen;
    }

    if (!mobileOpen) return;

    const previousOverflow = body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1280) setMobileOpen(false);
    };

    body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      body.style.overflow = previousOverflow;
      delete body.dataset.mobileMenuOpen;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  useEffect(() => {
    setSearchActiveIndex((currentIndex) => {
      const lastIndex = Math.max(displayedSearchItems.length - 1, 0);
      return Math.min(currentIndex, lastIndex);
    });
  }, [displayedSearchItems.length]);

  useEffect(() => {
    if (!searchOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    const focusTimer = window.setTimeout(() => searchInputRef.current?.focus({ preventScroll: true }), 80);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSearch();
        return;
      }

      if (!displayedSearchItems.length) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSearchActiveIndex((currentIndex) => (currentIndex + 1) % displayedSearchItems.length);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSearchActiveIndex((currentIndex) => (currentIndex - 1 + displayedSearchItems.length) % displayedSearchItems.length);
        return;
      }

      if (event.key === "Enter") {
        const target = displayedSearchItems[Math.min(searchActiveIndex, displayedSearchItems.length - 1)];
        if (!target) return;

        event.preventDefault();
        navigateSearch(target.href);
      }
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeSearch, displayedSearchItems, navigateSearch, searchActiveIndex, searchOpen]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-[240] w-full isolate overflow-visible transition-[background,border-color,box-shadow,backdrop-filter] duration-300",
        "[--nav-bg:#FFFFFF] [--nav-blur:blur(0px)] [--nav-border:#ECECEC] [--nav-shadow:none] [--nav-text:#111111] [--nav-mobile-btn-bg:#ffffff] [--nav-mobile-btn-border:#ECECEC]"
      )}
      onMouseLeave={() => setActiveLabel(null)}
      style={{
        background: "var(--nav-bg)",
        backdropFilter: "var(--nav-blur)",
        WebkitBackdropFilter: "var(--nav-blur)",
        borderBottom: "1px solid var(--nav-border)",
        boxShadow: "var(--nav-shadow)",
        willChange: "transform, opacity"
      }}
    >
      <AnimatePresence>
        {activeItem ? (
          <motion.div
            key="navbar-hover-wash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-[72px] bg-white/[0.08] xl:block"
            style={{ backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
          />
        ) : null}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="mx-auto flex h-[64px] max-w-[90rem] items-center px-5 md:px-8 xl:grid xl:h-[72px] xl:grid-cols-[minmax(13.25rem,1fr)_auto_minmax(13.25rem,1fr)] xl:gap-4 2xl:gap-5">
          <Link
            href="/#hero"
            className="flex min-w-[11rem] items-center gap-2 xl:min-w-[13.25rem] xl:gap-2"
            onMouseEnter={() => setActiveLabel(null)}
            aria-label="Ractysh home"
          >
            <BrandLogo size="navCompact" priority decorative className="xl:hidden translate-y-[1px] !h-[42px] !w-[42px]" />
            <div>
              <span style={{ color: "var(--nav-text, #111111)" }} className="block font-sans text-[1.2rem] font-bold leading-tight tracking-tight md:text-[1.25rem]">
                {brandName}
              </span>
              <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#C9A15A] xl:hidden">
                {companyBrand.subtitle}
              </span>
            </div>
            <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-[#C9A15A] xl:block">
              {companyBrand.subtitle}
            </span>
          </Link>
          <nav className="mx-auto hidden h-full items-center justify-center gap-0.5 xl:flex 2xl:gap-1" aria-label="Primary navigation">
            {primaryNavItems.map((item) => {
              const isActive = isActiveHref(item.href, pathname);
              const isOpen = activeLabel === item.label;

              return (
                <div key={item.label} className="flex h-full items-center" onMouseEnter={() => setActiveLabel(item.menu ? item.label : null)}>
                    <Link
                      href={item.href}
                      style={{ color: "var(--nav-text, #111111)" }}
                      className={cn(
                        "executive-nav-link group relative flex h-full items-center whitespace-nowrap bg-transparent px-1.5 !text-[0.875rem] !font-semibold uppercase !leading-none !tracking-[0] shadow-none transition-[color,transform] duration-300 ease-out hover:-translate-y-px hover:bg-transparent hover:text-[#8B1118] 2xl:px-2",
                        (isActive || isOpen) && "is-active text-[#8B1118]"
                      )}
                    >
                    {item.label}
                    <span
                      className={cn(
                        "absolute bottom-[19px] left-1.5 right-1.5 h-px origin-center scale-x-0 bg-[#8B1118] shadow-none transition-transform duration-300 ease-out group-hover:scale-x-100 2xl:left-2 2xl:right-2",
                        (isActive || isOpen) && "scale-x-100"
                      )}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="ml-auto hidden min-w-[13.25rem] items-center justify-end gap-2.5 xl:flex">
            <span className="h-8 w-px bg-transparent" aria-hidden="true" />
            {consultationNavItem ? (
              <Link
                href={consultationNavItem.href}
                className="executive-nav-cta group relative inline-flex min-h-10 items-center justify-center gap-1 overflow-hidden rounded-full border border-[#E2C68B]/60 bg-[#6A0008] px-3 !text-[0.875rem] !font-medium uppercase !leading-none !tracking-[0.08em] text-[#fffaf0] shadow-[0_14px_34px_rgba(106,0,8,0.24),0_0_22px_rgba(201,161,90,0.14),inset_0_1px_0_rgba(255,255,255,0.14)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-px hover:shadow-[0_18px_40px_rgba(106,0,8,0.28),0_0_26px_rgba(201,161,90,0.16),inset_0_1px_0_rgba(255,255,255,0.16)]"
                onMouseEnter={() => setActiveLabel(null)}
              >
                <span className="pointer-events-none absolute inset-[1px] rounded-full bg-[linear-gradient(135deg,rgba(255,244,205,0.18),transparent_40%,rgba(226,198,139,0.18))]" />
                <Sparkles className="relative h-3.5 w-3.5 text-[#C9A15A]" strokeWidth={1.8} />
                <span className="relative whitespace-nowrap">{consultationNavItem.label}</span>
              </Link>
            ) : null}
          </div>

          <div className="ml-auto flex items-center gap-2 xl:hidden">
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              style={{ backgroundColor: "var(--nav-mobile-btn-bg, #ffffff)", borderColor: "var(--nav-mobile-btn-border, #ECECEC)", color: "var(--nav-text, #111111)" }}
              className="flex h-11 w-11 items-center justify-center rounded-full border shadow-[0_10px_26px_rgba(0,0,0,0.06)] xl:hidden transition-[background,border-color,color] duration-300"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeItem ? <MegaMenu item={activeItem} onClose={() => setActiveLabel(null)} /> : null}
      </AnimatePresence>

      {mobileMounted ? createPortal(
        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease }}
              className="fixed inset-0 z-[240] flex flex-col bg-[#FEFCF8] overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Ractysh mobile navigation"
            >
              <div
                aria-hidden
                className="pointer-events-none fixed inset-0 bg-black/[0.03] backdrop-blur-[1px]"
              />

              <div className="relative z-10 flex items-start justify-between gap-4 px-6 pt-5 pb-4">
                <Link
                  href="/#hero"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Ractysh home"
                  className="flex items-center gap-3"
                >
                  <BrandLogo size="navCompact" priority decorative className="!h-[42px] !w-[42px]" />
                  <div>
                    <span className="block font-display text-[1.15rem] font-semibold leading-tight text-[#111111]">
                      {brandName}
                    </span>
                    <span className="mt-0.5 block text-[0.6rem] font-medium uppercase tracking-[0.18em] text-[#9e8a70]">
                      {companyBrand.subtitle}
                    </span>
                  </div>
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E8E0D4] bg-white text-[#111111] shadow-sm"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="relative z-10 flex-1 px-6">
                <motion.div
                  variants={mobileContainerVariants}
                  initial="hidden"
                  animate="show"
                  className="space-y-0"
                >
                  {mobileNavItems.map((item) => (
                    <motion.div key={item.label} variants={mobileItemVariants}>
                      {item.children ? (
                        <>
                          <button
                            type="button"
                            onClick={() => toggleMobileExpand(item.label)}
                            className="flex w-full items-center justify-between border-b border-[#F0EBE2] py-[18px] font-display text-[2rem] font-semibold leading-none tracking-[-0.02em] text-[#111111] transition-colors duration-300 hover:text-[#8B1118] sm:text-[2.6rem]"
                          >
                            {item.label}
                            <motion.div
                              animate={{ rotate: mobileExpandedLabels.has(item.label) ? 90 : 0 }}
                              transition={{ duration: 0.2, ease }}
                            >
                              <ChevronRight className="h-6 w-6 text-[#9e8a70]" strokeWidth={2} />
                            </motion.div>
                          </button>
                          <AnimatePresence initial={false}>
                            {mobileExpandedLabels.has(item.label) && (
                              <motion.div
                                key={`${item.label}-children`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease }}
                                className="overflow-hidden"
                              >
                                <div className="pb-4 pt-2 space-y-0">
                                  {item.children.map((child) => {
                                    const ChildIcon = child.Icon;
                                    return (
                                      <Link
                                        key={child.label}
                                        href={child.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-3 border-b border-[#F0EBE2]/50 py-3 pl-4 pr-2 font-sans text-[0.95rem] font-medium leading-snug text-[#5c4f3e] transition-colors duration-300 hover:text-[#8B1118] sm:text-[1.05rem]"
                                      >
                                        {ChildIcon && (
                                          <ChildIcon className="h-4 w-4 shrink-0 text-[#9e8a70]" strokeWidth={1.8} />
                                        )}
                                        {child.label}
                                      </Link>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block border-b border-[#F0EBE2] py-[18px] font-display text-[2rem] font-semibold leading-none tracking-[-0.02em] text-[#111111] transition-colors duration-300 hover:text-[#8B1118] sm:text-[2.6rem]"
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </nav>

              <div className="sticky bottom-0 z-10 border-t border-[#F0EBE2] bg-[#FEFCF8] px-6 py-5">
                <Link
                  href="/book-consultation"
                  onClick={() => setMobileOpen(false)}
                  className="group flex w-full items-center justify-center gap-3 rounded-[8px] border border-[#C9A45C] bg-[#8B1118] py-4 text-[0.82rem] font-bold uppercase tracking-[0.06em] text-[#FEFCF8] shadow-[0_12px_34px_rgba(139,17,24,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#761015] hover:shadow-[0_18px_44px_rgba(139,17,24,0.32)]"
                >
                  <Sparkles className="h-4 w-4 text-[#C9A45C]" strokeWidth={1.8} />
                  Book Consultation
                </Link>
                <div className="mt-3 flex items-center justify-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#8B1118]/60">
                  {COMPANY_CONTACT.locationDisplay}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body
      ) : null}

      <GlobalSearchOverlay
        activeIndex={searchActiveIndex}
        compact={compactSearch}
        inputRef={searchInputRef}
        items={displayedSearchItems}
        open={searchOpen}
        query={searchQuery}
        onActiveChange={setSearchActiveIndex}
        onClose={closeSearch}
        onNavigate={navigateSearch}
        onQueryChange={updateSearchQuery}
      />
    </header>
  );
}
