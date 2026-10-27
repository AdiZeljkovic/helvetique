import { company, contact, ui } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { ContactForm } from "./ContactForm";

/**
 * Contact in two columns on Paper White.
 * Left: the headline, a short note and the office details set like a
 * specification, one row per fact between hairlines, with the telephone number
 * large. On desktop the column stays in view while the form is filled in.
 * Right: the inquiry form on a white card.
 */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-[var(--header-h)] bg-mist">
      <div className="container-site section-y">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-8">
          {/* Headline and office details */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
              <Reveal>
                <h2 id="contact-heading" className="t-h2 text-ink">
                  <span className="block">{contact.headline[0]}</span>
                  <span className="block text-muted">{contact.headline[1]}</span>
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="t-body mt-8 max-w-[28rem] text-graphite">{contact.text}</p>
              </Reveal>

              <Reveal delay={140}>
                <dl className="mt-12 max-w-[36rem] border-t border-ink/15 lg:mt-16">
                  <div className="grid gap-3 border-b border-ink/15 py-6 sm:grid-cols-[7rem_1fr] sm:items-baseline sm:gap-6">
                    <dt className="t-small text-muted">{contact.facts.telephone}</dt>
                    <dd>
                      <a
                        href={company.phone.href}
                        className="group inline-flex items-center gap-4 text-[clamp(1.75rem,1.3rem+1.3vw,2.5rem)] leading-none tracking-[-0.03em] text-ink"
                      >
                        <span className="link-underline group-hover:link-underline-active">{company.phone.display}</span>
                        <ArrowRight
                          size={20}
                          className="shrink-0 text-accent transition-transform duration-500 ease-out group-hover:translate-x-1"
                        />
                      </a>
                    </dd>
                  </div>

                  <div className="grid gap-3 border-b border-ink/15 py-6 sm:grid-cols-[7rem_1fr] sm:items-baseline sm:gap-6">
                    <dt className="t-small text-muted">{contact.facts.office}</dt>
                    <dd>
                      <address className="text-lg not-italic leading-snug tracking-[-0.01em] text-ink">
                        {company.address.street}
                        <br />
                        {company.address.city}
                      </address>
                      <a
                        href={contact.map.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group t-small mt-3 inline-flex items-center gap-2 text-ink"
                      >
                        <span className="link-underline group-hover:link-underline-active">{contact.map.label}</span>
                        <ArrowUpRight
                          size={12}
                          className="text-accent transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                        <span className="sr-only">{ui.opensInNewTab}</span>
                      </a>
                    </dd>
                  </div>

                  <div className="grid gap-3 border-b border-ink/15 py-6 sm:grid-cols-[7rem_1fr] sm:items-baseline sm:gap-6">
                    <dt className="t-small text-muted">{contact.facts.company}</dt>
                    <dd className="t-small leading-relaxed text-graphite">
                      {company.legalName}
                      <br />
                      ID {company.companyId} · {company.vatNote}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>

          {/* Form */}
          <Reveal delay={160} className="lg:col-span-6 lg:col-start-7">
            <div className="bg-white p-6 sm:p-10 lg:p-12 xl:p-14">
              <h3 className="t-h3 text-ink">{contact.form.title}</h3>
              <p className="t-body mt-2 text-graphite">{contact.form.text}</p>
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
