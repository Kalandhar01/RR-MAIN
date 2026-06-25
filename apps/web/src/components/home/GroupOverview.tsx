"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePathname } from "next/navigation";
import { Building2, Globe2, HardHat, Home, Landmark } from "lucide-react";
import { CountUp } from "./CountUp";
import { getCompanyBrand } from "@/lib/branding";

const divisions = [
  {
    name: "Architecture",
    tagline: "Premium Design & Planning",
    icon: Building2
  },
  {
    name: "Construction",
    tagline: "End-to-End Project Delivery",
    icon: HardHat
  },
  {
    name: "Real Estate",
    tagline: "High-Value Property Development",
    icon: Home
  },
  {
    name: "Import & Export",
    tagline: "Global Trade Operations",
    icon: Globe2
  },
  {
    name: "OTC Exchange",
    tagline: "Secure Financial Transactions",
    icon: Landmark
  }
];

const stats = [
  { label: "Business Divisions", value: 5, suffix: "" },
  { label: "Years of Experience", value: 5, suffix: "+" },
  { label: "Projects Delivered", value: 100, suffix: "+" },
  { label: "Global Partners", value: 10, suffix: "+" }
];

function SectionHeader({ isInView }: { isInView: boolean }) {
  const pathname = usePathname();
  const brand = getCompanyBrand(pathname);
  return (
    <div className="mb-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="block h-px w-8 bg-[#D6B45F]/40" />
          <span className="text-[11px] font-bold tracking-[0.28em] text-[#D6B45F] uppercase">
            {brand.shortName}
          </span>
          <span className="block h-px w-8 bg-[#D6B45F]/40" />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="font-display text-4xl font-bold leading-[1.05] text-[#111] sm:text-5xl lg:text-6xl"
      >
        <span className="inline-block">Five Pillars.</span>{" "}
        <span className="inline-block bg-gradient-to-r from-[#D6B45F] to-[#C4A052] bg-clip-text text-transparent">
          One Vision.
        </span>
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto mt-6 h-[2px] w-16 origin-center bg-gradient-to-r from-transparent via-[#D6B45F] to-transparent"
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#666] sm:text-lg"
      >
        Operating across five distinct yet interconnected business divisions, Ractysh delivers
        enterprise-grade solutions with a single standard of excellence.
      </motion.p>
    </div>
  );
}

function DivisionCards({ isInView }: { isInView: boolean }) {
  return (
    <div className="mb-20 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {divisions.map((d, i) => (
        <motion.div
          key={d.name}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
          className="group relative cursor-default"
        >
          <div className="relative rounded-xl border border-[#e5e5e5] bg-white p-5 transition-all duration-500 sm:p-6 group-hover:-translate-y-1 group-hover:border-[#D6B45F]/40 group-hover:shadow-xl group-hover:shadow-[#D6B45F]/10">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#D6B45F]/0 to-[#D6B45F]/0 transition-all duration-500 group-hover:from-[#D6B45F]/3 group-hover:to-[#D6B45F]/8" />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F0E8] transition-all duration-500 group-hover:scale-105 group-hover:bg-[#D6B45F]/10 group-hover:shadow-lg group-hover:shadow-[#D6B45F]/20">
                <d.icon className="h-6 w-6 text-[#D6B45F] transition-all duration-500 group-hover:scale-110" />
              </div>

              <h3 className="mt-3 text-center text-sm font-bold text-[#222] transition-colors duration-500 group-hover:text-[#D6B45F]">
                {d.name}
              </h3>

              <p className="mt-1 text-center text-[11px] leading-snug text-[#999] transition-colors duration-500 group-hover:text-[#777]">
                {d.tagline}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function StatCards({ isInView }: { isInView: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="group relative cursor-default"
        >
          <div className="relative overflow-hidden rounded-xl border border-[#e5e5e5] bg-white/80 backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-[#D6B45F]/25 group-hover:shadow-lg group-hover:shadow-[#D6B45F]/10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D6B45F]/0 to-[#D6B45F]/0 transition-all duration-500 group-hover:from-[#D6B45F]/4 group-hover:to-[#D6B45F]/10" />

            <div className="relative px-5 py-7 sm:px-6 sm:py-8">
              <div className="flex flex-col items-center text-center">
                <span className="font-sans text-4xl font-bold tracking-tight text-[#D6B45F] sm:text-5xl">
                  <CountUp from={0} to={stat.value} started={isInView} />
                  {stat.suffix}
                </span>

                <div className="mx-auto mt-2 h-[2px] w-8 bg-[#D6B45F]/20 transition-all duration-500 group-hover:w-10 group-hover:bg-[#D6B45F]/50" />

                <span className="mt-3 text-xs font-semibold tracking-[0.12em] text-[#888] uppercase transition-colors duration-500 group-hover:text-[#666]">
                  {stat.label}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function GroupOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative bg-white py-24 sm:py-32 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#D6B45F]/20 to-transparent" />
        <div
          className="absolute right-0 top-1/4 h-72 w-72 -translate-y-1/2 blur-2xl"
          style={{ background: "radial-gradient(ellipse at center, rgba(214,180,95,0.04), transparent)" }}
        />
        <div
          className="absolute bottom-0 left-0 h-64 w-64 blur-2xl"
          style={{ background: "radial-gradient(ellipse at center, rgba(214,180,95,0.03), transparent)" }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #D6B45F 1px, transparent 0)",
          backgroundSize: "48px 48px"
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader isInView={isInView} />
        <DivisionCards isInView={isInView} />
        <StatCards isInView={isInView} />
      </div>
    </section>
  );
}
