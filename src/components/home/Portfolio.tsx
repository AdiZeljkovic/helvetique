import Image from "next/image";
import { portfolio, portmix, ui } from "@/content/site";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight } from "@/components/ui/Icons";

/**
 * Compact portfolio preview: one heading row with the call to action,
 * then four category tiles in a single row that all lead to PortMix.ch.
 */
export function Portfolio() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="scroll-mt-[var(--header-h)] bg-paper">
      <div className="container-site py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <Reveal className="lg:col-span-3 lg:self-start">
            <SectionLabel>{portfolio.label}</SectionLabel>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-5">
            <h2 id="portfolio-heading" className="t-h2 text-ink">
              {portfolio.headline[0]}
            </h2>
          </Reveal>
          <Reveal delay={140} className="lg:col-span-4 lg:pb-2">
            <p className="t-body max-w-[24rem] text-graphite">{portfolio.text}</p>
            <Button href={portfolio.cta.href} external className="mt-6">
              {portfolio.cta.label}
            </Button>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:mt-20 lg:grid-cols-4 lg:gap-x-8">
          {portfolio.categories.map((category, index) => {
            const image = images[category.image];
            return (
              <li key={category.title}>
                <Reveal variant="image" delay={index * 80}>
                  <a href={portmix.url} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-mist">
                      <div className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(min-width: 1600px) 370px, (min-width: 1024px) 23vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between gap-3">
                      <span className="tracking-[-0.01em] text-ink sm:text-lg">{category.title}</span>
                      <ArrowUpRight
                        size={13}
                        className="shrink-0 text-muted transition-[transform,color] duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </div>
                    <span className="sr-only">
                      {ui.viewOn(category.title, portmix.name)} {ui.opensInNewTab}
                    </span>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
