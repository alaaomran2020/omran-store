"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { SearchX } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { PricingToggle } from "@/components/PricingToggle";
import { useStore } from "@/context/StoreProvider";
import { categories } from "@/lib/categories";
import { products } from "@/lib/products";
import { formatNumber } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import type { CategoryId } from "@/lib/types";

type Filter = CategoryId | "all";

const validIds = new Set<string>(categories.map((category) => category.id));

/**
 * قراءة القسم المطلوب من ?cat= بطريقة آمنة مع الترطيب:
 * الخادم يرسم الكتالوج كاملاً (أفضل للـ SEO وللـ LCP)،
 * وReact يبدّل إلى القسم المطلوب بعد الترطيب دون أي تحذير.
 */
const urlStore = {
  subscribe(onChange: () => void): () => void {
    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  },
  getSnapshot(): Filter {
    const requested = new URLSearchParams(window.location.search).get("cat");
    return requested && validIds.has(requested)
      ? (requested as CategoryId)
      : "all";
  },
  getServerSnapshot(): Filter {
    return "all";
  },
};

/**
 * شبكة الكتالوج: تصفية فورية حسب التصنيف دون إعادة تحميل الصفحة،
 * مع مفتاح التبديل المزدوج لنمط التسعير.
 */
export function CatalogGrid() {
  const fromUrl = useSyncExternalStore(
    urlStore.subscribe,
    urlStore.getSnapshot,
    urlStore.getServerSnapshot,
  );
  /** اختيار المستخدم يتجاوز ما جاء في الرابط بمجرد الضغط على أي فلتر */
  const [picked, setPicked] = useState<Filter | null>(null);
  const filter = picked ?? fromUrl;
  const setFilter = setPicked;
  const { mode } = useStore();

  const visible = useMemo(
    () =>
      filter === "all"
        ? products
        : products.filter((product) => product.categoryId === filter),
    [filter],
  );

  const options: { id: Filter; label: string }[] = [
    { id: "all", label: "كل الأقسام" },
    ...categories.map((category) => ({
      id: category.id as Filter,
      label: category.name,
    })),
  ];

  return (
    <>
      {/* أدوات التحكم */}
      <div className="sticky top-25 z-30 -mx-4 mb-5 border-b border-ink-200 bg-ink-50/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-semibold text-ink-600">
            <span className="num">{formatNumber(visible.length)}</span> صنف معروض
          </p>
          <PricingToggle size="sm" />
        </div>

        <div className="scroll-x mt-3">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setFilter(option.id)}
              aria-pressed={filter === option.id}
              className={`press rounded-full border px-3.5 py-2 text-xs font-bold ${
                filter === option.id
                  ? "border-brand-700 bg-brand-700 text-white"
                  : "border-ink-200 bg-white text-ink-700 hover:bg-ink-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {mode === "wholesale" && (
        <p className="mb-5 rounded-xl border border-accent-200 bg-accent-50 p-3 text-xs leading-relaxed font-semibold text-accent-900">
          {siteConfig.operations.wholesaleNotice}
        </p>
      )}

      {/* الشبكة: عمودان على الموبايل وأربعة على المكتب */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {visible.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 4}
            />
          ))}
        </div>
      ) : (
        <div className="card-surface flex flex-col items-center gap-2 p-10 text-center">
          <SearchX className="size-8 text-ink-300" aria-hidden="true" />
          <p className="text-sm font-bold text-ink-800">
            لا توجد أصناف في هذا القسم حالياً
          </p>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className="press mt-1 rounded-lg bg-brand-700 px-4 py-2 text-xs font-bold text-white hover:bg-brand-800"
          >
            عرض كل الأقسام
          </button>
        </div>
      )}
    </>
  );
}
