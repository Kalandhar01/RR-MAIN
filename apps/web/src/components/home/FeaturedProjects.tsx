"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = ["All", "Architecture", "Construction", "Real Estate", "Import & Export", "OTC Exchange"];

const projects = [
  {
    title: "Luxury Villa Design System",
    category: "Architecture",
    location: "Coimbatore • Palani • Dindigul",
    image: "/images/photo-1497366811353-6870744d04b2.webp",
    year: "2026"
  },
  {
    title: "Turnkey Commercial Interiors",
    category: "Construction",
    location: "India",
    image: "/images/photo-1504384308090-c894fdcc538d.webp",
    year: "2025"
  },
  {
    title: "Premium Asset Positioning",
    category: "Real Estate",
    location: "India",
    image: "/images/photo-1560250097-0b93528c311a.webp",
    year: "2026"
  },
  {
    title: "Cross-Border Commerce Suite",
    category: "Import & Export",
    location: "Global",
    image: "/images/photo-1494412574643-ff11b0a5c1c3.webp",
    year: "2026"
  },
  {
    title: "Private Counterparty Workflow",
    category: "OTC Exchange",
    location: "Private",
    image: "/images/photo-1450101499163-c8848c66ca85.webp",
    year: "2026"
  },
  {
    title: "Corporate Office Atrium",
    category: "Architecture",
    location: "India",
    image: "/images/photo-1486406146926-c627a92ad1ab.webp",
    year: "2025"
  }
];

export function FeaturedProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section ref={ref} className="relative bg-[#F8F6F1] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="text-xs font-bold tracking-[0.25em] text-[#D6B45F] uppercase">
            Our Portfolio
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-[#111] sm:text-5xl lg:text-6xl">
            Featured Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#666]">
            A selection of our premium projects across all divisions, showcasing our commitment
            to excellence and innovation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 flex flex-wrap justify-center gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#111] text-white"
                  : "bg-white text-[#666] hover:bg-[#e5e5e5]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 text-white backdrop-blur-sm">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium tracking-wider text-[#D6B45F] uppercase">
                    {project.category}
                  </span>
                  <span className="text-xs text-[#999]">{project.year}</span>
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold text-[#111]">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-[#888]">{project.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/our-projects"
            className="group inline-flex items-center gap-2 rounded-full border border-[#111] px-8 py-3 text-sm font-semibold tracking-wider text-[#111] uppercase transition-all duration-300 hover:bg-[#111] hover:text-white"
          >
            View All Projects
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
