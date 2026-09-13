/**
 * Jedinstveni izvor istine za podatke o kompaniji, navigaciju i sav tekst.
 * Ovdje pripadaju samo provjerene informacije. Ne dodavati historiju, nagrade,
 * članove tima, statistike ili nazive projekata koji nisu potvrđeni.
 */

export const company = {
  legalName: "Helvetique architecture d.o.o. Sarajevo",
  shortName: "Helvetique architecture",
  wordmark: ["HEL VETIQUE", "ARCHITECTURE"] as const,
  address: {
    street: "Azize Šaćirbegović bb",
    city: "Sarajevo",
    country: "Bosna i Hercegovina",
    countryShort: "Bosna i Hercegovina",
    countryCode: "BA",
  },
  phone: {
    display: "+387 33 741 843",
    href: "tel:+38733741843",
    e164: "+38733741843",
  },
  companyId: "4203663110007",
  vatNote: "Nije u sistemu PDV-a",
  /** Koordinate samo za prikaz, kao tipografska bilješka. */
  coordinates: { lat: "43.8563° N", lng: "18.4131° E" },
} as const;

export const portmix = {
  name: "PortMix.ch",
  label: "PORTMIX.CH",
  url: "https://portmix.ch",
  region: "Švicarska / Međunarodno",
} as const;

export const navigation = [
  { label: "Studio", href: "#studio" },
  { label: "Prisustvo u BiH", href: "#presence" },
  { label: "Ekspertiza", href: "#expertise" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Kontakt", href: "#contact" },
] as const;

export const disciplines = ["Arhitektura", "Enterijeri", "Prostori po mjeri"] as const;

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
  scroll: "Dalje",
  figure: "Sl.",
  registeredOffice: "Registrovani ured",
  approach: "Pristup",
  manifestoWords: ["Ljudi", "Prostor", "Materijal", "Svjetlo"],
  monogram: { letters: ["A", "E", "P"], caption: "Arhitektura · Enterijeri · Po mjeri" },
  viewOn: (category: string, site: string) => `Pogledajte ${category} na ${site}`,
  connectedPractice: "Povezana praksa",
  inquiry: "Upit",
  telephone: "Telefon",
  office: "Ured",
  companyLabel: "Kompanija",
  location: "Lokacija",
  coordinates: "Koordinate",
  locationMarkAlt: "Apstraktne konturne linije koje označavaju ured u Sarajevu",
  photographySection: "Arhitektonska fotografija",
  footer: {
    sitemap: "Navigacija",
    office: "Ured",
    practice: "Praksa",
    practiceList: ["Arhitektura", "Arhitektura enterijera", "Prostori po mjeri", "Koordinacija projekata"],
    portfolioOn: "Portfolio na",
  },
  form: {
    name: "Ime i prezime",
    email: "E-mail",
    phone: "Telefon",
    subject: "Predmet",
    message: "Poruka",
    optional: "Opcionalno",
    sending: "Slanje",
    honeypot: "Web stranica kompanije",
    privacyNote: "Vaši podaci koriste se isključivo za odgovor na ovaj upit.",
    errors: {
      name: "Unesite svoje ime.",
      email: "Unesite ispravnu e-mail adresu.",
      phone: "Provjerite broj telefona.",
      subject: "Dodajte predmet upita.",
      message: "Napišite barem nekoliko rečenica.",
    },
    successTitle: "Hvala. Vaš upit je poslan.",
    successText: "Odgovorit ćemo iz našeg ureda u Sarajevu. Za hitne slučajeve nazovite",
    unconfiguredText: "Obrazac za upite još nije povezan s našim sistemom e-pošte. Molimo nazovite",
    unconfiguredTail: "i rado ćemo vam pomoći.",
    failedText: "Vaš upit nije moguće poslati. Pokušajte ponovo za trenutak ili nazovite",
  },
} as const;

export const hero = {
  eyebrow: ["HEL VETIQUE ARCHITECTURE", "SARAJEVO / BOSNA I HERCEGOVINA"],
  headline: ["Prostori oblikovani", "s"],
  /** Ispisuje se kurzivom, iza čega slijedi crvena tačka. */
  accentWord: "namjerom",
  figure: { index: "01", title: "Studija materijala", meta: "Beton / Dnevno svjetlo" },
  lede: "Helvetique architecture d.o.o. Sarajevo je lokalno prisustvo za arhitektonske aktivnosti, saradnju i koordinaciju projekata u Bosni i Hercegovini.",
  primaryCta: { label: "Upoznajte studio", href: "#studio" },
  secondaryCta: { label: "Pogledajte portfolio", href: portmix.url },
} as const;

export const studio = {
  number: "01",
  label: "Studio",
  aside: "Helvetique architecture d.o.o. Sarajevo",
  headline: ["Lokalno prisustvo.", "Međunarodna perspektiva."],
  paragraphs: [
    "Helvetique architecture d.o.o. Sarajevo predstavlja lokalnu tačku prisustva za arhitektonske aktivnosti, partnerstva i koordinaciju projekata u Bosni i Hercegovini.",
    "Naš pristup temelji se na promišljenom dizajnu, jasnoj komunikaciji i bliskoj saradnji, dok su širi portfolio i reference predstavljeni na PortMix.ch.",
  ],
  facts: [
    { term: "Lokacija", detail: "Sarajevo, Bosna i Hercegovina" },
    { term: "Discipline", detail: "Arhitektura / Enterijeri / Prostori po mjeri" },
    { term: "Portfolio", detail: "PortMix.ch", href: portmix.url },
  ],
} as const;

