/**
 * Jedinstveni izvor istine za podatke o kompaniji, navigaciju i sav tekst.
 * Ovdje pripadaju samo provjerene informacije. Ne dodavati historiju, nagrade,
 * članove tima, statistike ili nazive projekata koji nisu potvrđeni.
 *
 * Ton: formalan i sažet, obraćanje s "Vi" (veliko slovo), ijekavica.
 * Fotografije su većinom stock (osim dvije iz projekata klijenta: vrata i detalji),
 * pa ih tekst ne predstavlja kao vlastite radove.
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
  email: {
    display: "info@helvetique.ba",
    href: "mailto:info@helvetique.ba",
  },
  companyId: "4203663110007",
  vatNote: "Nije u sistemu PDV-a",
  /** Tržišta na kojima studio radi. */
  markets: [
    { name: "Bosna i Hercegovina", code: "BA" },
    { name: "Švicarska", code: "CH" },
  ],
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
  footer: {
    ctaLabel: "Novi projekat",
    /** The closing question mark is added in red by the footer. */
    ctaTitle: ["Imate projekat", "na umu"],
    ctaButton: "Pošaljite upit",
    orCall: "Ili nazovite",
    tagline: "Enterijeri, vrata i namještaj po mjeri, razrađeni do posljednjeg detalja.",
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
    subject: "Šta Vas zanima?",
    message: "Poruka",
    optional: "Opcionalno",
    sending: "Slanje…",
    honeypot: "Web stranica kompanije",
    privacyNote: "Podatke koristimo isključivo za odgovor na Vaš upit.",
    errors: {
      name: "Unesite ime i prezime.",
      email: "Unesite ispravnu e-mail adresu.",
      phone: "Provjerite broj telefona.",
      subject: "Odaberite temu upita.",
      message: "Poruka treba imati najmanje 20 znakova.",
    },
    successTitle: "Hvala Vam. Upit je uspješno poslan.",
    successText: "Javit ćemo Vam se uskoro. Za hitne upite nazovite",
    unconfiguredText: "Obrazac trenutno nije povezan s našim sistemom e-pošte. Pišite nam na",
    failedText: "Upit trenutno nije moguće poslati. Pokušajte ponovo, pišite nam na",
    orCall: "ili nazovite",
  },
} as const;

export const hero = {
  headline: ["Prostori oblikovani", "s namjerom"],
  lede: "Oblikujemo enterijere i kreiramo prostore po Vašoj mjeri, od prve ideje do realizacije, uz pažljivu koordinaciju i dugoročna partnerstva.",
  primaryCta: { label: "Upoznajte studio", href: "#studio" },
} as const;

export const studio = {
  headline: ["Partner za enterijer", "i detalj."],
  lead: "Helvetique architecture je studio za dizajn enterijera, vrata i namještaj po mjeri, sa sjedištem u Sarajevu. Svaki projekat razrađujemo do tehničke i radioničke dokumentacije za proizvođače.",
  text: "Specijalizovani smo za enterijer i detalj. Sarađujemo s arhitektima i izvođačima tamo gdje se projekat pretvara u prostor: od rasporeda i namještaja do vrata i izvedbenih nacrta. Širi portfolio i reference predstavljeni su na PortMix.ch.",
  facts: [
    { term: "Za koga", detail: "Privatni klijenti, investitori, arhitekti i proizvođači" },
    { term: "Gdje radimo", detail: company.markets.map((market) => market.name).join(" i ") },
    { term: "Portfolio", detail: "PortMix.ch" },
  ],
  detailCaption: "Stepenište s drvenim gazištima",
  wideCaption: "Ulaz: vrata, stolarija i stepenište",
} as const;

