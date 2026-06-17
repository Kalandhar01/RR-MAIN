import {
  ArrowRight,
  Building2,
  Gauge,
  Layers3,
  Network,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { CompanyContactPanel } from "@/components/CompanyContactPanel";
import { ScrollReveal } from "@/components/ScrollReveal";

const coreRows = [
  { label: "Construction sync", sublabel: "Live", progress: "76%" },
  { label: "Real estate layer", sublabel: "Mapped", progress: "68%" },
  { label: "Trade and OTC desk", sublabel: "Active", progress: "88%" }
];

const headingLines = ["Transform", "Five-Pillar", "Enterprise", "Operations"];

export function FinalCTASection() {
  return (
    <section
      id="contact"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#F8F6F1] px-5 py-[92px] text-[#181512] sm:px-6 md:px-8 md:py-[122px]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(214,180,95,0.18),transparent_32rem),radial-gradient(circle_at_18%_72%,rgba(255,252,247,0.95),transparent_30rem),linear-gradient(135deg,#FFFCF7_0%,#F8F6F1_48%,#F4F1EA_100%)]" />
      <div className="pointer-events-none absolute -inset-x-8 -inset-y-16 opacity-80 [background-image:linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px)] [background-size:58px_58px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle,rgba(154,116,40,0.42)_1px,transparent_1.4px)] [background-size:38px_38px] [mask-image:radial-gradient(circle_at_70%_44%,black,transparent_68%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(214,180,95,0.42),transparent)]" />
      <div className="pointer-events-none absolute right-[7%] top-[16%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(214,180,95,0.2),rgba(255,252,247,0.36)_38%,transparent_68%)] opacity-80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,transparent,rgba(255,252,247,0.78))]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1240px] gap-14 lg:grid-cols-[minmax(0,0.86fr)_minmax(24rem,1.06fr)] lg:items-center xl:gap-20">
        <div>
          <ScrollReveal>
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-[#9A7428]">
              Enterprise Transformation
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <h2
              aria-label="Transform Five-Pillar Enterprise Operations"
              className="mt-6 max-w-[760px] font-display text-[clamp(2.95rem,5.35vw,5.6rem)] font-[650] leading-[0.9] tracking-[-0.045em] text-[#181512]"
            >
              {headingLines.map((line, index) => (
                <span
                  key={line}
                  className={index === headingLines.length - 1 ? "block text-[#74675b]" : "block"}
                >
                  {line}
                </span>
              ))}
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="mt-7 max-w-[610px] text-[1rem] font-medium leading-7 text-[#665f55] md:text-[1.08rem]">
              Bring Architecture, Construction, Real Estate, Export-Import and OTC Exchange workflows into a single
              premium operating ecosystem.
            </p>
          </ScrollReveal>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book-consultation"
              className="group relative inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 overflow-hidden rounded-[0.7rem] border border-[#181512]/10 bg-[#090807] px-6 text-[0.9rem] font-semibold text-[#fff8ec] shadow-[0_18px_48px_rgba(24,21,18,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-200 hover:border-[#d6b45f]/62 hover:shadow-[0_22px_56px_rgba(24,21,18,0.24)]"
            >
              <span>Book a Demo</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.3} />
            </Link>
            <Link
              href="#enterprise-solutions"
              className="group inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-[0.7rem] border border-[#d6b45f]/30 bg-[#fffdf8]/58 px-6 text-[0.9rem] font-semibold text-[#181512] shadow-[0_16px_44px_rgba(98,78,34,0.08),inset_0_1px_0_rgba(255,255,255,0.88)] transition-all duration-200 hover:border-[#d6b45f]/48 hover:bg-white/80 hover:shadow-[0_22px_56px_rgba(98,78,34,0.12)]"
            >
              <span>Explore Ecosystem</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.3} />
            </Link>
          </div>
          <CompanyContactPanel mode="consultation" tone="transparent" compact className="mt-6 max-w-4xl" />
        </div>

        <EnterpriseTransformationVisual />
      </div>
    </section>
  );
}

function EnterpriseTransformationVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative min-h-[520px] overflow-hidden rounded-[1.55rem] border border-[#d4af37]/14 bg-white/45 p-4 shadow-[0_40px_130px_rgba(98,78,34,0.13),inset_0_1px_0_rgba(255,255,255,0.9)] sm:min-h-[610px] sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.92),transparent_34%),radial-gradient(circle_at_56%_58%,rgba(214,180,95,0.18),transparent_36%),radial-gradient(circle_at_82%_72%,rgba(139,17,24,0.06),transparent_34%),linear-gradient(145deg,rgba(255,252,247,0.68),rgba(244,241,234,0.38))]" />
      <div className="pointer-events-none absolute left-1/2 top-[18%] h-[31rem] w-[31rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(214,180,95,0.2),rgba(255,255,255,0.28)_34%,transparent_66%)] opacity-80" />

      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 z-40 w-[75%] max-w-[25rem] -translate-x-1/2 -translate-y-1/2">
          <div className="relative overflow-hidden rounded-[1.45rem] border border-[#d4af37]/14 bg-white/58 p-4 text-[#211b17] shadow-[0_42px_120px_rgba(98,78,34,0.18),inset_0_1px_0_rgba(255,255,255,0.94)] sm:p-5">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,255,255,0.28)_44%,rgba(214,180,95,0.13))]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(154,116,40,0.32)_1px,transparent_1px),linear-gradient(90deg,rgba(154,116,40,0.24)_1px,transparent_1px)] [background-size:22px_22px]" />

            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#9a7428]">
                  Enterprise Core
                </p>
                <h3 className="mt-2.5 max-w-[13rem] font-display text-[1.35rem] font-semibold leading-[1.04] tracking-normal text-[#211b17] sm:text-[1.62rem]">
                  Operating ecosystem control
                </h3>
              </div>
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.9rem] border border-[#d6b45f]/28 bg-[#181512] text-[#fff7df] shadow-[0_18px_44px_rgba(33,27,23,0.16)]">
                <Network className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>

            <div className="relative z-10 mt-5 grid gap-2.5">
              {coreRows.map((row) => (
                <div key={row.label} className="rounded-[0.75rem] border border-[#2d281f]/10 bg-white/46 p-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[0.7rem] font-semibold text-[#3c352e]">{row.label}</span>
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#9a7428]">
                      {row.sublabel}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#2d281f]/8">
                    <span
                      className="block h-full rounded-full bg-[linear-gradient(90deg,#9a7428,#d6b45f)]"
                      style={{ width: row.progress }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-4 rounded-[0.9rem] border border-[#d4af37]/14 bg-white/48 p-3 text-[#181512] shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]">
              <div className="flex items-center justify-between">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#9a7428]">
                  Execution pipeline
                </p>
                <span className="flex items-center gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-[#74675b]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d6b45f]" />
                  Syncing
                </span>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {["Plan", "Design", "Build", "Handover"].map((step) => (
                  <div key={step} className="relative min-h-12 rounded-[0.65rem] border border-[#181512]/8 bg-[#fffaf0]/58 p-2">
                    <span className="text-[0.56rem] font-semibold uppercase tracking-[0.12em] text-[#74675b]">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-4 grid grid-cols-3 gap-2">
              {[
                { label: "Build", Icon: Building2 },
                { label: "Pulse", Icon: Gauge },
                { label: "Trust", Icon: ShieldCheck }
              ].map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex min-h-14 flex-col items-center justify-center rounded-[0.72rem] border border-[#d6b45f]/20 bg-[#fff8ea]/64 text-center"
                >
                  <Icon className="h-4 w-4 text-[#9a7428]" strokeWidth={1.8} />
                  <span className="mt-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-[#645a4e]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Only the Enterprise Core box is shown */}

        <div className="absolute bottom-[8%] right-[9%] z-50 flex items-center gap-2 rounded-full border border-[#d4af37]/18 bg-white/58 px-4 py-2 text-[#181512] shadow-[0_18px_52px_rgba(98,78,34,0.11)]">
          <Layers3 className="h-4 w-4 text-[#9a7428]" strokeWidth={1.8} />
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.15em] sm:text-[0.7rem]">System live</span>
        </div>
      </div>
    </div>
  );
}
