import { cache } from "react";
import * as zadano from "./site";
import { images as zadaneSlike, type ImageKey, type SiteImage } from "./images";

/**
 * Sadržaj sajta = tekst iz CMS-a (PortMix CMS) preko teksta iz koda.
 * ------------------------------------------------------------------
 * `site.ts` i `images.ts` ostaju podrazumijevani sadržaj: svako polje koje CMS
 * ne vrati (CMS ne odgovara, polje prazno, nova stavka nije dodana) prikazuje se
 * iz koda. Zato sajt radi i bez CMS-a, npr. lokalno bez `CMS_URL`.
 *
 * Keš: odgovor CMS-a se pamti pod oznakom `cms`. Na svako „Sačuvaj" CMS zove
 * `/api/cms-osvjezi`, koji poništava oznaku, pa naredna posjeta dobija novi
 * sadržaj. Uz to se sve osvježava i samo, najkasnije za sat.
 *
 * Polja u CMS-u imaju ista imena kao ovdje; razlike su samo u obliku:
 *  - naslovi („redovi") i kratke liste u CMS-u su tekst sa jednim redom po stavci;
 *  - slike su uz stavku (CMS) umjesto u registru po ključu (kod) — vraćaju se u
 *    registar po redoslijedu stavki, pa komponente rade bez izmjena.
 */

export const CMS_OZNAKA = "cms";
const CMS_URL = process.env.CMS_URL?.trim().replace(/\/+$/, "");

/** Kao tip iz koda, ali tekst je `string` (iz CMS-a dolazi bilo koji tekst), a liste nisu fiksne dužine. */
// `[T]` sprečava raspodjelu po uniji: stavke liste su jedan tip, ne unija četiri različite stavke.
type Siroko<T> = [T] extends [string]
  ? string
  : [T] extends [number]
    ? number
    : [T] extends [readonly (infer U)[]]
      ? Siroko<U>[]
      : [T] extends [object]
        ? { -readonly [K in keyof T]: K extends "icon" | "image" ? T[K] : Siroko<T[K]> }
        : T;

/** Registar slika: ključevi iz koda + `cms-…` za stavke dodane u panelu. */
export type Slike = Record<ImageKey, SiteImage> & Record<string, SiteImage>;
export type Sadrzaj = Siroko<typeof zadano> & { images: Slike };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type J = Record<string, any>;

const tekst = (v: unknown, z: string) => (typeof v === "string" && v.trim() ? v.trim() : z);

/** „Redovi" iz CMS-a (jedan po redu) → niz; prazno → iz koda. */
const redovi = (v: unknown, z: readonly string[]): string[] => {
  if (typeof v !== "string") return [...z];
  const r = v.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  return r.length ? r : [...z];
};

/** Prepiše sve tekstove (i ugniježđene) iz `v` preko `z`; ostalo ostaje iz koda. */
function spoji<T>(z: T, v: unknown): Siroko<T> {
  if (typeof z === "string") return tekst(v, z) as Siroko<T>;
  if (Array.isArray(z) || z === null || typeof z !== "object") return z as Siroko<T>;
  const izvor = (v && typeof v === "object" ? v : {}) as J;
  const out: J = {};
  for (const [k, zv] of Object.entries(z as J)) out[k] = spoji(zv, izvor[k]);
  return out as Siroko<T>;
}

/** Fokus iz biblioteke (procenti) → CSS object-position; sredina = bez pomjeranja. */
function slika(v: unknown, z: SiteImage): SiteImage {
  if (!v || typeof v !== "object" || typeof (v as J).url !== "string") return z;
  const m = v as J;
  const fokus =
    typeof m.focalX === "number" && typeof m.focalY === "number" && (m.focalX !== 50 || m.focalY !== 50)
      ? `${m.focalX}% ${m.focalY}%`
      : undefined;
  return {
    src: m.url,
    alt: tekst(m.alt, z.alt),
    width: typeof m.width === "number" ? m.width : z.width,
    height: typeof m.height === "number" ? m.height : z.height,
    ...(fokus ? { position: fokus } : {}),
  };
}

/**
 * Lista iz panela, red po red — urednik dodaje, briše i preslaže. Red nosi `kod` = redni
 * broj stavke u kodu: po njemu prazno polje dobija tekst (i sliku) te stavke i kad je red
 * premješten. Novi red nema `kod` (`zi` je prazan). Panel bez redova → lista iz koda.
 */
