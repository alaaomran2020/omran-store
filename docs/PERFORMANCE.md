# دليل الأداء — كتالوج عمران (Catalog-Only)

توثيق لتحسينات الأداء في نسخة الكتالوج الاحترافي بدون سلة.

## 1. الخطوط — أكبر مكسب
- ملفان متغيران فقط (عربي + لاتيني) ~68KB
- مستضاف محلياً في `public/fonts/` — لا طلبات خارجية
- `preload` من أول بايت عبر `react-dom` في `layout.tsx`
- `font-display: swap`

## 2. تقسيم الحزم
- `QuickViewModal` ديناميكي عبر `next/dynamic` — لا يُحمّل إلا عند الفتح
- تم حذف `CartDrawer` و `FloatingCartBar` و `PricingToggle` بالكامل — تقليل JS
- `Hero` و `CatalogSection` محسنّان للـ LCP

## 3. الصور
- 12 صورة حقيقية JPG في `public/catalog-facebook/` — متوسط 10-15KB
- `next/image` مع `unoptimized: true` (يعمل على Pages و Vercel)
- `sizes` دقيقة لكل سياق، `priority` للشعار

## 4. النشر المزدوج
- `next.config.ts` ذكي: `output: export` فقط على Pages، عادي على Vercel
- `vercel.json` يضيف Cache-Control للخطوط (1 سنة) والصور (يوم)
- لا headers مخصصة في `next.config` لأن Pages لا يدعمها — تم نقلها لـ vercel.json

## 5. قياس
```bash
npm run build
npm run typecheck
npm test
```
أهداف: FCP <1.5s, LCP <2.5s, CLS≈0, JS أولي <200KB بعد حذف السلة


## 6. دفعة تحسين الأصول — 26 أغسطس 2026

تم ضغط `public/og-image.png` مع الحفاظ على أبعاده الأصلية 1200×630 وامتداده وروابطه. انخفض الحجم من 1,221,624 إلى 632,602 بايت، أي وفر قدره 48.21%، بينما بقيت صور الكتالوج الأخرى كما هي لأن إعادة ضغطها لم تحقق وفراً واضحاً. نجحت اختبارات الوحدة (21)، وفحوص TypeScript وESLint، وبناء الإنتاج، واختبارات المتصفح (10) بعد التغيير. لم يتغير تخطيط الواجهة أو محتوى المنتجات أو مسارات الصفحات.
