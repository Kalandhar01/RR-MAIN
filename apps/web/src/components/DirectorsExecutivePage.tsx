"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Eye,
  Globe2,
  Handshake,
  HardHat,
  Landmark,
  Leaf,
  ShieldCheck,
  Target,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/components/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1] as const;

const directors = [
  {
    name: "Ashok Kumar. M",
    qualification: "B.Sc. Physics",
    position: "Director",
    company: "RACTYSH ASSOCIATES PRIVATE LIMITED",
    description:
      "Ashok Kumar provides strategic direction for RACTYSH Associates, contributing to business development, financial planning, operational management, and long-term enterprise growth. His practical leadership supports the company\u2019s commitment to delivering trusted financial and intermediary services with professionalism and integrity.",
    badges: ["Business Strategy", "Financial Operations", "Enterprise Management", "Client Relations"],
    initial: "A"
  },
  {
    name: "C. Naveen",
    qualification: "B.Arch., BIM",
    position: "Director",
    company: "RACTYSH DESIGN PRIVATE LIMITED",
    description:
      "C. Naveen leads architectural planning and design innovation at RACTYSH Design. With expertise in Building Information Modeling (BIM) and modern architectural practices, he oversees the delivery of sustainable, functional, and aesthetically refined projects across residential, commercial, and institutional sectors.",
    badges: ["Architecture", "BIM", "Sustainable Design", "Project Management"],
    initial: "C"
  },
  {
    name: "A. Subash",
    qualification: "B.E. Civil",
    position: "Director",
    company: "RACTYSH INFRA PRIVATE LIMITED",
    description:
      "A. Subash leads the engineering and construction operations of RACTYSH Infra Private Limited. With a strong background in Civil Engineering, he oversees project planning, structural execution, quality assurance, site management, and timely project delivery. His focus on precision, safety, and sustainable construction practices ensures that every infrastructure project is completed to the highest industry standards while delivering long-term value to clients.",
    badges: [
      "Civil Engineering",
      "Infrastructure Development",
      "Construction Management",
      "Structural Execution",
      "Project Planning",
      "Quality Assurance"
    ],
    initial: "A"
  }
];

const principles = [
  {
    title: "Vision Driven",
    description: "Every decision aligns with a clear long-term enterprise vision across all divisions.",
    Icon: Eye
  },
  {
    title: "Innovation First",
    description: "We embrace modern methodologies, technology and design thinking across every discipline.",
    Icon: TrendingUp
  },
  {
    title: "Ethical Governance",
    description: "Transparency, compliance and ethical business practices form the foundation of our leadership.",
    Icon: ShieldCheck
  },
  {
    title: "Client Commitment",
    description: "Our directors maintain direct accountability to every client engagement and partnership.",
    Icon: Handshake
  },
  {
    title: "Sustainable Development",
    description: "Long-term environmental and social responsibility guide our business and project decisions.",
    Icon: Leaf
  },
  {
    title: "Long-Term Growth",
    description: "Strategic investments in people, systems and capabilities that compound over decades.",
    Icon: TrendingUp
  }
];

const leadershipStructure = [
  { title: "RACTYSH Group", subtitle: "Leadership", description: "Integrated enterprise governance across all divisions." },
  { title: "RACTYSH Design Pvt Ltd", subtitle: "Architecture & Interiors", description: "Premium architectural and interior design services." },
  { title: "RACTYSH Associates Pvt Ltd", subtitle: "Intermediary Services", description: "Financial and business intermediary solutions." },
  { title: "RACTYSH Infra Pvt Ltd", subtitle: "Infrastructure & Engineering", description: "Civil engineering, project planning and structural execution." },
  { title: "Construction Division", subtitle: "Infrastructure & Execution", description: "Turnkey construction and project management." },
  { title: "Real Estate Division", subtitle: "Property & Assets", description: "Asset positioning and property development." },
  { title: "Import & Export Division", subtitle: "Global Trade", description: "Cross-border trade and supplier coordination." }
];

