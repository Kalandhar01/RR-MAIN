"use client";

import { ScrollReveal } from "./ScrollReveal";
import { GroupOverview } from "./GroupOverview";
import { EcosystemCards } from "./EcosystemCards";
import { WhyRactysh } from "./WhyRactysh";
import { FeaturedProjects } from "./FeaturedProjects";
import { TrustPartners } from "./TrustPartners";
import { ContactCTA } from "./ContactCTA";

function GradientSpacer({ from, to, height = "h-16" }: { from: string; to: string; height?: string }) {
  return (
    <div
      className={`${height} pointer-events-none`}
      style={{ background: `linear-gradient(to bottom, ${from}, ${to})` }}
    />
  );
}

export function HomeSections() {
  return (
    <>
      <GradientSpacer from="#1B1611" to="white" height="h-24" />

      <ScrollReveal>
        <GroupOverview />
      </ScrollReveal>

      <GradientSpacer from="white" to="#F8F6F1" />

      <ScrollReveal delay={0.1}>
        <EcosystemCards />
      </ScrollReveal>

      <GradientSpacer from="#F8F6F1" to="white" />

      <ScrollReveal delay={0.05}>
        <WhyRactysh />
      </ScrollReveal>

      <GradientSpacer from="white" to="#F8F6F1" />

      <ScrollReveal delay={0.1}>
        <FeaturedProjects />
      </ScrollReveal>

      <GradientSpacer from="#F8F6F1" to="white" />

      <ScrollReveal delay={0.05}>
        <TrustPartners />
      </ScrollReveal>

      <GradientSpacer from="white" to="#FAF8F4" />

      <ScrollReveal delay={0.1}>
        <ContactCTA />
      </ScrollReveal>
    </>
  );
}
