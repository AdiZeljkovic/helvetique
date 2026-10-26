import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
// HSTS and upgrade-insecure-requests only make sense once the site is served over HTTPS.
const isHttps = process.env.NEXT_PUBLIC_SITE_URL?.trim().startsWith("https://") ?? false;

/** Origin of the external contact endpoint, if one is configured (see src/lib/contact.ts). */
function originOf(url: string | undefined): string {
  try {
    return url ? new URL(url).origin : "";
  } catch {
    return "";
  }
}
const contactOrigin = originOf(process.env.NEXT_PUBLIC_CONTACT_ENDPOINT);

/**
 * Content Security Policy without nonces, so the page stays statically prerendered
 * (nonces would force dynamic rendering). Next.js streams its payload in inline
 * scripts and the layout sets one inline flag, hence 'unsafe-inline' for scripts;
 * everything else is restricted to this origin. 'unsafe-eval' is for React's
 * development tooling only.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${contactOrigin ? ` ${contactOrigin}` : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isHttps ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  // Two years, without includeSubDomains: other subdomains of the domain may not be on HTTPS.
  ...(isHttps ? [{ key: "Strict-Transport-Security", value: "max-age=63072000" }] : []),
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Photography is served up to ~1000px wide per column; 1920 covers full-bleed on large screens.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    // 75 for photographs, 90 for the logo (see src/components/brand/Logo.tsx).
    qualities: [75, 90],
  },
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        // Logos and icons change only with a rebrand.
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
