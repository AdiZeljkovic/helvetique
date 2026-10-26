/**
 * Public site origin used for canonical URLs, Open Graph, robots and sitemap.
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment (see .env.example).
 * Development falls back to localhost; a production build without it fails,
 * because canonical URLs and the sitemap would otherwise point at localhost.
 */
const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
const isValid = Boolean(fromEnv && /^https?:\/\/[^/]+$/.test(fromEnv));

if (!isValid && process.env.NODE_ENV === "production") {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be set to the public origin (for example https://www.example.ba) for production builds.",
  );
}

export const siteUrl = isValid ? (fromEnv as string) : "http://localhost:3000";
