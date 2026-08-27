import assert from "node:assert/strict";
import test, { afterEach } from "node:test";
import { JSDOM } from "jsdom";
import {
  captureAttribution,
  trackProductEvent,
  trackWhatsAppClick,
} from "../src/lib/analytics";

const originalWindow = globalThis.window;
const originalDocument = globalThis.document;

afterEach(() => {
  if (originalWindow) globalThis.window = originalWindow;
  else Reflect.deleteProperty(globalThis, "window");
  if (originalDocument) globalThis.document = originalDocument;
  else Reflect.deleteProperty(globalThis, "document");
});

function installDom(url = "https://omrantoys.store/products/demo?utm_source=Instagram&utm_medium=Social&utm_campaign=Summer_2026") {
  const dom = new JSDOM("<!doctype html><title>Omran Toys</title>", { url });
  globalThis.window = dom.window as unknown as Window & typeof globalThis;
  globalThis.document = dom.window.document;
  return dom;
}

test("يحفظ UTM مطبّعة على مستوى الجلسة", () => {
  installDom();
  assert.deepEqual(captureAttribution(), {
    source: "instagram",
    medium: "social",
    campaign: "summer_2026",
    content: "(not set)",
    term: "(not set)",
  });
  assert.equal(window.sessionStorage.getItem("omran.analytics.attribution") !== null, true);
});

test("يدفع view_item مع هوية المنتج وبدون قيمة سعرية وهمية", () => {
  installDom("https://omrantoys.store/products/demo");
  trackProductEvent("view_item", {
    id: "p-demo",
    name: "منتج تجريبي",
    sku: "OMR-001",
    categoryId: "educational",
    retailPrice: 0,
    inStock: true,
  });
  const event = window.dataLayer?.at(-1);
  assert.equal(event?.event, "view_item");
  assert.equal(event?.ecommerce?.currency, "EGP");
  assert.equal(event?.ecommerce?.items[0]?.item_id, "OMR-001");
  assert.equal(event?.ecommerce?.items[0]?.price, null);
});

test("يسجل نقرة واتساب بموقع CTA وبيانات المنتج دون PII", () => {
  installDom();
  trackWhatsAppClick(
    {
      id: "p-demo",
      name: "منتج تجريبي",
      sku: "OMR-001",
      categoryId: "educational",
      retailPrice: 125,
      inStock: true,
    },
    "product_card",
  );
  const event = window.dataLayer?.at(-1);
  assert.equal(event?.event, "whatsapp_click");
  assert.equal(event?.product_id, "p-demo");
  assert.equal(event?.sku, "OMR-001");
  assert.equal(event?.whatsapp_location, "product_card");
  assert.equal("phone" in (event ?? {}), false);
  assert.equal("message" in (event ?? {}), false);
});
