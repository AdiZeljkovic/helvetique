import Image from "next/image";
import { philosophy, ui } from "@/content/site";
import { images } from "@/content/images";
import { FigurePlate } from "@/components/ui/FigurePlate";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Cinematic dark section. The photograph occupies the left seven columns and
 * bleeds to the viewport edge; a short statement in ivory sits to the right.
 */
export function Philosophy() {
  const [first, second, last] = philosophy.statement;

  return (
    <section aria-labelledby="philosophy-heading" className="bg-night text-ivory">
      <div className="container-site">
        <div className="grid lg:grid-cols-12 lg:gap-x-6">
          <Reveal variant="image" className="relative bleed-x lg:col-span-7 lg:bleed-left lg:mr-0">
            <div className="relative aspect-[4/5] max-h-[80svh] w-full overflow-hidden bg-charcoal lg:aspect-auto lg:h-[min(100svh,900px)] lg:max-h-none">
              <Image
                src={images.philosophy.src}
                alt={images.philosophy.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <FigurePlate
              index={philosophy.figure.index}
              title={philosophy.figure.title}
              meta={philosophy.figure.meta}
              tone="night"
              className="absolute bottom-0 right-0"
            />
          </Reveal>

          <div className="flex flex-col justify-center py-20 lg:col-span-4 lg:col-start-9 lg:py-28">
            <Reveal>
              <span className="label-xs flex items-center gap-4 text-stone">
                <span aria-hidden="true" className="h-px w-8 bg-accent" />
                {ui.approach}
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 id="philosophy-heading" className="display-md mt-10 text-ivory">
                <span className="block">{first}</span>
                <span className="block">{second}</span>
                <span className="serif-italic block text-stone">{last}</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-10 max-w-[26rem] text-[15px] leading-[1.8] text-stone">{philosophy.text}</p>
            </Reveal>
            <Reveal delay={260}>
              <p className="label-xs mt-14 flex flex-wrap items-center gap-x-4 gap-y-2 text-stone/80">
                {ui.manifestoWords.map((word, i) => (
                  <span key={word} className="flex items-center gap-4">
                    {i > 0 ? <span aria-hidden="true" className="h-[3px] w-[3px] bg-accent" /> : null}
                    {word}
                  </span>
                ))}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
