# خطة تنفيذ Analytics — Omran Trading Company

## المبدأ التشغيلي

تستخدم المنظومة **GA4/طبقة Data Layer للسلوك** فقط، بينما تبقى بيانات العميل المحتمل المؤهل والطلب والإيراد من مصدر تجاري موثوق خارج GA4. لا تُرسل أسماء العملاء أو أرقام هواتفهم أو نصوص محادثات واتساب.

## نموذج الهوية

| الحقل | الاستخدام | المصدر |
|---|---|---|
| `product_id` | معرف المنتج الداخلي | `Product.id` |
| `sku` | معرف Ecommerce ثابت وفريد | `Product.sku` |
| `product_name` | تحليل وصفي | `Product.name` |
| `category` | تحليل القسم | `Product.categoryId` |
| `price` | يرسل فقط إذا كان أكبر من صفر وصالحاً للعرض | `Product.retailPrice` |
| `availability` | `in_stock` أو `out_of_stock` | `Product.inStock` |
| `whatsapp_location` | موضع CTA | ثابت من المكوّن: `product_page`, `product_card`, `hero`, `header`, `floating_button`, `footer`, `offers` |

## الأحداث المرحلية

| الأولوية | الحدث | trigger | الاستخدام |
|---|---|---|---|
| P0 | `page_view` | تغيير الصفحة/فتح صفحة | جلسات وزيارات سلوكية |
| P0 | `view_item` | ظهور صفحة منتج أو فتح عرض المنتج | اهتمام بالمنتج |
| P0 | `whatsapp_click` | الضغط على أي CTA واتساب | أهم إشارة Lead intent مع المنتج والموضع والمصدر |
| P0 | `lead_created` | إدخال Lead في مصدر الأعمال | يضاف لاحقاً من نظام Leads حقيقي |
| P0 | `lead_qualified` | تغيير حالة Lead إلى qualified | يضاف لاحقاً من فريق المبيعات |
| P0 | `purchase` | طلب مؤكد برقم معاملة فريد | يضاف لاحقاً من مصدر الطلبات، وليس من نقرة واتساب |
| P1 | `select_item` | اختيار بطاقة/عرض سريع | مقارنة مواضع الاختيار |
| P1 | `search` | بحث أو تطبيق فلتر | فهم الطلب الداخلي |

## UTM Governance

تُقرأ المفاتيح `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, و`utm_term` من عنوان الصفحة وتُحفظ في `sessionStorage` على مستوى الجلسة. القيم الافتراضية هي `direct / none / (not set)` عند غياب UTM. يتم تحويل القيم إلى lowercase وإزالة المسافات الطرفية دون تغيير الرابط.

صيغة الحملة المقترحة هي `channel_objective_audience_period_asset`، مثل `instagram_whatsapp_parents_2026q3_reel01`. ويجب استخدام أسماء ثابتة للمصادر (`facebook`, `instagram`, `google`, `organic`, `paid`, `referral`, `direct`) وللوسائط (`social`, `cpc`, `organic`, `referral`, `none`). هذه الصيغة معيار تنظيمي وليست Target أداء.

## مراحل لاحقة لا تُفعل تخميناً

لن يُرسل `lead_created` أو `lead_qualified` أو `purchase` حتى يتوفر مصدر أعمال واضح. عند توفره، يجب أن يحتوي Lead على `lead_id`, `session_id` أو معرف مجهّل، و`product_id`, `sku`, `source`, `medium`, `campaign`, ووقت الإنشاء والحالة. ويجب أن يحتوي purchase على `transaction_id` فريد و`order_id`, `value`, `currency`, `items`, `quantity` لمنع تكرار الإيرادات.
