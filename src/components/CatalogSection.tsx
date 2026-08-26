"use client";

import dynamic from "next/dynamic";
import { useDeferredValue, useMemo, useState } from "react";
import {
  Baby,
  Car,
  Gift,
  GraduationCap,
  LayoutGrid,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/context/StoreProvider";
import { categories } from "@/lib/categories";
import { catalogProducts } from "@/lib/products";
import { formatNumber } from "@/lib/format";
import { trackCatalogEvent } from "@/lib/analytics";
import type { IconName, Product, SortOption } from "@/lib/types";

// نافذة العرض السريع في حزمة منفصلة — لا تُحمَّل إلا عند أول استخدام
const QuickViewModal = dynamic(() =>
  import("@/components/QuickViewModal").then((m) => m.QuickViewModal),
);

const iconMap: Record<IconName, typeof Car> = {
  car: Car,
  baby: Baby,
  "graduation-cap": GraduationCap,
  gift: Gift,
  "layout-grid": LayoutGrid,
};

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "الترتيب الافتراضي" },
  { value: "name-asc", label: "الاسم: أبجدياً" },
];

/**
 * تطبيع النص العربي للبحث:
 * توحيد الألف والياء والتاء المربوطة وإزالة التشكيل.
 */
function normalizeArabic(input: string): string {
  return input
    .toLowerCase()
    .replace(/[\u064B-\u0652\u0640]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ")
    .trim();
}

/** قسم الكتالوج: البحث الفوري، تصفية الأقسام، الترتيب، والعرض السريع */
export function CatalogSection() {
  const { categoryFilter, setCategoryFilter } = useStore();
  const [query, setQuery] = useState("");
  const category = categoryFilter;
  const setCategory = setCategoryFilter;
  const [sort, setSort] = useState<SortOption>("featured");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);

  const deferredQuery = useDeferredValue(query);

  // فهرس بحث محسوب مرة واحدة
  const searchIndex = useMemo(
    () =>
      new Map(
        catalogProducts.map((product) => [
          product.id,
          normalizeArabic(
            [
              product.name,
              product.shortDescription,
              product.description,
              product.sku,
              product.material,
              product.ageRange,
              ...product.colors,
              ...product.badges,
            ].join(" "),
          ),
        ]),
      ),
    [],
  );

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: catalogProducts.length };
    for (const product of catalogProducts) {
      result[product.categoryId] = (result[product.categoryId] ?? 0) + 1;
    }
    return result;
  }, []);

  const visibleProducts = useMemo(() => {
    const needle = normalizeArabic(deferredQuery);
    const terms = needle ? needle.split(" ").filter(Boolean) : [];

    const filtered = catalogProducts.filter((product) => {
      if (category !== "all" && product.categoryId !== category) return false;
      if (onlyInStock && !product.inStock) return false;
      if (terms.length === 0) return true;
      const haystack = searchIndex.get(product.id) ?? "";
      return terms.every((term) => haystack.includes(term));
    });

    const sorted = [...filtered];
    switch (sort) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name, "ar"));
        break;
      default:
        sorted.sort(
          (a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name, "ar"),
        );
    }
    return sorted;
  }, [deferredQuery, category, onlyInStock, sort, searchIndex]);

  const hasFilters = query !== "" || category !== "all" || onlyInStock;

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query.trim()) {
      trackCatalogEvent("catalog_search", {
        queryLength: query.trim().length,
        resultCount: visibleProducts.length,
      });
    }
  };

  const resetFilters = () => {
    setQuery("");
    setCategory("all");
    setOnlyInStock(false);
    setSort("featured");
  };

  return (
    <section id="products" className="scroll-mt-28 bg-white py-14 sm:py-20">
      <div className="container-page">
        {/* العنوان */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-1.5 text-sm font-bold text-brand-700">الكتالوج</p>
            <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
              اكتشف منتجات عمران للألعاب
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-600">
              تصفّح مجموعة مختارة من الألعاب والهدايا، وافتح تفاصيل أي منتج أو أرسل استفسارك مباشرة عبر واتساب. الأسعار والمواصفات النهائية تُضاف لاحقاً.
            </p>
          </div>
        </div>

        {/* أدوات التصفية — لاصقة على الشاشات الكبيرة لتبقى متاحة أثناء التمرير */}
        <div className="mb-6 space-y-4 rounded-2xl border border-ink-200 bg-ink-50 p-4 lg:sticky lg:top-[7.75rem] lg:z-20">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* البحث */}
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute top-1/2 start-3 size-4.5 -translate-y-1/2 text-ink-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="ابحث بالاسم أو كود الصنف…"
                aria-label="البحث في المنتجات"
                className="no-spinner w-full rounded-xl border border-ink-200 bg-white py-3 ps-10 pe-10 text-sm outline-none placeholder:text-ink-400 focus:border-brand-500"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="مسح البحث"
                  className="absolute top-1/2 end-2.5 -translate-y-1/2 rounded-md p-1 text-ink-400 hover:bg-ink-100 hover:text-ink-700"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* الترتيب */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal
                className="size-4 shrink-0 text-ink-400"
                aria-hidden="true"
              />
              <select
                value={sort}
                onChange={(event) => {
                const nextSort = event.target.value as SortOption;
                setSort(nextSort);
                trackCatalogEvent("catalog_filter", { filter: "sort", value: nextSort });
              }}
                aria-label="ترتيب المنتجات"
                className="w-full rounded-xl border border-ink-200 bg-white px-3 py-3 text-sm font-semibold text-ink-700 outline-none focus:border-brand-500 lg:w-56"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-ink-200 bg-white px-3 py-3 text-sm font-semibold text-ink-700">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(event) => {
                  const nextOnlyInStock = event.target.checked;
                  setOnlyInStock(nextOnlyInStock);
                  trackCatalogEvent("catalog_filter", {
                    filter: "availability",
                    value: nextOnlyInStock ? "in_stock" : "all",
                  });
                }}
                className="size-4 accent-brand-700"
              />
              المتوفر فقط
            </label>
          </div>

          {/* الأقسام */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setCategory("all");
                trackCatalogEvent("catalog_filter", { filter: "category", value: "all" });
              }}
              aria-pressed={category === "all"}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
                category === "all"
                  ? "border-brand-700 bg-brand-700 text-white"
                  : "border-ink-200 bg-white text-ink-700 hover:border-ink-300"
              }`}
            >
              <LayoutGrid className="size-4" aria-hidden="true" />
              كل الأقسام
              <span className="num text-xs opacity-75">
                ({formatNumber(counts.all ?? 0)})
              </span>
            </button>

            {categories.filter((item) => (counts[item.id] ?? 0) > 0).map((item) => {
              const Icon = iconMap[item.icon];
              const isActive = category === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setCategory(item.id);
                    trackCatalogEvent("catalog_filter", { filter: "category", value: item.id });
                  }}
                  aria-pressed={isActive}
                  className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "border-brand-700 bg-brand-700 text-white"
                      : "border-ink-200 bg-white text-ink-700 hover:border-ink-300"
                  }`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {item.name}
                  <span className="num text-xs opacity-75">
                    ({formatNumber(counts[item.id] ?? 0)})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* عدّاد النتائج */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm">
          <p className="text-ink-600">
            عرض{" "}
            <span className="num font-bold text-ink-900">
              {formatNumber(visibleProducts.length)}
            </span>{" "}
            من{" "}
            <span className="num font-bold text-ink-900">
              {formatNumber(catalogProducts.length)}
            </span>{" "}
            صنف
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1 font-semibold text-brand-700 hover:text-brand-900"
            >
              <X className="size-4" aria-hidden="true" />
              إعادة ضبط التصفية
            </button>
          )}
        </div>

        {/* الشبكة */}
        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-ink-300 bg-ink-50 px-6 py-16 text-center">
            <Search
              className="mx-auto mb-3 size-8 text-ink-400"
              aria-hidden="true"
            />
            <p className="text-base font-bold text-ink-800">
              لا توجد أصناف مطابقة لبحثك
            </p>
            <p className="mt-1 text-sm text-ink-500">
              جرّب كلمات أبسط أو اختر قسماً آخر من الأعلى.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-800"
            >
              عرض كل المنتجات
            </button>
          </div>
        )}
      </div>

      {quickView && (
        <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
      )}
    </section>
  );
}
