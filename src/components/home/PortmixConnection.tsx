import Image from "next/image";
import { connection, ui } from "@/content/site";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { FigurePlate } from "@/components/ui/FigurePlate";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowUpRight } from "@/components/ui/Icons";

/**
 * The relationship between the Sarajevo company and the wider practice.
 * Left: statement and a two-entry ledger joined by a red vertical link, then
 * the primary external CTA. Right: a photograph running to the viewport edge.
 */
export function PortmixConnection() {
  const [local, wider] = connection.nodes;

  return (
    <section aria-labelledby="connection-heading" className="bg-stone">
      <div className="container-site pt-24 lg:pt-36">
        <Reveal>
          <SectionHeader label={connection.label} aside={connection.aside} />
        </Reveal>
      </div>

      <div className="container-site">
        <div className="grid lg:grid-cols-12 lg:gap-x-6">
          {/* Text column */}
          <div className="flex flex-col pb-20 pt-14 lg:col-span-6 lg:pb-36 lg:pt-20 lg:pr-10 xl:col-span-5">
            <Reveal delay={80}>
              <h2 id="connection-heading" className="display-lg text-ink">
                <span className="block">{connection.headline[0]}</span>
                <span className="serif-italic block text-charcoal/60">{connection.headline[1]}</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-10 max-w-[30rem] text-[15px] leading-[1.8] text-charcoal lg:text-base">
                {connection.text}
              </p>
            </Reveal>

            {/* Ledger: two entries joined by a red vertical link */}
            <Reveal delay={220} className="mt-16 lg:mt-20">
              <ol className="border-t border-ink/25">
                <li className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-7 sm:grid-cols-[3.5rem_1fr]">
                  <span className="label-xs pt-1 text-accent">{local.index}</span>
                  <div>
                    <p className="label-xs flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-muted">
                      <span className="text-ink">{local.place}</span>
                      <span>{local.region}</span>
                    </p>
                    <p className="mt-3 font-serif text-2xl font-light leading-snug text-ink lg:text-3xl">
                      {local.entity}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{local.role}</p>
                  </div>
                </li>

                <li aria-hidden="true" className="grid grid-cols-[2.5rem_1fr] gap-x-4 sm:grid-cols-[3.5rem_1fr]">
                  <span className="relative block h-14 justify-self-center">
                    <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-accent" />
                    <span className="absolute bottom-0 left-1/2 h-[7px] w-[7px] -translate-x-1/2 bg-accent" />
                  </span>
                  <span className="label-xs self-center text-accent">{ui.connectedPractice}</span>
                </li>

                <li className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-ink/25 py-7 sm:grid-cols-[3.5rem_1fr]">
                  <span className="label-xs pt-1 text-accent">{wider.index}</span>
                  <div>
                    <p className="label-xs flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-muted">
                      <span className="text-ink">{wider.place}</span>
                      <span>{wider.region}</span>
                    </p>
                    <a
                      href={wider.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-3 inline-flex items-center gap-3 font-serif text-2xl font-light leading-snug text-ink transition-colors duration-500 hover:text-accent lg:text-3xl"
                    >
                      {wider.entity}
                      <ArrowUpRight
                        size={16}
                        className="text-accent transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                      <span className="sr-only">{ui.opensInNewTab}</span>
                    </a>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{wider.role}</p>
                  </div>
                </li>
              </ol>
              <div className="border-t border-ink/25 pt-8">
                <Button href={connection.cta.href} external className="w-full sm:w-auto sm:min-w-[16rem]">
                  {connection.cta.label}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Photograph running to the right edge */}
          <Reveal
            variant="image"
            delay={120}
            className="relative bleed-x lg:col-span-6 lg:bleed-right lg:ml-0 lg:mt-20 xl:col-span-7"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal lg:h-full lg:min-h-[40rem] lg:aspect-auto">
              <Image
                src={images.connection.src}
                alt={images.connection.alt}
                fill
                sizes="(min-width: 1280px) 60vw, (min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <FigurePlate
              index={connection.figure.index}
              title={connection.figure.title}
              meta={connection.figure.meta}
              className="absolute bottom-0 left-0"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
