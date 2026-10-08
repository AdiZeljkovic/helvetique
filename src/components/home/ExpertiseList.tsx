"use client";

import Image from "next/image";
import { useState } from "react";
import { expertise } from "@/content/site";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";
import { ArrowRight } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Desktop: a sticky photograph on the left that crossfades to the discipline
 * under the pointer (or keyboard focus) in the list on the right.
 * Mobile: every discipline is shown in full with its own photograph.
 */
export function ExpertiseList() {
  const [active, setActive] = useState(0);
  const items = expertise.items;
  const current = items[active];

  return (
    <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-8">
      {/* Sticky image panel, desktop only */}
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-[calc(var(--header-h)+2rem)]">
          <div className="relative aspect-[4/5] overflow-hidden bg-mist">
            {items.map((item, index) => {
              const image = images[item.image];
              return (
                <Image
                  key={item.title}
                  src={image.src}
                  alt={index === active ? image.alt : ""}
                  aria-hidden={index === active ? undefined : true}
                  fill
                  sizes="(min-width: 1600px) 600px, 40vw"
                  className={cn(
                    "object-cover transition-[opacity,transform] duration-[900ms] ease-out",
                    index === active
                      ? "scale-100 opacity-100"
                      : "scale-[1.03] opacity-0",
                  )}
                />
              );
            })}
          </div>
          <div className="mt-4 flex items-baseline justify-between gap-6">
            <p className="text-ink" aria-live="polite">
              {current.title}
            </p>
            <p className="t-small tabular-nums text-muted">
              {pad(active + 1)} / {pad(items.length)}
            </p>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="lg:col-span-6 lg:col-start-7">
        <ol>
          {items.map((item, index) => {
            const isActive = index === active;
            const image = images[item.image];
            return (
              <li
                key={item.title}
                className="relative border-t border-line last:border-b"
              >
                {/* Active marker */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -top-px left-0 hidden h-px bg-ink transition-[width] duration-700 ease-out lg:block",
                    isActive ? "w-full" : "w-0",
                  )}
                />

                {/* Mobile photograph */}
                <div className="relative mt-6 aspect-[4/3] overflow-hidden bg-mist lg:hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>

                <h3>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    aria-pressed={isActive}
                    className="group flex w-full items-baseline gap-6 py-7 text-left lg:cursor-default lg:py-9"
                  >
                    <span
                      className={cn(
                        "t-small w-8 shrink-0 tabular-nums transition-colors duration-500",
                        isActive ? "text-accent" : "text-muted",
                      )}
                    >
                      {pad(index + 1)}
                    </span>
                    <span
                      className={cn(
                        "flex-1 text-[clamp(1.75rem,1.2rem+1.6vw,2.75rem)] leading-[1.05] tracking-[-0.035em] transition-colors duration-500",
                        isActive
                          ? "text-ink"
                          : "text-ink lg:text-ink/30 lg:group-hover:text-ink/60",
                      )}
                    >
                      {item.title}
                    </span>
                    <ArrowRight
                      size={18}
                      className={cn(
                        "hidden shrink-0 self-center transition-[transform,opacity] duration-500 ease-out lg:block",
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-2 opacity-0",
                      )}
                    />
                  </button>
                </h3>

                {/* Description: always open on mobile, open for the active row on desktop */}
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-700 ease-out",
                    isActive
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="pb-8 pl-14 lg:pb-10">
                      <p className="t-body max-w-[32rem] text-graphite">
                        {item.description}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {item.keywords.map((keyword) => (
                          <li
                            key={keyword}
                            className="t-small border border-line px-3 py-1 text-graphite"
                          >
                            {keyword}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <Button
          href={expertise.cta.href}
          variant="text"
          external
          className="mt-10"
        >
          {expertise.cta.label}
        </Button>
      </div>
    </div>
  );
}
