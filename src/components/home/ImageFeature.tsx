import Image from "next/image";
import { images } from "@/content/images";
import { imageFeature, ui } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Two-image editorial composition. The wide picture bleeds to the left
 * edge of the viewport; the taller detail is set lower and overlaps its
 * corner, so the pair reads as a layout rather than a grid.
 */
export function ImageFeature() {
  return (
    <section aria-label={ui.photographySection} className="bg-ivory pb-24 lg:pb-36">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-6">
          <Reveal variant="image" className="bleed-x lg:col-span-8 lg:bleed-left lg:mr-0">
            <figure>
              <div className="relative aspect-[3/2] overflow-hidden bg-stone">
                <Image
                  src={images.featureMain.src}
                  alt={images.featureMain.alt}
                  fill
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="label-xs mt-4 flex items-center gap-4 px-[var(--gutter)] text-muted lg:pl-[var(--bleed)] lg:pr-0">
                <span className="text-accent">{ui.figure} {imageFeature.figure.index}</span>
                <span aria-hidden="true" className="h-px w-4 bg-accent" />
                <span>{imageFeature.figure.title}</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal variant="image" delay={160} className="relative z-10 lg:col-span-4 lg:-ml-20 lg:mt-32">
            <figure>
              <div className="relative aspect-[3/4] overflow-hidden bg-stone">
                <Image
                  src={images.featureDetail.src}
                  alt={images.featureDetail.alt}
                  fill
                  sizes="(min-width: 1440px) 540px, (min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="label-xs mt-4 flex items-center justify-between text-muted">
                <span>{imageFeature.detail}</span>
                <span aria-hidden="true" className="h-px w-8 bg-accent" />
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
