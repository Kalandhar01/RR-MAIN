"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  BadgeCheck,
  HeartHandshake,
  ShieldCheck,
  TrendingUp,
  Target,
  Eye,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import dynamic from "next/dynamic";
import {
  type DirectorProfileCardProps,
} from "@/components/DirectorProfileCard";
import {
  DirectorFounderCard,
  DirectorDesktopCard,
} from "@/components/DirectorDesktopCard";

const DirectorProfileCard = dynamic(
  () => import("@/components/DirectorProfileCard").then((mod) => mod.default),
  { ssr: true }
);

const ease = [0.22, 1, 0.36, 1] as const;

const directorsData: DirectorProfileCardProps[] = [
  {
    slug: "founder",
    image: "/directors/founder.png",
    label: "FOUNDER",
    firstName: "Ar.P.M.S.Noorul",
    lastName: "Fawaaz",
    qualification: "B.Arch., A.I.I.A.",
    designation: "Chairman & Founder",
    company: "RACTYSH GROUP",
    quote: "A leader is one who knows the way, goes the way, and shows the way.",
    description:
      "Leading the Ractysh ecosystem across Architecture, Construction, Real Estate, Import-Export and OTC Exchange \u2014 built on long-term vision, institutional discipline and enterprise-grade execution.",
    expertise: [
      { icon: "DraftingCompass", title: "Architecture" },
      { icon: "HardHat", title: "Construction" },
      { icon: "Landmark", title: "Real Estate" },
      { icon: "Globe", title: "Global Trade" },
    ],
    email: "fawaaz@ractysh.com",
    phone: "+91-98765-43200",
  },
  {
    slug: "ashok-kumar",
    firstName: "Ashok Kumar.",
    lastName: "M",
    qualification: "B.Sc. Physics",
    designation: "Managing Director",
    company: "RACTYSH ASSOCIATES PRIVATE LIMITED",
    quote:
      "Building enterprise trust through strategic vision, financial discipline, and operational excellence.",
    description:
      "Ashok Kumar provides strategic direction for RACTYSH Associates, contributing to business development, financial planning, operational management, and long-term enterprise growth. His practical leadership supports the company\u2019s commitment to delivering trusted financial and intermediary services with professionalism and integrity.",
    expertise: [
      { icon: "TrendingUp", title: "Business Strategy" },
      { icon: "Landmark", title: "Financial Operations" },
      { icon: "Briefcase", title: "Enterprise Management" },
      { icon: "Users", title: "Client Relations" },
    ],
    email: "ashok@ractysh.com",
    phone: "+91-98765-43210",
  },
  {
    slug: "naveen",
    firstName: "C.",
    lastName: "Naveen",
    qualification: "B.Arch., BIM",
    designation: "Director",
    company: "RACTYSH DESIGN PRIVATE LIMITED",
    quote:
      "Designing spaces that merge architectural innovation with sustainable functionality.",
    description:
      "C. Naveen leads architectural planning and design innovation at RACTYSH Design. With expertise in Building Information Modeling (BIM) and modern architectural practices, he oversees the delivery of sustainable, functional, and aesthetically refined projects across residential, commercial, and institutional sectors.",
    expertise: [
      { icon: "Palette", title: "Architecture" },
      { icon: "DraftingCompass", title: "BIM Technology" },
      { icon: "HeartHandshake", title: "Sustainable Design" },
      { icon: "Target", title: "Project Management" },
    ],
    email: "naveen@ractysh.com",
    phone: "+91-98765-43211",
  },
  {
    slug: "subash",
    image: "/directors/subash.png",
    firstName: "A.",
    lastName: "Subash",
    qualification: "B.E. Civil",
    designation: "Director",
    company: "RACTYSH INFRA PRIVATE LIMITED",
    quote:
      "Engineering infrastructure that stands the test of time with precision and safety.",
    description:
      "A. Subash leads the engineering and construction operations of RACTYSH Infra Private Limited. With a strong background in Civil Engineering, he oversees project planning, structural execution, quality assurance, site management, and timely project delivery. His focus on precision, safety, and sustainable construction ensures every project meets the highest industry standards.",
    expertise: [
      { icon: "HardHat", title: "Civil Engineering" },
      { icon: "Building2", title: "Infrastructure Dev" },
      { icon: "Ruler", title: "Construction Mgmt" },
      { icon: "ShieldCheck", title: "Quality Assurance" },
    ],
    email: "subash@ractysh.com",
    phone: "+91-98765-43212",
  },
  {
    slug: "mohamed-jamaldheen",
    image: "/directors/mohamed-jamaldheen.png",
    honorific: "Mr.",
    firstName: "B. Mohamed",
    lastName: "Jamaldheen",
    qualification: "B.Com., ADCAA",
    designation: "Director",
    company: "RACTYSH EXIM PRIVATE LIMITED",
    quote:
      "Leading global trade through innovation, trusted partnerships, and strategic international commerce.",
    description:
      "B. Mohamed Jamaldheen oversees the international operations of RACTYSH EXIM PRIVATE LIMITED, driving global sourcing, export strategy, trade finance, and cross-border partnerships while ensuring operational excellence across international markets.",
    expertise: [
      { icon: "Globe", title: "Global Trade" },
      { icon: "Ship", title: "Export Operations" },
      { icon: "Package", title: "Supply Chain" },
      { icon: "CreditCard", title: "Trade Finance" },
    ],
    email: "jamaldheen@ractysh.com",
    phone: "+91-98765-43213",
  },
];

