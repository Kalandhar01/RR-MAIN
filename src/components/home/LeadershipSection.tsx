"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

interface LeadershipSectionProps {
  name: string;
  role: string;
  image: string;
  mission: string;
  vision: string;
}

export function LeadershipSection({ name, role, image, mission, vision }: LeadershipSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="text-xs font-bold tracking-[0.25em] text-[#D6B45F] uppercase">
            Leadership
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-[#111] sm:text-5xl lg:text-6xl">
            Visionary Leadership
          </h2>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 hidden h-24 w-24 rounded-2xl border-8 border-white bg-[#D6B45F] lg:flex items-center justify-center">
              <Quote className="h-8 w-8 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="mb-6">
              <h3 className="font-display text-3xl font-bold text-[#111] sm:text-4xl">{name}</h3>
              <p className="mt-1 text-sm font-medium tracking-wider text-[#D6B45F] uppercase">
                {role}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="mb-2 text-xs font-bold tracking-[0.15em] text-[#D6B45F] uppercase">
                  Our Mission
                </h4>
                <p className="text-base leading-relaxed text-[#555]">{mission}</p>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-bold tracking-[0.15em] text-[#D6B45F] uppercase">
                  Our Vision
                </h4>
                <p className="text-base leading-relaxed text-[#555]">{vision}</p>
              </div>

              <div className="rounded-2xl border border-[#e5e5e5] bg-[#F8F6F1] p-6">
                <Quote className="mb-3 h-6 w-6 text-[#D6B45F]" />
                <p className="text-lg leading-relaxed italic text-[#444]">
                  &ldquo;Ractysh was created to bring serious enterprise discipline to Architecture,
                  Construction, Real Estate, Global Trade and Private Exchange coordination. The
                  group is built around trust, documentation and accountable delivery.&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#D6B45F]/30" />
                  <span className="text-xs font-semibold tracking-wider text-[#D6B45F] uppercase">
                    {name}
                  </span>
                  <div className="h-px flex-1 bg-[#D6B45F]/30" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
