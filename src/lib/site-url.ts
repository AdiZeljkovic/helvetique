/**
 * Public site origin used for canonical URLs, Open Graph, robots and sitemap.
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment (see .env.example).
 * The fallback keeps local builds working; it is not a real domain.
 */
const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");

export const siteUrl = fromEnv && /^https?:\/\//.test(fromEnv) ? fromEnv : "http://localhost:3000";
