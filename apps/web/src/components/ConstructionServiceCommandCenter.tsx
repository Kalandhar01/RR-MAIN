"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { type MutableRefObject, type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  ClipboardCheck,
  HardHat,
  Landmark,
  Ruler,
  ShieldCheck,
  Workflow,
  DraftingCompass,
  GanttChartSquare,
  Trees,
  Home,
  Store,
  Warehouse,
  Hammer,
  Waves,
  ArrowUpFromLine,
  Building,
  Drill,
  Zap,
  Droplets,
  Paintbrush,
  Grid3x3,
  Flower2,
  Route,
  FlaskConical,
  FileCheck,
  Truck,
  type LucideIcon
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { ContactCTA } from "./home/ContactCTA";

gsap.registerPlugin(ScrollTrigger);

type ConstructionPointerRef = MutableRefObject<{ x: number; y: number }>;
type ConstructionProgressRef = MutableRefObject<{ value: number }>;

interface ConstructionSceneProps {
  pointerRef: ConstructionPointerRef;
  progressRef: ConstructionProgressRef;
  reduceMotion: boolean;
}

const ConstructionHeroScene = dynamic<ConstructionSceneProps>(() => import("@/components/ConstructionServiceHeroScene"), {
  ssr: false,
  loading: () => <ConstructionSceneFallback />
});

const commercialTowerImage = "/services/construction-india-commercial-tower.webp";
const reinforcementDeckImage = "/services/construction-india-rebar-deck.webp";
const infrastructureViaductImage = "/services/construction-india-infrastructure-viaduct.webp";
const siteGovernanceImage = "/services/construction-india-site-governance.webp";

