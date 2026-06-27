"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  BadgeCheck,
  Calendar,
  DraftingCompass,
  Eye,
  Globe2,
  HardHat,
  HeartHandshake,
  Landmark,
  Quote,
  ShieldCheck,
  Target,
  TrendingUp
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import founderPortrait from "@/assets/founder-portrait.png";
import { BrandLogo } from "@/components/BrandLogo";
import { CompanyContactPanel } from "@/components/CompanyContactPanel";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { FounderProfile } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

const motionEase = [0.22, 1, 0.36, 1] as const;

interface FounderEnterprisePageProps {
  founder: FounderProfile;
}

export function FounderEnterprisePage({ founder }: FounderEnterprisePageProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const founderName = "Ar.P.M.S.Noorul\nFawaaz, B.Arch., A.I.I.A.";
  const founderRole = "FOUNDER & CHAIRMAN";
  const founderTitle = "Visionary Founder of RACTYSH Group Of Companies";
  const founderDescription =
    "Leading the Ractysh ecosystem across Architecture, Construction, Real Estate, Import-Export and OTC Exchange — built on long-term vision, institutional discipline and enterprise-grade execution.";
  const portraitAlt =
    founder.name && founder.name.toLowerCase() !== "ractysh founder" ? founder.name : "Ar.P.M.S.Noorul Fawaaz, B.Arch., A.I.I.A.";

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-founder-counter]").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") || "0", 10);
        const suffix = el.getAttribute("data-suffix") || "";
        gsap.fromTo(
          el,
          { textContent: "0" },
          {
            textContent: target,
            duration: 2.2,
            ease: "power3.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: el.closest("[data-founder-impact]"),
              start: "top 78%"
            },
            onUpdate() {
              el.textContent = Math.round(parseFloat(el.textContent || "0")).toString() + suffix;
            }
          }
        );
      });
    }, root);

    return () => context.revert();
  }, []);

  const timelineItems = founder.timeline?.length
    ? founder.timeline
    : [
        { year: "2023", title: "Enterprise Foundation", description: "Defined the Ractysh group structure and premium multi-division operating model." },
        { year: "2024", title: "Design & Construction Expansion", description: "Expanded capabilities into architecture, interiors, construction and turnkey project coordination." },
        { year: "2025", title: "Export-Import & Real Estate", description: "Formalized international business support and property positioning for premium clients." },
        { year: "2026", title: "Five-Pillar Enterprise Platform", description: "Unified public brand, consultation desk and web presence across all divisions." }
      ];

  const achievements = founder.achievements?.length
    ? founder.achievements
    : [
        "Multi-division enterprise ecosystem across 5 operating pillars",
        "Premium service capabilities spanning Architecture, Construction, Real Estate, Trade & Exchange",
        "Institutional-grade operating model built on privacy, documentation & accountability",
        "Unified brand direction for technical, architectural and global commercial services"
      ];

  const galleryImages = founder.gallery?.length
    ? founder.gallery
    : [
        "/images/photo-1486406146926-c627a92ad1ab.webp",
        "/images/photo-1497366754035-f200968a6e72.webp",
        "/images/photo-1503387762-592deb58ef4e.webp",
        "/images/photo-1497366412874-3415097a27e7.webp",
        "/images/photo-1600585154340-be6161a56a0c.webp",
        "/images/photo-1518005020951-eccb494ad742.webp"
      ];

  return (
    <div ref={rootRef} className="relative isolate overflow-hidden bg-[#f8f1e4] text-[#1c120e]">
      <FounderBackground />

      {/* ═══════════════ 1. EXECUTIVE HERO ═══════════════ */}
      <section id="hero" className="relative z-10 overflow-hidden bg-[#f8f1e4]">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10 lg:px-14 xl:px-16">
          {/* Mobile */}
          <div className="flex flex-col items-center pt-20 md:hidden">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: motionEase }}
              className="relative mb-8 h-[22rem] w-full max-w-[18rem] overflow-hidden rounded-[6px] bg-[#f0ebe0] shadow-[0_20px_60px_rgba(82,52,25,0.08)]"
            >
              <Image
                src={founderPortrait}
                alt={portraitAlt}
                fill
                priority
                placeholder="blur"
                quality={90}
                sizes="18rem"
                className="object-cover object-[52%_50%]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: motionEase }}
              className="w-full text-center"
            >
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#8b1118]">
                {founderRole}
              </p>
              <h1 className="mt-4 font-display text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.02em] text-[#20130f]">
                {founderName.split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 ? <br /> : null}</span>
                ))}
              </h1>
              <p className="mx-auto mt-4 max-w-[22rem] text-[15px] font-medium leading-[1.5] text-[#675a4f]">
                {founderTitle}
              </p>
              <p className="mx-auto mt-4 max-w-[24rem] text-[14px] leading-[1.7] text-[#7d7062]">
                {founderDescription}
              </p>
              <Link
                href="#timeline"
                className="group mt-6 inline-flex min-h-[2.8rem] items-center justify-center gap-2 rounded-[6px] border border-[#8b1118]/30 bg-[#8b1118] px-5 text-[0.85rem] font-semibold leading-none text-white shadow-[0_12px_30px_rgba(139,17,24,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7a0e14]"
              >
                Chairman&apos;s Message
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>

          {/* Tablet */}
          <div className="hidden md:flex md:flex-col md:items-center md:pt-28 lg:hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: motionEase }}
              className="mb-10 h-[28rem] w-full max-w-[22rem] overflow-hidden rounded-[6px] bg-[#f0ebe0] shadow-[0_24px_70px_rgba(82,52,25,0.08)]"
            >
              <Image
                src={founderPortrait}
                alt={portraitAlt}
                fill
                priority
                placeholder="blur"
                quality={90}
                sizes="22rem"
                className="object-cover object-[52%_50%]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: motionEase }}
              className="w-full max-w-[34rem] text-center"
            >
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#8b1118]">
                {founderRole}
              </p>
              <h1 className="mt-4 font-display text-[3rem] font-semibold leading-[1.02] tracking-[-0.02em] text-[#20130f]">
                {founderName.split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 ? <br /> : null}</span>
                ))}
              </h1>
              <p className="mx-auto mt-4 max-w-[28rem] text-[16px] font-medium leading-[1.5] text-[#675a4f]">
                {founderTitle}
              </p>
              <p className="mx-auto mt-5 max-w-[30rem] text-[15px] leading-[1.7] text-[#7d7062]">
                {founderDescription}
              </p>
              <Link
                href="#timeline"
                className="group mt-7 inline-flex min-h-[2.8rem] items-center justify-center gap-2 rounded-[6px] border border-[#8b1118]/30 bg-[#8b1118] px-5 text-[0.85rem] font-semibold leading-none text-white shadow-[0_12px_30px_rgba(139,17,24,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7a0e14]"
              >
                Chairman&apos;s Message
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>

          {/* Desktop */}
          <div className="hidden min-h-[90svh] lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 xl:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: motionEase }}
            >
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-[#8b1118]">
                {founderRole}
              </p>
              <h1 className="mt-6 font-display text-[4.2rem] font-semibold leading-[0.95] tracking-[-0.03em] text-[#20130f] xl:text-[5rem]">
                {founderName.split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 ? <br /> : null}</span>
                ))}
              </h1>
              <p className="mt-5 max-w-[28rem] text-[1.1rem] font-medium leading-[1.4] text-[#675a4f]">
                {founderTitle}
              </p>
              <p className="mt-5 max-w-[30rem] text-[15px] leading-[1.8] text-[#7d7062]">
                {founderDescription}
              </p>
              <Link
                href="#timeline"
                className="group mt-8 inline-flex min-h-[2.8rem] items-center justify-center gap-2 rounded-[6px] border border-[#8b1118]/30 bg-[#8b1118] px-5 text-[0.85rem] font-semibold leading-none text-white shadow-[0_12px_30px_rgba(139,17,24,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7a0e14]"
              >
                Chairman&apos;s Message
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <div className="mt-12 flex items-center gap-3">
                <span className="h-px w-10 bg-[#d9bd7a]/60" />
                <BrandLogo size="sm" decorative />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: motionEase }}
              className="flex justify-end"
            >
              <div className="relative h-[min(82svh,48rem)] min-h-[36rem] w-full max-w-[32rem] overflow-hidden rounded-[6px] bg-[#f0ebe0] shadow-[0_32px_100px_rgba(82,52,25,0.1)] xl:max-w-[34rem]">
                <Image
                  src={founderPortrait}
                  alt={portraitAlt}
                  fill
                  priority
                  placeholder="blur"
                  quality={92}
                  sizes="(min-width: 1280px) 34rem, 32rem"
                  className="object-cover object-[52%_50%]"
                />
                <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/[0.04]" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TRUST METRICS ═══════════════ */}
      <section className="relative z-10 border-t border-[#d9c28c]/20 bg-[#f5ede0]">
        <div className="mx-auto max-w-[82rem] px-5 md:px-8">
          <div className="grid grid-cols-2 gap-px bg-[#d9c28c]/20 md:grid-cols-4">
            {[
              { value: "100+", label: "Projects" },
              { value: "50+", label: "Clients" },
              { value: "5", label: "Divisions" },
              { value: "5+", label: "Years" }
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center bg-[#f5ede0] py-8 text-center md:py-10"
              >
                <span className="font-display text-[1.8rem] font-bold leading-none tracking-[-0.02em] text-[#20130f] md:text-[2.2rem]">
                  {value}
                </span>
                <span className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-[#8b1118]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 2. FOUNDER'S STATEMENT (full-bleed dark) ═══════════════ */}
      <section className="relative z-10 overflow-hidden bg-[#0a0806] py-20 md:py-28 lg:py-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_24%_46%,rgba(214,180,95,0.06),transparent_44rem),radial-gradient(ellipse_at_76%_54%,rgba(139,17,24,0.08),transparent_40rem),linear-gradient(180deg,#0a0806_0%,#100b09_50%,#0a0806_100%)]" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,rgba(240,219,177,0.18)_1px,transparent_0)] [background-size:14px_14px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9bd7a]/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d9bd7a]/30 to-transparent" />
        </div>

        <ScrollReveal>
          <div className="relative z-10 mx-auto max-w-[80rem] px-5 text-center md:px-8">
            <Quote className="mx-auto h-12 w-12 text-[#d9bd7a]/30" strokeWidth={1.1} />
            <div className="mx-auto mt-8 max-w-[60rem]">
              <p className="font-display text-[1.35rem] font-medium leading-[1.35] tracking-[-0.01em] text-[#f5ebd6] md:text-[1.85rem] lg:text-[2.2rem]">
                &ldquo;{founder.vision}&rdquo;
              </p>
            </div>
            <div className="mx-auto mt-10 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-[#d9bd7a]/40" />
              <span className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#d9bd7a]/70">
                {founderName}
              </span>
              <span className="h-px w-12 bg-[#d9bd7a]/40" />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════════ 3. THE ORIGIN (editorial biography) ═══════════════ */}
      <section className="relative z-10 px-5 py-16 md:px-8 lg:py-24">
        <div className="mx-auto max-w-[82rem]">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <ScrollReveal className="relative">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.25em] text-[#8b1118]">
                The Origin
              </p>
              <h2 className="mt-4 font-display text-[1.6rem] font-semibold leading-[1.08] tracking-[-0.035em] text-[#20130f] md:text-[2rem] lg:text-[2.4rem]">
                Architecture, enterprise discipline and the founding of Ractysh.
              </h2>
              <div className="mt-6 space-y-5 text-[15px] leading-[1.8] text-[#675a4f] md:text-[16px]">
                <p>{founder.shortArticle || founder.biography}</p>
                <p className="text-[14px] font-medium italic text-[#8b1118]/80">
                  &mdash; A commitment to quality, accountability and long-term enterprise thinking.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="relative overflow-hidden rounded-[1.25rem] border border-[#d9c28c]/50 bg-[#fffaf0] shadow-[0_28px_80px_rgba(82,52,25,0.1)]">
                <div className="aspect-[4/5]">
                  <Image
                    src={founderPortrait}
                    alt={portraitAlt}
                    fill
                    placeholder="blur"
                    quality={85}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-[52%_50%]"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#120c08]/80 via-[#120c08]/30 to-transparent p-6 pt-16">
                  <p className="font-display text-[1.1rem] font-semibold text-[#f5ebd6]">{founderName}</p>
                  <p className="mt-1 text-[13px] font-medium text-[#d9bd7a]/80">{founderRole}</p>
                </div>
                <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/5" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ 4. THE JOURNEY (timeline) ═══════════════ */}
      <section id="timeline" className="relative z-10 px-5 py-16 md:px-8 lg:py-24">
        <div className="mx-auto max-w-[82rem]">
          <ScrollReveal className="mb-12 text-center lg:mb-16">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.25em] text-[#8b1118]">
              The Journey
            </p>
            <h2 className="mt-3 font-display text-[1.6rem] font-semibold leading-[1.08] tracking-[-0.035em] text-[#20130f] md:text-[2rem] lg:text-[2.4rem]">
              Building the enterprise, one pillar at a time.
            </h2>
          </ScrollReveal>

          <div className="relative mx-auto max-w-[56rem]">
            <div className="absolute bottom-0 left-[1.85rem] top-0 w-px bg-[#d6b45f]/20 lg:left-1/2 lg:-ml-px" />
            <div className="absolute bottom-0 left-[1.85rem] top-0 w-px bg-gradient-to-b from-[#d6b45f] via-[#8b1118] to-[#d6b45f] shadow-[0_0_24px_rgba(214,180,95,0.3)] lg:left-1/2 lg:-ml-px" />

            <div className="space-y-8 lg:space-y-12">
              {timelineItems.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <ScrollReveal
                    key={item.year + item.title}
                    delay={index * 0.07}
                    className="relative pl-14 lg:pl-0"
                  >
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-8">
                      <div className={`${isLeft ? "lg:pr-12 lg:text-right" : "lg:col-start-2 lg:pl-12"}`}>
                        <div className="absolute left-0 top-1 z-10 grid h-9 w-9 place-items-center rounded-full border border-[#d6b45f]/70 bg-[#160b0d] text-[#d6b45f] shadow-[0_0_20px_rgba(214,180,95,0.18)] lg:absolute lg:left-1/2 lg:-ml-[18px]">
                          <Calendar className="h-4 w-4" strokeWidth={1.8} />
                        </div>
                        <p className="font-display text-[2.6rem] font-bold leading-none text-[#8b1118]/90 lg:text-[3.2rem]">
                          {item.year}
                        </p>
                      </div>
                      <div className={`mt-2 lg:mt-0 ${isLeft ? "lg:col-start-2 lg:pl-12" : "lg:pr-12 lg:text-right"}`}>
                        <div className="rounded-[1.25rem] border border-[#dec999]/60 bg-[#fffaf0]/70 p-6 shadow-[0_18px_50px_rgba(83,50,22,0.06)] backdrop-blur-sm">
                          <h3 className="font-display text-[1.15rem] font-semibold leading-tight text-[#20130f]">{item.title}</h3>
                          <p className="mt-2 text-[14px] leading-[1.7] text-[#675a4f]">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. ENTERPRISE BLUEPRINT (vision + mission split) ═══════════════ */}
      <section className="relative z-10 px-5 pb-16 pt-8 md:px-8 lg:pb-24 lg:pt-12">
        <div className="mx-auto max-w-[82rem]">
          <ScrollReveal className="mb-8 text-center lg:mb-12">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.25em] text-[#8b1118]">
              The Enterprise Blueprint
            </p>
            <h2 className="mt-3 font-display text-[1.6rem] font-semibold leading-[1.08] tracking-[-0.035em] text-[#20130f] md:text-[2rem] lg:text-[2.4rem]">
              Vision, mission and the five-pillar framework.
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <ScrollReveal className="overflow-hidden rounded-[1.5rem] bg-[#160b0d] p-7 text-[#f5ebd6] shadow-[0_28px_80px_rgba(31,12,10,0.18)] md:p-9">
              <div className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-[#d6b45f]/40 bg-[#fff7e8]/10 text-[#d9bd7a]">
                <Eye className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <p className="mt-5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#d9bd7a]/60">Vision</p>
              <h3 className="mt-2 font-display text-[1.3rem] font-semibold leading-[1.08] text-[#f5ebd6] md:text-[1.5rem]">
                The Enterprise Horizon
              </h3>
              <p className="mt-4 text-[15px] leading-[1.8] text-[#cbbaa0] md:text-[16px]">
                {founder.vision}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <BrandLogo size="sm" decorative />
                <span className="h-px flex-1 bg-gradient-to-r from-[#d9bd7a]/40 to-transparent" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08} className="rounded-[1.5rem] border border-[#d8bd79]/50 bg-[#fffaf0]/70 p-7 shadow-[0_26px_80px_rgba(82,49,20,0.08)] backdrop-blur-sm md:p-9">
              <div className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-[#d6b45f]/40 bg-[#fff7e8] text-[#8b1118]">
                <TrendingUp className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <p className="mt-5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#a27b2d]">Mission</p>
              <h3 className="mt-2 font-display text-[1.3rem] font-semibold leading-[1.08] text-[#20130f] md:text-[1.5rem]">
                The Operating Mandate
              </h3>
              <p className="mt-4 text-[15px] leading-[1.8] text-[#675a4f] md:text-[16px]">
                {founder.mission}
              </p>
              <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {[
                  { label: "Architecture", Icon: DraftingCompass },
                  { label: "Construction", Icon: HardHat },
                  { label: "Real Estate", Icon: Landmark },
                  { label: "Global Trade", Icon: Globe2 },
                  { label: "OTC Exchange", Icon: ShieldCheck }
                ].map(({ label, Icon }) => (
                  <div key={label} className="flex items-center gap-2.5 rounded-lg border border-[#d9c28c]/35 bg-white/50 px-3.5 py-2.5">
                    <Icon className="h-4 w-4 shrink-0 text-[#8b1118]" strokeWidth={1.8} />
                    <span className="text-[13px] font-medium text-[#4a3f35]">{label}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ 6. IMPACT & SCALE (dark, animated counters) ═══════════════ */}
      <section data-founder-impact className="relative z-10 overflow-hidden bg-[#0a0806] py-16 md:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(214,180,95,0.05),transparent_44rem),linear-gradient(180deg,#0a0806_0%,#100b09_50%,#0a0806_100%)]" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:64px_64px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9bd7a]/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d9bd7a]/25 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-[82rem] px-5 md:px-8">
          <ScrollReveal className="text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.25em] text-[#d9bd7a]/70">
              Impact & Scale
            </p>
            <h2 className="mt-3 font-display text-[1.6rem] font-semibold leading-[1.08] text-[#f5ebd6] md:text-[2rem] lg:text-[2.4rem]">
              Enterprise achievements across five divisions.
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement, idx) => (
              <ScrollReveal key={achievement} delay={idx * 0.06}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3, ease: motionEase }}
                  className="rounded-[1.15rem] border border-[#d9bd7a]/20 bg-white/[0.04] p-6 text-center backdrop-blur-sm"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#d9bd7a]/25 bg-[#d9bd7a]/8 text-[#d9bd7a]">
                    <BadgeCheck className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <p className="mt-5 text-[14px] leading-[1.6] text-[#cbbaa0]">{achievement}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 7. PRINCIPLES ═══════════════ */}
      <section className="relative z-10 px-5 py-16 md:px-8 lg:py-24">
        <div className="mx-auto max-w-[82rem]">
          <ScrollReveal className="mb-10 text-center lg:mb-14">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.25em] text-[#8b1118]">
              Core Principles
            </p>
            <h2 className="mt-3 font-display text-[1.6rem] font-semibold leading-[1.08] tracking-[-0.035em] text-[#20130f] md:text-[2rem] lg:text-[2.4rem]">
              The values that guide every decision.
            </h2>
          </ScrollReveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Disciplined Execution", description: "Every commitment follows a documented process with clear accountability from concept through delivery.", Icon: Target },
              { title: "Institutional Trust", description: "Premium clients require discretion, consistency and visible ownership across every engagement.", Icon: ShieldCheck },
              { title: "Long-Term Vision", description: "Decisions are measured against multi-decade horizons, building foundations that outlast quarterly cycles.", Icon: Eye },
              { title: "Enterprise Integrity", description: "Ethical operations and transparent governance form the bedrock of every business relationship.", Icon: HeartHandshake }
            ].map(({ title, description, Icon }, index) => (
              <ScrollReveal key={title} delay={index * 0.06}>
                <motion.article
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.34, ease: motionEase }}
                  className="group relative overflow-hidden rounded-[1.35rem] border border-[#d9c28c]/50 bg-white/50 p-6 shadow-[0_18px_60px_rgba(82,52,25,0.06)] backdrop-blur-sm md:p-7"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6b45f]/80 to-transparent opacity-60" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-[0.85rem] border border-[#d6b45f]/40 bg-[#fffaf0] text-[#8b1118] shadow-[0_10px_24px_rgba(139,17,24,0.06)]">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-6 font-display text-[1.1rem] font-semibold leading-tight text-[#20130f]">{title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#675a4f]">{description}</p>
                </motion.article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 8. VISUAL ARCHIVE (gallery) ═══════════════ */}
      <section className="relative z-10 px-5 pb-8 md:px-8 lg:pb-12">
        <div className="mx-auto max-w-[82rem]">
          <ScrollReveal className="mb-8 text-center lg:mb-12">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.25em] text-[#8b1118]">
              Visual Archive
            </p>
            <h2 className="mt-3 font-display text-[1.6rem] font-semibold leading-[1.08] tracking-[-0.035em] text-[#20130f] md:text-[2rem] lg:text-[2.4rem]">
              The operational landscape.
            </h2>
            <p className="mx-auto mt-3 max-w-[32rem] text-[15px] text-[#675a4f] md:text-[16px]">
              Imagery representing the environments in which the Ractysh ecosystem operates.
            </p>
          </ScrollReveal>

          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {galleryImages.map((src, index) => (
              <ScrollReveal key={src} delay={index * 0.04} className="mb-4 break-inside-avoid">
                <div className="group relative overflow-hidden rounded-[1.15rem] border border-[#d9c28c]/35 bg-[#fffaf0] shadow-[0_16px_48px_rgba(82,52,25,0.06)]">
                  <div className={index === 0 ? "aspect-[4/5]" : index === 1 ? "aspect-[4/3]" : index === 2 ? "aspect-[3/4]" : index === 3 ? "aspect-[16/10]" : "aspect-[4/5]"}>
                    <Image
                      src={src.startsWith("/") ? src : `/images/${src}`}
                      alt={`Gallery ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/5" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 9. EXECUTIVE ACCESS CTA ═══════════════ */}
      <section className="relative z-10 px-5 pb-16 md:px-8 lg:pb-24">
        <ScrollReveal>
          <div className="mx-auto max-w-[82rem] overflow-hidden rounded-[1.5rem] border border-[#d8bd79]/55 bg-[#fffaf0]/80 p-6 shadow-[0_24px_70px_rgba(82,49,20,0.08)] backdrop-blur-sm md:flex md:items-center md:justify-between md:p-10">
            <div>
              <div className="flex items-center gap-3">
                <BadgeCheck className="h-5 w-5 text-[#8b1118]" strokeWidth={1.9} />
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#a27b2d]">
                  Executive Access
                </p>
              </div>
              <h2 className="mt-4 font-display text-[1.3rem] font-semibold leading-[1.08] tracking-[-0.035em] text-[#20130f] md:text-[1.6rem] lg:text-[1.8rem]">
                Connect With Leadership
              </h2>
              <p className="mt-3 max-w-[36rem] text-[15px] leading-[1.7] text-[#675a4f] md:text-[16px]">
                Route strategic inquiries through a structured consultation desk for private enterprise conversations.
              </p>
              <CompanyContactPanel mode="consultation" tone="transparent" compact className="mt-5 max-w-3xl" />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
              <Link
                href="/book-consultation"
                className="premium-cta group"
              >
                Book Consultation
                <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

/* ─── Shared sub-components ─── */

function FounderBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_4%,rgba(255,255,255,0.94),transparent_34rem),radial-gradient(circle_at_14%_18%,rgba(214,180,95,0.18),transparent_34rem),radial-gradient(circle_at_86%_48%,rgba(139,17,24,0.1),transparent_33rem),linear-gradient(180deg,#fbf3e6_0%,#f7efe1_44%,#f9f2e7_100%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle_at_1px_1px,rgba(55,39,22,0.32)_1px,transparent_0)] [background-size:11px_11px]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(0deg,rgba(67,43,25,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(67,43,25,0.42)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#fff8eb]/68 to-transparent" />
    </div>
  );
}
