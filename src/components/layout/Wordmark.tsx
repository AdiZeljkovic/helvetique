import Link from "next/link";
import { company } from "@/content/site";
import { cn } from "@/lib/cn";

type WordmarkProps = {
  tone?: "ink" | "ivory";
  className?: string;
  onClick?: () => void;
};

/**
 * Typographic logo: "HEL VETIQUE" with a deliberate word gap, and a muted
 * second line. Links back to the top of the page.
 */
export function Wordmark({ tone = "ink", className, onClick }: WordmarkProps) {
  return (
    <Link
      href="#home"
      onClick={onClick}
      className={cn("group inline-flex flex-col gap-1 leading-none", className)}
    >
      <span
        className={cn(
          "font-sans text-[13px] font-medium uppercase tracking-[0.3em]",
          tone === "ink" ? "text-ink" : "text-ivory",
        )}
      >
        {company.wordmark[0]}
      </span>
      <span
        className={cn(
          "label-xs flex items-center gap-2",
          tone === "ink" ? "text-muted" : "text-stone",
        )}
      >
        <span
          aria-hidden="true"
          className="inline-block h-px w-3 bg-accent transition-[width] duration-500 ease-expo group-hover:w-5"
        />
        {company.wordmark[1]}
      </span>
    </Link>
  );
}
