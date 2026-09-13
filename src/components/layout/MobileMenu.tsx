"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { company, disciplines, navigation, portmix, ui } from "@/content/site";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "@/components/ui/Icons";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  active: string;
};

/**
 * Full-screen editorial menu for small screens. Numbered serif items,
 * office details at the foot, ivory ground. Locks body scroll while open,
 * closes on Escape, and is inert when closed so it never traps focus.
 */
export function MobileMenu({ open, onClose, active }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const firstLink = panelRef.current?.querySelector<HTMLElement>("a");
    const focusTimer = window.setTimeout(() => firstLink?.focus(), 350);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={ui.navigationDialog}
      inert={!open}
      className={cn(
        "fixed inset-0 z-40 flex flex-col bg-ivory pt-[var(--header-h)] transition-[opacity,visibility] duration-500 ease-soft lg:hidden",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <div className="container-site flex flex-1 flex-col overflow-y-auto pb-8 pt-6">
        <nav aria-label={ui.mobileNav} className="border-t hairline">
          <ul>
            {navigation.map((item, index) => {
              const isActive = active === item.href.slice(1);
              return (
                <li
                  key={item.href}
                  className="border-b hairline transition-[opacity,transform] duration-700 ease-expo"
                  style={{
                    transitionDelay: open ? `${120 + index * 60}ms` : "0ms",
                    opacity: open ? 1 : 0,
                    transform: open ? "none" : "translateY(16px)",
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive ? "true" : undefined}
                    className="group flex items-baseline gap-5 py-5"
                  >
                    <span className={cn("label-xs w-6", isActive ? "text-accent" : "text-muted")}>
                      0{index + 1}
                    </span>
                    <span className="display-sm font-serif text-ink transition-transform duration-500 ease-expo group-hover:translate-x-2">
                      {item.label}
                    </span>
                    {isActive ? (
                      <span aria-hidden="true" className="ml-auto h-px w-6 self-center bg-accent" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
            <li
              className="border-b hairline transition-[opacity,transform] duration-700 ease-expo"
              style={{
                transitionDelay: open ? `${120 + navigation.length * 60}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(16px)",
              }}
            >
              <a
                href={portmix.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="group flex items-center gap-5 py-5"
              >
                <span className="label-xs w-6 text-muted">↗</span>
                <span className="display-sm serif-italic text-ink">{portmix.name}</span>
                <ArrowUpRight
                  size={16}
                  className="ml-auto text-ink transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span className="sr-only">{ui.opensInNewTab}</span>
              </a>
            </li>
          </ul>
        </nav>

        <div
          className="mt-auto grid gap-6 pt-10 text-sm text-muted transition-opacity duration-700 ease-soft sm:grid-cols-2"
          style={{ transitionDelay: open ? "460ms" : "0ms", opacity: open ? 1 : 0 }}
        >
          <address className="not-italic leading-relaxed">
            <span className="block text-ink">{company.legalName}</span>
            {company.address.street}
            <br />
            {company.address.city}, {company.address.country}
          </address>
          <div className="leading-relaxed">
            <a href={company.phone.href} className="block text-ink">
              {company.phone.display}
            </a>
            <span className="label-xs mt-3 block">{disciplines.join(" / ")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
