import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { StudioIntro } from "@/components/home/StudioIntro";
import { Expertise } from "@/components/home/Expertise";
import { Philosophy } from "@/components/home/Philosophy";
import { Portfolio } from "@/components/home/Portfolio";
import { Contact } from "@/components/home/Contact";
import { company, seo } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

/** Structured data built only from verified company facts. */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
      name: company.legalName,
      alternateName: company.shortName,
      description: seo.description,
      url: siteUrl,
      logo: `${siteUrl}/brand/helvetique-logo.png`,
      image: `${siteUrl}/opengraph-image`,
      telephone: company.phone.e164,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.address.street,
        addressLocality: company.address.city,
        addressCountry: company.address.countryCode,
      },
      areaServed: company.markets.map((market) => ({ "@type": "Country", name: market.name })),
      identifier: { "@type": "PropertyValue", name: "ID broj", value: company.companyId },
      knowsAbout: [...seo.knowsAbout],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: company.shortName,
      inLanguage: seo.lang,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

// Escape "<" so the payload can never close the script tag (Next.js JSON-LD guidance).
const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <StudioIntro />
        <Expertise />
        <Philosophy />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataJson }}
      />
    </>
  );
}
