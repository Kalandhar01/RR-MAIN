"use client";

import { Suspense, type ReactNode, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, PerspectiveCamera, Preload, useGLTF } from "@react-three/drei";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ContactCTA } from "./home/ContactCTA";
import {
  ArrowRight,
  ArrowUpRight,
  IndianRupee,
  MapPin
} from "lucide-react";
import Link from "next/link";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1] as const;

const investmentStories = [
  {
    number: "01",
    title: "Land & Building Promoters",
    caption: "Strategic land identification, feasibility and end-to-end promotion for premium developments.",
    image: "/services/showcase-real-estate.webp"
  },
  {
    number: "02",
    title: "Villas",
    caption: "Premium villa projects with modern architecture, private outdoor spaces and luxury finishes.",
    image: "/visualization/gallery-exterior.webp"
  },
  {
    number: "03",
    title: "Plots",
    caption: "Prime plotted developments with clear titles and infrastructure-ready land for investment.",
    image: "/visualization/gallery-exterior.webp"
  },
  {
    number: "04",
    title: "Residential Buildings",
    caption: "Apartments and multi-story residences designed for comfort, community and long-term value.",
    image: "/visualization/gallery-lobby.webp"
  },
  {
    number: "05",
    title: "Commercial Buildings",
    caption: "Office complexes and retail buildings positioned for visibility, access and income.",
    image: "/visualization/hero-studio.webp"
  },
  {
    number: "06",
    title: "Row Houses",
    caption: "Contemporary row house developments with shared amenities and individual identity.",
    image: "/visualization/gallery-exterior.webp"
  },
  {
    number: "07",
    title: "Gated Community",
    caption: "Secure communities with clubhouse, landscaping and 24/7 premium amenities.",
    image: "/visualization/gallery-lobby.webp"
  },
  {
    number: "08",
    title: "Govt Approved Lands & Plots",
    caption: "DTCP and CMDA approved lands with clear documentation and ready-to-build status.",
    image: "/services/showcase-real-estate.webp"
  }
] as const;

const featuredProperties = [
  {
    title: "Luxury Villa Estate",
    type: "Villa",
    location: "Premium Residential Enclave",
    price: "From INR 2.5 Cr",
    image: "/visualization/gallery-exterior.webp"
  },
  {
    title: "Prime Development Plots",
    type: "Plots",
    location: "Growth Corridor",
    price: "From INR 25 Lakhs",
    image: "/visualization/gallery-exterior.webp"
  },
  {
    title: "Premium Apartments",
    type: "Residential",
    location: "City Centre",
    price: "From INR 85 Lakhs",
    image: "/visualization/gallery-lobby.webp"
  },
  {
    title: "Gated Community Villas",
    type: "Gated Community",
    location: "Integrated Township",
    price: "From INR 1.8 Cr",
    image: "/services/showcase-real-estate.webp"
  }
] as const;

const towerModelPath = "/models/luxury-glass-tower.glb";

function ButtonLink({ href, children, variant = "dark" }: { href: string; children: ReactNode; variant?: "dark" | "light" }) {
  return (
    <Link
      href={href}
      className={[
        "real-estate-service-button group inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-[8px] border px-6 py-3 text-[0.78rem] font-bold uppercase tracking-[0] transition duration-300",
        variant === "dark"
          ? "border-[#8B1118] bg-[#8B1118] text-[#fff8ec] shadow-[0_20px_56px_rgba(139,17,24,0.2)] hover:-translate-y-0.5 hover:border-[#741016] hover:bg-[#741016]"
          : "border-[#C9A45C]/58 bg-[#fffaf0] text-[#15110d] shadow-[0_18px_46px_rgba(22,22,22,0.08)] hover:-translate-y-0.5 hover:border-[#8B1118]/45 hover:bg-white"
      ].join(" ")}
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.7} />
    </Link>
  );
}

