import type { Metadata } from "next";
import { StructuredData } from "@/components/StructuredDataPages";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "سياسة الاستبدال والإرجاع",
  description:
    "تعرف على سياسة الإرجاع والاستبدال في كتالوج عمران للألعاب — يمكنك إرجاع أو استبدال المنتج خلال 7 أيام بشرط سلامة المنتج العبوة.",
  alternates: { canonical: absoluteUrl("/return") },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: absoluteUrl("/return"),
    title: "سياسة الاستبدال والإرجاع | عمران للألعاب",
    description: "سياسة الإرجاع والاستبدال خلال 7 أيام في كتالوج عمران للألعاب.",
  },
  twitter: { card: "summary_large_image", title: "سياسة الاستبدال والإرجاع | عمران للألعاب", description: "سياسة الإرجاع لكتالوج عمران للألعاب." },
};

export default function ReturnPage() {
  return (
    <>
      <StructuredData />
      <main>
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white">
          <div className="container-page relative py-14 sm:py-20">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">سياسة الاستبدال والإرجاع</h1>
          </div>
        </div>
        <section className="container-page py-12 sm:py-16">
          <div className="max-w-3xl">
            <h2 className="text-xl font-extrabold text-ink-900">فترة الإرجاع</h2>
            <p className="mt-3 text-sm text-ink-600 leading-relaxed">يمكنك إرجاع أو استبدال المنتج خلال 7 أيام من تاريخ الاستلام، بشرط أن يكون المنتج في حالته الأصلية مع العبوة.</p>
            <h2 className="mt-8 text-xl font-extrabold text-ink-900">إجراءات الإرجاع</h2>
            <p className="mt-3 text-sm text-ink-600 leading-relaxed">تواصل مع فريق المبيعات عبر واتساب أو الهاتف لتنسيق عملية الإرجاع أو الاستبدال. سيتم فحص المنتج قبل الموافقة على الإرجاع.</p>
          </div>
        </section>
      </main>
    </>
  );
}
