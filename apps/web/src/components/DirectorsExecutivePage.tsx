"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const directors = [
  {
    name: "Ashok Kumar. M",
    qualification: "B.Sc. Physics",
    position: "Director",
    company: "RACTYSH ASSOCIATES PRIVATE LIMITED",
    description:
      "Ashok Kumar provides strategic direction for RACTYSH Associates, contributing to business development, financial planning, operational management, and long-term enterprise growth. His practical leadership supports the company\u2019s commitment to delivering trusted financial and intermediary services with professionalism and integrity.",
    badges: ["Business Strategy", "Financial Operations", "Enterprise Management", "Client Relations"],
    initial: "A"
  },
  {
    name: "C. Naveen",
    qualification: "B.Arch., BIM",
    position: "Director",
    company: "RACTYSH DESIGN PRIVATE LIMITED",
    description:
      "C. Naveen leads architectural planning and design innovation at RACTYSH Design. With expertise in Building Information Modeling (BIM) and modern architectural practices, he oversees the delivery of sustainable, functional, and aesthetically refined projects across residential, commercial, and institutional sectors.",
    badges: ["Architecture", "BIM", "Sustainable Design", "Project Management"],
    initial: "C"
  },
  {
    name: "A. Subash",
    qualification: "B.E. Civil",
    position: "Director",
    company: "RACTYSH INFRA PRIVATE LIMITED",
    description:
      "A. Subash leads the engineering and construction operations of RACTYSH Infra Private Limited. With a strong background in Civil Engineering, he oversees project planning, structural execution, quality assurance, site management, and timely project delivery. His focus on precision, safety, and sustainable construction practices ensures that every infrastructure project is completed to the highest industry standards while delivering long-term value to clients.",
    badges: [
      "Civil Engineering",
      "Infrastructure Development",
      "Construction Management",
      "Structural Execution",
      "Project Planning",
      "Quality Assurance"
    ],
    initial: "A"
  }
];

export default function DirectorsExecutivePage() {
  return (
    <div className="relative isolate overflow-hidden bg-[#f8f3ea] text-[#1c120e]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFCF8_0%,#F8F3EA_50%,#F3EDE0_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 28% 18%, rgba(214,180,95,0.3) 0%, transparent 52%), radial-gradient(circle at 72% 82%, rgba(139,17,24,0.08) 0%, transparent 48%)"
          }}
        />
      </div>

      <section className="relative z-10 mx-auto max-w-[92rem] px-5 pt-28 md:px-10 md:pt-36 lg:px-14 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="text-center"
        >
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#8b1118]">Leadership</p>
          <h1 className="mt-4 font-display text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.03em] text-[#20130f] md:text-[3.6rem]">
            Directors of RACTYSH Group
          </h1>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-[82rem] px-5 pb-28 pt-14 md:px-10 md:pb-36 lg:px-14 xl:px-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {directors.map((director, index) => (
            <motion.div
              key={director.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-[12px] border border-[#d9c28c]/30 bg-white/60 p-6 shadow-[0_24px_80px_rgba(82,52,25,0.06)] backdrop-blur-xl transition-all duration-500 hover:border-[#d9bd7a]/60 hover:shadow-[0_32px_100px_rgba(82,52,25,0.12)]"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,rgba(214,180,95,0.12),transparent_68%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9bd7a]/40 to-transparent" />

              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[10px] bg-[#20130f] text-[1.5rem] font-bold text-[#d9bd7a] shadow-[0_8px_24px_rgba(32,19,15,0.12)]">
                  {director.initial}
                </div>
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#8b1118]">
                    {director.position}
                  </p>
                  <h3 className="mt-1 font-display text-[1.4rem] font-semibold leading-tight tracking-[-0.03em] text-[#20130f]">
                    {director.name}
                  </h3>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[13px] font-medium text-[#8b7a62]">
                    <Building2 className="h-3 w-3" /> {director.qualification}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-[#9a7428]">
                {director.company}
              </p>

              <p className="mt-3 text-[14px] leading-[1.8] text-[#62584e]">
                {director.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {director.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-[4px] border border-[#d9c28c]/30 bg-[#d9bd7a]/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[#7a642e]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
