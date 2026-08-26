"use client";

import Image from "next/image";
import { Eye, MessageCircle, Package } from "lucide-react";
import { categoryMap } from "@/lib/categories";
import { buildProductInquiryUrl } from "@/lib/whatsapp";
import { trackCatalogEvent } from "@/lib/analytics";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

/** بطاقة منتج احترافية — كتالوج فقط مع واتساب */
export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const category = categoryMap[product.categoryId];
  const cover = product.images[0];

  const openQuickView = () => {
    trackCatalogEvent("product_quick_view", {
      sku: product.sku,
      category: product.categoryId,
      source: "product_card",
    });
    onQuickView(product);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-ink-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[0_20px_45px_rgba(37,78,224,0.14)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-ink-50 via-white to-brand-50">
        <button
          type="button"
          onClick={openQuickView}
          className="absolute inset-0 z-10 cursor-zoom-in"
          aria-label={`عرض تفاصيل ${product.name}`}
        />
        {cover && (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        <div className="pointer-events-none absolute top-3 start-3 z-20 flex flex-col items-start gap-1.5">
          {product.featured && (
            <span className="rounded-full bg-brand-900 px-3 py-1 text-[10px] font-extrabold text-white shadow-md tracking-wide">
              مميز
            </span>
          )}
          <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold text-ink-700 shadow-sm ring-1 ring-ink-100 flex items-center gap-1">
            <Package className="size-3" aria-hidden="true" />
            كتالوج
          </span>
        </div>
        <button
          type="button"
          onClick={openQuickView}
          className="absolute bottom-3 end-3 z-20 flex items-center gap-1.5 rounded-xl bg-white/95 backdrop-blur-sm px-3 py-2 text-[11px] font-bold text-ink-800 shadow-md ring-1 ring-ink-100 transition-all hover:bg-white hover:shadow-lg"
        >
          <Eye className="size-3.5" aria-hidden="true" />
          معاينة سريعة
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-extrabold text-brand-700 tracking-wide">
            {category?.name}
          </span>
          <span className="num text-[10px] font-medium text-ink-400 tracking-wider">{product.sku}</span>
        </div>

        <h3 className="text-[15px] font-extrabold text-ink-900 leading-snug line-clamp-2">
          <button type="button" onClick={openQuickView} className="text-start hover:text-brand-700 transition-colors">
            {product.name}
          </button>
        </h3>

        <p className="line-clamp-2 text-[13px] leading-6 text-ink-600">{product.shortDescription}</p>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <a
            href={buildProductInquiryUrl(product.name, product.sku, "retail")}
            onClick={() =>
              trackCatalogEvent("whatsapp_inquiry", {
                sku: product.sku,
                category: product.categoryId,
                source: "product_card",
                mode: "retail",
              })
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-2.5 text-[13px] font-extrabold text-white shadow-sm transition-all hover:bg-[#20bd5a] hover:shadow-md hover:-translate-y-0.5"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            واتساب
          </a>
          <button
            type="button"
            onClick={openQuickView}
            className="rounded-xl bg-ink-900 px-4 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-ink-800"
            aria-label={`تفاصيل ${product.name}`}
          >
            التفاصيل
          </button>
        </div>
      </div>
    </article>
  );
}
