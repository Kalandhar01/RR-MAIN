"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ContactCTA } from "./home/ContactCTA";
import {
  ArrowLeftRight,
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  FileStack,
  Gem,
  Globe2,
  Handshake,
  Landmark,
  Layers,
  PieChart,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  type LucideIcon
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1] as const;

const heroImage = "https://images.unsplash.com/photo-1774770511480-34845e3adc93?w=800&q=80";
const imageSizes = "(min-width: 1280px) 48vw, (min-width: 768px) 88vw, 100vw";
const heroImageSizes = "(min-width: 1280px) 52vw, (min-width: 1024px) 48vw, 100vw";

const trustSignals = ["Verified Counterparties", "Private Desk", "Settlement Clarity"] as const;

const services: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
}> = [
  {
    icon: ArrowLeftRight,
    title: "OTC Exchange Services",
    description: "Institutional-grade OTC trading services for crypto, fiat, and stablecoin transactions with real-time pricing, deep liquidity, and secure settlement for qualified counterparties.",
    cta: "Explore OTC services"
  },
  {
    icon: Building2,
    title: "Global Private Desk",
    description: "A private operating layer for deal conversations where authority, liquidity, privacy, and settlement proof must be aligned before movement. Built for institutional and high-net-worth clients.",
    cta: "Access private desk"
  },
  {
    icon: TrendingUp,
    title: "Institutional Trading",
    description: "Dedicated institutional trading support with block trade coordination, treasury conversion, and large-volume execution across digital assets, currencies, and commodities.",
    cta: "Institutional inquiry"
  },
  {
    icon: Globe2,
    title: "Cross-Border Settlements",
    description: "End-to-end cross-border settlement assistance with multi-currency coordination, compliance documentation, and transparent tracking from initiation to final confirmation.",
    cta: "Settlement support"
  },
  {
    icon: Layers,
    title: "Digital Asset Liquidity",
    description: "Access to deep digital asset liquidity pools connecting institutional clients with verified liquidity providers for efficient execution across crypto, stablecoins, and digital securities.",
    cta: "Liquidity access"
  },
  {
    icon: Landmark,
    title: "Treasury Execution",
    description: "Professional treasury management and execution services including treasury conversion, reserve management, and strategic allocation support for corporate and institutional clients.",
    cta: "Treasury services"
  },
  {
    icon: Gem,
    title: "Precious Metals Settlement",
    description: "Gold and precious metals settlement services with verified counterparties, transparent pricing, and secure delivery mechanisms for institutional and private clients.",
    cta: "Metals desk"
  },
  {
    icon: UserCheck,
    title: "Verified Counterparty Matching",
    description: "Structured counterparty verification and matching service connecting qualified participants with vetted institutional and private counterparties for secure transaction execution.",
    cta: "Counterparty matching"
  },
  {
    icon: FileStack,
    title: "Structured Private Transactions",
    description: "End-to-end facilitation of structured private transactions with documentation support, escrow coordination, and professional oversight from mandate to settlement.",
    cta: "Private transactions"
  },
  {
    icon: ShieldCheck,
    title: "Compliance-Assisted Execution",
    description: "AML-compliant execution services with KYC verification, sanctions screening, and regulatory documentation to ensure every transaction meets applicable legal standards.",
    cta: "Compliance desk"
  },
  {
    icon: PieChart,
    title: "Wealth & Investment Solutions",
    description: "Comprehensive wealth and investment advisory connecting clients with verified opportunities across real estate, infrastructure, business ventures, and financial instruments.",
    cta: "Investment options"
  },
  {
    icon: Handshake,
    title: "Business Financial Advisory",
    description: "Strategic financial advisory including business planning, market entry strategy, corporate structuring, and operational improvement for businesses seeking growth and capital access.",
    cta: "Advisory consultation"
  }
];