function SectionHeading({ eyebrow, title, tone = "light" }: { eyebrow: string; title: string; tone?: "light" | "dark" }) {
  return (
    <ScrollReveal className="max-w-[54rem]">
      <p
        className={[
          "flex items-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.26em]",
          tone === "dark" ? "text-[#d8b765]" : "text-[#8b1118]"
        ].join(" ")}
      >
        <span className={["h-px w-10", tone === "dark" ? "bg-[#d8b765]" : "bg-[#b88a44]"].join(" ")} />
        {eyebrow}
      </p>
      <h2
        className={[
          "mt-5 font-display text-[clamp(2.7rem,5vw,6rem)] font-semibold leading-[0.9] tracking-[0]",
          tone === "dark" ? "text-[#fff8ec]" : "text-[#15110d]"
        ].join(" ")}
      >
        {title}
      </h2>
    </ScrollReveal>
  );
}

function RealEstateCamera({ reduceMotion }: { reduceMotion: boolean }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const lookAt = useMemo(() => new THREE.Vector3(0, 3.2, 0), []);
  const target = useMemo(() => new THREE.Vector3(4.5, 3.35, 8.2), []);

  useFrame(({ clock }) => {
    const camera = cameraRef.current;
    if (!camera) return;

    const elapsed = clock.getElapsedTime();
    target.set(
      4.5 + (reduceMotion ? 0 : Math.sin(elapsed * 0.11) * 0.32),
      3.35 + (reduceMotion ? 0 : Math.sin(elapsed * 0.09) * 0.1),
      8.2 + (reduceMotion ? 0 : Math.cos(elapsed * 0.1) * 0.28)
    );
    camera.position.lerp(target, 0.035);
    camera.lookAt(lookAt);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[4.5, 3.35, 8.2]} fov={34} near={0.1} far={80} />;
}

function LuxuryTowerScene({ reduceMotion }: { reduceMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(towerModelPath);
  const model = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    model.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.castShadow = true;
      object.receiveShadow = true;

      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => {
        if (!material) return;
        material.needsUpdate = true;

        if ("envMapIntensity" in material) {
          material.envMapIntensity = material.name.includes("glass") ? 2.4 : 1.35;
        }

        if (material.name.includes("glass")) {
          material.transparent = true;
          material.depthWrite = false;
        }
      });
    });
  }, [model]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (groupRef.current && !reduceMotion) {
      groupRef.current.rotation.y = -0.58 + elapsed * 0.024 + Math.sin(elapsed * 0.12) * 0.045;
      groupRef.current.position.y = -1.1 + Math.sin(elapsed * 0.22) * 0.025;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.08, 0]} rotation={[0, -0.58, 0]} scale={0.7}>
      <primitive object={model} />
    </group>
  );
}

