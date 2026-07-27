"use client";

import { ArrowLeft, MessageCircle, PackageCheck, Truck } from "lucide-react";
import { products } from "@/lib/products";
import { categories } from "@/lib/categories";
import { formatNumber } from "@/lib/format";
import { buildInquiryUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/site";

const highlights = [
  {
    icon: PackageCheck,
    title: "توريد بالكرتونة",
    body: "كل صنف موضح عليه عدد القطع بالكرتونة والحد الأدنى لسعر الجملة.",
  },
  {
    icon: Truck,
    title: "شحن لجميع المحافظات",
    body: "التعاقد مع شركات شحن معتمدة، وتحديد قيمة الشحن قبل تنفيذ الطلب.",
  },
  {
    icon: MessageCircle,
    title: "طلب مباشر عبر واتساب",
    body: "تجهيز الطلب من الموقع وإرساله كرسالة مفصلة لفريق المبيعات.",
  },
];

/** القسم الافتتاحي للصفحة الرئيسية */
export function Hero() {
  const stats = [
    { value: `${formatNumber(products.length)}+`, label: "صنف متاح للتوريد" },
    { value: formatNumber(categories.length), label: "أقسام رئيسية" },
    { value: "24 ساعة", label: "متوسط الرد على طلبات الجملة" },
  ];

  return (
    <section className="relative overflow-hidden bg-brand-900 text-white">
      {/* عناصر خلفية هادئة */}
      <div
        className="pointer-events-none absolute -top-24 -start-24 size-80 rounded-full bg-brand-700/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -end-16 size-96 rounded-full bg-accent-500/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative py-14 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
              توريد وتوزيع — جملة وقطاعي
            </span>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {siteConfig.name} لألعاب الأطفال والبالونات والهدايا
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-100 sm:text-lg">
              نوفّر للمحلات ومنافذ التوزيع تشكيلة ثابتة من ألعاب الأطفال والعرائس
              والألعاب التعليمية ومستلزمات المناسبات، بأسعار جملة محددة وكميات
              تعبئة واضحة. كما نخدم الأفراد بأسعار القطاعي على نفس الأصناف.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#products"
                className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand-900 transition-colors hover:bg-brand-50"
              >
                تصفح الكتالوج
                <ArrowLeft className="size-4" aria-hidden="true" />
              </a>
              <a
                href={buildInquiryUrl("قائمة أسعار الجملة والأصناف المتاحة")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/20"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                طلب قائمة أسعار الجملة
              </a>
            </div>

            <dl className="mt-9 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="num block text-2xl font-extrabold text-accent-300">
                      {stat.value}
                    </span>
                    <span className="mt-0.5 block text-xs text-brand-100">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* بطاقات المزايا */}
          <ul className="grid gap-3">
            {highlights.map((item) => (
              <li
                key={item.title}
                className="flex gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <item.icon className="size-5 text-accent-300" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-sm font-bold">{item.title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-brand-100">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
