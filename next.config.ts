import type { NextConfig } from "next";

/**
 * إعدادات النشر — تعمل على كل من GitHub Pages (دومين خاص) و Vercel
 *
 * - على GitHub Pages: تصدير ثابت كامل إلى مجلد out/ (لا يوجد خادم Node)
 *   الدومين الخاص يعمل من الجذر، لذا لا حاجة لأي basePath أو assetPrefix
 * - على Vercel: بناء Next.js عادي بدون output: export حتى يستفيد من التحسينات
 *   الصور غير محسّنة في كلا الحالتين لأن الصور الحالية خفيفة ومحلية
 *
 * يتم الكشف عن بيئة Vercel عبر متغير VERCEL الذي تضعه Vercel تلقائياً
 */
const isVercel = Boolean(process.env.VERCEL);

const nextConfig: NextConfig = {
  // على Vercel نترك Next.js يبني كـ SSR/SSG عادي، على Pages نصدّر ثابت
  ...(isVercel ? {} : { output: "export" as const }),
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  // GitHub Pages يحتاج trailingSlash ليخدم كل مسار كـ index.html
  // Vercel لا يحتاج ذلك ويفضل false
  trailingSlash: isVercel ? false : true,
};

export default nextConfig;
