"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { images } from "@/content/images";

/**
 * Full-bleed hero photograph. Settles in from a slight zoom on load and drifts
 * at a fraction of scroll speed. Both effects are skipped for reduced motion.
 */
export function HeroImage() {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (y > window.innerHeight * 1.2) return;
      frame.style.transform = `translate3d(0, ${Math.round(y * 0.18)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-night">
      <div ref={frameRef} className="absolute inset-x-0 -top-[6%] h-[112%] will-change-transform">
        <div className="motion-safe:animate-hero-in absolute inset-0">
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            preload
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-[62%_50%]"
          />
        </div>
      </div>
      {/* Legibility scrim: darker at the bottom and left, where the type sits */}
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.6),rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.3))]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.35),rgba(0,0,0,0)_65%)]" />
    </div>
  );
}