const whyLeadership = [
  {
    title: "Industry Experience",
    description: "Decades of combined experience across architecture, finance, engineering and business.",
    Icon: Building2
  },
  {
    title: "Strategic Decision Making",
    description: "Data-driven, long-term oriented decisions that prioritize sustainable value creation.",
    Icon: Target
  },
  {
    title: "Innovation Focus",
    description: "Continuous investment in modern tools, BIM, digital infrastructure and design technology.",
    Icon: TrendingUp
  },
  {
    title: "Transparent Governance",
    description: "Clear reporting structures, compliance frameworks and stakeholder communication.",
    Icon: ShieldCheck
  },
  {
    title: "Sustainable Growth",
    description: "Growth strategies designed to deliver value across multiple generations of enterprise activity.",
    Icon: Leaf
  },
  {
    title: "Client-Centric Leadership",
    description: "Every division operates with the client\u2019s long-term interests at the core of decision making.",
    Icon: Handshake
  }
];

function FounderBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFCF8_0%,#F8F3EA_50%,#F3EDE0_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 28% 18%, rgba(214,180,95,0.3) 0%, transparent 52%), radial-gradient(circle at 72% 82%, rgba(139,17,24,0.08) 0%, transparent 48%)"
        }}
      />
      <div
        className="absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(214,180,95,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(214,180,95,0.15) 1px, transparent 1px)",
          backgroundSize: "64px 64px"
        }}
      />
    </div>
  );
}

