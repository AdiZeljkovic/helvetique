import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "square",
  strokeLinejoin: "miter",
  "aria-hidden": true,
  focusable: false,
} as const;

/** → */
export function ArrowRight({ size = 16, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} {...base} {...props}>
      <path d="M1.5 8h12M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

/** ↗ */
export function ArrowUpRight({ size = 16, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} {...base} {...props}>
      <path d="M3.5 12.5 12.5 3.5M5.5 3.5h7v7" />
    </svg>
  );
}

/** ↓ */
export function ArrowDown({ size = 16, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} {...base} {...props}>
      <path d="M8 1.5v12M3.5 9 8 13.5 12.5 9" />
    </svg>
  );
}
