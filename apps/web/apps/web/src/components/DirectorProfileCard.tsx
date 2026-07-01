"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Mail, Compass, Globe, Ship, Package, CreditCard,
  HardHat, Building2, Ruler, ShieldCheck,
  Palette, DraftingCompass, HeartHandshake, Target,
  TrendingUp, Landmark, Briefcase, Users,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface DirectorProfileCardProps {
  slug: string;
  image?: string;
  honorific?: string;
  firstName: string;
  lastName: string;
  qualification: string;
  company: string;
  designation: string;
  quote: string;
  description: string;
  expertise: { icon: string; title: string }[];
  email?: string;
  phone?: string;
  showConnect?: boolean;
  label?: string;
}

const iconMap: Record<string, LucideIcon> = {
  Globe, Ship, Package, CreditCard,
  HardHat, Building2, Ruler, ShieldCheck,
  Palette, DraftingCompass, HeartHandshake, Target,
  TrendingUp, Landmark, Briefcase, Users, Compass,
};

const ease = [0.22, 1, 0.36, 1] as const;

function GoldText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-[#E5C67B] to-[#A97826] bg-clip-text text-transparent">
      {children}
    </span>
  );
}

/* ═══════════════ COMPACT CARD (for listing page grid) ═══════════════ */

export const DirectorCompactCard = React.memo(function DirectorCompactCard(props: DirectorProfileCardProps) {
  const { slug, image, firstName, lastName, qualification, company, designation, expertise, label = "Director" } = props;
  const initial = firstName.charAt(0);

  return (
    <div className="group block">
      <div className="overflow-hidden rounded-[20px] border border-[rgba(255,215,120,0.1)] bg-[#0a0a0a] shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-500 hover:border-[#C9A14A]/30 hover:shadow-[0_0_50px_rgba(201,161,74,0.06)]">
        {/* Image */}
        <div className="relative h-[260px] w-full overflow-hidden md:h-[300px]">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease }}
            className="absolute inset-0"
          >
            {image ? (
              <Image
                src={image}
                alt={`${firstName} ${lastName}`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 25vw"
                loading="eager"
                fetchPriority="low"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1a1410] to-[#0d0a08]">
                <span className="font-display text-[6rem] font-bold text-[rgba(201,161,74,0.1)]">{initial}</span>
              </div>
            )}
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[rgba(255,215,120,0.08)]" />

          {/* DIRECTOR badge */}
          <span className="absolute left-4 top-4 rounded-full border border-[rgba(255,215,120,0.2)] bg-[rgba(10,10,10,0.7)] px-3 py-1 text-[10px] font-bold uppercase tracking-[3px] text-[#C9A14A] backdrop-blur-[8px] md:text-[11px]">
            {label}
          </span>

          {/* Name at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent p-4 pt-10 md:p-5">
            <span className="font-display text-[13px] font-medium italic leading-none text-[#C9A14A] md:text-[14px]">
              Mr.
            </span>
            <h3 className="-mt-0.5 font-playwrite-au-tas text-[22px] font-semibold leading-[0.9] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] md:text-[24px]">
              {firstName}<br />
              <GoldText>{lastName}</GoldText>
            </h3>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 md:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] border border-[#C9A14A]/25 bg-[#C9A14A]/10">
              <Building2 className="h-[15px] w-[15px] text-[#C9A14A]" strokeWidth={1.5} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#C9A14A] md:text-[11px]">{company}</p>
              <p className="mt-0.5 text-[13px] font-medium text-white/70 md:text-[14px]">{designation}</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {expertise.slice(0, 3).map((item) => {
              const Icon = iconMap[item.icon] || Compass;
              return (
                <span key={item.title} className="inline-flex items-center gap-1 rounded-full border border-[rgba(201,161,74,0.15)] bg-[rgba(15,15,15,0.5)] px-2.5 py-1 text-[10px] font-medium text-white/70">
                  <Icon className="h-[10px] w-[10px] text-[#C9A14A]" strokeWidth={1.6} />
                  {item.title}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

/* ═══════════════ FULL PROFILE PAGE ═══════════════ */

export default function DirectorProfileCard(props: DirectorProfileCardProps) {
  const {
    image, honorific = "Mr.", firstName, lastName, qualification,
    company, designation, quote, description, expertise, email, phone,
    showConnect = true, label = "Director",
  } = props;

  const initial = firstName.charAt(0);

  return (
    <div className="bg-[#050505] text-[#F8F8F8] font-display">
      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[75vh] min-h-[500px] w-full overflow-hidden md:min-h-[580px] lg:min-h-[660px]">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease }}
          className="absolute inset-0"
        >
          {image ? (
            <Image
              src={image}
              alt={`${honorific} ${firstName} ${lastName}`}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1a1410] to-[#0d0a08]">
              <span className="font-display text-[14rem] font-bold text-[rgba(201,161,74,0.08)]">
                {initial}
              </span>
            </div>
          )}
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[rgba(255,215,120,0.10)]" />

        {/* DIRECTOR label */}
        <div className="absolute left-6 top-8 md:left-10 md:top-10">
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="block text-[12px] font-bold uppercase tracking-[4px] text-[#C9A14A] drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] md:text-[13px]"
          >
            {label}
          </motion.span>
        </div>

        {/* Name at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 md:px-10 md:pb-12 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            <span className="font-display text-[18px] font-medium italic leading-none text-[#C9A14A] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] md:text-[22px]">
              {honorific}
            </span>
            <h1 className="-mt-0.5 font-playwrite-au-tas text-[48px] font-semibold leading-[0.88] tracking-[-0.015em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] md:text-[60px] lg:text-[72px]">
              {firstName}
              <br />
              <GoldText>{lastName}</GoldText>
            </h1>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[#C9A14A]/60 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                <span className="h-[6px] w-[6px] rounded-full bg-[#C9A14A]" />
              </span>
              <span className="text-[16px] font-medium leading-snug text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] md:text-[18px]">
                {qualification}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ CONTENT ═══════ */}
      <div className="relative z-10 mx-auto max-w-[640px] space-y-12 px-6 pb-16 -mt-16 md:space-y-16 md:px-10 md:pb-24 md:-mt-24 lg:-mt-32">
        {/* Company card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="rounded-[20px] border border-[rgba(255,215,120,0.12)] bg-[rgba(18,18,18,0.92)] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.5)] backdrop-blur-[16px] md:rounded-[24px] md:p-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-[#C9A14A]/25 bg-[#C9A14A]/10">
              <Building2 className="h-5 w-5 text-[#C9A14A] md:h-6 md:w-6" strokeWidth={1.5} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[2px] text-[#C9A14A] md:text-[12px]">{company}</p>
              <p className="mt-0.5 text-[15px] font-medium text-white/75 md:text-[16px]">{designation}</p>
            </div>
          </div>
          <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-[rgba(255,215,120,0.05)]" />
        </motion.div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-[16px] leading-[1.65] text-white/75 md:text-[17px]"
        >
          {description}
        </motion.p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#C9A14A]/15 to-transparent" />

        {/* Expertise */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-[12px] font-bold uppercase tracking-[3px] text-[#C9A14A] md:text-[13px]">Expertise</span>
          <div className="mt-5 grid grid-cols-2 gap-3 md:mt-6 md:gap-4">
            {expertise.map((item, i) => {
              const Icon = iconMap[item.icon] || Compass;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.06 * i, ease }}
                  whileHover={{ y: -3, scale: 1.015 }}
                  className="group flex items-center gap-3 rounded-[16px] border border-[rgba(201,161,74,0.15)] bg-[rgba(15,15,15,0.7)] px-4 py-[18px] shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-[8px] transition-all duration-400 hover:border-[#C9A14A]/40 hover:shadow-[0_0_30px_rgba(201,161,74,0.06)] md:gap-4 md:rounded-[18px] md:px-5 md:py-5"
                >
                  <Icon className="h-[24px] w-[24px] shrink-0 text-[#C9A14A] md:h-[28px] md:w-[28px]" strokeWidth={1.4} />
                  <span className="text-[14px] font-medium leading-tight text-white/90 md:text-[15px]">{item.title}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {showConnect && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="relative overflow-hidden rounded-[24px] border border-[#C9A14A]/20 bg-gradient-to-b from-[#0d0a08] to-[#120e0a] px-6 py-8 text-center shadow-[0_32px_80px_rgba(0,0,0,0.4)] md:rounded-[28px] md:px-10 md:py-10 lg:px-12 lg:py-12"
          >
            <div className="pointer-events-none absolute -inset-20 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,161,74,0.06),transparent_50%)]" />
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A14A]/25 bg-[#C9A14A]/10">
              <Compass className="h-7 w-7 text-[#C9A14A] md:h-8 md:w-8" strokeWidth={1.4} />
            </div>
            <h2 className="mt-5 font-display text-[32px] font-semibold leading-[1.1] text-white md:mt-6 md:text-[40px] lg:text-[44px]">
              Let&rsquo;s Connect
            </h2>
            <p className="mx-auto mt-2 max-w-[340px] text-[15px] leading-[1.7] text-white/55 md:text-[16px]">
              Open to global partnerships and strategic opportunities.
            </p>
            <div className="mt-6 flex flex-col gap-3 md:mt-8 md:flex-row">
              {email && (
                <Link
                  href={`mailto:${email}`}
                  className="inline-flex h-14 flex-1 items-center justify-center gap-2.5 rounded-[16px] border border-[#C9A14A]/35 bg-transparent px-5 text-[15px] font-semibold text-[#C9A14A] transition-all duration-400 hover:border-[#C9A14A]/60 hover:shadow-[0_0_40px_rgba(201,161,74,0.08)] md:h-16 md:rounded-[18px] md:text-[16px]"
                >
                  <Mail className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.6} />
                  Send Email
                </Link>
              )}
              {phone && (
                <Link
                  href={`tel:${phone}`}
                  className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-[#E5C67B] to-[#A97826] px-5 text-[15px] font-semibold text-[#050505] transition-all duration-400 hover:shadow-[0_0_40px_rgba(201,161,74,0.15)] md:h-16 md:rounded-[18px] md:text-[16px]"
                >
                  Call Director
                </Link>
              )}
            </div>
            <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-[rgba(255,215,120,0.05)]" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
