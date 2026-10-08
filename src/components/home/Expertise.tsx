import { expertise } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ExpertiseList } from "./ExpertiseList";

/** Expertise: heading on the grid, then the interactive image + list panel. */
export function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-heading" className="scroll-mt-[var(--header-h)] bg-paper">
      <div className="container-site section-y">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8">
          <Reveal className="lg:col-span-3">
            <SectionLabel>{expertise.label}</SectionLabel>
          </Reveal>
          <div className="grid gap-10 lg:col-span-9 lg:grid-cols-9 lg:gap-x-8">
            <Reveal delay={80} className="lg:col-span-5">
              <h2 id="expertise-heading" className="t-h2 text-ink">
                <span className="block">{expertise.headline[0]}</span>
                <span className="block text-muted">{expertise.headline[1]}</span>
              </h2>
            </Reveal>
            <Reveal delay={160} className="lg:col-span-4 lg:pt-2">
              <p className="t-body text-graphite">{expertise.intro}</p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={160} className="mt-16 lg:mt-24">
          <ExpertiseList />
        </Reveal>
      </div>
    </section>
  );
}
