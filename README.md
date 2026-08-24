<div dir="rtl">

# عمران للألعاب — كتالوج احترافي (WhatsApp فقط)

كتالوج احترافي لألعاب الأطفال والهدايا يعتمد على **عرض المنتجات والاستفسار عبر واتساب فقط** — بدون سلة، بدون دفع، بدون تجربة شراء مباشرة.

تم تحويل المتجر بالكامل من تجربة e-commerce إلى كتالوج مصوّر احترافي يلبي طلب العميل: تصفح المنتجات الحقيقية (12 منتج بصور فعلية من `public/catalog-facebook`) ثم استفسار فوري عبر واتساب.

مبني بـ **Next.js App Router + TypeScript + Tailwind CSS v4** بتخطيط RTL عربي كامل.

---

## ما الجديد في هذه النسخة (Catalog-Only)

### ١. إزالة كاملة لتجربة الشراء
- حذف: `CartDrawer`, `DeferredCartDrawer`, `FloatingCartBar`, `AddedToast`, `PricingToggle`, `LeadCaptureModal`, `QuantityStepper`
- لا يوجد مفتاح قطاعي/جملة في الواجهة، لا سلة، لا دفع
- كل الأزرار الآن: **استفسر عبر واتساب** + **التفاصيل / معاينة سريعة**
- منطق `cart-store.ts` و `legacy-products.ts` محفوظ داخلياً فقط لنجاح الاختبارات (20 اختبار) والتوافق

### ٢. كتالوج احترافي بـ 12 منتج حقيقي
- `src/lib/products.ts` الآن يحتوي 12 منتج باستخدام جميع صور `public/catalog-facebook/facebook-*.jpg`
- كل منتج: اسم عربي احترافي، وصف قصير وتفصيلي، فئة، SKU، مواصفات، صور حقيقية
- السعر: **استفسر عبر واتساب** — لا يوجد سعر معروض رقمياً
- `products` (legacy 16 منتج) محفوظ للاختبارات فقط

### ٣. تجربة كتالوج محسّنة
- **Header**: بحث حي يبحث في المنتجات (اسم/كود/وصف) + الأقسام، مع زر واتساب عائم ثابت
- **Hero**: شرائح تستخدم صور حقيقية من الكتالوج
- **ProductCard**: تصميم جديد احترافي 4:3، بادج "كتالوج" و "مميز"، زر واتساب أخضر + تفاصيل
- **QuickViewModal**: معاينة سريعة مع معرض صور، بيانات منظمة، زر واتساب بارز
- **CatalogSection**: بحث عربي مع تطبيع، تصفية أقسام، ترتيب، عرض المتوفر فقط
- **صفحات المنتجات**: `/products/[slug]` تعرض تفاصيل كتالوج + منتجات ذات صلة + CTA واتساب

### ٤. أقسام الصفحة الرئيسية
- `Hero` → `FeaturedCategories` → `CatalogSection` → `BrandAdvantages` → `AboutSection` → `InstagramFeed` → `FAQPreview` → `Newsletter` → `ContactSection`
- جميع الأقسام تتحدث بلغة كتالوج (بدون سلة)

### ٥. النشر — GitHub Pages + Vercel
- `next.config.ts` ذكي: يكتشف `process.env.VERCEL`
  - على Vercel: بناء عادي (بدون `output: export`) + `trailingSlash: false`
  - على GitHub Pages: تصدير ثابت `out/` + `trailingSlash: true`
- `vercel.json` جديد: headers أمان، cache للخطوط والصور، `cleanUrls`
- `.github/workflows/nextjs.yml` محدث: إزالة `static_site_generator: next` الذي كان يحقن `basePath` ويكسر الدومين الخاص `omrantoys.store`
- `public/CNAME` + `CNAME` في الجذر يحتويان `omrantoys.store` لضمان عمل الدومين الخاص على Pages
- حذف مجلد `github/` المكرر (الصحيح هو `.github/`)

---

## التشغيل المحلي

```bash
npm ci
cp .env.example .env.local   # ضع رقم واتساب
npm run dev                  # http://localhost:3000
```

### الأوامر

