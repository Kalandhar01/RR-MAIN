"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe, Ship, Package, CreditCard,
  HardHat, Building2, Ruler, ShieldCheck,
  Palette, DraftingCompass, HeartHandshake, Target,
  TrendingUp, Landmark, Briefcase, Users, Compass,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { DirectorProfileCardProps } from "@/components/DirectorProfileCard";

const iconMap: Record<string, LucideIcon> = {
  Globe, Ship, Package, CreditCard,
  HardHat, Building2, Ruler, ShieldCheck,
  Palette, DraftingCompass, HeartHandshake, Target,
  TrendingUp, Landmark, Briefcase, Users, Compass,
};

const cardEase = [0.22, 1, 0.36, 1] as const;

export function DirectorFounderCard({ data, index }: { data: DirectorProfileCardProps; index: number }) {
  const initial = data.firstName.charAt(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: cardEase }}
    >
      <Link
        href={`/directors/${data.slug}`}
        className="group relative mx-auto block w-full max-w-[620px] overflow-hidden rounded-[32px] border border-[rgba(201,161,74,0.18)] bg-[#faf7f0] shadow-[0_24px_80px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-[#C9A14A]/40 hover:shadow-[0_0_60px_rgba(201,161,74,0.10),0_32px_80px_rgba(0,0,0,0.12)]"
      >
        {/* Image */}
        <div className="relative h-[440px] w-full overflow-hidden md:h-[500px]">
          <motion.div
            className="absolute inset-0"
            transition={{ duration: 0.6, ease: cardEase }}
          >
            {data.image ? (
              <Image
                src={data.image}
                alt={`${data.firstName} ${data.lastName}`}
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                sizes="620px"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1a1410] to-[#0d0a08]">
                <span className="font-display text-[10rem] font-bold text-[rgba(201,161,74,0.08)]">
                  {initial}
                </span>
              </div>
            )}
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0806]/70 via-[#0a0806]/10 to-transparent" />
          <span className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-inset ring-[rgba(255,215,120,0.08)]" />

          {/* Badge */}
          <div className="absolute left-6 top-6 md:left-8 md:top-8">
            <span className="block text-[11px] font-bold uppercase tracking-[4px] text-[#C9A14A] drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)] md:text-[12px]">
              {data.label || "FOUNDER"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-5 px-7 pb-8 pt-6 md:px-9 md:pb-10 md:pt-8">
          <span className="block text-[13px] font-medium italic leading-none text-[#8b7a60]">
            {data.honorific || "Mr."}
          </span>
          <h2 className="font-display text-[44px] font-semibold leading-[0.92] tracking-[-0.025em] text-[#1c120e] md:text-[54px]">
            {data.firstName}<br />
            <span className="bg-gradient-to-r from-[#C9A14A] to-[#A97826] bg-clip-text text-transparent">
              {data.lastName}
            </span>
          </h2>
          <span className="block text-[17px] font-light leading-snug text-[#5a4e40] md:text-[18px]">
            {data.qualification}
          </span>
          <div className="flex items-center gap-2">
            <span className="h-[6px] w-[6px] rounded-full bg-[#C9A14A]" />
            <span className="text-[11px] font-bold uppercase tracking-[2.5px] text-[#C9A14A] md:text-[12px]">
              {data.company}
            </span>
          </div>
          <p className="text-[15px] leading-[1.7] text-[#5a4e40] md:text-[17px]">
            {data.description}
          </p>

          {/* Expertise */}
          <div className="flex flex-wrap gap-2">
            {data.expertise.slice(0, 4).map((item) => {
              const Icon = iconMap[item.icon] || Compass;
              return (
                <span
                  key={item.title}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(201,161,74,0.2)] bg-white/60 px-3 py-1.5 text-[12px] font-medium text-[#5a4e40] transition-all duration-200 hover:border-[#C9A14A]/40 hover:bg-white md:text-[13px]"
                >
                  <Icon className="h-[11px] w-[11px] text-[#C9A14A] md:h-[12px] md:w-[12px]" strokeWidth={1.6} />
                  {item.title}
                </span>
              );
            })}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function DirectorDesktopCard({ data, index }: { data: DirectorProfileCardProps; index: number }) {
  const initial = data.firstName.charAt(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: cardEase }}
    >
      <Link
        href={`/directors/${data.slug}`}
        className="group relative mx-auto block w-full max-w-[600px] overflow-hidden rounded-[28px] border border-[rgba(201,161,74,0.14)] bg-[#faf7f0] shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#C9A14A]/35 hover:shadow-[0_0_50px_rgba(201,161,74,0.08),0_28px_70px_rgba(0,0,0,0.10)]"
      >
        {/* Image */}
        <div className="relative h-[380px] w-full overflow-hidden md:h-[430px]">
          <motion.div
            className="absolute inset-0"
            transition={{ duration: 0.6, ease: cardEase }}
          >
            {data.image ? (
              <Image
                src={data.image}
                alt={`${data.firstName} ${data.lastName}`}
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                sizes="600px"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1a1410] to-[#0d0a08]">
                <span className="font-display text-[8rem] font-bold text-[rgba(201,161,74,0.08)]">
                  {initial}
                </span>
              </div>
            )}
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0806]/60 via-[#0a0806]/5 to-transparent" />
          <span className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-[rgba(255,215,120,0.06)]" />

          {/* Badge */}
          <div className="absolute left-5 top-5 md:left-7 md:top-7">
            <span className="block text-[10px] font-bold uppercase tracking-[3.5px] text-[#C9A14A] drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)] md:text-[11px]">
              {data.label || "Director"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 px-6 pb-7 pt-5 md:px-8 md:pb-8 md:pt-6">
          <span className="block text-[12px] font-medium italic leading-none text-[#8b7a60] md:text-[13px]">
            {data.honorific || "Mr."}
          </span>
          <h3 className="font-display text-[36px] font-semibold leading-[0.92] tracking-[-0.02em] text-[#1c120e] md:text-[44px]">
            {data.firstName}<br />
            <span className="bg-gradient-to-r from-[#C9A14A] to-[#A97826] bg-clip-text text-transparent">
              {data.lastName}
            </span>
          </h3>
          <span className="block text-[15px] font-light leading-snug text-[#5a4e40] md:text-[17px]">
            {data.qualification}
          </span>
          <div className="flex items-center gap-2">
            <span className="h-[5px] w-[5px] rounded-full bg-[#C9A14A]" />
            <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#C9A14A] md:text-[11px]">
              {data.company}
            </span>
          </div>
          <p className="text-[14px] leading-[1.65] text-[#5a4e40] md:text-[16px]">
            {data.description}
          </p>

          {/* Expertise */}
          <div className="flex flex-wrap gap-1.5">
            {data.expertise.slice(0, 4).map((item) => {
              const Icon = iconMap[item.icon] || Compass;
              return (
                <span
                  key={item.title}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(201,161,74,0.18)] bg-white/50 px-2.5 py-1 text-[11px] font-medium text-[#5a4e40] transition-all duration-200 hover:border-[#C9A14A]/35 hover:bg-white md:text-[12px]"
                >
                  <Icon className="h-[10px] w-[10px] text-[#C9A14A] md:h-[11px] md:w-[11px]" strokeWidth={1.6} />
                  {item.title}
                </span>
              );
            })}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
