"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCompanyBrand } from "@/lib/branding";

const ecosystemLinks = [
  { label: "Architecture", href: "https://design.ractysh.com/" },
  { label: "Construction", href: "https://infra.ractysh.com/" },
  { label: "Real Estate", href: "https://estates.ractysh.com/" },
  { label: "Import & Export", href: "https://exim.ractysh.com/" },
  { label: "OTC Exchange", href: "https://associates.ractysh.com/" }
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Architecture Service", href: "/architecture-service" },
  { label: "Our Work", href: "/our-projects" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Book Consultation", href: "/book-consultation" }
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];


export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const pathname = usePathname();
  const companyBrand = getCompanyBrand(pathname);

  return (
    <footer ref={ref} className="relative bg-[#0A0A0A]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-[#D6B45F]/10 to-transparent" />
        <div className="absolute left-1/4 top-0 h-64 w-64 -translate-y-1/2 rounded-full bg-[#D6B45F]/3 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-0 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={isInView ? false : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-4"
          >
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/brand/ractysh-logo.png"
                alt={companyBrand.shortName}
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
              <span className="font-display text-xl font-bold tracking-tight text-white">
                {companyBrand.legalName}
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-[#D6B45F]/70">
              Architecture &bull; Construction &bull; Real Estate &bull; Import & Export &bull; OTC Exchange
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/35">
              Building integrated enterprise solutions across multiple industries with a commitment
              to excellence, innovation, and long-term value creation.
            </p>
          </motion.div>

          <motion.div
            initial={isInView ? false : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-2"
          >
            <h4 className="mb-5 text-[11px] font-bold tracking-[0.18em] text-[#D6B45F] uppercase">
              Enterprise Divisions
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 lg:block lg:space-y-3">
              {ecosystemLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/45 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={isInView ? false : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-2"
          >
            <h4 className="mb-5 text-[11px] font-bold tracking-[0.18em] text-[#D6B45F] uppercase">
              Company
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 lg:block lg:space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/45 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={isInView ? false : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-4"
          >
            <h4 className="mb-5 text-[11px] font-bold tracking-[0.18em] text-[#D6B45F] uppercase">
              Corporate Information
            </h4>
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "ractyshgroup@gmail.com", href: "mailto:ractyshgroup@gmail.com" },
                { icon: Phone, label: "Phone", value: "+91 9080844114", href: "tel:+919080844114" },
                { icon: MapPin, label: "Locations", value: "Coimbatore \u2022 Palani \u2022 Dindigul", href: "/book-consultation" }
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3.5 transition-all duration-300 hover:border-[#D6B45F]/20 hover:bg-white/[0.04]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D6B45F]/10">
                    <item.icon className="h-3.5 w-3.5 text-[#D6B45F]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium tracking-wider text-white/30 uppercase">
                      {item.label}
                    </span>
                    <span className="text-sm text-white/60 transition-colors duration-300 group-hover:text-white/80">
                      {item.value}
                    </span>
                  </div>
                  <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-white/20 transition-all duration-300 group-hover:text-[#D6B45F]" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={isInView ? false : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-16 border-t border-white/5 pt-6 pb-8 sm:mt-20 sm:pt-8 sm:pb-10"
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="text-xs text-white/30">
                &copy; 2025 {companyBrand.shortName}
              </p>
              <p className="mt-1 text-[11px] text-white/15">
                {companyBrand.legalName}&trade; is a registered enterprise entity.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
              {legalLinks.map((link, i) => (
                <span key={link.label} className="inline-flex items-center gap-x-5">
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/45 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                  {i < legalLinks.length - 1 && (
                    <span className="h-3 w-px bg-white/10" />
                  )}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
