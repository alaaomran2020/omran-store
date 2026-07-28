"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check, Info, MessageCircle, ShoppingCart } from "lucide-react";
import { PricingToggle } from "@/components/PricingToggle";
import { QuantityStepper } from "@/components/QuantityStepper";
import { useStore } from "@/context/StoreProvider";
import { categoryMap } from "@/lib/categories";
import {
  DOZEN_UNITS,
  formatCartons,
  formatDozens,
  formatNumber,
  formatPrice,
  getMinQuantity,
  getQuantityStep,
  getUnitPrice,
  getWholesaleSavingPercent,
} from "@/lib/format";
import { siteConfig } from "@/lib/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

/** تفاصيل المنتج: معرض صور خفيف + حاسبة كمية ديناميكية + طلب مباشر */
export function ProductDetail({ product }: { product: Product }) {
  const { mode, addItem, lastAddedId } = useStore();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(getMinQuantity(product, "retail"));

  const isWholesale = mode === "wholesale";
  const unitPrice = getUnitPrice(product, mode);
  const minQuantity = getMinQuantity(product, mode);
  const step = getQuantityStep(product, mode);
  const saving = getWholesaleSavingPercent(product);
  const category = categoryMap[product.categoryId];
  const cover = product.images[activeImage] ?? product.images[0];

  // الكمية الفعلية لا تقل أبداً عن الحد الأدنى للوضع الحالي
  const effectiveQty = Math.max(quantity, minQuantity);
  const total = unitPrice * effectiveQty;
  const justAdded = lastAddedId === product.id;

  const orderMessage = [
    `السلام عليكم، أرغب في طلب المنتج التالي من موقع ${siteConfig.name}:`,
    "",
    `المنتج: ${product.name}`,
    `الكود: ${product.sku}`,
    `نوع التسعير: ${isWholesale ? "جملة" : "قطاعي"}`,
    `الكمية: ${formatNumber(effectiveQty)} قطعة${
      isWholesale ? ` (${formatDozens(effectiveQty)} دستة)` : ""
    }`,
    `سعر القطعة: ${formatPrice(unitPrice)}`,
    `الإجمالي التقديري: ${formatPrice(total)}`,
    "",
    "برجاء تأكيد التوفر وقيمة الشحن. شكراً لكم.",
  ].join("\n");

  return (
    <div className="container-page py-6">
      {/* مسار التنقل */}
      <nav aria-label="مسار التنقل" className="mb-4 text-xs text-ink-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-brand-700">
              الرئيسية
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/products" className="hover:text-brand-700">
              الكتالوج
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-semibold text-ink-700">{category?.name}</li>
        </ol>
      </nav>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* معرض الصور */}
        <div>
          <div className="card-surface relative aspect-square overflow-hidden bg-ink-100">
            {cover && (
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            )}
          </div>
          {product.images.length > 1 && (
            <div className="scroll-x mt-3">
              {product.images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`عرض الصورة ${index + 1}`}
                  aria-pressed={activeImage === index}
                  className={`press relative size-16 overflow-hidden rounded-xl border-2 bg-ink-100 sm:size-20 ${
                    activeImage === index
                      ? "border-brand-700"
                      : "border-ink-200"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* البيانات وحاسبة الكمية */}
        <div>
          <p className="text-xs font-bold text-brand-700">{category?.name}</p>
          <h1 className="mt-1 text-xl font-extrabold text-ink-900 sm:text-2xl">
            {product.name}
          </h1>
          <p className="num mt-1 text-xs text-ink-500">
            الكود: {product.sku}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-ink-600">
            {product.shortDescription}
          </p>

          <div className="mt-4">
            <PricingToggle size="sm" />
          </div>

          {/* شريط تنبيه الجملة */}
          {isWholesale && (
            <p className="mt-4 flex gap-2 rounded-xl border border-accent-200 bg-accent-50 p-3 text-xs leading-relaxed font-semibold text-accent-900">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                سعر الجملة يبدأ من دستة كاملة (
                <span className="num">{DOZEN_UNITS}</span> قطعة) من نفس الصنف —
                الحد الأدنى لهذا الصنف{" "}
                <span className="num">{formatNumber(minQuantity)}</span> قطعة.
              </span>
            </p>
          )}

          {/* السعر */}
          <div className="card-surface mt-4 p-4">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="text-xs font-semibold text-ink-500">
                  {isWholesale ? "سعر الجملة للقطعة" : "سعر القطعة"}
                </p>
                <p className="num text-2xl font-extrabold text-brand-800">
                  {formatPrice(unitPrice)}
                </p>
              </div>
              {isWholesale && saving > 0 && (
                <span className="rounded-md bg-accent-500 px-2 py-1 text-xs font-extrabold text-white">
                  وفّر <span className="num">{saving}</span>% عن القطاعي
                </span>
              )}
            </div>

            {/* حاسبة الكمية الديناميكية */}
            <div className="mt-4 border-t border-ink-200 pt-4">
              <label className="mb-2 block text-xs font-bold text-ink-700">
                الكمية{" "}
                <span className="font-semibold text-ink-500">
                  (خطوة{" "}
                  <span className="num">{formatNumber(step)}</span> قطعة)
                </span>
              </label>
              <QuantityStepper
                value={effectiveQty}
                onChange={setQuantity}
                min={minQuantity}
                step={step}
              />

              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-2">
                  <dt className="text-ink-600">عدد القطع</dt>
                  <dd className="num font-bold text-ink-900">
                    {formatNumber(effectiveQty)}
                  </dd>
                </div>
                {isWholesale && (
                  <>
                    <div className="flex justify-between gap-2">
                      <dt className="text-ink-600">ما يعادل بالدستة</dt>
                      <dd className="num font-bold text-ink-900">
                        {formatDozens(effectiveQty)} دستة
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-ink-600">ما يعادل بالكرتونة</dt>
                      <dd className="num font-bold text-ink-900">
                        {formatCartons(
                          effectiveQty,
                          product.packaging.unitsPerCarton,
                        )}
                      </dd>
                    </div>
                  </>
                )}
                <div className="flex justify-between gap-2 border-t border-ink-200 pt-2">
                  <dt className="font-bold text-ink-800">الإجمالي التقديري</dt>
                  <dd className="num text-lg font-extrabold text-brand-800">
                    {formatPrice(total)}
                  </dd>
                </div>
              </dl>
            </div>

            {/* أزرار الإجراء */}
            <div className="mt-4 grid gap-2">
              <a
                href={buildWhatsAppUrl(orderMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="press flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-extrabold text-white hover:bg-emerald-700"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                طلب مباشر عبر الواتساب
              </a>
              <button
                type="button"
                onClick={() => addItem(product, effectiveQty)}
                disabled={!product.inStock}
                className={`press flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:bg-ink-200 disabled:text-ink-500 ${
                  justAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-brand-700 text-white hover:bg-brand-800"
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="size-4" aria-hidden="true" />
                    تمت الإضافة إلى السلة
                  </>
                ) : (
                  <>
                    <ShoppingCart className="size-4" aria-hidden="true" />
                    إضافة إلى السلة
                  </>
                )}
              </button>
            </div>
          </div>

          {/* المواصفات */}
          <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {[
              ["الفئة العمرية", product.ageRange],
              ["الخامة", product.material],
              ["المنشأ", product.origin],
              [
                "قطع الكرتونة",
                `${formatNumber(product.packaging.unitsPerCarton)} قطعة`,
              ],
              ["وزن الكرتونة", `${product.packaging.cartonWeightKg} كجم`],
              ["أبعاد الكرتونة", product.packaging.cartonDimensions],
            ].map(([label, value]) => (
              <div key={label} className="card-surface p-3">
                <dt className="font-semibold text-ink-500">{label}</dt>
                <dd className="mt-0.5 font-bold text-ink-900">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 text-sm leading-relaxed text-ink-600">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
