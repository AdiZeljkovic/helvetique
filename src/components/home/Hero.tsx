import { hero } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { HeroImage } from "./HeroImage";

/**
 * Full-screen photograph with a large white headline set at the bottom,
 * a short lede and one quiet call to action into the page (PortMix.ch stays
 * in the header, so visitors are not sent away from the first screen).
 */
export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden text-white"
    >
      <HeroImage />

      <div className="container-site relative pb-10 pt-[calc(var(--header-h)+4rem)] lg:pb-14">
        <h1 id="hero-heading" className="t-display max-w-[14ch]">
          <span className="block">{hero.headline[0]}</span>
          <span className="block">
            {hero.headline[1]}
            <span className="text-accent">.</span>
          </span>
        </h1>

        <div className="mt-10 grid gap-8 border-t border-white/25 pt-8 lg:mt-14 lg:grid-cols-12 lg:gap-x-8">
          <p className="t-body max-w-[34rem] text-white/85 lg:col-span-5">{hero.lede}</p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:col-span-4 lg:col-start-7">
            <Button href={hero.primaryCta.href} variant="solid-light">
              {hero.primaryCta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
