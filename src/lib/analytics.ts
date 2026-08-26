import { track } from "@vercel/analytics";

/** أحداث قياس مجهّلة لتجربة الكتالوج؛ لا تتضمن اسماً أو رقماً أو نص محادثة. */
export type CatalogEventName =
  | "catalog_search"
  | "catalog_filter"
  | "product_quick_view"
  | "whatsapp_inquiry"
  | "product_share"
  | "product_favorite";

type CatalogEventData = Record<string, string | number | boolean | null>;

/**
 * يضمن ألا يؤدي تعطل/حجب أداة القياس إلى تعطيل رابط واتساب أو أي تفاعل أساسي.
 * القيم المرسلة محدودة ببيانات تشغيلية عامة مثل SKU والقسم وموضع الزر.
 */
export function trackCatalogEvent(
  name: CatalogEventName,
  data: CatalogEventData = {},
): void {
  try {
    track(name, data);
  } catch {
    // Analytics is non-critical; preserve the primary user action.
  }
}
