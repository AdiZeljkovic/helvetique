import { portfolio, portmix, ui } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";
import { PortfolioGallery } from "./PortfolioGallery";

/**
 * Portfolio preview: the headline with its note, the category gallery (panels
 * that open on hover, see PortfolioGallery) and a full-width link band to
 * PortMix.ch that fills with black from the left on hover.
 */
export function Portfolio() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="scroll-mt-[var(--header-h)] bg-paper">
      <div className="container-site py-20 sm:py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <Reveal className="lg:col-span-7">
            <h2 id="portfolio-heading" className="t-h2 text-ink">
              {portfolio.headline[0]}
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p className="t-body max-w-[24rem] text-graphite">{portfolio.text}</p>
          </Reveal>
        </div>

        <Reveal delay={140} className="mt-14 lg:mt-20">
          <PortfolioGallery />
        </Reveal>

        <Reveal delay={180} className="mt-10 lg:mt-14">
          <a
            href={portfolio.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col gap-3 overflow-hidden border-y border-ink/15 py-6 transition-[padding,border-color] duration-700 ease-out hover:border-ink hover:px-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:py-8 lg:hover:px-8"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-700 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
            />
            <span className="t-h3 relative text-graphite transition-colors duration-500 group-hover:text-white/70">
              {portfolio.cta.label}
            </span>
            <span className="relative flex items-center gap-4 text-[clamp(1.75rem,1.2rem+1.6vw,2.75rem)] leading-none tracking-[-0.035em] text-ink transition-colors duration-500 group-hover:text-white">
              {portmix.name}
              <ArrowUpRight
                size={26}
                className="shrink-0 text-accent transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </span>
            <span className="sr-only">{ui.opensInNewTab}</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
