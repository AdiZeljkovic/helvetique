/**
 * Image registry
 * --------------
 * Every photograph used on the site is referenced from here. The current
 * files are stock photographs from Pexels (Pexels License, free for
 * commercial use), fetched and cropped by scripts/fetch-stock-photos.mjs.
 * To use the studio's own photography, replace the files in /public/images
 * (same names, similar aspect ratios) and update the `alt` text below.
 * Nothing in the components needs to change.
 *
 * Aspect ratios are intentional for the layouts they sit in:
 *   hero               3:2   full-bleed, behind the headline
 *   featureMain        3:2   wide editorial image
 *   featureDetail      3:4   companion detail
 *   presence           16:10 Sarajevo panorama in the presence section
 *   expertise*         4:5   interactive expertise panel
 *   philosophy         16:10 full-bleed background of the approach section
 *   portfolio*         4:3 / 4:5 / 1:1 / 16:10  asymmetric grid
 */

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const images = {
  hero: {
    src: "/images/hero.jpg",
    alt: "Betonski prolaz u kojem dnevno svjetlo kroz niz otvora iscrtava ritam na zidu od teraca",
    width: 2400,
    height: 1600,
  },
  featureMain: {
    src: "/images/feature-main.jpg",
    alt: "Crno-bijeli detalj arhitekture sa stubovima, prepuštenom pločom i oštrim sjenama",
    width: 2000,
    height: 1333,
  },
  featureDetail: {
    src: "/images/feature-detail.jpg",
    alt: "Prošarano dnevno svjetlo na zidu od pločica iznad rebrastog betonskog podnožja",
    width: 1200,
    height: 1600,
  },
  presence: {
    src: "/images/presence.jpg",
    alt: "Pogled na Sarajevo s brda: krovovi, minaret, gradski tornjevi i planine u izmaglici",
    width: 2400,
    height: 1500,
  },
  expertiseArchitecture: {
    src: "/images/expertise-architecture.jpg",
    alt: "Crno-bijela fasada stambene zgrade s ritmom vertikalnih otvora",
    width: 1600,
    height: 2000,
  },
  expertiseInteriors: {
    src: "/images/expertise-interiors.jpg",
    alt: "Svijetao enterijer s lučnom nišom, stepenastim kaminom i foteljom",
    width: 1600,
    height: 2000,
  },
  expertiseBespoke: {
    src: "/images/expertise-bespoke.jpg",
    alt: "Drveni element namještaja po mjeri položen na ručne skice i nacrte",
    width: 1600,
    height: 2000,
  },
  expertiseCoordination: {
    src: "/images/expertise-coordination.jpg",
    alt: "Radni sto s arhitektonskim nacrtima, naočalama, olovkom i stonom lampom",
    width: 1600,
    height: 2000,
  },
  philosophy: {
    src: "/images/philosophy.jpg",
    alt: "Svjetlo s prozora razliveno po kamenom podu uz betonski stub u tamnoj prostoriji",
    width: 2400,
    height: 1500,
  },
  portfolioArchitecture: {
    src: "/images/portfolio-architecture.jpg",
    alt: "Siva panelna fasada moderne zgrade s prozorima u tamnim okvirima",
    width: 1600,
    height: 1200,
  },
  portfolioInteriors: {
    src: "/images/portfolio-interiors.jpg",
    alt: "Hrastovi kuhinjski elementi i stolica od savijene šperploče u svijetlom minimalističkom enterijeru",
    width: 1200,
    height: 1600,
  },
  portfolioBespoke: {
    src: "/images/portfolio-bespoke.jpg",
    alt: "Dnevno svjetlo pada preko hrastovog poda uz ugradni drveni namještaj",
    width: 2000,
    height: 1250,
  },
  portfolioDetails: {
    src: "/images/portfolio-details.jpg",
    alt: "Drvena klupa od letvica uz betonski zid pod sjenama lišća",
    width: 1200,
    height: 1200,
  },
} as const satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
