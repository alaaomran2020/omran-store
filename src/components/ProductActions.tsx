"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { buildProductInquiryUrl } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

export function ProductActions({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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
    <div className="mt-8 space-y-3">
      <a
        href={buildProductInquiryUrl(product.name, product.sku, "retail")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-900/10 transition-colors hover:bg-[#20bd5a]"
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        استفسر عن المنتج عبر واتساب
      </a>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setIsFavorite((value) => !value)}
          className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors ${isFavorite ? "bg-rose-50 text-rose-700" : "bg-ink-100 text-ink-700 hover:bg-ink-200"}`}
          aria-pressed={isFavorite}
        >
          <Heart className={`size-4 ${isFavorite ? "fill-current" : ""}`} aria-hidden="true" />
          {isFavorite ? "في المفضلة" : "أضف للمفضلة"}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center justify-center gap-2 rounded-xl bg-ink-100 px-4 py-3 text-sm font-bold text-ink-700 transition-colors hover:bg-ink-200"
        >
          <Share2 className="size-4" aria-hidden="true" />
          {isCopied ? "تم نسخ الرابط" : "مشاركة"}
        </button>
      </div>
    </div>
  );
}
