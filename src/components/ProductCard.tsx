"use client";

import Image from "next/image";
import { Eye, MessageCircle } from "lucide-react";
import { categoryMap } from "@/lib/categories";
import { buildProductInquiryUrl } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

/** بطاقة منتج داخل شبكة الكتالوج */
export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const category = categoryMap[product.categoryId];
  const cover = product.images[0];

  return (
    <article className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-ink-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_18px_40px_rgba(37,78,224,0.12)]">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-brand-50 via-white to-accent-50">
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute inset-0 z-10 cursor-zoom-in"
          aria-label={`عرض تفاصيل ${product.name}`}
        />
        {cover && (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div className="pointer-events-none absolute top-4 start-4 z-20 flex flex-col items-start gap-1.5">
          {product.featured && (
            <span className="rounded-full bg-accent-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              مختار من الكتالوج
            </span>
          )}
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-brand-800 shadow-sm ring-1 ring-brand-100">
            السعر يُضاف لاحقاً
          </span>
        </div>
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute bottom-4 end-4 z-20 flex items-center gap-1.5 rounded-xl bg-white/95 px-3 py-2 text-xs font-bold text-ink-800 shadow-md ring-1 ring-ink-100 transition-colors hover:bg-white"
        >
          <Eye className="size-4" aria-hidden="true" />
          عرض التفاصيل
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-700">
            {category?.name}
          </span>
          <span className="num text-[11px] font-medium text-ink-400">{product.sku}</span>
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

        <p className="line-clamp-3 text-sm leading-7 text-ink-600">{product.shortDescription}</p>

        <div className="mt-auto flex items-center gap-2 pt-1">
          <a
            href={buildProductInquiryUrl(product.name, product.sku, "retail")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand-700 px-3 py-3 text-sm font-extrabold text-white shadow-sm transition-all hover:bg-brand-800 hover:shadow-md"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            استفسر عبر واتساب
          </a>
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="rounded-xl bg-ink-100 px-3 py-3 text-sm font-bold text-ink-700 transition-colors hover:bg-ink-200"
            aria-label={`تفاصيل ${product.name}`}
          >
            التفاصيل
          </button>
        </div>
      </div>
    </article>
  );
}