| الأمر | الوظيفة |
| --- | --- |
| `npm run dev` | تطوير |
| `npm run build` | بناء إنتاج (يعمل على Vercel و Pages) |
| `npm start` | تشغيل إنتاج |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm test` | 20 اختبار |

### متغيرات البيئة

| المتغير | الوصف |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | رقم واتساب دولي بدون + (افتراضي `201555570269`) |
| `NEXT_PUBLIC_SITE_URL` | `https://omrantoys.store` |

---

## بنية المشروع (بعد التحويل)

```
src/
├── app/
│   ├── layout.tsx           # RTL + خطوط + Header + Footer + BackToTop
│   ├── page.tsx             # Hero + Categories + Catalog + Advantages + About + Instagram + FAQ + Newsletter + Contact + JSON-LD
│   ├── products/
│   │   ├── page.tsx         # صفحة الكتالوج الكامل
│   │   └── [slug]/page.tsx  # تفاصيل منتج (12 منتج)
│   └── ...
├── components/
│   ├── Header.tsx           # بحث منتجات + أقسام + واتساب عائم
│   ├── Hero.tsx             # شرائح بصور حقيقية
│   ├── CatalogSection.tsx   # بحث + تصفية + شبكة
│   ├── ProductCard.tsx      # بطاقة كتالوج احترافية
│   ├── QuickViewModal.tsx   # معاينة سريعة + واتساب
│   ├── ProductActions.tsx   # واتساب + مفضلة + مشاركة
│   ├── ProductGallery.tsx   # معرض صور
│   ├── PremiumSections.tsx  # FeaturedCategories + BrandAdvantages + FAQ + Newsletter
│   ├── AboutSection.tsx     # عن الكتالوج
│   ├── ContactSection.tsx   # تواصل
│   ├── ContactForm.tsx      # نموذج التواصل التفاعلي (Client)
│   ├── FaqAccordion.tsx     # أكورديون الأسئلة (Client)
│   ├── JsonLd.tsx           # عارض البيانات المنظمة (JSON-LD)
│   ├── StructuredDataPages.tsx # بيانات منظمة للصفحات الداخلية
│   ├── InstagramFeed.tsx    # خلاصة إنستغرام
│   ├── Footer.tsx           # تذييل كتالوج
│   └── BackToTop.tsx        # زر أعلى الصفحة
├── context/
│   └── StoreProvider.tsx    # فلتر الأقسام + منطق السلة القديم للاختبارات فقط
├── lib/
│   ├── products.ts          # 12 منتج كتالوج حقيقي + legacy للاختبارات
│   ├── legacy-products.ts   # 16 منتج قديم للاختبارات
│   ├── cart-store.ts        # محفوظ للاختبارات
│   ├── categories.ts        # 4 أقسام
│   ├── whatsapp.ts          # روابط واتساب (استفسار منتج + استفسار عام)
│   ├── seo.ts               # أدوات SEO + البيانات المنظمة (JSON-LD)
│   ├── faqs.ts              # الأسئلة الشائعة (لصفحة FAQ + FAQPage schema)
│   ├── site.ts              # بيانات الشركة
│   └── format.ts
└── public/
    ├── catalog-facebook/    # 12 صورة حقيقية
    ├── og-image.png         # صورة المشاركة الاجتماعية (Open Graph) 1200×630
    ├── CNAME                # omrantoys.store
    └── ...
```

---

## تحسين محركات البحث (SEO)

### البيانات المنظمة (JSON-LD)
- `src/lib/seo.ts` يركّز بناء كل بيانات Schema.org عبر دوال قابلة لإعادة الاستخدام:
  - `organizationJsonLd()` — كيان المنظمة (Organization) يُدرج في كل الصفحات.
  - `websiteJsonLd()` — بيانات الموقع (WebSite) لتحسين نتائج البحث.
  - `localBusinessJsonLd()` — كيان نشاط تجاري محلي (LocalBusiness/Store) يدعم البحث المحلي في طنطا/الغربية.
  - `productJsonLd(product, category)` — بيانات المنتج (Product) لكل منتج لتفعيل النتائج الغنية.
  - `breadcrumbJsonLd(items)` — مسار التنقل (BreadcrumbList) في صفحات المنتجات.
  - `itemListJsonLd(products, name)` — قائمة المنتجات (ItemList) لصفحة الكتالوج.
  - `faqJsonLd(faqs)` — الأسئلة الشائعة (FAQPage) لصفحة الأسئلة.
- `JsonLd.tsx` يعرض JSON-LD بأمان (تهريب `<` لتجنّب كسر HTML).

