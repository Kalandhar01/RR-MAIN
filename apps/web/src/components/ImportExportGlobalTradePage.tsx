"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./home/SplitText";
import {
  ArrowRight,
  type LucideIcon
} from "lucide-react";
import { ContactCTA } from "./home/ContactCTA";
import { ScrollReveal } from "@/components/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const TradeGlobeScene = dynamic(() => import("@/components/ImportExportGlobeScene"), {
  ssr: false,
  loading: () => <GlobeFallback />
});

const ease = [0.22, 1, 0.36, 1] as const;

interface ShowcasePanel {
  title: string;
  kicker: string;
  body: string;
  image: string;
  alt: string;
  align: "left" | "right";
  objectPosition: string;
}

const tradeImage = (photoId: string) => `/images/${photoId}.webp`;

const showcasePanels: ShowcasePanel[] = [
  {
    title: "Global Sourcing",
    kicker: "Section 01 / Global Trade Showcase",
    body: "Supplier discovery, category fit and origin readiness are staged as one international sourcing path.",
    image: tradeImage("photo-1758518727613-00192aed759b"),
    alt: "Enterprise team reviewing supplier market documents",
    align: "left",
    objectPosition: "50% 48%"
  },
  {
    title: "Import Operations",
    kicker: "Shipment Release and Terminal Control",
    body: "Inbound goods, release windows and documentation checkpoints are prepared before shipments reach critical decision points.",
    image: tradeImage("photo-1774929104680-bf61cc6f845d"),
    alt: "Container crane unloading shipments at an international terminal",
    align: "right",
    objectPosition: "50% 50%"
  },
  {
    title: "Export Operations",
    kicker: "Shipping Lanes and Dispatch Readiness",
    body: "Origin dispatch, buyer updates and vessel-side coordination stay visible across each global lane.",
    image: tradeImage("photo-1765206257996-9b4a5d886a2c"),
    alt: "Container ships and cranes operating along a global shipping corridor",
    align: "left",
    objectPosition: "50% 50%"
  },
  {
    title: "Cross-Border Commerce",
    kicker: "Market Access and Destination Handoffs",
    body: "Commercial goods move through supplier readiness, documentation and destination handoffs with executive visibility.",
    image: tradeImage("photo-1769355104335-acef3aa4c9b6"),
    alt: "Commercial goods arranged for cross-border commerce handoff",
    align: "right",
    objectPosition: "50% 50%"
  }
];




