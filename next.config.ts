import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Photography is served up to ~1000px wide per column; 1920 covers full-bleed on large screens.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
  },
  poweredByHeader: false,
};

export default nextConfig;
