"use client";

import { MessageCircle, ShoppingCart } from "lucide-react";
import { useStore } from "@/context/StoreProvider";
import { formatNumber, formatPrice } from "@/lib/format";
import { buildInquiryUrl } from "@/lib/whatsapp";

/**
 * شريط سفلي يظهر على الشاشات الصغيرة عند وجود أصناف في السلة،
 * بالإضافة إلى زر واتساب ثابت للاستفسار السريع.
 */
export function FloatingCartBar() {
  const { totals, openCart, isCartOpen, hydrated } = useStore();

  if (isCartOpen) return null;

  const hasItems = hydrated && totals.itemCount > 0;

  return (
    <>
      {/* زر واتساب ثابت */}
      <a
        href={buildInquiryUrl("الأصناف المتاحة وأسعار التوريد")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="التواصل عبر واتساب"
        className={`fixed end-4 z-30 flex size-13 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition-all hover:bg-emerald-700 ${
          hasItems ? "bottom-24 md:bottom-6" : "bottom-6"
        }`}
      >
        <MessageCircle className="size-6" aria-hidden="true" />
      </a>

      {/* شريط السلة للجوال */}
      {hasItems && (
        <div className="animate-rise fixed inset-x-0 bottom-0 z-30 border-t border-ink-200 bg-white/95 p-3 shadow-lg backdrop-blur md:hidden">
          <button
            type="button"
            onClick={openCart}
            className="flex w-full items-center justify-between gap-3 rounded-xl bg-brand-700 px-4 py-3 text-white"
          >
            <span className="flex items-center gap-2 text-sm font-bold">
              <ShoppingCart className="size-4.5" aria-hidden="true" />
              عرض السلة (<span className="num">{formatNumber(totals.itemCount)}</span>)
            </span>
            <span className="num text-sm font-extrabold">
              {formatPrice(totals.subtotal)}
            </span>
          </button>
        </div>
      )}
    </>
  );
}
