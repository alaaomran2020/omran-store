# إعداد لوحة الإدارة

لوحة الإدارة موجودة على `/admin` ولا تظهر في تنقل العميل. لا تُفعّل قبل إضافة متغيرات البيئة التالية في Vercel:

```text
ADMIN_SESSION_SECRET=<سر عشوائي لا يقل عن 32 حرفاً>
ADMIN_USERS_JSON=[{"username":"admin","passwordHash":"<salt>:<pbkdf2-sha256-hash>","role":"admin"}]
ADMIN_GITHUB_TOKEN=<fine-grained token بصلاحية Contents: Read and write للمستودع فقط>
ADMIN_GITHUB_REPO=alaaomran2020/omran-store
ADMIN_GITHUB_BRANCH=main
ADMIN_DATA_GITHUB_REPO=alaaomran2020/omran-store-private-data
ADMIN_DATA_GITHUB_BRANCH=main
```

يجب إنشاء `passwordHash` خارج واجهة الموقع وعدم إرسال كلمة المرور في الرسائل أو حفظها في Git.

> **مهم:** التحقق في `src/lib/admin-auth.ts` يستخدم **PBKDF2-SHA256** بـ 100000 دورة و 32 بايت بصيغة hex (وليس scrypt). أي hash مُنشأ بـ `crypto.scryptSync` سيرفض الدخول برسالة «بيانات الدخول غير صحيحة» حتى مع كلمة السر الصحيحة. لإنشاء hash صحيح:
>
> ```bash
> node -e "const c=require('crypto');const s='SALT_عشوائي';console.log(s+':'+c.pbkdf2Sync('كلمة_السر',s,100000,32,'sha256').toString('hex'))"
> ```

يجب أن يملك `ADMIN_GITHUB_TOKEN` صلاحية Contents: Read and write للمستودعين، أو استخدام token مخصص يملك هذه الصلاحية للمستودع الخاص. بعد ضبط المتغيرات، يُعاد نشر Vercel وتصبح لوحة الدخول وسجل العمليات فعالين. عند غياب متغيرات مخزن العمليات، تبقى إدارة المنتجات ممكنة بعد تهيئة الكتالوج، بينما يعرض قسم Leads والطلبات رسالة أن المخزن غير مهيأ. لا تُحفظ أسماء العملاء أو أرقامهم أو نصوص محادثات واتساب في مستودع الموقع العام.

### مكان المتغيرات حسب منصة النشر

| المنصة | مكان المتغيرات |
| --- | --- |
| Vercel | Project → Settings → Environment Variables |
| Cloudflare Workers (OpenNext) | محلياً في `.dev.vars` (متجاهَل في git)، وفي الإنتاج: `wrangler secret put ADMIN_SESSION_SECRET` وهكذا لكل متغير |

ملف `.env.local` **لا** يصل إلى worker في بيئة Cloudflare وقت التشغيل؛ المتغيرات تُمرَّر عبر `.dev.vars` / أسرار Workers فقط.

زر **حفظ ونشر** يقرأ نسخة الملف الحالية من GitHub ويرسل تحديثاً مشروطاً بالـ SHA الحالي؛ إذا عدّل عضو آخر الملف قبله، يفشل الطلب بدلاً من الكتابة فوق تعديله. كل نشر ينشئ commit باسم المستخدم، ويمكن التراجع منه عبر GitHub.

للنشر التلقائي، يُضاف سر GitHub باسم `VERCEL_DEPLOY_HOOK_URL` يحتوي Deploy Hook لمشروع Vercel. workflow الجدولة يعمل كل ساعة كحارس خفيف، ولا ينفذ شيئاً إلا عند حلول الساعة 12:00 ظهراً أو 12:00 ليلاً في منطقة `Africa/Cairo`.
