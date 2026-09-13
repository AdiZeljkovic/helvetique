import Link from "next/link";
import { cn } from "@/lib/cn";
import { ArrowRight, ArrowUpRight } from "./Icons";

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
};

/**
 * Uppercase text link with a growing underline and a travelling arrow.
 */
export function ArrowLink({ href, children, external = false, className }: ArrowLinkProps) {
  const classes = cn("group inline-flex items-center gap-3 label transition-colors duration-500", className);
  const Icon = external ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      <span className="link-underline group-hover:link-underline-active">{children}</span>
      <Icon
        size={13}
        className={cn(
          "transition-transform duration-500 ease-expo",
          external ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-1",
        )}
      />
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
