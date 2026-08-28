import type { NextConfig } from "next";

/** إعداد الإنتاج على Vercel للموقع العام ولوحة الإدارة الداخلية. */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
