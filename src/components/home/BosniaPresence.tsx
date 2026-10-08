import Image from "next/image";
import { company, presence } from "@/content/site";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Presence in Bosnia and Herzegovina.
 * 1. Label, headline and intro on the grid.
 * 2. A Sarajevo panorama bleeding to the left edge, with the registered-office
 *    card overlapping its right side.
 * 3. Four numbered points across the full width.
 */
export function BosniaPresence() {
  return (
    <section id="presence" aria-labelledby="presence-heading" className="scroll-mt-[var(--header-h)] bg-mist">
      <div className="container-site section-y">
        {/* 1. Heading */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8">
          <Reveal className="lg:col-span-3">
            <SectionLabel>{presence.label}</SectionLabel>
          </Reveal>
          <div className="grid gap-10 lg:col-span-9 lg:grid-cols-9 lg:gap-x-8">
            <Reveal delay={80} className="lg:col-span-5">
              <h2 id="presence-heading" className="t-h2 text-ink">
                <span className="block">{presence.headline[0]}</span>
                <span className="block text-muted">{presence.headline[1]}</span>
              </h2>
            </Reveal>
            <Reveal delay={160} className="lg:col-span-4 lg:pt-2">
              <p className="t-body text-graphite">{presence.intro}</p>
            </Reveal>
          </div>
        </div>

        {/* 2. Panorama + office card */}
        <div className="mt-16 grid lg:mt-24 lg:grid-cols-12 lg:gap-x-8">
          <Reveal
            variant="image"
            className="bleed-x lg:col-span-9 lg:col-start-1 lg:row-start-1 lg:bleed-left lg:mr-0"
          >
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden bg-line sm:aspect-[16/10]">
                <Image
                  src={images.presence.src}
                  alt={images.presence.alt}
                  fill
                  sizes="(min-width: 1024px) 75vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="t-small mt-4 hidden text-muted lg:block lg:pl-[var(--bleed)]">
                {presence.imageCaption}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal
            delay={160}
            className="relative z-10 -mt-16 sm:-mt-24 sm:w-[24rem] lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mb-14 lg:mt-0 lg:w-auto lg:self-end"
          >
            <div className="bg-white p-7 sm:p-9 lg:p-10">
              <p className="t-small text-muted">{presence.office.label}</p>
              <address className="mt-3 text-[1.5rem] leading-[1.2] tracking-[-0.025em] text-ink not-italic">
                {company.address.street}
                <br />
                {company.address.city}
              </address>
              <p className="t-small mt-1 text-graphite">{company.address.country}</p>

              <dl className="mt-8 border-t border-line">
                <div className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                  <dt className="t-small text-muted">{presence.office.phoneLabel}</dt>
                  <dd className="whitespace-nowrap text-ink">
                    <a href={company.phone.href} className="transition-colors duration-500 hover:text-accent">
                      {company.phone.display}
                    </a>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                  <dt className="t-small text-muted">{presence.office.coordinatesLabel}</dt>
                  <dd className="t-small whitespace-nowrap tabular-nums text-ink">{company.coordinates}</dd>
                </div>
              </dl>

              <Button href={presence.office.cta.href} variant="text" className="mt-8">
                {presence.office.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>

        {/* 3. Four points */}
        <Reveal delay={120} className="mt-20 lg:mt-32">
          <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {presence.items.map((item, index) => (
              <li key={item.title} className="group relative border-t border-ink/15 pt-6">
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-px w-0 bg-accent transition-[width] duration-700 ease-out group-hover:w-full"
                />
                <span className="t-small tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="t-h3 mt-8 text-ink lg:mt-12">{item.title}</h3>
                <p className="t-body mt-3 text-graphite">{item.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
