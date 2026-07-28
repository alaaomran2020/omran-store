"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MessageCircle,
  ShoppingBag,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";
import { useStore } from "@/context/StoreProvider";
import { PricingToggle } from "@/components/PricingToggle";
import { QuantityStepper } from "@/components/QuantityStepper";
import {
  formatCartons,
  formatNumber,
  formatPrice,
  pricingModeLabel,
} from "@/lib/format";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/site";

/** درج السلة الجانبي: تعديل الكميات وتأكيد الطلب عبر واتساب */
export function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    resolvedItems,
    totals,
    mode,
    setQuantity,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
  } = useStore();

  const [customerName, setCustomerName] = useState("");
  const [notes, setNotes] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCartOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [isCartOpen, closeCart]);

  const whatsappUrl = useMemo(() => {
    if (resolvedItems.length === 0) return "";
    const message = buildOrderMessage({
      items: resolvedItems,
      totals,
      mode,
      notes,
      customerName,
    });
    return buildWhatsAppUrl(message);
  }, [resolvedItems, totals, mode, notes, customerName]);

  /** أصناف لم تبلغ الحد الأدنى لسعر الجملة */
  const belowMinimum = useMemo(
    () =>
      mode === "wholesale"
        ? resolvedItems.filter(
            (item) => item.quantity < item.product.packaging.minWholesaleUnits,
          )
        : [],
    [resolvedItems, mode],
  );

  if (!isCartOpen) return null;

  const isEmpty = resolvedItems.length === 0;

  return (
    <div className="fixed inset-0 z-50" role="presentation">
      {/* الخلفية المعتمة */}
      <div
        className="animate-fade-in absolute inset-0 bg-ink-950/50 backdrop-blur-[2px]"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* اللوحة الجانبية — تفتح من جهة البداية (اليمين في RTL) */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        tabIndex={-1}
        className="animate-slide-in-start absolute inset-y-0 start-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl outline-none"
      >
        {/* الرأس */}
        <div className="flex items-center justify-between gap-3 border-b border-ink-200 px-4 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-5 text-brand-700" aria-hidden="true" />
            <h2 id="cart-title" className="text-base font-extrabold text-ink-900">
              سلة الطلب
            </h2>
            {!isEmpty && (
              <span className="num rounded-full bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-800">
                {formatNumber(totals.itemCount)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="إغلاق سلة الطلب"
            className="rounded-lg p-2 text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* شريط وضع التسعير */}
        <div className="flex items-center justify-between gap-2 border-b border-ink-200 bg-ink-50 px-4 py-3">
          <span className="text-xs font-semibold text-ink-600">
            التسعير المطبق: {pricingModeLabel(mode)}
          </span>
          <PricingToggle size="sm" />
        </div>

        {/* المحتوى */}
        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="rounded-full bg-ink-100 p-5">
              <ShoppingBag className="size-8 text-ink-400" aria-hidden="true" />
            </div>
            <p className="text-base font-bold text-ink-800">سلتك لا تزال فارغة</p>
            <p className="max-w-xs text-sm text-ink-500">
              أضف الأصناف والكميات من الكتالوج بضغطة واحدة، ثم أرسل طلبك رسالة
              جاهزة عبر واتساب — وسيصلك تأكيد التوفر وقيمة الشحن خلال مواعيد
              العمل.
            </p>
            <button
              type="button"
              onClick={() => {
                closeCart();
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-800"
            >
              تصفح المنتجات
            </button>
          </div>
        ) : (
          <>
            <ul className="thin-scroll flex-1 divide-y divide-ink-200 overflow-y-auto px-4">
              {resolvedItems.map((item) => {
                const { product, quantity, unitPrice, lineTotal } = item;
                const cover = product.images[0];
                const step =
                  mode === "wholesale" ? product.packaging.unitsPerCarton : 1;
                const underMinimum =
                  mode === "wholesale" &&
                  quantity < product.packaging.minWholesaleUnits;

                return (
                  <li key={product.id} className="flex gap-3 py-4">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-ink-200 bg-ink-50">
                      {cover && (
                        <Image
                          src={cover.src}
                          alt={cover.alt}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-ink-900">
                            {product.name}
                          </p>
                          <p className="num text-[11px] text-ink-400">
                            {product.sku}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          aria-label={`حذف ${product.name} من السلة`}
                          className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <QuantityStepper
                          size="sm"
                          value={quantity}
                          min={1}
                          step={step}
                          label={`كمية ${product.name}`}
                          onChange={(next) => setQuantity(product.id, next)}
                        />
                        <div className="text-end">
                          <p className="num text-sm font-extrabold text-brand-800">
                            {formatPrice(lineTotal)}
                          </p>
                          <p className="num text-[11px] text-ink-500">
                            {formatPrice(unitPrice)} / قطعة
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 text-[11px] text-ink-500">
                        <span className="num">
                          {formatCartons(
                            quantity,
                            product.packaging.unitsPerCarton,
                          )}
                        </span>
                        <span className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => decrementItem(product.id)}
                            className="rounded px-1.5 py-0.5 font-semibold text-ink-500 hover:bg-ink-100"
                          >
                            − كرتونة
                          </button>
                          <button
                            type="button"
                            onClick={() => incrementItem(product.id)}
                            className="rounded px-1.5 py-0.5 font-semibold text-ink-500 hover:bg-ink-100"
                          >
                            + كرتونة
                          </button>
                        </span>
                      </div>

                      {underMinimum && (
                        <p className="flex items-start gap-1.5 rounded-md bg-amber-50 px-2 py-1.5 text-[11px] font-semibold text-amber-800">
                          <TriangleAlert
                            className="mt-px size-3.5 shrink-0"
                            aria-hidden="true"
                          />
                          أقل كمية لسعر الجملة{" "}
                          <span className="num">
                            {formatNumber(product.packaging.minWholesaleUnits)}
                          </span>{" "}
                          قطعة
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* بيانات إضافية وملخص */}
            <div className="space-y-3 border-t border-ink-200 bg-ink-50 px-4 py-4">
              <div className="grid gap-2">
                <label
                  htmlFor="cart-name"
                  className="text-xs font-semibold text-ink-600"
                >
                  اسم العميل أو المحل (اختياري)
                </label>
                <input
                  id="cart-name"
                  type="text"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="مثال: محل النور للألعاب — طنطا"
                  className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-ink-400 focus:border-brand-500"
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="cart-notes"
                  className="text-xs font-semibold text-ink-600"
                >
                  ملاحظات الطلب (اختياري)
                </label>
                <textarea
                  id="cart-notes"
                  rows={2}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="تفضيلات الألوان، موعد التسليم، عنوان الشحن…"
                  className="thin-scroll resize-none rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-ink-400 focus:border-brand-500"
                />
              </div>

              <dl className="space-y-1.5 border-t border-ink-200 pt-3 text-sm">
                <div className="flex justify-between text-ink-600">
                  <dt>عدد الأصناف</dt>
                  <dd className="num font-bold text-ink-900">
                    {formatNumber(totals.itemCount)}
                  </dd>
                </div>
                <div className="flex justify-between text-ink-600">
                  <dt>إجمالي القطع</dt>
                  <dd className="num font-bold text-ink-900">
                    {formatNumber(totals.unitCount)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-ink-200 pt-2">
                  <dt className="font-bold text-ink-800">الإجمالي التقديري</dt>
                  <dd className="num text-lg font-extrabold text-brand-800">
                    {formatPrice(totals.subtotal)}
                  </dd>
                </div>
              </dl>

              <p className="text-[11px] leading-relaxed text-ink-500">
                الإجمالي تقديري ولا يشمل الشحن. يتم تأكيد التوفر والأسعار النهائية
                من فريق المبيعات بعد استلام الطلب.
              </p>

              {belowMinimum.length > 0 && (
                <p className="flex items-start gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-[11px] font-semibold text-amber-800">
                  <TriangleAlert
                    className="mt-px size-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="num">{belowMinimum.length}</span> صنف أقل من
                    الحد الأدنى لسعر الجملة. يمكن إرسال الطلب وسيراجعه فريق
                    المبيعات.
                  </span>
                </p>
              )}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-emerald-700"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                تأكيد الطلب عبر واتساب
              </a>

              <div className="flex items-center justify-between text-[11px]">
                <button
                  type="button"
                  onClick={clearCart}
                  className="font-semibold text-ink-500 underline-offset-2 hover:text-red-600 hover:underline"
                >
                  إفراغ السلة
                </button>
                <span className="num text-ink-400" dir="ltr">
                  +{siteConfig.whatsappNumber}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
