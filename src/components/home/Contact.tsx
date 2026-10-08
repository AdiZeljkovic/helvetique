import Image from "next/image";
import { company, contact, ui } from "@/content/site";
import { images } from "@/content/images";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight } from "@/components/ui/Icons";
import { ContactForm } from "./ContactForm";

/**
 * Contact: heading row, then one framed block split in two.
 * Left: a dark office panel with the phone number, address, map link and a
 * Sarajevo photograph at its foot. Right: the inquiry form on white.
 */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-[var(--header-h)] bg-mist">
      <div className="container-site section-y">
        {/* Heading row */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <Reveal className="lg:col-span-3 lg:self-start">
            <SectionLabel>{contact.label}</SectionLabel>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-5">
            <h2 id="contact-heading" className="t-h2 text-ink">
              <span className="block">{contact.headline[0]}</span>
              <span className="block text-muted">{contact.headline[1]}</span>
            </h2>
          </Reveal>
          <Reveal delay={140} className="lg:col-span-4 lg:pb-2">
            <p className="t-body text-graphite">{contact.text}</p>
          </Reveal>
        </div>

        {/* Framed block */}
        <Reveal delay={180} className="mt-14 lg:mt-20">
          <div className="grid overflow-hidden bg-white lg:grid-cols-12">
            {/* Office panel */}
            <aside className="relative flex flex-col bg-night text-white lg:col-span-5">
              <div className="p-8 sm:p-10 lg:p-12">
                <p className="t-small flex items-center gap-3 text-white/60">
                  <span aria-hidden="true" className="block h-2 w-2 bg-accent" />
                  {contact.panel.label}
                </p>

                <dl className="mt-10 space-y-8">
                  <div>
                    <dt className="t-small text-white/50">{contact.facts.telephone}</dt>
                    <dd className="mt-2">
                      <a
                        href={company.phone.href}
                        className="text-[clamp(1.75rem,1.3rem+1.3vw,2.5rem)] leading-none tracking-[-0.03em] text-white transition-colors duration-500 hover:text-white/70"
                      >
                        {company.phone.display}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="t-small text-white/50">{contact.facts.office}</dt>
                    <dd className="mt-2 text-lg leading-snug tracking-[-0.01em]">
                      <address className="not-italic">
                        {company.address.street}
                        <br />
                        {company.address.city}, {company.address.country}
                      </address>
                    </dd>
                  </div>
                </dl>

                <div className="mt-10 flex flex-wrap gap-3">
                  <a
                    href={company.phone.href}
                    className="inline-flex h-11 items-center bg-white px-5 text-[0.9375rem] font-medium text-ink transition-colors duration-500 hover:bg-accent hover:text-white"
                  >
                    {contact.panel.call}
                  </a>
                  <a
                    href={contact.panel.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-11 items-center gap-2 border border-white/30 px-5 text-[0.9375rem] text-white transition-colors duration-500 hover:border-white"
                  >
                    {contact.panel.map}
                    <ArrowUpRight
                      size={12}
                      className="transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                    <span className="sr-only">{ui.opensInNewTab}</span>
                  </a>
                </div>

                <p className="t-small mt-10 border-t border-white/15 pt-6 text-white/50">
                  {company.legalName}
                  <br />
                  ID {company.companyId} · {company.vatNote}
                </p>
              </div>

              {/* Sarajevo photograph at the foot of the panel */}
              <div className="relative mt-auto aspect-[16/9] lg:aspect-auto lg:min-h-[14rem] lg:flex-1">
                <Image
                  src={images.presence.src}
                  alt=""
                  fill
                  sizes="(min-width: 1600px) 600px, (min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_bottom,#090909_0%,rgba(9,9,9,0.15)_45%,rgba(9,9,9,0)_100%)]" />
              </div>
            </aside>

            {/* Form panel */}
            <div className="p-8 sm:p-10 lg:col-span-7 lg:p-14 xl:p-16">
              <h3 className="t-h3 text-ink">{contact.form.title}</h3>
              <p className="t-body mt-2 text-graphite">{contact.form.text}</p>
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