const whyChoosePoints = [
  {
    title: "Reliable Service Delivery",
    description: "Structured service delivery processes with clear milestones, regular updates, and professional follow-through on every engagement."
  },
  {
    title: "Dedicated Account Support",
    description: "Clients receive focused coordination from a dedicated service manager from initial consultation through engagement completion."
  },
  {
    title: "Timely Response",
    description: "We prioritize prompt communication and timely responses to ensure your business requirements move forward without unnecessary delays."
  },
  {
    title: "Confidentiality Assured",
    description: "All client information, business strategies, and engagement details are treated with strict confidentiality and professional discretion."
  },
  {
    title: "Verified Partner Ecosystem",
    description: "Our network of partners and service providers is carefully vetted to ensure capability, reliability, and professional standards."
  },
  {
    title: "Ethical Business Conduct",
    description: "Every engagement is guided by professional ethics, transparency, and a genuine commitment to client success."
  },
  {
    title: "Trusted Industry Connections",
    description: "We leverage our established network of industry contacts, professional associations, and business relationships to serve our clients effectively."
  },
  {
    title: "Clear Communication",
    description: "Clients receive clear, professional communication around service scope, progress, requirements, and outcomes at every stage."
  }
];

const processSteps = [
  {
    step: "01",
    title: "Requirement Assessment",
    description: "Our team reviews your mandate, assesses requirements, and identifies suitable partners or solutions from our verified network."
  },
  {
    step: "02",
    title: "Partner & Solution Matching",
    description: "We present matched options, facilitate introductions, and coordinate initial discussions between all parties involved."
  },
  {
    step: "03",
    title: "Due Diligence & Documentation",
    description: "Comprehensive due diligence support with professional documentation including service agreements, compliance review, and transaction records."
  },
  {
    step: "04",
    title: "Execution & Settlement",
    description: "Coordinated execution with real-time progress tracking, settlement oversight, and transparent reporting throughout the engagement."
  },
  {
    step: "05",
    title: "Closure & Record Keeping",
    description: "Complete engagement closure with transaction summaries, settlement proof, and professional records for your compliance and reference."
  }
];

const keyFeatures = [
  {
    title: "Verified Partner Network",
    description: "Our network of business partners and service providers is verified through a structured assessment process to ensure reliability, capability, and professional standards."
  },
  {
    title: "Professional Service Standards",
    description: "Every engagement follows structured service protocols with clear communication, defined milestones, and professional documentation from initial consultation through completion."
  },
  {
    title: "Transparent Business Practices",
    description: "We maintain transparency in all engagements with clear service terms, open communication channels, and honest assessment of capabilities and outcomes."
  },
  {
    title: "Confidential & Secure",
    description: "Client information, business strategies, and engagement details are protected through secure communication channels and strict confidentiality protocols."
  },
  {
    title: "Dedicated Service Coordination",
    description: "Each engagement is assigned a dedicated coordinator who manages communication, documentation, and service delivery from start to finish."
  },
  {
    title: "Professional & Ethical Approach",
    description: "Our operations are built on integrity, professional ethics, and a commitment to serving the best interests of our clients in every engagement."
  }
];

const stats = [
  { value: "100+", label: "Business Partners" },
  { value: "15+", label: "Service Verticals" },
  { value: "98%", label: "Client Satisfaction" }
];

const faqs = [
  {
    question: "What types of OTC and intermediary services does RACTYSH ASSOCIATES offer?",
    answer: "We offer a comprehensive range of services including OTC exchange services, global private desk operations, institutional trading, cross-border settlements, digital asset liquidity, treasury execution, precious metals settlement, verified counterparty matching, structured private transactions, compliance-assisted execution, wealth and investment solutions, and business financial advisory."
  },
  {
    question: "How does RACTYSH ASSOCIATES connect businesses with opportunities?",
    answer: "Our platform maintains a verified network of partners, service providers, and business contacts across multiple industries. We assess client requirements, identify suitable matches, facilitate introductions, and support the relationship through to successful collaboration."
  },
  {
    question: "Can clients keep their business requirements and transactions confidential?",
    answer: "Yes. All client information, business requirements, and engagement details are handled with strict confidentiality. Information is shared only on a need-to-know basis and with explicit client consent."
  },
  {
    question: "What happens after a mandate or service requirement is submitted?",
    answer: "Our desk team reviews the requirement within 24 hours, identifies suitable partners or solutions from our verified network, presents options to the client, facilitates discussions, and supports the engagement through documentation and follow-through."
  },
  {
    question: "Do you provide documentation and records for each engagement?",
    answer: "Every engagement includes professional documentation including service agreements, progress records, transaction summaries, settlement proof, and closure reports so clients have a complete record of the engagement."
  }
];

