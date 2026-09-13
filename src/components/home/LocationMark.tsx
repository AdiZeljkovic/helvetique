/**
 * Quiet line composition standing in for a map: a set of contour-like
 * curves in stone, a fine cross-hair and a single red marker.
 * Decorative only; the address and coordinates are given in text next to it.
 */
import { ui } from "@/content/site";

export function LocationMark({ className }: { className?: string }) {
  const contours = Array.from({ length: 9 }, (_, i) => {
    const r = 26 + i * 22;
    const wobble = (i % 3) * 6;
    return `M ${200 - r} 150 C ${200 - r} ${150 - r * 0.6 - wobble}, ${200 + r * 0.8} ${150 - r * 0.9}, ${200 + r} ${150 - wobble} S ${200 + r * 0.4} ${150 + r * 0.95}, ${200 - r * 0.7} ${150 + r * 0.5 + wobble} S ${200 - r} ${150 + r * 0.2}, ${200 - r} 150`;
  });

  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label={ui.locationMarkAlt}
      className={className}
      fill="none"
    >
      {contours.map((d, i) => (
        <path key={d} d={d} stroke="currentColor" strokeWidth={i === 0 ? 1 : 0.75} opacity={0.9 - i * 0.07} />
      ))}
      <line x1="200" y1="0" x2="200" y2="300" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="0" y1="150" x2="400" y2="150" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <rect x="196.5" y="146.5" width="7" height="7" fill="#b7191d" />
    </svg>
  );
}
