"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { company, contact, navigation, portmix, ui } from "@/content/site";
import { cn } from "@/lib/cn";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  active: string;
};

/**
 * Full-screen menu for small screens on Architectural Black: links
 * between hairlines, then the PortMix.ch call to action and office details.
 * Locks scroll, closes on Escape, and is inert while closed.
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
    const focusTimer = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("nav a")?.focus(), 350);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  const stagger = (index: number) => ({
    transitionDelay: open ? `${120 + index * 60}ms` : "0ms",
    opacity: open ? 1 : 0,
    transform: open ? "none" : "translateY(16px)",
  });

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={ui.navigationDialog}
      inert={!open}
      className={cn(
        "fixed inset-0 z-40 flex flex-col bg-night text-white transition-[opacity,visibility] duration-500 lg:hidden",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <div className="container-site flex flex-1 flex-col overflow-y-auto pb-8 pt-[calc(var(--header-h)+2.5rem)]">
        <p className="t-small flex items-center gap-3 text-white/50" style={stagger(0)}>
          <span aria-hidden="true" className="block h-[2px] w-6 bg-accent" />
          {ui.navigationDialog}
        </p>

        <nav aria-label={ui.mobileNav} className="mt-6">
          <ul className="border-t border-white/15">
            {navigation.map((item, index) => {
              const isActive = active === item.href.slice(1);
              return (
                <li
                  key={item.href}
                  className="border-b border-white/15 transition-[opacity,transform] duration-700 ease-out"
                  style={stagger(index + 1)}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive ? "true" : undefined}
                    className="group flex items-center justify-between gap-4 py-4"
                  >
                    <span className="text-[2rem] leading-tight tracking-[-0.035em]">{item.label}</span>
                    <ArrowRight
                      size={18}
                      className={cn(
                        "shrink-0 transition-[transform,opacity] duration-500 ease-out group-hover:translate-x-1",
                        isActive ? "text-accent opacity-100" : "text-white/40",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className="mt-auto space-y-8 pt-12 transition-[opacity,transform] duration-700 ease-out"
          style={stagger(navigation.length + 1)}
        >
          <a
            href={portmix.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex h-14 w-full items-center justify-between bg-accent px-6 text-[0.9375rem] font-medium text-white transition-colors duration-500 hover:bg-[#930000]"
          >
            {portmix.name}
            <ArrowUpRight size={14} />
            <span className="sr-only">{ui.opensInNewTab}</span>
          </a>

          <dl className="grid grid-cols-2 gap-6 border-t border-white/15 pt-6">
            <div>
              <dt className="t-small text-white/45">{contact.facts.telephone}</dt>
              <dd className="mt-1.5">
                <a href={company.phone.href} className="text-white hover:text-white/70">
                  {company.phone.display}
                </a>
              </dd>
            </div>
            <div>
              <dt className="t-small text-white/45">{contact.facts.office}</dt>
              <dd className="t-small mt-1.5 text-white/80">
                {company.address.street}
                <br />
                {company.address.city}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
