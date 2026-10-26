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
  /** Rendered width, so next/image picks the right file for each pixel density. */
  sizes?: string;
  className?: string;
  eager?: boolean;
};

/**
 * Helvetique Architecture master logo, from the client's high-resolution PNG
 * (Helvetique-logo-vektorski.png), cropped to the artwork. The reverse version
 * only turns the black letters white; the red bars are untouched.
 * Served through next/image at the rendered size, with a higher quality than
 * photographs so the thin serifs and red bars stay crisp.
 *
 * Brand rules: at least 220 px wide on screen, clear space of 1x the
 * ARCHITECTURE cap height on every side, never stretch or recolour.
 */
export function Logo({ variant = "primary", alt = "Helvetique Architecture", sizes = "220px", className, eager }: LogoProps) {
  return (
    <Image
      src={variant === "primary" ? "/brand/helvetique-logo.png" : "/brand/helvetique-logo-reverse.png"}
      alt={alt}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      sizes={sizes}
      quality={90}
      loading={eager ? "eager" : "lazy"}
      className={cn("block h-auto", className)}
    />
  );
}
