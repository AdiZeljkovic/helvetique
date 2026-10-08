import Link from "next/link";
import { cn } from "@/lib/cn";
import { ui } from "@/content/site";
import { ArrowRight, ArrowUpRight } from "./Icons";

type Variant = "solid" | "solid-light" | "text" | "text-light";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
};

const variants: Record<Variant, string> = {
  solid: "h-13 px-6 bg-ink text-white hover:bg-accent",
  "solid-light": "h-13 px-6 bg-white text-ink hover:bg-accent hover:text-white",
  text: "text-ink",
  "text-light": "text-white",
};

/**
 * Two kinds of call to action: a solid rectangle for primary actions and a
 * plain text link with a growing underline for everything else.
 */
export function Button({ href, children, variant = "solid", external = false, className }: ButtonProps) {
  const isText = variant === "text" || variant === "text-light";
  const Icon = external ? ArrowUpRight : ArrowRight;
  const classes = cn(
    "group inline-flex items-center gap-3 text-[0.9375rem] font-medium transition-colors duration-500",
    variants[variant],
    className,
  );
  const inner = (
    <>
      <span className={cn("whitespace-nowrap", isText && "link-underline group-hover:link-underline-active")}>
        {children}
      </span>
      <Icon
        size={14}
        className={cn(
          "shrink-0 transition-transform duration-500 ease-out",
          external ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-1",
        )}
      />
      {external ? <span className="sr-only">{ui.opensInNewTab}</span> : null}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