const capabilities: {
  title: string;
  body: string;
  Icon: LucideIcon;
  image: string;
  alt: string;
}[] = [
  {
    title: "Civil & MEP Engineering",
    body: "Civil engineering works and consultations, MEP engineering works, electrical works, plumbing works — all coordinated under one technical umbrella.",
    Icon: Landmark,
    image: "https://images.unsplash.com/photo-1762335799349-c7c4c8487432?w=800&q=80",
    alt: "Aerial view of construction site with stacked materials"
  },
  {
    title: "Building Construction",
    body: "Commercial building construction, residential building construction, building renovation, PEB structures and turnkey project delivery with quality control.",
    Icon: Building2,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
    alt: "Modern building construction with scaffolding"
  },
  {
    title: "Interior & Finishing",
    body: "Interior works, painting works, tiles work, turf construction and building material sourcing for premium finish quality.",
    Icon: DraftingCompass,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    alt: "Premium interior design and finishing"
  },
  {
    title: "Landscape & Special Structures",
    body: "Landscape work, swimming pool works, lift execution and mega structure projects and construction for complex developments.",
    Icon: Trees,
    image: "https://images.unsplash.com/photo-1646383642188-5cde1af30af7?w=800&q=80",
    alt: "Aerial view of park landscape and water"
  },
  {
    title: "Government & Tender Works",
    body: "Government building construction and tender works, project management consultation and building approval works.",
    Icon: GanttChartSquare,
    image: "https://images.unsplash.com/photo-1554745007-103d4d5e078c?w=800&q=80",
    alt: "White domed government capitol building"
  },
  {
    title: "Labour & Contracts",
    body: "Labour contracts for skilled and semi-skilled workforce, ensuring timely deployment across all project phases.",
    Icon: HardHat,
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
    alt: "Construction workers on site"
  },
  {
    title: "Testing & Survey",
    body: "Land and building survey works, soil testing and building stability testing for structural integrity and regulatory compliance.",
    Icon: Ruler,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    alt: "Surveying equipment and construction testing"
  },
  {
    title: "Turnkey & Project Management",
    body: "End-to-end turnkey projects with full project management consultation, from initial planning to final handover.",
    Icon: Workflow,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    alt: "Project management and construction planning"
  },
  {
    title: "Residential Building Construction",
    body: "New home construction, housing developments, apartment complexes and villa projects with quality materials and skilled execution.",
    Icon: Home,
    image: "https://images.unsplash.com/photo-1772617662896-73eaa616c56b?w=800&q=80",
    alt: "Residential building under construction with scaffolding"
  },
  {
    title: "Commercial Building Construction",
    body: "Office towers, retail complexes, hotels and mixed-use commercial developments built to enterprise standards.",
    Icon: Store,
    image: "https://images.unsplash.com/photo-1778222413919-0821c825cfaf?w=800&q=80",
    alt: "Modern commercial building facade with windows"
  },
  {
    title: "PEB & Steel Structures",
    body: "Pre-engineered buildings, structural steel fabrication, industrial sheds and warehouse construction with precision engineering.",
    Icon: Warehouse,
    image: "https://images.unsplash.com/photo-1756705406506-50500a12463c?w=800&q=80",
    alt: "Industrial warehouse interior with arched metal ceiling"
  },
  {
    title: "Building Renovation & Restoration",
    body: "Structural retrofitting, facade restoration, heritage building conservation and complete property makeovers.",
    Icon: Hammer,
    image: "https://images.unsplash.com/photo-1742675416657-55d043ce8dce?w=800&q=80",
    alt: "Building facade undergoing renovation and construction"
  },
  {
    title: "Swimming Pool Construction",
    body: "Design and construction of residential and commercial swimming pools with filtration systems, tiling and safety features.",
    Icon: Waves,
    image: "https://images.unsplash.com/photo-1774519677410-9073d1f2d9f5?w=800&q=80",
    alt: "Empty tiled swimming pool under construction"
  },
  {
    title: "Lift & Elevator Installation",
    body: "Passenger and freight elevator installation, maintenance and modernisation for residential and commercial buildings.",
    Icon: ArrowUpFromLine,
    image: "https://images.unsplash.com/photo-1776827732814-5ee81b324615?w=800&q=80",
    alt: "Construction worker on a lift at a building site"
  },
  {
    title: "Mega Structure Projects",
    body: "Large-format infrastructure, high-rise towers, stadiums and complex structural projects executed with advanced engineering.",
    Icon: Building,
    image: "https://images.unsplash.com/photo-1748273491101-9d1db5d1814d?w=800&q=80",
    alt: "Tall building construction with tower crane"
  },
  {
    title: "Concrete Works & Foundation",
    body: "Reinforced concrete works, foundation engineering, slab pouring, column construction and heavy civil concrete systems.",
    Icon: Drill,
    image: "https://images.unsplash.com/photo-1774931363306-5a896cd4dd02?w=800&q=80",
    alt: "Construction workers pouring concrete on a sunny day"
  },
  {
    title: "Electrical Works & Installation",
    body: "Complete electrical systems, panel installation, wiring, lighting, power distribution and safety earthing for all building types.",
    Icon: Zap,
    image: "https://images.unsplash.com/photo-1753272691001-4d68806ac590?w=800&q=80",
    alt: "Electrical panel with wires and components"
  },
  {
    title: "Plumbing & Sanitary Works",
    body: "Water supply systems, drainage networks, sanitary fixture installation, pipe fitting and sewage management solutions.",
    Icon: Droplets,
    image: "https://images.unsplash.com/photo-1768321903687-b0fbf41d4514?w=800&q=80",
    alt: "Plumbing pipes installed in a wall during renovation"
  },
  {
    title: "Painting & Finishing Works",
    body: "Interior and exterior painting, texture finishes, waterproof coatings and decorative wall treatments for premium aesthetics.",
    Icon: Paintbrush,
    image: "https://images.unsplash.com/photo-1745665777586-09381ba528d6?w=800&q=80",
    alt: "Painter painting a white wall during renovation"
  },
  {
    title: "Tiles & Flooring Works",
    body: "Ceramic, porcelain, vitrified tile installation, wooden and vinyl flooring, marble polishing and stone cladding.",
    Icon: Grid3x3,
    image: "https://images.unsplash.com/photo-1773736148755-a1f80cf9ecd8?w=800&q=80",
    alt: "Ornate geometric floor tiles in black white and red"
  },
  {
    title: "Turf & Landscape Development",
    body: "Landscape design, turf installation, garden development, irrigation systems and outdoor space transformation.",
    Icon: Flower2,
    image: "https://images.unsplash.com/photo-1764208637294-49d0eccacf40?w=800&q=80",
    alt: "Lush green garden with mature trees and manicured lawn"
  },
  {
    title: "Road & Infrastructure Works",
    body: "Road construction, pavements, culverts, storm water drainage and civil infrastructure for urban and rural developments.",
    Icon: Route,
    image: "https://images.unsplash.com/photo-1723107638814-b82d69fb66f6?w=800&q=80",
    alt: "Aerial view of building and road construction"
  },
  {
    title: "Soil Testing & Geotechnical",
    body: "Bearing capacity analysis, soil compaction testing, core sample analysis and geotechnical reports for foundation design.",
    Icon: FlaskConical,
    image: "https://images.unsplash.com/photo-1778066994998-97f74a5bf901?w=800&q=80",
    alt: "Excavator loading dirt for geotechnical site investigation"
  },
  {
    title: "Building Approval & Compliance",
    body: "Building plan approvals, statutory compliance, environmental clearances, fire NOC and occupancy certificates.",
    Icon: FileCheck,
    image: "https://images.unsplash.com/photo-1774770511480-34845e3adc93?w=800&q=80",
    alt: "Modern building facade against clear blue sky"
  },
  {
    title: "Building Material Supply",
    body: "Procurement and supply of cement, steel, aggregates, bricks, finishing materials and construction consumables.",
    Icon: Truck,
    image: "https://images.unsplash.com/photo-1768321902156-9358b5373d0a?w=800&q=80",
    alt: "Interior renovation with construction materials and supplies"
  }
];

