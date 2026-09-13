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
 *   hero               4:5   tall, sits beside the headline
 *   featureMain        3:2   wide editorial image
 *   featureDetail      3:4   companion detail
 *   philosophy         4:5   dark manifesto section
 *   portfolio*         4:3 / 3:4 / 2:1 / 1:1  asymmetric grid
 *   connection         4:5   PortMix relationship section
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
    alt: "Sunčeva svjetlost pada oštrom dijagonalom preko sirovog betonskog zida i poda",
    width: 1600,
    height: 2000,
  },
  featureMain: {
    src: "/images/feature-main.jpg",
    alt: "Konzolna betonska fasada moderne zgrade baca duboku sjenu",
    width: 2000,
    height: 1333,
  },
  featureDetail: {
    src: "/images/feature-detail.jpg",
    alt: "Prošarano dnevno svjetlo na betonskom zidu iznad rebrastog betonskog podnožja",
    width: 1200,
    height: 1600,
  },
  philosophy: {
    src: "/images/philosophy.jpg",
    alt: "Svjetlo s prozora razliveno po kamenom podu uz betonski stub u tamnoj prostoriji",
    width: 1600,
    height: 2000,
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
    alt: "Dnevni boravak s vidljivim drvenim gredama, tamnim zidovima i kamenim stolićem",
    width: 2000,
    height: 1000,
  },
  portfolioDetails: {
    src: "/images/portfolio-details.jpg",
    alt: "Drvena klupa od letvica uz betonski zid pod sjenama lišća",
    width: 1200,
    height: 1200,
  },
  connection: {
    src: "/images/connection.jpg",
    alt: "Betonska fasada s ritmom uvučenih prozora i vertikalnih lamela pod oblačnim nebom",
    width: 1400,
    height: 1750,
  },
} as const satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