function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ImportExportGlobalTradePage() {
  const rootRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion =
      Boolean(prefersReducedMotion) || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      const parallaxImages = gsap.utils.toArray<HTMLElement>("[data-parallax-image]");
      const rules = gsap.utils.toArray<HTMLElement>("[data-advantage-rule]");

      if (reduceMotion) {
        gsap.set(["[data-hero-globe]"], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          x: 0
        });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          "[data-hero-globe]",
          { opacity: 0, x: 34, scale: 0.985 },
          { opacity: 1, x: 0, scale: 1, duration: 1.05 }
        );

      parallaxImages.forEach((image) => {
        const panel = image.closest<HTMLElement>("[data-parallax-panel]") ?? image;

        gsap.fromTo(
          image,
          { yPercent: -5, scale: 1.08 },
          {
            yPercent: 5,
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      });

      rules.forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0, transformOrigin: "0% 50%" },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rule,
              start: "top 86%",
              once: true
            }
          }
        );
      });
    }, root);

    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <article
      ref={rootRef}
      className="trade-commerce-page relative isolate overflow-hidden bg-[#fffdf8] text-[#17120f]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#fffdf8_0%,#fbf4e8_38%,#f4e7d2_68%,#fffaf0_100%)]" />
        <div className="trade-grid-field absolute inset-0" />
        <div className="trade-topline absolute left-0 right-0 top-[8.5rem] h-px" />
      </div>

      <HeroSection />
      <SouthIndianExportSection />
      <ContactCTA />

      <style>{`
        .trade-commerce-page {
          --trade-ivory: #fffdf8;
          --trade-champagne: #fff6e6;
          --trade-gold: #c6a45b;
          --trade-gold-strong: #d8b56d;
          --trade-burgundy: #8b1118;
          --trade-ink: #17120f;
          --trade-muted: #675b4d;
          font-family: var(--ractysh-body-font);
          font-size: 16px;
          line-height: 1.56;
          letter-spacing: 0;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          font-optical-sizing: auto;
        }

        .trade-commerce-page *,
        .trade-commerce-page *::before,
        .trade-commerce-page *::after {
          letter-spacing: 0 !important;
        }

        .trade-commerce-page :is(h1, h2, h3, .trade-display) {
          font-family: var(--ractysh-heading-font) !important;
          font-feature-settings: "kern" 1, "liga" 1;
          font-weight: 600;
          letter-spacing: 0 !important;
          text-wrap: balance;
        }

        .trade-commerce-page .trade-hero-title,
        .trade-commerce-page .trade-hero-title span {
          font-family: var(--ractysh-heading-font) !important;
          font-weight: 700 !important;
          letter-spacing: -0.04em !important;
          line-height: 0.9 !important;
          text-rendering: optimizeLegibility;
        }

        .trade-display {
          line-height: 0.9;
        }

        .trade-copy {
          font-family: var(--ractysh-body-font);
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.78;
          text-wrap: pretty;
        }

        .trade-grid-field {
          opacity: 0.42;
          background-image:
            linear-gradient(90deg, rgba(198, 164, 91, 0.09) 1px, transparent 1px),
            linear-gradient(rgba(198, 164, 91, 0.07) 1px, transparent 1px),
            linear-gradient(135deg, rgba(139, 17, 24, 0.05), transparent 36%, rgba(198, 164, 91, 0.08) 74%, transparent);
          background-size: 92px 92px, 92px 92px, 100% 100%;
          mask-image: linear-gradient(180deg, rgba(0,0,0,0.92), rgba(0,0,0,0.62) 58%, transparent 100%);
        }

        .trade-topline {
          background: linear-gradient(90deg, transparent, rgba(198, 164, 91, 0.42), rgba(139, 17, 24, 0.18), transparent);
        }

        .trade-button {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          transition:
            transform 360ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 360ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 360ms cubic-bezier(0.22, 1, 0.36, 1),
            background 360ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .trade-button::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          transform: translateX(-115%);
          background: linear-gradient(110deg, transparent 0%, rgba(255, 255, 255, 0.48) 46%, transparent 74%);
          transition: transform 760ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .trade-button:hover {
          transform: translate3d(0, -3px, 0);
        }

        .trade-button:hover::before {
          transform: translateX(115%);
        }

        .trade-hero-corridor {
          background:
            linear-gradient(90deg, rgba(198, 164, 91, 0.22), transparent 34%, rgba(139, 17, 24, 0.08) 72%, transparent),
            repeating-linear-gradient(90deg, rgba(198, 164, 91, 0.16) 0 1px, transparent 1px 92px);
        }

        .trade-globe-field::before,
        .trade-globe-field::after {
          content: "";
          position: absolute;
          inset: 12% 6%;
          border: 1px solid rgba(198, 164, 91, 0.2);
          transform: rotate(-9deg);
        }

        .trade-globe-field::after {
          inset: 18% 12%;
          border-color: rgba(139, 17, 24, 0.16);
          transform: rotate(11deg);
        }

        .trade-section-kicker {
          color: var(--trade-burgundy);
          font-size: 0.72rem;
          font-weight: 700;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .trade-editorial-heading {
          color: var(--trade-ink);
          font-size: 2.8rem;
          font-weight: 600;
          line-height: 0.92;
          max-width: 12ch;
        }

        .trade-full-panel {
          min-height: 78svh;
          background: #17120f;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(216,181,109,0.22);
        }

        .trade-full-panel::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-top: 1px solid rgba(216, 181, 109, 0.28);
          border-bottom: 1px solid rgba(216, 181, 109, 0.28);
        }

        .trade-full-panel .trade-display,
        .trade-layout-block .trade-display {
          text-shadow: 0 8px 34px rgba(0, 0, 0, 0.48);
        }

        .trade-panel-image {
          transform-origin: center;
          will-change: transform;
        }

        .trade-layout-block {
          min-height: 18rem;
          border-radius: 8px;
          background:
            linear-gradient(145deg, rgba(255, 246, 230, 0.1), rgba(255, 246, 230, 0.02)),
            #17120f;
          box-shadow:
            0 30px 90px rgba(71, 53, 24, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.16);
          transform: translateZ(0);
          transition:
            transform 520ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 520ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 520ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .trade-layout-block::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          background:
            linear-gradient(180deg, rgba(6,7,10,0.12) 0%, rgba(6,7,10,0.42) 42%, rgba(6,7,10,0.88) 100%),
            linear-gradient(115deg, rgba(139,17,24,0.54), transparent 42%, rgba(216,181,109,0.2));
          transition: opacity 520ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .trade-layout-block::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,246,230,0.34), rgba(216,181,109,0.08) 32%, rgba(139,17,24,0.34) 62%, rgba(255,246,230,0.18));
          opacity: 0.56;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          transition: opacity 520ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .trade-layout-block.is-featured::before {
          background:
            linear-gradient(180deg, rgba(6,7,10,0.06) 0%, rgba(6,7,10,0.34) 34%, rgba(6,7,10,0.86) 100%),
            radial-gradient(circle at 78% 18%, rgba(216,181,109,0.28), transparent 24rem),
            linear-gradient(115deg, rgba(139,17,24,0.56), transparent 46%, rgba(216,181,109,0.22));
        }

        .trade-layout-block img {
          transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1), filter 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .trade-layout-block:hover,
        .trade-layout-block:focus-visible {
          transform: translate3d(0, -7px, 0);
          border-color: rgba(216, 181, 109, 0.54);
          box-shadow:
            0 44px 120px rgba(71, 53, 24, 0.24),
            0 0 0 1px rgba(216, 181, 109, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .trade-layout-block:hover img,
        .trade-layout-block:focus-visible img {
          transform: scale(1.075);
          filter: saturate(1.12) contrast(1.08);
        }

        .trade-layout-block:hover::before,
        .trade-layout-block:focus-visible::before {
          opacity: 0.9;
        }

        .trade-layout-block:hover::after,
        .trade-layout-block:focus-visible::after {
          opacity: 0.95;
        }

        .trade-layout-modal {
          border-radius: 8px;
          box-shadow: 0 42px 130px rgba(0, 0, 0, 0.34);
        }

        @media (max-width: 767px) {
          .trade-commerce-page section {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }

          .trade-commerce-page section:not(:first-of-type) {
            padding-top: 3.5rem !important;
            padding-bottom: 3.5rem !important;
          }

          .trade-commerce-page .trade-section-kicker {
            font-size: 0.68rem;
            line-height: 1.25;
          }

          .trade-commerce-page .trade-editorial-heading {
            max-width: 14ch;
            font-size: 2.35rem !important;
            line-height: 1.04 !important;
          }

          .trade-commerce-page .trade-copy {
            max-width: 32rem;
            font-size: 0.95rem;
            line-height: 1.72;
          }

          .trade-commerce-page .trade-globe-field {
            height: min(108vw, 26.5rem);
            max-width: min(100%, 26.5rem);
          }

          .trade-commerce-page .trade-full-panel {
            min-height: auto;
          }

          .trade-commerce-page .trade-full-panel > .relative {
            min-height: min(72svh, 34rem) !important;
            padding-top: 2.25rem !important;
            padding-bottom: 2.25rem !important;
          }

          .trade-commerce-page .trade-full-panel h3.trade-display {
            font-size: 2.75rem !important;
            line-height: 0.94 !important;
          }

          .trade-commerce-page [data-parallax-image],
          .trade-commerce-page .trade-layout-block img {
            max-width: 100% !important;
            transform: none !important;
          }

          .trade-commerce-page .trade-bento-grid {
            margin-top: 2.25rem !important;
            gap: 1rem !important;
            grid-auto-rows: minmax(16.25rem, auto) !important;
          }

          .trade-commerce-page .trade-layout-block {
            min-height: 16.25rem;
          }

          .trade-commerce-page .trade-layout-block.is-featured {
            min-height: 17.5rem;
          }

          .trade-commerce-page .trade-layout-block > .relative {
            padding: 1.35rem !important;
          }

          .trade-commerce-page .trade-layout-block h3.trade-display {
            max-width: 12ch;
            font-size: 2.16rem !important;
            line-height: 0.96 !important;
          }

          .trade-commerce-page .trade-layout-block.is-featured h3.trade-display {
            font-size: 2.42rem !important;
          }

          .trade-commerce-page .trade-layout-block p {
            font-size: 0.92rem !important;
            line-height: 1.64 !important;
          }

          .trade-commerce-page .trade-layout-block .inline-flex {
            max-width: 100%;
          }

          .trade-commerce-page article[data-parallax-panel] {
            gap: 1.6rem !important;
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
          }

          .trade-commerce-page article[data-parallax-panel] [data-image-reveal] {
            min-height: 18rem !important;
          }

          .trade-commerce-page article[data-parallax-panel] h3.trade-display,
          .trade-commerce-page section:last-of-type h2.trade-display {
            font-size: 2.5rem !important;
            line-height: 1 !important;
          }
        }

        @media (max-width: 1023px) {
          .trade-globe-field {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: min(100%, 36rem);
            margin-left: auto;
            margin-right: auto;
            overflow: visible;
            transform: translateX(0);
          }

          .trade-globe-field > canvas {
            left: 50%;
            right: auto;
            margin-left: auto;
            margin-right: auto;
            transform: translateX(-50%);
          }
        }

        @media (min-width: 640px) {
          .trade-editorial-heading {
            font-size: 4.15rem;
          }
        }

        @media (min-width: 768px) {
          .trade-copy {
            font-size: 1.08rem;
          }
        }

        @media (min-width: 1024px) {
          .trade-full-panel {
            min-height: 88svh;
          }

          .trade-editorial-heading {
            font-size: 5.65rem;
          }
        }

        @media (min-width: 1280px) {
          .trade-editorial-heading {
            font-size: 6.15rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .trade-button,
          .trade-button::before,
          .trade-layout-block,
          .trade-layout-block img {
            transition: none !important;
          }
        }
      `}</style>
    </article>
  );
}

