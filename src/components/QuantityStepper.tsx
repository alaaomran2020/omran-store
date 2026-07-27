"use client";

import { Minus, Plus } from "lucide-react";
import { formatNumber } from "@/lib/format";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  /** أقل قيمة مسموحة */
  min?: number;
  /** مقدار الزيادة عند الضغط على الأزرار */
  step?: number;
  size?: "sm" | "md";
  /** نص وصفي لقارئ الشاشة */
  label?: string;
  disabled?: boolean;
}

/** عداد كمية قابل للتعديل بالأزرار أو بالكتابة المباشرة */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  step = 1,
  size = "md",
  label = "الكمية",
  disabled = false,
}: QuantityStepperProps) {
  const buttonSize = size === "sm" ? "size-8" : "size-10";
  const fieldWidth = size === "sm" ? "w-12 text-sm" : "w-16 text-base";

  const clamp = (next: number) => Math.max(min, Math.round(next));

  return (
    <div
      className={`inline-flex items-center rounded-xl border border-ink-200 bg-white ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => onChange(clamp(value - step))}
        disabled={disabled || value <= min}
        aria-label={`إنقاص ${label}`}
        className={`${buttonSize} flex items-center justify-center rounded-e-xl text-ink-700 transition-colors hover:bg-ink-100 disabled:cursor-not-allowed disabled:text-ink-300 disabled:hover:bg-transparent`}
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>

      <input
        type="number"
        inputMode="numeric"
        value={value}
        min={min}
        step={step}
        disabled={disabled}
        aria-label={label}
        onChange={(event) => {
          const parsed = Number(event.target.value);
          if (Number.isNaN(parsed)) return;
          onChange(Math.max(0, Math.round(parsed)));
        }}
        onBlur={(event) => {
          const parsed = Number(event.target.value);
          onChange(Number.isNaN(parsed) ? min : clamp(parsed));
        }}
        className={`no-spinner num ${fieldWidth} border-x border-ink-200 bg-transparent py-1.5 text-center font-bold text-ink-900 focus:outline-none`}
      />

      <button
        type="button"
        onClick={() => onChange(clamp(value + step))}
        disabled={disabled}
        aria-label={`زيادة ${label}`}
        className={`${buttonSize} flex items-center justify-center rounded-s-xl text-ink-700 transition-colors hover:bg-ink-100 disabled:cursor-not-allowed disabled:text-ink-300`}
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

/** عرض قيمة كمية للقراءة فقط */
export function QuantityBadge({ value }: { value: number }) {
  return <span className="num font-bold">{formatNumber(value)}</span>;
}
