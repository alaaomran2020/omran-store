import type { NextConfig } from "next";

/** سياسة تخزين مؤقت فعّالة للأصول الثابتة (تحسّن PageSpeed في الزيارات المتكررة) */
const cacheHeaders = [
  // خطوط مستضافة بأسماء ثابتة لا تتغير إلا بترقية مقصودة
  {
    source: "/fonts/:path*",
    headers: [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ],
  },
  // صور المنتجات تتجدد شهرياً مع إمكانية العرض القديم أثناء التحديث
  {
    source: "/products/:path*",
    headers: [
      {
        key: "Cache-Control",
        value: "public, max-age=2592000, stale-while-revalidate=86400",
      },
    ],
  },
  // الشعار والأيقونات وصورة المشاركة
  ...["/logo.svg", "/icon.svg", "/og-image.svg"].map((source) => ({
    source,
    headers: [
      {
        key: "Cache-Control",
        value: "public, max-age=604800, stale-while-revalidate=86400",
      },
    ],
  })),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return cacheHeaders;
  },
};

export default nextConfig;
