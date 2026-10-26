import Image from "next/image";
import { studio, ui } from "@/content/site";
import { images } from "@/content/images";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight } from "@/components/ui/Icons";

/**
 * Studio introduction, composed as one piece:
 * 1. Label, two-line headline and the lead with text, on the grid.
 * 2. An asymmetric pair of photographs: a wide one across eight columns and a
 *    tall one dropped lower in the last four, with the facts in a row under the
 *    wide photograph, beside the foot of the tall one.
 */
export function StudioIntro() {
  return (
    <section id="studio" aria-labelledby="studio-heading" className="scroll-mt-[var(--header-h)] bg-paper">
      <div className="container-site section-y">
        {/* 1. Heading */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8">
          <Reveal className="lg:col-span-3">
            <SectionLabel>{studio.label}</SectionLabel>
          </Reveal>
          <div className="grid gap-10 lg:col-span-9 lg:grid-cols-9 lg:gap-x-8">
            <Reveal delay={80} className="lg:col-span-5">
              <h2 id="studio-heading" className="t-h2 text-ink">
                <span className="block">{studio.headline[0]}</span>
                <span className="block text-muted">{studio.headline[1]}</span>
              </h2>
            </Reveal>
            <Reveal delay={160} className="lg:col-span-4 lg:pt-2">
              <p className="text-[1.1875rem] leading-[1.45] tracking-[-0.01em] text-ink lg:text-[1.3125rem]">
                {studio.lead}
              </p>
              <p className="t-body mt-6 text-graphite">{studio.text}</p>
            </Reveal>
          </div>
        </div>

        {/* 2. Photograph pair + facts */}
        <div className="mt-16 grid gap-y-12 lg:mt-24 lg:grid-cols-12 lg:gap-x-8">
          <Reveal variant="image" className="lg:col-span-8 lg:row-start-1">
            <figure>
              <div className="relative aspect-[3/2] overflow-hidden bg-mist">
                <Image
                  src={images.featureMain.src}
                  alt={images.featureMain.alt}
                  fill
                  sizes="(min-width: 1600px) 990px, (min-width: 1024px) 62vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="t-small mt-4 text-muted">{studio.wideCaption}</figcaption>
            </figure>
          </Reveal>

          <Reveal
            variant="image"
            delay={120}
            className="ml-auto w-2/3 sm:w-1/2 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:ml-0 lg:mt-32 lg:w-full"
          >
            <figure>
              <div className="relative aspect-[3/4] overflow-hidden bg-mist">
                <Image
                  src={images.featureDetail.src}
                  alt={images.featureDetail.alt}
                  fill
                  sizes="(min-width: 1600px) 490px, (min-width: 1024px) 31vw, (min-width: 640px) 50vw, 66vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="t-small mt-4 text-muted">{studio.detailCaption}</figcaption>
            </figure>
          </Reveal>

          <Reveal delay={200} className="lg:col-span-8 lg:row-start-2">
            <dl className="grid gap-x-8 sm:grid-cols-3">
              {studio.facts.map((fact) => (
                <div key={fact.term} className="border-t border-line py-5 sm:pb-0">
                  <dt className="t-small text-muted">{fact.term}</dt>
                  <dd className="mt-2 text-[1.0625rem] leading-snug tracking-[-0.01em] text-ink">
                    {"href" in fact ? (
                      <a
                        href={fact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2"
                      >
                        <span className="link-underline group-hover:link-underline-active">{fact.detail}</span>
                        <ArrowUpRight
                          size={13}
                          className="text-accent transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                        <span className="sr-only">{ui.opensInNewTab}</span>
                      </a>
                    ) : (
                      fact.detail
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
