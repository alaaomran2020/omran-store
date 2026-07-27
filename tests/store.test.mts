/**
 * اختبارات منطق المتجر: التسعير المزدوج، السلة، ورسالة واتساب.
 * التشغيل: npm test
 */
import assert from "node:assert/strict";
import test from "node:test";

import { products, getProductById } from "@/lib/products";
import { categories } from "@/lib/categories";
import {
  formatPrice,
  getMinQuantity,
  getQuantityStep,
  getUnitPrice,
  getWholesaleSavingPercent,
} from "@/lib/format";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/site";
import type { CartTotals, ResolvedCartItem } from "@/lib/types";

test("الكتالوج: بيانات المنتجات متسقة", () => {
  assert.ok(products.length >= 16, "عدد كافٍ من الأصناف");

  const ids = new Set<string>();
  const skus = new Set<string>();
  const categoryIds = new Set(categories.map((c) => c.id));

  for (const product of products) {
    assert.ok(!ids.has(product.id), `معرف مكرر: ${product.id}`);
    ids.add(product.id);

    assert.ok(!skus.has(product.sku), `كود مكرر: ${product.sku}`);
    skus.add(product.sku);

    assert.ok(categoryIds.has(product.categoryId), "القسم معروف");
    assert.ok(product.retailPrice > 0, "سعر القطاعي موجب");
    assert.ok(product.wholesalePrice > 0, "سعر الجملة موجب");
    assert.ok(
      product.wholesalePrice < product.retailPrice,
      `سعر الجملة أقل من القطاعي: ${product.sku}`,
    );
    assert.ok(product.images.length >= 2, "صورتان على الأقل لمعرض العرض السريع");
    for (const image of product.images) {
      assert.match(image.src, /^\/products\/.+\.svg$/);
      assert.ok(image.alt.trim().length > 0, "نص بديل موجود");
    }
    assert.ok(product.packaging.unitsPerCarton > 0);
    assert.ok(product.packaging.minWholesaleUnits > 0);
  }
});

test("كل قسم يحتوي على منتجات", () => {
  for (const category of categories) {
    const count = products.filter((p) => p.categoryId === category.id).length;
    assert.ok(count > 0, `القسم ${category.name} به منتجات`);
  }
});

test("التسعير المزدوج: السعر يتغير حسب الوضع", () => {
  const product = products[0]!;
  assert.equal(getUnitPrice(product, "retail"), product.retailPrice);
  assert.equal(getUnitPrice(product, "wholesale"), product.wholesalePrice);
  assert.ok(getWholesaleSavingPercent(product) > 0);
});

test("خطوة الكمية والحد الأدنى يتبعان وضع التسعير", () => {
  const product = getProductById("p-1001")!;
  assert.equal(getQuantityStep(product, "retail"), 1);
  assert.equal(getMinQuantity(product, "retail"), 1);
  assert.equal(
    getQuantityStep(product, "wholesale"),
    product.packaging.unitsPerCarton,
  );
  assert.equal(
    getMinQuantity(product, "wholesale"),
    product.packaging.minWholesaleUnits,
  );
});

test("تنسيق السعر يستخدم رمز العملة", () => {
  assert.equal(formatPrice(1250), `1,250 ${siteConfig.currencySymbol}`);
  assert.equal(formatPrice(48), `48 ${siteConfig.currencySymbol}`);
});

function buildCart(mode: "retail" | "wholesale"): {
  items: ResolvedCartItem[];
  totals: CartTotals;
} {
  const picks = [getProductById("p-1001")!, getProductById("p-4001")!];
  const items: ResolvedCartItem[] = picks.map((product) => {
    const quantity = getMinQuantity(product, mode);
    const unitPrice = getUnitPrice(product, mode);
    return {
      product,
      quantity,
      unitPrice,
      lineTotal: unitPrice * quantity,
      cartons:
        Math.round((quantity / product.packaging.unitsPerCarton) * 100) / 100,
    };
  });
  const totals = items.reduce<CartTotals>(
    (acc, item) => ({
      itemCount: acc.itemCount + 1,
      unitCount: acc.unitCount + item.quantity,
      subtotal: acc.subtotal + item.lineTotal,
    }),
    { itemCount: 0, unitCount: 0, subtotal: 0 },
  );
  return { items, totals };
}

test("رسالة واتساب: تحتوي على المنتجات والكميات ووضع التسعير والإجمالي", () => {
  const { items, totals } = buildCart("wholesale");
  const message = buildOrderMessage({
    items,
    totals,
    mode: "wholesale",
    customerName: "محل النور",
    notes: "التسليم قبل نهاية الأسبوع",
  });

  assert.match(message, /سعر الجملة/);
  assert.match(message, /محل النور/);
  assert.match(message, /التسليم قبل نهاية الأسبوع/);
  assert.match(message, /الإجمالي التقديري/);
  for (const item of items) {
    assert.ok(message.includes(item.product.name), "اسم المنتج موجود");
    assert.ok(message.includes(item.product.sku), "كود المنتج موجود");
  }
  assert.ok(message.includes(String(totals.unitCount)), "إجمالي القطع موجود");
  assert.match(message, /كرتونة/, "تفاصيل الكراتين تظهر في وضع الجملة");
});

test("رسالة القطاعي لا تعرض تفاصيل الكراتين", () => {
  const { items, totals } = buildCart("retail");
  const message = buildOrderMessage({ items, totals, mode: "retail" });
  assert.match(message, /سعر القطاعي/);
  assert.ok(!message.includes("ما يعادل"), "لا تظهر معادلة الكراتين");
});

test("رابط واتساب: صيغة wa.me مع رسالة مشفرة", () => {
  const { items, totals } = buildCart("retail");
  const message = buildOrderMessage({ items, totals, mode: "retail" });
  const url = buildWhatsAppUrl(message);

  assert.ok(url.startsWith(`https://wa.me/${siteConfig.whatsappNumber}?text=`));
  assert.ok(/^\d{10,15}$/.test(siteConfig.whatsappNumber), "رقم دولي صحيح");
  const decoded = decodeURIComponent(url.split("?text=")[1]!);
  assert.equal(decoded, message, "الرسالة تُفك بنفس المحتوى");
});

test("الإجمالي يختلف بين القطاعي والجملة", () => {
  const retail = buildCart("retail").totals.subtotal;
  const wholesale = buildCart("wholesale").totals;
  assert.ok(wholesale.unitCount > 0);
  assert.notEqual(retail, wholesale.subtotal);
});
