import { company, presence, ui } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Split section on a beige ground. Left: statement and an address plate.
 * Right: four numbered rows separated by hairlines; on pointer devices the
 * description unfolds on hover and a red bar marks the active row.
 */
export function BosniaPresence() {
  return (
    <section
      id="presence"
      aria-labelledby="presence-heading"
      className="scroll-mt-[var(--header-h)] bg-beige"
    >
      <div className="container-site py-24 lg:py-36">
        <Reveal>
          <SectionHeader number={presence.number} label={presence.label} aside={presence.aside} />
        </Reveal>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <Reveal delay={80}>
              <h2 id="presence-heading" className="display-lg text-ink">
                <span className="block">{presence.headline[0]}</span>
                <span className="serif-italic block text-muted">{presence.headline[1]}</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-10 max-w-[30rem] text-[15px] leading-[1.8] text-charcoal lg:text-base">
                {presence.intro}
              </p>
            </Reveal>

            {/* Address plate: drawn like a title block on an architectural sheet */}
            <Reveal delay={220} className="mt-12 lg:mt-16">
              <div className="inline-grid grid-cols-[auto_1fr] gap-x-6 border border-ink/20 p-5 sm:p-6">
                <span aria-hidden="true" className="mt-[3px] h-[7px] w-[7px] bg-accent" />
                <div>
                  <p className="label-xs text-muted">{ui.registeredOffice}</p>
                  <p className="mt-2 font-serif text-xl font-light leading-snug text-ink">
                    {company.address.street}
                    <br />
                    {company.address.city}, {company.address.countryShort}
                  </p>
                  <p className="label-xs mt-3 text-muted">
                    {company.coordinates.lat} · {company.coordinates.lng}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="lg:col-span-6 lg:col-start-7 lg:pt-2">
            <ul className="border-t border-ink/15">
              {presence.items.map((item) => (
                <li key={item.number} className="group relative border-b border-ink/15">
                  <span
                    aria-hidden="true"
                    className="absolute -left-4 top-0 h-full w-[2px] origin-top scale-y-0 bg-accent transition-transform duration-500 ease-expo group-hover:scale-y-100 lg:-left-6"
                  />
                  <div className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-7 sm:grid-cols-[3.5rem_1fr] lg:py-8">
                    <span className="label-xs pt-1.5 text-accent">{item.number}</span>
                    <div>
                      <h3 className="display-sm text-ink transition-transform duration-600 ease-expo group-hover:translate-x-2">
                        {item.title}
                      </h3>
                      <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-600 ease-expo [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:group-hover:grid-rows-[1fr]">
                        <p className="overflow-hidden text-[15px] leading-[1.75] text-muted transition-opacity duration-500 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100">
                          <span className="block pt-3">{item.description}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
