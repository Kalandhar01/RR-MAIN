"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Building2, Globe, HardHat, Home, Landmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { getCompanyBrand } from "@/lib/branding";

const ease = [0.22, 1, 0.36, 1] as const;

function optimizeCloudinaryUrl(url: string): string {
  if (!url || !url.startsWith("https://res.cloudinary.com/")) return url;
  const parts = url.split("/upload/");
  if (parts.length !== 2) return url;
  return `${parts[0]}/upload/f_auto,q_auto/${parts[1]}`;
}

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
}

const categories = [
  { id: "All", label: "All Works", icon: null },
  { id: "architecture", label: "Architecture", icon: Building2 },
  { id: "construction", label: "Construction", icon: HardHat },
  { id: "real-estate", label: "Real Estate", icon: Home },
  { id: "import-export", label: "Import Export", icon: Globe },
  { id: "otc", label: "OTC Exchange", icon: Landmark },
] as const;

const stats = [
  { value: "100+", label: "Projects Delivered" },
  { value: "5", label: "Business Divisions" },
  { value: "100+", label: "Clients Served" },
  { value: "5+", label: "Years Experience" },
];

export function OurProjectsPage({ initialProjects }: { initialProjects?: PortfolioProject[] }) {
  const pathname = usePathname();
  const brand = getCompanyBrand(pathname);
  const isStatic = !!initialProjects;
  const [projects, setProjects] = useState<PortfolioProject[]>(initialProjects || []);
  const [loading, setLoading] = useState(!isStatic);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (isStatic) {
      setProjects(
        activeFilter === "All"
          ? initialProjects!
          : initialProjects!.filter((p) => p.category === activeFilter)
      );
      return;
    }
    async function fetchProjects() {
      try {
        const params = new URLSearchParams({ limit: "50" });
        if (activeFilter !== "All") params.set("category", activeFilter);
        const res = await fetch(`/api/our-works?${params}`);
        const data = await res.json();
        setProjects((data.works || []).map((w: Record<string, unknown>) => ({
          _id: w.id || w._id,
          title: w.title,
          slug: w.slug,
          category: w.category,
          description: w.description,
          location: w.location,
          status: w.status,
          coverImage: w.coverImage ? optimizeCloudinaryUrl(w.coverImage as string) : "",
          galleryImages: (w.galleryImages as string[] || []).map(optimizeCloudinaryUrl),
        })));
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [activeFilter, isStatic, initialProjects]);

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.72, ease },
      };

  return (
    <section className="relative isolate overflow-hidden bg-[#fbf7ef] px-5 pb-24 pt-[9rem] text-[#1f1712] sm:px-8 md:pt-[10rem] lg:pb-32">
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(circle at 50% -12%, rgba(255,255,255,0.98), transparent 34rem), radial-gradient(circle at 82% 18%, rgba(214,180,95,0.16), transparent 30rem), radial-gradient(circle at 16% 38%, rgba(255,255,255,0.88), transparent 32rem), linear-gradient(180deg, #fffdf8 0%, #f7efe1 48%, #fff9ef 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.36]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,148,82,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(180,148,82,0.07) 1px, transparent 1px), radial-gradient(circle at 50% 18%, rgba(255,255,255,0.82), transparent 28rem)",
          backgroundSize: "74px 74px, 74px 74px, auto",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
          maskImage: "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-[88rem]">
        <motion.nav
          {...reveal}
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-3 text-[0.6rem] font-medium uppercase leading-[1.5] tracking-normal text-[rgba(123,109,91,0.62)] sm:text-[0.64rem]"
        >
          <Link href="/" className="transition duration-300 hover:text-[#8b1118]">{brand.shortName}</Link>
          <span className="text-[#b99a54]" aria-hidden="true">&rarr;</span>
          <span className="text-[#1f1712]/60">Our Work</span>
        </motion.nav>

        <motion.div
          {...reveal}
          transition={reduceMotion ? undefined : { duration: 0.86, ease }}
          className="mx-auto mt-14 max-w-[68rem] text-center"
        >
          <p className="inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#8b1118]">
            <span className="h-px w-8 bg-[#b88a44]" />
            Group Portfolio
            <span className="h-px w-8 bg-[#b88a44]" />
          </p>
          <h1 className="mt-6 font-fraunces text-ractysh-section font-semibold leading-[0.88] tracking-tight text-[#15110d]">
            Our Impact Across Industries
          </h1>
          <p className="mx-auto mt-6 max-w-[54rem] text-[0.92rem] font-medium leading-[1.9] text-[rgba(67,61,54,0.66)] sm:text-[1rem]">
            A showcase of projects, developments, trade operations, and business solutions delivered across Architecture, Construction, Real Estate, Export & Import, and OTC Exchange sectors.
          </p>
          <div className="mx-auto mt-8 h-px w-28 bg-[linear-gradient(90deg,transparent,rgba(199,167,99,0.74),transparent)]" />
        </motion.div>

        <motion.div
          {...reveal}
          transition={reduceMotion ? undefined : { duration: 0.72, delay: 0.1, ease }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={reduceMotion ? undefined : { once: true }}
              transition={reduceMotion ? undefined : { duration: 0.5, delay: index * 0.08, ease }}
              className="group relative overflow-hidden rounded-[16px] border border-[#dfcfaa]/60 bg-white/80 p-6 text-center shadow-[0_12px_40px_rgba(58,41,18,0.06)] backdrop-blur-sm transition-all duration-500 hover:border-[#C9A45C]/70 hover:shadow-[0_20px_60px_rgba(58,41,18,0.1)]"
            >
              <p className="font-display text-[clamp(2.2rem,3.5vw,3rem)] font-semibold leading-none tracking-[0] text-[#8b1118]">
                {stat.value}
              </p>
              <p className="mt-2 text-[0.82rem] font-medium text-[#62594f]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          {...reveal}
          transition={reduceMotion ? undefined : { duration: 0.72, delay: 0.15, ease }}
          className="mt-16 flex flex-wrap justify-center gap-2"
        >
          {categories.map((cat) => {
            const isActive = activeFilter === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(cat.id)}
                className={cn(
                  "relative inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-[0.82rem] font-semibold leading-none tracking-[0] transition-all duration-500",
                  isActive
                    ? "bg-gradient-to-r from-[#8B1118] to-[#B22234] text-white shadow-[0_12px_32px_rgba(139,17,24,0.3)]"
                    : "border border-[#dfcfaa]/60 bg-white/70 text-[#62594f] shadow-[0_4px_16px_rgba(58,41,18,0.04)] backdrop-blur-md hover:border-[#C9A45C]/50 hover:bg-white hover:text-[#15110d] hover:shadow-[0_8px_24px_rgba(58,41,18,0.08)]"
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {loading ? (
          <div className="mt-20 grid gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-[20px] bg-white/60 shadow-[0_20px_60px_rgba(58,41,18,0.07)]">
                <div className="aspect-[16/11] rounded-t-[20px] bg-[#ede5d6]" />
                <div className="space-y-3 p-6 md:p-7">
                  <div className="h-5 w-3/4 rounded bg-[#ede5d6]" />
                  <div className="h-3 w-1/3 rounded bg-[#ede5d6]" />
                  <div className="h-4 w-full rounded bg-[#ede5d6]" />
                  <div className="h-4 w-2/3 rounded bg-[#ede5d6]" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20 text-center"
          >
            <p className="text-[1.1rem] font-medium text-[#62594f]">No projects found in this category.</p>
          </motion.div>
        ) : (
          <motion.div
            {...reveal}
            viewport={reduceMotion ? undefined : { once: true, amount: 0.05 }}
            transition={reduceMotion ? undefined : { duration: 0.72, delay: 0.2, ease }}
            className="mt-14"
          >
            <div className="grid gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-4">
              {projects.map((project, index) => (
                <motion.article
                  layout
                  key={project._id}
                  initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.04, ease }}
                  className="group flex flex-col overflow-hidden rounded-[20px] border border-[#dfcfaa]/50 bg-white shadow-[0_20px_60px_rgba(58,41,18,0.07)] transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A45C]/70 hover:shadow-[0_28px_80px_rgba(58,41,18,0.12)]"
                >
                  <Link href={`/our-work/${project.slug}`} className="block">
                    <div className="relative aspect-[16/11] overflow-hidden bg-[#ede5d6]">
                      {project.coverImage ? (
                        <Image
                          src={project.coverImage}
                          alt={project.title}
                          fill
                          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                          quality={85}
                          priority={index < 3}
                          className="object-cover transition-all duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[#ede5d6]">
                          <Building2 className="h-12 w-12 text-[#dfcfaa]" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/20 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-white/90 backdrop-blur-md">
                        {project.category}
                      </span>
                      <span
                        className={cn(
                          "absolute right-4 top-4 rounded-full px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.1em] backdrop-blur-md",
                          project.status === "Completed"
                            ? "bg-emerald-500/20 text-emerald-200 border border-emerald-400/30"
                            : "bg-amber-500/20 text-amber-200 border border-amber-400/30"
                        )}
                      >
                        {project.status}
                      </span>
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
                    <div>
                      <h2 className="font-display text-[clamp(1.8rem,2.4vw,2.6rem)] font-semibold leading-[1.15] tracking-[0.02em] text-[#15110d]">
                        <Link href={`/our-work/${project.slug}`} className="transition-all duration-500 ease-out hover:text-[#C49A3A]">
                          {project.title}
                        </Link>
                      </h2>
                      {project.location && (
                        <p className="mt-1.5 text-[0.75rem] font-medium tracking-[0.08em] uppercase text-[#9d742a]">
                          {project.location}
                        </p>
                      )}
                    </div>
                    <p className="text-[0.82rem] font-medium leading-[1.7] text-[#62594f]/75 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="mt-auto pt-2">
                      <Link
                        href={`/our-work/${project.slug}`}
                        className="group inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#8B1118] transition-all duration-500 ease-out hover:text-[#741016]"
                      >
                        <span className="relative">
                          View Project
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#C49A3A] transition-all duration-500 ease-out group-hover:w-full" />
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.5} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          {...reveal}
          transition={reduceMotion ? undefined : { duration: 0.72, delay: 0.25, ease }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/book-consultation"
            className="group inline-flex min-h-[3.25rem] items-center justify-center gap-3 rounded-full border border-[#d5b567]/70 bg-[#fffaf0] px-8 text-[0.78rem] font-medium leading-none tracking-normal text-[rgba(37,27,20,0.82)] shadow-[0_18px_48px_rgba(126,91,31,0.12),0_1px_0_rgba(255,255,255,0.9)_inset] transition duration-500 ease-out hover:-translate-y-0.5 hover:border-[#d7b86d] hover:bg-[#fffdf8] hover:text-[#1b130e] hover:shadow-[0_22px_58px_rgba(177,130,45,0.18),0_0_34px_rgba(214,184,109,0.18)]"
          >
            Book a Consultation
            <ArrowUpRight className="h-4 w-4 text-[#9b7429] transition duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
