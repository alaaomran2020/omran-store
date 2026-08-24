"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Faq } from "@/lib/faqs";

/** أكورديون الأسئلة الشائعة — مكوّن تفاعلي (Client) مع بيانات منظمة في الصفحة الخادمية. */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-2xl space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="rounded-2xl bg-white border border-ink-100 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start"
          >
            <span className="text-sm font-extrabold text-ink-900">{faq.q}</span>
            <ChevronDown
              className={`size-5 text-brand-600 shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-40" : "max-h-0"}`}>
            <div className="px-6 pb-5 text-sm text-ink-600 leading-relaxed">{faq.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
