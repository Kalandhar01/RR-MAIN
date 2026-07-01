"use client";

import { motion } from "framer-motion";
import { Award, Headphones, Network, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const ease = [0.22, 1, 0.36, 1] as const;

const benefits = [
  {
    title: "Enterprise-Level Strategy",
    description:
      "Senior-led discovery across commercial goals, construction complexity, operational risk and execution readiness.",
    icon: Network,
    accent: "from-[#17243a] to-[#2d425f]",
  },
  {
    title: "Premium Technical Expertise",
    description:
      "Architecture, Construction, Real Estate, Export-Import and Private Exchange models reviewed through one advisory lens.",
    icon: Award,
    accent: "from-[#9a7428] to-[#c6a45b]",
  },
  {
    title: "End-to-End Execution",
    description:
      "A practical roadmap from requirement intake to partners, sequencing, governance and turnkey delivery.",
    icon: Sparkles,
    accent: "from-[#17243a] to-[#c6a45b]",
  },
  {
    title: "Dedicated Demo Support",
    description:
      "A private demo lane with structured follow-ups, curated documentation and executive-level coordination.",
    icon: Headphones,
    accent: "from-[#c6a45b] to-[#9a7428]",
  },
];

export function ConsultationBenefits() {
  return (
    <section className="relative px-5 pb-[4rem] pt-0 md:px-8 md:pb-24 md:pt-0">
      {/* Top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c6a45b]/25 to-transparent" />

      <div className="mx-auto max-w-[86rem]">
        {/* Section header */}
        <ScrollReveal className="mb-10 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9a7428]">
            Why Ractysh Consultation
          </p>
          <h2 className="mt-3 font-display text-[1.6rem] font-semibold leading-[1.1] tracking-[-0.02em] text-[#17243a] md:text-[2rem] lg:text-[2.4rem]">
            Premium advisory across every enterprise vertical.
          </h2>
        </ScrollReveal>

        {/* Benefits grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <ScrollReveal key={benefit.title} delay={index * 0.08}>
                <motion.article
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.35, ease }}
                  className="group relative min-h-[18rem] overflow-hidden rounded-[1.75rem] border border-[#c6a45b]/15 bg-white/50 p-6 shadow-[0_20px_60px_rgba(23,36,58,0.06)] backdrop-blur-xl transition-all duration-500 hover:border-[#c6a45b]/40 hover:bg-white/70 hover:shadow-[0_28px_80px_rgba(23,36,58,0.1)]"
                >
                  {/* Top shimmer line */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c6a45b]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Icon */}
                  <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br text-[#f5df9a] shadow-[0_16px_36px_rgba(23,36,58,0.16)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_20px_44px_rgba(23,36,58,0.22)]">
                    <Icon className="h-5.5 w-5.5" strokeWidth={1.8} />
                  </span>

                  {/* Content */}
                  <h3 className="mt-6 font-display text-[1.1rem] font-medium tracking-tight text-[#17243a]">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.75] text-[#6f6a60]/80">
                    {benefit.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-[#c6a45b]/50 via-[#17243a]/8 to-transparent transition-all duration-500 group-hover:from-[#c6a45b]/80 group-hover:via-[#c6a45b]/20" />
                </motion.article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
