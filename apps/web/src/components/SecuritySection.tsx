import {
  Activity,
  Building2,
  Clock3,
  DraftingCompass,
  Globe2,
  Layers3,
  LockKeyhole,
  ServerCog,
  ShieldCheck,
  type LucideIcon
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

interface AchievementMilestone {
  year: string;
  title: string;
  description: string;
  signal: string;
  Icon: LucideIcon;
}

const securityFeatures = [
  {
    title: "Secure",
    description:
      "Enterprise-grade protection for trade operations, construction planning and business workflows.",
    Icon: LockKeyhole
  },
  {
    title: "Resilient",
    description: "Architected for scalable enterprise systems, reliable project execution and uninterrupted operational continuity.",
    Icon: ServerCog
  },
  {
    title: "Always Available",
    description: "Built with highly available systems and enterprise-level redundancy for modern business ecosystems.",
    Icon: Clock3
  }
];

const achievementMilestones: AchievementMilestone[] = [
  {
    year: "2021",
    title: "Enterprise Foundation",
    description: "Established the operating base for structured governance, private client control and ecosystem readiness.",
    signal: "Foundation live",
    Icon: ShieldCheck
  },
  {
    year: "2022",
    title: "Design Intelligence Expansion",
    description: "Expanded architecture, interiors and visualization workflows into an integrated design intelligence layer.",
    signal: "Design layer",
    Icon: DraftingCompass
  },
  {
    year: "2023",
    title: "Construction Execution Layer",
    description: "Connected project coordination, construction control and delivery governance into a resilient execution rail.",
    signal: "Build control",
    Icon: Building2
  },
  {
    year: "2024",
    title: "Real Estate and Export-Import Operations",
    description: "Advanced asset positioning, trade coordination and monitored shipment pathways for secure enterprise movement.",
    signal: "Trade rail",
    Icon: Globe2
  },
  {
    year: "2025",
    title: "Five-Pillar Enterprise Ecosystem",
    description: "Unified Architecture, Construction, Real Estate, Export & Import and OTC Exchange into one operational growth system.",
    signal: "Unified OS",
    Icon: Layers3
  }
];

export function SecuritySection() {
  return (
    <section
      id="security"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,rgba(248,246,241,0)_0%,rgba(255,252,247,0.72)_44%,rgba(245,242,235,0)_100%)] px-5 py-[88px] text-[#1f1b16] md:px-8 md:py-[104px]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(92,73,36,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(92,73,36,0.08)_1px,transparent_1px)] [background-size:58px_58px]" />
      <div className="pointer-events-none absolute left-1/2 top-10 h-[34rem] w-[72rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12)_0%,rgba(255,252,247,0.18)_42%,transparent_72%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(248,246,241,0.82),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(248,246,241,0.78))]" />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(390px,0.72fr)] lg:items-start lg:gap-12">
          <div className="lg:sticky lg:top-28">
            <div>
              <ScrollReveal>
                <p className="text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-[#9a7429]">
                  Enterprise Security & Reliability
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <h2 className="mt-5 max-w-[760px] font-display text-[clamp(34px,4vw,56px)] font-[650] leading-[0.98] tracking-[0] text-[#201b15]">
                  Enterprise Security Built for the Ractysh Ecosystem
                </h2>
              </ScrollReveal>
              <ScrollReveal>
                <p className="mt-6 max-w-[560px] text-[0.96rem] leading-7 text-[#625c53]">
                  Controlled access, resilient execution layers and monitored availability sit directly behind the ecosystem,
                  so enterprise operations feel precise, visible and dependable.
                </p>
              </ScrollReveal>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-1">
              {securityFeatures.map((feature, index) => (
                <article
                  key={feature.title}
                  className="group relative min-h-[178px] overflow-hidden rounded-[16px] border border-[rgba(212,175,55,0.14)] bg-[rgba(255,255,255,0.72)] p-6 text-[#211914] shadow-[0_22px_58px_rgba(62,47,25,0.075),inset_0_1px_0_rgba(255,255,255,0.78)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[rgba(212,175,55,0.28)] hover:shadow-[0_28px_68px_rgba(62,47,25,0.1)] md:p-7"
                >
                  <div className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.54),transparent)] opacity-60" />

                  <div className="relative z-10 flex items-start justify-between gap-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#d4af37]/18 bg-[#fffaf0] text-[#9c7429] shadow-[0_12px_26px_rgba(74,54,23,0.06)] transition-all duration-200 ease-out group-hover:border-[#d4af37]/40">
                      <feature.Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <span className="text-[0.72rem] font-semibold text-[#9b8f78]">0{index + 1}</span>
                  </div>

                  <h3 className="relative z-10 mt-6 font-display text-[1.45rem] font-semibold leading-none tracking-[0] text-[#211914]">
                    {feature.title}
                  </h3>
                  <p className="relative z-10 mt-4 max-w-[20rem] text-[0.9rem] leading-6 text-[#665e54]">
                    {feature.description}
                  </p>

                  <div className="relative z-10 mt-6 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#9a7429]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c6a45b]" />
                    Operational layer
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[22px] border border-[rgba(212,175,55,0.18)] bg-[#201b15] p-5 text-[#fff8ec] shadow-[0_32px_80px_rgba(30,25,18,0.18)] md:p-6 lg:min-h-[760px]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(214,180,95,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(214,180,95,0.18)_1px,transparent_1px)] [background-size:48px_48px]" />
            <div className="pointer-events-none absolute -right-20 top-4 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(214,180,95,0.16),rgba(246,241,232,0.06)_42%,transparent_70%)]" />
            <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(139,17,24,0.08),rgba(214,180,95,0.06)_44%,transparent_72%)]" />
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(214,180,95,0.6),rgba(255,248,236,0.34),transparent)]" />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="inline-flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#d8bd79]">
                    <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                      <span className="absolute inset-0 rounded-full bg-[#d6b45f] opacity-40" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#d6b45f]" />
                    </span>
                    Ecosystem achievements
                  </p>
                  <h3 className="mt-4 max-w-[24rem] font-display text-[26px] font-semibold leading-[1.04] tracking-[0] text-[#fff4dd] md:text-[32px]">
                    Operational Growth Timeline
                  </h3>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-[rgba(214,180,95,0.18)] bg-[rgba(255,248,236,0.05)] text-[#f1d98d]">
                  <Activity className="h-5 w-5" strokeWidth={1.8} />
                </div>
              </div>

              <div className="relative mt-8">
                <div className="space-y-6">
                  {achievementMilestones.map((milestone) => (
                    <div
                      key={milestone.year}
                      className="relative grid grid-cols-[2.3rem_minmax(0,1fr)] gap-4"
                    >
                      <div className="pt-3">
                        <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(214,180,95,0.2)] bg-[rgba(214,180,95,0.08)] text-[0.62rem] font-semibold text-[#d6b45f]">
                          {milestone.year.slice(2)}
                        </div>
                      </div>

                      <article className="group relative overflow-hidden rounded-[16px] border border-[rgba(214,180,95,0.12)] bg-[rgba(255,248,236,0.04)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 ease-out hover:border-[rgba(214,180,95,0.22)] hover:bg-[rgba(255,248,236,0.07)] md:p-6">
                        <div className="relative z-10 flex items-start justify-between gap-5">
                          <div>
                            <p className="inline-block text-[1.72rem] font-medium leading-none tracking-[0] text-[rgba(255,248,236,0.12)]">
                              {milestone.year}
                            </p>
                            <h4 className="mt-3 font-display text-[1.12rem] font-semibold leading-tight tracking-[0] text-[#fff4dd]">
                              {milestone.title}
                            </h4>
                          </div>
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-[rgba(214,180,95,0.14)] bg-[rgba(255,248,236,0.04)] text-[#f1d98d] transition-all duration-200 ease-out group-hover:border-[rgba(214,180,95,0.28)]">
                            <milestone.Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                          </span>
                        </div>
                        <p className="relative z-10 mt-4 text-[0.91rem] leading-[1.72] text-[rgba(255,248,236,0.72)]">
                          {milestone.description}
                        </p>
                        <div className="relative z-10 mt-5 flex items-center justify-between gap-4 border-t border-[rgba(214,180,95,0.08)] pt-4">
                          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#d8bd79]">
                            {milestone.signal}
                          </span>
                          <span className="h-1.5 w-8 rounded-full bg-[linear-gradient(90deg,rgba(214,180,95,0.16),rgba(241,217,141,0.72))]" />
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
