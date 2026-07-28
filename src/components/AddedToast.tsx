"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { useStore } from "@/context/StoreProvider";
import { getProductById } from "@/lib/products";
import { formatNumber } from "@/lib/format";

/** مدة ظهور التنبيه بالمللي ثانية */
const TOAST_DURATION = 2800;

/**
 * تنبيه مؤقت يظهر أسفل الشاشة بعد إضافة أي منتج إلى السلة،
 * مع اختصار مباشر لفتح السلة وإتمام الطلب — يقلل التخلي قبل الإرسال.
 */
export function AddedToast() {
  const { lastAddedId, getQuantity, hydrated } = useStore();
  /** المنتج المعروض في التنبيه — يبقى بعد انقضاء مؤشر البطاقة */
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [trackedId, setTrackedId] = useState<string | null>(null);

  // ضبط الحالة أثناء الرسم عند تغيّر آخر منتج مضاف (النمط الموصى به)
  if (lastAddedId !== trackedId) {
    setTrackedId(lastAddedId);
    if (lastAddedId) setCurrentId(lastAddedId);
  }

  // الإخفاء التلقائي بعد انتهاء المدة — إضافة جديدة تعيد تشغيل المؤقت
  useEffect(() => {
    if (!currentId) return;
    const timer = window.setTimeout(() => setCurrentId(null), TOAST_DURATION);
    return () => window.clearTimeout(timer);
  }, [currentId]);

  if (!hydrated || !currentId) return null;
  const product = getProductById(currentId);
  if (!product) return null;

  const quantity = getQuantity(product.id);

  return (
    <div
      className="safe-bottom pointer-events-none fixed inset-x-3 bottom-3 z-40 flex justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="animate-rise pointer-events-auto flex max-w-full items-center gap-3 rounded-xl bg-ink-950 py-2.5 ps-3.5 pe-2.5 text-white shadow-2xl ring-1 ring-white/10">
        <CheckCircle2
          className="size-5 shrink-0 text-emerald-400"
          aria-hidden="true"
        />
        <p className="min-w-0 truncate text-sm font-semibold">
          أُضيف «{product.name}»
          {quantity > 0 && (
            <span className="text-ink-300">
              {" "}
              — <span className="num">{formatNumber(quantity)}</span> قطعة في
              السلة
            </span>
          )}
        </p>
        <Link
          href="/checkout"
          onClick={() => setCurrentId(null)}
          className="press flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-extrabold text-white hover:bg-emerald-700"
        >
          <ShoppingCart className="size-4" aria-hidden="true" />
          إتمام الطلب
        </Link>
      </div>
    </div>
  );
}
