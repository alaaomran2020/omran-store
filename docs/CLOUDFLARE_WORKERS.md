<div dir="rtl">

# النشر على Cloudflare Workers (OpenNext)

## لماذا OpenNext وليس `next-on-pages`؟

`@cloudflare/next-on-pages` **مهجور رسمياً** ولا يعمل مع Next.js 16، وكان يشترط
`export const runtime = "edge"` على كل مسار فيه كود خادم. المسار الصحيح اليوم هو
محوّل `@opennextjs/cloudflare` الذي يشغّل التطبيق في بيئة **Node.js** داخل `workerd`،
لذا تبقى مسارات `src/app/api/admin/*` على `export const runtime = "nodejs"`.

> لا تُضف `runtime = "edge"` إلى مسارات API: Next.js 16 يرفضه كتوجيه مهجور
> (`The Edge Runtime is deprecated. You can use the "nodejs" runtime instead.`)،
> ومحوّل OpenNext لا يدعم بيئة Edge أصلاً.

## الملفات المضافة

| الملف | الوظيفة |
| --- | --- |
| `wrangler.jsonc` | تعريف الـ Worker: `main: .open-next/worker.js`، `compatibility_flags: ["nodejs_compat", "global_fetch_strictly_public"]`، ومجلد الأصول `.open-next/assets` |
| `open-next.config.ts` | إعداد المحوّل. بلا تخزين مؤقت موزّع لأن الموقع لا يستخدم ISR |
| `.dev.vars` (غير مُتتبَّع) | متغيرات البيئة للتشغيل المحلي داخل `workerd` |

## الأوامر

```bash
npm run build:cf     # يبني Next.js ثم يحوّل المخرجات إلى .open-next/worker.js
npm run preview:cf   # يشغّل الموقع محلياً داخل workerd (نفس بيئة الإنتاج)
npm run deploy:cf    # ينشر إلى Cloudflare Workers عبر Wrangler
```

`npm run build` (بناء Vercel) لم يتغير، فالنشر على Vercel يستمر كما هو.

## النشر لأول مرة

1. أنشئ Worker من لوحة Cloudflare أو بـ `npx wrangler deploy` بعد تسجيل الدخول (`npx wrangler login`).
2. اضبط الأسرار — **لا** تستخدم `.env.local`، فهي لا تصل إلى worker وقت التشغيل:

   ```bash
   npx wrangler secret put ADMIN_SESSION_SECRET
   npx wrangler secret put ADMIN_USERS_JSON
   npx wrangler secret put ADMIN_GITHUB_TOKEN
   ```

   والمتغيرات غير السرية (`ADMIN_GITHUB_REPO`, `ADMIN_GITHUB_BRANCH`,
   `ADMIN_DATA_GITHUB_REPO`, `ADMIN_DATA_GITHUB_BRANCH`) تُضاف كـ vars في
   `wrangler.jsonc` أو من اللوحة.
3. متغيرات `NEXT_PUBLIC_*` تُحقن **وقت البناء**، لذا يجب توافرها في بيئة البناء
   (Workers Builds: Settings → Build configuration → Environment variables).
4. للنشر التلقائي من GitHub: استخدم **Workers Builds**، أمر البناء
   `npm ci && npm run build:cf` — وليس إطار عمل Pages.

## التحقق محلياً

```bash
npm run build:cf && npm run preview:cf
# ثم في طرفية أخرى:
curl -i -X POST http://127.0.0.1:8787/api/admin/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"..."}'
```

## ملاحظات

- `next.config.ts` يضبط `images.unoptimized: true`، فلا حاجة إلى binding الصور
  (`IMAGES`) على Cloudflare.
- لا يوجد ISR في المشروع (كل الصفحات static/SSG)، لذا لم يُضف `r2_buckets`.
  عند إضافة ISR أو `use cache`: فعّل `r2IncrementalCache` في `open-next.config.ts`
  وأضف الـ binding إلى `wrangler.jsonc` ثم أنشئ الدلو.
- الذاكرة في Workers ثابتة 128MB لكل isolate، مقابل حتى 4GB لوظائف Vercel.

</div>
