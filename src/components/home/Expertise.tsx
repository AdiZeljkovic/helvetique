import { expertise } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { ExpertiseList } from "./ExpertiseList";

/**
 * Expertise on Paper White, so it reads apart from the white studio section.
 * The headline and intro open the left column above the interactive list; the
 * photograph panel runs beside them from the top of the section.
 */
export function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-heading" className="scroll-mt-[var(--header-h)] bg-mist">
      <div className="container-site section-y">
        <ExpertiseList>
          <Reveal>
            <h2 id="expertise-heading" className="t-h2 text-ink">
              <span className="block">{expertise.headline[0]}</span>
              <span className="block text-muted">{expertise.headline[1]}</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="t-body mt-8 max-w-[30rem] text-graphite">{expertise.intro}</p>
          </Reveal>
        </ExpertiseList>
      </div>
    </section>
  );
}
