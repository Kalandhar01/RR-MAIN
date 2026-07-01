"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProjectData {
  _id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription?: string;
  description: string;
  location: string;
  status: string;
  coverImage: string;
  galleryImages: string[];
}

export function ProjectCard({
  project,
  index,
}: {
  project: ProjectData;
  index: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{
        duration: 0.46,
        delay: Math.min(index % 6, 5) * 0.045,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex"
    >
      <Link
        href={`/our-work/${project.slug}`}
        className="group flex w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(185,28,28,0.14)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <img
            src={project.coverImage}
            alt={`${project.title} — Ractysh Infra Pvt Ltd`}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading={index < 3 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
            {project.category}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold leading-tight tracking-tight text-slate-950 transition-colors duration-300 group-hover:text-red-700">
            {project.title}
          </h3>
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-slate-400">
            <MapPin className="h-3 w-3 shrink-0" />
            {project.location}
          </p>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
            {project.shortDescription || project.description}
          </p>
          <div className="mt-auto pt-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-red-700 transition-all duration-300 group-hover:gap-2.5">
              View Project
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
