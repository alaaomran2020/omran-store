"use client";

import Image from "next/image";
import { Check, Eye, Package, Plus } from "lucide-react";
import { useStore } from "@/context/StoreProvider";
import { categoryMap } from "@/lib/categories";
import {
  formatNumber,
  formatPrice,
  getMinQuantity,
  getUnitPrice,
  getWholesaleSavingPercent,
} from "@/lib/format";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  /** فتح نافذة العرض السريع */
  onQuickView: (product: Product) => void;
}

/** بطاقة منتج داخل شبكة الكتالوج */
export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { mode, addItem, getQuantity, lastAddedId, hydrated } = useStore();

  const category = categoryMap[product.categoryId];
  const unitPrice = getUnitPrice(product, mode);
  const minQuantity = getMinQuantity(product, mode);
  const inCart = hydrated ? getQuantity(product.id) : 0;
  const justAdded = lastAddedId === product.id;
  const saving = getWholesaleSavingPercent(product);
  const cover = product.images[0];

  return (
    <article className="card-surface group flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      {/* الصورة */}
      <div className="relative aspect-square overflow-hidden bg-ink-100">
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute inset-0 z-10 cursor-zoom-in"
          aria-label={`عرض سريع لمنتج ${product.name}`}
        />
        {cover && (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {/* شارات الحالة */}
        <div className="pointer-events-none absolute top-3 start-3 z-20 flex flex-col items-start gap-1.5">
          {mode === "wholesale" && saving > 0 && (
            <span className="rounded-md bg-brand-700 px-2 py-1 text-[11px] font-bold text-white">
              أقل من القطاعي بـ <span className="num">{saving}%</span>
            </span>
          )}
          {!product.inStock && (
            <span className="rounded-md bg-ink-700 px-2 py-1 text-[11px] font-bold text-white">
              غير متوفر حالياً
            </span>
          )}
        </div>

        {/* زر العرض السريع */}
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute bottom-3 end-3 z-20 flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-2 text-xs font-bold text-ink-800 shadow-sm transition-colors hover:bg-white"
        >
          <Eye className="size-4" aria-hidden="true" />
          عرض سريع
        </button>
      </div>

      {/* المحتوى */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <span className="rounded-md bg-ink-100 px-2 py-0.5 text-[11px] font-semibold text-ink-600">
            {category?.name}
          </span>
          <span className="num text-[11px] font-medium text-ink-400">
            {product.sku}
          </span>
        </div>

        <h3 className="text-base font-bold text-ink-900">
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="text-start hover:text-brand-700"
          >
            {product.name}
          </button>
        </h3>

        <p className="line-clamp-2 text-sm text-ink-600">
          {product.shortDescription}
        </p>

        {/* بيانات التعبئة */}
        <div className="flex items-center gap-1.5 rounded-lg bg-ink-50 px-2.5 py-2 text-xs text-ink-600">
          <Package className="size-4 shrink-0 text-ink-400" aria-hidden="true" />
          <span>
            الكرتونة{" "}
            <span className="num font-bold text-ink-800">
              {formatNumber(product.packaging.unitsPerCarton)}
            </span>{" "}
            قطعة · أقل كمية جملة{" "}
            <span className="num font-bold text-ink-800">
              {formatNumber(product.packaging.minWholesaleUnits)}
            </span>
          </span>
        </div>

        {/* السعر */}
        <div className="mt-auto space-y-3 pt-1">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold text-ink-500">
                {mode === "wholesale" ? "سعر الجملة للقطعة" : "سعر القطاعي للقطعة"}
              </p>
              <p className="num text-xl font-extrabold text-brand-800">
                {formatPrice(unitPrice)}
              </p>
            </div>
            {mode === "wholesale" && (
              <p className="num text-xs text-ink-400 line-through">
                {formatPrice(product.retailPrice)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => addItem(product)}
              disabled={!product.inStock}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:bg-ink-200 disabled:text-ink-500 ${
                justAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-brand-700 text-white hover:bg-brand-800"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="size-4" aria-hidden="true" />
                  تمت الإضافة
                </>
              ) : (
                <>
                  <Plus className="size-4" aria-hidden="true" />
                  إضافة{" "}
                  <span className="num">{formatNumber(minQuantity)}</span> قطعة
                </>
              )}
            </button>
          </div>

          {inCart > 0 && (
            <p className="text-center text-[11px] font-semibold text-emerald-700">
              في السلة حالياً: <span className="num">{formatNumber(inCart)}</span>{" "}
              قطعة
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
