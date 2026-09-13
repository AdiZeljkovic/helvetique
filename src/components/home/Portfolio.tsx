import Image from "next/image";
import { portfolio, portmix, ui } from "@/content/site";
import { images } from "@/content/images";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowUpRight } from "@/components/ui/Icons";

/** Grid placement and aspect for each category tile, by position. */
const tileLayout = [
  { span: "lg:col-span-7", aspect: "aspect-[4/3]", offset: "", sizes: "(min-width: 1440px) 840px, (min-width: 1024px) 58vw, 100vw" },
  { span: "lg:col-span-5", aspect: "aspect-[3/4]", offset: "lg:mt-24", sizes: "(min-width: 1440px) 600px, (min-width: 1024px) 42vw, 100vw" },
  { span: "lg:col-span-5", aspect: "aspect-square", offset: "lg:-mt-40", sizes: "(min-width: 1440px) 600px, (min-width: 1024px) 42vw, 100vw" },
  { span: "lg:col-span-7", aspect: "aspect-[2/1]", offset: "", sizes: "(min-width: 1440px) 840px, (min-width: 1024px) 58vw, 100vw" },
] as const;

export function Portfolio() {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="scroll-mt-[var(--header-h)] bg-ivory"
    >
      <div className="container-site py-24 lg:py-36">
        <Reveal>
          <SectionHeader number={portfolio.number} label={portfolio.label} aside={portfolio.aside} />
        </Reveal>

        <div className="mt-14 flex flex-col gap-10 lg:mt-20 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={80}>
            <h2 id="portfolio-heading" className="display-lg text-ink">
              <span className="block">{portfolio.headline[0]}</span>
              <span className="serif-italic block text-muted">{portfolio.headline[1]}</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="max-w-[22rem] text-[15px] leading-[1.75] text-muted lg:pb-3">{portfolio.note}</p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-x-6 gap-y-14 lg:mt-24 lg:grid-cols-12 lg:gap-y-6">
          {portfolio.categories.map((category, index) => {
            const layout = tileLayout[index] ?? tileLayout[0];
            const image = images[category.image];
            return (
              <li key={category.title} className={[layout.span, layout.offset].join(" ")}>
                <Reveal variant="image" delay={index * 90}>
                  <a
                    href={portmix.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <figure>
                      <div className={["relative overflow-hidden bg-stone", layout.aspect].join(" ")}>
                        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.03]">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes={layout.sizes}
                            className="object-cover"
                          />
                        </div>
                        <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-700 ease-soft group-hover:bg-ink/15" />
                        {/* Corner index, appears on hover */}
                        <span
                          aria-hidden="true"
                          className="label-xs absolute left-0 top-0 bg-ivory px-3 py-2 text-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        >
                          {category.index}
                        </span>
                      </div>
                      <figcaption className="relative mt-4 flex items-center justify-between border-t hairline pt-4">
                        <span
                          aria-hidden="true"
                          className="absolute -top-px left-0 h-px w-0 bg-accent transition-[width] duration-700 ease-expo group-hover:w-full"
                        />
                        <span className="flex items-baseline gap-4">
                          <span className="label-xs text-accent">{category.index}</span>
                          <span className="label text-ink transition-transform duration-600 ease-expo group-hover:translate-x-1">
                            {category.title}
                          </span>
                        </span>
                        <span className="label-xs inline-flex items-center gap-2 text-muted">
                          <span className="hidden sm:inline opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            {portmix.name}
                          </span>
                          <ArrowUpRight
                            size={14}
                            className="text-ink transition-[transform,color] duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                          />
                        </span>
                        <span className="sr-only">{ui.viewOn(category.title, portmix.name)} {ui.opensInNewTab}</span>
                      </figcaption>
                    </figure>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>

        {/* Large architectural CTA bar */}
        <Reveal delay={120} className="mt-20 lg:mt-28">
          <a
            href={portfolio.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex min-h-[4.5rem] items-center justify-between gap-6 bg-ink px-6 py-5 text-ivory transition-colors duration-500 ease-soft hover:bg-accent sm:px-8 lg:min-h-[6rem] lg:px-10"
          >
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-accent transition-colors duration-500 group-hover:bg-ivory" />
            <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
              <span className="label">{portfolio.cta.label}</span>
              <span className="label-xs text-ivory/60 transition-colors duration-500 group-hover:text-ivory/80">
                {portfolio.cta.meta}
              </span>
            </span>
            <ArrowUpRight
              size={20}
              className="shrink-0 transition-transform duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1"
            />
            <span className="sr-only">{ui.opensInNewTab}</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