function HeroSection() {
  return (
    <section className="relative z-10 min-h-[100svh] px-5 pb-16 pt-28 sm:px-6 md:px-8 lg:flex lg:items-center lg:pt-24 xl:px-10">
      <div className="mx-auto grid w-full max-w-[1420px] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(32rem,1.1fr)] lg:items-center xl:gap-16">
        <div className="relative z-20 max-w-[47rem]">
          <ScrollReveal className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1118]">
            <p>RACTYSH Exim Pvt Ltd</p>
          </ScrollReveal>

          <ScrollReveal className="trade-hero-title mt-7 max-w-[52rem] font-display text-[clamp(3.1rem,5.8vw,6.35rem)] font-bold leading-[0.9] tracking-[-0.04em] text-[#17120f]">
            <h1 aria-label="Global Commerce. Connected Without Borders.">
              <SplitText
                text="Global Commerce. Connected Without Borders."
                tag="span"
                className="block"
                splitType="lines"
                delay={60}
                duration={0.9}
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.3}
                rootMargin="-80px"
                textAlign="left"
              />
            </h1>
          </ScrollReveal>

          <ScrollReveal className="trade-copy mt-7 max-w-[39rem] text-[clamp(1rem,1.1vw,1.12rem)] font-medium leading-[1.9] text-[#51463c]">
            <p>Cross-border sourcing, import operations, export operations and trade documentation through one enterprise ecosystem.</p>
          </ScrollReveal>

          <ScrollReveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/book-consultation"
              className="trade-button inline-flex min-h-12 items-center justify-center gap-3 rounded-[8px] border border-[#8B1118] bg-[#8B1118] px-6 py-3 text-[0.78rem] font-bold uppercase tracking-[0] text-[#fffaf0] shadow-[0_20px_56px_rgba(139,17,24,0.2)] transition duration-300 hover:bg-[#741016] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6a45b]"
            >
              <span className="relative z-10">Book Consultation</span>
              <ArrowRight className="relative z-10 h-4 w-4" strokeWidth={2.1} />
            </Link>
            <Link
              href="#"
              target="_blank"
              className="trade-button inline-flex min-h-12 items-center justify-center gap-3 rounded-[8px] border border-[#C9A45C]/58 bg-[#fffaf0] px-6 py-3 text-[0.78rem] font-bold uppercase tracking-[0] text-[#8B1118] shadow-[0_18px_46px_rgba(22,22,22,0.08)] backdrop-blur-xl transition duration-300 hover:border-[#8B1118]/45 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6a45b]"
            >
              <span className="relative z-10">For More Details, Check This</span>
              <ArrowRight className="relative z-10 h-4 w-4" strokeWidth={2.1} />
            </Link>
          </ScrollReveal>

          <ScrollReveal className="trade-hero-corridor mt-12 grid gap-3 border-y border-[#c6a45b]/22 py-4 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#8b1118] sm:grid-cols-3">
            <span>Import Operations</span>
            <span>Export Operations</span>
            <span>Market Access</span>
          </ScrollReveal>
        </div>

        <div data-hero-globe className="trade-globe-field relative h-[430px] sm:h-[560px] lg:h-[720px]">
          <TradeGlobeScene />
        </div>
      </div>
    </section>
  );
}

