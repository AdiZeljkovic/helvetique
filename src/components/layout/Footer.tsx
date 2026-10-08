import Link from "next/link";
import { company, navigation, portmix, ui } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";

/**
 * Footer in three bands on Architectural Black:
 * 1. Closing call to action with the phone number.
 * 2. The reverse master logo next to office, navigation, portfolio and company columns.
 * 3. Legal line with a back-to-top link.
 * The red line is used once, as the brand signature above the call to action.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night text-white">
      <div className="container-site">
        {/* 1. Call to action */}
        <div className="grid gap-10 border-b border-white/15 py-20 lg:grid-cols-12 lg:items-end lg:gap-x-8 lg:py-28">
          <div className="lg:col-span-8">
            <p className="t-small flex items-center gap-4 text-white/60">
              <span aria-hidden="true" className="block h-[2px] w-10 bg-accent" />
              {ui.footer.ctaLabel}
            </p>
            <p className="mt-8 text-[clamp(2.25rem,1.3rem+3.4vw,4.75rem)] leading-[1.02] tracking-[-0.04em]">
              <span className="block">{ui.footer.ctaTitle[0]}</span>
              <span className="block text-white/50">{ui.footer.ctaTitle[1]}</span>
            </p>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-4 lg:items-end lg:text-right">
            <a
              href={company.phone.href}
              className="text-[clamp(1.5rem,1.2rem+0.9vw,2rem)] tracking-[-0.03em] text-white transition-colors duration-500 hover:text-white/70"
            >
              {company.phone.display}
            </a>
            <Link
              href="#contact"
              className="group inline-flex h-13 items-center gap-6 self-start bg-accent px-6 text-[0.9375rem] font-medium text-white transition-colors duration-500 hover:bg-[#930000] lg:self-end"
            >
              {ui.footer.ctaButton}
              <ArrowRight size={14} className="transition-transform duration-500 ease-out group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 2. Logo and columns */}
        <div className="grid gap-14 py-16 lg:grid-cols-12 lg:gap-x-8 lg:py-20">
          <div className="lg:col-span-4">
            <Link href="#home" aria-label={company.legalName} className="inline-block">
              <Logo variant="reverse" alt="" className="w-[260px] sm:w-[300px]" />
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4 lg:gap-x-8">
            <div>
              <p className="t-small text-white/45">{ui.footer.office}</p>
              <address className="t-small mt-5 not-italic leading-relaxed text-white/80">
                {company.address.street}
                <br />
                {company.address.city}
                <br />
                {company.address.country}
              </address>
              <a href={company.phone.href} className="t-small mt-3 inline-block text-white hover:text-white/70">
                {company.phone.display}
              </a>
            </div>

            <div>
              <p className="t-small text-white/45">{ui.footer.navigation}</p>
              <nav aria-label={ui.footerNav} className="mt-5">
                <ul className="space-y-2.5">
                  {navigation.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="group t-small text-white/80 hover:text-white">
                        <span className="link-underline group-hover:link-underline-active">{item.label}</span>
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
            © {year} {company.legalName}
          </p>
          <Link href="#home" className="group inline-flex items-center gap-2 text-white/70 hover:text-white">
            {ui.footer.backToTop}
            <ArrowUpRight
              size={12}
              className="-rotate-45 transition-transform duration-500 ease-out group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
