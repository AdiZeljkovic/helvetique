import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { company, hero, seo } from "@/content/site";

export const alt = `${company.legalName} — arhitektura i enterijeri`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const fontsDir = join(process.cwd(), "src", "assets", "fonts");
  const [cormorant, inter] = await Promise.all([
    readFile(join(fontsDir, "Newsreader-Light.ttf")),
    readFile(join(fontsDir, "Inter-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#F3F0E9",
          color: "#151515",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 18, letterSpacing: "0.3em" }}>{company.wordmark[0]}</span>
            <span style={{ fontSize: 13, letterSpacing: "0.28em", color: "#77736D" }}>
              {company.wordmark[1]} · {company.address.city.toUpperCase()}
            </span>
          </div>
          <span style={{ fontSize: 13, letterSpacing: "0.28em", color: "#77736D" }}>
            {company.address.countryShort.toUpperCase()}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 48, height: 2, background: "#B7191D", marginBottom: 36 }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Newsreader",
              fontSize: 116,
              lineHeight: 0.98,
              letterSpacing: "-0.015em",
            }}
          >
            <span>{hero.headline[0]}</span>
            <span>
              {hero.headline[1]} {hero.accentWord}
              <span style={{ color: "#B7191D" }}>.</span>
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(21,21,21,0.15)",
            paddingTop: 28,
            fontSize: 14,
            letterSpacing: "0.22em",
            color: "#77736D",
          }}
        >
          <span>{seo.ogFooter}</span>
          <span>{seo.ogPortfolio}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: cormorant, weight: 300, style: "normal" },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
      ],
    },
  );
}
