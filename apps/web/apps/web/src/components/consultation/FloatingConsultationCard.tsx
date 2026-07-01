"use client";

import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  DraftingCompass,
  Gauge,
  HardHat,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import { CONSULTATION_CONTACT_ITEMS } from "@/lib/companyContact";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const metrics = [
  { label: "Scope clarity", value: "94%", tone: "gold" },
  { label: "Pillar lanes", value: "05", tone: "navy" },
  { label: "Risk gates", value: "15", tone: "navy" },
];

const previews = [
  { label: "Construction", value: "Feasibility", icon: HardHat },
  { label: "Architecture", value: "Concept review", icon: DraftingCompass },
  { label: "OTC Exchange", value: "Private intake", icon: ShieldCheck },
];

export function FloatingConsultationCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1, ease, delay: 0.2 }}
      className="relative mx-auto w-full max-w-[34rem] lg:ml-auto"
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Gold shimmer border */}
        <div className="absolute -inset-[1px] rounded-[2.2rem] bg-gradient-to-br from-[#c6a45b]/40 via-[#c6a45b]/10 to-[#c6a45b]/30" />

        {/* Main glass card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/55 p-4 shadow-[0_40px_120px_rgba(23,36,58,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl sm:p-5">
          {/* Top shimmer line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c6a45b]/60 to-transparent" />

          {/* Inner card */}
          <div className="rounded-[1.5rem] border border-[#e7dfd1]/80 bg-[#fffefa]/75 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17243a] text-[#f5df9a] shadow-[0_14px_32px_rgba(23,36,58,0.22)]">
                  <Building2 className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#9a7428]">
                    Enterprise Profile
                  </p>
                  <h3 className="mt-0.5 font-display text-[15px] font-medium tracking-tight text-[#17243a]">
                    Ractysh Advisory Desk
                  </h3>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#c6a45b]/40 bg-[#fff7df]/80 px-3 py-1 text-[11px] font-bold text-[#7d5f1d]">
                <CheckCircle2 className="h-3 w-3" />
                Priority
              </span>
            </div>

            {/* Metrics grid */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className={cn(
                    "rounded-xl border p-3 text-center transition-all duration-300",
                    metric.tone === "gold"
                      ? "border-[#c6a45b]/30 bg-[#fff8df]/80"
                      : "border-[#dfe4e8]/80 bg-[#f7f9fb]/80"
                  )}
                >
                  <p className="font-display text-[1.1rem] font-bold text-[#17243a]">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-[0.58rem] font-medium leading-4 text-[#6f6c63]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Progress section */}
            <div className="mt-4 rounded-2xl border border-[#dde4ea]/60 bg-[#f8fafb]/80 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#687280]">
                    Planning Metrics
                  </p>
                  <p className="mt-0.5 text-[13px] font-semibold text-[#17243a]">
                    Demo Readiness Index
                  </p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c6a45b]/10">
                  <Gauge className="h-4 w-4 text-[#c6a45b]" strokeWidth={2} />
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {["Architecture brief", "Real estate model", "Trade and OTC sequence"].map(
                  (label, index) => (
                    <div key={label}>
                      <div className="mb-1.5 flex justify-between text-[0.65rem] font-medium text-[#6b706e]">
                        <span>{label}</span>
                        <span className="text-[#17243a]">{86 + index * 4}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#e4e8ea]/80">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${86 + index * 4}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.4,
                            delay: 0.3 + index * 0.12,
                            ease,
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-[#17243a] via-[#2d425f] to-[#c6a45b]"
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Preview cards */}
            <div className="mt-4 grid gap-2.5">
              {previews.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-2xl border border-[#e5dfd3]/80 bg-white/65 px-4 py-3 transition-all duration-300 hover:border-[#c6a45b]/30 hover:bg-white/80"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#17243a]/5 text-[#17243a]">
                        <Icon className="h-4 w-4" strokeWidth={1.8} />
                      </span>
                      <div>
                        <p className="text-[13px] font-semibold text-[#17243a]">
                          {item.label}
                        </p>
                        <p className="text-[11px] text-[#7a766d]">
                          {item.value}
                        </p>
                      </div>
                    </div>
                    <Layers3
                      className="h-4 w-4 text-[#c6a45b]/60"
                      strokeWidth={1.9}
                    />
                  </div>
                );
              })}
            </div>

            {/* Contact items */}
            <div className="mt-4 grid gap-1.5 rounded-2xl border border-[#c6a45b]/20 bg-[#fffaf0]/60 p-3">
              {CONSULTATION_CONTACT_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between gap-3 rounded-xl px-2.5 py-2 text-left transition duration-300 hover:bg-white/60"
                >
                  <span className="text-[0.58rem] font-bold uppercase tracking-[0.16em] text-[#9a7428]">
                    {item.label}
                  </span>
                  <span className="break-words text-right text-[11px] font-semibold text-[#17243a]">
                    {item.value}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating side badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease }}
        className="absolute -right-2 top-10 hidden w-40 rounded-2xl border border-[#c6a45b]/30 bg-white/70 p-4 shadow-[0_20px_54px_rgba(124,93,31,0.1)] backdrop-blur-xl sm:block lg:-right-8"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#17243a]/5">
          <ShieldCheck className="h-4 w-4 text-[#c6a45b]" strokeWidth={2} />
        </div>
        <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a7428]">
          Status
        </p>
        <p className="mt-1 text-[13px] font-semibold text-[#17243a]">
          Private review lane open
        </p>
      </motion.div>
    </motion.div>
  );
}
