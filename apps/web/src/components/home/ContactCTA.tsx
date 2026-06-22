"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Mail, Phone, MapPin, Check } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Projects Delivered", value: "150+" },
  { label: "Enterprise Clients", value: "50+" },
  { label: "Business Divisions", value: "5" },
  { label: "Retention Rate", value: "95%" },
];

export function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-[#FAF8F4] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-64 -top-64 h-[32rem] w-[32rem] rounded-full bg-[#C49A3A]/[0.03] blur-3xl" />
        <div className="absolute -bottom-64 -right-64 h-[32rem] w-[32rem] rounded-full bg-[#C49A3A]/[0.02] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pt-28 pb-24 sm:pt-36 sm:pb-32 lg:pt-44 lg:pb-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <span className="text-[10px] font-bold tracking-[0.28em] text-[#C49A3A] uppercase">
            Book Consultation
          </span>

          <h2 className="mt-6 font-cormorant text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[0.92] tracking-tight text-[#1B1611]">
            Let&apos;s Build The
            <br />
            Future Together
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#1B1611]/50 sm:text-base">
            Ready to start your next project? Connect with our team and discover
            how Ractysh Group can help bring your vision to life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6"
        >
          <Link
            href="/book-consultation"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#C49A3A] px-8 py-3.5 text-sm font-semibold tracking-wider text-[#FAF8F4] uppercase transition-all duration-300 hover:bg-[#B0882E] hover:shadow-lg hover:shadow-[#C49A3A]/20"
          >
            Book Consultation
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:mt-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2.5">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C49A3A]/10">
                <Check className="h-3 w-3 text-[#C49A3A]" />
              </div>
              <span className="text-sm text-[#1B1611]/60">
                <strong className="font-semibold text-[#1B1611]">{stat.value}</strong> {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:mt-16"
        >
          <Link href="/book-consultation" className="group flex items-center gap-2 text-sm text-[#1B1611]/40 transition-colors duration-200 hover:text-[#C49A3A]">
            <MapPin className="h-3.5 w-3.5" />
            <span>Coimbatore &bull; Palani &bull; Dindigul</span>
          </Link>
          <Link href="mailto:noorulsmart1998@gmail.com" className="group flex items-center gap-2 text-sm text-[#1B1611]/40 transition-colors duration-200 hover:text-[#C49A3A]">
            <Mail className="h-3.5 w-3.5" />
            <span>Email</span>
          </Link>
          <Link href="tel:+919080844114" className="group flex items-center gap-2 text-sm text-[#1B1611]/40 transition-colors duration-200 hover:text-[#C49A3A]">
            <Phone className="h-3.5 w-3.5" />
            <span>Consultation Support</span>
          </Link>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0A0A0A]" />
    </section>
  );
}
