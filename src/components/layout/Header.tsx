"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { navigation, portmix, ui } from "@/content/site";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "@/components/ui/Icons";
import { MobileMenu } from "./MobileMenu";
import { Wordmark } from "./Wordmark";

const SECTION_IDS = ["home", ...navigation.map((item) => item.href.slice(1))];

/**
 * Fixed header. Transparent over the hero, then settles onto a warm ivory
 * ground with a hairline once the page is scrolled. Tracks the section in
 * view to mark the active navigation item with a 2px red line.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 32);
      // Reading progress: a 2px red line that grows across the top of the page.
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A narrow band just above the vertical centre decides the active section.
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

  const solid = scrolled || menuOpen;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-3 focus:text-ivory label"
      >
        {ui.skipToContent}
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-700 ease-soft",
          solid
            ? "border-b hairline bg-ivory/90 backdrop-blur-[6px] supports-[backdrop-filter]:bg-ivory/85"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <span
          ref={progressRef}
          aria-hidden="true"
          className="absolute left-0 top-0 h-[2px] w-full origin-left scale-x-0 bg-accent"
        />
        <div className="container-site flex h-[var(--header-h)] items-center justify-between">
          <Wordmark onClick={closeMenu} />

          <nav aria-label={ui.primaryNav} className="hidden items-center gap-9 lg:flex">
            <ul className="flex items-center gap-9">
              {navigation.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "group relative block py-2 label transition-colors duration-500",
                        isActive ? "text-ink" : "text-ink/70 hover:text-ink",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 -bottom-px h-[2px] origin-left bg-accent transition-transform duration-500 ease-expo",
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <span aria-hidden="true" className="h-5 w-px bg-ink/20" />

            <a
              href={portmix.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 label text-ink transition-colors duration-500 hover:text-accent"
            >
              {portmix.label}
              <ArrowUpRight
                size={12}
                className="transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              <span className="sr-only">{ui.opensInNewTab}</span>
            </a>
          </nav>

          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="group relative -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className="sr-only">{menuOpen ? ui.closeMenu : ui.openMenu}</span>
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span
                className={cn(
                  "absolute left-0 top-0 block h-px w-6 bg-ink transition-transform duration-500 ease-expo",
                  menuOpen && "translate-y-[5.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 block h-px w-6 bg-ink transition-transform duration-500 ease-expo",
                  menuOpen && "-translate-y-[5.5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} active={active} />
    </>
  );
}