export const presence = {
  number: "02",
  label: "Prisustvo u BiH",
  aside: "Bosna i Hercegovina",
  headline: ["Sjedište u Sarajevu.", "Povezani i šire."],
  intro:
    "Helvetique architecture d.o.o. Sarajevo predstavlja lokalno prisustvo kompanije u Bosni i Hercegovini. To je tačka kontakta za klijente, partnere i saradnike kojima je potrebna koordinacija arhitektonskih aktivnosti na terenu.",
  items: [
    {
      number: "01",
      title: "Lokalno prisustvo",
      description:
        "Registrovani ured u Sarajevu za komunikaciju s klijentima i poslovne aktivnosti u Bosni i Hercegovini.",
    },
    {
      number: "02",
      title: "Koordinacija projekata",
      description:
        "Koordinacija između klijenata, konsultanata i šire prakse kroz sve faze projekta.",
    },
    {
      number: "03",
      title: "Saradnja s partnerima",
      description:
        "Radni odnosi s lokalnim partnerima, specijalistima i institucijama kada ih projekat zahtijeva.",
    },
    {
      number: "04",
      title: "Arhitektonska podrška",
      description:
        "Arhitektonska i enterijerska podrška pružena lokalno, povezana sa širim portfoliom predstavljenim na PortMix.ch.",
    },
  ],
} as const;

export const expertise = {
  number: "03",
  label: "Ekspertiza",
  aside: "Arhitektura / Enterijeri / Po mjeri",
  headline: ["Od prostora", "do doživljaja."],
  items: [
    {
      number: "01",
      title: "Arhitektura",
      description:
        "Prostorni koncepti, arhitektonsko planiranje i promišljena okruženja oblikovana prema kontekstu i namjeni.",
      image: "portfolioArchitecture",
    },
    {
      number: "02",
      title: "Arhitektura enterijera",
      description:
        "Profinjeni enterijeri u kojima materijal, proporcija, funkcija i atmosfera djeluju kao cjelina.",
      image: "portfolioInteriors",
    },
    {
      number: "03",
      title: "Prostori po mjeri",
      description:
        "Individualna rješenja razvijena prema konkretnim prostorima, zahtjevima i identitetima.",
      image: "portfolioBespoke",
    },
    {
      number: "04",
      title: "Koordinacija projekata",
      description:
        "Lokalna tačka kontakta za koordinaciju, komunikaciju i podršku kroz sve faze projekta.",
      image: "portfolioDetails",
    },
  ],
} as const;

export const imageFeature = {
  figure: { index: "02", title: "Materijal / Svjetlo / Proporcija" },
  detail: "Detalj",
} as const;

export const philosophy = {
  statement: ["Arhitektura počinje", "osjećajem koji prostor", "treba da pruži."],
  figure: { index: "03", title: "Studija svjetla", meta: "Kamen / Sjena" },
  text: "Svakom prostoru pristupamo kroz proporciju, materijal, funkciju i kontekst, stvarajući okruženja koja djeluju promišljeno, a ne dekorisano.",
} as const;

export const portfolio = {
  number: "04",
  label: "Portfolio",
  aside: "Odabrani radovi na PortMix.ch",
  headline: ["Odabrane", "perspektive."],
  note: "Istražite projekte, reference i kompletan portfolio na PortMix.ch.",
  categories: [
    { index: "A", title: "Arhitektura", image: "portfolioArchitecture" },
    { index: "E", title: "Enterijeri", image: "portfolioInteriors" },
    { index: "D", title: "Detalji", image: "portfolioDetails" },
    { index: "P", title: "Prostori po mjeri", image: "portfolioBespoke" },
  ],
  cta: { label: "Pogledajte cijeli portfolio", meta: portmix.label, href: portmix.url },
} as const;

export const connection = {
  label: "Povezana praksa",
  aside: "Sarajevo — Švicarska",
  headline: ["Lokalno prisustvo.", "Širi portfolio."],
  text: "Helvetique architecture d.o.o. Sarajevo osigurava lokalno prisustvo u Bosni i Hercegovini, dok su širi portfolio, projekti i reference dostupni putem PortMix.ch.",
  nodes: [
    {
      index: "01",
      place: "Sarajevo",
      region: "Bosna i Hercegovina",
      entity: "Helvetique architecture d.o.o.",
      role: "Lokalno prisustvo, koordinacija i partnerstva",
    },
    {
      index: "02",
      place: "Švicarska / Međunarodno",
      region: "Širi portfolio",
      entity: portmix.name,
      role: "Projekti, reference i kompletan portfolio",
      href: portmix.url,
    },
  ],
  cta: { label: "Posjetite PortMix.ch", href: portmix.url },
  figure: { index: "04", title: "Izvan Sarajeva", meta: "Beton / Ritam" },
} as const;

export const contact = {
  number: "05",
  label: "Kontakt",
  aside: "Ured u Sarajevu",
  headline: ["Razgovarajmo", "o prostoru."],
  text: "Za upite o projektima, saradnju ili dodatne informacije o našim aktivnostima u Bosni i Hercegovini, obratite se našem uredu u Sarajevu.",
  submitLabel: "Pošaljite upit",
} as const;

export const seo = {
  title: "Helvetique Architecture Sarajevo | Arhitektura i enterijeri",
  description:
    "Helvetique architecture d.o.o. Sarajevo — lokalno arhitektonsko prisustvo, koordinacija projekata i prostori po mjeri u Bosni i Hercegovini. Širi portfolio pogledajte na PortMix.ch.",
  locale: "bs_BA",
  lang: "bs",
  knowsAbout: ["Arhitektura", "Arhitektura enterijera", "Prostori po mjeri", "Koordinacija projekata"],
  ogFooter: "ARHITEKTURA · ENTERIJERI · PROSTORI PO MJERI",
  ogPortfolio: "PORTFOLIO NA PORTMIX.CH",
} as const;