function ArchitecturalStage() {
  return (
    <group position={[0, -1.13, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[4.3, 96]} />
        <meshStandardMaterial color="#f4ead8" roughness={0.48} metalness={0.06} />
      </mesh>
      <gridHelper args={[8.2, 28, "#d1aa66", "#eadbc1"]} position={[0, 0.008, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.014, 0]}>
        <ringGeometry args={[2.95, 3.02, 96]} />
        <meshStandardMaterial color="#c59b56" roughness={0.24} metalness={0.72} />
      </mesh>
    </group>
  );
}

function PropertyModel() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div className="real-estate-service-model relative h-[27rem] overflow-visible sm:h-[31rem] md:h-[46rem] lg:h-[52rem]">
      <div className="absolute inset-[-8%] bg-[radial-gradient(circle_at_52%_12%,rgba(197,155,86,0.25),transparent_28rem),radial-gradient(circle_at_42%_72%,rgba(255,255,255,0.82),transparent_30rem)]" />
      <div className="real-estate-service-gold-sweep absolute inset-[-4%] z-10" aria-hidden />
      <div className="pointer-events-none absolute inset-[-5%] opacity-[0.2] [background-image:linear-gradient(rgba(72,55,30,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(72,55,30,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      <Canvas
        className="absolute inset-0 h-full w-full -translate-y-7 md:translate-y-0"
        style={{ width: "100%", height: "100%" }}
        dpr={[1, 1.5]}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: true }}
      >
        <RealEstateCamera reduceMotion={reduceMotion} />
        <fog attach="fog" args={["#fff7e8", 12, 27]} />
        <ambientLight intensity={0.68} />
        <directionalLight
          castShadow
          position={[5.2, 9.5, 5.8]}
          intensity={2.65}
          color="#fff0c5"
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={28}
          shadow-camera-left={-7}
          shadow-camera-right={7}
          shadow-camera-top={9}
          shadow-camera-bottom={-5}
        />
        <spotLight position={[-4.4, 5.2, 5.6]} angle={0.34} penumbra={0.72} intensity={1.35} color="#d7b66e" />
        <pointLight position={[2.6, 2.2, 3.2]} intensity={1.2} color="#fff7dc" />
        <ArchitecturalStage />
        <Suspense fallback={null}>
          <Environment resolution={256}>
            <Lightformer intensity={4.5} color="#fff4d2" position={[4, 5, 3]} rotation={[0, -0.6, 0]} scale={[5, 6, 1]} />
            <Lightformer intensity={2.4} color="#d4a94f" position={[-3, 3.4, 2]} rotation={[0, 0.7, 0]} scale={[4, 4, 1]} />
            <Lightformer intensity={1.8} color="#c7d6df" position={[0, 6, -4]} scale={[8, 3, 1]} />
          </Environment>
          <LuxuryTowerScene reduceMotion={reduceMotion} />
          <ContactShadows position={[0, -1.09, 0]} opacity={0.25} scale={8.2} blur={2.8} far={4.1} />
          <Preload all />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute left-7 top-9 z-20 rounded-[8px] border border-[#d8bd78]/58 bg-[#fffaf0]/90 px-4 py-3 text-[#15110d] shadow-[0_16px_48px_rgba(58,41,18,0.12)] backdrop-blur-xl md:left-5 md:top-5">
        <p className="text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-[#8b1118]">Finished Tower</p>
        <p className="mt-1 font-display text-[1.5rem] font-semibold leading-none tracking-[0]">Glass Asset</p>
      </div>
    </div>
  );
}

useGLTF.preload(towerModelPath);

