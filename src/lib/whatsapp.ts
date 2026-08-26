import { formatNumber, formatPrice, pricingModeLabel } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import type { CartTotals, PricingMode, ResolvedCartItem } from "@/lib/types";

export interface OrderMessageInput {
  items: ResolvedCartItem[];
  totals: CartTotals;
  mode: PricingMode;
  notes?: string;
  customerName?: string;
}

/**
 * يبني نص رسالة الطلب المرسلة عبر واتساب — محفوظ للتوافق مع الاختبارات القديمة
 * في نسخة الكتالوج الجديدة لا تُستخدم السلة في الواجهة
 */
export function buildOrderMessage({ items, totals, mode, notes, customerName }: OrderMessageInput): string {
  const lines: string[] = [];

  lines.push(`طلب جديد من موقع ${siteConfig.name}`);
  lines.push("——————————————");
  lines.push(`نوع التسعير: ${pricingModeLabel(mode)}`);
  if (customerName?.trim()) {
    lines.push(`اسم العميل / المحل: ${customerName.trim()}`);
  }
  lines.push("");
  lines.push("تفاصيل الطلب:");

  items.forEach((item, index) => {
    const { product, quantity, unitPrice, lineTotal } = item;
    lines.push(`${index + 1}) ${product.name}`);
    lines.push(`   الكود: ${product.sku}`);
    lines.push(`   الكمية: ${formatNumber(quantity)} قطعة`);
    if (mode === "wholesale") {
      lines.push(
        `   ما يعادل: ${formatNumber(item.cartons)} كرتونة (${formatNumber(product.packaging.unitsPerCarton)} قطعة / كرتونة)`
      );
    }
    lines.push(`   سعر القطعة: ${formatPrice(unitPrice)}`);
    lines.push(`   الإجمالي: ${formatPrice(lineTotal)}`);
    lines.push("");
  });

  lines.push("——————————————");
  lines.push(`عدد الأصناف: ${formatNumber(totals.itemCount)}`);
  lines.push(`إجمالي القطع: ${formatNumber(totals.unitCount)}`);
  lines.push(`الإجمالي التقديري: ${formatPrice(totals.subtotal)}`);
  lines.push("");

  if (notes?.trim()) {
    lines.push(`ملاحظات: ${notes.trim()}`);
    lines.push("");
  }

  lines.push("برجاء تأكيد توفر الأصناف وقيمة الشحن وموعد التسليم المتوقع. بانتظار ردكم لاستكمال الطلب — شكراً لكم.");

  return lines.join("\n");
}

/** يبني رابط واتساب الكامل مع الرسالة المشفرة */
export function buildWhatsAppUrl(message: string, phone?: string): string {
  const number = (phone ?? siteConfig.whatsappNumber).replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** رابط واتساب لاستفسار عام (بدون سلة) — كتالوج احترافي */
export function buildInquiryUrl(topic: string): string {
  const message = `السلام عليكم، أرغب في الاستفسار عن: ${topic}.\nمن كتالوج ${siteConfig.name} - ${siteConfig.url}`;
  return buildWhatsAppUrl(message);
}

/** رابط واتساب لاستفسار عن منتج محدد — نسخة كتالوج احترافي */
export function buildProductInquiryUrl(
  productName: string,
  sku: string,
  _mode?: PricingMode,
  productSlug?: string,
): string {
  const message = [
    `السلام عليكم، أرغب في الاستفسار عن المنتج التالي من كتالوج ${siteConfig.name}:`,
    `المنتج: ${productName}`,
    `الكود: ${sku}`,
    `الرابط: ${siteConfig.url}/products${productSlug ? `/${productSlug}` : ""}`,
    "",
    `برجاء إفادتي بالسعر والتوفر وخيارات التوصيل. شكراً لكم.`,
  ].join("\n");
  return buildWhatsAppUrl(message);
}

/** نسخة مختصرة للاستفسار السريع بدون mode — للتوافق مع الكتالوج الجديد */
export function buildSimpleProductInquiryUrl(productName: string, sku: string): string {
  return buildProductInquiryUrl(productName, sku);
}
