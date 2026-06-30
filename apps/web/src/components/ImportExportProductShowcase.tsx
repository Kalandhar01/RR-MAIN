"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe, Search, Package } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import type { NavItem } from "@/lib/types";

interface Product {
  id: string;
  title: string;
  description: string;
  origin: string;
  image: string;
  category: string;
}

const products: Product[] = [
  { id: "granite", title: "Granite", description: "Premium quality Indian granite in multiple finishes and colors for international construction and memorial projects.", origin: "India", image: "/images/products/granite.webp", category: "Natural Stones" },
  { id: "marble", title: "Marble", description: "Elegant marble slabs and tiles sourced from Indian quarries, suitable for luxury residential and commercial interiors.", origin: "India", image: "/images/products/marble.webp", category: "Natural Stones" },
  { id: "tiles", title: "Tiles", description: "Wide range of ceramic, porcelain, and vitrified tiles for floors, walls, and facades with modern designs.", origin: "India", image: "/images/products/tiles.webp", category: "Building Materials" },
  { id: "natural-stones", title: "Natural Stones", description: "Sandstone, limestone, slate, and quartzite for landscaping, cladding, and architectural applications.", origin: "India", image: "/images/products/natural-stones.webp", category: "Natural Stones" },
  { id: "furniture", title: "Furniture", description: "Handcrafted wooden and modern furniture pieces designed for residential, hospitality, and office spaces.", origin: "India", image: "/images/products/furniture.webp", category: "Furniture" },
  { id: "modular-furniture", title: "Modular Furniture", description: "Custom modular furniture systems for efficient space utilization in modern workspaces and homes.", origin: "India", image: "/images/products/modular-furniture.webp", category: "Furniture" },
  { id: "office-furniture", title: "Office Furniture", description: "Ergonomic office furniture including desks, chairs, workstations, and storage solutions.", origin: "India", image: "/images/products/office-furniture.webp", category: "Furniture" },
  { id: "wooden-doors", title: "Wooden Doors", description: "Solid wood and engineered wooden doors with premium finishes for residential and commercial projects.", origin: "India", image: "/images/products/wooden-doors.webp", category: "Doors & Windows" },
  { id: "upvc-doors-windows", title: "UPVC Doors & Windows", description: "Energy-efficient uPVC doors and windows with multi-chamber profiles and superior thermal insulation.", origin: "India", image: "/images/products/upvc-doors-windows.webp", category: "Doors & Windows" },
  { id: "aluminium-windows", title: "Aluminium Windows", description: "Powder-coated and anodized aluminium windows with sliding, casement, and curtain wall systems.", origin: "India", image: "/images/products/aluminium-windows.webp", category: "Doors & Windows" },
  { id: "sanitary-ware", title: "Sanitary Ware", description: "Vitreous china sanitary ware including washbasins, water closets, urinals, and bidets.", origin: "India", image: "/images/products/sanitary-ware.webp", category: "Bathroom" },
  { id: "bathroom-fittings", title: "Bathroom Fittings", description: "Premium chrome and brass bathroom fittings including faucets, showers, taps, and accessories.", origin: "India", image: "/images/products/bathroom-fittings.webp", category: "Bathroom" },
  { id: "electrical-materials", title: "Electrical Materials", description: "Complete range of electrical materials including wires, cables, switches, conduits, and distribution boards.", origin: "India", image: "/images/products/electrical-materials.webp", category: "Electrical" },
  { id: "plumbing-materials", title: "Plumbing Materials", description: "High-quality PVC, CPVC, and GI pipes, fittings, valves, and plumbing accessories for all applications.", origin: "India", image: "/images/products/plumbing-materials.webp", category: "Plumbing" },
  { id: "steel-products", title: "Steel Products", description: "TMT bars, structural steel, angles, channels, beams, and sheets for construction and fabrication.", origin: "India", image: "/images/products/steel-products.webp", category: "Steel" },
  { id: "cement-products", title: "Cement Products", description: "OPC, PPC, and specialized cement grades along with ready-mix concrete solutions.", origin: "India", image: "/images/products/cement-products.webp", category: "Cement" },
  { id: "construction-materials", title: "Construction Materials", description: "Aggregates, sand, bricks, blocks, and all essential raw materials for building construction.", origin: "India", image: "/images/products/construction-materials.webp", category: "Construction" },
  { id: "building-hardware", title: "Building Hardware", description: "Door locks, handles, hinges, tower bolts, and architectural hardware in various finishes.", origin: "India", image: "/images/products/building-hardware.webp", category: "Hardware" },
  { id: "interior-products", title: "Interior Products", description: "Decorative interior products including wallpapers, panels, moldings, and ceiling solutions.", origin: "India", image: "/images/products/interior-products.webp", category: "Interior" },
];

