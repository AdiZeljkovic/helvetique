import type { MetadataRoute } from "next";
import { getSadrzaj } from "@/content/cms";

/** Web app manifest: name, colours and icons when the site is added to a home screen. */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { company, seo } = await getSadrzaj();
  return {
    name: company.shortName,
    short_name: "Helvetique",
    description: seo.description,
    lang: seo.lang,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#090909",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
