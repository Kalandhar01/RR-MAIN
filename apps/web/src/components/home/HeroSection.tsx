"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SplitText from "./SplitText";

const divisions = [
  "Architecture",
  "Construction",
  "Real Estate",
  "Import & Export",
  "OTC Exchange",
];

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  });

  const fadeIn = (delay: number) => ({
    initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  });

  return (
    <section id="hero" className="hero-section relative h-screen min-h-[600px] overflow-hidden bg-[#1B1611]">
      {/* ─── Full-screen background image ─── */}
      <div className="absolute inset-0">
        <Image
          src="/images/photo-1486406146926-c627a92ad1ab.webp"
          alt=""
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
          quality={92}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        {/* Dark gradient overlays for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(15,12,9,0.82)] via-[rgba(15,12,9,0.45)] to-[rgba(15,12,9,0.25)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,12,9,0.4)] via-transparent to-[rgba(15,12,9,0.6)]" />
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6 sm:px-8 lg:px-16">
          <div className="max-w-2xl">
            <motion.p
              {...fadeUp(0)}
              className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#C49A3A]"
            >
              RACTYSH Group Of Companies
            </motion.p>

            <SplitText
              text="One Enterprise. Endless Possibilities."
              tag="h1"
              className="mt-8 font-fraunces text-[clamp(2.8rem,5.5vw,5.5rem)] font-semibold leading-[0.88] tracking-tight text-[#FAF8F4]"
              splitType="lines"
              delay={80}
              duration={0.8}
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.99}
              rootMargin="0px"
              textAlign="left"
            />

          <motion.p
            {...fadeUp(0.28)}
            className="mt-7 max-w-lg font-inter text-[15px] leading-[1.7] text-[rgba(250,248,244,0.75)]"
          >
            Architecture, Construction, Real Estate, Import & Export, and OTC
            Exchange operating through one integrated enterprise ecosystem.
          </motion.p>

          <motion.div
            {...fadeUp(0.42)}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link
              href="/#ecosystem"
              className="inline-flex items-center justify-center gap-2 rounded-[3px] bg-[#C49A3A] px-8 py-4 font-inter text-sm font-medium tracking-wide text-[#1B1611] transition-all duration-300 hover:bg-[#FAF8F4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A3A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1611]"
            >
              Explore Ecosystem
            </Link>
            <Link
              href="/book-consultation"
              className="inline-flex items-center gap-1.5 rounded-[3px] border border-[rgba(250,248,244,0.2)] px-6 py-4 font-inter text-sm font-medium text-[rgba(250,248,244,0.7)] transition-all duration-200 hover:border-[#C49A3A]/50 hover:text-[#C49A3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A3A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1611]"
            >
              Book Consultation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            {...fadeIn(0.6)}
            className="mt-14 overflow-hidden border-t border-white/10 pt-6"
          >
            <div className="flex items-center whitespace-nowrap hover:[animation-play-state:paused]" style={{ width: "max-content", animation: prefersReducedMotion ? "none" : "division-slide 20s linear infinite" }}>
              {[...divisions, ...divisions, ...divisions].map((d, i) => (
                <span key={`${d}-${i}`} className="flex items-center gap-x-4 pr-4">
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[rgba(250,248,244,0.4)]">
                    {d}
                  </span>
                  <span className="text-[#C49A3A]/30">&#x25C9;</span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
