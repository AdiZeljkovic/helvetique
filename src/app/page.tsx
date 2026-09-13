import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { StudioIntro } from "@/components/home/StudioIntro";
import { ImageFeature } from "@/components/home/ImageFeature";
import { BosniaPresence } from "@/components/home/BosniaPresence";
import { Expertise } from "@/components/home/Expertise";
import { Philosophy } from "@/components/home/Philosophy";
import { Portfolio } from "@/components/home/Portfolio";
import { PortmixConnection } from "@/components/home/PortmixConnection";
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
      <main id="main" className="relative flex-1">
        {/* Architectural grid: two hairlines at the content edges running the full page */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 top-[var(--header-h)] z-[5] hidden mix-blend-multiply lg:block">
          <div className="container-site h-full">
            <div className="h-full border-x border-ink/[0.07]" />
          </div>
        </div>
        <Hero />
        <StudioIntro />
        <ImageFeature />
        <BosniaPresence />
        <Expertise />
        <Philosophy />
        <Portfolio />
        <PortmixConnection />
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
