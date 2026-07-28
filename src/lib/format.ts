import { siteConfig } from "@/lib/site";
import type { PricingMode, Product } from "@/lib/types";

/**
 * تنسيق الأرقام والأسعار.
 * نستخدم أرقاماً لاتينية (0-9) لضمان وضوح الأسعار وثبات العرض
 * بين الخادم والمتصفح داخل تخطيط RTL.
 */
const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const decimalFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** صياغة رقم بفواصل الآلاف */
export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/** صياغة سعر مع رمز العملة، مثال: 1,250 ج.م */
export function formatPrice(value: number): string {
  return `${decimalFormatter.format(value)} ${siteConfig.currencySymbol}`;
}

/** السعر المطبق على المنتج حسب وضع التسعير الحالي */
export function getUnitPrice(product: Product, mode: PricingMode): number {
  return mode === "wholesale" ? product.wholesalePrice : product.retailPrice;
}

/** نسبة التوفير عند الشراء بسعر الجملة (رقم صحيح موجب) */
export function getWholesaleSavingPercent(product: Product): number {
  if (product.retailPrice <= 0) return 0;
  const diff = product.retailPrice - product.wholesalePrice;
  if (diff <= 0) return 0;
  return Math.round((diff / product.retailPrice) * 100);
}

/** التسمية العربية لوضع التسعير */
export function pricingModeLabel(mode: PricingMode): string {
  return mode === "wholesale" ? "سعر الجملة" : "سعر القطاعي";
}

/** خطوة الكمية المناسبة: بالكرتونة في وضع الجملة وبالقطعة في القطاعي */
export function getQuantityStep(product: Product, mode: PricingMode): number {
  return mode === "wholesale" ? Math.max(1, product.packaging.unitsPerCarton) : 1;
}

/** الحد الأدنى للطلب حسب وضع التسعير */
export function getMinQuantity(product: Product, mode: PricingMode): number {
  if (mode !== "wholesale") return 1;
  // الحد الأدنى للجملة: دستة كاملة على الأقل، أو الحد المعلن للصنف إن كان أكبر
  return Math.max(
    siteConfig.operations.wholesaleMinUnits,
    product.packaging.minWholesaleUnits,
  );
}

/** صياغة عدد الكراتين المكافئ لعدد القطع */
export function formatCartons(units: number, unitsPerCarton: number): string {
  if (unitsPerCarton <= 0) return "—";
  const cartons = units / unitsPerCarton;
  const rounded = Math.round(cartons * 100) / 100;
  return `${decimalFormatter.format(rounded)} كرتونة`;
}

/** صياغة نص الكمية بصيغة عربية سليمة */
export function formatUnits(units: number): string {
  if (units === 1) return "قطعة واحدة";
  if (units === 2) return "قطعتان";
  if (units >= 3 && units <= 10) return `${formatNumber(units)} قطع`;
  return `${formatNumber(units)} قطعة`;
}

/** عدد قطع الدستة — الحد الأدنى المعتمد للجملة */
export const DOZEN_UNITS = siteConfig.operations.wholesaleMinUnits;

/** سعر الدستة (12 قطعة) بسعر الجملة */
export function getDozenPrice(product: Product): number {
  return product.wholesalePrice * DOZEN_UNITS;
}

/** سعر الكرتونة الكاملة بسعر الجملة */
export function getCartonPrice(product: Product): number {
  return product.wholesalePrice * Math.max(1, product.packaging.unitsPerCarton);
}

/** عدد الدستات المكافئ لعدد القطع (مقرّب لخانتين) */
export function toDozens(units: number): number {
  return Math.round((units / DOZEN_UNITS) * 100) / 100;
}

/** صياغة عدد الدستات بخانتين عشريتين عند الحاجة */
export function formatDozens(units: number): string {
  return decimalFormatter.format(toDozens(units));
}
