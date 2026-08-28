# إعداد لوحة الإدارة

لوحة الإدارة موجودة على `/admin` ولا تظهر في تنقل العميل. لا تُفعّل قبل إضافة متغيرات البيئة التالية في Vercel:

```text
ADMIN_SESSION_SECRET=<سر عشوائي لا يقل عن 32 حرفاً>
ADMIN_USERS_JSON=[{"username":"admin","passwordHash":"<salt>:<scrypt-hash>","role":"admin"}]
ADMIN_GITHUB_TOKEN=<fine-grained token بصلاحية Contents: Read and write للمستودع فقط>
ADMIN_GITHUB_REPO=alaaomran2020/omran-store
ADMIN_GITHUB_BRANCH=main
```

يجب إنشاء `passwordHash` خارج واجهة الموقع وعدم إرسال كلمة المرور في الرسائل أو حفظها في Git. يمكن استخدام Node محلياً مع `crypto.scryptSync` لإنشاء صيغة `salt:hash`. بعد ضبط المتغيرات، يُعاد نشر Vercel وتصبح لوحة الدخول فعالة. عند غياب المتغيرات، ترفض الواجهة الدخول افتراضياً.

زر **حفظ ونشر** يقرأ نسخة الملف الحالية من GitHub ويرسل تحديثاً مشروطاً بالـ SHA الحالي؛ إذا عدّل عضو آخر الملف قبله، يفشل الطلب بدلاً من الكتابة فوق تعديله. كل نشر ينشئ commit باسم المستخدم، ويمكن التراجع منه عبر GitHub.

للنشر التلقائي، يُضاف سر GitHub باسم `VERCEL_DEPLOY_HOOK_URL` يحتوي Deploy Hook لمشروع Vercel. workflow الجدولة يعمل كل ساعة كحارس خفيف، ولا ينفذ شيئاً إلا عند حلول الساعة 12:00 ظهراً أو 12:00 ليلاً في منطقة `Africa/Cairo`.
