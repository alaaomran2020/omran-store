import type { Metadata } from "next";
import { StructuredData } from "@/components/StructuredDataPages";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "سياسة الشحن والتوصيل",
  description:
    "تعرف على سياسة الشحن في كتالوج عمران للألعاب — نتعاون مع شركات شحن موثوقة ونحدد قيمة الشحن ومدة التسليم قبل تنفيذ الطلب في جميع المحافظات.",
  alternates: { canonical: absoluteUrl("/shipping") },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: absoluteUrl("/shipping"),
    title: "سياسة الشحن والتوصيل | عمران للألعاب",
    description: "شحن لجميع محافظات مصر من 2 إلى 5 أيام عمل مع تحديد التكلفة قبل تنفيذ الطلب.",
  },
  twitter: { card: "summary_large_image", title: "سياسة الشحن والتوصيل | عمران للألعاب", description: "سياسة الشحن لكتالوج عمران للألعاب." },
};

export default function ShippingPage() {
  return (
    <>
      <StructuredData />
      <main>
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white">
          <div className="container-page relative py-14 sm:py-20">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">سياسة الشحن</h1>
          </div>
        </div>
        <section className="container-page py-12 sm:py-16">
          <div className="max-w-3xl">
            <h2 className="text-xl font-extrabold text-ink-900">شحن لجميع المحافظات</h2>
            <p className="mt-3 text-sm text-ink-600 leading-relaxed">نتعاون مع شركات شحن موثوقة ونحدد لك قيمة الشحن ومدة التسليم قبل تنفيذ الطلب. مدة التسليم من 2 إلى 5 أيام عمل حسب المحافظة.</p>
            <h2 className="mt-8 text-xl font-extrabold text-ink-900">التغليف</h2>
            <p className="mt-3 text-sm text-ink-600 leading-relaxed">جميع المنتجات تُورَّد في عبواتها الأصلية مع بطاقة تعريفية واضحة. يتم فحص العبوة قبل الشحن للتأكد من سلامتها.</p>
          </div>
        </section>
      </main>
    </>
  );
}
