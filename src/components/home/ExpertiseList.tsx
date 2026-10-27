"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { expertise } from "@/content/site";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";
import { ArrowRight } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { disciplineIcons } from "@/components/ui/LineIcons";

/** Pointer has to rest on a row this long before it is selected, so sweeping across the list does not flicker. */
const HOVER_INTENT_MS = 90;

/** Mobile: how long a tapped row glides to the top; matches the panels' 700 ms transition. */
const GLIDE_MS = 700;

const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;
const easeOutQuart = (t: number) => 1 - (1 - t) ** 4;

/**
 * Moves a tapped row to just below the header (its scroll-margin-top) along one
 * eased curve. The rows above and below it are resizing at the same time, so
 * instead of one scroll command the page is corrected every frame to keep the
 * row on the curve. Returns a function that stops the glide early.
 */
function glideToTop(row: Element): () => void {
  const root = document.documentElement;
  const from = row.getBoundingClientRect().top;
  const to = parseFloat(getComputedStyle(row).scrollMarginTop) || 0;
  const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : GLIDE_MS;
  const start = performance.now();
  let frame = 0;

  // Per-frame corrections must land at once, and the browser must not shift the page on its own.
  root.style.scrollBehavior = "auto";
  root.style.overflowAnchor = "none";

  const stop = () => {
    cancelAnimationFrame(frame);
    root.style.removeProperty("scroll-behavior");
    root.style.removeProperty("overflow-anchor");
    window.removeEventListener("touchstart", stop);
    window.removeEventListener("wheel", stop);
  };
  const step = (now: number) => {
    const elapsed = now - start;
    const t = duration === 0 ? 1 : Math.min(1, elapsed / duration);
    const wanted = from + (to - from) * easeOutQuart(t);
    window.scrollTo(0, window.scrollY + row.getBoundingClientRect().top - wanted);
    // Keep holding the row a moment after the curve ends, while the panel transitions settle.
    if (elapsed < duration + 150) frame = requestAnimationFrame(step);
    else stop();
  };

  // A finger or wheel on the page hands scrolling straight back to the visitor.
  window.addEventListener("touchstart", stop, { passive: true });
  window.addEventListener("wheel", stop, { passive: true });
  frame = requestAnimationFrame(step);
  return stop;
}

/**
 * Desktop: the heading (`children`) and the list on the left, and a sticky
 * photograph on the right, from the top of the section. Selecting a discipline
 * (pointer, keyboard focus or tap) redraws its line icon and lights its red
 * accent, opens its description and raises its photograph over the previous
 * one from the bottom edge up, while the caption below slides to the new title.
 * Mobile: an accordion. One discipline is open, with its photograph above the
 * description. Tapping another closes the open one and opens it, both eased,
 * while the page glides so the tapped row settles just below the header;
 * tapping the open one closes it.
 */
