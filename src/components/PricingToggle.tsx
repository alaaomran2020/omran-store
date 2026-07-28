"use client";

import { Store, Warehouse } from "lucide-react";
import { useStore } from "@/context/StoreProvider";
import type { PricingMode } from "@/lib/types";

interface PricingToggleProps {
  /** حجم العنصر: عادي للصفحات، مصغّر داخل البطاقات */
  size?: "sm" | "md";
  className?: string;
}

const options: { value: PricingMode; label: string; short: string }[] = [
  { value: "retail", label: "قطاعي", short: "قطاعي" },
  { value: "wholesale", label: "جملة", short: "جملة" },
];

/**
 * مفتاح التبديل المزدوج لنمط التسعير (جملة / قطاعي).
 * يؤثر فوراً على كل الأسعار المعروضة في الموقع والسلة، ويُحفظ بين الزيارات.
 */
export function PricingToggle({
  size = "md",
  className = "",
}: PricingToggleProps) {
  const { mode, setMode } = useStore();

  const padding = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";

  return (
    <div
      role="radiogroup"
      aria-label="نمط التسعير"
      className={`inline-flex items-center gap-1 rounded-full border border-ink-200 bg-white p-1 ${className}`}
    >
      {options.map((option) => {
        const isActive = mode === option.value;
        const Icon = option.value === "wholesale" ? Warehouse : Store;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => setMode(option.value)}
            className={`press flex items-center gap-1.5 rounded-full font-bold ${padding} ${
              isActive
                ? "bg-brand-700 text-white"
                : "text-ink-600 hover:bg-ink-100"
            }`}
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
