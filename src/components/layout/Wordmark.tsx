import Link from "next/link";
import { company } from "@/content/site";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/brand/Logo";

type WordmarkProps = {
  tone?: "dark" | "light";
  className?: string;
  onClick?: () => void;
};

/**
 * The master logo as a home link, 220 px wide (brand minimum on screen).
 * Both versions are stacked and crossfade, so the header can switch from the
 * reverse logo over the hero photograph to the primary logo on white.
 */
export function Wordmark({ tone = "dark", className, onClick }: WordmarkProps) {
  return (
    <Link href="#home" onClick={onClick} aria-label={company.legalName} className={cn("relative block w-[220px]", className)}>
      <Logo
        variant="primary"
        alt=""
        eager
        className={cn("w-full transition-opacity duration-500", tone === "dark" ? "opacity-100" : "opacity-0")}
      />
      <Logo
        variant="reverse"
        alt=""
        eager
        className={cn(
          "absolute inset-0 w-full transition-opacity duration-500",
          tone === "light" ? "opacity-100" : "opacity-0",
        )}
      />
    </Link>
  );
}
