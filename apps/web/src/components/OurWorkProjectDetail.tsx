"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Calendar, CheckCircle2, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getCompanyBrand } from "@/lib/branding";

const ease = [0.22, 1, 0.36, 1] as const;

interface PortfolioProject {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  location: string;
  status: "Completed" | "Ongoing" | "Upcoming";
  coverImage: string;
  galleryImages: string[];
  createdAt?: string;
}

function shimmer(width: number, height: number) {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#ede5d6"/><rect width="60%" height="20" x="20%" y="40%" fill="#dfcfaa" rx="4" opacity="0.5"/></svg>`
  )}`;
}

export function OurWorkProjectDetail({ project }: { project: PortfolioProject }) {
  const pathname = usePathname();
  const brand = getCompanyBrand(pathname);
  const [selectedImage, setSelectedImage] = useState(0);

  const allImages = project.coverImage
    ? [project.coverImage, ...(project.galleryImages.filter((img) => img !== project.coverImage))]
    : project.galleryImages;

  return (
    <article className="relative isolate overflow-hidden bg-[#fbf7ef] text-[#1f1712]">
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(circle at 50% -12%, rgba(255,255,255,0.98), transparent 34rem), radial-gradient(circle at 82% 18%, rgba(214,180,95,0.16), transparent 30rem), linear-gradient(180deg, #fffdf8 0%, #f7efe1 48%, #fff9ef 100%)",
        }}
      />

      <div className="mx-auto max-w-[88rem] px-5 pt-[8rem] sm:px-8 md:pt-[9rem]">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <Link
            href="/our-work"
            className="inline-flex items-center gap-2 rounded-full border border-[#dfcfaa]/60 bg-white/70 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[#62594f] shadow-[0_4px_16px_rgba(58,41,18,0.04)] backdrop-blur-md transition-all duration-300 hover:border-[#C9A45C]/50 hover:bg-white hover:text-[#8B1118] hover:shadow-[0_8px_24px_rgba(58,41,18,0.08)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Our Work
          </Link>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          aria-label="Breadcrumb"
          className="mt-5 flex flex-wrap items-center gap-3 text-[0.6rem] font-medium uppercase leading-[1.5] tracking-normal text-[rgba(123,109,91,0.62)] sm:text-[0.64rem]"
        >
          <Link href="/" className="transition duration-300 hover:text-[#8b1118]">{brand.shortName}</Link>
          <span className="text-[#b99a54]" aria-hidden="true">&rarr;</span>
          <Link href="/our-work" className="transition duration-300 hover:text-[#8b1118]">Our Work</Link>
          <span className="text-[#b99a54]" aria-hidden="true">&rarr;</span>
          <span className="text-[#1f1712]/60">{project.title}</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#8b1118]">
              {project.category}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[0.92] tracking-[0] text-[#15110d]">
              {project.title}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {project.location && (
              <span className="inline-flex items-center gap-2 text-[0.82rem] font-medium text-[#62594f]">
                <MapPin className="h-4 w-4 text-[#9d742a]" />
                {project.location}
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.08em] ${
                project.status === "Completed"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {project.status === "Completed" ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <Clock className="h-3.5 w-3.5" />
              )}
              {project.status}
            </span>
          </div>
        </motion.div>

        {allImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="mt-10"
          >
            <div className="relative aspect-[21/9] overflow-hidden rounded-[20px] bg-[#ede5d6] shadow-[0_24px_80px_rgba(58,41,18,0.12)]">
              <Image
                src={allImages[selectedImage]}
                alt={`${project.title} - Image ${selectedImage + 1}`}
                fill
                sizes="100vw"
                quality={92}
                priority
                className="object-cover"
                placeholder="blur"
                blurDataURL={shimmer(1200, 514)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
            </div>
            {allImages.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative shrink-0 overflow-hidden rounded-[10px] border-2 transition-all duration-300 ${
                      i === selectedImage
                        ? "border-[#8B1118] shadow-[0_4px_16px_rgba(139,17,24,0.2)]"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="relative h-16 w-24 sm:h-20 sm:w-28">
                      <Image
                        src={img}
                        alt={`${project.title} thumbnail ${i + 1}`}
                        fill
                        sizes="112px"
                        quality={60}
                        className="object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="mt-12 grid gap-10 pb-24 lg:grid-cols-[1fr_0.4fr] lg:pb-32"
        >
          <div>
            <h2 className="font-display text-[1.6rem] font-semibold leading-[1.1] tracking-[0] text-[#15110d]">
              About This Project
            </h2>
            <p className="mt-5 text-[1rem] font-medium leading-[1.9] text-[#62594f]">
              {project.description}
            </p>
            {allImages.length > 1 && (
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {allImages.slice(1, 5).map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-[#ede5d6] shadow-[0_8px_24px_rgba(58,41,18,0.06)]">
                    <Image
                      src={img}
                      alt={`${project.title} gallery ${i + 2}`}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      quality={80}
                      className="object-cover transition-all duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-[16px] border border-[#dfcfaa]/60 bg-white/80 p-6 shadow-[0_12px_40px_rgba(58,41,18,0.06)]">
              <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#8b1118]">Project Info</h3>
              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="text-[0.68rem] font-medium uppercase tracking-[0.1em] text-[#9d742a]">Category</dt>
                  <dd className="mt-1 text-[0.92rem] font-semibold text-[#15110d]">{project.category}</dd>
                </div>
                {project.location && (
                  <div>
                    <dt className="text-[0.68rem] font-medium uppercase tracking-[0.1em] text-[#9d742a]">Location</dt>
                    <dd className="mt-1 text-[0.92rem] font-semibold text-[#15110d]">{project.location}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-[0.68rem] font-medium uppercase tracking-[0.1em] text-[#9d742a]">Status</dt>
                  <dd className="mt-1 flex items-center gap-1.5 text-[0.92rem] font-semibold text-[#15110d]">
                    {project.status === "Completed" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-amber-500" />
                    )}
                    {project.status}
                  </dd>
                </div>
                {project.createdAt && (
                  <div>
                    <dt className="text-[0.68rem] font-medium uppercase tracking-[0.1em] text-[#9d742a]">Listed</dt>
                    <dd className="mt-1 flex items-center gap-1.5 text-[0.92rem] font-semibold text-[#15110d]">
                      <Calendar className="h-4 w-4 text-[#9d742a]" />
                      {new Date(project.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <Link
              href="/book-consultation"
              className="group flex min-h-[3.25rem] items-center justify-center gap-3 rounded-full border border-[#d5b567]/70 bg-[#fffaf0] px-6 text-[0.78rem] font-medium leading-none tracking-normal text-[rgba(37,27,20,0.82)] shadow-[0_18px_48px_rgba(126,91,31,0.12),0_1px_0_rgba(255,255,255,0.9)_inset] transition duration-500 ease-out hover:-translate-y-0.5 hover:border-[#d7b86d] hover:bg-[#fffdf8] hover:text-[#1b130e] hover:shadow-[0_22px_58px_rgba(177,130,45,0.18),0_0_34px_rgba(214,184,109,0.18)]"
            >
              Discuss a Similar Project
              <ArrowUpRight className="h-4 w-4 text-[#9b7429] transition duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/our-work"
              className="flex items-center gap-2 text-[0.78rem] font-medium text-[#62594f] transition-colors hover:text-[#8B1118]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
