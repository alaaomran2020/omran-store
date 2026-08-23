<div dir="rtl">

# إصلاح النشر على omrantoys.store

## التشخيص السابق
- بناء GitHub Pages ينجح لكن الدومين العام يعرض النسخة القديمة
- فحص DNS يظهر أن omrantoys.store يشير إلى Vercel (x-vercel-id)
- workflow كان يستخدم `actions/configure-pages@v5` مع `static_site_generator: next` الذي يحقن `basePath` تلقائياً ويكسر المسارات عند استخدام دومين خاص

## الحلول المطبقة في هذا PR

### 1. next.config.ts ذكي
```ts
const isVercel = Boolean(process.env.VERCEL);
const nextConfig = {
  ...(isVercel ? {} : { output: "export" }),
  trailingSlash: isVercel ? false : true,
  images: { unoptimized: true }
}
```
- على Vercel: بناء عادي بدون export
- على Pages: تصدير ثابت out/

### 2. vercel.json جديد
- headers أمان
- cache للخطوط (1 سنة) والصور (يوم)
- cleanUrls و trailingSlash false

### 3. إصلاح workflow (يحتاج تحديث يدوي بسبب صلاحيات GitHub App)
الملف الحالي `.github/workflows/nextjs.yml` يحتوي:
```yaml
- name: Setup Pages
  uses: actions/configure-pages@v5
  with:
    static_site_generator: next
```
يجب إزالة `with: static_site_generator: next` لأنه يحقن basePath.

النسخة الصحيحة:
```yaml
- name: Setup Pages
  uses: actions/configure-pages@v5
```

تم إعداد الملف الصحيح في `/tmp/new_workflow.yml` داخل الفرع، لكن دفعه يتطلب صلاحية `workflows` للـ GitHub App. الحل:
- افتح الملف في GitHub UI وعدّله يدوياً
- أو أعد ربط GitHub في Arena مع تفعيل صلاحية Workflows ثم ادفع مرة أخرى

### 4. CNAME
- `public/CNAME` و `CNAME` في الجذر يحتويان `omrantoys.store`
- يضمنان عمل الدومين الخاص على GitHub Pages

## خطوات النشر النهائي

### إذا كان Vercel مربوط (المتوقع لأن DNS يشير له):
1. ادمج PR #7 في main
2. Vercel سيبني تلقائياً (يكتشف Next.js)
3. تأكد في لوحة Vercel → Domains أن `omrantoys.store` و `www.omrantoys.store` مربوطان
4. تحقق من DNS: يجب أن يكون CNAME إلى `cname.vercel-dns.com` أو A records إلى Vercel
5. افتح https://omrantoys.store — يجب أن ترى الكتالوج الجديد (12 منتج)

### إذا كنت تريد الاعتماد على GitHub Pages فقط:
1. في GitHub → Settings → Pages → Custom domain: `omrantoys.store`
2. فعّل Enforce HTTPS بعد تفعيل الدومين
3. في مزود الدومين، أضف:
   - 4 A records إلى GitHub Pages IPs: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - أو CNAME www → alaaomran2020.github.io
4. انتظر انتشار DNS ثم تحقق

### التحقق السريع
```bash
curl -I https://omrantoys.store
# Vercel: x-vercel-id موجود
# GitHub Pages: server: GitHub.com

curl -s https://omrantoys.store | grep -o "كتالوج عمران"
```

## ملاحظة Instagram
المزامنة تعمل عبر `Sync Instagram feed` workflow كل 6 ساعات. لا تضع التوكن في NEXT_PUBLIC_*.

</div>
