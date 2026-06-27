"use client";

import { HeroSection } from "@/components/HeroSection";
import { WhoWeAreEnterpriseShowcase } from "@/components/WhoWeAreEnterpriseShowcase";
import type { Division, HeroContent } from "@/lib/types";

interface HomeHeroWhoStoryFlowProps {
  hero: HeroContent;
  divisions: Division[];
}

export function HomeHeroWhoStoryFlow({ hero, divisions }: HomeHeroWhoStoryFlowProps) {
  return (
    <div className="home-hero-story-flow" aria-label="Homepage hero to who we are">
      <span id="who-we-are" className="home-hero-story-anchor" aria-hidden="true" />
      <HeroSection hero={hero} divisions={divisions} />
      <WhoWeAreEnterpriseShowcase
        sectionId="who-we-are-section"
        anchorId="who-we-are-visual-anchor"
        className="who-homepage-section home-hero-story-who-section"
        isActive
      />
    </div>
  );
}