function ButtonLink({ href, children, variant = "dark" }: { href: string; children: ReactNode; variant?: "dark" | "light" }) {
  return (
    <Link
      href={href}
      className={[
        "real-estate-service-button group inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-[8px] border px-6 py-3 text-[0.78rem] font-bold uppercase tracking-[0] transition duration-300",
        variant === "dark"
          ? "border-[#8B1118] bg-[#8B1118] text-[#fff8ec] shadow-[0_20px_56px_rgba(139,17,24,0.2)] hover:-translate-y-0.5 hover:border-[#741016] hover:bg-[#741016]"
          : "border-[#C9A45C]/58 bg-[#fffaf0] text-[#15110d] shadow-[0_18px_46px_rgba(22,22,22,0.08)] hover:-translate-y-0.5 hover:border-[#8B1118]/45 hover:bg-white"
      ].join(" ")}
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.7} />
    </Link>
  );
}

function SectionImage({
  src,
  alt,
  label,
  signal,
  priority = false,
  className = ""
}: {
  src: string;
  alt: string;
  label: string;
  signal: string;
  priority?: boolean;
  className?: string;
}) {
  const figure = (
    <figure
      className={[
        "real-estate-service-property group relative min-h-[31rem] overflow-hidden rounded-[8px] border border-[#dfcfaa] bg-[#15110d] shadow-[0_34px_120px_rgba(58,41,18,0.16)] md:min-h-[38rem]",
        className
      ].join(" ")}
    >
      <Image
        fill
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes={priority ? heroImageSizes : imageSizes}
        src={src}
        alt={alt}
        data-property-image
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_18%,rgba(0,0,0,0.58)_100%)]" />
      <figcaption className="absolute bottom-5 left-5 right-5 text-[#fff8ec] md:bottom-7 md:left-7 md:right-7">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#d8b765]">{label}</p>
        <div className="mt-4 flex items-center gap-3">
          <span className="h-px w-12 bg-[#d8b765]" />
          <span className="rounded-full border border-white/24 bg-white/12 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-xl">
            {signal}
          </span>
        </div>
      </figcaption>
    </figure>
  );

  if (!priority) {
    return <ScrollReveal>{figure}</ScrollReveal>;
  }
  return figure;
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const Icon = service.icon;
  return (
    <ScrollReveal delay={index * 0.03}>
      <div className="group relative overflow-hidden rounded-[8px] border border-[#dfcfaa] bg-white/76 p-6 shadow-[0_18px_54px_rgba(58,41,18,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A45C] hover:shadow-[0_28px_70px_rgba(58,41,18,0.12)] sm:p-7">
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#f6ecdc] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative z-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-[#dfcfaa] bg-[#fffaf0] text-[#8B1118] shadow-sm">
            <Icon className="h-5 w-5" strokeWidth={1.7} />
          </div>
          <h3 className="mt-5 font-display text-[1.35rem] font-semibold leading-tight tracking-[0] text-[#15110d]">
            {service.title}
          </h3>
          <p className="mt-3 text-[0.92rem] leading-7 text-[#62594f]">
            {service.description}
          </p>
          <div className="mt-5 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#8B1118] transition-all duration-300 group-hover:gap-3">
            {service.cta}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

function FaqItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  return (
    <ScrollReveal delay={index * 0.05}>
      <div className="border-b border-[#d8c59d]/40 pb-6 last:border-b-0">
        <h3 className="text-[1.05rem] font-bold text-[#15110d]">
          {faq.question}
        </h3>
        <p className="mt-3 text-[0.95rem] leading-7 text-[#62594f]">
          {faq.answer}
        </p>
      </div>
    </ScrollReveal>
  );
}

