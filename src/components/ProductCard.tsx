"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { useStore } from "@/context/StoreProvider";
import {
  DOZEN_UNITS,
  formatNumber,
  formatPrice,
  getCartonPrice,
  getDozenPrice,
  getMinQuantity,
  getUnitPrice,
  getWholesaleSavingPercent,
} from "@/lib/format";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  /** أول صفّ من البطاقات يُحمَّل بأولوية لتحسين LCP */
  priority?: boolean;
}

/** بطاقة منتج داخل شبكة الكتالوج */
export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { mode, addItem, getQuantity, lastAddedId, hydrated } = useStore();

  const unitPrice = getUnitPrice(product, mode);
  const minQuantity = getMinQuantity(product, mode);
  const inCart = hydrated ? getQuantity(product.id) : 0;
  const justAdded = lastAddedId === product.id;
  const saving = getWholesaleSavingPercent(product);
  const cover = product.images[0];
  const isWholesale = mode === "wholesale";

  return (
    <article className="card-surface lift flex flex-col overflow-hidden">
      {/* الصورة */}
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-ink-100"
      >
        {cover && (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
            priority={priority}
          />
        )}
        {isWholesale && saving > 0 && (
          <span className="absolute top-2 start-2 rounded-md bg-accent-500 px-2 py-1 text-[11px] font-extrabold text-white">
            وفّر <span className="num">{saving}</span>%
          </span>
        )}
        {!product.inStock && (
          <span className="absolute inset-x-0 bottom-0 bg-ink-950/80 py-1.5 text-center text-xs font-bold text-white">
            غير متوفر حالياً
          </span>
        )}
      </Link>

      {/* المحتوى */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="text-sm font-bold text-ink-900">
          <Link
            href={`/products/${product.id}`}
            className="line-clamp-2 transition-colors hover:text-brand-700"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-auto space-y-2 pt-1">
          <div>
            <p className="text-[11px] font-semibold text-ink-500">
              {isWholesale ? "سعر الجملة للقطعة" : "سعر القطعة"}
            </p>
            <p className="num text-lg font-extrabold text-brand-800">
              {formatPrice(unitPrice)}
            </p>
          </div>

          {/* إبراز سعر الدستة والكرتونة في وضع الجملة */}
          {isWholesale && (
            <dl className="grid grid-cols-2 gap-1 rounded-lg bg-brand-50 p-2 text-[11px] leading-tight">
              <div>
                <dt className="font-semibold text-ink-500">
                  الدستة (<span className="num">{DOZEN_UNITS}</span>)
                </dt>
                <dd className="num font-extrabold text-brand-800">
                  {formatPrice(getDozenPrice(product))}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-ink-500">
                  الكرتونة (
                  <span className="num">
                    {formatNumber(product.packaging.unitsPerCarton)}
                  </span>
                  )
                </dt>
                <dd className="num font-extrabold text-brand-800">
                  {formatPrice(getCartonPrice(product))}
                </dd>
              </div>
            </dl>
          )}

          <button
            type="button"
            onClick={() => addItem(product)}
            disabled={!product.inStock}
            className={`press flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-bold disabled:cursor-not-allowed disabled:bg-ink-200 disabled:text-ink-500 sm:text-sm ${
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
                أضف <span className="num">{formatNumber(minQuantity)}</span>{" "}
                قطعة
              </>
            )}
          </button>

          {inCart > 0 && (
            <p className="text-center text-[11px] font-semibold text-emerald-700">
              في السلة: <span className="num">{formatNumber(inCart)}</span> قطعة
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
