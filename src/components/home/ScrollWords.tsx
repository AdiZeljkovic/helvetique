"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type ScrollWordsProps = {
  text: string;
  className?: string;
};

/**
 * Renders a sentence whose words brighten one by one as the element travels
 * up the viewport. The full sentence is always in the DOM for assistive tech;
 * the effect is purely visual and is skipped for reduced motion.
 */
export function ScrollWords({ text, className }: ScrollWordsProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");
  const [lit, setLit] = useState(words.length);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top enters at 85% of the viewport, 1 when it reaches 35%.
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (vh * 0.5)));
      setLit(Math.round(progress * words.length));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [words.length]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={cn("transition-opacity duration-500", index < lit ? "opacity-100" : "opacity-25")}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </span>
  );
}
