import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { StudioIntro } from "@/components/home/StudioIntro";
import { BosniaPresence } from "@/components/home/BosniaPresence";
import { Expertise } from "@/components/home/Expertise";
import { Philosophy } from "@/components/home/Philosophy";
import { Portfolio } from "@/components/home/Portfolio";
import { Contact } from "@/components/home/Contact";
import { company, seo } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

/** Structured data built only from verified company facts. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: company.legalName,
  alternateName: company.shortName,
  description: seo.description,
  url: siteUrl,
  telephone: company.phone.e164,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressCountry: company.address.countryCode,
  },
  areaServed: { "@type": "Country", name: company.address.country },
  identifier: { "@type": "PropertyValue", name: "ID broj", value: company.companyId },
  knowsAbout: [...seo.knowsAbout],
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <StudioIntro />
        <BosniaPresence />
        <Expertise />
        <Philosophy />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
