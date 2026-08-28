import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * إعداد محوّل OpenNext لمنصة Cloudflare Workers.
 *
 * المحوّل يشغّل التطبيق في بيئة Node.js داخل workerd (وليس Edge Runtime)،
 * لذلك تبقى مسارات `src/app/api/admin/*` على `runtime = "nodejs"` كما هي.
 *
 * لا يوجد ISR في هذا المشروع (كل الصفحات static/SSG)، لذا نستخدم الإعداد
 * الافتراضي بلا تخزين مؤقت موزّع. عند إضافة ISR أو `use cache`:
 *   import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
 *   export default defineCloudflareConfig({ incrementalCache: r2IncrementalCache });
 * ثم أضف r2_buckets إلى wrangler.jsonc وأنشئ الدلو.
 */
export default defineCloudflareConfig({});
