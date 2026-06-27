"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  textAlign?: React.CSSProperties["textAlign"];
  onComplete?: () => void;
}

export default function SplitText({
  text,
  className = "",
  delay = 40,
  duration = 1.2,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  tag = "p",
  textAlign = "center",
  onComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const done = useRef(false);
  const onDone = useRef(onComplete);

  useEffect(() => {
    onDone.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.fonts?.status === "loaded") {
      setReady(true);
    } else {
      document.fonts?.ready.then(() => setReady(true));
    }
  }, []);

  useEffect(() => {
    if (!ref.current || !text || !ready || done.current) return;

    const el = ref.current;
    const startPct = (1 - threshold) * 100;
    const start = `top ${startPct}% ${rootMargin}`;

    let targets: Element[] = [];

    const split = new GSAPSplitText(el, {
      type: splitType === "words, chars" ? "words,chars" : splitType,
      linesClass: "split-line",
      wordsClass: "split-word",
      charsClass: "split-char",
    });

    if (split.chars?.length && splitType.includes("chars")) targets = split.chars;
    if (!targets.length && split.words?.length && splitType.includes("words")) targets = split.words;
    if (!targets.length && split.lines?.length && splitType.includes("lines")) targets = split.lines;
    if (!targets.length) targets = split.chars || split.words || split.lines || [];

    if (!targets.length) return;

    const rect = el.getBoundingClientRect();
    const vpHeight = window.innerHeight || document.documentElement.clientHeight;
    const isVisible = rect.top < vpHeight && rect.bottom > 0;

    if (isVisible) {
      gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          onComplete: () => {
            done.current = true;
            onDone.current?.();
          },
        }
      );
    } else {
      gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
          onComplete: () => {
            done.current = true;
            onDone.current?.();
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
      try {
        split.revert();
      } catch {
        // ignore
      }
    };
  }, [text, delay, duration, ease, splitType, from, to, threshold, rootMargin, ready]);

  const Component = tag as "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

  return React.createElement(Component, {
    ref,
    className: `split-parent overflow-hidden block max-w-full whitespace-normal ${className}`,
    style: { textAlign, willChange: "transform, opacity" } as React.CSSProperties,
    dangerouslySetInnerHTML: { __html: text },
  });
}
