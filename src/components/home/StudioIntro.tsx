import { studio, ui } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowUpRight } from "@/components/ui/Icons";

export function StudioIntro() {
  return (
    <section id="studio" aria-labelledby="studio-heading" className="scroll-mt-[var(--header-h)] bg-ivory">
      <div className="container-site py-24 lg:py-36">
        <Reveal>
          <SectionHeader number={studio.number} label={studio.label} aside={studio.aside} />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-6">
          <Reveal className="lg:col-span-6" delay={80}>
            <h2 id="studio-heading" className="display-lg text-ink">
              <span className="block">{studio.headline[0]}</span>
              <span className="serif-italic block text-muted">{studio.headline[1]}</span>
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:col-start-8 lg:pt-3" delay={180}>
            <div className="space-y-6 text-[15px] leading-[1.8] text-charcoal lg:text-base">
              {studio.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Fact strip: three columns, hairline top and bottom, no cards */}
        <Reveal delay={240} className="mt-20 lg:mt-28">
          <dl className="grid border-y hairline sm:grid-cols-3">
            {studio.facts.map((fact, index) => (
              <div
                key={fact.term}
                className={[
                  "group py-7 sm:py-9",
                  index > 0 ? "border-t hairline sm:border-t-0 sm:border-l sm:pl-8" : "",
                  index < studio.facts.length - 1 ? "sm:pr-8" : "",
                ].join(" ")}
              >
                <dt className="label-xs flex items-center gap-3 text-muted">
                  <span aria-hidden="true" className="h-px w-3 bg-accent transition-[width] duration-500 ease-expo group-hover:w-6" />
                  {fact.term}
                </dt>
                <dd className="mt-4 font-serif text-xl font-light leading-snug text-ink">
                  {"href" in fact ? (
                    <a
                      href={fact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-2 transition-colors duration-500 hover:text-accent"
                    >
                      {fact.detail}
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-500 ease-expo group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
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
    </section>
  );
}
