"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/lib/types";

type ProductGalleryProps = {
  name: string;
  images: ProductImage[];
  featured?: boolean;
  inStock?: boolean;
};

export function ProductGallery({ name, images, featured, inStock }: ProductGalleryProps) {
  const safeImages: ProductImage[] = images.length > 0 ? images : [{ src: "/logo.svg", alt: name }];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = safeImages[activeIndex] ?? safeImages[0]!;

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-ink-200 bg-gradient-to-br from-ink-50 to-white shadow-sm">
        <Image
          src={activeImage.src}
          alt={activeImage.alt ?? name}
          fill
          priority
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="object-contain p-6 sm:p-10"
        />
        <div className="absolute start-4 top-4 flex flex-col gap-2">
          {featured && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-accent-500 px-2.5 py-1 text-[10px] font-extrabold text-white">
              الأكثر طلباً
            </span>
          )}
          {!inStock && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-ink-700 px-2.5 py-1 text-[10px] font-extrabold text-white">
              غير متوفر
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3" aria-label="صور المنتج">
        {safeImages.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`عرض صورة ${index + 1} من ${safeImages.length}`}
            aria-pressed={activeIndex === index}
            className={`relative flex size-20 items-center justify-center overflow-hidden rounded-2xl border-2 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
              activeIndex === index ? "border-brand-600 ring-2 ring-brand-100" : "border-ink-200"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt ?? name}
              fill
              sizes="80px"
              className="object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
