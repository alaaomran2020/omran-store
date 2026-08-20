"use client";

import { FormEvent, useEffect, useState } from "react";
import { Gift, MessageCircle, ShieldCheck, X } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const STORAGE_KEY = "omran-lead-capture-dismissed";

function hasDismissedLeadCapture() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function dismissLeadCapture() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // تستمر النافذة بالعمل حتى إذا كان التخزين المحلي محظوراً.
  }
}

function normalizePhone(value: string) {
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
  return value
    .split("")
    .map((character) => {
      const index = arabicDigits.indexOf(character);
      return index >= 0 ? String(index) : character;
    })
    .join("")
    .replace(/[\s().-]/g, "");
}

export function LeadCaptureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (hasDismissedLeadCapture()) return;

    const timer = window.setTimeout(() => setIsOpen(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const closeModal = () => {
    dismissLeadCapture();
    setIsOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedPhone = normalizePhone(phone);

    if (!/^\+?\d{10,15}$/.test(normalizedPhone)) {
      setError("اكتب رقم موبايل صحيحاً من 10 إلى 15 رقماً.");
      return;
    }

    const message = [
      "السلام عليكم، أرغب في التسجيل كعميل مميز.",
      `رقم الموبايل: ${normalizedPhone}`,
      "أوافق على التواصل معي لإرسال أحدث العروض والمنتجات الجديدة.",
      "من موقع عمران للألعاب.",
    ].join("\n");

    dismissLeadCapture();
    setIsOpen(false);
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/65 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-capture-title"
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-ink-950/30"
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 px-6 pb-8 pt-7 text-white sm:px-8">
          <div className="absolute -end-10 -top-16 size-48 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent-400 text-brand-950 shadow-lg">
              <Gift className="size-6" aria-hidden="true" />
            </div>
            <button
              type="button"
              onClick={closeModal}
              aria-label="إغلاق نافذة التسجيل"
              className="rounded-xl p-2 text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <h2 id="lead-capture-title" className="relative mt-5 text-2xl font-extrabold tracking-tight sm:text-3xl">
            خليك عميل مميز
          </h2>
          <p className="relative mt-2 text-sm leading-relaxed text-brand-100">
            سجل رقم موبايلك عشان يوصلك كل جديد من العروض والمنتجات قبل أي حد.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6 sm:px-8">
          <div>
            <label htmlFor="lead-phone" className="mb-2 block text-sm font-extrabold text-ink-900">
              رقم الموبايل
            </label>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              dir="ltr"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
                setError("");
              }}
              placeholder="01xxxxxxxxx"
              required
              autoFocus
              className="w-full rounded-2xl border border-ink-200 bg-ink-50 px-4 py-3.5 text-left text-base text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
            />
            {error && <p className="mt-2 text-xs font-bold text-rose-600" role="alert">{error}</p>}
          </div>

          <div className="flex items-start gap-2 rounded-xl bg-brand-50 px-3.5 py-3 text-xs leading-relaxed text-brand-900">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-700" aria-hidden="true" />
            <p>بالضغط على الزر، توافق على التواصل معك لإرسال عروض عمران للألعاب الجديدة.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row-reverse">
            <button
              type="submit"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-700 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-brand-900/20 transition-all hover:-translate-y-0.5 hover:bg-brand-800"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              سجّلني عبر واتساب
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-2xl px-5 py-3.5 text-sm font-bold text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-800"
            >
              ليس الآن
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