function poKodu<Z, R>(z: readonly Z[], v: unknown, mapiraj: (zi: Z | undefined, vi: J, i: number) => R): R[] {
  const lista = Array.isArray(v) ? (v as J[]) : [];
  if (!lista.length) return z.map((zi, i) => mapiraj(zi, {}, i));
  return lista.map((vi, i) => {
    const k = typeof vi?.kod === "string" && /^\d+$/.test(vi.kod) ? Number(vi.kod) : -1;
    return mapiraj(z[k], vi, i);
  });
}

const izSkupa = <T extends string>(v: unknown, z: T, dozvoljeno: readonly string[]): T =>
  typeof v === "string" && dozvoljeno.includes(v) ? (v as T) : z;

const IKONE_DISCIPLINA = ["interiors", "doors", "bespoke", "details"] as const;
const IKONE_KORAKA = ["concept", "development", "documentation", "coordination"] as const;
const SIDRA = ["#studio", "#expertise", "#portfolio", "#contact"] as const;

function mapiraj(d: J | null): Sadrzaj {
  const doc = d ?? {};
  const images: Slike = { ...zadaneSlike };
  const z = zadano;
  /** Slika stavke: ključ iz koda, ili novi (`cms-portfolio-5`) za stavku dodanu u panelu. */
  const slikaStavke = (lista: string, zi: { image: ImageKey } | undefined, prva: ImageKey, vi: J, i: number) => {
    const kljuc = zi?.image ?? `cms-${lista}-${i}`;
    images[kljuc] = slika(vi.slika, zadaneSlike[zi?.image ?? prva]);
    return kljuc as ImageKey;
  };

  // ----- slike vezane za sekcije
  images.hero = slika(doc.hero?.slika, zadaneSlike.hero);
  images.featureMain = slika(doc.studio?.slikaSiroka, zadaneSlike.featureMain);
  images.featureDetail = slika(doc.studio?.slikaUspravna, zadaneSlike.featureDetail);
  images.philosophy = slika(doc.philosophy?.slika, zadaneSlike.philosophy);

  const prvaDisciplina = z.expertise.items[0];
  const expertiseItems = poKodu(z.expertise.items, doc.expertise?.items, (zi, vi, i) => ({
    title: tekst(vi.title, zi?.title ?? ""),
    description: tekst(vi.description, zi?.description ?? ""),
    scope: redovi(vi.scope, zi?.scope ?? []),
    image: slikaStavke("expertise", zi, prvaDisciplina.image, vi, i),
    icon: izSkupa(vi.icon, zi?.icon ?? prvaDisciplina.icon, IKONE_DISCIPLINA),
  }));

  const prvaKategorija = z.portfolio.categories[0];
  const categories = poKodu(z.portfolio.categories, doc.portfolio?.categories, (zi, vi, i) => ({
    title: tekst(vi.title, zi?.title ?? ""),
    image: slikaStavke("portfolio", zi, prvaKategorija.image, vi, i),
    icon: izSkupa(vi.icon, zi?.icon ?? prvaKategorija.icon, IKONE_DISCIPLINA),
  }));

  // ----- firma
  const c = (doc.company ?? {}) as J;
  const e164 = tekst(c.phoneE164, z.company.phone.e164).replace(/\s+/g, "");
  const email = tekst(c.email, z.company.email.display);
  const trzista =
    Array.isArray(c.markets) && c.markets.length
      ? (c.markets as J[]).map((m) => ({ name: tekst(m.name, ""), code: tekst(m.code, "") })).filter((m) => m.name)
      : z.company.markets.map((m) => ({ ...m }));

  const company: Sadrzaj["company"] = {
    legalName: tekst(c.legalName, z.company.legalName),
    shortName: tekst(c.shortName, z.company.shortName),
    address: spoji(z.company.address, c.address),
    phone: { display: tekst(c.phoneDisplay, z.company.phone.display), href: `tel:${e164}`, e164 },
    email: { display: email, href: `mailto:${email}` },
    companyId: tekst(c.companyId, z.company.companyId),
    vatNote: tekst(c.vatNote, z.company.vatNote),
    markets: trzista,
  };

  const temeIzKoda = z.contact.form.topics.filter((t) => !z.expertise.items.some((i) => i.title === t));

  return {
    company,
    portmix: spoji(z.portmix, doc.portmix),
    navigation: poKodu(z.navigation, doc.navigation, (zi, vi) => ({
      label: tekst(vi.label, zi?.label ?? ""),
      href: izSkupa(vi.href, zi?.href ?? SIDRA[0], SIDRA),
    })),
    ui: {
      ...spoji(z.ui, doc.ui),
      footer: { ...spoji(z.ui.footer, doc.ui?.footer), ctaTitle: redovi(doc.ui?.footer?.ctaTitle, z.ui.footer.ctaTitle) },
    },
    hero: {
      headline: redovi(doc.hero?.headline, z.hero.headline),
      lede: tekst(doc.hero?.lede, z.hero.lede),
      primaryCta: spoji(z.hero.primaryCta, doc.hero?.primaryCta),
    },
    studio: {
      ...spoji(z.studio, doc.studio),
      headline: redovi(doc.studio?.headline, z.studio.headline),
      facts: poKodu(z.studio.facts, doc.studio?.facts, (zi, vi) => ({
        term: tekst(vi.term, zi?.term ?? ""),
        detail: tekst(vi.detail, zi?.detail ?? ""),
      })),
    },
    expertise: {
      headline: redovi(doc.expertise?.headline, z.expertise.headline),
      intro: tekst(doc.expertise?.intro, z.expertise.intro),
      scopeLabel: tekst(doc.expertise?.scopeLabel, z.expertise.scopeLabel),
      // Tip iz koda je unija četiri različite stavke; po vrijednostima je isto.
      items: expertiseItems as Sadrzaj["expertise"]["items"],
    },
    philosophy: {
      statement: tekst(doc.philosophy?.statement, z.philosophy.statement),
      text: tekst(doc.philosophy?.text, z.philosophy.text),
      steps: poKodu(z.philosophy.steps, doc.philosophy?.steps, (zi, vi) => ({
        title: tekst(vi.title, zi?.title ?? ""),
        text: tekst(vi.text, zi?.text ?? ""),
        icon: izSkupa(vi.icon, zi?.icon ?? IKONE_KORAKA[0], IKONE_KORAKA),
      })),
    },
    portfolio: {
      headline: redovi(doc.portfolio?.headline, z.portfolio.headline),
      text: tekst(doc.portfolio?.text, z.portfolio.text),
      categories: categories as Sadrzaj["portfolio"]["categories"],
      cta: spoji(z.portfolio.cta, doc.portfolio?.cta),
    },
    contact: {
      ...spoji(z.contact, doc.contact),
      headline: redovi(doc.contact?.headline, z.contact.headline),
      form: {
        title: tekst(doc.contact?.form?.title, z.contact.form.title),
        text: tekst(doc.contact?.form?.text, z.contact.form.text),
        topics: [...expertiseItems.map((i) => i.title), ...redovi(doc.contact?.form?.extraTopics, temeIzKoda)],
      },
    },
    notFound: {
      ...spoji(z.notFound, doc.notFound),
      headline: redovi(doc.notFound?.headline, z.notFound.headline),
    },
    seo: {
      ...spoji(z.seo, doc.seo),
      locale: z.seo.locale,
      lang: z.seo.lang,
      knowsAbout: redovi(doc.seo?.knowsAbout, z.seo.knowsAbout),
    },
    images,
  };
}

