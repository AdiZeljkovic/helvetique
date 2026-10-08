import Image from "next/image";
import { cn } from "@/lib/cn";

/** Intrinsic size of the cropped master PNG in /public/brand. */
export const LOGO_WIDTH = 1390;
export const LOGO_HEIGHT = 310;

type LogoProps = {
  /** "primary" = black letters for light grounds, "reverse" = white letters for dark grounds. */
  variant?: "primary" | "reverse";
  /** Accessible name; pass an empty string when a parent link already names it. */
  alt?: string;
  className?: string;
  eager?: boolean;
};

/**
 * Helvetique Architecture master logo, from the client's high-resolution PNG
 * (Helvetique-logo-vektorski.png), cropped to the artwork. The reverse version
 * only turns the black letters white; the red bars are untouched.
 * Served unoptimised so it stays sharp on high-density screens.
 *
 * Brand rules: at least 220 px wide on screen, clear space of 1x the
 * ARCHITECTURE cap height on every side, never stretch or recolour.
 */
export function Logo({ variant = "primary", alt = "Helvetique Architecture", className, eager }: LogoProps) {
  return (
    <Image
      src={variant === "primary" ? "/brand/helvetique-logo.png" : "/brand/helvetique-logo-reverse.png"}
      alt={alt}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      unoptimized
      loading={eager ? "eager" : "lazy"}
      className={cn("block h-auto", className)}
    />
  );
}
