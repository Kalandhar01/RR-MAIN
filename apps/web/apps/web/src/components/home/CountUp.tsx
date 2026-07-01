"use client";

import { useEffect, useState } from "react";

interface CountUpProps {
  from: number;
  to: number;
  duration?: number;
  started: boolean;
}

export function CountUp({ from, to, duration = 2, started }: CountUpProps) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!started) return;

    let startTime: number;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(from + (to - from) * eased));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [from, to, duration, started]);

  return <>{value}</>;
}
