import Image from "next/image";
import { studio, ui } from "@/content/site";
import { images } from "@/content/images";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight } from "@/components/ui/Icons";

/**
 * Studio introduction, composed as one piece:
 * 1. Short two-line headline on the grid.
 * 2. A tall photograph on the left, the lead, text and facts on the right.
 * 3. A wide cinematic photograph closing the section.
 */
export function StudioIntro() {
  return (
    <section id="studio" aria-labelledby="studio-heading" className="scroll-mt-[var(--header-h)] bg-paper">
      <div className="container-site section-y">
        {/* 1. Headline */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8">
          <Reveal className="lg:col-span-3">
            <SectionLabel>{studio.label}</SectionLabel>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-9">
            <h2 id="studio-heading" className="t-h2 text-ink">
              <span className="block">{studio.headline[0]}</span>
              <span className="block text-muted">{studio.headline[1]}</span>
            </h2>
          </Reveal>
        </div>

        {/* 2. Photograph + text */}
        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <Reveal variant="image" className="lg:col-span-5">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden bg-mist">
                <Image
                  src={images.featureDetail.src}
                  alt={images.featureDetail.alt}
                  fill
                  sizes="(min-width: 1600px) 600px, (min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="t-small mt-4 text-muted">{studio.detailCaption}</figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:pb-10">
            <Reveal delay={100}>
              <p className="t-lead text-ink">{studio.lead}</p>
            </Reveal>
            <Reveal delay={160}>
              <p className="t-body mt-8 max-w-[34rem] text-graphite">{studio.text}</p>
            </Reveal>

            <Reveal delay={220} className="mt-12 lg:mt-16">
              <dl className="border-t border-line">
                {studio.facts.map((fact) => (
                  <div
                    key={fact.term}
                    className="grid gap-1 border-b border-line py-5 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-6"
                  >
                    <dt className="t-small text-muted">{fact.term}</dt>
                    <dd className="text-lg tracking-[-0.01em] text-ink">
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

        {/* 3. Wide photograph */}
        <Reveal variant="image" className="mt-20 lg:mt-32">
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden bg-mist sm:aspect-[21/9]">
              <Image
                src={images.featureMain.src}
                alt={images.featureMain.alt}
                fill
                sizes="(min-width: 1600px) 1480px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="t-small mt-4 flex justify-between gap-6 text-muted">
              <span>{studio.wideCaption}</span>
              <span className="hidden sm:inline">Helvetique architecture</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
