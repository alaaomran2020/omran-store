"use client";

import { useState } from "react";
import { Heart, Share2, ShoppingCart, Truck } from "lucide-react";
import { useStore } from "@/context/StoreProvider";
import { buildProductInquiryUrl } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

export function ProductActions({ product }: { product: Product }) {
  const { mode, addItem, openCart } = useStore();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleBuyNow = () => {
    const quantity = mode === "wholesale" ? product.packaging.minWholesaleUnits : 1;
    addItem(product, quantity);
    openCart();
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: product.shortDescription,
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined);
      return;
    }

    await navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 1800);
  };

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <a
        href={buildProductInquiryUrl(product.name, product.sku, mode)}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-2xl bg-brand-700 px-6 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-brand-900/15 transition-all hover:-translate-y-0.5 hover:bg-brand-800"
      >
        <Truck className="size-4" aria-hidden="true" />
        طلب عبر واتساب
      </a>
      <button
        type="button"
        onClick={handleBuyNow}
        className="inline-flex items-center gap-2 rounded-2xl bg-ink-900 px-6 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-ink-900/15 transition-all hover:-translate-y-0.5 hover:bg-ink-950"
      >
        <ShoppingCart className="size-4" aria-hidden="true" />
        شراء الآن
      </button>
      <button
        type="button"
        onClick={handleShare}
        aria-label={isCopied ? "تم نسخ رابط المنتج" : "مشاركة المنتج"}
        title={isCopied ? "تم نسخ الرابط" : "مشاركة المنتج"}
        className="inline-flex items-center justify-center rounded-2xl bg-ink-100 px-4 py-3.5 text-ink-700 transition-colors hover:bg-ink-200"
      >
        <Share2 className="size-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => setIsFavorite((value) => !value)}
        aria-label={isFavorite ? "إزالة المنتج من المفضلة" : "إضافة المنتج للمفضلة"}
        aria-pressed={isFavorite}
        title={isFavorite ? "إزالة من المفضلة" : "إضافة للمفضلة"}
        className={`inline-flex items-center justify-center rounded-2xl px-4 py-3.5 transition-colors ${
          isFavorite ? "bg-rose-600 text-white" : "bg-rose-50 text-rose-600 hover:bg-rose-100"
        }`}
      >
        <Heart className={`size-4 ${isFavorite ? "fill-current" : ""}`} aria-hidden="true" />
      </button>
    </div>
  );
}
