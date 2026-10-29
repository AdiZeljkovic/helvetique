import Link from "next/link";
import { company, navigation, portmix, ui } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { CurrentYear } from "./CurrentYear";

/**
 * Footer on Architectural Black, over the 12-column grid drawn in faint lines:
 * 1. Closing call to action: the question with its red mark (answering the red
 *    full stop of the hero), a red block that fills white on hover, and the phone.
 * 2. The reverse master logo with a tagline, next to office, navigation,
 *    portfolio and company columns.
 * 3. Legal line with a back-to-top button.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-night text-white">
      {/* The grid, made visible */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="container-site grid h-full grid-cols-4 gap-x-5 sm:gap-x-8 lg:grid-cols-12">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className={cn("border-x border-white/[0.045]", i >= 4 && "hidden lg:block")} />
          ))}
        </div>
      </div>

      <div className="container-site relative">
        {/* 1. Call to action */}
        <div className="grid gap-12 py-20 lg:grid-cols-12 lg:items-end lg:gap-x-8 lg:py-32">
          <div className="lg:col-span-7">
            <p className="t-small flex items-center gap-4 text-white/60">
              <span aria-hidden="true" className="block h-[2px] w-10 bg-accent" />
              {ui.footer.ctaLabel}
            </p>
            <p className="mt-8 text-[clamp(2.75rem,1.4rem+5vw,7.5rem)] leading-[0.95] tracking-[-0.045em]">
              <span className="block">{ui.footer.ctaTitle[0]}</span>
              <span className="block text-white/45">
                {ui.footer.ctaTitle[1]}
                <span className="text-accent">?</span>
              </span>
            </p>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Link
              href="#contact"
              className="group relative flex h-24 items-center justify-between gap-6 overflow-hidden bg-accent px-6 text-white sm:h-28 lg:h-36 lg:px-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-bottom scale-y-0 bg-white transition-transform duration-700 ease-out group-hover:scale-y-100 motion-reduce:transition-none"
              />
              <span className="t-h3 relative transition-colors duration-500 group-hover:text-ink">
                {ui.footer.ctaButton}
              </span>
              <ArrowRight
                size={28}
                className="relative shrink-0 transition-[transform,color] duration-500 ease-out group-hover:translate-x-1.5 group-hover:text-accent"
              />
            </Link>
            <a
              href={company.phone.href}
              className="group mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-white/15 pb-4 transition-colors duration-500 hover:border-white/50"
            >
              <span className="t-small text-white/50">{ui.footer.orCall}</span>
              <span className="text-[clamp(1.5rem,1.2rem+0.9vw,2rem)] leading-none tracking-[-0.03em] text-white transition-colors duration-500 group-hover:text-white/75">
                {company.phone.display}
              </span>
            </a>
          </div>
        </div>

        {/* 2. Logo and columns */}
        <div className="grid gap-14 border-t border-white/15 py-16 lg:grid-cols-12 lg:gap-x-8 lg:py-20">
          <div className="lg:col-span-4">
            <Link href="#home" aria-label={company.legalName} className="inline-block">
              <Logo variant="reverse" alt="" sizes="(min-width: 640px) 320px, 260px" className="w-[260px] sm:w-[320px]" />
            </Link>
            <p className="t-small mt-8 max-w-[20rem] text-white/55">{ui.footer.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 lg:col-span-8 lg:grid-cols-4">
            <div>
              <p className="t-small text-white/45">{ui.footer.office}</p>
              <address className="t-small mt-5 not-italic leading-relaxed text-white/80">
                {company.address.street}
                <br />
                {company.address.city}
              </address>
              <a href={company.phone.href} className="t-small mt-3 block w-fit text-white hover:text-white/70">
                {company.phone.display}
              </a>
              <a href={company.email.href} className="t-small mt-1.5 block w-fit text-white hover:text-white/70">
                {company.email.display}
              </a>
            </div>

            <div>
              <p className="t-small text-white/45">{ui.footer.navigation}</p>
              <nav aria-label={ui.footerNav} className="mt-5">
                {/* Each link is a 32 px tall row (tap targets need at least 24 px); no gaps, so the rhythm stays as before */}
                <ul>
                  {navigation.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="group flex min-h-8 w-fit items-center gap-2 text-white/80 hover:text-white">
                        <ArrowRight
                          size={12}
                          className="-ml-5 text-accent opacity-0 transition-[margin,opacity] duration-500 ease-out group-hover:ml-0 group-hover:opacity-100"
                        />
                        <span className="t-small">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div>
              <p className="t-small text-white/45">{ui.footer.portfolio}</p>
              <a
                href={portmix.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group t-small mt-5 inline-flex items-center gap-2 text-white"
              >
                <span className="link-underline group-hover:link-underline-active">{portmix.name}</span>
                <ArrowUpRight
                  size={12}
                  className="text-accent transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span className="sr-only">{ui.opensInNewTab}</span>
              </a>
              <p className="t-small mt-2 max-w-[14rem] text-white/55">{ui.footer.portfolioText}</p>
            </div>

            <div>
              <p className="t-small text-white/45">{ui.footer.company}</p>
              <p className="t-small mt-5 leading-relaxed text-white/80">
                {company.legalName}
                <br />
                <span className="text-white/55">ID {company.companyId}</span>
                <br />
                <span className="text-white/55">{company.vatNote}</span>
              </p>
            </div>
          </div>
        </div>

        {/* 3. Legal line */}
        <div className="t-small flex flex-col gap-4 border-t border-white/15 py-8 text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear buildYear={year} /> {company.legalName}
          </p>
          <Link href="#home" className="group inline-flex items-center gap-4 text-white/70 hover:text-white">
            {ui.footer.backToTop}
            <span className="grid h-10 w-10 place-items-center border border-white/20 transition-colors duration-500 group-hover:border-accent group-hover:bg-accent">
              <ArrowUpRight
                size={12}
                className="-rotate-45 transition-transform duration-500 ease-out group-hover:-translate-y-0.5"
              />
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
