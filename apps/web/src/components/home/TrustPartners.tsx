"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { CountUp } from "./CountUp";

const supportingMetrics = [
  { label: "Enterprise Clients", value: 50, suffix: "+" },
  { label: "Business Divisions", value: 5, suffix: "" },
  { label: "Years Experience", value: 4, suffix: "+" },
  { label: "Client Retention", value: 95, suffix: "%" }
];

const testimonials = [
  {
    quote: "Ractysh consistently delivered exceptional execution and professionalism across every phase of our project.",
    name: "Private Client",
    company: "Real Estate Investor"
  },
  {
    quote: "The group structure makes it seamless to move from concept to execution without losing accountability.",
    name: "Development Partner",
    company: "Commercial Project Owner"
  },
  {
    quote: "The experience feels premium because the process is controlled, clear and remarkably fast.",
    name: "Institutional Associate",
    company: "Strategic Client"
  }
];

function TestimonialPanel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(next, 6000);
    return () => clearInterval(intervalRef.current);
  }, [next]);

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white/60 p-8 backdrop-blur-sm shadow-xl sm:p-10">
        <div className="absolute -right-4 -top-4 text-[#D6B45F]/10">
          <svg width="80" height="60" viewBox="0 0 48 36" fill="currentColor">
            <path d="M13.2 0C6.6 0 1.2 5.4 1.2 12v12c0 6.6 5.4 12 12 12h2.4c2.4 0 4.8-2.4 4.8-4.8v-2.4c0-2.4-2.4-4.8-4.8-4.8h-2.4V12c0-3 2.4-5.4 5.4-5.4h1.2c1.8 0 3-1.2 3-3V3c0-1.8-1.2-3-3-3H13.2zm31.2 0c-6.6 0-12 5.4-12 12v12c0 6.6 5.4 12 12 12h2.4c2.4 0 4.8-2.4 4.8-4.8v-2.4c0-2.4-2.4-4.8-4.8-4.8h-2.4V12c0-3 2.4-5.4 5.4-5.4h1.2c1.8 0 3-1.2 3-3V3c0-1.8-1.2-3-3-3H44.4z" />
          </svg>
        </div>

        <div className="relative min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-full"
            >
              <p className="text-base leading-relaxed text-[#444] sm:text-lg">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#D6B45F] to-[#C4A052] text-sm font-bold text-white shadow-lg">
                  {testimonials[current].name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#222]">
                    {testimonials[current].name}
                  </p>
                  <p className="text-xs text-[#999]">
                    {testimonials[current].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[#e8e8e8] pt-5">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-[#D6B45F] text-[#D6B45F]" />
            ))}
            <span className="ml-2 text-xs font-semibold text-[#888]">4.9/5</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e0e0e0] text-[#888] transition-colors hover:border-[#D6B45F]/40 hover:text-[#D6B45F]"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={next}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e0e0e0] text-[#888] transition-colors hover:border-[#D6B45F]/40 hover:text-[#D6B45F]"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] font-medium tracking-[0.12em] text-[#999] uppercase">
        Trusted Across Multiple Industries
      </p>
    </div>
  );
}

export function TrustPartners() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-white py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D6B45F]/4 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 translate-x-1/4 -translate-y-1/4 rounded-full bg-[#D6B45F]/3 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 translate-y-1/3 rounded-full bg-[#D6B45F]/2 blur-3xl" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #D6B45F 1px, transparent 0)",
          backgroundSize: "48px 48px"
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <span className="text-[11px] font-bold tracking-[0.28em] text-[#D6B45F] uppercase">
            Trust & Credibility
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-[#111] sm:text-5xl lg:text-6xl">
            Built on Trust
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-14 lg:grid-cols-5 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-3"
          >
            <div className="space-y-1">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="block text-[11px] font-bold tracking-[0.2em] text-[#D6B45F] uppercase"
              >
                Track Record
              </motion.span>

              <div className="flex items-start gap-2">
                <span className="font-display text-[clamp(4.5rem,12vw,8rem)] font-bold leading-[0.9] tracking-tight text-[#111]">
                  <CountUp from={0} to={150} started={isInView} />+
                </span>
              </div>

              <p className="mt-1 text-lg font-medium text-[#555] sm:text-xl">
                Projects Delivered
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {supportingMetrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="border-l-2 border-[#D6B45F]/30 pl-4">
                    <span className="font-sans text-xl font-bold tracking-tight text-[#D6B45F] sm:text-2xl">
                      <CountUp from={0} to={m.value} started={isInView} />
                      {m.suffix}
                    </span>
                    <p className="mt-0.5 text-xs font-medium text-[#888] sm:text-sm">
                      {m.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-2"
            >
              {[
                "150+ Projects Delivered",
                "50+ Enterprise Clients",
                "4+ Years Experience",
                "95% Retention Rate"
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#888]"
                >
                  <svg className="h-3.5 w-3.5 text-[#D6B45F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-2 lg:pt-24"
          >
            <TestimonialPanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
