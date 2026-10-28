import Image from "next/image";
import { studio } from "@/content/site";
import { images } from "@/content/images";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Studio introduction, composed as one piece:
 * 1. The headline from the left edge of the grid, the lead beside it.
 * 2. An asymmetric pair of photographs: a wide one across eight columns with
 *    the facts beneath it, and in the last four columns the supporting text
 *    above a tall photograph, continuing the column the lead opens.
 */
export function StudioIntro() {
  return (
    <section id="studio" aria-labelledby="studio-heading" className="scroll-mt-[var(--header-h)] bg-paper">
      <div className="container-site section-y">
        {/* 1. Heading */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <Reveal className="lg:col-span-7">
            <h2 id="studio-heading" className="t-h2 text-ink">
              <span className="block">{studio.headline[0]}</span>
              <span className="block text-muted">{studio.headline[1]}</span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[1.1875rem] leading-[1.45] tracking-[-0.01em] text-ink lg:text-[1.3125rem]">
              {studio.lead}
            </p>
          </Reveal>
        </div>

        {/* 2. Photographs, text and facts */}
        <div className="mt-16 grid items-start gap-y-12 lg:mt-24 lg:grid-cols-12 lg:gap-x-8">
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

          <div className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1">
            <Reveal delay={120}>
              <p className="t-body border-t border-line pt-6 text-graphite">{studio.text}</p>
            </Reveal>
            <Reveal
              variant="image"
              delay={160}
              className="ml-auto mt-12 w-2/3 sm:w-1/2 lg:ml-0 lg:mt-14 lg:w-full"
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
          </div>

          <Reveal delay={200} className="lg:col-span-8 lg:row-start-2">
            <dl className="grid gap-x-8 sm:grid-cols-3">
              {studio.facts.map((fact) => (
                <div key={fact.term} className="border-t border-line py-5 sm:pb-0">
                  <dt className="t-small text-muted">{fact.term}</dt>
                  <dd className="mt-2 text-[1.0625rem] leading-snug tracking-[-0.01em] text-ink">{fact.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
