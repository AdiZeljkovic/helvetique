"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { navigation, portmix, ui } from "@/content/site";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "@/components/ui/Icons";
import { MobileMenu } from "./MobileMenu";
import { Wordmark } from "./Wordmark";

const SECTION_IDS = navigation.map((item) => item.href.slice(1));

/**
 * Fixed header. White type over the full-bleed hero, then a white bar with a
 * hairline once the page scrolls. The section in view is underlined.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
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
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

  // While the mobile menu is open the header sits on the dark menu panel.
  const solid = scrolled && !menuOpen;
  const tone = solid ? "dark" : "light";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-3 focus:text-white"
      >
        {ui.skipToContent}
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500",
          solid ? "border-line bg-white/95 backdrop-blur-sm" : "border-transparent bg-transparent",
        )}
      >
        <div className="container-site flex h-[var(--header-h)] items-center justify-between">
          <Wordmark tone={tone} onClick={closeMenu} />

          <nav aria-label={ui.primaryNav} className="hidden items-center gap-10 lg:flex">
            <ul className="flex items-center gap-8">
              {navigation.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "group relative py-2 text-[0.9375rem] transition-colors duration-500",
                        solid ? "text-ink" : "text-white",
                      )}
                    >
                      <span className={cn("link-underline group-hover:link-underline-active", isActive && "link-underline-active")}>
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <a
              href={portmix.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border border-accent bg-accent px-4 py-2 text-[0.9375rem] text-white transition-colors duration-500 hover:border-[#930000] hover:bg-[#930000]"
            >
              {portmix.name}
              <ArrowUpRight
                size={12}
                className="transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              <span className="sr-only">{ui.opensInNewTab}</span>
            </a>
          </nav>

          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="group relative flex h-12 w-12 items-center justify-center bg-accent text-white transition-colors duration-500 hover:bg-[#930000] lg:hidden"
          >
            <span className="sr-only">{menuOpen ? ui.closeMenu : ui.openMenu}</span>
            <span aria-hidden="true" className="relative block h-[14px] w-[22px]">
              <span
                className={cn(
                  "absolute left-0 top-0 block h-[2px] w-full bg-current transition-transform duration-500 ease-out",
                  menuOpen && "translate-y-[6px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[6px] block h-[2px] w-full bg-current transition-opacity duration-300",
                  menuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[12px] block h-[2px] w-full bg-current transition-transform duration-500 ease-out",
                  menuOpen && "-translate-y-[6px] -rotate-45",
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
