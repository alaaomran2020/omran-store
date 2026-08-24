import type { Metadata } from "next";
import { StructuredData } from "@/components/StructuredDataPages";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "الشروط والأحكام",
  description:
    "تعرف على الشروط والأحكام الخاصة بكتالوج عمران للألعاب — الأسعار استرشادية وتُؤكَّد قبل تنفيذ الطلب، ويتم تطبيق الأسعار السارية وقت تأكيد الطلب.",
  alternates: { canonical: absoluteUrl("/terms") },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: absoluteUrl("/terms"),
    title: "الشروط والأحكام | عمران للألعاب",
    description: "الشروط والأحكام الخاصة بكتالوج عمران للألعاب.",
  },
  twitter: { card: "summary_large_image", title: "الشروط والأحكام | عمران للألعاب", description: "الشروط والأحكام لكتالوج عمران للألعاب." },
};

export default function TermsPage() {
  return (
    <>
      <StructuredData />
      <main>
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white">
          <div className="container-page relative py-14 sm:py-20">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">الشروط والأحكام</h1>
          </div>
        </div>
        <section className="container-page py-12 sm:py-16">
          <div className="max-w-3xl space-y-6 text-sm text-ink-600 leading-relaxed">
            <p>جميع الأسعار المعروضة على الموقع استرشادية وقد تختلف حسب الكمية والتوقيت. يتم تأكيد السعر النهائي مع العميل قبل تنفيذ الطلب.</p>
            <p>يحق للمتجر تغيير الأسعار دون إشعار مسبق، ويتم تطبيق الأسعار السارية وقت تأكيد الطلب.</p>
            <p>التزام العميل بدفع قيمة الشحن قبل التوصيل ما لم يتم الاتفاق على غير ذلك.</p>
          </div>
        </section>
      </main>
    </>
  );
}
