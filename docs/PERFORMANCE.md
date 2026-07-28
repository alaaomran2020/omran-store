# دليل الأداء وتحسين PageSpeed

توثيق لتحسينات الأداء المطبقة في المشروع، وبنود مراجعة دورية للحفاظ على تقييم مرتفع في Lighthouse / PageSpeed Insights.

---

## 1. الخطوط — أكبر مكسب

| | قبل | بعد |
|---|---|---|
| الملفات | 24 ملف woff2 (5 أوزان عربية + 3 لاتينية عبر `@fontsource`) | ملفان متغيّران فقط |
| الحجم | ~292 KB عند تحميل كل الأوزان | ~68 KB تغطي 200–1000 |
| الاكتشاف | بعد تنزيل وتحليل CSS | `preload` من أول بايت في `<head>` |
| الظهور | — | `font-display: swap` (لا نص خفي) |

- الخط مستضاف محلياً في `public/fonts/` — لا DNS/connection خارجية.
- معرّف في `src/app/globals.css` بوصفة `woff2-variations` مع `unicode-range` للعربية واللاتينية.
- التحميل المسبق عبر `ReactDOM.preload()` داخل `src/app/layout.tsx`.
- الترخيص: SIL OFL (`public/fonts/OFL-LICENSE.txt`).

**قاعدة مراجعة:** عند تغيير الخط استخدم دائماً خطاً متغيراً (variable) واحداً لكل subset، وأضف `preload` + `swap`.

## 2. تقسيم حزم JavaScript

- `QuickViewModal` و`CartDrawer` في حزم منفصلة عبر `next/dynamic` — لا تُحمَّل إلا عند الفتح فعلياً (`DeferredCartDrawer` يتحقق من `isCartOpen`).
- `Hero` مكوّن خادم (بلا `"use client"`) — نصوص الصفحة الأولى ترسم HTML بدون JS.

**قاعدة مراجعة:** أي نافذة/درج/مكوّن لا يظهر عند التحميل الأولي يجب أن يكون `dynamic` مضبوطاً على عدم الرسم المسبق غير الضروري.

## 3. ترويسات التخزين المؤقت

مضبوطة في `next.config.ts`:

| المسار | السياسة | السبب |
|--------|---------|-------|
| `/fonts/*` | `max-age=31536000, immutable` | أسماء ثابتة لا تتغير |
| `/products/*` | `max-age=2592000, stale-while-revalidate` | صور تتجدد دورياً |
| `/logo.svg`, `/icon.svg`, `/og-image.svg` | `max-age=604800, SWR` | هوية شبه ثابتة |

## 4. ممارسات مثبتة أصلاً في المشروع (لا تُكسر)

- الصور عبر `next/image` مع `sizes` دقيقة لكل سياق، و`priority` للشعار فوق الطية.
- `images.formats: [avif, webp]` — المتصفح يأخذ الأخف.
- الصفحة مرسومة مسبقاً بالكامل (SSG) — TTFB ضئيل.
- لا مكتبات طرف ثالث ثقيلة: أيقونات lucide فقط (tree-shaken).
- `prefers-reduced-motion` محترم في CSS — يمنع تكلفة الحركات على الأجهزة الضعيفة.

## 5. قياس دوري

```bash
npm run build          # تأكد من نظافة البناء وعدد الحزم
npx lighthouse http://localhost:3100 --preset=desktop   # بعد npx next start
```

أهداف مرجعية للهيكل الحالي: FCP < 1.5s · LCP < 2.5s · CLS ≈ 0 (الخطوط المحلية مع preload تقضي على إزاحة النص) · JS أولي gzip ≈ 210 KB.
