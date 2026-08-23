"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Share2, X, Package, Sparkles } from "lucide-react";
import { categoryMap } from "@/lib/categories";
import { buildProductInquiryUrl } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  if (!product) return null;
  return <QuickViewDialog product={product} onClose={onClose} />;
}

function QuickViewDialog({ product, onClose }: { product: Product; onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const category = categoryMap[product.categoryId];
  const gallery = product.images;
  const current = gallery[activeImage] ?? gallery[0];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareData = { title: product.name, text: product.shortDescription, url };
    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined);
      return;
    }
    await navigator.clipboard?.writeText(url);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 1800);
  };

  const details = [
    ["الفئة العمرية", product.ageRange],
    ["الخامة", product.material],
    ["المنشأ", product.origin],
    ["الألوان", product.colors.join("، ")],
    ["كود الصنف", product.sku],
  ].filter(([, value]) => value && value !== "يُضاف لاحقاً");

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-ink-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quickview-title"
        tabIndex={-1}
        className="animate-rise relative max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-t-[1.75rem] bg-white shadow-2xl outline-none thin-scroll sm:rounded-[1.75rem]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق تفاصيل المنتج"
          className="absolute top-3 end-3 z-10 rounded-full bg-white/90 p-2.5 text-ink-600 shadow-md ring-1 ring-ink-100 transition-colors hover:bg-ink-100 hover:text-ink-900"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-ink-50 p-4 sm:p-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm">
              {current && (
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-contain p-4"
                  priority
                />
              )}
              <div className="absolute top-3 start-3 flex gap-1.5">
                <span className="rounded-full bg-brand-900 text-white px-2.5 py-1 text-[10px] font-extrabold">كتالوج</span>
                {product.featured && (
                  <span className="rounded-full bg-accent-500 text-white px-2.5 py-1 text-[10px] font-bold flex items-center gap-1">
                    <Sparkles className="size-3" aria-hidden="true" />
                    مميز
                  </span>
                )}
              </div>
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto thin-scroll pb-1">
                {gallery.map((image, index) => (
                  <button
                    key={image.src + index}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`عرض الصورة ${index + 1}`}
                    aria-current={index === activeImage}
                    className={`relative size-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition-all ${index === activeImage ? "border-brand-600 shadow-md" : "border-ink-200 hover:border-ink-300"}`}
                  >
                    <Image src={image.src} alt="" fill sizes="80px" className="object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-5 p-5 sm:p-7">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-extrabold text-brand-800">{category?.name}</span>
                <span className="num rounded-full bg-ink-100 px-2.5 py-1 text-[10px] font-bold text-ink-600">{product.sku}</span>
              </div>
              <h2 id="quickview-title" className="text-2xl font-extrabold text-ink-900 leading-tight">
                {product.name}
              </h2>
              <p className="text-[13px] leading-7 text-ink-600">{product.description}</p>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <MessageCircle className="size-4" aria-hidden="true" />
                </span>
                <p className="text-sm font-extrabold text-emerald-900">استفسر عن السعر والتوفر</p>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-emerald-800">
                كتالوج فقط — لا يوجد دفع إلكتروني. اضغط زر واتساب وسيرد فريق المبيعات بالسعر والتوفر ومواعيد التوصيل.
              </p>
            </div>

            {details.length > 0 && (
              <dl className="grid grid-cols-2 gap-2.5 text-xs">
                {details.map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-ink-50 border border-ink-100 p-3">
                    <dt className="text-ink-500 font-medium">{label}</dt>
                    <dd className="mt-1 font-bold text-ink-900">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {product.badges.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {product.badges.map((badge) => (
                  <li
                    key={badge}
                    className="inline-flex items-center gap-1 rounded-full bg-ink-900 text-white px-3 py-1 text-[11px] font-bold"
                  >
                    <Package className="size-3" aria-hidden="true" />
                    {badge}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-auto grid gap-2.5 sm:grid-cols-[1fr_auto]">
              <a
                href={buildProductInquiryUrl(product.name, product.sku, "retail")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-900/10 transition-all hover:bg-[#20bd5a] hover:-translate-y-0.5 hover:shadow-xl"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                استفسر عبر واتساب
              </a>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center justify-center gap-2 rounded-xl bg-ink-100 px-5 py-3.5 text-sm font-bold text-ink-700 transition-colors hover:bg-ink-200"
                aria-label={isCopied ? "تم نسخ رابط المنتج" : "مشاركة المنتج"}
              >
                <Share2 className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">{isCopied ? "تم النسخ" : "مشاركة"}</span>
                <span className="sm:hidden">{isCopied ? "✓" : "مشاركة"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
