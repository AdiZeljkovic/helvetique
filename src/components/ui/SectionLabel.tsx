import { cn } from "@/lib/cn";

type SectionLabelProps = {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Plain section name that sits in the left column of the grid.
 * Deliberately undecorated: no numbers, no rules, no uppercase tracking.
 */
export function SectionLabel({ children, tone = "dark", className }: SectionLabelProps) {
  return (
    <p className={cn("t-small", tone === "dark" ? "text-muted" : "text-white/60", className)}>{children}</p>
  );
}