function SouthIndianExportSection() {
  return (
    <section className="relative z-10 py-20 lg:py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-[#c6a45b]/8 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-72 w-72 rounded-full bg-[#8b1118]/6 blur-3xl" />
      </div>
      <div className="px-5 sm:px-6 md:px-8 xl:px-10">
        <ScrollReveal className="mx-auto max-w-[1360px]">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="trade-section-kicker">South Indian Export</p>
              <h2 className="mt-5 trade-editorial-heading">
                Specialised export services from South India&apos;s key production corridors.
              </h2>
              <p className="trade-copy mt-6 max-w-[42rem] text-[1rem] font-medium leading-8 text-[#62584a]">
                South India is a major hub for spices, textiles, engineering goods, agricultural products
                and marine exports. Ractysh Exim coordinates the end-to-end export pathway — from supplier
                readiness and documentation to shipping and destination handoff — across Tamil Nadu, Kerala,
                Karnataka, Andhra Pradesh and Telangana.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Spices & Agri Products", desc: "Pepper, cardamom, turmeric, coffee, tea and cashew from South Indian estates." },
                  { label: "Textiles & Garments", desc: "Cotton yarn, woven fabrics, readymade garments and home textiles from major clusters." },
                  { label: "Engineering Goods", desc: "Automotive components, pumps, valves and industrial machinery from manufacturing hubs." },
                  { label: "Marine & Processed Foods", desc: "Frozen seafood, processed fruits, coconut products and value-added agri exports." }
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-[#d8c39b]/40 bg-white/60 p-5 backdrop-blur-sm">
                    <p className="text-[0.82rem] font-bold text-[#8b1118]">{item.label}</p>
                    <p className="mt-1.5 text-[0.82rem] font-medium leading-relaxed text-[#62584a]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[28rem] overflow-hidden rounded-2xl border border-[#d8b56d]/30 bg-[#17120f] shadow-[0_28px_88px_rgba(71,53,24,0.14)]">
              <Image
                src={tradeImage("photo-1494412574643-ff11b0a5c1c3")}
                alt="South Indian export goods and trade commodities"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                quality={86}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,18,15,0.08),rgba(23,18,15,0.54))]" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[#d8b56d]/30 bg-[#8b1118]/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-[#fffaf0] backdrop-blur-sm">
                    Tamil Nadu
                  </span>
                  <span className="rounded-full border border-[#d8b56d]/30 bg-[#8b1118]/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-[#fffaf0] backdrop-blur-sm">
                    Kerala
                  </span>
                  <span className="rounded-full border border-[#d8b56d]/30 bg-[#8b1118]/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-[#fffaf0] backdrop-blur-sm">
                    Karnataka
                  </span>
                  <span className="rounded-full border border-[#d8b56d]/30 bg-[#8b1118]/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-[#fffaf0] backdrop-blur-sm">
                    Andhra Pradesh
                  </span>
                  <span className="rounded-full border border-[#d8b56d]/30 bg-[#8b1118]/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-[#fffaf0] backdrop-blur-sm">
                    Telangana
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function GlobeFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-72 w-72 rounded-full border border-[#c6a45b]/32 bg-[#17120f] shadow-[0_34px_90px_rgba(71,53,24,0.18)]" />
    </div>
  );
}

