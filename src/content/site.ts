/**
 * Jedinstveni izvor istine za podatke o kompaniji, navigaciju i sav tekst.
 * Ovdje pripadaju samo provjerene informacije. Ne dodavati historiju, nagrade,
 * članove tima, statistike ili nazive projekata koji nisu potvrđeni.
 *
 * Ton: formalan i sažet, obraćanje s "Vi" (veliko slovo), ijekavica.
 * Fotografije na stranici su stock, pa ih tekst ne predstavlja kao vlastite radove.
 */

export const company = {
  legalName: "Helvetique architecture d.o.o. Sarajevo",
  shortName: "Helvetique architecture",
  address: {
    street: "Azize Šaćirbegović bb",
    city: "Sarajevo",
    country: "Bosna i Hercegovina",
    countryCode: "BA",
  },
  phone: {
    display: "+387 33 741 843",
    href: "tel:+38733741843",
    e164: "+38733741843",
  },
  companyId: "4203663110007",
  vatNote: "Nije u sistemu PDV-a",
} as const;

export const portmix = {
  name: "PortMix.ch",
  url: "https://portmix.ch",
} as const;

export const navigation = [
  { label: "Studio", href: "#studio" },
  { label: "Ekspertiza", href: "#expertise" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Kontakt", href: "#contact" },
] as const;

/** Mikrokopija koju koriste komponente (pristupačnost, forma, oznake). */
export const ui = {
  skipToContent: "Preskoči na sadržaj",
  primaryNav: "Glavna navigacija",
  mobileNav: "Glavna navigacija, mobilna",
  footerNav: "Navigacija u podnožju",
  navigationDialog: "Navigacija",
  openMenu: "Otvori meni",
  closeMenu: "Zatvori meni",
  opensInNewTab: "(otvara se u novoj kartici)",
  viewOn: (category: string, site: string) => `Kategorija ${category} na ${site}`,
  footer: {
    ctaLabel: "Novi projekat",
    ctaTitle: ["Imate projekat", "na umu?"],
    ctaButton: "Pošaljite upit",
    office: "Ured",
    navigation: "Navigacija",
    portfolio: "Portfolio",
    portfolioText: "Projekti, reference i kompletan portfolio",
    company: "Kompanija",
    backToTop: "Nazad na vrh",
  },
  form: {
    name: "Ime i prezime",
    email: "E-mail",
    phone: "Telefon",
    subject: "Predmet",
    message: "Poruka",
    optional: "Opcionalno",
    sending: "Slanje…",
    honeypot: "Web stranica kompanije",
    privacyNote: "Podatke koristimo isključivo za odgovor na Vaš upit.",
    errors: {
      name: "Unesite ime i prezime.",
      email: "Unesite ispravnu e-mail adresu.",
      phone: "Provjerite broj telefona.",
      subject: "Unesite predmet upita.",
      message: "Poruka treba imati najmanje 20 znakova.",
    },
    successTitle: "Hvala Vam. Upit je uspješno poslan.",
    successText: "Javit ćemo Vam se uskoro. Za hitne upite nazovite",
    unconfiguredText: "Obrazac trenutno nije povezan s našim sistemom e-pošte. Molimo Vas da nazovete",
    unconfiguredTail: "i rado ćemo Vam pomoći.",
    failedText: "Upit trenutno nije moguće poslati. Pokušajte ponovo ili nazovite",
  },
} as const;

export const hero = {
  headline: ["Prostori oblikovani", "s namjerom"],
  lede: "Arhitektura, arhitektura enterijera, prostori po mjeri i koordinacija projekata, s pažnjom prema kontekstu, materijalu i detalju.",
  primaryCta: { label: "Upoznajte studio", href: "#studio" },
  secondaryCta: { label: "Pogledajte portfolio", href: portmix.url },
} as const;

export const studio = {
  label: "Studio",
  headline: ["Pažljivo osmišljeno.", "Jasno vođeno."],
  lead: "Bavimo se arhitekturom i enterijerima, razvijamo partnerstva i koordiniramo projekte od prve ideje do realizacije.",
  text: "Radimo promišljeno, komuniciramo jasno i blisko sarađujemo s klijentima i partnerima. Širi portfolio i reference predstavljeni su na PortMix.ch.",
  facts: [
    { term: "Discipline", detail: "Arhitektura, enterijeri i prostori po mjeri" },
    { term: "Koordinacija", detail: "Jedna kontakt tačka kroz sve faze projekta" },
    { term: "Portfolio", detail: "PortMix.ch", href: portmix.url },
  ],
  detailCaption: "Svjetlo i materijal",
  wideCaption: "Materijal, svjetlo, proporcija",
} as const;

export const expertise = {
  label: "Ekspertiza",
  headline: ["Od koncepta", "do detalja."],
  intro: "Četiri discipline, jedan pristup: jasna ideja, pažljivo razrađena u svakoj fazi projekta.",
  cta: { label: "Pogledajte portfolio na PortMix.ch", href: portmix.url },
  items: [
    {
      title: "Arhitektura",
      description: "Prostorni koncepti i arhitektonsko planiranje, oblikovani prema kontekstu, namjeni i mjestu.",
      keywords: ["Koncept", "Planiranje", "Kontekst"],
      image: "expertiseArchitecture",
    },
    {
      title: "Arhitektura enterijera",
      description: "Enterijeri u kojima materijal, proporcija, funkcija i atmosfera čine jednu cjelinu.",
      keywords: ["Materijal", "Proporcija", "Atmosfera"],
      image: "expertiseInteriors",
    },
    {
      title: "Prostori po mjeri",
      description: "Individualna rješenja razvijena za konkretan prostor, njegove zahtjeve i identitet.",
      keywords: ["Detalj", "Namjena", "Identitet"],
      image: "expertiseBespoke",
    },
    {
      title: "Koordinacija projekata",
      description: "Jedna kontakt tačka za komunikaciju, usklađivanje i podršku kroz sve faze projekta.",
      keywords: ["Komunikacija", "Usklađivanje", "Podrška"],
      image: "expertiseCoordination",
    },
  ],
} as const;

export const philosophy = {
  label: "Pristup",
  aside: "Proporcija, materijal, funkcija i kontekst",
  statement: "Arhitektura počinje osjećajem koji prostor treba da pruži.",
  text: "Svakom prostoru pristupamo kroz proporciju, materijal, funkciju i kontekst, kako bi rezultat bio promišljen, a ne dekorativan.",
  principles: [
    { title: "Proporcija", text: "Mjera i odnos elemenata koji prostoru daju smirenost." },
    { title: "Materijal", text: "Materijali birani zbog teksture, svjetla i trajnosti." },
    { title: "Funkcija", text: "Prostor oblikovan prema načinu na koji se zaista koristi." },
    { title: "Kontekst", text: "Odnos prema mjestu, svjetlu i neposrednom okruženju." },
  ],
} as const;

export const portfolio = {
  label: "Portfolio",
  headline: ["Odabrane perspektive."],
  text: "Projekti, reference i kompletan portfolio predstavljeni su na PortMix.ch.",
  categories: [
    { title: "Arhitektura", image: "portfolioArchitecture" },
    { title: "Enterijeri", image: "portfolioInteriors" },
    { title: "Detalji", image: "portfolioDetails" },
    { title: "Prostori po mjeri", image: "portfolioBespoke" },
  ],
  cta: { label: "Pogledajte kompletan portfolio", href: portmix.url },
} as const;

export const contact = {
  label: "Kontakt",
  headline: ["Razgovarajmo", "o Vašem projektu."],
  text: "Za upite o projektima, saradnji ili dodatne informacije o našem radu, javite nam se telefonom ili putem obrasca.",
  submitLabel: "Pošaljite upit",
  panel: {
    label: "Ured",
    call: "Nazovite",
    map: "Prikaži na karti",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Azize%20%C5%A0a%C4%87irbegovi%C4%87%20bb%2C%20Sarajevo",
  },
  form: {
    title: "Pošaljite upit",
    text: "Ispunite obrazac i odgovorit ćemo Vam što prije.",
  },
  facts: {
    telephone: "Telefon",
    office: "Adresa",
    company: "Kompanija",
  },
} as const;

export const seo = {
  title: "Helvetique Architecture | Arhitektura i enterijeri",
  description:
    "Helvetique architecture: arhitektura, arhitektura enterijera, prostori po mjeri i koordinacija projekata. Kompletan portfolio na PortMix.ch.",
  locale: "bs_BA",
  lang: "bs",
  knowsAbout: ["Arhitektura", "Arhitektura enterijera", "Prostori po mjeri", "Koordinacija projekata"],
  ogFooter: "Arhitektura · Enterijeri · Prostori po mjeri",
  ogPortfolio: "Portfolio na PortMix.ch",
} as const;
