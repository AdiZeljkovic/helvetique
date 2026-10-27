import type { ReactNode, SVGProps } from "react";

/**
 * Line icons for the working steps (Philosophy) and the disciplines
 * (Expertise, Portfolio), drawn on a 48 px grid in the square, mitred stroke of the UI
 * icons, each with one small red accent (like the bars in the logo).
 *
 * Stroked parts carry `data-draw` and fills `data-pop`, so they draw
 * themselves in when the surrounding reveal fires, and redraw while the svg
 * has `data-redraw="true"` (see globals.css). The accent is red unless
 * `--icon-accent` says otherwise, so a muted icon can mute its accent too.
 */

type IconProps = SVGProps<SVGSVGElement>;

/** Normalised length, so one dash of length 1 covers any path. */
const draw = { pathLength: 1, "data-draw": "" } as const;
const pop = { stroke: "none", "data-pop": "" } as const;
const accent = {
  ...pop,
  className: "fill-[var(--icon-accent,var(--color-accent))] transition-[fill] duration-700",
} as const;

function LineIcon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden
      focusable={false}
      {...props}
    >
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------------
   Working steps
   ------------------------------------------------------------------ */

/** Koncept: a room seen into its corner, with a window and its light on the floor. */
function ConceptIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M24 26 40 35 24 44 8 35Z" {...draw} />
      <path d="M8 35V17L24 8l16 9v18M24 8v18" {...draw} />
      <path d="M29 16.2 35 19.6v6.3l-6-3.4Z" {...accent} />
      <path d="M23.2 31.85 28 34.55 24 36.8l-4.8-2.7Z" fill="currentColor" fillOpacity={0.3} {...pop} />
    </LineIcon>
  );
}

/** Razrada: a material board with wood, a colour sample, terrazzo and stone hatching. */
function DevelopmentIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M7 7h34v34H7zM24 7v34M7 24h34" {...draw} />
      <path
        d="M7 12c3-1.2 5 1.2 8.5 0S21 11 24 12M7 16.5c3.5-1.2 6 1.2 9 0s5.5-1 8 0M7 21c2.5-1.2 5.5 1.2 8.5 0S21 20 24 21"
        {...draw}
      />
      <path d="M24 28l4-4M24 34l10-10M24 40l16-16M29 41l12-12M35 41l6-6" {...draw} />
      <rect x={28} y={11} width={9} height={9} {...accent} />
      <g fill="currentColor" {...pop}>
        <circle cx={11} cy={29} r={1} />
        <circle cx={16.5} cy={31.5} r={1} />
        <circle cx={20.5} cy={28} r={1} />
        <circle cx={12.5} cy={36} r={1} />
        <circle cx={18.5} cy={37.5} r={1} />
        <circle cx={21} cy={33.5} r={1} />
      </g>
    </LineIcon>
  );
}

/** Dokumentacija: a drawing sheet with a dimensioned door elevation and a title block. */
function DocumentationIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M8 4h32v40H8zM26 36h14M26 36v8" {...draw} />
      <path d="M14 15h12v18H14zM22.5 24.5h2" {...draw} />
      <path d="M14 13.5v-5M26 13.5v-5M14 10h12M13 11l2-2M25 11l2-2" {...draw} />
      <path d="M27.5 15h7M27.5 33h7M33 15v18M32 16l2-2M32 34l2-2" {...draw} />
      <rect x={29} y={38.5} width={8} height={3} {...accent} />
    </LineIcon>
  );
}

/** Koordinacija: three parties joined through one point in the middle. */
function CoordinationIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M20 4h8v8h-8zM4 34h8v8H4zM36 34h8v8h-8z" {...draw} />
      <path d="M24 13.5V24M20.2 30.4l-6.9 4.3M27.8 30.4l6.9 4.3" {...draw} />
      <rect x={21.5} y={25.5} width={5} height={5} {...accent} />
    </LineIcon>
  );
}

export const stepIcons = {
  concept: ConceptIcon,
  development: DevelopmentIcon,
  documentation: DocumentationIcon,
  coordination: CoordinationIcon,
} as const;

/* ------------------------------------------------------------------
   Disciplines
   ------------------------------------------------------------------ */

/** Dizajn enterijera: a living room in plan, with a sofa, an armchair, a door swing and a round table. */
function InteriorsIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M14 42H6V6h36v36H22" {...draw} />
      <path d="M22 42v-8a8 8 0 0 0-8 8" {...draw} />
      <path d="M12 11h18v6H12zM14.5 11v6M27.5 11v6M34 21h5v8h-5z" {...draw} />
      <circle cx={21} cy={26} r={4} {...accent} />
    </LineIcon>
  );
}

/** Vrata po mjeri: a door standing ajar in its frame, its leaf edge picked out. */
function DoorsIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M4 44h40M12 44V4h24v40M15 44V7h18v37" {...draw} />
      <path d="M15 7l10 3v31l-10 3M21.5 25h2" {...draw} />
      <path d="M25 10l2 .6v29.8l-2 .6Z" {...accent} />
    </LineIcon>
  );
}

/** Prostori po mjeri: a built-in wardrobe with two doors and an open shelved niche. */
function BespokeIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M6 6h36v36H6zM18 6v36M30 6v36" {...draw} />
      <path d="M30 18h12M30 30h12M16 21v6M20 21v6" {...draw} />
      <rect x={32.5} y={21} width={7} height={9} {...accent} />
    </LineIcon>
  );
}

/** Detalji: a detail callout around a mitred corner of a trim, with its reference tag. */
function DetailsIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx={26} cy={22} r={16} {...draw} />
      <path d="M36 19H21v15h-5V14h20zM16 14l5 5" {...draw} />
      <path d="M14.7 33.3 9.5 38.5" {...draw} />
      <rect x={4} y={38} width={5.5} height={5.5} {...accent} />
    </LineIcon>
  );
}

export const disciplineIcons = {
  interiors: InteriorsIcon,
  doors: DoorsIcon,
  bespoke: BespokeIcon,
  details: DetailsIcon,
} as const;
