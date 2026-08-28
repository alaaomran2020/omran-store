"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Clock,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  MessageSquare,
  PackageCheck,
  RefreshCcw,
  Camera,
  Search,
} from "lucide-react";
import { catalogProducts } from "@/lib/products";
import { categories } from "@/lib/categories";
import { buildInquiryUrl } from "@/lib/whatsapp";
import { useStore } from "@/context/StoreProvider";
import type { CategoryId } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Featured Categories Grid                                          */
/* ------------------------------------------------------------------ */
export function FeaturedCategories() {
  const { setCategoryFilter } = useStore();

  const focusCategory = (categoryId: CategoryId) => {
    setCategoryFilter(categoryId);
    window.setTimeout(
      () => document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      0
    );
  };

  return (
    <section className="py-10 sm:py-14">
      <div className="container-page">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1 text-[11px] font-extrabold text-brand-700">
            الأقسام
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">تصفّح حسب القسم</h2>
          <p className="mt-2 text-sm text-ink-500">اختر فئة لتصل إلى المنتجات المرتبطة بها مباشرة</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories
            .filter((cat) => catalogProducts.some((product) => product.categoryId === cat.id))
            .map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => focusCategory(cat.id)}
                className="group relative w-full overflow-hidden rounded-[2rem] border border-ink-200 bg-white p-6 text-start shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                <div
                  className="absolute top-0 end-0 size-32 rounded-full bg-gradient-to-br from-brand-50 to-transparent -translate-y-1/3 translate-x-1/4"
                  aria-hidden="true"
                />
                <div className="relative z-10">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 text-white shadow-lg shadow-brand-900/15">
                    <Sparkles className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold text-ink-900 tracking-tight">{cat.name}</h3>
                  <p className="mt-2 text-sm text-ink-500 leading-relaxed">{cat.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-extrabold text-brand-700 group-hover:text-brand-900 transition-colors">
                    تصفح القسم
                    <ArrowLeft className="size-4 rotate-180 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </div>
              </button>
            ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Brand Advantages / Trust                                         */
/* ------------------------------------------------------------------ */
export function BrandAdvantages() {
  const advantages = [
    { icon: Camera, title: "كتالوج مصوّر حقيقي", desc: "صور فعلية من منتجاتنا مع وصف واضح وكود لكل صنف لتسهيل الاستفسار." },
    { icon: ShieldCheck, title: "بيانات واضحة ومنظمة", desc: "اسم، وصف، فئة، كود، ومواصفات أولية — والسعر والتوفر عبر واتساب." },
    { icon: Search, title: "بحث وتصفية سهلة", desc: "ابحث بالاسم أو الكود، وصفّ حسب القسم والتوفر بسهولة." },
    { icon: MessageSquare, title: "استفسار مباشر عبر واتساب", desc: "زر واتساب في كل منتج يفتح رسالة جاهزة باسم المنتج وكوده." },
  ];

  return (
    <section className="py-10 sm:py-14">
      <div className="container-page">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white relative overflow-hidden shadow-2xl shadow-brand-900/20">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-24 -end-24 size-72 rounded-full bg-brand-400/10 blur-3xl" />
            <div className="absolute -bottom-24 -start-24 size-72 rounded-full bg-accent-400/10 blur-3xl" />
          </div>
          <div className="relative z-10 p-8 sm:p-14">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-extrabold text-brand-200 border border-white/10">
                لماذا الكتالوج؟
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">مميزات كتالوج عمران</h2>
              <p className="mt-3 text-sm text-brand-100 max-w-2xl mx-auto">تصفح المنتجات واستفسر عن السعر والتوفر عبر واتساب</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {advantages.map((adv) => (
                <div
                  key={adv.title}
                  className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-colors"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-lg shadow-brand-900/30">
                    <adv.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold">{adv.title}</h3>
                  <p className="mt-2 text-sm text-brand-100 leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Preview                                                       */
/* ------------------------------------------------------------------ */
export function FAQPreview() {
  const faqs = [
    { q: "كيف أتصفح المنتجات؟", a: "استخدم البحث بالأعلى أو تصفية الأقسام، ثم افتح تفاصيل أي منتج لرؤية الصور والوصف." },
    { q: "كيف أعرف السعر والتوفر؟", a: "اضغط زر الاستفسار عبر واتساب في بطاقة المنتج — تفتح رسالة جاهزة باسم المنتج وكوده." },
    { q: "هل يوجد شراء مباشر أو سلة؟", a: "لا — هذه النسخة كتالوج فقط للعرض والاستفسار عبر واتساب، بدون دفع إلكتروني." },
    { q: "هل الصور عالية الجودة؟", a: "نعم — جميع صور المنتجات بجودة عالية (دقة 1024×1024) معروضة من الكتالوج الفعلي، ويمكن طلب صور إضافية لأي منتج عبر واتساب." },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-10 sm:py-14">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1 text-[11px] font-extrabold text-brand-700">
              الأسئلة الشائعة
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">أسئلة حول الكتالوج</h2>
            <p className="mt-3 text-sm text-ink-500 leading-relaxed">إجابات سريعة عن طريقة عمل الكتالوج الجديد.</p>
            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-brand-900/15 transition-colors hover:bg-brand-800"
            >
              تواصل معنا لسؤال آخر
              <ArrowLeft className="size-4 rotate-180" aria-hidden="true" />
            </a>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-white border border-ink-100 shadow-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start"
                  aria-expanded={openIndex === i}
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
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Newsletter / CTA                                                  */
/* ------------------------------------------------------------------ */
export function Newsletter() {
  return (
    <section className="py-10 sm:py-14">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950 shadow-2xl shadow-brand-900/20">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 end-0 size-64 rounded-full bg-brand-500/15 blur-3xl" />
            <div className="absolute bottom-0 start-0 size-64 rounded-full bg-accent-500/15 blur-3xl" />
          </div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center p-8 sm:p-14">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">جاهز للاستفسار؟</h2>
              <p className="mt-3 text-sm text-brand-100 leading-relaxed">
                تصفح الكتالوج الآن وأرسل استفسارك عن أي منتج عبر واتساب — نرد خلال مواعيد العمل.
              </p>
            </div>
            <a
              href={buildInquiryUrl("الاستفسار عن منتجات كتالوج عمران للألعاب")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-extrabold text-brand-900 shadow-xl transition-colors hover:bg-brand-50 sm:w-auto sm:justify-self-end"
            >
              <MessageSquare className="size-4" aria-hidden="true" />
              تواصل عبر واتساب
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// نحتفظ بالتصديرات القديمة لتجنب كسر أي استيراد قديم — لكنها الآن تعيد مكونات كتالوج فقط
export function PromoBanners() {
  return null;
}
export function BestSellers() {
  return null;
}
export function NewArrivals() {
  return null;
}
export function FlashDeals() {
  return null;
}
export function TrendingProducts() {
  return null;
}
export function CustomerReviews() {
  return null;
}