export const expertise = {
  headline: ["Od koncepta", "do detalja."],
  intro: "Četiri discipline, jedan pristup: jasna ideja, razrađena do tehničke i radioničke dokumentacije za proizvođače.",
  scopeLabel: "Šta radimo",
  items: [
    {
      title: "Dizajn enterijera",
      description: "Enterijeri osmišljeni kao cjelina, od rasporeda i atmosfere do posljednjeg detalja.",
      scope: ["Raspored prostora", "3D prikazi", "Izbor materijala i rasvjete", "Nacrti ugradnog namještaja"],
      image: "expertiseInteriors",
      icon: "interiors",
    },
    {
      title: "Vrata po mjeri",
      description: "Unutrašnja vrata i stolarija, usklađeni s enterijerom i razrađeni za proizvođača.",
      scope: ["Detalji vrata", "Liste vrata", "Tehnička dokumentacija", "Usklađivanje s proizvođačima"],
      image: "expertiseDoors",
      icon: "doors",
    },
    {
      title: "Prostori po mjeri",
      description: "Pločasti namještaj, ugradbeni ormari i police, osmišljeni za konkretan prostor i način na koji se koristi.",
      scope: ["Ugradbeni ormari", "Police", "Pločasti namještaj", "Radionički nacrti"],
      image: "expertiseBespoke",
      icon: "bespoke",
    },
    {
      title: "Detalji",
      description: "Klupice, opšavi oko stolarije i slični elementi od drveta koji enterijeru daju završen izgled.",
      scope: ["Klupice", "Opšavi oko stolarije", "Elementi od drveta", "Detaljni nacrti"],
      image: "expertiseDetails",
      icon: "details",
    },
  ],
} as const;

export const philosophy = {
  statement: "Enterijer počinje osjećajem koji prostor treba da pruži.",
  text: "Svaki projekat vodimo kroz četiri koraka, od prvog koncepta do koordinacije s proizvođačima i izvođačima.",
  steps: [
    { title: "Koncept", text: "Raspored prostora, atmosfera i 3D prikazi.", icon: "concept" },
    { title: "Razrada", text: "Materijali, rasvjeta, vrata i detalji, usklađeni u jednu cjelinu.", icon: "development" },
    { title: "Dokumentacija", text: "Tehnički i radionički nacrti za proizvođače.", icon: "documentation" },
    { title: "Koordinacija", text: "Usklađivanje s arhitektima, izvođačima i proizvođačima.", icon: "coordination" },
  ],
} as const;

export const portfolio = {
  headline: ["Odabrane perspektive."],
  text: "Projekti, reference i kompletan portfolio predstavljeni su na PortMix.ch.",
  categories: [
    { title: "Enterijeri", image: "portfolioInteriors", icon: "interiors" },
    { title: "Vrata", image: "portfolioDoors", icon: "doors" },
    { title: "Prostori po mjeri", image: "portfolioBespoke", icon: "bespoke" },
    { title: "Detalji", image: "portfolioDetails", icon: "details" },
  ],
  cta: { label: "Projekti realizovani u saradnji s našim partnerima", href: portmix.url },
} as const;

export const contact = {
  headline: ["Razgovarajmo", "o Vašem projektu."],
  text: "Za upite o projektima, saradnji ili dodatne informacije o našem radu, javite nam se telefonom ili putem obrasca.",
  submitLabel: "Pošaljite upit",
  map: {
    label: "Prikaži na karti",
    url: "https://www.google.com/maps/search/?api=1&query=Azize%20%C5%A0a%C4%87irbegovi%C4%87%20bb%2C%20Sarajevo",
  },
  form: {
    title: "Pošaljite upit",
    text: "Odaberite temu, ispunite obrazac i odgovorit ćemo Vam što prije.",
    /** Topics offered as chips; the choice is sent as the inquiry's subject. */
    topics: [...expertise.items.map((item) => item.title), "Saradnja", "Drugo"],
  },
  facts: {
    telephone: "Telefon",
    email: "E-mail",
    office: "Adresa",
    company: "Kompanija",
  },
} as const;

export const notFound = {
  title: "Stranica nije pronađena",
  label: "404",
  headline: ["Ova stranica", "ne postoji."],
  text: "Stranica koju tražite ne postoji ili je premještena.",
  cta: { label: "Nazad na početnu", href: "/" },
} as const;

export const seo = {
  title: "Helvetique Architecture | Dizajn enterijera, vrata i namještaj po mjeri",
  description:
    "Helvetique architecture: dizajn enterijera, vrata i namještaj po mjeri, detalji u drvetu te tehnička i radionička dokumentacija za proizvođače. Portfolio na PortMix.ch.",
  ogAlt: "dizajn enterijera, vrata i namještaj po mjeri",
  locale: "bs_BA",
  lang: "bs",
  knowsAbout: [
    "Dizajn enterijera",
    "Vrata po mjeri",
    "Namještaj po mjeri",
    "Ugradbeni ormari",
    "Tehnička i radionička dokumentacija",
  ],
  ogFooter: "Enterijeri · Vrata · Namještaj po mjeri",
  ogPortfolio: "Portfolio na PortMix.ch",
} as const;
