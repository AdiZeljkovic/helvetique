import { cn } from "@/lib/cn";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Plain label that sits in the left column of the grid (used on the 404 page;
 * the home page sections open straight with their headline).
 * Deliberately undecorated: no numbers, no rules, no uppercase tracking.
 */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return <p className={cn("t-small text-muted", className)}>{children}</p>;
}
