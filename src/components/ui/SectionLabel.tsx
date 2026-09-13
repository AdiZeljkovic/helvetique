import { cn } from "@/lib/cn";

type SectionLabelProps = {
  number?: string;
  children: React.ReactNode;
  tone?: "ink" | "ivory";
  className?: string;
};

/**
 * Numbered eyebrow with the recurring red hairline motif:
 *   —— 01 / THE STUDIO
 */
export function SectionLabel({ number, children, tone = "ink", className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "label flex items-center gap-4",
        tone === "ink" ? "text-muted" : "text-stone",
        className,
      )}
    >
      <span aria-hidden="true" className="inline-block h-px w-8 bg-accent" />
      <span>
        {number ? <span className="text-accent">{number}</span> : null}
        {number ? <span className="mx-2 opacity-60">/</span> : null}
        {children}
      </span>
    </p>
  );
}