const categories = [
  "All",
  "Natural Stones",
  "Building Materials",
  "Furniture",
  "Doors & Windows",
  "Bathroom",
  "Electrical",
  "Plumbing",
  "Steel",
  "Cement",
  "Construction",
  "Hardware",
  "Interior",
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } } };

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Natural Stones": () => <><span className="text-lg">&#x26ED;</span></>,
  "Building Materials": () => <><span className="text-lg">&#x2302;</span></>,
  "Furniture": () => <><span className="text-lg">&#x2712;</span></>,
  "Doors & Windows": () => <><span className="text-lg">&#x25A3;</span></>,
  "Bathroom": () => <><span className="text-lg">&#x2601;</span></>,
  "Electrical": () => <><span className="text-lg">&#x26A1;</span></>,
  "Plumbing": () => <><span className="text-lg">&#x223F;</span></>,
  "Steel": () => <><span className="text-lg">&#x2692;</span></>,
  "Cement": () => <><span className="text-lg">&#x25A0;</span></>,
  "Construction": () => <><span className="text-lg">&#x2699;</span></>,
  "Hardware": () => <><span className="text-lg">&#x2693;</span></>,
  "Interior": () => <><span className="text-lg">&#x2726;</span></>,
};

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-[#D6B45F]/25 hover:bg-white/[0.06] hover:shadow-[0_24px_60px_-20px_rgba(214,180,95,0.15)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D6B45F]/5 via-transparent to-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#D6B45F]/15 bg-[#D6B45F]/5">
            <Package className="h-8 w-8 text-[#D6B45F]/60" />
          </div>
        </div>
        <div className="absolute bottom-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/70 backdrop-blur-sm">
            <Globe className="h-3 w-3 text-[#D6B45F]/80" />
            {product.origin}
          </span>
        </div>
        <div className="absolute right-3 top-3 z-10">
          <span className="inline-flex items-center rounded-full bg-[#D6B45F]/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#D6B45F]">
            {product.category}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold tracking-tight text-white">{product.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">{product.description}</p>
        <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-400/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Export Available
          </span>
          <span className="text-xs text-white/30 transition-colors group-hover:text-[#D6B45F]">
            Inquire &rarr;
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ImportExportProductShowcase({ logoText, items }: { logoText: string; items: NavItem[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#070606] text-white">
      <Navbar logoText={logoText} items={items} />

      <section className="relative overflow-hidden pt-28 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(214,180,95,0.08),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(214,180,95,0.04),transparent_50%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-8 sm:px-8 lg:px-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div variants={fadeUp} className="mb-4 flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-[#D6B45F]/50" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D6B45F]">Ractysh Exim</span>
              <div className="h-px w-8 bg-[#D6B45F]/50" />
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl font-light leading-[0.95] tracking-tighter text-white sm:text-6xl lg:text-7xl"
            >
              Premium Building
              <br />
              <span className="italic text-[#D6B45F]">Product Exports</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/50 sm:text-lg"
            >
              Supplying India&apos;s finest construction and interior materials to global markets.
              Direct sourcing from verified manufacturers with quality assurance and reliable logistics.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mt-12 flex flex-wrap items-center justify-center gap-2"
          >
            {categories.map((cat) => {
              const IconComp = IconMap[cat];
              return (
                <motion.button
                  key={cat}
                  variants={fadeUp}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat
                      ? "border-[#D6B45F] bg-[#D6B45F]/15 text-[#D6B45F]"
                      : "border-white/8 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/80"
                  }`}
                >
                  {IconComp && <IconComp className="h-3.5 w-3.5" />}
                  {cat}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="relative py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Search className="mb-4 h-12 w-12 text-white/20" />
              <p className="text-lg font-medium text-white/40">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="relative border-t border-white/5 py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D6B45F]">Get In Touch</span>
            <h2 className="mt-4 font-display text-3xl font-light leading-tight tracking-tighter text-white sm:text-4xl">
              Source Premium Products
              <br />
              <span className="italic text-[#D6B45F]/80">From India</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/50">
              Request a quote, product catalog, or connect with our trade desk for bulk procurement and export inquiries.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/book-consultation"
                className="group inline-flex items-center gap-2.5 rounded-full border border-[#D6B45F] bg-[#D6B45F]/10 px-8 py-3.5 text-sm font-bold text-[#D6B45F] transition-all duration-300 hover:bg-[#D6B45F] hover:text-[#070606]"
              >
                Request Quote
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-8 py-3.5 text-sm font-bold text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white"
              >
                Contact Trade Desk
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