const projectShowcases = [
  {
    label: "Commercial Tower",
    title: "High-rise concrete frame execution",
    body: "Tower cranes, reinforcement, concrete sequencing and facade readiness managed through one delivery rhythm.",
    image: commercialTowerImage,
    alt: "Indian commercial tower construction site with cranes and engineers at golden hour"
  },
  {
    label: "Reinforcement Works",
    title: "Structural steel and slab preparation",
    body: "Rebar placement, embedded services and site team coordination before concrete pour approvals.",
    image: reinforcementDeckImage,
    alt: "Active construction deck with reinforcement steel and site engineers"
  },
  {
    label: "Infrastructure Shell",
    title: "Large-format structure control",
    body: "Framework, scaffolding and heavy construction systems shaped for high-value enterprise developments.",
    image: infrastructureViaductImage,
    alt: "Indian infrastructure viaduct construction site with cranes and concrete framework at golden hour"
  }
];

const executionSteps = [
  {
    title: "Plan",
    body: "Scope, feasibility, budget signals, authority dependencies and construction sequence are clarified before mobilization."
  },
  {
    title: "Engineer",
    body: "Civil, structural, MEP, procurement and vendor packages are aligned with drawings, safety gates and quality checkpoints."
  },
  {
    title: "Build",
    body: "Site progress, labor coordination, concrete cycles, steel works, interiors, finishes and machinery movement are managed in rhythm."
  },
  {
    title: "Deliver",
    body: "Snag closure, handover documentation, compliance checks, testing reports and client readiness are prepared with accountability."
  }
];

const assuranceBlocks: {
  title: string;
  body: string;
  Icon: LucideIcon;
}[] = [
  {
    title: "Safety Governance",
    body: "Helmet-zone discipline, access control, method statements and inspection routines embedded into site operations.",
    Icon: ShieldCheck
  },
  {
    title: "Quality Control",
    body: "Concrete, reinforcement, alignment, finish, MEP, tiling, painting and welding checks routed through documented approval gates.",
    Icon: Ruler
  },
  {
    title: "Schedule Command",
    body: "Milestone visibility, procurement readiness and decision ownership keep construction movement predictable.",
    Icon: ClipboardCheck
  }
];

