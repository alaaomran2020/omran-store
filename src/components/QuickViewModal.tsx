"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Share2, X } from "lucide-react";
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

function QuickViewDialog({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
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

  const details = [
    ["الفئة العمرية", product.ageRange],
    ["الخامة", product.material],
    ["المنشأ", product.origin],
    ["الألوان", product.colors.join("، ")],
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
        className="animate-rise relative max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl bg-white shadow-xl outline-none thin-scroll sm:rounded-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق تفاصيل المنتج"
          className="absolute top-3 end-3 z-10 rounded-full bg-white/90 p-2 text-ink-600 shadow-sm transition-colors hover:bg-ink-100 hover:text-ink-900"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          <div className="bg-ink-50 p-4 sm:p-6">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-ink-200 bg-white">
              {current && (
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-contain p-4"
                  priority
                />
              )}
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-2">
                {gallery.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`عرض الصورة ${index + 1}`}
                    aria-current={index === activeImage}
                    className={`relative size-16 overflow-hidden rounded-lg border-2 bg-white ${index === activeImage ? "border-brand-600" : "border-ink-200"}`}
                  >
                    <Image src={image.src} alt="" fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-5 p-4 sm:p-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-800">
                  {category?.name}
                </span>
                <span className="num text-[11px] font-medium text-ink-400">{product.sku}</span>
                <span className="rounded-md bg-accent-50 px-2 py-0.5 text-[11px] font-semibold text-accent-700">
                  بيانات قابلة للتحديث
                </span>
              </div>
              <h2 id="quickview-title" className="text-xl font-extrabold text-ink-900 sm:text-2xl">
                {product.name}
              </h2>
              <p className="text-sm leading-7 text-ink-600">{product.description}</p>
            </div>

            <div className="rounded-xl border border-brand-200 bg-brand-50 p-4">
              <p className="text-xs font-bold text-brand-700">معلومات السعر</p>
              <p className="mt-1 text-lg font-extrabold text-brand-900">يُضاف لاحقاً</p>
              <p className="mt-1 text-xs text-brand-800/75">السعر والتوفر النهائيان يُعتمدان لاحقاً. للاستفسار، تواصل معنا عبر واتساب.</p>
            </div>

            {details.length > 0 && (
              <dl className="grid grid-cols-2 gap-2 text-xs">
                {details.map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-ink-50 p-3">
                    <dt className="text-ink-500">{label}</dt>
                    <dd className="mt-1 font-bold text-ink-800">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {product.badges.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {product.badges.map((badge) => (
                  <li key={badge} className="rounded-md bg-ink-100 px-2 py-1 text-[11px] font-semibold text-ink-600">
                    {badge}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-auto grid gap-2 sm:grid-cols-[1fr_auto]">
              <a
                href={buildProductInquiryUrl(product.name, product.sku, "retail")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-extrabold text-white transition-colors hover:bg-[#20bd5a]"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                استفسر عن المنتج عبر واتساب
              </a>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center justify-center gap-2 rounded-xl bg-ink-100 px-4 py-3 text-sm font-bold text-ink-700 transition-colors hover:bg-ink-200"
                aria-label={isCopied ? "تم نسخ رابط المنتج" : "مشاركة المنتج"}
              >
                <Share2 className="size-4" aria-hidden="true" />
                <span className="sm:hidden">{isCopied ? "تم النسخ" : "مشاركة"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