export function ExpertiseList({ children }: { children: ReactNode }) {
  const items = expertise.items;
  const panelId = useId();
  // `previous` stays visible under the incoming photograph while it is raised.
  // `open` only matters on mobile, where the active row can be closed.
  const [{ active, previous, open }, setSelection] = useState<{ active: number; previous: number | null; open: boolean }>({
    active: 0,
    previous: null,
    open: true,
  });
  const hoverTimer = useRef<number | undefined>(undefined);
  const stopGlide = useRef<(() => void) | null>(null);
  const current = items[active];

  const select = useCallback((index: number) => {
    window.clearTimeout(hoverTimer.current);
    setSelection((s) => (s.active === index ? { ...s, open: true } : { active: index, previous: s.active, open: true }));
  }, []);

  const selectOnHover = (index: number) => {
    if (!isDesktop()) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => select(index), HOVER_INTENT_MS);
  };

  const onRowClick = (index: number, event: MouseEvent<HTMLButtonElement>) => {
    if (isDesktop()) {
      select(index);
      return;
    }
    if (index === active) {
      setSelection((s) => ({ ...s, open: !s.open }));
      return;
    }

    const row = event.currentTarget.closest("li");
    if (row) {
      stopGlide.current?.();
      stopGlide.current = glideToTop(row);
    }
    setSelection((s) => ({ active: index, previous: s.active, open: true }));
  };

  useEffect(
    () => () => {
      window.clearTimeout(hoverTimer.current);
      stopGlide.current?.();
    },
    [],
  );

  return (
    <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-8">
      {/* Heading and list */}
      <div className="lg:col-span-6">
        {children}
        <ol className="mt-12 lg:mt-20">
          {items.map((item, index) => {
            const isActive = index === active;
            // Open on mobile; on desktop the active row is always open.
            const isOpen = isActive && open;
            const image = images[item.image];
            const Icon = disciplineIcons[item.icon];
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={index * 90}
                className="relative scroll-mt-[calc(var(--header-h)+0.75rem)] border-t border-ink/15 last:border-b"
              >
                {/* Active marker */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -top-px left-0 hidden h-px bg-ink transition-[width] duration-700 ease-out lg:block",
                    isActive ? "w-full" : "w-0",
                  )}
                />

                <h3>
                  <button
                    type="button"
                    onMouseEnter={() => selectOnHover(index)}
                    onMouseLeave={() => window.clearTimeout(hoverTimer.current)}
                    onFocus={() => isDesktop() && select(index)}
                    onClick={(event) => onRowClick(index, event)}
                    aria-expanded={isOpen}
                    aria-controls={`${panelId}-${index}`}
                    className="group flex w-full items-center gap-4 py-6 text-left sm:gap-5 lg:cursor-default lg:py-9"
                  >
                    {/* Muted with its accent while inactive; redrawn each time it becomes active */}
                    <Icon
                      data-redraw={isActive && previous !== null}
                      className={cn(
                        "h-10 w-10 shrink-0 transition-colors duration-500 sm:h-11 sm:w-11 lg:h-14 lg:w-14",
                        !isOpen && "max-lg:[--icon-accent:currentColor]",
                        isActive
                          ? "text-ink"
                          : "text-ink lg:text-ink/30 lg:[--icon-accent:currentColor] lg:group-hover:text-ink/60",
                      )}
                    />
                    <span
                      className={cn(
                        "flex-1 text-[clamp(1.625rem,1.2rem+1.6vw,2.75rem)] leading-[1.05] tracking-[-0.035em] transition-colors duration-500",
                        isActive ? "text-ink" : "text-ink lg:text-ink/30 lg:group-hover:text-ink/60",
                      )}
                    >
                      {item.title}
                    </span>
                    <ArrowRight
                      size={18}
                      className={cn(
                        "hidden shrink-0 transition-[transform,opacity] duration-500 ease-out lg:block",
                        isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
                      )}
                    />
                    {/* Mobile: plus that becomes a minus when the row is open */}
                    <span aria-hidden="true" className="relative h-4 w-4 shrink-0 lg:hidden">
                      <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-ink" />
                      <span
                        className={cn(
                          "absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-ink transition-transform duration-500 ease-out",
                          isOpen && "scale-y-0",
                        )}
                      />
                    </span>
                  </button>
                </h3>

                {/* Description: the open row on mobile, the active row on desktop */}
                <div
                  id={`${panelId}-${index}`}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-700 ease-out max-lg:motion-reduce:transition-none",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    isActive ? "lg:grid-rows-[1fr] lg:opacity-100" : "lg:grid-rows-[0fr] lg:opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div
                      className={cn(
                        "pb-8 transition-[translate] duration-700 ease-out lg:pb-10 lg:pl-[4.75rem]",
                        !isOpen && "max-lg:translate-y-4",
                        !isActive && "lg:translate-y-3",
                      )}
                    >
                      {/* Mobile photograph, settling from a slight zoom as its row opens */}
                      <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-line sm:aspect-[3/2] lg:hidden">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="100vw"
                          className={cn(
                            "object-cover transition-transform duration-[1200ms] ease-out",
                            isOpen ? "scale-100" : "scale-[1.08]",
                          )}
                        />
                      </div>
                      <p className="t-body max-w-[32rem] text-graphite">{item.description}</p>
                      <p className="t-small mt-5 text-muted">{expertise.scopeLabel}</p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {item.scope.map((entry, entryIndex) => (
                          <li
                            key={entry}
                            style={{ transitionDelay: isActive ? `${240 + entryIndex * 70}ms` : "0ms" }}
                            className={cn(
                              "t-small border border-ink/15 bg-white px-3 py-1 text-graphite transition-[opacity,translate] duration-500 ease-out",
                              !isActive && "lg:translate-y-2 lg:opacity-0",
                            )}
                          >
                            {entry}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
        <Reveal delay={items.length * 90}>
          <Button href={expertise.cta.href} variant="text" external className="mt-10">
            {expertise.cta.label}
          </Button>
        </Reveal>
      </div>

      {/* Sticky image panel, desktop only */}
      <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
        <Reveal delay={120} className="sticky top-[calc(var(--header-h)+2rem)]">
          <div className="relative aspect-[4/5] overflow-hidden bg-line">
            {items.map((item, index) => {
              const image = images[item.image];
              const isActive = index === active;
              // Nothing animates on first render; from the first change on, the active photograph is raised.
              const animate = isActive && previous !== null;
              return (
                <div
                  key={item.title}
                  aria-hidden={isActive ? undefined : true}
                  className={cn(
                    "absolute inset-0 overflow-hidden",
                    isActive && "z-20",
                    index === previous && "z-10",
                    !isActive && index !== previous && "opacity-0",
                    animate && "animate-wipe-up motion-reduce:animate-none",
                  )}
                >
                  <Image
                    src={image.src}
                    alt={isActive ? image.alt : ""}
                    fill
                    sizes="(min-width: 1600px) 600px, 40vw"
                    className={cn("object-cover", animate && "animate-settle motion-reduce:animate-none")}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-5 flex items-center justify-between gap-6">
            <p className="overflow-hidden text-lg tracking-[-0.01em] text-ink" aria-live="polite">
              <span key={active} className="block animate-rise-in motion-reduce:animate-none">
                {current.title}
              </span>
            </p>
            {/* Position in the list, without numbers: the active segment is longer and dark */}
            <div aria-hidden="true" className="flex items-center gap-1.5">
              {items.map((item, index) => (
                <span
                  key={item.title}
                  className={cn(
                    "h-[2px] transition-[width,background-color] duration-700 ease-out",
                    index === active ? "w-10 bg-ink" : "w-4 bg-ink/20",
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