export function ConstructionServiceCommandCenter() {
  const rootRef = useRef<HTMLElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const progressRef = useRef({ value: 0 });
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const [heroSceneReady, setHeroSceneReady] = useState(false);
  const [visibleCapabilities, setVisibleCapabilities] = useState(5);
  const totalCapabilities = capabilities.length;
  const hasMoreCapabilities = visibleCapabilities < totalCapabilities;

  const loadMoreCapabilities = () => {
    setVisibleCapabilities((prev) => Math.min(prev + 5, totalCapabilities));
  };

  useEffect(() => {
    if (reduceMotion) {
      setHeroSceneReady(false);
      return;
    }

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(() => setHeroSceneReady(true), { timeout: 1200 });
    } else {
      timeoutId = setTimeout(() => setHeroSceneReady(true), 650);
    }

    return () => {
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [reduceMotion]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (reduceMotion) {
      progressRef.current.value = 1;
      gsap.set(
        root.querySelectorAll(
          "[data-csc-hero-copy], [data-csc-hero-visual], [data-csc-status-panel], [data-csc-project-image], [data-csc-project-parallax], [data-csc-progress-line]"
        ),
        { clearProps: "all", opacity: 1, x: 0, y: 0, scale: 1 }
      );
      return;
    }

    const context = gsap.context(() => {
      const heroCopy = gsap.utils.toArray<HTMLElement>("[data-csc-hero-copy]");

      gsap.set(heroCopy, { opacity: 0, y: 34, force3D: true });
      gsap.set("[data-csc-hero-visual]", { opacity: 0, x: 42, force3D: true });
      gsap.set("[data-csc-status-panel]", { opacity: 0, y: 14, force3D: true });
      gsap.set("[data-csc-project-parallax]", { yPercent: 0, force3D: true });
      gsap.set("[data-csc-progress-line]", {
        scaleX: 0,
        transformOrigin: "0% 50%",
        force3D: true
      });

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to("[data-csc-hero-visual]", { opacity: 1, x: 0, duration: 1 })
        .to(heroCopy, { opacity: 1, y: 0, duration: 0.86, stagger: 0.09 }, "-=0.64")
        .to("[data-csc-status-panel]", { opacity: 1, y: 0, duration: 0.58, stagger: 0.08 }, "-=0.52");

      gsap.to(progressRef.current, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-csc-hero]",
          start: "top top",
          end: "bottom top",
          scrub: 1.12
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-csc-project-parallax]").forEach((image) => {
        gsap.to(image, {
          yPercent: -5.5,
          ease: "none",
          scrollTrigger: {
            trigger: image.closest("[data-csc-project-card]") || image,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        });
      });

      gsap.to("[data-csc-progress-line]", {
        scaleX: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-csc-process]",
          start: "top 72%",
          once: true
        }
      });
    }, root);

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshId);
      context.revert();
    };
  }, [lenis, reduceMotion]);

  const handleVisualMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerRef.current.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    pointerRef.current.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
  };

  const handleVisualLeave = () => {
    pointerRef.current.x = 0;
    pointerRef.current.y = 0;
  };

  return (
    <article
      ref={rootRef}
      className="construction-service-page relative isolate overflow-hidden bg-[#F8F4EE] text-[#161616]"
    >
      <section
        data-csc-hero
        className="relative isolate min-h-[100svh] overflow-hidden px-5 pb-14 pt-28 sm:px-6 md:px-8 lg:px-10 lg:pb-16 lg:pt-32 xl:px-14"
      >
        <ConstructionBackground />

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-8.5rem)] max-w-[1540px] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center xl:gap-14">
          <div className="max-w-[44rem] py-8 lg:py-14">
            <p
              data-csc-hero-copy
              className="inline-flex items-center gap-3 text-[0.76rem] font-bold uppercase leading-none tracking-[0] text-[#8B1118] md:text-[0.82rem]"
            >
              <span className="h-px w-10 bg-[#C9A45C]" />
              RACTYSH CONSTRUCTION DIVISION
            </p>
            <h1
              data-csc-hero-copy
              className="mt-7 font-display text-[3.35rem] font-semibold leading-[0.92] tracking-[0] text-[#161616] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[5.9rem] xl:text-[6.8rem]"
            >
              Building India&apos;s Next Landmarks.
            </h1>
            <p
              data-csc-hero-copy
              className="mt-7 max-w-[37rem] text-[1rem] font-medium leading-8 text-[#5c5148] md:text-[1.08rem]"
            >
               Ractysh Group delivers civil &amp; MEP engineering, commercial &amp; residential buildings, PEB structures, turnkey projects, interior works, landscape, swimming pools, lifts, mega structures, government tenders, labour contracts, project management, surveys, soil testing and building stability testing — all with disciplined execution control.
            </p>
            <div data-csc-hero-copy className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book-consultation"
                className="construction-service-button group inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-[8px] border border-[#C9A45C] bg-[#8B1118] px-6 py-3 text-[0.78rem] font-bold uppercase tracking-[0] text-[#F8F4EE] shadow-[0_20px_56px_rgba(139,17,24,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#761015]"
              >
                <span className="relative z-10">Book Consultation</span>
                <CalendarCheck className="relative z-10 h-4 w-4 transition duration-300 group-hover:rotate-6" />
              </Link>
              <Link
                href="#"
                target="_blank"
                className="construction-service-button group inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-[8px] border border-[#C9A45C]/34 bg-[#F8F4EE]/90 px-6 py-3 text-[0.78rem] font-bold uppercase tracking-[0] text-[#8B1118] shadow-[0_18px_46px_rgba(22,22,22,0.06)] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-[#8B1118]/40 hover:bg-white"
              >
                <span className="relative z-10">For More Details, Check This</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div
              data-csc-hero-copy
              className="mt-10 grid max-w-[40rem] grid-cols-2 gap-3 text-[0.76rem] font-bold uppercase leading-none tracking-[0] text-[#6a5a45] sm:grid-cols-4"
            >
              {["Civil & MEP", "Buildings", "Interiors", "Turnkey", "Mega Structures"].map((item) => (
                <span key={item} className="border-l border-[#C9A45C]/54 pl-3">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div
            data-csc-hero-visual
            className="relative min-h-[31rem] overflow-visible lg:min-h-[46rem]"
            onPointerMove={handleVisualMove}
            onPointerLeave={handleVisualLeave}
          >
            <div className="pointer-events-none absolute inset-0 rounded-[8px] border border-[#C9A45C]/24 bg-[linear-gradient(135deg,rgba(248,244,238,0.86),rgba(246,234,212,0.52))] shadow-[0_34px_120px_rgba(48,34,18,0.12)]" />
            <div className="absolute inset-[-7%]">
              {heroSceneReady ? (
                <ConstructionHeroScene
                  pointerRef={pointerRef}
                  progressRef={progressRef}
                  reduceMotion={Boolean(reduceMotion)}
                />
              ) : (
                <ConstructionSceneFallback />
              )}
            </div>

            <div
              aria-hidden="true"
              data-csc-scan
              className="pointer-events-none absolute bottom-[18%] left-[-22%] h-px w-[58%] bg-gradient-to-r from-transparent via-[#C9A45C]/80 to-transparent"
            />
            <div
              aria-hidden="true"
              data-csc-scan
              className="pointer-events-none absolute right-[3%] top-[19%] h-[46%] w-px bg-gradient-to-b from-transparent via-[#8B1118]/52 to-transparent"
            />

            <div className="pointer-events-none absolute left-0 right-0 top-2 hidden grid-cols-3 gap-3 md:grid">
              {[
                ["Structural Frame", "Active"],
                ["Crane Radius", "Mapped"],
                ["Delivery Control", "Live"]
              ].map(([label, value]) => (
                <div
                  key={label}
                  data-csc-status-panel
                  className="rounded-[6px] border border-[#C9A45C]/24 bg-[#F8F4EE]/84 px-4 py-3 shadow-[0_14px_42px_rgba(38,31,21,0.08)]"
                >
                  <p className="text-[0.58rem] font-bold uppercase leading-none tracking-[0] text-[#8B1118]/72">
                    {label}
                  </p>
                  <p className="mt-2 text-[0.68rem] font-bold uppercase leading-none tracking-[0] text-[#C9A45C]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#F8F4EE] px-5 py-20 sm:px-6 md:px-8 lg:px-10 lg:py-24 xl:px-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A45C]/70 to-transparent" />
        <div className="relative z-10 mx-auto max-w-[1480px]">
          <ScrollReveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-[48rem]">
              <p className="text-[0.76rem] font-bold uppercase leading-none tracking-[0] text-[#8B1118]">
                Construction Scope
              </p>
              <h2 className="mt-5 font-display text-[3rem] font-semibold leading-[0.94] tracking-[0] text-[#161616] sm:text-[4rem] lg:text-[5.25rem]">
                25+ services across the full construction spectrum.
              </h2>
            </div>
            <p className="max-w-[34rem] text-[1rem] font-medium leading-8 text-[#5c5148]">
              From civil engineering and MEP to turnkey delivery, interiors, landscape, swimming pools, lifts, mega
              structures, government tenders and building stability testing — all under one accountable system.
            </p>
          </ScrollReveal>

          <div className="mt-12 flex flex-col gap-6">
            {capabilities.slice(0, visibleCapabilities).map(({ title, body, image, alt }, index) => (
              <ScrollReveal key={title} delay={index * 0.04}>
                <article
                  className="group overflow-hidden rounded-[24px] border border-[#C9A45C]/34 bg-[#fffdf8] text-[#161616] shadow-[0_22px_64px_rgba(48,34,18,0.1)] transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A45C]/70 hover:shadow-[0_30px_88px_rgba(48,34,18,0.14)]"
                >
                  <figure className="relative aspect-[1.08/1] min-h-[14rem] overflow-hidden bg-[#0f0c0a] sm:min-h-[16rem]">
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      className="object-cover opacity-[0.96] transition duration-[1200ms] ease-out group-hover:scale-[1.04]"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,12,10,0.02),rgba(15,12,10,0.32))]" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/38 bg-white/86 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#8B1118] shadow-[0_12px_34px_rgba(18,9,10,0.16)] backdrop-blur-xl">
                      {String(index + 1).padStart(2, "0")} / {totalCapabilities}
                    </span>
                  </figure>
                  <div className="px-5 pb-6 pt-5">
                    <h3 className="font-display text-[2rem] font-semibold leading-[0.95] tracking-normal text-[#161616] sm:text-[2.45rem]">
                      {title}
                    </h3>
                    <p className="mt-4 text-[0.96rem] font-medium leading-7 text-[#5d5248]">
                      {body}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {hasMoreCapabilities && (
            <ScrollReveal className="mt-12 flex justify-center">
              <button
                onClick={loadMoreCapabilities}
                className="group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-[8px] border border-[#C9A45C]/50 bg-[#fffdf8] px-8 py-3 text-[0.65rem] font-bold uppercase tracking-[0] text-[#8B1118] shadow-[0_4px_20px_rgba(201,164,92,0.06)] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#C9A45C] hover:shadow-[0_12px_40px_rgba(201,164,92,0.12)] animate-[loadMoreFloat_3s_ease-in-out_infinite]"
              >
                <span className="relative z-10">Load More</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-all duration-500 group-hover:translate-x-1" />
              </button>
            </ScrollReveal>
          )}
        </div>
      </section>

      <section
        id="construction-projects"
        className="relative isolate overflow-hidden bg-[#161616] px-5 py-20 text-[#F8F4EE] sm:px-6 md:px-8 lg:px-10 lg:py-28 xl:px-14"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(201,164,92,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(201,164,92,0.12)_1px,transparent_1px)] [background-size:76px_76px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A45C]/70 to-transparent" />

        <div className="relative z-10 mx-auto max-w-[1500px]">
          <ScrollReveal className="max-w-[50rem]">
            <p className="text-[0.76rem] font-bold uppercase leading-none tracking-[0] text-[#C9A45C]">
              Project Showcase
            </p>
            <h2 className="mt-5 font-display text-[3rem] font-semibold leading-[0.94] tracking-[0] text-[#F8F4EE] sm:text-[4.2rem] lg:text-[5.8rem]">
              Active construction, visible control.
            </h2>
            <p className="mt-7 max-w-[36rem] text-[1rem] font-medium leading-8 text-[#d8cbb7]">
              Site execution is presented as progress, not promise: cranes moving, reinforcement rising, concrete
              frameworks forming and engineering decisions staying close to the work.
            </p>
          </ScrollReveal>

          <div className="csc-project-gallery mt-12">
            <div className="grid gap-4 lg:min-h-[58rem] lg:grid-cols-5 lg:grid-rows-2">
              {projectShowcases.map((project, index) => (
                <ScrollReveal key={project.title} delay={index * 0.04}>
                <article
                  data-csc-project-card
                  className={`csc-project-panel group relative min-h-[28rem] overflow-hidden rounded-[8px] border border-[#C9A45C]/28 bg-[#161616] ${
                    index === 0 ? "lg:col-span-3 lg:row-span-2" : "lg:col-span-2"
                  }`}
                >
                  <div data-csc-project-parallax className="csc-project-panel-media absolute inset-0">
                    <Image
                      data-csc-project-image
                      src={project.image}
                      alt={project.alt}
                      fill
                      quality={index === 0 ? 88 : 82}
                      sizes={index === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 38vw, 100vw"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="csc-project-panel-wash absolute inset-0" />
                  <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
                    <p className="text-[0.72rem] font-bold uppercase leading-none tracking-[0] text-[#C9A45C]">
                      {project.label}
                    </p>
                    <h3 className="mt-3 max-w-[32rem] font-display text-[2.35rem] font-semibold leading-[0.94] tracking-[0] text-white sm:text-[3.1rem]">
                      {project.title}
                    </h3>
                    <p className="csc-project-panel-body mt-4 max-w-[30rem] text-[0.96rem] font-medium leading-7">
                      {project.body}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section
        data-csc-process
        className="relative isolate overflow-hidden bg-[#F8F4EE] px-5 py-20 sm:px-6 md:px-8 lg:px-10 lg:py-28 xl:px-14"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(22,22,22,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(22,22,22,0.08)_1px,transparent_1px)] [background-size:82px_82px]" />

        <div className="relative z-10 mx-auto max-w-[1460px]">
          <ScrollReveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-[48rem]">
              <p className="text-[0.76rem] font-bold uppercase leading-none tracking-[0] text-[#8B1118]">
                Turnkey Delivery System
              </p>
              <h2 className="mt-5 font-display text-[3rem] font-semibold leading-[0.94] tracking-[0] text-[#161616] sm:text-[4rem] lg:text-[5.35rem]">
                From land readiness to handover.
              </h2>
            </div>
            <p className="max-w-[33rem] text-[1rem] font-medium leading-8 text-[#5c5148]">
              The process keeps design intent, engineering detail, procurement movement and site execution in one
              accountable construction path.
            </p>
          </ScrollReveal>

          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-[#C9A45C]/28 lg:block" />
            <div
              data-csc-progress-line
              className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-[#8B1118] via-[#C9A45C] to-[#8B1118] lg:block"
            />
            <div className="grid gap-4 lg:grid-cols-4">
              {executionSteps.map((step, index) => (
                <ScrollReveal key={step.title} delay={index * 0.04}>
                <article
                  className="relative min-h-[21rem] rounded-[8px] border border-[#C9A45C]/34 bg-white/80 p-6 shadow-[0_22px_70px_rgba(48,34,18,0.08)]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-[8px] border border-[#C9A45C]/42 bg-[#F8F4EE] font-display text-[2rem] font-semibold leading-none tracking-[0] text-[#8B1118]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-12 font-display text-[2.35rem] font-semibold leading-[0.94] tracking-[0] text-[#161616]">
                    {step.title}
                  </h3>
                  <p className="mt-5 text-[0.95rem] font-medium leading-7 text-[#5c5148]">{step.body}</p>
                </article>
              </ScrollReveal>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#F8F4EE] px-5 pb-20 sm:px-6 md:px-8 lg:px-10 lg:pb-28 xl:px-14">
        <div className="relative z-10 mx-auto grid max-w-[1460px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <ScrollReveal className="relative min-h-[28rem] overflow-hidden rounded-[8px] border border-[#C9A45C]/42 bg-[#161616] shadow-[0_34px_110px_rgba(48,34,18,0.18)] lg:min-h-[40rem]">
            <Image
              src={siteGovernanceImage}
              alt="Engineers overlooking an active Indian urban commercial construction site"
              fill
              quality={88}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,22,22,0.02)_0%,rgba(22,22,22,0.18)_54%,rgba(22,22,22,0.72)_100%)]" />
            <div className="absolute inset-x-6 bottom-6">
              <p className="text-[0.76rem] font-bold uppercase leading-none tracking-[0] text-[#C9A45C]">
                Enterprise Site Governance
              </p>
              <p className="mt-3 max-w-[34rem] font-display text-[2.4rem] font-semibold leading-[0.96] tracking-[0] text-white sm:text-[3.2rem]">
                Decisions stay close to the structure.
              </p>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal className="max-w-[44rem]">
              <p className="text-[0.76rem] font-bold uppercase leading-none tracking-[0] text-[#8B1118]">
                Safety, Quality, Schedule
              </p>
              <h2 className="mt-5 font-display text-[3rem] font-semibold leading-[0.94] tracking-[0] text-[#161616] sm:text-[4rem] lg:text-[5.1rem]">
                25+ construction capabilities at enterprise scale.
              </h2>
              <p className="mt-7 max-w-[34rem] text-[1rem] font-medium leading-8 text-[#5c5148]">
                Ractysh construction teams align civil, MEP, building, interior, landscape and testing workstreams
                with inspection gates, procurement readiness, safety routines and transparent client reporting.
              </p>
            </ScrollReveal>

            <div className="mt-9 grid gap-4">
              {assuranceBlocks.map(({ title, body, Icon }, index) => (
                <ScrollReveal key={title} delay={index * 0.04}>
                <article
                  className="flex gap-5 rounded-[8px] border border-[#C9A45C]/34 bg-white/80 p-5 shadow-[0_18px_56px_rgba(48,34,18,0.08)]"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[8px] border border-[#C9A45C]/40 bg-[#F8F4EE] text-[#8B1118]">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="font-display text-[1.8rem] font-semibold leading-none tracking-[0] text-[#161616]">
                      {title}
                    </h3>
                    <p className="mt-3 text-[0.95rem] font-medium leading-7 text-[#5c5148]">{body}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </article>
  );
}

function ConstructionBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[#F8F4EE]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(22,22,22,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(22,22,22,0.08)_1px,transparent_1px)] [background-size:78px_78px]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[62%] bg-[linear-gradient(90deg,rgba(248,244,238,0)_0%,rgba(201,164,92,0.12)_58%,rgba(139,17,24,0.1)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#F8F4EE] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#F8F4EE] to-transparent" />
    </>
  );
}

function ConstructionSceneFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(201,164,92,0.42)_1px,transparent_1px),linear-gradient(90deg,rgba(201,164,92,0.32)_1px,transparent_1px)] [background-size:52px_52px]" />
      <div className="absolute bottom-[20%] left-[18%] h-[46%] w-[30%] border border-[#C9A45C]/44 bg-[#F8F4EE]/16" />
      <div className="absolute bottom-[26%] left-[28%] h-[56%] w-px bg-[#8B1118]/44" />
      <div className="absolute left-[12%] top-[22%] h-px w-[62%] bg-[#C9A45C]/54" />
    </div>
  );
}
