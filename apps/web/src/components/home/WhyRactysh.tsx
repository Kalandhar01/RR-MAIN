"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Lightbulb, Rocket, BarChart3, Globe } from "lucide-react";

const journey = [
  {
    year: "Vision",
    title: "Define the horizon",
    description: "A clear vision for an integrated enterprise ecosystem spanning five critical industries.",
    icon: Lightbulb
  },
  {
    year: "Strategy",
    title: "Architect the approach",
    description: "Strategic frameworks that align design, construction, trade and finance under one operating model.",
    icon: Target
  },
  {
    year: "Execution",
    title: "Deliver with precision",
    description: "Premium execution across every division with uncompromising quality and accountability.",
    icon: Rocket
  },
  {
    year: "Growth",
    title: "Scale with purpose",
    description: "Organic expansion into new markets, capabilities and partnerships while maintaining standards.",
    icon: BarChart3
  },
  {
    year: "Global",
    title: "Worldwide impact",
    description: "Building a globally respected enterprise with operations spanning continents and industries.",
    icon: Globe
  }
];

export function WhyRactysh() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-bold tracking-[0.25em] text-[#D6B45F] uppercase">
            The Ractysh Way
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-[#111] sm:text-5xl lg:text-6xl">
            From Vision to Global Impact
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#666]">
            Our approach is built on a clear progression from visionary thinking to worldwide
            execution, ensuring every project meets the highest standards.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-[#D6B45F]/40 via-[#D6B45F]/20 to-transparent hidden md:block" />

          <div className="space-y-12">
            {journey.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className={`relative flex flex-col gap-4 md:flex-row ${
                  i % 2 === 0 ? "" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:flex md:w-1/2 items-center">
                  <div className={`${i % 2 === 0 ? "text-right pr-12" : "text-left pl-12"} w-full`}>
                    <span className="font-display text-6xl font-bold text-[#D6B45F]/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div className="relative flex md:w-1/2">
                  <div className="hidden md:flex absolute left-0 top-2 h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#D6B45F] bg-white">
                    <item.icon className="h-4 w-4 text-[#D6B45F]" />
                  </div>

                  <div className="w-full rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#D6B45F]/5 sm:p-8">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F0E8] md:hidden">
                        <item.icon className="h-5 w-5 text-[#D6B45F]" />
                      </div>
                      <span className="text-xs font-bold tracking-[0.2em] text-[#D6B45F] uppercase">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-[#111]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#666]">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
