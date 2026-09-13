import { cn } from "@/lib/cn";
import { ui } from "@/content/site";

type FigurePlateProps = {
  index: string;
  title: string;
  meta?: string;
  tone?: "ivory" | "night";
  className?: string;
};

/**
 * Small caption plate laid over a photograph, numbered like a figure in a
 * printed monograph: red index, title, optional material note.
 */
export function FigurePlate({ index, title, meta, tone = "ivory", className }: FigurePlateProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("plate", tone === "ivory" ? "bg-ivory text-ink" : "bg-night text-ivory", className)}
    >
      <span className="label-xs flex items-center gap-3">
        <span className="text-accent">{ui.figure} {index}</span>
        <span aria-hidden="true" className="h-px w-4 bg-accent" />
      </span>
      <span className="label-xs">{title}</span>
      {meta ? <span className={cn("label-xs", tone === "ivory" ? "text-muted" : "text-stone")}>{meta}</span> : null}
    </div>
  );
}