### صفحات المنتجات
- `generateMetadata` يضيف **عنواناً ووصفاً ورابطاً قانونياً (canonical)** فريداً لكل منتج، مع Open Graph و Twitter Cards باستخدام صور المنتج الحقيقية.
- رفع indexability عبر `robots` في `layout.tsx` (`max-image-preview`, `max-snippet`).

### الموقع العام
- خريطة الموقع `sitemap.ts` تغطي الآن: الرئيسية، كل الصفحات الثابتة، و **جميع صفحات المنتجات الـ 12** (كانت سابقاً الرئيسية فقط).
- `robots.ts` يوجّه إلى `sitemap.xml`.
- أُضيفت وسوم جغرافية (geo) في `layout.tsx` لدعم البحث المحلي.
- صورة المشاركة الاجتماعية تم تحويلها إلى `og-image.png` (1200×630) لأن منصات التواصل لا تعرض SVG.

### إعادة هيكلة لتوافق البيانات الوصفية
- صفحات `about` و `contact` و `faq` و `privacy` و `shipping` و `return` و `terms` تحوّلت إلى **مكوّنات خادم (Server Components)** حتى تستطيع تصدير `metadata`، مع فصل الأجزاء التفاعلية في `ContactForm.tsx` و `FaqAccordion.tsx`.
- صفحة `faq` تستخدم `faqs.ts` كمرجع واحد للأسئلة في العرض و `FAQPage` schema.

---

## النشر الفعلي على omrantoys.store

### المشكلة السابقة
- بناء GitHub Pages كان ينجح لكن الدومين `omrantoys.store` كان يعرض النسخة القديمة
- السبب: DNS يشير إلى Vercel (استجابة الخادم من Vercel)، بينما workflow كان ينشر على Pages فقط
- بالإضافة إلى أن `actions/configure-pages` مع `static_site_generator: next` كان يحقن `basePath` يكسر الدومين الخاص

### الحل المطبق
1. **next.config.ts ذكي**: يعمل على المنصتين بدون تغيير يدوي
2. **vercel.json**: إعداد احترافي لـ Vercel مع headers و cache
3. **إصلاح workflow**: إزالة حقن basePath
4. **CNAME**: موجود في `public/` والجذر
5. **الكتالوج الجديد**: 12 منتج حقيقي جاهز للنشر

### خطوات النشر بعد هذا الـ PR
1. ادمج هذا الفرع في `main` → سيُطلق workflow `Deploy Next.js site to Pages` → ينشر على `https://alaaomran2020.github.io/omran-store/` + الدومين الخاص إذا كان Pages مربوط
2. إذا كان مشروع Vercel مربوط بـ GitHub (متوقع لأن DNS يشير لـ Vercel):
   - دفع `main` سيُطلق بناء Vercel تلقائياً
   - تأكد في لوحة Vercel أن الدومين `omrantoys.store` مربوط بالمشروع
   - في إعدادات الدومين على Vercel، أضف `omrantoys.store` و `www.omrantoys.store` إذا لزم
   - تأكد أن سجلات DNS في مزود الدومين تشير إلى Vercel (A/CNAME كما يظهر في لوحة Vercel)
3. تحقق:
   ```bash
   curl -I https://omrantoys.store
   # يجب أن ترى x-vercel-id إذا كان من Vercel، أو server: GitHub.com إذا من Pages
   ```
4. إذا أردت الاعتماد على Vercel فقط (مستحسن لسرعة التحديث):
   - في إعدادات GitHub Pages، يمكنك إبقاء Pages كنُسخة احتياطية
   - الأهم هو أن Vercel يبني من `main` بدون `output: export` (تم إصلاحه)

### ملاحظة Instagram
المزامنة تعمل عبر workflow `Sync Instagram feed` كل 6 ساعات باستخدام `INSTAGRAM_ACCESS_TOKEN` كـ secret. لا تضع التوكن في `NEXT_PUBLIC_*`.

---

## واتساب

جميع الروابط تستخدم `buildProductInquiryUrl(name, sku)` و `buildInquiryUrl(topic)` من `src/lib/whatsapp.ts` وتفتح `https://wa.me/<رقم>?text=...`

زر واتساب العائم ثابت في `Header.tsx` أسفل اليسار (في RTL يظهر start-6).

</div>
