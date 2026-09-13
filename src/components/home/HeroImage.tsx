"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { images } from "@/content/images";

/**
 * Hero photograph with a barely-there parallax (12% of scroll) and a slow
 * settle-in on load. Both are skipped for prefers-reduced-motion.
 * The inner frame is taller than its container so the drift never exposes edges.
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
      if (y > window.innerHeight * 1.5) return;
      frame.style.transform = `translate3d(0, ${Math.round(y * 0.12)}px, 0)`;
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
    <div className="absolute inset-0 overflow-hidden bg-stone lg:top-[var(--header-h)]">
      <div ref={frameRef} className="absolute inset-x-0 -top-[8%] h-[116%] will-change-transform">
        <div className="motion-safe:animate-hero-in absolute inset-0">
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            preload
            fetchPriority="high"
            sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
