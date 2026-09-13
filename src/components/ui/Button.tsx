import Link from "next/link";
import { cn } from "@/lib/cn";
import { ArrowRight, ArrowUpRight } from "./Icons";

type Variant = "primary" | "outline" | "light";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
};

const variants: Record<Variant, string> = {
  primary: "bg-ink text-ivory hover:bg-accent",
  outline: "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
  light: "bg-ivory text-ink hover:bg-accent hover:text-ivory",
};

/**
 * Architectural rectangular CTA. Sharp corners, uppercase label,
 * arrow that travels 4px on hover.
 */
export function Button({ href, children, variant = "primary", external = false, className }: ButtonProps) {
  const classes = cn(
    "group inline-flex h-14 items-center justify-between gap-8 px-7 label transition-colors duration-500 ease-soft",
    variants[variant],
    className,
  );
  const Icon = external ? ArrowUpRight : ArrowRight;
  const icon = (
    <Icon
      size={14}
      className={cn(
        "shrink-0 transition-transform duration-500 ease-expo",
        external ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-1",
      )}
    />
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        <span className="whitespace-nowrap">{children}</span>
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      <span className="whitespace-nowrap">{children}</span>
      {icon}
    </Link>
  );
}
