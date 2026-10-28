"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { portfolio } from "@/content/site";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";
import { disciplineIcons } from "@/components/ui/LineIcons";

/** Pointer has to rest on a panel this long before it opens, so sweeping across the row does not flicker. */
const HOVER_INTENT_MS = 90;

/**
 * Large screens: the four categories as one row of tall panels. The panel
 * under the pointer widens to show its photograph while the others narrow and
 * dim; the last one opened stays open.
 * Smaller screens: a grid of tiles, four across on tablets, two on phones.
 * The panels are photographs, not links: the one way out to PortMix.ch is the
 * link band below, so visitors are not sent away from every picture.
 */
export function PortfolioGallery() {
  // `changed` keeps icons from redrawing on first render; they draw in with the reveal instead.
  const [{ active, changed }, setSelection] = useState({ active: 0, changed: false });
  const hoverTimer = useRef<number | undefined>(undefined);

  const select = useCallback((index: number) => {
    window.clearTimeout(hoverTimer.current);
    setSelection((s) => (s.active === index ? s : { active: index, changed: true }));
  }, []);

  const selectOnHover = (index: number) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => select(index), HOVER_INTENT_MS);
  };

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 xl:flex xl:h-[clamp(32rem,38vw,40rem)]">
      {portfolio.categories.map((category, index) => {
        const image = images[category.image];
        const Icon = disciplineIcons[category.icon];
        const isActive = index === active;
        return (
          <li
            key={category.title}
            className={cn(
              "relative aspect-[4/5] min-w-0 xl:aspect-auto xl:basis-0 xl:transition-[flex-grow] xl:duration-700 xl:ease-out motion-reduce:transition-none",
              isActive ? "xl:grow-[2.6]" : "xl:grow",
            )}
          >
            <figure
              onMouseEnter={() => selectOnHover(index)}
              onMouseLeave={() => window.clearTimeout(hoverTimer.current)}
              className="group absolute inset-0 overflow-hidden bg-mist"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1600px) 660px, (min-width: 1280px) 46vw, (min-width: 1024px) 23vw, 50vw"
                style={{ objectPosition: "position" in image ? image.position : undefined }}
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
              />
              {/* Legibility gradient, and a veil over the panels that are not open */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(9,9,9,0.78)_0%,rgba(9,9,9,0.2)_40%,rgba(9,9,9,0)_65%)]"
              />
              <div
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 hidden bg-night/35 transition-opacity duration-700 xl:block",
                  isActive ? "opacity-0" : "opacity-100",
                )}
              />

              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5 xl:p-7">
                <Icon data-redraw={isActive && changed} className="h-8 w-8 sm:h-10 sm:w-10 xl:h-12 xl:w-12" />
                <span className="mt-3 block text-lg leading-tight tracking-[-0.02em] sm:text-xl xl:mt-5 xl:text-2xl">
                  {category.title}
                </span>
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
