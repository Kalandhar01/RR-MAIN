"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  ArrowUpRight,
  Sparkles,
  MapPin,
  Clock,
  Briefcase,
  Star,
  Monitor,
  BookOpen,
  Building2,
  Globe,
  Award,
  Heart,
  HardHat,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CareerApplicationModal } from "@/components/CareerApplicationModal";

const ease = [0.22, 1, 0.36, 1] as const;

const whyJoinUs = [
  {
    title: "Remote Flexibility",
    description: "Work from anywhere in India. We trust you to deliver excellence.",
    icon: Globe,
    gradient: "from-[#C9A15A]/10 to-transparent",
  },
  {
    title: "Career Growth",
    description: "Clear progression path with mentorship and regular performance reviews.",
    icon: Award,
    gradient: "from-[#8b1118]/10 to-transparent",
  },
  {
    title: "Learning Culture",
    description: "Annual learning budget for courses, conferences, and certifications.",
    icon: BookOpen,
    gradient: "from-[#22c55e]/10 to-transparent",
  },
  {
    title: "Modern Tech Stack",
    description: "Work with cutting-edge tools and technologies from day one.",
    icon: Monitor,
    gradient: "from-[#f59e0b]/10 to-transparent",
  },
  {
    title: "Mentorship",
    description: "Learn directly from industry veterans and senior team members.",
    icon: Star,
    gradient: "from-[#ec4899]/10 to-transparent",
  },
  {
    title: "Competitive Benefits",
    description: "Performance bonuses, flexible leave, and a supportive work environment.",
    icon: Heart,
    gradient: "from-[#C9A15A]/10 to-transparent",
  },
];

