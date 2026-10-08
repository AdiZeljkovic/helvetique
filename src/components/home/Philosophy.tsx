import Image from "next/image";
import { philosophy } from "@/content/site";
import { images } from "@/content/images";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollWords } from "./ScrollWords";

/**
 * The one dark, cinematic moment on the page. A full-bleed photograph, a large
 * statement whose words light up while scrolling, and four principles at the foot.
 */
export function Philosophy() {
  return (
    <section aria-labelledby="philosophy-heading" className="relative overflow-hidden bg-night text-white">
      {/* Background photograph with legibility gradients */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src={images.philosophy.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[70%_50%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(9,9,9,0.9)_0%,rgba(9,9,9,0.55)_42%,rgba(9,9,9,0)_80%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(9,9,9,0.9)_0%,rgba(9,9,9,0)_40%)]" />
      </div>

      <div className="container-site relative flex min-h-[100svh] flex-col justify-between gap-24 py-24 lg:py-32">
        {/* Top row */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-8">
          <Reveal className="lg:col-span-3">
            <SectionLabel tone="light">{philosophy.label}</SectionLabel>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-4 lg:col-start-9 lg:text-right">
            <p className="t-small text-white/60">{philosophy.aside}</p>
          </Reveal>
        </div>

        {/* Statement */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-8">
          <h2
            id="philosophy-heading"
            className="text-[clamp(2.5rem,1.4rem+4.2vw,6.25rem)] leading-[1] tracking-[-0.045em] lg:col-span-10"
          >
            <ScrollWords text={philosophy.statement} />
          </h2>
          <Reveal delay={120} className="lg:col-span-4">
            <p className="t-body text-white/70">{philosophy.text}</p>
          </Reveal>
        </div>

        {/* Principles */}
        <Reveal delay={160}>
          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {philosophy.principles.map((principle, index) => (
              <li key={principle.title} className="group relative border-t border-white/20 pt-6">
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-px w-0 bg-accent transition-[width] duration-700 ease-out group-hover:w-full"
                />
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[1.375rem] tracking-[-0.02em] text-white">{principle.title}</h3>
                  <span className="t-small tabular-nums text-white/40">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className="t-small mt-3 max-w-[18rem] text-white/60">{principle.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
