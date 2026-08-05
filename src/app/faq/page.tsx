"use client";

import { StructuredData } from "@/components/StructuredDataPages";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "ما هو الحد الأدنى للطلب بسعر الجملة؟", a: "يبدأ من دستة كاملة (12 قطعة) من نفس الصنف، مع توضيح الكمية على كل بطاقة منتج." },
  { q: "هل يمكن الشراء الفردي بسعر القطاعي؟", a: "نعم، نوفر سعر القطاعي على جميع الأصناف بدون حد أدنى للكمية." },
  { q: "ما مدة الشحن للمحافظات الأخرى؟", a: "من 2 إلى 5 أيام عمل حسب المحافظة، مع تحديد التكلفة قبل تنفيذ الطلب." },
  { q: "ما هي سياسة الإرجاع؟", a: "يمكن الإرجاع أو الاستبدال خلال 7 أيام من الاستلام بشرط سلامة المنتج." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <StructuredData />
      <main>
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white">
          <div className="container-page relative py-14 sm:py-20">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">الأسئلة الشائعة</h1>
            <p className="mt-3 text-sm text-brand-100">إجابات على أكثر الاستفسارات شيوعاً من عملائنا الكرام.</p>
          </div>
        </div>
        <section className="container-page py-12 sm:py-16">
          <div className="max-w-2xl space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-white border border-ink-100 shadow-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start"
                >
                  <span className="text-sm font-extrabold text-ink-900">{faq.q}</span>
                  <ChevronDown className={`size-5 text-brand-600 shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-40" : "max-h-0"}`}>
                  <div className="px-6 pb-5 text-sm text-ink-600 leading-relaxed">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
