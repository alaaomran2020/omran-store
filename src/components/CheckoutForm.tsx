"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MessageCircle, ShoppingCart, Trash2 } from "lucide-react";
import { PricingToggle } from "@/components/PricingToggle";
import { QuantityStepper } from "@/components/QuantityStepper";
import { useStore } from "@/context/StoreProvider";
import {
  formatDozens,
  formatNumber,
  formatPrice,
  getQuantityStep,
  getMinQuantity,
} from "@/lib/format";
import { activeBranches, siteConfig } from "@/lib/site";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

/** خيار التسليم: أحد الفروع أو شحن للعنوان */
const SHIPPING = "shipping";

/** نموذج مختصر + ملخص تكلفة شفاف + إرسال الطلب عبر واتساب */
export function CheckoutForm() {
  const {
    mode,
    resolvedItems,
    totals,
    setQuantity,
    removeItem,
    clearCart,
    hydrated,
  } = useStore();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [delivery, setDelivery] = useState<string>(
    activeBranches[0]?.id ?? SHIPPING,
  );
  const [touched, setTouched] = useState(false);

  const isShipping = delivery === SHIPPING;
  const branch = activeBranches.find((item) => item.id === delivery);

  const phoneValid = /^0?1[0-9]{9}$/.test(phone.replace(/\s|-/g, ""));
  const nameValid = name.trim().length >= 3;
  const addressValid = !isShipping || address.trim().length >= 6;
  const canSubmit =
    hydrated && resolvedItems.length > 0 && nameValid && phoneValid && addressValid;

  const freeShipping =
    isShipping && totals.subtotal >= siteConfig.operations.freeShippingThreshold;

  const notes = [
    isShipping
      ? `التسليم: شحن إلى العنوان — ${address.trim()}`
      : `الاستلام من: ${branch?.name ?? ""} (${branch?.address ?? ""})`,
    `رقم التواصل: ${phone.trim()}`,
    freeShipping ? "الطلب مؤهل للشحن المجاني حسب العرض المعلن." : "",
  ]
    .filter(Boolean)
    .join("\n");

  const orderUrl = buildWhatsAppUrl(
    buildOrderMessage({
      items: resolvedItems,
      totals,
      mode,
      customerName: name.trim(),
      notes,
    }),
  );

  // سلة فارغة
  if (hydrated && resolvedItems.length === 0) {
    return (
      <div className="card-surface flex flex-col items-center gap-3 p-10 text-center">
        <ShoppingCart className="size-9 text-ink-300" aria-hidden="true" />
        <h2 className="text-base font-extrabold text-ink-900">
          سلة الطلب فارغة
        </h2>
        <p className="max-w-sm text-sm text-ink-600">
          أضف الأصناف التي تحتاجها من الكتالوج ثم عد إلى هنا لإتمام الطلب في
          خطوة واحدة.
        </p>
        <Link
          href="/products"
          className="press mt-1 rounded-xl bg-brand-700 px-5 py-3 text-sm font-bold text-white hover:bg-brand-800"
        >
          تصفح الكتالوج
        </Link>
      </div>
    );
  }

  if (!hydrated) {
    return (
      <div
        className="card-surface h-64 animate-pulse bg-ink-100"
        aria-hidden="true"
      />
    );
  }

  const fieldClass =
    "w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-600";
  const errorClass = "mt-1 text-[11px] font-semibold text-red-600";

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_22rem] lg:items-start">
      {/* النموذج */}
      <div className="space-y-5">
        <form
          className="card-surface space-y-4 p-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <h2 className="text-base font-extrabold text-ink-900">
            بيانات الطلب
          </h2>

          <div>
            <label htmlFor="name" className="mb-1.5 block text-xs font-bold text-ink-700">
              الاسم أو اسم المحل
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="مثال: محل النور للألعاب"
              className={fieldClass}
            />
            {touched && !nameValid && (
              <p className={errorClass}>برجاء كتابة الاسم كاملاً.</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="mb-1.5 block text-xs font-bold text-ink-700">
              رقم الهاتف
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              dir="ltr"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="01xxxxxxxxx"
              className={`${fieldClass} text-start`}
            />
            {touched && !phoneValid && (
              <p className={errorClass}>
                برجاء إدخال رقم موبايل مصري صحيح (11 رقماً).
              </p>
            )}
          </div>

          <fieldset>
            <legend className="mb-1.5 text-xs font-bold text-ink-700">
              الاستلام أو الشحن
            </legend>
            <div className="grid gap-2">
              {activeBranches.map((item) => (
                <label
                  key={item.id}
                  className={`press flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 text-sm ${
                    delivery === item.id
                      ? "border-brand-600 bg-brand-50"
                      : "border-ink-200 bg-white hover:bg-ink-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value={item.id}
                    checked={delivery === item.id}
                    onChange={() => setDelivery(item.id)}
                    className="mt-1 size-4 shrink-0 accent-[var(--color-brand-700)]"
                  />
                  <span>
                    <span className="block font-bold text-ink-900">
                      {item.name}
                    </span>
                    <span className="block text-xs text-ink-600">
                      {item.address} — بدون رسوم شحن
                    </span>
                  </span>
                </label>
              ))}

              <label
                className={`press flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 text-sm ${
                  isShipping
                    ? "border-brand-600 bg-brand-50"
                    : "border-ink-200 bg-white hover:bg-ink-50"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value={SHIPPING}
                  checked={isShipping}
                  onChange={() => setDelivery(SHIPPING)}
                  className="mt-1 size-4 shrink-0 accent-[var(--color-brand-700)]"
                />
                <span>
                  <span className="block font-bold text-ink-900">
                    شحن إلى العنوان
                  </span>
                  <span className="block text-xs text-ink-600">
                    قيمة الشحن تُحدَّد وتُبلَّغ لك قبل تنفيذ الطلب.
                  </span>
                </span>
              </label>
            </div>
          </fieldset>

          {isShipping && (
            <div>
              <label
                htmlFor="address"
                className="mb-1.5 block text-xs font-bold text-ink-700"
              >
                العنوان بالتفصيل
              </label>
              <textarea
                id="address"
                name="address"
                rows={3}
                autoComplete="street-address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                onBlur={() => setTouched(true)}
                placeholder="المحافظة، المدينة، الشارع، رقم العقار"
                className={`${fieldClass} resize-y`}
              />
              {touched && !addressValid && (
                <p className={errorClass}>برجاء كتابة العنوان بالتفصيل.</p>
              )}
            </div>
          )}
        </form>

        {/* الأصناف */}
        <div className="card-surface p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-ink-900">
              الأصناف (<span className="num">{formatNumber(totals.itemCount)}</span>)
            </h2>
            <PricingToggle size="sm" />
          </div>

          <ul className="divide-y divide-ink-200">
            {resolvedItems.map((item) => {
              const cover = item.product.images[0];
              return (
                <li key={item.product.id} className="flex gap-3 py-3">
                  <Link
                    href={`/products/${item.product.id}`}
                    className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-ink-100"
                  >
                    {cover && (
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${item.product.id}`}
                      className="line-clamp-2 text-sm font-bold text-ink-900 hover:text-brand-700"
                    >
                      {item.product.name}
                    </Link>
                    <p className="num mt-0.5 text-xs text-ink-500">
                      {formatPrice(item.unitPrice)} / قطعة
                      {mode === "wholesale" && (
                        <> · {formatDozens(item.quantity)} دستة</>
                      )}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <QuantityStepper
                        size="sm"
                        value={item.quantity}
                        min={getMinQuantity(item.product, mode)}
                        step={getQuantityStep(item.product, mode)}
                        onChange={(value) =>
                          setQuantity(item.product.id, value)
                        }
                        label={`كمية ${item.product.name}`}
                      />
                      <div className="flex items-center gap-2">
                        <span className="num text-sm font-extrabold text-brand-800">
                          {formatPrice(item.lineTotal)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id)}
                          aria-label={`حذف ${item.product.name}`}
                          className="press rounded-lg p-2 text-ink-400 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={clearCart}
            className="press mt-3 text-xs font-semibold text-ink-500 hover:text-red-600"
          >
            إفراغ السلة
          </button>
        </div>
      </div>

      {/* ملخص التكلفة */}
      <aside className="card-surface p-4 lg:sticky lg:top-28">
        <h2 className="text-base font-extrabold text-ink-900">ملخص التكلفة</h2>
        <p className="mt-1 text-xs font-semibold text-ink-500">
          الأسعار المعروضة:{" "}
          {mode === "wholesale" ? "جملة" : "قطاعي"} — بدون رسوم خفية.
        </p>

        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-2">
            <dt className="text-ink-600">عدد الأصناف</dt>
            <dd className="num font-bold text-ink-900">
              {formatNumber(totals.itemCount)}
            </dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-ink-600">إجمالي القطع</dt>
            <dd className="num font-bold text-ink-900">
              {formatNumber(totals.unitCount)}
            </dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-ink-600">الشحن</dt>
            <dd className="text-end font-bold text-ink-900">
              {isShipping
                ? freeShipping
                  ? "مجاني"
                  : "يُحدَّد قبل التنفيذ"
                : "استلام من الفرع"}
            </dd>
          </div>
          <div className="flex justify-between gap-2 border-t border-ink-200 pt-3">
            <dt className="font-extrabold text-ink-900">الإجمالي</dt>
            <dd className="num text-xl font-extrabold text-brand-800">
              {formatPrice(totals.subtotal)}
            </dd>
          </div>
        </dl>

        <a
          href={canSubmit ? orderUrl : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!canSubmit}
          onClick={(event) => {
            if (!canSubmit) {
              event.preventDefault();
              setTouched(true);
            }
          }}
          className={`press mt-4 flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-extrabold text-white ${
            canSubmit
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "cursor-not-allowed bg-ink-300"
          }`}
        >
          <MessageCircle className="size-5" aria-hidden="true" />
          إرسال الطلب عبر الواتساب
        </a>

        {!canSubmit && (
          <p className="mt-2 text-center text-[11px] font-semibold text-ink-500">
            أكمل الاسم ورقم الهاتف {isShipping ? "والعنوان " : ""}لتفعيل الإرسال.
          </p>
        )}

        <a
          href={siteConfig.phoneHref}
          className="press mt-2 flex items-center justify-center gap-2 rounded-xl bg-ink-100 px-4 py-3 text-sm font-bold text-ink-800 hover:bg-ink-200"
        >
          الاتصال المباشر:{" "}
          <span className="num">{siteConfig.phoneDisplay}</span>
        </a>
      </aside>
    </div>
  );
}
