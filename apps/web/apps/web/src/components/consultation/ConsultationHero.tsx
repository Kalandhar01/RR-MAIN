"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  ChevronDown,
  Gem,
  ShieldCheck,
  TrendingUp,
  Users,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { CompanyContactPanel } from "@/components/CompanyContactPanel";
import { FloatingConsultationCard } from "@/components/consultation/FloatingConsultationCard";

const ease = [0.22, 1, 0.36, 1] as const;

const trustItems = [
  "Five-pillar intake",
  "Export-import advisory",
  "OTC exchange routing",
];

const stats = [
  { value: "50+", label: "Projects Delivered", icon: TrendingUp },
  { value: "200+", label: "Enterprise Clients", icon: Users },
  { value: "5", label: "Industry Verticals", icon: Building2 },
];

export function ConsultationHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={sectionRef}
      id="consultation-hero"
      className="relative isolate min-h-[92svh] overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pt-32 lg:min-h-[96svh]"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-30 bg-[#f8f6ef]" />

      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-50"
      >
        <div
          className="h-full w-full"
          style={{ backgroundImage: "url('/HeaderBG.webp')" }}
        />
      </motion.div>

      {/* Gold gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#fffdf8]/95 via-[#f8f6ef]/88 to-[#f0e8d8]/80" />

      {/* Decorative glows */}
      <div className="absolute left-1/2 top-[-8rem] -z-10 h-[50rem] w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,164,91,0.12),transparent_70%)] blur-3xl" />
      <div className="absolute right-[-16rem] top-20 -z-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(198,164,91,0.08),transparent_65%)] blur-3xl" />
      <div className="absolute left-[-10rem] bottom-20 -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(23,36,58,0.04),transparent_65%)] blur-3xl" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle,rgba(198,164,91,0.5) 1px,transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top gold line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c6a45b]/30 to-transparent" />

      <div className="mx-auto grid min-h-[calc(92svh-10rem)] max-w-[92rem] items-center gap-12 py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(26rem,0.95fr)] lg:gap-16 lg:py-12">
        {/* Left content */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-[#c6a45b]/30 bg-white/60 px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[#9a7428] shadow-[0_12px_32px_rgba(198,164,91,0.12)] backdrop-blur-xl"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#17243a]">
              <Gem className="h-3 w-3 text-[#f5df9a]" strokeWidth={2} />
            </span>
            Premium Consultation
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease }}
            className="mt-8 max-w-4xl font-display text-[2.4rem] font-semibold leading-[1.0] tracking-[-0.03em] text-[#17243a] md:text-[3.2rem] lg:text-[4rem]"
          >
            Let&apos;s Build Your Next{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Enterprise</span>
              <span className="absolute bottom-1 left-0 -z-0 h-3 w-full bg-[#c6a45b]/20 md:bottom-2 md:h-4" />
            </span>{" "}
            Ecosystem Together
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-6 max-w-2xl text-[15px] leading-[1.8] text-[#5e5b54]/80 md:text-[17px]"
          >
            From Architecture and Construction to Real Estate, Export-Import and
            OTC Exchange coordination — Ractysh delivers premium business
            ecosystems tailored for modern enterprises.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild>
              <Link href="#consultation-form">
                Book Consultation
                <CalendarClock className="h-5 w-5" strokeWidth={1.8} />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/#enterprise-solutions">
                Explore Services
                <ArrowRight className="h-5 w-5" strokeWidth={1.8} />
              </Link>
            </Button>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="mt-8 flex flex-wrap gap-2.5"
          >
            {trustItems.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.08, ease }}
                className="flex items-center gap-2 rounded-full border border-[#c6a45b]/20 bg-white/50 px-4 py-2 text-[13px] font-medium text-[#555248]/80 backdrop-blur-xl"
              >
                <ShieldCheck
                  className="h-3.5 w-3.5 shrink-0 text-[#c6a45b]"
                  strokeWidth={2}
                />
                {item}
              </motion.div>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="mt-8 grid max-w-lg grid-cols-3 gap-3"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.55 + i * 0.1,
                    ease,
                  }}
                  className="group rounded-2xl border border-[#c6a45b]/15 bg-white/40 p-3.5 text-center backdrop-blur-xl transition-all duration-300 hover:border-[#c6a45b]/35 hover:bg-white/60"
                >
                  <Icon className="mx-auto h-4 w-4 text-[#c6a45b]/60 transition-colors group-hover:text-[#c6a45b]" strokeWidth={1.8} />
                  <p className="mt-2 font-display text-[1.3rem] font-bold leading-none text-[#17243a]">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-[#8a7a62]">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact panel */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease }}
            className="mt-7 max-w-3xl"
          >
            <CompanyContactPanel
              mode="consultation"
              tone="transparent"
            />
          </motion.div>
        </div>

        {/* Right side - floating card */}
        <FloatingConsultationCard />
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#consultation-form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-[#c6a45b]/25 bg-white/50 px-5 py-2.5 text-[13px] font-medium text-[#8a7a62] backdrop-blur-xl transition-all duration-300 hover:border-[#c6a45b]/50 hover:bg-white/70 hover:text-[#17243a] md:inline-flex"
      >
        Begin private intake
        <motion.span
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" strokeWidth={1.8} />
        </motion.span>
      </motion.a>
    </section>
  );
}
