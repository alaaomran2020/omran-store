/**
 * اختبار الترطيب (hydration): يتأكد من أن ما يرسمه الخادم يطابق أول رسم
 * في المتصفح حتى مع وجود سلة محفوظة مسبقاً في التخزين المحلي،
 * ثم يتحقق من تحديث الواجهة بعد الترطيب وعند تبديل وضع التسعير.
 */
import assert from "node:assert/strict";
import test from "node:test";
import { JSDOM } from "jsdom";
import React from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

// تهيئة بيئة DOM قبل تحميل مكوّنات المتجر
const dom = new JSDOM("<!doctype html><html dir='rtl'><body><div id='root'></div></body></html>", {
  url: "https://example.com",
  pretendToBeVisual: true,
});

/** بعض الخصائص العامة في Node للقراءة فقط، لذا نعرّفها صراحةً */
function defineGlobal(name: string, value: unknown): void {
  Object.defineProperty(globalThis, name, {
    configurable: true,
    writable: true,
    value,
  });
}

defineGlobal("window", dom.window);
defineGlobal("document", dom.window.document);
defineGlobal("navigator", dom.window.navigator);
defineGlobal("HTMLElement", dom.window.HTMLElement);
defineGlobal("Element", dom.window.Element);
defineGlobal("Node", dom.window.Node);
defineGlobal("IS_REACT_ACT_ENVIRONMENT", true);

// سلة محفوظة من زيارة سابقة + وضع الجملة
dom.window.localStorage.setItem(
  "omran.cart.v1",
  JSON.stringify([{ productId: "p-1001", quantity: 24 }]),
);
dom.window.localStorage.setItem("omran.pricing-mode.v1", "wholesale");

const { StoreProvider, useStore } = await import("@/context/StoreProvider");
const { formatPrice } = await import("@/lib/format");
const { getProductById } = await import("@/lib/products");

/** مكوّن اختباري يعرض ملخص الحالة */
function Summary() {
  const { totals, mode, hydrated } = useStore();
  return React.createElement(
    "div",
    null,
    React.createElement("span", { id: "mode" }, mode),
    React.createElement("span", { id: "count" }, String(totals.itemCount)),
    React.createElement("span", { id: "total" }, formatPrice(totals.subtotal)),
    React.createElement("span", { id: "hydrated" }, String(hydrated)),
  );
}

const tree = React.createElement(StoreProvider, null, React.createElement(Summary));

test("رسم الخادم يبدأ بحالة فارغة بوضع القطاعي", () => {
  const html = renderToString(tree);
  assert.match(html, />retail</);
  assert.match(html, /id="count">0</);
  assert.match(html, /id="hydrated">false</);
});

test("الترطيب يتم دون تحذيرات ثم تظهر السلة المحفوظة", async () => {
  const container = dom.window.document.getElementById("root")!;
  container.innerHTML = renderToString(tree);

  const errors: string[] = [];
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    errors.push(args.map(String).join(" "));
  };

  let root: ReturnType<typeof hydrateRoot> | undefined;
  await act(async () => {
    root = hydrateRoot(container, tree);
  });
  console.error = originalError;

  const hydrationWarnings = errors.filter((message) =>
    /hydrat|did not match|mismatch/i.test(message),
  );
  assert.deepEqual(hydrationWarnings, [], "لا توجد تحذيرات ترطيب");

  // بعد الترطيب تظهر البيانات المحفوظة
  assert.equal(container.querySelector("#hydrated")?.textContent, "true");
  assert.equal(container.querySelector("#mode")?.textContent, "wholesale");
  assert.equal(container.querySelector("#count")?.textContent, "1");

  const product = getProductById("p-1001")!;
  assert.equal(
    container.querySelector("#total")?.textContent,
    formatPrice(product.wholesalePrice * 24),
    "الإجمالي محسوب بسعر الجملة",
  );

  // تبديل وضع التسعير يعيد حساب الإجمالي فوراً
  const cartStore = await import("@/lib/cart-store");
  await act(async () => {
    cartStore.setPricingMode("retail");
  });

  assert.equal(container.querySelector("#mode")?.textContent, "retail");
  assert.equal(
    container.querySelector("#total")?.textContent,
    formatPrice(product.retailPrice * 24),
    "الإجمالي يتحول إلى سعر القطاعي",
  );

  root?.unmount();
});
