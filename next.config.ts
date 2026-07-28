import type { NextConfig } from "next";

/**
 * إعدادات النشر على GitHub Pages بدومين خاص (omrantoys.store).
 *
 * - التصدير ثابت بالكامل إلى مجلد out/ (لا يوجد خادم Node).
 * - الدومين الخاص يعمل من الجذر، لذا لا حاجة لأي basePath أو assetPrefix
 *   (احذفها إن أضيفت مستقبلاً — وجودها يكسر المسارات على الدومين الخاص).
 * - الصور غير محسّنة لأن محسّن صور Next يتطلب خادماً؛ الصور أصلاً SVG خفيفة.
 * - ملاحظة: GitHub Pages لا يدعم ترويسات HTTP مخصصة، لذلك لا نستخدم headers().
 */
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  // تقليد Pages في خدمة الملفات: كل مسار ينتهي بسلاش ويقرأ index.html
  trailingSlash: true,
};

export default nextConfig;
