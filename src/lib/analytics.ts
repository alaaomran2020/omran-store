import { track } from "@vercel/analytics";

/** الأحداث القياسية في رحلة الكتالوج والاهتمام التجاري. */
export type AnalyticsEventName =
  | "page_view"
  | "view_item"
  | "select_item"
  | "search"
  | "whatsapp_click"
  | "lead_created"
  | "lead_qualified"
  | "purchase";

/** أسماء الأحداث القديمة محفوظة للتوافق مع مكونات الموقع الحالية. */
export type CatalogEventName =
  | "catalog_search"
  | "catalog_filter"
  | "product_quick_view"
  | "whatsapp_inquiry"
  | "product_share"
  | "product_favorite";

type Primitive = string | number | boolean | null;
interface EcommercePayload {
  currency: "EGP";
  value?: number;
  items: Array<Record<string, Primitive>>;
}
type EventValue = Primitive | string[] | EcommercePayload | undefined;
type EventData = Record<string, EventValue>;

export interface AnalyticsProduct {
  id: string;
  slug?: string;
  name: string;
  sku: string;
  categoryId: string;
  retailPrice?: number;
  inStock?: boolean;
}

export interface AttributionContext {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
}

interface DataLayerEvent extends EventData {
  event: AnalyticsEventName;
  page_location?: string;
  page_title?: string;
  ecommerce?: EcommercePayload;
}

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

const attributionStorageKey = "omran.analytics.attribution";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function currentPage(): Pick<DataLayerEvent, "page_location" | "page_title"> {
  if (!isBrowser()) return {};
  return {
    page_location: window.location.href,
    page_title: document.title || undefined,
  };
}

function readStoredAttribution(): AttributionContext {
  const fallback: AttributionContext = {
    source: "direct",
    medium: "none",
    campaign: "(not set)",
    content: "(not set)",
    term: "(not set)",
  };
  if (!isBrowser()) return fallback;
  try {
    const stored = window.sessionStorage.getItem(attributionStorageKey);
    return stored ? { ...fallback, ...JSON.parse(stored) } : fallback;
  } catch {
    return fallback;
  }
}

/** يحفظ UTM أول مرة في الجلسة، مع تطبيع المصدر والوسيط دون تغيير روابط المستخدم. */
export function captureAttribution(): AttributionContext {
  const existing = readStoredAttribution();
  if (!isBrowser()) return existing;
  try {
    const params = new URLSearchParams(window.location.search);
    const hasUtm = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].some((key) => params.has(key));
    if (!hasUtm && window.sessionStorage.getItem(attributionStorageKey)) return existing;
    const next: AttributionContext = {
      source: (params.get("utm_source") || existing.source).trim().toLowerCase(),
      medium: (params.get("utm_medium") || existing.medium).trim().toLowerCase(),
      campaign: (params.get("utm_campaign") || existing.campaign).trim().toLowerCase(),
      content: (params.get("utm_content") || existing.content).trim().toLowerCase(),
      term: (params.get("utm_term") || existing.term).trim().toLowerCase(),
    };
    window.sessionStorage.setItem(attributionStorageKey, JSON.stringify(next));
    return next;
  } catch {
    return existing;
  }
}

function productItem(product: AnalyticsProduct): Record<string, Primitive> {
  return {
    item_id: product.sku,
    product_id: product.id,
    item_name: product.name,
    item_category: product.categoryId,
    price: typeof product.retailPrice === "number" && product.retailPrice > 0 ? product.retailPrice : null,
    in_stock: product.inStock ?? null,
  };
}

function pushToDataLayer(payload: DataLayerEvent): void {
  if (!isBrowser()) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/** إرسال غير حرج؛ تعطل القياس لا يعطل رابط واتساب أو واجهة الكتالوج. */
export function trackAnalyticsEvent(name: AnalyticsEventName, data: EventData = {}): void {
  try {
    const payload: DataLayerEvent = {
      event: name,
      ...currentPage(),
      ...captureAttribution(),
      ...data,
    };
    pushToDataLayer(payload);
    void track(name, data as Record<string, string | number | boolean | null>);
  } catch {
    // Analytics is optional. Never block the primary user action.
  }
}

export function trackProductEvent(
  name: "view_item" | "select_item",
  product: AnalyticsProduct,
  data: EventData = {},
): void {
  const value = typeof product.retailPrice === "number" && product.retailPrice > 0 ? product.retailPrice : undefined;
  trackAnalyticsEvent(name, {
    ...data,
    product_id: product.id,
    sku: product.sku,
    category: product.categoryId,
    ecommerce: { currency: "EGP", ...(value ? { value } : {}), items: [productItem(product)] },
  });
}

export function trackWhatsAppClick(
  product: AnalyticsProduct | null,
  whatsappLocation: string,
  data: EventData = {},
): void {
  const attribution = captureAttribution();
  const productData = product
    ? {
        product_id: product.id,
        sku: product.sku,
        product_name: product.name,
        category: product.categoryId,
        availability: product.inStock === false ? "out_of_stock" : "in_stock",
        ...(typeof product.retailPrice === "number" && product.retailPrice > 0 ? { price: product.retailPrice } : {}),
      }
    : {};
  trackAnalyticsEvent("whatsapp_click", {
    ...productData,
    ...data,
    whatsapp_location: whatsappLocation,
    attribution_source: attribution.source,
    attribution_medium: attribution.medium,
    attribution_campaign: attribution.campaign,
  });
}

/** يحوّل الأحداث القديمة إلى أسماء موحدة دون حذف الاستدعاءات القائمة. */
export function trackCatalogEvent(name: CatalogEventName, data: EventData = {}): void {
  const mapping: Record<CatalogEventName, AnalyticsEventName> = {
    catalog_search: "search",
    catalog_filter: "search",
    product_quick_view: "select_item",
    whatsapp_inquiry: "whatsapp_click",
    product_share: "select_item",
    product_favorite: "select_item",
  };
  trackAnalyticsEvent(mapping[name], { ...data, legacy_event_name: name });
}

export function trackPageView(): void {
  trackAnalyticsEvent("page_view");
}
