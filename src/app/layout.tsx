import type { Metadata, Viewport } from "next";
import { Host_Grotesk } from "next/font/google";
import { getSadrzaj } from "@/content/cms";
import { SadrzajProvider } from "@/content/SadrzajKontekst";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

/** Sigurnosna mreža: i bez poziva iz CMS-a stranica se osvježi najkasnije za sat. */
export const revalidate = 3600;

const host = Host_Grotesk({
  variable: "--font-host",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { seo, company } = await getSadrzaj();
  return {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.title,
    template: `%s | ${company.shortName}`,
  },
  description: seo.description,
  applicationName: company.shortName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: seo.locale,
    url: "/",
    siteName: company.legalName,
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, email: false, address: false },
  };
}

export const viewport: Viewport = {
  // Architectural Black, matching the hero and footer.
  themeColor: "#090909",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const sadrzaj = await getSadrzaj();
  return (
    <html lang={sadrzaj.seo.lang} className={`${host.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so scroll-reveal styles only apply when they can be undone. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.js=''" }} />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <SadrzajProvider value={sadrzaj}>{children}</SadrzajProvider>
      </body>
    </html>
  );
}