export default function DirectorsExecutivePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-countup]").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") || "0", 10);
        const suffix = el.getAttribute("data-suffix") || "";
        gsap.fromTo(
          el,
          { textContent: "0" },
          {
            textContent: target,
            duration: 2.2,
            ease: "power3.out",
            snap: { textContent: 1 },
            scrollTrigger: { trigger: el.closest("[data-countup-section]") || el, start: "top 78%" },
            onUpdate() {
              el.textContent = Math.round(parseFloat(el.textContent || "0")).toString() + suffix;
            }
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative isolate overflow-hidden bg-[#f8f3ea] text-[#1c120e]">
      <FounderBackground />

      {/* ═══════════════ 1. HERO ═══════════════ */}
      <section className="relative z-10 overflow-hidden bg-[#f8f3ea]">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10 lg:px-14 xl:px-16">
          {/* Mobile */}
          <div className="flex flex-col items-center pt-20 md:hidden">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="w-full text-center"
            >
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#8b1118]">Leadership</p>
              <h1 className="mt-4 font-display text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.02em] text-[#20130f]">
                Meet the Directors Driving the RACTYSH Vision.
              </h1>
              <p className="mx-auto mt-4 max-w-[24rem] text-[14px] leading-[1.7] text-[#7d7062]">
                Behind every successful enterprise is a team of visionary leaders committed to innovation, governance,
                strategic growth, and operational excellence. The Directors of RACTYSH Group bring together expertise
                across architecture, finance, engineering, and business development to build a future-focused enterprise
                ecosystem.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="#directors"
                  className="group inline-flex min-h-[2.8rem] items-center justify-center gap-2 rounded-[6px] border border-[#8b1118]/30 bg-[#8b1118] px-5 text-[0.85rem] font-semibold leading-none text-white shadow-[0_12px_30px_rgba(139,17,24,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7a0e14]"
                >
                  Explore Leadership
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="#board-message"
                  className="group inline-flex min-h-[2.8rem] items-center justify-center gap-2 rounded-[6px] border border-[#d9bd7a]/40 bg-white/70 px-5 text-[0.85rem] font-semibold leading-none text-[#20130f] shadow-[0_4px_16px_rgba(82,52,25,0.06)] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_28px_rgba(82,52,25,0.1)]"
                >
                  Contact Leadership
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Tablet */}
          <div className="hidden md:flex md:flex-col md:items-center md:pt-28 lg:hidden">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="w-full max-w-[38rem] text-center"
            >
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#8b1118]">Leadership</p>
              <h1 className="mt-4 font-display text-[3rem] font-semibold leading-[1.02] tracking-[-0.02em] text-[#20130f]">
                Meet the Directors Driving the RACTYSH Vision.
              </h1>
              <p className="mx-auto mt-5 max-w-[32rem] text-[15px] leading-[1.7] text-[#7d7062]">
                Behind every successful enterprise is a team of visionary leaders committed to innovation, governance,
                strategic growth, and operational excellence. The Directors of RACTYSH Group bring together expertise
                across architecture, finance, engineering, and business development to build a future-focused enterprise
                ecosystem.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  href="#directors"
                  className="group inline-flex min-h-[2.8rem] items-center justify-center gap-2 rounded-[6px] border border-[#8b1118]/30 bg-[#8b1118] px-5 text-[0.85rem] font-semibold leading-none text-white shadow-[0_12px_30px_rgba(139,17,24,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7a0e14]"
                >
                  Explore Leadership
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="#board-message"
                  className="group inline-flex min-h-[2.8rem] items-center justify-center gap-2 rounded-[6px] border border-[#d9bd7a]/40 bg-white/70 px-5 text-[0.85rem] font-semibold leading-none text-[#20130f] shadow-[0_4px_16px_rgba(82,52,25,0.06)] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_28px_rgba(82,52,25,0.1)]"
                >
                  Contact Leadership
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Desktop */}
          <div className="hidden min-h-[88svh] lg:grid lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
              className="max-w-[56rem]"
            >
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-[#8b1118]">Leadership</p>
              <h1 className="mt-6 font-display text-[4.2rem] font-semibold leading-[0.95] tracking-[-0.03em] text-[#20130f] xl:text-[5rem]">
                Meet the Directors Driving the RACTYSH Vision.
              </h1>
              <p className="mt-5 max-w-[46rem] text-[1.05rem] leading-[1.8] text-[#7d7062]">
                Behind every successful enterprise is a team of visionary leaders committed to innovation, governance,
                strategic growth, and operational excellence. The Directors of RACTYSH Group bring together expertise
                across architecture, finance, engineering, and business development to build a future-focused enterprise
                ecosystem.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="#directors"
                  className="group inline-flex min-h-[2.8rem] items-center justify-center gap-2 rounded-[6px] border border-[#8b1118]/30 bg-[#8b1118] px-5 text-[0.85rem] font-semibold leading-none text-white shadow-[0_12px_30px_rgba(139,17,24,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7a0e14]"
                >
                  Explore Leadership
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="#board-message"
                  className="group inline-flex min-h-[2.8rem] items-center justify-center gap-2 rounded-[6px] border border-[#d9bd7a]/40 bg-white/70 px-5 text-[0.85rem] font-semibold leading-none text-[#20130f] shadow-[0_4px_16px_rgba(82,52,25,0.06)] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_28px_rgba(82,52,25,0.1)]"
                >
                  Contact Leadership
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TRUST METRICS ═══════════════ */}
      <section className="relative z-10 border-t border-[#d9c28c]/20 bg-[#f5ede0]">
        <div className="mx-auto max-w-[82rem] px-5 md:px-8">
          <div className="grid grid-cols-2 gap-px bg-[#d9c28c]/20 md:grid-cols-4">
            {[
              { value: "6", label: "Divisions" },
              { value: "3", label: "Director Offices" },
              { value: "100+", label: "Enterprise Projects" },
              { value: "5+", label: "Years of Leadership" }
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center bg-[#f5ede0] py-8 text-center md:py-10"
              >
                <span className="font-display text-[1.8rem] font-bold leading-none tracking-[-0.02em] text-[#20130f] md:text-[2.2rem]">
                  {value}
                </span>
                <span className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-[#8b1118]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 2. LEADERSHIP INTRODUCTION ═══════════════ */}
      <section className="relative z-10 px-5 py-20 md:px-10 md:py-24 lg:px-14 xl:px-16">
        <div className="mx-auto max-w-[82rem]">
          <ScrollReveal className="max-w-[40rem]">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[#8b1118]">Board Leadership</p>
            <h2 className="mt-4 font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[#20130f] md:text-[2.7rem]">
              Leadership Built on Vision, Integrity &amp; Innovation
            </h2>
            <p className="mt-5 text-[15px] leading-[1.8] text-[#7d7062] md:text-[16px]">
              At RACTYSH Group, our Directors provide strategic leadership across multiple business divisions, ensuring
              every company operates with professionalism, transparency, and long-term value creation. Their combined
              expertise strengthens our commitment to delivering excellence across architecture, construction, finance,
              real estate, import &amp; export, and enterprise services.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════ 3. DIRECTORS CARDS ═══════════════ */}
      <section id="directors" className="relative z-10 px-5 pb-20 md:px-10 md:pb-28 lg:px-14 xl:px-16">
        <div className="mx-auto max-w-[82rem]">
          <div className="grid gap-10 md:grid-cols-2 md:gap-8 lg:gap-12">
            {directors.map((director, index) => (
              <ScrollReveal key={director.name} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease }}
                  className="group relative overflow-hidden rounded-[12px] border border-[#d9c28c]/30 bg-white/60 p-6 shadow-[0_24px_80px_rgba(82,52,25,0.06)] backdrop-blur-xl transition-all duration-500 hover:border-[#d9bd7a]/60 hover:shadow-[0_32px_100px_rgba(82,52,25,0.12)] md:p-8 lg:p-10"
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,rgba(214,180,95,0.12),transparent_68%)]" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9bd7a]/40 to-transparent" />

                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[10px] bg-[#20130f] text-[1.5rem] font-bold text-[#d9bd7a] shadow-[0_8px_24px_rgba(32,19,15,0.12)] md:h-20 md:w-20 md:text-[1.8rem]">
                      {director.initial}
                    </div>
                    <div>
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#8b1118]">
                        {director.position}
                      </p>
                      <h3 className="mt-1 font-display text-[1.4rem] font-semibold leading-tight tracking-[-0.03em] text-[#20130f] md:text-[1.7rem]">
                        {director.name}
                      </h3>
                      <p className="mt-0.5 text-[13px] font-medium text-[#8b7a62]">{director.qualification}</p>
                    </div>
                  </div>

                  <p className="mt-5 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-[#9a7428]">
                    {director.company}
                  </p>

                  <p className="mt-3 text-[14px] leading-[1.8] text-[#62584e] md:text-[15px]">
                    {director.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {director.badges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-[4px] border border-[#d9c28c]/30 bg-[#d9bd7a]/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[#7a642e]"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 4. LEADERSHIP PRINCIPLES ═══════════════ */}
      <section className="relative z-10 border-t border-[#d9c28c]/20 bg-[#f3ede0] px-5 py-20 md:px-10 md:py-24 lg:px-14 xl:px-16">
        <div className="mx-auto max-w-[82rem]">
          <ScrollReveal className="text-center">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[#8b1118]">Guiding Principles</p>
            <h2 className="mt-4 font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[#20130f] md:text-[2.7rem]">
              Leadership Principles
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle, index) => {
              const Icon = principle.Icon;
              return (
                <ScrollReveal key={principle.title} delay={index * 0.04}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.35, ease }}
                    className="group rounded-[10px] border border-[#d9c28c]/25 bg-white/55 p-6 shadow-[0_12px_40px_rgba(82,52,25,0.04)] backdrop-blur-sm transition-all duration-400 hover:border-[#d9bd7a]/50 hover:bg-white/80 hover:shadow-[0_20px_60px_rgba(82,52,25,0.08)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#20130f] text-[#d9bd7a] shadow-[0_4px_14px_rgba(32,19,15,0.08)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-[1.1rem] font-semibold tracking-[-0.02em] text-[#20130f]">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.7] text-[#62584e]">{principle.description}</p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. BUSINESS LEADERSHIP ═══════════════ */}
      <section className="relative z-10 px-5 py-20 md:px-10 md:py-24 lg:px-14 xl:px-16">
        <div className="mx-auto max-w-[82rem]">
          <ScrollReveal className="text-center">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[#8b1118]">Enterprise Structure</p>
            <h2 className="mt-4 font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[#20130f] md:text-[2.7rem]">
              Business Leadership
            </h2>
            <p className="mx-auto mt-4 max-w-[36rem] text-[15px] leading-[1.8] text-[#7d7062]">
              Every division operates under one integrated leadership ecosystem, ensuring consistent governance,
              strategic alignment and operational excellence across the entire RACTYSH Group.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {leadershipStructure.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.35, ease }}
                  className="relative overflow-hidden rounded-[10px] border border-[#d9c28c]/25 bg-white/55 p-6 shadow-[0_12px_40px_rgba(82,52,25,0.04)] backdrop-blur-sm transition-all duration-400 hover:border-[#d9bd7a]/50 hover:bg-white/80 hover:shadow-[0_20px_60px_rgba(82,52,25,0.08)]"
                >
                  <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-[radial-gradient(circle_at_100%_0,rgba(214,180,95,0.08),transparent_68%)]" />
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#8b1118]">{item.subtitle}</p>
                  <h3 className="mt-2 font-display text-[1.15rem] font-semibold tracking-[-0.02em] text-[#20130f]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.7] text-[#62584e]">{item.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 6. WHY OUR LEADERSHIP ═══════════════ */}
      <section className="relative z-10 border-t border-[#d9c28c]/20 bg-[#f3ede0] px-5 py-20 md:px-10 md:py-24 lg:px-14 xl:px-16">
        <div className="mx-auto max-w-[82rem]">
          <ScrollReveal className="text-center">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[#8b1118]">Why Our Leadership</p>
            <h2 className="mt-4 font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[#20130f] md:text-[2.7rem]">
              Built on Experience &amp; Trust
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyLeadership.map((item, index) => {
              const Icon = item.Icon;
              return (
                <ScrollReveal key={item.title} delay={index * 0.04}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.35, ease }}
                    className="group rounded-[10px] border border-[#d9c28c]/25 bg-white/55 p-6 shadow-[0_12px_40px_rgba(82,52,25,0.04)] backdrop-blur-sm transition-all duration-400 hover:border-[#d9bd7a]/50 hover:bg-white/80 hover:shadow-[0_20px_60px_rgba(82,52,25,0.08)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#20130f] text-[#d9bd7a] shadow-[0_4px_14px_rgba(32,19,15,0.08)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-[1.1rem] font-semibold tracking-[-0.02em] text-[#20130f]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.7] text-[#62584e]">{item.description}</p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ 7. MESSAGE FROM THE BOARD ═══════════════ */}
      <section id="board-message" className="relative z-10 px-5 py-20 md:px-10 md:py-28 lg:px-14 xl:px-16">
        <div className="mx-auto max-w-[82rem]">
          <div className="relative overflow-hidden rounded-[16px] border border-[#d9c28c]/30 bg-[linear-gradient(135deg,#20130f_0%,#2d1f18_50%,#1a110d_100%)] p-8 shadow-[0_32px_100px_rgba(32,19,15,0.2)] md:p-12 lg:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(214,180,95,0.1),transparent_68%)]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(214,180,95,0.06),transparent_68%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9bd7a]/30 to-transparent" />

            <ScrollReveal>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#d9bd7a]/70">
                Message from the Board
              </p>
              <h2 className="mt-4 font-display text-[1.8rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[#f5ebd6] md:text-[2.4rem] lg:text-[2.8rem]">
                Building Tomorrow Through Responsible Leadership
              </h2>
              <p className="mt-5 max-w-[42rem] text-[15px] leading-[1.9] text-[#cbbaa0] md:text-[16px]">
                Our mission is to build businesses that create lasting value through innovation, trust, and disciplined
                execution. Every decision is guided by integrity, professionalism, and a commitment to excellence for our
                clients, partners, and communities.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <span className="h-px w-10 bg-[#d9bd7a]/40" />
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#d9bd7a]/60">
                  Board of Directors — RACTYSH Group
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ 8. CTA ═══════════════ */}
      <section className="relative z-10 border-t border-[#d9c28c]/20 bg-[#f5ede0] px-5 py-20 text-center md:px-10 md:py-28 lg:px-14 xl:px-16">
        <div className="mx-auto max-w-[42rem]">
          <ScrollReveal>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[#8b1118]">Get In Touch</p>
            <h2 className="mt-4 font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[#20130f] md:text-[2.7rem]">
              Connect With Our Leadership Team
            </h2>
            <p className="mx-auto mt-4 max-w-[32rem] text-[15px] leading-[1.8] text-[#7d7062]">
              Learn more about the people shaping the future of RACTYSH Group and explore opportunities for
              collaboration across our business ecosystem.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/book-consultation"
                className="group inline-flex min-h-[2.8rem] items-center justify-center gap-2 rounded-[6px] border border-[#8b1118]/30 bg-[#8b1118] px-6 text-[0.85rem] font-semibold leading-none text-white shadow-[0_12px_30px_rgba(139,17,24,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7a0e14]"
              >
                Contact Directors
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/about"
                className="group inline-flex min-h-[2.8rem] items-center justify-center gap-2 rounded-[6px] border border-[#d9bd7a]/40 bg-white/70 px-6 text-[0.85rem] font-semibold leading-none text-[#20130f] shadow-[0_4px_16px_rgba(82,52,25,0.06)] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_28px_rgba(82,52,25,0.1)]"
              >
                Explore Companies
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