export function OtcExchangeServiceExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      const shouldReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const imageItems = gsap.utils.toArray<HTMLElement>("[data-property-image]");
      const drawLines = gsap.utils.toArray<SVGPathElement>("[data-re-draw-line]");

      if (shouldReduce) {
        gsap.set([...imageItems, ...drawLines], { clearProps: "all" });
        return;
      }

      gsap.to("[data-re-grid]", {
        x: 72,
        y: 72,
        duration: 34,
        repeat: -1,
        ease: "none"
      });

      gsap.fromTo(
        "[data-hero-line]",
        { opacity: 0, yPercent: 112, rotateX: -10, transformOrigin: "50% 100%" },
        {
          opacity: 1,
          yPercent: 0,
          rotateX: 0,
          duration: 1.15,
          ease: "power4.out",
          stagger: 0.11,
          delay: 0.08
        }
      );

      imageItems.forEach((image) => {
        gsap.to(image, {
          yPercent: -7,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });
      });

      drawLines.forEach((line, index) => {
        const length = line.getTotalLength();
        gsap.fromTo(
          line,
          { strokeDasharray: length, strokeDashoffset: length, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.45,
            delay: index * 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line.closest("section") ?? root,
              start: "top 76%"
            }
          }
        );
      });
    }, root);

    const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(refreshId);
      context.revert();
    };
  }, [reduceMotion]);

  return (
    <article ref={rootRef} className="real-estate-service-page otc-exchange-operations-page relative isolate overflow-hidden bg-[#fffaf0] text-[#15110d]">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.28]" aria-hidden>
        <div data-re-grid className="absolute inset-[-10%] [background-image:linear-gradient(rgba(72,55,30,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(72,55,30,0.05)_1px,transparent_1px)] [background-size:96px_96px]" />
      </div>

      {/* ──────────────── HERO ──────────────── */}
      <section className="relative z-10 flex min-h-[100svh] items-center px-5 pb-14 pt-24 sm:px-6 md:px-8 lg:pb-20 lg:pt-36 xl:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(197,155,86,0.18),transparent_32rem),linear-gradient(180deg,#fffdf8,#f6ecdc)]" />
        <ExchangeBlueprint className="opacity-35" />

        <div className="relative mx-auto flex w-full max-w-[1480px] flex-col gap-7 md:gap-10 lg:grid lg:flex-row lg:grid-cols-[0.88fr_1.12fr] lg:items-center xl:gap-16">
          <div className="order-1 max-w-[46rem] lg:order-none">
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#8b1118]"
            >
              <span className="h-px w-12 bg-[#b88a44]" />
              RACTYSH Associates Pvt Ltd
            </motion.p>

            <h1
              aria-label="OTC Exchange Operations"
              className="mt-7 max-w-[52rem] font-display text-[clamp(3.05rem,5.7vw,6.15rem)] font-semibold leading-[0.92] tracking-[0] text-[#111111]"
            >
              <span className="block overflow-hidden pb-1">
                <span data-hero-line className="block">Premium OTC</span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span data-hero-line className="block text-[#8B1118]">Intermediary Platform</span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease }}
              className="mt-7 max-w-[38rem] text-[1rem] font-medium leading-8 text-[#5d5348] md:text-[1.08rem]"
            >
              RACTYSH ASSOCIATES PRIVATE LIMITED operates an institutional-grade OTC intermediary platform — connecting verified counterparties with private desk execution, cross-border settlement, and professional transaction coordination.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.48, ease }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <ButtonLink href="/book-consultation">Start a Consultation</ButtonLink>
              <ButtonLink href="https://associates.ractysh.com" variant="light">Visit RACTYSH ASSOCIATES</ButtonLink>
            </motion.div>

            <ScrollReveal className="mt-12 hidden max-w-[39rem] grid-cols-3 border-y border-[#d8c59d]/62 py-5 md:grid">
              {trustSignals.map((item) => (
                <div key={item} className="border-r border-[#d8c59d]/52 px-4 first:pl-0 last:border-r-0 last:pr-0">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#8b1118]/70">RACTYSH ASSOCIATES</p>
                  <p className="mt-2 font-display text-[1.35rem] font-semibold leading-none tracking-[0] text-[#211812]">{item}</p>
                </div>
              ))}
            </ScrollReveal>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.05, delay: 0.18, ease }}
            className="relative order-2 -mx-3 -mb-6 w-full self-center lg:order-none lg:mx-0 lg:mb-0"
          >
            <SectionImage
              src={heroImage}
              alt="Modern financial district building facade representing institutional OTC operations"
              label="Private Banking Atmosphere"
              signal="Institutional"
              priority
              className="min-h-[30rem] sm:min-h-[34rem] md:min-h-[46rem] lg:min-h-[52rem]"
            />
          </motion.div>
        </div>
      </section>

      {/* ──────────────── ABOUT OTC DIVISION ──────────────── */}
      <section className="relative z-10 overflow-hidden bg-[#110d0b] px-5 py-20 text-[#fff8ec] sm:px-6 md:px-8 lg:py-32 xl:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(216,183,101,0.18),transparent_28rem),radial-gradient(circle_at_88%_66%,rgba(139,17,24,0.2),transparent_30rem),linear-gradient(180deg,#15100d,#0d0a08)]" />
        <ExchangeBlueprint className="opacity-20" dark />

        <div className="relative mx-auto max-w-[1420px]">
          <div className="grid gap-14 lg:grid-cols-[0.58fr_0.42fr] lg:items-center xl:gap-20">
            <ScrollReveal>
              <p className="flex items-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#d8b765]">
                <span className="h-px w-10 bg-[#d8b765]" />
                About the Division
              </p>
              <h2 className="mt-5 font-display text-[clamp(2.4rem,4.8vw,5.6rem)] font-semibold leading-[0.88] tracking-[0] text-[#fff8ec]">
                RACTYSH ASSOCIATES
              </h2>
              <p className="mt-7 max-w-[38rem] text-[1rem] font-medium leading-8 text-[#fff8ec]/72 md:text-[1.08rem]">
                A professional intermediary business service platform connecting clients with verified partners,
                strategic opportunities, and corporate support services. RACTYSH ASSOCIATES PVT LTD acts as a
                trusted intermediary, helping businesses find the right partners, access the right services,
                and achieve their goals with confidence.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Intermediary Platform", "Private Desk", "Institutional Grade", "Verified Network"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#d8b765]/26 bg-white/[0.06] px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#d8b765]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
            <div className="hidden lg:block">
              <div className="rounded-[8px] border border-[#d8b765]/20 bg-white/[0.04] p-8 shadow-[0_34px_80px_rgba(0,0,0,0.3)]">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#d8b765]">
                  Our Purpose
                </p>
                <p className="mt-4 text-[1rem] leading-8 text-[#fff8ec]/72">
                  Simplify complex business processes by providing reliable intermediary services, corporate consulting, and professional coordination across international markets.
                </p>
                <div className="mt-6 h-px w-full bg-[#d8b765]/20" />
                <p className="mt-6 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#d8b765]">
                  How We Operate
                </p>
                <p className="mt-4 text-[1rem] leading-8 text-[#fff8ec]/72">
                  Integrity-led service delivery, verified partner networks, transparent communication, and professional standards across every engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── SERVICES ──────────────── */}
      <section className="relative z-10 overflow-hidden bg-[#fffaf0] px-5 py-20 text-[#15110d] sm:px-6 md:px-8 lg:py-32 xl:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_18%,rgba(197,155,86,0.16),transparent_28rem),linear-gradient(180deg,#fffdf8,#f6ead8)]" />
        <ExchangeBlueprint className="opacity-28" />

        <div className="relative mx-auto max-w-[1420px]">
          <ScrollReveal className="mx-auto max-w-[48rem] text-center">
            <p className="flex items-center justify-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#8b1118]">
              <span className="h-px w-10 bg-[#b88a44]" />
              Our Services
              <span className="h-px w-10 bg-[#b88a44]" />
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,4.8vw,5.6rem)] font-semibold leading-[0.88] tracking-[0] text-[#15110d]">
              Comprehensive OTC &amp; Intermediary Services
            </h2>
            <p className="mt-6 text-[1rem] font-medium leading-8 text-[#62594f] md:text-[1.08rem]">
              Institutional-grade transaction coordination, settlement governance, and cross-border deal execution for qualified counterparties.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── WHY CHOOSE ──────────────── */}
      <section id="why-otc-desk" className="relative z-10 overflow-hidden bg-[#110d0b] px-5 py-20 text-[#fff8ec] sm:px-6 md:px-8 lg:py-32 xl:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_64%_76%,rgba(216,183,101,0.12),transparent_28rem),radial-gradient(circle_at_24%_20%,rgba(139,17,24,0.15),transparent_30rem),linear-gradient(180deg,#15100d,#0d0a08)]" />
        <ExchangeBlueprint className="opacity-18" dark />

        <div className="relative mx-auto max-w-[1420px]">
          <ScrollReveal className="mx-auto max-w-[48rem] text-center">
            <p className="flex items-center justify-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#d8b765]">
              <span className="h-px w-10 bg-[#d8b765]" />
              Why Choose Us
              <span className="h-px w-10 bg-[#d8b765]" />
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,4.8vw,5.6rem)] font-semibold leading-[0.88] tracking-[0] text-[#fff8ec]">
              Service Advantages
            </h2>
            <p className="mt-6 text-[1rem] font-medium leading-8 text-[#fff8ec]/60 md:text-[1.08rem]">
              Built for deal conversations where authority, liquidity, privacy, and settlement proof must be aligned before movement.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoosePoints.map((point, index) => (
              <ScrollReveal key={point.title} delay={index * 0.03}>
                <div className="rounded-[8px] border border-[#d8b765]/14 bg-white/[0.04] p-6 transition-all duration-300 hover:border-[#d8b765]/30 hover:bg-white/[0.07]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d8b765]/30 text-[#d8b765] text-[0.7rem] font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-4 text-[0.95rem] font-bold text-[#fff8ec]">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-[0.85rem] leading-7 text-[#fff8ec]/58">
                    {point.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── PROCESS / WORKFLOW ──────────────── */}
      <section className="relative z-10 overflow-hidden bg-[#fffaf0] px-5 py-20 text-[#15110d] sm:px-6 md:px-8 lg:py-32 xl:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_82%,rgba(197,155,86,0.14),transparent_28rem),linear-gradient(180deg,#fffdf8,#f6ead8)]" />
        <ExchangeBlueprint className="opacity-28" />

        <div className="relative mx-auto max-w-[1420px]">
          <ScrollReveal className="mx-auto max-w-[48rem] text-center">
            <p className="flex items-center justify-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#8b1118]">
              <span className="h-px w-10 bg-[#b88a44]" />
              Our Process
              <span className="h-px w-10 bg-[#b88a44]" />
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,4.8vw,5.6rem)] font-semibold leading-[0.88] tracking-[0] text-[#15110d]">
              How We Work
            </h2>
            <p className="mt-6 text-[1rem] font-medium leading-8 text-[#62594f] md:text-[1.08rem]">
              Structured engagement framework from initial mandate review through settlement and record keeping.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <ScrollReveal key={step.step} delay={index * 0.05}>
                <div className="relative rounded-[8px] border border-[#dfcfaa] bg-white/76 p-6 shadow-[0_12px_36px_rgba(58,41,18,0.06)]">
                  <span className="font-display text-[2.4rem] font-bold leading-none text-[#d8b765]/40">
                    {step.step}
                  </span>
                  <h3 className="mt-3 text-[0.95rem] font-bold text-[#15110d]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.85rem] leading-7 text-[#62594f]">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── KEY FEATURES ──────────────── */}
      <section className="relative z-10 overflow-hidden bg-[#110d0b] px-5 py-20 text-[#fff8ec] sm:px-6 md:px-8 lg:py-32 xl:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_24%,rgba(139,17,24,0.18),transparent_28rem),radial-gradient(circle_at_22%_76%,rgba(216,183,101,0.12),transparent_30rem),linear-gradient(180deg,#15100d,#0d0a08)]" />
        <ExchangeBlueprint className="opacity-18" dark />

        <div className="relative mx-auto max-w-[1420px]">
          <ScrollReveal className="mx-auto max-w-[48rem] text-center">
            <p className="flex items-center justify-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#d8b765]">
              <span className="h-px w-10 bg-[#d8b765]" />
              Key Features
              <span className="h-px w-10 bg-[#d8b765]" />
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,4.8vw,5.6rem)] font-semibold leading-[0.88] tracking-[0] text-[#fff8ec]">
              Built for Trust &amp; Excellence
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {keyFeatures.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.04}>
                <div className="rounded-[8px] border border-[#d8b765]/14 bg-white/[0.04] p-7 transition-all duration-300 hover:border-[#d8b765]/28 hover:bg-white/[0.07]">
                  <CheckCircle2 className="h-6 w-6 text-[#d8b765]" strokeWidth={1.7} />
                  <h3 className="mt-4 text-[1rem] font-bold text-[#fff8ec]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[0.88rem] leading-7 text-[#fff8ec]/58">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── BUSINESS HIGHLIGHTS ──────────────── */}
      <section className="relative z-10 overflow-hidden border-y border-[#d8c59d]/30 bg-[#fffaf0] px-5 py-16 text-[#15110d] sm:px-6 md:px-8 lg:py-24 xl:px-12">
        <div className="relative mx-auto max-w-[1420px]">
          <div className="grid gap-8 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.08}>
                <div className="text-center">
                  <p className="font-display text-[clamp(3rem,5vw,4.8rem)] font-bold leading-none tracking-[0] text-[#8B1118]">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[#62594f]">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="mx-auto mt-12 max-w-[38rem] text-center">
            <div className="flex flex-wrap justify-center gap-4">
              {["Verified Service Desk", "Process Discipline", "Documented Outcomes"].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 rounded-full border border-[#dfcfaa] bg-white/60 px-5 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#8B1118]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8B1118]" />
                  {badge}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ──────────────── FAQ ──────────────── */}
      <section id="project-faq" className="relative z-10 overflow-hidden bg-[#110d0b] px-5 py-20 text-[#fff8ec] sm:px-6 md:px-8 lg:py-32 xl:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(216,183,101,0.10),transparent_30rem),linear-gradient(180deg,#15100d,#0d0a08)]" />
        <ExchangeBlueprint className="opacity-16" dark />

        <div className="relative mx-auto max-w-[880px]">
          <ScrollReveal className="text-center">
            <p className="flex items-center justify-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#d8b765]">
              <span className="h-px w-10 bg-[#d8b765]" />
              FAQ
              <span className="h-px w-10 bg-[#d8b765]" />
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,4.8vw,5.6rem)] font-semibold leading-[0.88] tracking-[0] text-[#fff8ec]">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>

          <div className="mt-12 space-y-6 rounded-[8px] border border-[#d8b765]/14 bg-white/[0.04] p-8 sm:p-10">
            {faqs.map((faq, index) => (
              <FaqItem key={faq.question} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── CTA ──────────────── */}
      <ContactCTA />
    </article>
  );
}

function ExchangeBlueprint({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      viewBox="0 0 1200 760"
      preserveAspectRatio="none"
      aria-hidden
    >
      <g fill="none" stroke={dark ? "rgba(216,183,101,0.44)" : "rgba(184,138,68,0.34)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1">
        <path data-re-draw-line d="M92 612 H1108" />
        <path data-re-draw-line d="M172 212 H1018" />
        <path data-re-draw-line d="M214 310 H958" />
        <path data-re-draw-line d="M256 408 H884" />
        <path data-re-draw-line d="M318 506 H792" />
        <path data-re-draw-line d="M214 212 V612" />
        <path data-re-draw-line d="M442 212 V612" />
        <path data-re-draw-line d="M670 212 V612" />
        <path data-re-draw-line d="M898 212 V612" />
        <path data-re-draw-line d="M172 612 C318 472 484 386 670 354 C812 330 928 274 1018 212" />
      </g>
    </svg>
  );
}