export function RealEstateServiceExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const showcaseSectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      const shouldReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const imageItems = gsap.utils.toArray<HTMLElement>("[data-property-image]");
      const drawLines = gsap.utils.toArray<SVGPathElement>("[data-re-draw-line]");

      if (shouldReduce) {
        gsap.set([...imageItems, ...drawLines], { clearProps: "all" });
        root.style.setProperty("--re-showcase-progress", "1");
        return;
      }

      gsap.to("[data-re-grid]", {
        x: 72,
        y: 72,
        duration: 34,
        repeat: -1,
        ease: "none"
      });

      gsap.fromTo(
        "[data-hero-line]",
        { opacity: 0, yPercent: 112, rotateX: -10, transformOrigin: "50% 100%" },
        {
          opacity: 1,
          yPercent: 0,
          rotateX: 0,
          duration: 1.15,
          ease: "power4.out",
          stagger: 0.11,
          delay: 0.08
        }
      );

      imageItems.forEach((image) => {
        gsap.to(image, {
          yPercent: -7,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });
      });

      drawLines.forEach((line, index) => {
        const length = line.getTotalLength();
        gsap.fromTo(
          line,
          { strokeDasharray: length, strokeDashoffset: length, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.45,
            delay: index * 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line.closest("section") ?? root,
              start: "top 76%"
            }
          }
        );
      });

      if (showcaseSectionRef.current) {
        root.style.setProperty("--re-showcase-progress", "1");
      }
    }, root);

    const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(refreshId);
      context.revert();
    };
  }, [reduceMotion]);

  return (
    <article ref={rootRef} className="real-estate-service-page relative isolate overflow-hidden bg-[#fffaf0] text-[#15110d]">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.28]" aria-hidden>
        <div data-re-grid className="absolute inset-[-10%] [background-image:linear-gradient(rgba(72,55,30,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(72,55,30,0.05)_1px,transparent_1px)] [background-size:96px_96px]" />
      </div>

      <section className="relative z-10 flex min-h-[100svh] items-center px-5 pb-8 pt-24 sm:px-6 md:px-8 md:pb-14 lg:pb-20 lg:pt-36 xl:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(197,155,86,0.18),transparent_32rem),linear-gradient(180deg,#fffdf8,#f6ecdc)]" />
        <PropertyBlueprint className="opacity-35" />

        <div className="relative mx-auto flex w-full max-w-[1480px] flex-col gap-7 md:gap-10 lg:grid lg:flex-row lg:grid-cols-[0.88fr_1.12fr] lg:items-center xl:gap-16">
          <div className="order-1 max-w-[46rem] lg:order-none">
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#8b1118]"
            >
              <span className="h-px w-12 bg-[#b88a44]" />
              RACTYSH REAL ESTATE
            </motion.p>

            <h1
              aria-label="Building Assets. Creating Long-Term Value."
              className="mt-7 max-w-[52rem] font-display text-[clamp(3.05rem,5.7vw,6.15rem)] font-semibold leading-[0.92] tracking-[0] text-[#111111]"
            >
              <span data-hero-line className="block">Building Assets.</span>
              <span data-hero-line className="block text-[#8B1118]">
                Creating Long-Term Value.
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease }}
              className="mt-7 max-w-[34rem] text-[1rem] font-medium leading-8 text-[#5d5348] md:text-[1.08rem]"
            >
              Curated property opportunities for ownership, income potential and long-range asset value.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.48, ease }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <ButtonLink href="/book-consultation">Book Consultation</ButtonLink>
              <ButtonLink href="#" variant="light">For More Details, Check This</ButtonLink>
            </motion.div>
            <ScrollReveal className="mt-12 hidden max-w-[34rem] grid-cols-3 border-y border-[#d8c59d]/62 py-5 md:grid">
              {["Wealth", "Ownership", "Value"].map((item) => (
                <div key={item} className="border-r border-[#d8c59d]/52 px-4 first:pl-0 last:border-r-0 last:pr-0">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#8b1118]/70">Real Estate</p>
                  <p className="mt-2 font-display text-[1.35rem] font-semibold leading-none tracking-[0] text-[#211812]">{item}</p>
                </div>
              ))}
            </ScrollReveal>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.05, delay: 0.18, ease }}
            className="relative order-2 -mx-3 -mb-6 w-full self-center lg:order-none lg:mx-0 lg:mb-0"
          >
            <PropertyModel />
          </motion.div>
        </div>
      </section>

      <section id="investment-showcase" ref={showcaseSectionRef} className="real-estate-service-showcase relative z-10 bg-[#fbf6ec] px-5 py-20 text-[#15110d] sm:px-6 md:px-8 lg:py-24 xl:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(197,155,86,0.16),transparent_28rem),radial-gradient(circle_at_82%_66%,rgba(255,255,255,0.72),transparent_32rem),linear-gradient(180deg,#fffdf8,#f3e7d4)]" />
        <PropertyBlueprint className="opacity-28" />

        <div className="relative mx-auto max-w-[1420px]">
          <div className="grid gap-7 lg:grid-cols-[0.62fr_0.38fr] lg:items-end">
            <SectionHeading eyebrow="Investment Showcase" title="Property categories built for ownership decisions." />
            <ScrollReveal className="max-w-[31rem] text-[1rem] font-medium leading-8 text-[#62594f] lg:justify-self-end">
              <p>A horizontal asset story moving from private living to portfolio-grade opportunities.</p>
            </ScrollReveal>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-1 lg:grid-cols-2">
            {investmentStories.map((story, index) => (
              <ScrollReveal key={story.title} delay={index * 0.04} className="real-estate-service-story group overflow-hidden rounded-[8px] border border-[#dfcfaa] bg-[#fffdf8] text-[#15110d] shadow-[0_34px_110px_rgba(184,138,68,0.12)]">
                <article>
                  <div className="grid h-full min-h-[39rem] lg:grid-cols-[minmax(0,0.62fr)_minmax(23rem,0.38fr)]">
                  <figure className="relative min-h-[28rem] overflow-hidden bg-[#111]">
                    <img data-property-image src={story.image} alt={`${story.title} real estate asset`} className="h-[112%] w-full object-cover" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.5))]" />
                    <figcaption className="absolute bottom-5 left-5 rounded-full border border-white/22 bg-black/28 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#fff8ec] backdrop-blur-xl">
                      {story.number}
                    </figcaption>
                  </figure>

                  <div className="flex flex-col justify-between p-6 md:p-8">
                    <div>
                      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#8b1118]/72">Asset Class</p>
                      <h3 className="mt-5 font-display text-[clamp(2.8rem,4.9vw,5.4rem)] font-semibold leading-[0.88] tracking-[0] text-[#15110d]">
                        {story.title}
                      </h3>
                      <p className="mt-6 text-[15px] font-medium leading-[1.85] text-[#62564c]">{story.caption}</p>
                    </div>
                    <div className="mt-10 border-t border-[#d8c188]/48 pt-5">
                      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#9a7428]">
                        Wealth & Ownership
                      </p>
                      <div className="mt-4 flex items-center gap-3 text-[#8b1118]">
                        <span className="h-px w-10 bg-[#d6b45f]" />
                        {index < investmentStories.length - 1 ? <ArrowRight className="h-4 w-4" /> : <IndianRupee className="h-4 w-4" />}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#fffaf0] px-5 py-20 sm:px-6 md:px-8 lg:py-32 xl:px-12">
        <PropertyBlueprint className="opacity-28" />
        <div className="relative mx-auto max-w-[1420px]">
          <div className="grid gap-7 lg:grid-cols-[0.62fr_0.38fr] lg:items-end">
            <SectionHeading eyebrow="Premium Real Estate Solutions" title="Our Real Estate Services" />
            <ScrollReveal className="max-w-[31rem] text-[1rem] font-medium leading-8 text-[#62594f] lg:justify-self-end">
              <p>End-to-end real estate services across residential, commercial, luxury, and advisory verticals.</p>
            </ScrollReveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Residential Properties",
                description: "Building Dreams, One Home at a Time. Premium apartments, row houses, and gated community living.",
                image: "/visualization/gallery-exterior.webp",
                icon: "Home"
              },
              {
                title: "Commercial Properties",
                description: "Prime Spaces for Business Growth. Office complexes, retail buildings, and mixed-use developments.",
                image: "/services/showcase-real-estate.webp",
                icon: "Building2"
              },
              {
                title: "Luxury Villas",
                description: "Exquisite Living, Unmatched Elegance. Premium villa estates with modern architecture and luxury finishes.",
                image: "/visualization/gallery-lobby.webp",
                icon: "Building"
              },
              {
                title: "Investment Advisory",
                description: "Smart Decisions, Maximum Returns. Strategic land identification, feasibility analysis, and portfolio guidance.",
                image: "/visualization/hero-studio.webp",
                icon: "TrendingUp"
              },
              {
                title: "Property Management",
                description: "Hassle-Free Asset Care. End-to-end management with 24/7 maintenance, tenant relations, and compliance tracking.",
                image: "/visualization/presentation-standards.webp",
                icon: "Shield"
              },
              {
                title: "Legal Assistance",
                description: "Expert Guidance, Complete Compliance. Title verification, documentation, and regulatory approval support.",
                image: "/visualization/gallery-interior.webp",
                icon: "Scale"
              }
            ].map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.04}>
                <motion.article
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.45, ease }}
                  className="group overflow-hidden rounded-[20px] border border-[#dfcfaa]/60 bg-white shadow-[0_24px_86px_rgba(58,41,18,0.08)] transition-all duration-500 hover:border-[#C9A45C]/80 hover:shadow-[0_32px_100px_rgba(58,41,18,0.14)]"
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-[#ede5d6]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-col gap-4 p-6 md:p-7">
                    <h3 className="font-display text-[1.65rem] font-semibold leading-[1.1] tracking-[0] text-[#15110d]">
                      {service.title}
                    </h3>
                    <p className="text-[0.92rem] font-medium leading-[1.75] text-[#62594f]">
                      {service.description}
                    </p>
                    <div className="mt-auto flex items-center gap-3 border-t border-[#dfcfaa]/50 pt-5">
                      <Link
                        href="/book-consultation"
                        className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#8B1118] transition-colors hover:text-[#741016]"
                      >
                        Learn More
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-16 flex justify-center">
            <ButtonLink href="/book-consultation">Book a Consultation</ButtonLink>
          </ScrollReveal>
        </div>
      </section>

      <section id="featured-properties" className="relative z-10 bg-[#fffaf0] px-5 py-20 sm:px-6 md:px-8 lg:py-32 xl:px-12">
        <PropertyBlueprint className="opacity-28" />
        <div className="relative mx-auto max-w-[1420px]">
          <div className="grid gap-7 lg:grid-cols-[0.62fr_0.38fr] lg:items-end">
            <SectionHeading eyebrow="Featured Property Gallery" title="A refined gallery of ownership-grade assets." />
            <ScrollReveal className="max-w-[31rem] text-[1rem] font-medium leading-8 text-[#62594f] lg:justify-self-end">
              <p>
                Minimal property presentation focused on asset class, location and entry point.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredProperties.map((property, index) => (
              <ScrollReveal key={property.title} delay={index * 0.04} className="real-estate-service-property group overflow-hidden rounded-[8px] border border-[#dfcfaa] bg-white shadow-[0_24px_86px_rgba(58,41,18,0.08)]">
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.45, ease }}
                >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#ede5d6]">
                  <img data-property-image src={property.image} alt={`${property.title} ${property.type}`} className="h-[112%] w-full object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_36%,rgba(0,0,0,0.46))]" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/36 bg-white/18 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-xl">
                    {property.type}
                  </div>
                  <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/36 bg-white/18 text-white backdrop-blur-xl">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-[1.85rem] font-semibold leading-none tracking-[0] text-[#15110d]">{property.title}</h3>
                  <div className="mt-5 grid gap-3 border-t border-[#dfcfaa] pt-4">
                    <p className="inline-flex items-center gap-2 text-[0.88rem] font-medium text-[#665d51]">
                      <MapPin className="h-4 w-4 text-[#9d742a]" strokeWidth={1.7} />
                      {property.location}
                    </p>
                    <p className="text-[0.95rem] font-semibold text-[#15110d]">{property.price}</p>
                  </div>
                </div>
              </motion.article>
            </ScrollReveal>
            ))}
          </div>
        </div>
      </section>



      <ContactCTA />
    </article>
  );
}

function PropertyBlueprint({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      viewBox="0 0 1200 760"
      preserveAspectRatio="none"
      aria-hidden
    >
      <g fill="none" stroke={dark ? "rgba(216,183,101,0.48)" : "rgba(184,138,68,0.34)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1">
        <path data-re-draw-line d="M96 612 H1098" />
        <path data-re-draw-line d="M178 612 L328 318 L478 612" />
        <path data-re-draw-line d="M398 612 L640 154 L882 612" />
        <path data-re-draw-line d="M586 612 V298 H768 V612" />
        <path data-re-draw-line d="M244 516 H948" />
        <path data-re-draw-line d="M306 421 H884" />
        <path data-re-draw-line d="M398 326 H792" />
      </g>
    </svg>
  );
}
