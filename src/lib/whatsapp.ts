import { formatNumber, formatPrice, pricingModeLabel } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import type { CartTotals, PricingMode, ResolvedCartItem } from "@/lib/types";

export interface OrderMessageInput {
  items: ResolvedCartItem[];
  totals: CartTotals;
  mode: PricingMode;
  /** ملاحظات اختيارية يكتبها العميل */
  notes?: string;
  /** اسم العميل أو المحل (اختياري) */
  customerName?: string;
}

/**
 * يبني نص رسالة الطلب المرسلة عبر واتساب.
 * الرسالة تتضمن: المنتجات، الكميات، وضع التسعير، والإجمالي.
 */
export function buildOrderMessage({
  items,
  totals,
  mode,
  notes,
  customerName,
}: OrderMessageInput): string {
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
        `   ما يعادل: ${formatNumber(item.cartons)} كرتونة (${formatNumber(
          product.packaging.unitsPerCarton,
        )} قطعة / كرتونة)`,
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

  lines.push(
    "برجاء تأكيد توفر الأصناف وقيمة الشحن وموعد التسليم. شكراً لتعاونكم.",
  );

  return lines.join("\n");
}

/** يبني رابط واتساب الكامل مع الرسالة المشفرة */
export function buildWhatsAppUrl(message: string, phone?: string): string {
  const number = (phone ?? siteConfig.whatsappNumber).replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** رابط واتساب لاستفسار عام (بدون سلة) */
export function buildInquiryUrl(topic: string): string {
  const message = `السلام عليكم، أرغب في الاستفسار عن: ${topic}.\nمن موقع ${siteConfig.name}.`;
  return buildWhatsAppUrl(message);
}

/** رابط واتساب لاستفسار عن منتج محدد */
export function buildProductInquiryUrl(
  productName: string,
  sku: string,
  mode: PricingMode,
): string {
  const message = [
    `السلام عليكم، أرغب في الاستفسار عن المنتج التالي:`,
    `المنتج: ${productName}`,
    `الكود: ${sku}`,
    `نوع التسعير المطلوب: ${pricingModeLabel(mode)}`,
    "",
    `من موقع ${siteConfig.name}.`,
  ].join("\n");
  return buildWhatsAppUrl(message);
}
