/**
 * Image registry
 * --------------
 * Every photograph used on the site is referenced from here. Two are the
 * client's own project photographs (expertise doors and details); the rest
 * are stock photographs from Unsplash (Unsplash License, free for commercial
 * use). All are cropped by scripts/fetch-stock-photos.mjs; sources are listed
 * in public/images/README.md.
 * To use the studio's own photography, replace the files in /public/images
 * (same names, similar aspect ratios) and update the `alt` text below.
 * Nothing in the components needs to change.
 *
 * Aspect ratios are intentional for the layouts they sit in:
 *   hero               3:2   full-bleed, behind the headline
 *   featureMain        3:2   wide photograph of the studio pair
 *   featureDetail      3:4   tall photograph of the studio pair
 *   expertise*         4:5   interactive expertise panel
 *   philosophy         16:10 full-bleed background of the approach section
 *   portfolio*         4:5   category panels; one set, matched in tone (warm light oak, daylight)
 */

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position, for frames much narrower than the photograph (default: centre). */
  position?: string;
};

export const images = {
  hero: {
    src: "/images/hero.jpg",
    alt: "Svijetao dnevni boravak s kaminom, visokim prozorima u drvenim okvirima i pogledom na šumu",
    width: 1920,
    height: 1280,
  },
  featureMain: {
    src: "/images/feature-main.jpg",
    alt: "Ulazni hol s drvenim stepeništem, bijelim ostakljenim vratima i okruglim ogledalom",
    width: 1920,
    height: 1280,
  },
  featureDetail: {
    src: "/images/feature-detail.jpg",
    alt: "Pogled odozdo na stepenište s hrastovim gazištima, bijelim zidovima i otvorom prema nebu",
    width: 1200,
    height: 1600,
  },
  expertiseInteriors: {
    src: "/images/expertise-interiors.jpg",
    alt: "Spavaća soba sa zidovima obloženim drvetom i ugradnim drvenim volumenom uz hodnik",
    width: 1200,
    height: 1500,
  },
  expertiseDoors: {
    src: "/images/expertise-doors.jpg",
    alt: "Hrastova vrata s osvijetljenim dovratnikom uz betonsko stepenište",
    width: 1200,
    height: 1500,
  },
  expertiseBespoke: {
    src: "/images/expertise-bespoke.jpg",
    alt: "Ugradni ormar bez ručki s osvijetljenom nišom od drvenih letvica i klupom za sjedenje",
    width: 1200,
    height: 1500,
  },
  expertiseDetails: {
    src: "/images/expertise-details.jpg",
    alt: "Hrastovi opšavi oko visokih prozora u dugom hodniku s betonskim zidovima",
    width: 1200,
    height: 1500,
  },
  philosophy: {
    src: "/images/philosophy.jpg",
    alt: "Dnevno svjetlo kroz prozore s drvenim okvirima iscrtava pravougaonike na tamnom drvenom podu",
    width: 1920,
    height: 1200,
  },
  portfolioInteriors: {
    src: "/images/portfolio-interiors.jpg",
    alt: "Trpezarija obasjana toplim suncem, s rebrastim stolom, hrastovim stolicama i otvorenim policama",
    width: 1200,
    height: 1500,
  },
  portfolioDoors: {
    src: "/images/portfolio-doors.jpg",
    alt: "Otvorena okretna vrata od hrastovih letvica, uklopljena u zidnu oblogu od istih letvica",
    width: 1200,
    height: 1500,
  },
  portfolioBespoke: {
    src: "/images/portfolio-bespoke.jpg",
    alt: "Ugradbeni ormar od svijetlog hrasta od poda do plafona, s otvorenim vratima i policama",
    width: 1200,
    height: 1500,
  },
  portfolioDetails: {
    src: "/images/portfolio-details.jpg",
    alt: "Hrastov opšav i klupica oko velikog prozora s pogledom na terasu",
    width: 1200,
    height: 1500,
    // The oak lining is on the right; keep it in the narrow, closed panel.
    position: "85% 50%",
  },
} as const satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