function GlobalTradeShowcaseSection() {
  return (
    <section id="global-trade-network" className="relative z-10 py-20 lg:py-28">
      <div className="px-5 sm:px-6 md:px-8 xl:px-10">
        <ScrollReveal className="mx-auto grid max-w-[1360px] gap-8 lg:grid-cols-[0.78fr_1fr] lg:items-end">
          <div>
            <p className="trade-section-kicker">Global Trade Showcase</p>
            <h2 className="mt-5 trade-editorial-heading">
              Enterprise panels for international commerce movement.
            </h2>
          </div>
          <p className="trade-copy max-w-[39rem] text-[1rem] font-medium leading-8 text-[#62584a] lg:justify-self-end">
            Import operations, export execution, supplier networks and trade documentation are presented as large visual systems,
            not fragmented service tiles.
          </p>
        </ScrollReveal>
      </div>

      <div className="mt-14 space-y-3">
        {showcasePanels.map((panel, index) => (
          <article key={panel.title} data-parallax-panel className="trade-full-panel relative overflow-hidden">
            <ScrollReveal className="absolute inset-0">
              <div>
                <Image
                  data-parallax-image
                  src={panel.image}
                  alt={panel.alt}
                  fill
                  sizes="100vw"
                  quality={86}
                  priority={index === 0}
                  className="trade-panel-image object-cover"
                  style={{ objectPosition: panel.objectPosition }}
                />
              </div>
            </ScrollReveal>
            <div
              className={cx(
                "absolute inset-0",
                panel.align === "left"
                  ? "bg-[linear-gradient(90deg,rgba(8,8,9,0.9),rgba(23,18,15,0.58)_48%,rgba(23,18,15,0.16)_82%),linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0.52))]"
                  : "bg-[linear-gradient(270deg,rgba(8,8,9,0.9),rgba(23,18,15,0.58)_48%,rgba(23,18,15,0.16)_82%),linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0.52))]"
              )}
            />
            <div
              className={cx(
                "relative z-10 flex min-h-[78svh] items-end px-5 py-10 sm:px-8 lg:min-h-[88svh] lg:px-12 lg:py-14",
                panel.align === "right" && "lg:justify-end"
              )}
            >
              <ScrollReveal className="max-w-[43rem] text-[#fffaf0]">
                <div>
                  <p className="text-[0.72rem] font-bold uppercase text-[#d8b56d]">{panel.kicker}</p>
                  <h3 className="mt-4 trade-display text-[3.4rem] font-semibold leading-[0.9] sm:text-[4.8rem] lg:text-[6.2rem]">
                    {panel.title}
                  </h3>
                  <p className="trade-copy mt-6 max-w-[34rem] text-[1rem] font-medium leading-8 text-[#f8ecd8] [text-shadow:0_3px_20px_rgba(0,0,0,0.58)] md:text-[1.08rem]">
                    {panel.body}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}




