import type { Metadata } from "next";
import Link from "next/link";
import { company, notFound } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: notFound.title,
};

/**
 * 404 in the site's own language and grid. The header is left out on purpose:
 * its links are in-page anchors that only work on the home page.
 */
export default function NotFound() {
  return (
    <main id="main" className="flex min-h-[100svh] flex-col bg-paper">
      <div className="container-site flex h-[var(--header-h)] items-center">
        <Link href="/" aria-label={company.legalName} className="block w-[220px]">
          <Logo alt="" eager />
        </Link>
      </div>

      <div className="container-site grid flex-1 content-center gap-8 py-24 lg:grid-cols-12 lg:gap-x-8">
        <SectionLabel className="lg:col-span-3">{notFound.label}</SectionLabel>
        <div className="lg:col-span-9">
          <h1 className="t-h2 text-ink">
            <span className="block">{notFound.headline[0]}</span>
            <span className="block text-muted">{notFound.headline[1]}</span>
          </h1>
          <p className="t-body mt-6 max-w-[32rem] text-graphite">{notFound.text}</p>
          <Button href={notFound.cta.href} className="mt-10">
            {notFound.cta.label}
          </Button>
        </div>
      </div>
    </main>
  );
}
