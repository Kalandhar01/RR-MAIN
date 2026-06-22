"use client";

import { type ReactNode } from "react";
import type { HTMLAttributes } from "react";

interface GsapSectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function GsapSection({ children, className, ...props }: GsapSectionProps) {
  return (
    <section className={className} {...props}>
      {children}
    </section>
  );
}
