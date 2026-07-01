"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    question: "How quickly can we start?",
    answer:
      "Most demo requests can be reviewed within one business day after the intake is submitted. Priority enterprise requests can move directly into a strategy session once the scope is clear.",
  },
  {
    question: "Do you handle enterprise-scale projects?",
    answer:
      "Yes. Ractysh is structured for multi-stakeholder enterprise requirements across Architecture, Construction, Real Estate, Export-Import operations, OTC Exchange coordination and turnkey execution.",
  },
  {
    question:
      "Can consultations include export-import or OTC exchange workflows?",
    answer:
      "Yes. The consultation can include export-import planning, global trade coordination, private counterparty intake, documentation readiness and enterprise supply workflows.",
  },
  {
    question: "Do you provide site visits?",
    answer:
      "Yes. Site visits can be arranged when the project requires physical inspection, construction review, interior scope validation or infrastructure feasibility assessment.",
  },
  {
    question: "Can Ractysh manage turnkey execution?",
    answer:
      "Yes. When the scope fits the Ractysh ecosystem, the demo can progress into a full execution roadmap with partners, milestones, delivery governance and handover planning.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="relative isolate overflow-hidden bg-[#F8F6F1] px-5 pb-20 pt-16 text-[#181512] md:px-8 md:pb-24 md:pt-20 lg:pt-24"
      id="consultation-faq"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_8%,rgba(214,180,95,0.1),transparent_30rem),radial-gradient(circle_at_18%_82%,rgba(255,252,247,0.94),transparent_30rem),linear-gradient(135deg,#FFFCF7_0%,#F8F6F1_48%,#F4F1EA_100%)]" />
      <div
        className="pointer-events-none absolute -inset-x-8 -inset-y-16 opacity-[0.03] [background-image:linear-gradient(rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:58px_58px]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,164,91,0.3),transparent)]" />

      <div className="mx-auto grid max-w-[86rem] gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-14">
        {/* Left side - heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease }}
          className="relative z-10"
        >
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c6a45b]/20 bg-white/50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#9a7428] backdrop-blur-xl">
              <HelpCircle className="h-3.5 w-3.5" strokeWidth={2} />
              FAQ
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <h2 className="mt-5 font-display text-[2.2rem] font-semibold leading-[1.0] tracking-[-0.02em] text-[#181512] md:text-[2.8rem] lg:text-[3.4rem]">
              Clear answers before the first private session.
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="mt-5 text-[15px] leading-[1.8] text-[#68645b]/80 md:text-[16px]">
              The intake is designed to reduce ambiguity before a senior
              Ractysh team member reviews your requirement.
            </p>
          </ScrollReveal>

          {/* Decorative element */}
          <ScrollReveal>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-[#c6a45b]/40 to-transparent" />
              <div className="flex h-2 w-2 rounded-full bg-[#c6a45b]/40" />
            </div>
          </ScrollReveal>
        </motion.div>

        {/* Right side - FAQ accordion */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.1, ease }}
          className="relative z-10"
        >
          <div className="overflow-hidden rounded-[1.5rem] border border-[#c6a45b]/20 bg-white/55 shadow-[0_32px_100px_rgba(98,78,34,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className={cn(
                    "consult-faq-item border-b border-[#c6a45b]/10 last:border-b-0 transition-all duration-300",
                    isOpen && "is-active"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left md:px-7"
                  >
                    <span
                      className={cn(
                        "text-[15px] font-medium transition-colors duration-300",
                        isOpen ? "text-[#17243a]" : "text-[#4a4640]"
                      )}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                        isOpen
                          ? "border-[#c6a45b]/60 bg-[#c6a45b]/10 text-[#9a7428] rotate-180"
                          : "border-[#c6a45b]/20 bg-white/50 text-[#9a7428]/60"
                      )}
                    >
                      <ChevronDown
                        className="h-4 w-4"
                        strokeWidth={2}
                      />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-6 text-[14px] leading-[1.8] text-[#6b665d]/80 md:px-7">
                          {faq.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