/**
 * Zadnji uspješan odgovor CMS-a (u memoriji procesa). Ako CMS nakratko ne odgovara
 * (restart, deploy), stranica se pravi od njega — a ne od starog teksta iz koda,
 * koji bi se onda keširao do sat vremena. Pri buildu jedan pokušaj (bez čekanja).
 */
const zadnjiDobar = new Map<string, J>();
const pokusaja = () => (process.env.NEXT_PHASE === "phase-production-build" ? 1 : 3);
const pauza = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function povuci(): Promise<J | null> {
  if (!CMS_URL) return null;
  for (let i = 0; i < pokusaja(); i++) {
    if (i) await pauza(1000 * i);
    try {
      const res = await fetch(`${CMS_URL}/api/globals/helvetique?depth=1&locale=bs`, {
        next: { tags: [CMS_OZNAKA], revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) {
        const d = (await res.json()) as J;
        zadnjiDobar.set("bs", d);
        return d;
      }
      if (res.status < 500) break;
    } catch {
      /* CMS ne odgovara — novi pokušaj */
    }
  }
  return zadnjiDobar.get("bs") ?? null;
}

/** Sadržaj za serverske komponente (jednom po renderu). Klijentske ga dobijaju kroz `useSadrzaj()`. */
export const getSadrzaj = cache(async (): Promise<Sadrzaj> => mapiraj(await povuci()));
