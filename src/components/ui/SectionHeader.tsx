import { cn } from "@/lib/cn";
import { SectionLabel } from "./SectionLabel";

type SectionHeaderProps = {
  number?: string;
  label: string;
  /** Small right-aligned caption on the same rule, hidden on narrow screens. */
  aside?: string;
  tone?: "ink" | "ivory";
  className?: string;
};

/**
 * Section opener: a full-width hairline rule with the numbered label on the
 * left and a quiet caption on the right. Gives every section the same
 * typographic datum, like a running head in a printed monograph.
 */
export function SectionHeader({ number, label, aside, tone = "ink", className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-6 border-t pt-6",
        tone === "ink" ? "hairline" : "hairline-light",
        className,
      )}
    >
      <SectionLabel number={number} tone={tone}>
        {label}
      </SectionLabel>
      {aside ? (
        <span className={cn("label-xs hidden sm:block", tone === "ink" ? "text-muted" : "text-stone")}>{aside}</span>
      ) : null}
    </div>
  );
}
