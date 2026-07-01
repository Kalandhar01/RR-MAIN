"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, CalendarClock, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { CompanyContactPanel } from "@/components/CompanyContactPanel";
import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

export function ConsultationFinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden px-5 py-20 text-white md:px-8 md:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-[#0a0f1a]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0d1526] via-[#0a0f1a] to-[#080c16]" />

      {/* Gold glow */}
      <motion.div
        style={{ y: glowY }}
        className="absolute left-1/2 top-[-10rem] -z-10 h-[44rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,164,91,0.12),transparent_65%)] blur-3xl"
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle,rgba(198,164,91,0.4) 1px,transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top gold line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c6a45b]/50 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease }}
        className="mx-auto max-w-[76rem] text-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#c6a45b]/30 bg-white/[0.06] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#c6a45b] backdrop-blur-xl">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
          Private Enterprise Desk
        </div>

        {/* Headline */}
        <h2 className="mx-auto mt-6 max-w-4xl font-display text-[1.8rem] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[2.4rem] lg:text-[3rem]">
          Bring Ractysh into the room before the project becomes expensive to
          correct.
        </h2>

        {/* Subtext */}
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-[1.8] text-white/60 md:text-[17px]">
          Start with a premium demo built to clarify strategic fit, delivery
          model, commercial path and execution confidence.
        </p>

        {/* Contact panel */}
        <CompanyContactPanel
          mode="consultation"
          tone="dark"
          compact
          className="mx-auto mt-8 max-w-4xl"
        />

        {/* CTA buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="#consultation-form">
              Book a Demo
              <CalendarClock className="h-5 w-5" strokeWidth={1.8} />
            </Link>
          </Button>
          <Button asChild variant="outline" className="text-white">
            <Link href="/">
              Return to Ecosystem
              <ArrowUpRight className="h-5 w-5" strokeWidth={1.8} />
            </Link>
          </Button>
        </div>

        {/* Bottom decorative line */}
        <div className="mx-auto mt-12 flex max-w-xs items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c6a45b]/30" />
          <div className="flex gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-[#c6a45b]/40" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#c6a45b]/25" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#c6a45b]/15" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c6a45b]/30" />
        </div>
      </motion.div>
    </section>
  );
}
