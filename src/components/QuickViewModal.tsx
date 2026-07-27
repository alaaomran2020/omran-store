"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Boxes,
  Check,
  MessageCircle,
  Package,
  Ruler,
  ShoppingCart,
  Weight,
  X,
} from "lucide-react";
import { useStore } from "@/context/StoreProvider";
import { QuantityStepper } from "@/components/QuantityStepper";
import { categoryMap } from "@/lib/categories";
import {
  formatCartons,
  formatNumber,
  formatPrice,
  getMinQuantity,
  getQuantityStep,
  getUnitPrice,
  getWholesaleSavingPercent,
} from "@/lib/format";
import { buildProductInquiryUrl } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

/**
 * غلاف يتحكم في ظهور النافذة.
 * نمرّر مفتاحاً مركّباً من المنتج ووضع التسعير حتى تُعاد تهيئة الحالة
 * الداخلية تلقائياً بدل ضبطها داخل useEffect.
 */
export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { mode } = useStore();
  if (!product) return null;
  return (
    <QuickViewDialog
      key={`${product.id}-${mode}`}
      product={product}
      onClose={onClose}
    />
  );
}

function QuickViewDialog({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { mode, addItem, openCart } = useStore();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(() => getMinQuantity(product, mode));
  const [added, setAdded] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // إغلاق بمفتاح Escape ومنع تمرير الخلفية
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const category = categoryMap[product.categoryId];
  const unitPrice = getUnitPrice(product, mode);
  const step = getQuantityStep(product, mode);
  const minQuantity = getMinQuantity(product, mode);
  const saving = getWholesaleSavingPercent(product);
  const lineTotal = unitPrice * quantity;
  const gallery = product.images;
  const current = gallery[activeImage] ?? gallery[0];

  const handleAdd = (thenOpenCart: boolean) => {
    addItem(product, quantity);
    setAdded(true);
    if (thenOpenCart) {
      onClose();
      openCart();
    }
  };

  const specs: { icon: typeof Package; label: string; value: string }[] = [
    {
      icon: Boxes,
      label: "عدد القطع بالكرتونة",
      value: `${formatNumber(product.packaging.unitsPerCarton)} قطعة`,
    },
    {
      icon: Package,
      label: "أقل كمية لسعر الجملة",
      value: `${formatNumber(product.packaging.minWholesaleUnits)} قطعة`,
    },
    {
      icon: Weight,
      label: "وزن الكرتونة",
      value: `${formatNumber(product.packaging.cartonWeightKg)} كجم`,
    },
    {
      icon: Ruler,
      label: "أبعاد الكرتونة",
      value: product.packaging.cartonDimensions,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-ink-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quickview-title"
        tabIndex={-1}
        className="animate-rise relative max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl bg-white shadow-xl outline-none thin-scroll sm:rounded-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق العرض السريع"
          className="absolute top-3 end-3 z-10 rounded-full bg-white/90 p-2 text-ink-600 shadow-sm transition-colors hover:bg-ink-100 hover:text-ink-900"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          {/* معرض الصور */}
          <div className="bg-ink-50 p-4 sm:p-6">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-ink-200 bg-white">
              {current && (
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover"
                  priority
                />
              )}
            </div>

            {gallery.length > 1 && (
              <div className="mt-3 flex gap-2">
                {gallery.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`عرض الصورة ${index + 1}`}
                    aria-current={index === activeImage}
                    className={`relative size-16 overflow-hidden rounded-lg border-2 bg-white transition-colors ${
                      index === activeImage
                        ? "border-brand-600"
                        : "border-ink-200 hover:border-ink-300"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* بيانات المنتج الفنية */}
            <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-white p-2.5">
                <dt className="text-ink-500">الفئة العمرية</dt>
                <dd className="font-bold text-ink-800">{product.ageRange}</dd>
              </div>
              <div className="rounded-lg bg-white p-2.5">
                <dt className="text-ink-500">الخامة</dt>
                <dd className="font-bold text-ink-800">{product.material}</dd>
              </div>
              <div className="rounded-lg bg-white p-2.5">
                <dt className="text-ink-500">المنشأ</dt>
                <dd className="font-bold text-ink-800">{product.origin}</dd>
              </div>
              <div className="rounded-lg bg-white p-2.5">
                <dt className="text-ink-500">الألوان</dt>
                <dd className="font-bold text-ink-800">
                  {product.colors.join("، ")}
                </dd>
              </div>
            </dl>
          </div>

          {/* التفاصيل والشراء */}
          <div className="flex flex-col gap-4 p-4 sm:p-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-800">
                  {category?.name}
                </span>
                <span className="num text-[11px] font-medium text-ink-400">
                  {product.sku}
                </span>
                {product.inStock ? (
                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                    متوفر بالمخزن
                  </span>
                ) : (
                  <span className="rounded-md bg-ink-100 px-2 py-0.5 text-[11px] font-semibold text-ink-600">
                    غير متوفر حالياً
                  </span>
                )}
              </div>

              <h2
                id="quickview-title"
                className="text-xl font-extrabold text-ink-900 sm:text-2xl"
              >
                {product.name}
              </h2>
              <p className="text-sm text-ink-600">{product.description}</p>
            </div>

            {/* السعر حسب الوضع */}
            <div className="rounded-xl border border-ink-200 bg-ink-50 p-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-ink-500">
                    {mode === "wholesale"
                      ? "سعر الجملة للقطعة"
                      : "سعر القطاعي للقطعة"}
                  </p>
                  <p className="num text-2xl font-extrabold text-brand-800">
                    {formatPrice(unitPrice)}
                  </p>
                </div>
                <div className="text-end text-xs text-ink-500">
                  {mode === "wholesale" ? (
                    <>
                      <p className="num line-through">
                        {formatPrice(product.retailPrice)}
                      </p>
                      {saving > 0 && (
                        <p className="font-bold text-emerald-700">
                          فرق <span className="num">{saving}%</span> عن القطاعي
                        </p>
                      )}
                    </>
                  ) : (
                    <p>
                      سعر الجملة{" "}
                      <span className="num font-bold text-ink-700">
                        {formatPrice(product.wholesalePrice)}
                      </span>{" "}
                      عند{" "}
                      <span className="num">
                        {formatNumber(product.packaging.minWholesaleUnits)}
                      </span>{" "}
                      قطعة
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* تفاصيل الكرتونة للتجار */}
            <div>
              <h3 className="mb-2 text-sm font-bold text-ink-800">
                بيانات التعبئة والشحن للتجار
              </h3>
              <ul className="grid grid-cols-2 gap-2">
                {specs.map((spec) => (
                  <li
                    key={spec.label}
                    className="flex items-start gap-2 rounded-lg border border-ink-200 p-2.5"
                  >
                    <spec.icon
                      className="mt-0.5 size-4 shrink-0 text-brand-600"
                      aria-hidden="true"
                    />
                    <div className="text-xs">
                      <p className="text-ink-500">{spec.label}</p>
                      <p className="num font-bold text-ink-900">{spec.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* الكمية والإجمالي */}
            <div className="space-y-3 rounded-xl border border-ink-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-ink-500">
                    الكمية المطلوبة (بالقطعة)
                  </p>
                  <p className="text-[11px] text-ink-400">
                    {mode === "wholesale"
                      ? `الزيادة بالكرتونة (${formatNumber(step)} قطعة)`
                      : "الزيادة بالقطعة"}
                  </p>
                </div>
                <QuantityStepper
                  value={quantity}
                  onChange={setQuantity}
                  min={minQuantity}
                  step={step}
                  disabled={!product.inStock}
                />
              </div>

              <div className="flex items-center justify-between border-t border-ink-200 pt-3 text-sm">
                <span className="text-ink-600">
                  ما يعادل{" "}
                  <span className="num font-bold text-ink-800">
                    {formatCartons(quantity, product.packaging.unitsPerCarton)}
                  </span>
                </span>
                <span className="font-bold text-ink-900">
                  الإجمالي:{" "}
                  <span className="num text-brand-800">
                    {formatPrice(lineTotal)}
                  </span>
                </span>
              </div>
            </div>

            {/* الأزرار */}
            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleAdd(false)}
                disabled={!product.inStock}
                className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:bg-ink-200 disabled:text-ink-500 ${
                  added
                    ? "bg-emerald-600 text-white"
                    : "bg-brand-700 text-white hover:bg-brand-800"
                }`}
              >
                {added ? (
                  <>
                    <Check className="size-4" aria-hidden="true" />
                    أُضيفت للسلة
                  </>
                ) : (
                  <>
                    <ShoppingCart className="size-4" aria-hidden="true" />
                    إضافة إلى السلة
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleAdd(true)}
                disabled={!product.inStock}
                className="flex items-center justify-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-bold text-brand-800 transition-colors hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                إضافة وفتح السلة
              </button>
            </div>

            <a
              href={buildProductInquiryUrl(product.name, product.sku, mode)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-100"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              استفسار عن هذا المنتج عبر واتساب
            </a>

            {product.badges.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {product.badges.map((badge) => (
                  <li
                    key={badge}
                    className="rounded-md bg-ink-100 px-2 py-1 text-[11px] font-semibold text-ink-600"
                  >
                    {badge}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
