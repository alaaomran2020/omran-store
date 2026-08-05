"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MessageCircle,
  PackageCheck,
  Truck,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Star,
} from "lucide-react";
import { products } from "@/lib/products";
import { categories } from "@/lib/categories";
import { formatNumber } from "@/lib/format";
import { buildInquiryUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/site";

const slides = [
  {
    title: "ألعاب أطفال بجودة فائقة وأسعار تنافسية",
    subtitle: "أكبر تشكيل ألعاب في طنطا — جملة وقطاعي — شحن لجميع المحافظات",
    cta: "تصفح الكتالوج",
    ctaHref: "#products",
    accent: "from-brand-800 via-brand-700 to-brand-900",
    glow: "bg-brand-400/20",
    image: "/products/vehicles-01-a.svg",
    stat: { value: "16+", label: "صنف متاح" },
  },
  {
    title: "عرائس ودمى ومجسمات بأعلى جودة",
    subtitle: "تشكيلة ثابتة من العرائس والدببة والدمى القطنية — هدايا تناسب كل الأعمار",
    cta: "عرض منتجات الدمى",
    ctaHref: "#products",
    accent: "from-rose-800 via-rose-700 to-rose-900",
    glow: "bg-rose-400/20",
    image: "/products/dolls-01-a.svg",
    stat: { value: "4", label: "أقسام متنوعة" },
  },
  {
    title: "ألعاب تعليمية وتنمية مهارات للأطفال",
    subtitle: "مكعبات تركيب، بازل حروف، لوحات رسم مغناطيسية — كل ما يحتاجه طفلك للتعلم",
    cta: "اكتشف الألعاب التعليمية",
    ctaHref: "#products",
    accent: "from-teal-800 via-teal-700 to-teal-900",
    glow: "bg-teal-400/20",
    image: "/products/educational-01-a.svg",
    stat: { value: "100%", label: "ضمان جودة" },
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current]!;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className={`absolute -top-32 -start-32 size-[28rem] rounded-full blur-[120px] opacity-40 ${slide.glow}`} />
        <div className={`absolute -bottom-40 -end-32 size-[32rem] rounded-full blur-[140px] opacity-30 ${slide.glow}`} />
        <div className="absolute top-1/4 end-[15%] size-3 rounded-full bg-white/20 animate-pulse" />
        <div className="absolute bottom-1/3 start-[10%] size-2 rounded-full bg-white/10 animate-pulse delay-700" />
      </div>

      <div className="container-page relative py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Text */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs font-extrabold tracking-wide mb-5">
              <Sparkles className="size-3.5 text-accent-300" aria-hidden="true" />
              <span>متجر عمران للألعاب — توريد بالجملة والقطاعي</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight text-balance">
              <span className="block">{slide.title}</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-brand-100 leading-relaxed max-w-xl">
              {slide.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={slide.ctaHref}
                className="inline-flex items-center gap-2.5 rounded-2xl bg-white px-7 py-4 text-sm font-extrabold text-brand-900 shadow-xl shadow-black/10 hover:bg-brand-50 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>{slide.cta}</span>
                <ArrowLeft className="size-4 rotate-180" aria-hidden="true" />
              </a>
              <a
                href={buildInquiryUrl("طلب قائمة أسعار الجملة")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-sm font-extrabold text-white backdrop-blur-sm hover:bg-white/15 hover:-translate-y-0.5 transition-all duration-200"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                طلب أسعار الجملة
              </a>
            </div>

            {/* Stats */}
            <dl className="mt-10 flex gap-8 lg:gap-12 border-t border-white/15 pt-6">
              <div>
                <dt className="sr-only">عدد المنتجات</dt>
                <dd>
                  <span className="num block text-3xl font-extrabold text-accent-300">{formatNumber(products.length)}+</span>
                  <span className="block text-xs text-brand-200 mt-1">صنف متاح للتوريد</span>
                </dd>
              </div>
              <div>
                <dt className="sr-only">الأقسام</dt>
                <dd>
                  <span className="num block text-3xl font-extrabold text-white">{formatNumber(categories.length)}</span>
                  <span className="block text-xs text-brand-200 mt-1">أقسام تغطي كل احتياجاتك</span>
                </dd>
              </div>
              <div className="hidden sm:block">
                <dt className="sr-only">متوسط الرد</dt>
                <dd>
                  <span className="num block text-3xl font-extrabold text-white">24</span>
                  <span className="block text-xs text-brand-200 mt-1">ساعة متوسط الرد</span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Hero Image / Card */}
          <div className="relative">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 ring-1 ring-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
              <img
                src={slide.image}
                alt="منتجات عمران للألعاب"
                className="w-full h-auto object-contain p-6 sm:p-8"
                loading="eager"
              />
              {/* Floating badges */}
              <div className="absolute top-6 start-6 flex flex-col gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 backdrop-blur-md px-3 py-1.5 text-xs font-extrabold text-white border border-white/10">
                  <ShieldCheck className="size-3.5 text-accent-300" aria-hidden="true" />
                  ضمان جودة
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 backdrop-blur-md px-3 py-1.5 text-xs font-extrabold text-white border border-white/10">
                  <PackageCheck className="size-3.5 text-teal-300" aria-hidden="true" />
                  أسعار معلنة
                </span>
              </div>
              <div className="absolute bottom-6 end-6">
                <a href="#products" className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-brand-900 shadow-xl hover:bg-brand-50 hover:-translate-y-0.5 transition-all">
                  تصفح الكتالوج
                  <ArrowLeft className="size-4 rotate-180" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex items-center gap-3 mt-8 lg:mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`انتقال إلى الشريحة ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-10 bg-white shadow-lg shadow-white/30" : "w-4 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
