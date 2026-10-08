import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { company, hero, seo } from "@/content/site";

export const alt = `${company.legalName} — arhitektura i enterijeri`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const fontsDir = join(process.cwd(), "src", "assets", "fonts");
  const [regular, medium, photo, logo] = await Promise.all([
    readFile(join(fontsDir, "HostGrotesk-400.ttf")),
    readFile(join(fontsDir, "HostGrotesk-500.ttf")),
    sharp(join(process.cwd(), "public", "images", "hero.jpg"))
      .resize(size.width, size.height, { fit: "cover", position: "centre" })
      .jpeg({ quality: 80 })
      .toBuffer(),
    // Reverse master logo (client PNG), scaled for a 280 px wide placement at 2x.
    sharp(join(process.cwd(), "public", "brand", "helvetique-logo-reverse.png")).resize(560).png().toBuffer(),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const background = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", fontFamily: "Host Grotesk" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={background} alt="" width={size.width} height={size.height} style={{ position: "absolute", inset: 0 }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.3))",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0) 70%)" }} />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "64px 72px",
            color: "#ffffff",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={280} height={62} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 0.95, letterSpacing: "-0.045em" }}>
              <span>{hero.headline[0]}</span>
              <span>
                {hero.headline[1]}
                <span style={{ color: "#C10000" }}>.</span>
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 40,
                paddingTop: 24,
                borderTop: "1px solid rgba(255,255,255,0.3)",
                fontSize: 20,
                opacity: 0.85,
              }}
            >
              <span>{seo.ogFooter}</span>
              <span>{seo.ogPortfolio}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Host Grotesk", data: regular, weight: 400, style: "normal" },
        { name: "Host Grotesk", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
