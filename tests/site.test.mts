/**
 * اختبارات الإعدادات المركزية والتسعير بالدستة/الكرتونة.
 */
import assert from "node:assert/strict";
import test from "node:test";

import { activeBranches, navLinks, siteConfig } from "@/lib/site";
import type { SiteConfig } from "@/lib/site";
import { products, getProductById } from "@/lib/products";
import {
  DOZEN_UNITS,
  getCartonPrice,
  getDozenPrice,
  getMinQuantity,
  toDozens,
} from "@/lib/format";

test("الإعدادات: كل الحقول التي تستخدمها الواجهة موجودة", () => {
  for (const key of [
    "name",
    "legalName",
    "tagline",
    "wholesaleSlogan",
    "description",
    "url",
    "currency",
    "currencySymbol",
    "phoneDisplay",
    "phoneHref",
    "whatsappNumber",
    "workingHours",
    "footerDescription",
  ] as const) {
    assert.ok(
      String(siteConfig[key]).length > 0,
      `الحقل ${key} غير فارغ`,
    );
  }

  assert.match(siteConfig.url, /^https:\/\//);
  assert.ok(!siteConfig.url.endsWith("/"), "الرابط بدون سلاش نهائي");
  assert.match(siteConfig.whatsappNumber, /^\d{10,15}$/);
  assert.ok(siteConfig.phoneHref.startsWith("tel:"));
});

test("الإعدادات: النوع SiteConfig مطبَّق ويغطي الحقول المشتقة", () => {
  // فحص وقت التصريف: أي حقل ناقص أو باسم خاطئ يكسر البناء
  const typed: SiteConfig = siteConfig;

  assert.equal(typed.legalName, "شركة عمران التجارية");
  assert.equal(typed.tagline, "أكبر تشكيل لعب أطفال");
  assert.equal(typed.url, "https://omrantoys.store");
  assert.equal(typed.currency, "EGP");

  // الحقول المشتقة متسقة مع بيانات التواصل الخام
  assert.equal(typed.phoneDisplay, typed.contact.phone);
  assert.equal(typed.whatsappNumber, typed.contact.whatsapp);
  assert.equal(typed.phoneHref, `tel:+${typed.contact.whatsapp}`);
});

test("التنقل: ثلاثة روابط تغطي معمارية الصفحات الأربع", () => {
  assert.deepEqual(
    navLinks.map((link) => link.href),
    ["/", "/products", "/checkout"],
  );
  for (const link of navLinks) {
    assert.ok(link.label.trim().length > 0, "لكل رابط عنوان");
    assert.ok(link.href.startsWith("/"), "روابط داخلية فقط");
  }
});

test("الفروع: الفرعان النشطان معرّفان بروابط خرائط صحيحة", () => {
  assert.equal(activeBranches.length, 2);
  const names = activeBranches.map((branch) => branch.name);
  assert.ok(names.includes("فرع ميدان السيد البدوي"));
  assert.ok(names.includes("فرع الاستاد"));
  for (const branch of activeBranches) {
    assert.match(branch.mapUrl, /^https:\/\/maps\.google\.com\//);
    assert.ok(branch.address.trim().length > 0);
  }
});

test("الجملة: الحد الأدنى لا يقل عن دستة كاملة", () => {
  assert.equal(DOZEN_UNITS, 12);
  for (const product of products) {
    assert.ok(
      getMinQuantity(product, "wholesale") >= DOZEN_UNITS,
      `${product.sku}: الحد الأدنى دستة على الأقل`,
    );
    assert.equal(getMinQuantity(product, "retail"), 1);
  }
});

test("أسعار الدستة والكرتونة محسوبة من سعر الجملة", () => {
  const product = getProductById("p-1001")!;
  assert.equal(getDozenPrice(product), product.wholesalePrice * DOZEN_UNITS);
  assert.equal(
    getCartonPrice(product),
    product.wholesalePrice * product.packaging.unitsPerCarton,
  );
  assert.equal(toDozens(24), 2);
  assert.equal(toDozens(18), 1.5);
});
