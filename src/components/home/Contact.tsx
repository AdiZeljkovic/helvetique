import { company, contact, ui } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "./ContactForm";
import { LocationMark } from "./LocationMark";

/**
 * Closing section on a near-black ground that runs straight into the footer.
 * Left: a large ivory statement and a compact ledger of office facts.
 * Right: the inquiry form, no box, just a red rule and light hairlines.
 * Below: the location strip with coordinates and the contour mark.
 */
export function Contact() {
  const facts = [
    {
      term: ui.telephone,
      value: (
        <a
          href={company.phone.href}
          className="font-serif text-2xl font-light leading-snug text-ivory transition-colors duration-500 hover:text-accent lg:text-3xl"
        >
          {company.phone.display}
        </a>
      ),
    },
    {
      term: ui.office,
      value: (
        <address className="font-serif text-xl font-light leading-snug not-italic text-ivory lg:text-2xl">
          {company.address.street}
          <br />
          <span className="text-stone">
            {company.address.city}, {company.address.country}
          </span>
        </address>
      ),
    },
    {
      term: ui.companyLabel,
      value: (
        <p className="text-sm leading-relaxed text-stone">
          {company.legalName}
          <br />
          ID {company.companyId} · {company.vatNote}
        </p>
      ),
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-[var(--header-h)] bg-night text-ivory"
    >
      <div className="container-site pt-24 lg:pt-36">
        <Reveal>
          <SectionHeader number={contact.number} label={contact.label} aside={contact.aside} tone="ivory" />
        </Reveal>

        <div className="mt-14 grid gap-16 lg:mt-20 lg:grid-cols-12 lg:gap-x-6">
          {/* Left: statement and office ledger */}
          <div className="lg:col-span-5">
            <Reveal delay={80}>
              <h2
                id="contact-heading"
                className="font-serif text-[clamp(3rem,1.8rem+4.4vw,6rem)] font-light leading-[1.04] tracking-[-0.015em] text-ivory"
              >
                <span className="block">{contact.headline[0]}</span>
                <span className="serif-italic block text-stone">{contact.headline[1]}</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-10 max-w-[28rem] text-[15px] leading-[1.8] text-stone lg:text-base">
                {contact.text}
              </p>
            </Reveal>

            <Reveal delay={220} className="mt-14 lg:mt-20">
              <dl className="border-t hairline-light">
                {facts.map((fact) => (
                  <div
                    key={fact.term}
                    className="grid gap-y-3 border-b hairline-light py-6 sm:grid-cols-[7rem_1fr] sm:gap-x-6"
                  >
                    <dt className="label-xs flex items-center gap-3 pt-2 text-stone">
                      <span aria-hidden="true" className="h-px w-3 bg-accent" />
                      {fact.term}
                    </dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={200} className="lg:col-span-6 lg:col-start-7 lg:pt-3">
            <div className="border-t-2 border-accent pt-8 lg:pt-10">
              <p className="label-xs mb-10 flex items-center justify-between text-stone">
                <span>{ui.inquiry}</span>
                <span className="text-accent">{contact.number}</span>
              </p>
              <ContactForm tone="dark" />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Location strip */}
      <div className="container-site pb-24 pt-20 lg:pb-32 lg:pt-28">
        <Reveal delay={120}>
          <div className="grid items-center gap-10 border-t hairline-light pt-10 lg:grid-cols-12 lg:gap-x-6 lg:pt-12">
            <div className="lg:col-span-4">
              <p className="label-xs flex items-center gap-3 text-stone">
                <span aria-hidden="true" className="h-[6px] w-[6px] bg-accent" />
                {ui.location}
              </p>
              <p className="display-sm mt-4 text-ivory">
                {company.address.city}
                <br />
                <span className="serif-italic text-stone">{company.address.countryShort}</span>
              </p>
            </div>
            <div className="lg:col-span-3 lg:col-start-6">
              <p className="label-xs text-stone">{ui.coordinates}</p>
              <p className="mt-4 font-sans text-sm leading-loose tracking-[0.08em] text-ivory/80">
                {company.coordinates.lat}
                <br />
                {company.coordinates.lng}
              </p>
            </div>
            <div className="lg:col-span-3 lg:col-start-10">
              <LocationMark className="h-auto w-full max-w-[16rem] text-stone/50 lg:ml-auto" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
