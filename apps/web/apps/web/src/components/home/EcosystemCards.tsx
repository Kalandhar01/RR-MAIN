"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    title: "Architecture",
    tagline: "Designing Landmark Spaces",
    image: "/images/photo-1497366754035-f200968a6e72.webp",
    href: "https://architects.ractysh.com/"
  },
  {
    title: "Construction",
    tagline: "Building with Precision",
    image: "/images/photo-1503387762-592deb58ef4e.webp",
    href: "https://construction.ractysh.com/"
  },
  {
    title: "Real Estate",
    tagline: "Creating Long-Term Value",
    image: "/images/photo-1560518883-ce09059eeffa.webp",
    href: "https://estates.ractysh.com/"
  },
  {
    title: "Import & Export",
    tagline: "Global Trade Excellence",
    image: "/images/photo-1494412574643-ff11b0a5c1c3.webp",
    href: "https://exports.ractysh.com/"
  },
  {
    title: "OTC Exchange",
    tagline: "Private Market Transactions",
    image: "/images/photo-1450101499163-c8848c66ca85.webp",
    href: "https://exchange.ractysh.com/"
  }
];

function EcosystemCard({
  card,
  index,
  isInView
}: {
  card: (typeof cards)[number];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        href={card.href}
        className="group block overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#D6B45F]/30 hover:shadow-lg hover:shadow-[#D6B45F]/8"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="px-6 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
          <h3 className="font-display text-xl font-bold leading-tight text-[#111] sm:text-2xl">
            {card.title}
          </h3>
          <p className="mt-1 text-sm leading-snug text-[#888]">
            {card.tagline}
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.12em] text-[#999] uppercase transition-all duration-500 group-hover:text-[#D6B45F]">
            Explore Division
            <ArrowUpRight className="h-3.5 w-3.5 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function EcosystemCards() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ecosystem" ref={ref} className="relative bg-[#F8F6F1] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-bold tracking-[0.25em] text-[#D6B45F] uppercase">
            Our Ecosystem
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-[#111] sm:text-5xl lg:text-6xl">
            Integrated Enterprise Divisions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#666]">
            Five interconnected divisions working in unison to deliver comprehensive solutions
            across the built environment and global commerce.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <EcosystemCard card={card} index={i} isInView={isInView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
