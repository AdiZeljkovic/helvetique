import Link from "next/link";
import { company, navigation, portmix, ui } from "@/content/site";
import { ArrowUpRight } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t hairline-light bg-night text-ivory">
      <div className="container-site">
        {/* Large wordmark */}
        <div className="border-b hairline-light pb-14 pt-16 lg:pb-20 lg:pt-24">
          <span aria-hidden="true" className="mb-10 block h-px w-10 bg-accent lg:mb-14" />
          <p className="font-serif text-[clamp(2.25rem,0.9rem+7vw,9.5rem)] font-light leading-[0.96] tracking-[-0.03em]">
            <span className="block">{company.wordmark[0]}</span>
            <span className="serif-italic block text-stone">{company.wordmark[1]}</span>
          </p>
        </div>

        {/* Navigation and contact */}
        <div className="grid gap-12 py-14 lg:grid-cols-12 lg:gap-x-6 lg:py-20">
          <div className="lg:col-span-3">
            <p className="label-xs flex items-center gap-3 text-stone"><span aria-hidden="true" className="h-px w-4 bg-accent" />{ui.footer.sitemap}</p>
            <nav aria-label={ui.footerNav} className="mt-6">
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="group inline-flex items-center gap-3 text-sm text-ivory/80 hover:text-ivory">
                      <span
                        aria-hidden="true"
                        className="h-px w-0 bg-accent transition-[width] duration-500 ease-expo group-hover:w-4"
                      />
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={portmix.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-sm text-ivory/80 hover:text-ivory"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-accent transition-[width] duration-500 ease-expo group-hover:w-4"
                    />
                    {portmix.name}
                    <ArrowUpRight size={12} className="text-stone" />
                    <span className="sr-only">{ui.opensInNewTab}</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-3">
            <p className="label-xs flex items-center gap-3 text-stone"><span aria-hidden="true" className="h-px w-4 bg-accent" />{ui.footer.office}</p>
            <address className="mt-6 text-sm not-italic leading-relaxed text-ivory/80">
              {company.legalName}
              <br />
              {company.address.street}
              <br />
              {company.address.city}, {company.address.countryShort}
            </address>
            <a href={company.phone.href} className="mt-4 inline-block text-sm text-ivory hover:text-stone">
              {company.phone.display}
            </a>
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <p className="label-xs flex items-center gap-3 text-stone"><span aria-hidden="true" className="h-px w-4 bg-accent" />{ui.footer.practice}</p>
            <ul className="mt-6 space-y-3 text-sm text-ivory/80">
              {ui.footer.practiceList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal row */}
        <div className="flex flex-col gap-4 border-t hairline-light py-8 text-xs text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}
          </p>
          <p className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>ID {company.companyId}</span>
            <a
              href={portmix.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-ivory/80 hover:text-ivory"
            >
              {ui.footer.portfolioOn} {portmix.name}
              <ArrowUpRight
                size={11}
                className="transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              <span className="sr-only">{ui.opensInNewTab}</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
