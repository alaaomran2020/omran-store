"use client";

import { Baby, Car, Gift, GraduationCap, LayoutGrid } from "lucide-react";
import { categories } from "@/lib/categories";
import { countByCategory } from "@/lib/products";
import { formatNumber } from "@/lib/format";
import { useStore } from "@/context/StoreProvider";
import type { IconName } from "@/lib/types";

const iconMap: Record<IconName, typeof Car> = {
  car: Car,
  baby: Baby,
  "graduation-cap": GraduationCap,
  gift: Gift,
  "layout-grid": LayoutGrid,
};

/**
 * عرض الأقسام الأربعة الرئيسية — كتالوج فقط
 */
export function CategoriesSection() {
  const { browseCategory } = useStore();
  const counts = countByCategory();

  return (
    <section id="categories" className="scroll-mt-28 bg-ink-50 py-14 sm:py-20">
      <div className="container-page">
        <div className="mb-8 max-w-2xl">
          <p className="mb-1.5 text-sm font-bold text-brand-700">الأقسام</p>
          <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">تصفح الكتالوج حسب الفئة</h2>
          <p className="mt-2 text-sm text-ink-600">أربعة أقسام رئيسية — اختر قسمك وستنتقل مباشرة إلى منتجاته المصورة.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = iconMap[category.icon];
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => browseCategory(category.id)}
                aria-label={`تصفح قسم ${category.name}`}
                className="card-surface group flex cursor-pointer flex-col gap-3 p-5 text-start transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <span
                  className="flex size-12 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
                  style={{ backgroundColor: `${category.accent}14` }}
                >
                  <Icon className="size-6" style={{ color: category.accent }} aria-hidden="true" />
                </span>

                <div>
                  <h3 className="text-base font-bold text-ink-900">{category.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{category.description}</p>
                </div>

                <p className="mt-auto pt-2 text-xs font-semibold text-brand-700">
                  <span className="num">{formatNumber(counts[category.id] ?? 0)}</span> منتج في الكتالوج
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
