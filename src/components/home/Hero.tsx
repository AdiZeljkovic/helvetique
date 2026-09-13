import { company, disciplines, hero, ui } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { FigurePlate } from "@/components/ui/FigurePlate";
import { ArrowDown } from "@/components/ui/Icons";
import { HeroImage } from "./HeroImage";

/**
 * Two-panel editorial hero: ivory text column on the left with a red datum
 * line in the margin, photograph bleeding to the right edge with a numbered
 * figure plate. On small screens the text leads and the image follows.
 */
export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="relative bg-ivory">
      <div className="container-site lg:grid lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-12 lg:gap-x-6">
        {/* Text column */}
        <div className="relative flex flex-col pt-[calc(var(--header-h)+2.5rem)] pb-12 lg:col-span-6 lg:pb-16 lg:pt-[calc(var(--header-h)+3.5rem)]">
          <p className="label-xs relative text-muted">
            <span aria-hidden="true" className="absolute -left-3.5 top-[5px] block h-[6px] w-[6px] bg-accent lg:-left-6 xl:-left-10" />
            <span className="block text-ink">{hero.eyebrow[0]}</span>
            <span className="mt-1 block">{hero.eyebrow[1]}</span>
          </p>

          <div className="relative mt-16 lg:mt-auto lg:pt-16">
            {/* Red datum line in the margin, desktop only */}
            <span
              aria-hidden="true"
              className="absolute -left-6 top-16 bottom-0 hidden w-px bg-accent lg:block xl:-left-10"
            />

            <h1
              id="hero-heading"
              className="font-serif text-[clamp(3rem,1.6rem+4.6vw,6.25rem)] font-light leading-[1.04] tracking-[-0.015em] text-ink"
            >
              <span className="block">{hero.headline[0]}</span>
              <span className="block">
                {hero.headline[1]} <em className="serif-italic">{hero.accentWord}</em>
                <span className="text-accent">.</span>
              </span>
            </h1>

            <p className="mt-8 max-w-[26rem] text-[15px] leading-[1.75] text-muted lg:mt-10 lg:text-base">
              {hero.lede}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:mt-12">
              <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
              <Button href={hero.secondaryCta.href} variant="outline" external>
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>

          {/* Vertical coordinate caption, reads downward along the column's right edge */}
          <p
            aria-hidden="true"
            className="label-xs absolute right-0 top-[calc(var(--header-h)+3.5rem)] hidden [writing-mode:vertical-rl] text-muted lg:block"
          >
            {company.address.city.toUpperCase()}
            <span className="my-3 inline-block h-6 w-px bg-accent align-middle" />
            {company.coordinates.lat} / {company.coordinates.lng}
          </p>
        </div>

        {/* Image column */}
        <div className="relative bleed-x aspect-[4/5] max-h-[72svh] lg:col-span-6 lg:bleed-right lg:ml-6 lg:aspect-auto lg:max-h-none">
          <HeroImage />
          <FigurePlate
            index={hero.figure.index}
            title={hero.figure.title}
            meta={hero.figure.meta}
            className="absolute bottom-0 left-0 z-10"
          />
        </div>
      </div>

      {/* Meta strip */}
      <div className="border-t hairline">
        <div className="container-site flex h-[4.5rem] items-center justify-between gap-6 text-muted">
          <p className="label-xs truncate">
            {company.address.street}, {company.address.city}
          </p>
          <p className="label-xs hidden items-center gap-4 md:flex">
            {disciplines.map((d, i) => (
              <span key={d} className="flex items-center gap-4">
                {i > 0 ? <span aria-hidden="true" className="h-[3px] w-[3px] bg-accent" /> : null}
                {d}
              </span>
            ))}
          </p>
          <a href="#studio" className="group inline-flex items-center gap-3 label-xs text-ink">
            <span className="sr-only sm:not-sr-only">{ui.scroll}</span>
            <ArrowDown
              size={12}
              className="transition-transform duration-500 ease-expo group-hover:translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
