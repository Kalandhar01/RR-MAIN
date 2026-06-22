"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  ArrowUpRight,
  Sparkles,
  Search,
  MapPin,
  Clock,
  Users,
  Briefcase,
  Star,
  Target,
  Monitor,
  BookOpen,
  Code,
  Palette,
  Smartphone,
  CheckCircle,
  Send,
  Building2,
  Globe,
  Award,
  Heart,
  HardHat,
  X,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
            { value: "200+", label: "Projects Delivered" },
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

type FormStatus = "idle" | "submitting" | "success" | "error";

function ApplyModal({
  open,
  onClose,
  preselectedPosition,
}: {
  open: boolean;
  onClose: () => void;
  preselectedPosition: string;
}) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status !== "submitting") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose, status]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("fullName") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();

    if (!name || !email || !phone) {
      setErrorMsg("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/careers/apply", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || data.error || "Submission failed.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease }}
          className="fixed inset-0 z-[500] flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-10 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget && status !== "submitting") onClose(); }}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.3, ease }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-2xl"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-[#C9A15A]/10"
                >
                  <CheckCircle className="h-10 w-10 text-[#C9A15A]" />
                </motion.div>
                <h3 className="mt-6 text-2xl font-semibold text-[#111]">Application Submitted!</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[#666]">
                  Thank you for applying. We&apos;ll review your application and reach out within 48 hours.
                  A confirmation email has been sent to your inbox.
                </p>
                <button
                  onClick={onClose}
                  className="mt-8 rounded-xl bg-[#C9A15A] px-8 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(201,161,90,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(201,161,90,0.25)]"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4 md:px-8">
                  <div>
                    <h3 className="text-lg font-semibold text-[#111]">Apply for Internship</h3>
                    <p className="text-xs text-[#999]">{preselectedPosition}</p>
                  </div>
                  <button
                    onClick={onClose}
                    disabled={status === "submitting"}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#999] transition-colors hover:border-[#d1d5db] hover:text-[#666]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8" noValidate>
                  <div className="space-y-4">
                    <input type="hidden" name="position" value={preselectedPosition} />
                    <input type="hidden" name="experience" value="Internship" />

                    <div>
                      <label htmlFor="modal-fullName" className="block text-sm font-medium text-[#333]">
                        Full Name <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        id="modal-fullName"
                        name="fullName"
                        type="text"
                        required
                        placeholder="John Doe"
                        className="mt-1.5 block w-full rounded-xl border border-[#e5e7eb] bg-[#fafafa] px-4 py-3 text-sm text-[#111] placeholder:text-[#999] transition-colors focus:border-[#C9A15A] focus:outline-none focus:ring-1 focus:ring-[#C9A15A]/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-email" className="block text-sm font-medium text-[#333]">
                        Email Address <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        id="modal-email"
                        name="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="mt-1.5 block w-full rounded-xl border border-[#e5e7eb] bg-[#fafafa] px-4 py-3 text-sm text-[#111] placeholder:text-[#999] transition-colors focus:border-[#C9A15A] focus:outline-none focus:ring-1 focus:ring-[#C9A15A]/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-phone" className="block text-sm font-medium text-[#333]">
                        Phone Number <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        id="modal-phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="mt-1.5 block w-full rounded-xl border border-[#e5e7eb] bg-[#fafafa] px-4 py-3 text-sm text-[#111] placeholder:text-[#999] transition-colors focus:border-[#C9A15A] focus:outline-none focus:ring-1 focus:ring-[#C9A15A]/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-message" className="block text-sm font-medium text-[#333]">
                        Message <span className="text-[#999]">(Optional)</span>
                      </label>
                      <textarea
                        id="modal-message"
                        name="message"
                        rows={3}
                        placeholder="Tell us why you're interested..."
                        className="mt-1.5 block w-full resize-none rounded-xl border border-[#e5e7eb] bg-[#fafafa] px-4 py-3 text-sm text-[#111] placeholder:text-[#999] transition-colors focus:border-[#C9A15A] focus:outline-none focus:ring-1 focus:ring-[#C9A15A]/20"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="mt-4 rounded-xl bg-[#fef2f2] px-4 py-3 text-sm text-[#ef4444]">{errorMsg}</div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C9A15A] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(201,161,90,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(201,161,90,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Apply for Internship
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
      <ApplyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedPosition={selectedPosition}
      />
    </div>
  );
}