const internshipPositions = [
  {
    title: "Architecture & Design Intern",
    location: "Coimbatore / Remote",
    duration: "3\u20136 Months",
    skills: ["AutoCAD", "Revit", "SketchUp", "Lumion"],
    icon: Building2,
    color: "from-[#C9A15A]/5 to-transparent",
    border: "hover:border-[#C9A15A]/30",
    badgeColor: "text-[#C9A15A] bg-[#C9A15A]/10 border-[#C9A15A]/20",
  },
  {
    title: "Construction & Project Mgmt Intern",
    location: "Coimbatore / Remote",
    duration: "3\u20136 Months",
    skills: ["Project Planning", "Site Coordination", "BIM", "Quality Control"],
    icon: HardHat,
    color: "from-[#8b1118]/5 to-transparent",
    border: "hover:border-[#8b1118]/30",
    badgeColor: "text-[#8b1118] bg-[#8b1118]/10 border-[#8b1118]/20",
  },
  {
    title: "Real Estate & Advisory Intern",
    location: "Coimbatore / Remote",
    duration: "3\u20136 Months",
    skills: ["Market Analysis", "Property Valuation", "Feasibility", "Client Advisory"],
    icon: Building2,
    color: "from-[#C9A15A]/5 to-transparent",
    border: "hover:border-[#C9A15A]/30",
    badgeColor: "text-[#C9A15A] bg-[#C9A15A]/10 border-[#C9A15A]/20",
  },
  {
    title: "Import & Export Operations Intern",
    location: "Coimbatore / Remote",
    duration: "3\u20136 Months",
    skills: ["Trade Documentation", "Supply Chain", "Logistics", "Compliance"],
    icon: Globe,
    color: "from-[#8b1118]/5 to-transparent",
    border: "hover:border-[#8b1118]/30",
    badgeColor: "text-[#8b1118] bg-[#8b1118]/10 border-[#8b1118]/20",
  },
  {
    title: "OTC Exchange & Deal Coord Intern",
    location: "Coimbatore / Remote",
    duration: "3\u20136 Months",
    skills: ["Deal Coordination", "Documentation", "Due Diligence", "Transaction Support"],
    icon: Briefcase,
    color: "from-[#C9A15A]/5 to-transparent",
    border: "hover:border-[#C9A15A]/30",
    badgeColor: "text-[#C9A15A] bg-[#C9A15A]/10 border-[#C9A15A]/20",
  },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pb-24 pt-28 md:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_50%_-20%,rgba(201,161,90,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(400px_circle_at_80%_40%,rgba(139,17,24,0.03),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e5e7eb] to-transparent" />
      </div>
      <ScrollReveal className="mx-auto max-w-5xl text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A15A]/20 bg-[#C9A15A]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#C9A15A]">
            <Sparkles className="h-3 w-3" />
            Now Hiring Interns
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-[#111]"
        >
          Build the Future{" "}
          <span className="bg-gradient-to-r from-[#C9A15A] via-[#8b1118] to-[#C9A15A] bg-clip-text text-transparent">
            With Ractysh
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#666] md:text-lg"
        >
          Join a team of builders, designers, and thinkers shaping the future of enterprise technology.
          We invest in talent, reward curiosity, and build products that matter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="#positions"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[#C9A15A] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(201,161,90,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(201,161,90,0.3)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            View Open Positions
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="#apply"
            className="group inline-flex items-center gap-2 rounded-xl border border-[#e5e7eb] px-8 py-3.5 text-sm font-semibold text-[#333] shadow-sm transition-all duration-300 hover:border-[#C9A15A]/30 hover:text-[#C9A15A] hover:shadow-md"
          >
            Apply Now
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.55 }}
          className="mt-16 grid grid-cols-3 gap-8 md:gap-16"
        >
          {[
            { value: "10+", label: "Open Positions" },
            { value: "48+", label: "Team Members" },
            { value: "100+", label: "Projects Delivered" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-[#111] md:text-3xl lg:text-4xl">{stat.value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-[#999]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </ScrollReveal>
    </section>
  );
}

function WhyJoinSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#fafbfc] px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A15A]">Why Join Us</span>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#111]">
              Built for people who build
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#666]">
              We believe in creating an environment where talent thrives and careers accelerate.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyJoinUs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.08 * i }}
              className="group relative overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#d1d5db] hover:shadow-lg md:p-7"
            >
              <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100", item.gradient)} />
              <div className="relative z-10">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e7eb] bg-[#fafbfc] text-[#C9A15A]">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-[#111]">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#666]">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PositionsSection({ onApply }: { onApply: (position: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="positions" className="bg-white px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A15A]">Open Positions</span>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#111]">
              Internship Opportunities
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#666]">
              Kickstart your career with real projects, mentorship, and hands-on experience.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {internshipPositions.map((pos, i) => {
            const Icon = pos.icon;
            return (
              <motion.div
                key={pos.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.1 * i }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-7",
                  pos.border
                )}
              >
                <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100", pos.color)} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e5e7eb] bg-[#fafbfc] text-[#C9A15A]">
                        <Icon className="h-5.5 w-5.5" />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-[#111] md:text-lg">{pos.title}</h3>
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#999]">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {pos.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {pos.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-[#999]">Skills</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {pos.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg border border-[#e5e7eb] bg-[#fafbfc] px-2.5 py-1 text-[0.7rem] font-medium text-[#666]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onApply(pos.title)}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#C9A15A]/20 bg-[#C9A15A]/5 px-4 py-2.5 text-xs font-semibold text-[#C9A15A] transition-all duration-300 hover:bg-[#C9A15A]/10 hover:shadow-[0_0_20px_rgba(201,161,90,0.1)]"
                  >
                    Apply Now
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#fafbfc] px-6 py-24 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A15A]/20 bg-[#C9A15A]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#C9A15A]">
            <Sparkles className="h-3 w-3" />
            Start Your Journey
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#111]">
            Your Next Opportunity{" "}
            <span className="bg-gradient-to-r from-[#C9A15A] to-[#8b1118] bg-clip-text text-transparent">Starts Here</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#666]">
            We&apos;re looking for talented individuals who want to build, learn, and grow. Take the first step toward a rewarding career.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.45}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#positions"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[#C9A15A] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(201,161,90,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(201,161,90,0.3)]"
          >
            View Open Positions
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="#apply"
            className="group inline-flex items-center gap-2 rounded-xl border border-[#e5e7eb] px-8 py-3.5 text-sm font-semibold text-[#333] shadow-sm transition-all duration-300 hover:border-[#C9A15A]/30 hover:text-[#C9A15A] hover:shadow-md"
          >
            Apply Now
          </Link>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function PremiumCareersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");

  const handleApply = useCallback((position: string) => {
    setSelectedPosition(position);
    setModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#111] antialiased">
      <HeroSection />
      <WhyJoinSection />
      <PositionsSection onApply={handleApply} />
      <FinalCTASection />
      <CareerApplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        roleTitle={selectedPosition}
      />
    </div>
  );
}
