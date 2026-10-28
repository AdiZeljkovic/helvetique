import Image from "next/image";
import { philosophy } from "@/content/site";
import { images } from "@/content/images";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollWords } from "./ScrollWords";
import { stepIcons } from "@/components/ui/LineIcons";

/**
 * The one dark, cinematic moment on the page. A full-bleed photograph, a large
 * statement whose words light up while scrolling, and the four working steps
 * at the foot, on one glass band read left to right like a process.
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
          // Wide screens crop the photograph to a low band: anchor it at the top, so the windows show, not the bare wall.
          className="object-cover object-[70%_50%] lg:object-[50%_0%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(9,9,9,0.9)_0%,rgba(9,9,9,0.55)_42%,rgba(9,9,9,0)_80%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(9,9,9,0.9)_0%,rgba(9,9,9,0)_40%)]" />
      </div>

      {/* Height follows the content, so the statement and the steps stay together on tall and wide screens */}
      <div className="container-site relative flex flex-col gap-14 py-20 sm:gap-16 sm:py-24 lg:gap-20 lg:py-32">
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

        {/* Steps: cells divided by hairlines, one row of four on desktop, two by two on tablets */}
        <ol className="grid border border-white/15 bg-white/[0.04] backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">
          {philosophy.steps.map((step, index) => {
            const Icon = stepIcons[step.icon];
            return (
              <Reveal
                as="li"
                key={step.title}
                delay={index * 100}
                className="group relative flex gap-5 border-white/15 p-5 transition-colors duration-700 hover:bg-white/[0.05] max-sm:not-first:border-t sm:flex-col sm:gap-0 sm:p-8 sm:max-lg:even:border-l sm:max-lg:nth-[n+3]:border-t lg:not-first:border-l xl:p-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-x-100"
                />
                {/* Phones: icon beside the text; larger screens: icon above it */}
                <Icon className="h-12 w-12 shrink-0 text-white/75 transition-colors duration-700 group-hover:text-white sm:h-14 sm:w-14 lg:h-[4.5rem] lg:w-[4.5rem]" />
                <div className="sm:mt-10 lg:mt-14">
                  <h3 className="t-h3 text-white">{step.title}</h3>
                  <p className="t-small mt-2 max-w-[18rem] text-white/65 sm:mt-3">{step.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
