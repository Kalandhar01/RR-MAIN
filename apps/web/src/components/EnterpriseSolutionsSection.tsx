"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";

const ease = [0.22, 1, 0.36, 1] as const;

export function EnterpriseSolutionsSection() {
  return (
    <section
      id="enterprise-solutions"
      aria-label="One ecosystem endless possibilities"
      className="minimal-luxury-ecosystem relative isolate overflow-hidden px-6 py-24 text-[#181411] sm:px-8 sm:py-32 lg:min-h-screen lg:px-12 lg:py-0"
    >
      <LuxuryBackdrop />

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-stretch gap-16 lg:min-h-screen lg:grid-cols-[1fr_0.85fr] lg:gap-16 xl:gap-24">
        <motion.div
          className="flex flex-col justify-center lg:pl-[2vw]"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#a37a37]" />
            <ScrollReveal>
              <p className="font-manrope text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#9b7334]">
                ONE ECOSYSTEM
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <h2 className="mle-heading mt-8 max-w-[46rem] font-display text-[clamp(3rem,6.4vw,5.65rem)] font-bold leading-[0.92] tracking-[-0.04em] text-[#17120f] [text-wrap:balance]">
              <span className="block">One Ecosystem.</span>
              <span className="block">Endless Possibilities.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <p className="mt-8 max-w-[30rem] font-sans text-[clamp(1rem,1.12vw,1.1rem)] font-medium leading-[1.9] tracking-[0] text-[#51463c]">
              Architecture, Construction, Real Estate, Export-Import and OTC Exchange working through one premium
              operational system.
            </p>
          </ScrollReveal>

          <div className="mt-11 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="mle-button inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] px-6 font-manrope text-[0.9rem] font-semibold"
            >
              Services
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </Link>
            <Link
              href="/about"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-[#d6b45f]/30 bg-white/60 px-6 font-manrope text-[0.9rem] font-semibold text-[#181411] shadow-[0_14px_34px_rgba(98,78,34,0.06)] transition-all duration-300 hover:border-[#d6b45f]/60 hover:bg-white/90 hover:shadow-[0_18px_44px_rgba(98,78,34,0.1)]"
            >
              About Us
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="relative flex min-h-[24rem] w-full items-center justify-center lg:min-h-full"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 1, ease, delay: 0.14 }}
        >
          <EcosystemImage />
        </motion.div>
      </div>
    </section>
  );
}

function LuxuryBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="mle-ambient absolute inset-[-12%]" />
      <div className="mle-paper absolute inset-0" />
      <div className="mle-blueprint absolute inset-0" />
      <svg className="mle-background-lines absolute inset-0 h-full w-full" viewBox="0 0 1440 920" preserveAspectRatio="none">
        <path d="M930 120 H1246 V356 H1032 V222 H930 Z" />
        <path d="M994 120 V356 M1088 120 V356 M1184 120 V356 M930 222 H1246 M930 292 H1246" />
        <path d="M168 724 C366 664 560 670 752 734 C914 788 1090 784 1288 714" />
      </svg>
    </div>
  );
}

function EcosystemImage() {
  return (
    <div className="relative mx-auto h-[20rem] w-full max-w-[32rem] overflow-hidden rounded-[14px] shadow-[0_34px_100px_rgba(24,20,17,0.18),0_0_50px_rgba(214,180,95,0.08)] lg:h-[24rem]">
      <Image
        src="/images/photo-1559136555-9303baea8ebd.webp"
        alt="Five-pillar enterprise ecosystem"
        fill
        sizes="(min-width: 1024px) 38vw, 90vw"
        priority
        className="object-cover object-[50%_30%]"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(24,20,17,0.3)] via-transparent to-[rgba(214,180,95,0.06)]" />
      <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(214,180,95,0.5)] to-transparent" />

      <div className="absolute bottom-3 left-3 right-3 z-10 grid grid-cols-5 gap-1 rounded-[10px] border border-[rgba(255,255,255,0.12)] bg-[rgba(24,20,17,0.65)] px-2.5 py-2.5 shadow-[0_14px_38px_rgba(0,0,0,0.18)] backdrop-blur-md">
        {[
          { label: "ARC", icon: "M3 21V9l9-6 9 6v12H3Z" },
          { label: "CON", icon: "M2 22V8l10-6 10 6v14H2Z" },
          { label: "REA", icon: "M3 21h18M3 7V3h18v4M5 21V11h4v10M15 21V11h4v10" },
          { label: "TRD", icon: "M12 2v20M2 12h20M5 5l3 3M5 19l3-3M19 5l-3 3M19 19l-3-3" },
          { label: "OTC", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
        ].map((pillar) => (
          <div key={pillar.label} className="flex flex-col items-center gap-1 text-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(214,180,95,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={pillar.icon} />
            </svg>
            <span className="text-[0.48rem] font-semibold leading-tight tracking-[0.06em] text-white/70">{pillar.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
