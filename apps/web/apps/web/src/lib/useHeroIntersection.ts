"use client";

import { useEffect, useState } from "react";

export type NavbarVariant = "transparent" | "solid";

export function useHeroIntersection(): {
  isHeroVisible: boolean;
  navbarVariant: NavbarVariant;
} {
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) {
      setIsHeroVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return {
    isHeroVisible,
    navbarVariant: isHeroVisible ? "transparent" : "solid",
  };
}
