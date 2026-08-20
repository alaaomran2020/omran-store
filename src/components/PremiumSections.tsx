"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Star,
  Clock,
  ShieldCheck,
  Truck,
  Sparkles,
  ChevronDown,
  Heart,
  CheckCircle2,
  MessageSquare,
  PackageCheck,
  Users,
  Award,
  RefreshCcw,
} from "lucide-react";
import { products } from "@/lib/products";
import { categories } from "@/lib/categories";
import { ProductCard } from "@/components/ProductCard";
import { buildInquiryUrl } from "@/lib/whatsapp";
import { formatPrice, formatNumber } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import type { Product } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Promotional Banner Cards                                          */
/* ------------------------------------------------------------------ */
export function PromoBanners() {
  const banners = [
    {
      title: "عروض موسمية",
      desc: "خصومات تصل إلى 30% على ألعاب الحركة والتعليمية",
      cta: "اكتشف العروض",
      href: "#products",
      bg: "from-rose-700 to-rose-900",
      icon: Sparkles,
      accent: "text-rose-300",
    },
    {
      title: "ألعاب تعليمية",
      desc: "تنمية مهارات طفلك من عمر سنة فأكثر",
      cta: "تصفح القسم",
      href: "#products",
      bg: "from-brand-700 to-brand-900",
      icon: Award,
      accent: "text-brand-300",
    },
    {
      title: "مستلزمات حفلات",
      desc: "كل ما تحتاجه لأعياد الميلاد والمناسبات",
      cta: "عرض المنتجات",
      href: "#products",
      bg: "from-teal-700 to-teal-900",
      icon: PackageCheck,
      accent: "text-teal-300",
    },
  ];

  return (
    <section className="py-8 sm:py-12">
      <div className="container-page">
        <div className="grid gap-4 md:grid-cols-3">
          {banners.map((b) => (
            <a
              key={b.title}
              href={b.href}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br shadow-xl shadow-ink-900/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${b.bg} opacity-90`} />
              <div className="absolute -end-12 -top-12 size-40 rounded-full bg-white/10 blur-2xl group-hover:scale-125 transition-transform duration-500" aria-hidden="true" />
              <div className="relative z-10 p-7 sm:p-8 text-white">
                <span className={`inline-flex items-center gap-2 rounded-xl bg-white/15 px-3 py-1 text-xs font-extrabold backdrop-blur-sm ${b.accent}`}>
                  <b.icon className="size-3.5" aria-hidden="true" />
                  عرض خاص
                </span>
                <h3 className="mt-4 text-xl sm:text-2xl font-extrabold tracking-tight">{b.title}</h3>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">{b.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white text-brand-900 px-4 py-2.5 text-sm font-extrabold shadow-lg hover:bg-brand-50 transition-colors">
                  {b.cta}
                  <ArrowLeft className="size-4 rotate-180" aria-hidden="true" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured Categories Grid                                        */
/* ------------------------------------------------------------------ */
export function FeaturedCategories() {
  return (
    <section className="py-10 sm:py-14">
      <div className="container-page">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1 text-[11px] font-extrabold text-brand-700">الأقسام</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">تصفّح حسب القسم</h2>
          <p className="mt-2 text-sm text-ink-500">أقسام متنوعة تغطي كل احتياجات متجرك</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href="#products"
              className="group relative overflow-hidden rounded-[2rem] bg-white border border-ink-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="absolute top-0 end-0 size-32 rounded-full bg-gradient-to-br from-brand-50 to-transparent -translate-y-1/3 translate-x-1/4" aria-hidden="true" />
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Best Sellers                                                     */
/* ------------------------------------------------------------------ */
export function BestSellers() {
  const best = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-10 sm:py-14">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-3.5 py-1 text-[11px] font-extrabold text-accent-600">الأكثر مبيعاً</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">أفضل المنتجات مبيعاً</h2>
            <p className="mt-2 text-sm text-ink-500">الأصناف التي تحقق أعلى معدلات دوران في المحلات</p>
          </div>
          <a href="#products" className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-extrabold text-white hover:bg-brand-800 transition-colors shadow-lg shadow-brand-900/15">
            عرض الكل
            <ArrowLeft className="size-4 rotate-180" aria-hidden="true" />
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {best.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={() => {}} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  New Arrivals                                                     */
/* ------------------------------------------------------------------ */
export function NewArrivals() {
  const arrivals = products.slice(0, 4);

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-ink-50/50 to-white">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1 text-[11px] font-extrabold text-brand-700">أحدث الإضافات</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">وصل حديثاً</h2>
            <p className="mt-2 text-sm text-ink-500">أحدث الأصناف المضافة للكتالوج</p>
          </div>
          <a href="#products" className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-extrabold text-white hover:bg-brand-800 transition-colors shadow-lg shadow-brand-900/15">
            عرض الكل
            <ArrowLeft className="size-4 rotate-180" aria-hidden="true" />
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {arrivals.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={() => {}} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Seasonal / Flash Deals                                           */
/* ------------------------------------------------------------------ */
export function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 45, s: 30 });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        let s = prev.s - 1;
        let m = prev.m;
        let h = prev.h;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="py-10 sm:py-14">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 shadow-2xl shadow-brand-900/20">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 -end-20 size-80 rounded-full bg-brand-400/10 blur-3xl" />
            <div className="absolute -bottom-20 -start-20 size-80 rounded-full bg-accent-400/10 blur-3xl" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center p-8 sm:p-12 lg:p-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent-500/20 px-3.5 py-1 text-xs font-extrabold text-accent-300 border border-accent-400/20">
                <Clock className="size-3.5" aria-hidden="true" />
                عرض لفترة محدودة
              </span>
              <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                عروض موسمية <span className="text-accent-300">لا تُفوّت</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-brand-100 leading-relaxed max-w-md">
                خصومات خاصة على ألعاب الحركة والعرائس والألعاب التعليمية. العرض ينتهي قريباً — احجز أصنافك الآن.
              </p>

              <div className="mt-8 flex gap-3">
                <div className="text-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-3 min-w-[72px]">
                  <span className="num block text-2xl font-extrabold text-white">{String(timeLeft.h).padStart(2, "0")}</span>
                  <span className="text-[10px] text-brand-200 font-bold">ساعة</span>
                </div>
                <div className="text-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-3 min-w-[72px]">
                  <span className="num block text-2xl font-extrabold text-white">{String(timeLeft.m).padStart(2, "0")}</span>
                  <span className="text-[10px] text-brand-200 font-bold">دقيقة</span>
                </div>
                <div className="text-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-3 min-w-[72px]">
                  <span className="num block text-2xl font-extrabold text-white">{String(timeLeft.s).padStart(2, "0")}</span>
                  <span className="text-[10px] text-brand-200 font-bold">ثانية</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <a href="#products" className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-base font-extrabold text-brand-900 shadow-xl hover:bg-brand-50 hover:-translate-y-0.5 transition-all w-full lg:w-auto">
                تصفح العروض
                <ArrowLeft className="size-4 rotate-180" aria-hidden="true" />
              </a>
              <p className="text-xs text-brand-200">عدد محدود من الأصناف — احجز طلبك فوراً</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Trending Products                                                 */
/* ------------------------------------------------------------------ */
export function TrendingProducts() {
  const trending = products.filter((p) => p.inStock && p.featured).slice(0, 4);

  return (
    <section className="py-10 sm:py-14">
      <div className="container-page">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3.5 py-1 text-[11px] font-extrabold text-teal-700">الأكثر رواجاً</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">منتجات رائجة حالياً</h2>
          <p className="mt-2 text-sm text-ink-500">ما يطلبه العملاء الأكثر حالياً من الكتالوج</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={() => {}} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Customer Reviews                                                  */
/* ------------------------------------------------------------------ */
export function CustomerReviews() {
  const reviews = [
    {
      name: "محمد عبد الله",
      role: "صاحب محل ألعاب في طنطا",
      text: "منذ أكثر من سنتين وأنا أتعامل مع عمران للألعاب، الأسعار واضحة والجودة ثابتة. أنصح به لكل تاجر.",
      rating: 5,
    },
    {
      name: "سارة محمود",
      role: "أم لطفلين",
      text: "جودة المنتجات ممتازة والتوصيل سريع جداً. الدمية القطنية التي اشتريتها لطفلي لا تزال جديدة بعد أشهر.",
      rating: 5,
    },
    {
      name: "أحمد حسن",
      role: "منظم حفلات",
      text: "طقم تجهيز الحفلة من عمران يوفر عليّ عناء تجميع الأصناف من أكثر من مكان. أنصح به بقوة.",
      rating: 4,
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-ink-50/50 to-white">
      <div className="container-page">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1 text-[11px] font-extrabold text-brand-700">آراء العملاء</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">ما يقوله عملاؤنا</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-[2rem] bg-white border border-ink-100 p-7 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${i < r.rating ? "text-amber-400 fill-amber-400" : "text-ink-200"}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-4 text-sm text-ink-700 leading-relaxed">&ldquo;{r.text}&rdquo;</blockquote>
              <div className="mt-5 pt-5 border-t border-ink-100 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-brand-700 text-white text-xs font-extrabold">{r.name[0]}</span>
                <div>
                  <p className="text-sm font-extrabold text-ink-900">{r.name}</p>
                  <p className="text-[11px] text-ink-400">{r.role}</p>
                </div>
              </div>
            </div>
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
    { icon: Truck, title: "شحن معتمد", desc: "نتعاون مع شركات شحن موثوقة ونحدد لك قيمة الشحن قبل الطلب." },
    { icon: ShieldCheck, title: "ضمان جودة", desc: "كل منتج يتم فحصه قبل التوريد لضمان أعلى معايير الجودة." },
    { icon: RefreshCcw, title: "استبدال سهل", desc: "سياسة استبدال وإرجاع واضحة خلال 7 أيام من الاستلام." },
    { icon: MessageSquare, title: "دعم سريع", desc: "فريق مبيعات متاح للرد خلال ساعات العمل الرسمية عبر واتساب." },
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
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-extrabold text-brand-200 border border-white/10">لماذا نحن؟</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">مميزات التعامل معنا</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {advantages.map((adv) => (
                <div key={adv.title} className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-colors">
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
    { q: "ما هو الحد الأدنى للطلب بسعر الجملة؟", a: "يبدأ من دستة كاملة (12 قطعة) من نفس الصنف، مع توضيح الكمية على كل بطاقة منتج." },
    { q: "هل يمكن الشراء الفردي بسعر القطاعي؟", a: "نعم، نوفر سعر القطاعي على جميع الأصناف بدون حد أدنى للكمية." },
    { q: "ما مدة الشحن للمحافظات الأخرى؟", a: "من 2 إلى 5 أيام عمل حسب المحافظة، مع تحديد التكلفة قبل تنفيذ الطلب." },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-10 sm:py-14">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1 text-[11px] font-extrabold text-brand-700">الأسئلة الشائعة</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">أسئلة يتكرر طرحها</h2>
            <p className="mt-3 text-sm text-ink-500 leading-relaxed">إجابات سريعة على أكثر الاستفسارات التي تصلنا من التجار والأفراد يومياً.</p>
            <a href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-brand-900/15 transition-colors hover:bg-brand-800">
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
                  <ChevronDown className={`size-5 text-brand-600 shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`} aria-hidden="true" />
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
/*  Newsletter                                                       */
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
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">احصل على أحدث العروض</h2>
              <p className="mt-3 text-sm text-brand-100 leading-relaxed">تواصل معنا مباشرة لمعرفة الأصناف الجديدة وعروض الجملة والقطاعي المتاحة حالياً.</p>
            </div>
            <a
              href={buildInquiryUrl("أحدث العروض والمنتجات الجديدة")}
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
