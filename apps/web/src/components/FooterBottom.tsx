"use client";

import { ArrowUpRight, ArrowUp, Instagram, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { FooterSessionSubscribe } from "@/components/FooterSessionSubscribe";

import { COMPANY_CONTACT_ITEMS } from "@/lib/companyContact";
import type { NavItem, SocialLink } from "@/lib/types";

const ecosystemMarks = [
  { label: "Architecture" },
  { label: "Construction" },
  { label: "Real Estate" },
  { label: "Export & Import" },
  { label: "OTC Exchange" }
];

const fallbackLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Disclosure", href: "/disclosure" },
  { label: "Copyright Policy", href: "/copyright-policy" },
  { label: "Sitemap", href: "/sitemap" }
];

function isHiddenFooterLink(link: NavItem) {
  const label = link.label.toLowerCase();
  const href = link.href.toLowerCase();
  return label === "book consultation" || label.includes("trademark") || href.includes("trademark");
}

function normalizeFooterLink(link: NavItem): NavItem {
  if (link.label.toLowerCase() === "sitemap" && link.href === "/sitemap.xml") {
    return { ...link, href: "/sitemap" };
  }
  return link;
}

function SocialLinkIcon({ label }: { label: string }) {
  const normalizedLabel = label.toLowerCase();
  if (normalizedLabel.includes("linkedin")) return <Linkedin className="h-4 w-4" strokeWidth={2.1} />;
  if (normalizedLabel.includes("instagram")) return <Instagram className="h-4 w-4" strokeWidth={2.1} />;
  return <Mail className="h-4 w-4" strokeWidth={2.1} />;
}

interface FooterBottomProps {
  headline: string;
  description: string;
  links: NavItem[];
  socialLinks?: SocialLink[];
}

export function FooterBottom({ headline, description, links, socialLinks = [] }: FooterBottomProps) {
  const footerLinks = links.filter((link) => !isHiddenFooterLink(link)).map(normalizeFooterLink);
  const displayLinks = footerLinks.length > 0 ? footerLinks : fallbackLinks;

  return (
    <section className="relative">
      <div className="py-16">
        <div className="mx-auto max-w-[76rem]">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="#hero"
                className="inline-flex items-center gap-3 text-[#fff8ec] transition duration-300 hover:text-[#E0C579]"
                aria-label="Ractysh home"
              >
                <BrandLogo size="footer" decorative />
                <span className="font-display text-[1.5rem] font-semibold leading-none">{headline}</span>
              </Link>
              <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#E0C579]/60">
                PRIVATE ENTERPRISE GROUP
              </p>
              <p className="mt-5 text-[0.88rem] leading-7 text-[#f8efe0]/65 max-w-[24rem]">
                {description}
              </p>
              <div className="mt-6 flex items-center gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] text-[#f8efe0]/50 transition-all duration-300 hover:border-[#E0C579]/40 hover:bg-[#E0C579]/10 hover:text-[#E0C579]"
                    aria-label={link.label}
                  >
                    <SocialLinkIcon label={link.label} />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#E0C579] mb-5">Quick Links</p>
              <nav className="space-y-3">
                {displayLinks.map((link) => (
                  <Link
                    key={`${link.label}-${link.href}`}
                    href={link.href}
                    className="block text-[0.88rem] font-medium text-[#f8efe0]/70 transition-all duration-300 hover:text-[#fff8ec] hover:translate-x-0.5"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#E0C579] mb-5">Divisions</p>
              <nav className="space-y-3">
                {ecosystemMarks.map((mark, index) => (
                  <span
                    key={mark.label}
                    className="block text-[0.88rem] font-medium text-[#f8efe0]/70"
                  >
                    <span className="inline-block w-5 text-[0.6rem] font-semibold text-[#E0C579]/50">{String(index + 1).padStart(2, "0")}</span>
                    {mark.label}
                  </span>
                ))}
              </nav>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.72, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#E0C579] mb-5">Contact</p>
              <div className="space-y-4">
                {COMPANY_CONTACT_ITEMS.map((item) => {
                  const content = (
                    <>
                      <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[#E0C579]/60">{item.label}</span>
                      <p className="mt-0.5 text-[0.85rem] font-medium text-[#f8efe0]/85">{item.value}</p>
                    </>
                  );
                  return item.href ? (
                    <a key={item.label} href={item.href} className="block transition duration-300 hover:opacity-70">
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  );
                })}
              </div>
              <Link
                href="/book-consultation"
                className="group mt-6 inline-flex h-[2.8rem] w-full items-center justify-center gap-2 rounded-[8px] border border-[#E0C579]/60 bg-[#E0C579] px-5 text-[0.8rem] font-semibold text-[#161109] transition-all duration-300 hover:bg-[#f0d99a] hover:shadow-[0_12px_28px_rgba(224,197,121,0.2)] active:scale-[0.98]"
              >
                Book Consultation
                <ArrowUpRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.3} />
              </Link>
              <FooterSessionSubscribe />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-6 md:flex-row">
        <p className="text-[0.78rem] font-medium text-[#f8efe0]/45">
          &copy; 2026 Ractysh Group Private Limited. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/privacy-policy"
            className="text-[0.75rem] font-medium text-[#f8efe0]/45 transition duration-300 hover:text-[#E0C579]"
          >
            Privacy
          </Link>
          <span className="text-[#f8efe0]/20">|</span>
          <Link
            href="/terms-and-conditions"
            className="text-[0.75rem] font-medium text-[#f8efe0]/45 transition duration-300 hover:text-[#E0C579]"
          >
            Terms
          </Link>
          <span className="text-[#f8efe0]/20">|</span>
          <Link
            href="/sitemap"
            className="text-[0.75rem] font-medium text-[#f8efe0]/45 transition duration-300 hover:text-[#E0C579]"
          >
            Sitemap
          </Link>
          <Link
            href="/#hero"
            className="inline-flex items-center gap-1.5 rounded-[8px] border border-white/[0.08] px-3 py-1.5 text-[0.75rem] font-medium text-[#f8efe0]/50 transition-all duration-300 hover:border-[#E0C579]/30 hover:text-[#E0C579]"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.3} />
          </Link>
        </div>
      </div>
    </section>
  );
}
