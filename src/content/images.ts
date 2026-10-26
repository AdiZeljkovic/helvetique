/**
 * Image registry
 * --------------
 * Every photograph used on the site is referenced from here. The current
 * files are stock photographs from Unsplash (Unsplash License, free for
 * commercial use), fetched and cropped by scripts/fetch-stock-photos.mjs.
 * Sources are listed in public/images/README.md.
 * To use the studio's own photography, replace the files in /public/images
 * (same names, similar aspect ratios) and update the `alt` text below.
 * Nothing in the components needs to change.
 *
 * Aspect ratios are intentional for the layouts they sit in:
 *   hero               3:2   full-bleed, behind the headline
 *   featureMain        3:2   wide editorial image (shown 21:9 / 4:3)
 *   featureDetail      3:4   companion detail (shown 4:5)
 *   contact            16:10 foot of the dark office panel in the contact section
 *   expertise*         4:5   interactive expertise panel
 *   philosophy         16:10 full-bleed background of the approach section
 *   portfolio*         4:5   category tiles
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
  contact: {
    src: "/images/contact.jpg",
    alt: "Toplo dnevno svjetlo pada na zid od grubog maltera",
    width: 1200,
    height: 750,
  },
  expertiseArchitecture: {
    src: "/images/expertise-architecture.jpg",
    alt: "Drvene grede iznad bijelog zida bacaju duge sjene pod plavim nebom",
    width: 1200,
    height: 1500,
  },
  expertiseInteriors: {
    src: "/images/expertise-interiors.jpg",
    alt: "Svijetao ulazni prostor s bijelim ugradnim ormarom, zidnim stolom i zelenim tabureom",
    width: 1200,
    height: 1500,
  },
  expertiseBespoke: {
    src: "/images/expertise-bespoke.jpg",
    alt: "Ugradni ormar bez ručki s osvijetljenom nišom od drvenih letvica i klupom za sjedenje",
    width: 1200,
    height: 1500,
  },
  expertiseCoordination: {
    src: "/images/expertise-coordination.jpg",
    alt: "Arhitektonski nacrti tlocrta razastrti jedan preko drugog",
    width: 1200,
    height: 1500,
  },
  philosophy: {
    src: "/images/philosophy.jpg",
    alt: "Dnevno svjetlo kroz prozore s drvenim okvirima iscrtava pravougaonike na tamnom drvenom podu",
    width: 1920,
    height: 1200,
  },
  portfolioArchitecture: {
    src: "/images/portfolio-architecture.jpg",
    alt: "Bijela kolonada s drvenim lamelama uz vodenu površinu pod vedrim nebom",
    width: 1200,
    height: 1500,
  },
  portfolioInteriors: {
    src: "/images/portfolio-interiors.jpg",
    alt: "Svijetla soba s drvenom komodom, foteljom i parketom u riblju kost",
    width: 1200,
    height: 1500,
  },
  portfolioBespoke: {
    src: "/images/portfolio-bespoke.jpg",
    alt: "Ugradne police u obliku luka od svijetlog drveta s keramikom i knjigama",
    width: 1200,
    height: 1500,
  },
  portfolioDetails: {
    src: "/images/portfolio-details.jpg",
    alt: "Minimalističko stepenište od bijelog maltera u uskom prolazu",
    width: 1200,
    height: 1500,
  },
} as const satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
