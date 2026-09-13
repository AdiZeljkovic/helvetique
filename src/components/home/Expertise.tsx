import Image from "next/image";
import { expertise, ui } from "@/content/site";
import { images } from "@/content/images";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * Capabilities as large horizontal rows: number, title, description, arrow.
 * Hover shifts the ground from warm white to beige, draws a red bar at the
 * left edge, nudges the arrow and lets a small preview surface beside the text.
 */
export function Expertise() {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="scroll-mt-[var(--header-h)] bg-warm"
    >
      <div className="container-site py-24 lg:py-36">
        <Reveal>
          <SectionHeader number={expertise.number} label={expertise.label} aside={expertise.aside} />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-x-6">
          <Reveal delay={80} className="lg:col-span-7 lg:col-start-6">
            <h2 id="expertise-heading" className="display-lg text-ink">
              <span className="block">{expertise.headline[0]}</span>
              <span className="serif-italic block text-muted">{expertise.headline[1]}</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={160} className="mt-16 lg:mt-24">
          <ol className="border-t hairline">
            {expertise.items.map((item) => {
              const preview = images[item.image];
              return (
                <li
                  key={item.number}
                  className="group relative border-b hairline transition-colors duration-700 ease-soft hover:bg-beige"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 z-10 h-full w-[2px] origin-top scale-y-0 bg-accent transition-transform duration-500 ease-expo group-hover:scale-y-100"
                  />
                  <div className="bleed-x grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 px-[var(--bleed)] py-8 sm:grid-cols-[3.5rem_1fr_auto] lg:grid-cols-12 lg:gap-x-6 lg:py-8">
                    <span className="label-xs pt-2 text-accent lg:col-span-1">{item.number}</span>

                    <h3 className="display-md text-ink transition-transform duration-600 ease-expo group-hover:translate-x-2 lg:col-span-4">
                      {item.title}
                    </h3>

                    <ArrowRight
                      size={18}
                      className="mt-2 text-ink/60 transition-[transform,color] duration-600 ease-expo group-hover:translate-x-2 group-hover:text-accent lg:order-last lg:col-span-1 lg:col-start-12 lg:justify-self-end"
                    />

                    <p className="col-span-full mt-4 max-w-[34rem] text-[15px] leading-[1.75] text-muted sm:col-start-2 lg:col-span-4 lg:col-start-6 lg:mt-2">
                      {item.description}
                    </p>

                    {/* Hover preview, wide screens only, in the two free columns before the arrow */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none hidden translate-x-3 self-center opacity-0 transition-[opacity,transform] duration-700 ease-expo group-hover:translate-x-0 group-hover:opacity-100 xl:col-span-2 xl:col-start-10 xl:block"
                    >
                      <div className="relative aspect-[4/3] w-full max-w-[11rem] overflow-hidden bg-stone">
                        <Image src={preview.src} alt="" fill sizes="176px" className="object-cover" />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>

        {/* Discipline monogram: A / I / B */}
        <Reveal delay={200} className="mt-12 flex items-center gap-6 label-xs text-muted lg:mt-16">
          {ui.monogram.letters.map((letter, i) => (
            <span key={letter} className="flex items-center gap-6">
              {i > 0 ? (
                <span aria-hidden="true" className="text-accent">
                  /
                </span>
              ) : null}
              <span className="font-serif text-2xl font-light text-ink">{letter}</span>
            </span>
          ))}
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          <span>{ui.monogram.caption}</span>
        </Reveal>
      </div>
    </section>
  );
}