const leadershipValues = [
  {
    title: "Integrity",
    description:
      "Uncompromising ethical standards guide every business decision and client relationship.",
    Icon: ShieldCheck,
  },
  {
    title: "Innovation",
    description:
      "Embracing modern methodologies and creative solutions across all enterprise divisions.",
    Icon: TrendingUp,
  },
  {
    title: "Excellence",
    description:
      "Relentless pursuit of quality in every project, service and client engagement.",
    Icon: BadgeCheck,
  },
  {
    title: "Collaboration",
    description:
      "Fostering cross-divisional synergy and strong partnerships for collective success.",
    Icon: HeartHandshake,
  },
  {
    title: "Accountability",
    description:
      "Clear ownership and documented processes ensure transparent and reliable delivery.",
    Icon: Target,
  },
  {
    title: "Vision",
    description:
      "Long-term strategic thinking that builds enduring value across generations.",
    Icon: Eye,
  },
];

export default function DirectorsExecutivePage() {
  return (
    <div className="relative isolate overflow-hidden bg-[#f8f3ea] text-[#1c120e]"
    >
      <DirectorsBackground />

      {/* ═══════════════ 1. EXECUTIVE HERO ═══════════════ */}
      <section className="relative z-10 overflow-hidden">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10 lg:px-14 xl:px-16">
          <div className="flex min-h-[60svh] flex-col items-center justify-center pt-28 pb-12 text-center md:pt-36 md:pb-16 lg:min-h-[70svh]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#8b1118]">
                Executive Leadership
              </p>
              <h1 className="mt-4 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.03em] text-[#20130f] md:text-[3.4rem] lg:text-[4rem]">
                Directors of RACTYSH Group
              </h1>
              <p className="mx-auto mt-4 max-w-[34rem] text-[15px] leading-[1.7] text-[#675a4f] md:text-[17px]">
                Four distinguished leaders guiding the RACTYSH ecosystem across
                Associates, Design, Infra and Exim enterprises &mdash; driving
                growth with vision, integrity and operational excellence.
              </p>
            </motion.div>

            <HeroStats />
          </div>
        </div>
      </section>

      {/* ═══════════════ 2. DIRECTOR PROFILES ═══════════════ */}
      {/* Mobile: full stacked profiles */}
      <div className="lg:hidden">
        {directorsData.map((director) => (
          <DirectorProfileCard key={director.slug} {...director} showConnect={false} />
        ))}
      </div>
      {/* Desktop: premium executive showcase */}
      <section className="hidden px-6 py-20 lg:block lg:px-14 xl:px-16">
        <div className="mx-auto max-w-[1500px]">
          {/* Founder */}
          <div className="flex justify-center">
            <DirectorFounderCard data={directorsData[0]} index={0} />
          </div>

          {/* Directors 2-column grid */}
          <div className="mt-24 grid gap-12 lg:grid-cols-2 xl:gap-14">
            {directorsData.slice(1).map((director, i) => (
              <DirectorDesktopCard key={director.slug} data={director} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 3. LEADERSHIP VALUES ═══════════════ */}
      <section className="relative z-10 overflow-hidden bg-[#0a0806] py-20 md:py-28 lg:py-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_24%_46%,rgba(214,180,95,0.06),transparent_44rem),radial-gradient(ellipse_at_76%_54%,rgba(139,17,24,0.08),transparent_40rem),linear-gradient(180deg,#0a0806_0%,#100b09_50%,#0a0806_100%)]" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,rgba(240,219,177,0.18)_1px,transparent_0)] [background-size:14px_14px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9bd7a]/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d9bd7a]/30 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-[82rem] px-5 md:px-8">
          <ScrollReveal className="mb-12 text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.25em] text-[#d9bd7a]/70">
              Leadership Values
            </p>
            <h2 className="mt-3 font-display text-[1.6rem] font-semibold leading-[1.08] tracking-[-0.035em] text-[#f5ebd6] md:text-[2rem] lg:text-[2.4rem]">
              The principles that guide our directors.
            </h2>
            <p className="mx-auto mt-3 max-w-[36rem] text-[15px] text-[#cbbaa0] md:text-[16px]">
              Every decision, partnership and enterprise move is measured
              against these six core values.
            </p>
          </ScrollReveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {leadershipValues.map(({ title, description, Icon }, index) => (
              <ScrollReveal key={title} delay={index * 0.06}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.34, ease }}
                  className="group relative overflow-hidden rounded-[1.35rem] border border-[#d9bd7a]/20 bg-white/[0.04] p-6 backdrop-blur-sm md:p-7"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6b45f]/60 to-transparent opacity-60" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-[0.85rem] border border-[#d6b45f]/40 bg-[#d9bd7a]/8 text-[#d9bd7a] shadow-[0_10px_24px_rgba(214,180,95,0.06)]">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-6 font-display text-[1.1rem] font-semibold leading-tight text-[#f5ebd6]">
                    {title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#cbbaa0]">
                    {description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 4. BOARD MESSAGE ═══════════════ */}
      <section className="relative z-10 px-5 py-16 md:px-8 md:py-24 lg:py-32">
        <div className="mx-auto max-w-[82rem]">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <ScrollReveal>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.25em] text-[#8b1118]">
                Board Message
              </p>
              <h2 className="mt-4 font-display text-[1.6rem] font-semibold leading-[1.08] tracking-[-0.035em] text-[#20130f] md:text-[2rem] lg:text-[2.4rem]">
                A message from the board of directors.
              </h2>
              <div className="mt-6 space-y-5 text-[15px] leading-[1.8] text-[#675a4f] md:text-[16px]">
                <p>
                  The RACTYSH Group stands on the foundation of collective
                  leadership. Our board of directors brings together diverse
                  expertise across finance, architecture, engineering and global
                  trade &mdash; unified by a shared commitment to excellence,
                  integrity and long-term enterprise value.
                </p>
                <p>
                  Each director leads a distinct operating division while
                  contributing to the group&apos;s strategic direction. This
                  structure ensures focused execution within each enterprise
                  while maintaining cohesive governance across the entire
                  ecosystem.
                </p>
                <p className="text-[14px] font-medium italic text-[#8b1118]/80">
                  &mdash; Driving sustainable growth through disciplined
                  leadership and shared vision.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="relative overflow-hidden rounded-[1.25rem] border border-[#d9c28c]/50 bg-[#fffaf0] shadow-[0_28px_80px_rgba(82,52,25,0.1)]">
                <div className="aspect-[4/3]">
                  <Image
                    src="/images/photo-1486406146926-c627a92ad1ab.webp"
                    alt="RACTYSH Group enterprises"
                    fill
                    quality={85}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#120c08]/80 via-[#120c08]/30 to-transparent p-6 pt-16">
                  <p className="font-display text-[1.1rem] font-semibold text-[#f5ebd6]">
                    The Board of Directors
                  </p>
                  <p className="mt-1 text-[13px] font-medium text-[#d9bd7a]/80">
                    RACTYSH Group of Companies
                  </p>
                </div>
                <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/5" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. CTA ═══════════════ */}
      <section className="relative z-10 px-5 pb-16 md:px-8 lg:pb-24">
        <ScrollReveal>
          <div className="mx-auto max-w-[82rem] overflow-hidden rounded-[1.5rem] border border-[#d8bd79]/55 bg-[#fffaf0]/80 p-6 shadow-[0_24px_70px_rgba(82,49,20,0.08)] backdrop-blur-sm md:flex md:items-center md:justify-between md:p-10">
            <div>
              <div className="flex items-center gap-3">
                <BadgeCheck className="h-5 w-5 text-[#8b1118]" strokeWidth={1.9} />
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#a27b2d]">
                  Executive Access
                </p>
              </div>
              <h2 className="mt-4 font-display text-[1.3rem] font-semibold leading-[1.08] tracking-[-0.035em] text-[#20130f] md:text-[1.6rem] lg:text-[1.8rem]">
                Connect With Our Directors
              </h2>
              <p className="mt-3 max-w-[36rem] text-[15px] leading-[1.7] text-[#675a4f] md:text-[16px]">
                Route strategic inquiries through a structured consultation
                desk for private enterprise conversations with our director
                offices.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
              <Link
                href="/book-consultation"
                className="group inline-flex min-h-[2.8rem] items-center justify-center gap-2 rounded-[6px] border border-[#8b1118]/30 bg-[#8b1118] px-5 text-[0.85rem] font-semibold leading-none text-white shadow-[0_12px_30px_rgba(139,17,24,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7a0e14]"
              >
                Book Consultation
                <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/about"
                className="group inline-flex min-h-[2.8rem] items-center justify-center gap-2 rounded-[6px] border border-[#d9c28c]/50 bg-white/60 px-5 text-[0.85rem] font-semibold leading-none text-[#20130f] shadow-[0_8px_24px_rgba(82,52,25,0.04)] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_30px_rgba(82,52,25,0.08)]"
              >
                About RACTYSH
                <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

/* ─── Animated Hero Stats ─── */

function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease }}
      className="mt-10 grid w-full max-w-[52rem] grid-cols-2 gap-px rounded-[1rem] border border-[#d9c28c]/30 bg-[#d9c28c]/20 md:grid-cols-4"
    >
      {[
        { value: 4, label: "Director Offices", suffix: "" },
        { value: 5, label: "Enterprise Divisions", suffix: "" },
        { value: 50, label: "Combined Projects", suffix: "+" },
        { value: 10, label: "Years Experience", suffix: "+" },
      ].map(({ value, label, suffix }) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center bg-[#f8f3ea]/90 py-6 text-center backdrop-blur-sm"
        >
          <span className="font-display text-[2rem] font-bold leading-none tracking-[-0.02em] text-[#20130f] md:text-[2.4rem]">
            <StatCounter target={value} suffix={suffix} />
          </span>
          <span className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-[#8b1118]">
            {label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

function StatCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null!);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const span = ref.current;
    const duration = 2000;
    const startTime = performance.now();
    let rafId: number;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      span.textContent = Math.round(eased * target).toString() + suffix;
      if (progress < 1) rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ─── Background ─── */

function DirectorsBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_4%,rgba(255,255,255,0.94),transparent_34rem),radial-gradient(circle_at_14%_18%,rgba(214,180,95,0.18),transparent_34rem),radial-gradient(circle_at_86%_48%,rgba(139,17,24,0.1),transparent_33rem),linear-gradient(180deg,#fbf3e6_0%,#f7efe1_44%,#f9f2e7_100%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle_at_1px_1px,rgba(55,39,22,0.32)_1px,transparent_0)] [background-size:11px_11px]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(0deg,rgba(67,43,25,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(67,43,25,0.42)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#fff8eb]/68 to-transparent" />
    </div>
  );
}
