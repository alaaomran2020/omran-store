import type { Metadata } from "next";
import { StructuredData } from "@/components/StructuredDataPages";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description:
    "تعرف على كيفية جمع وحماية بياناتك عند التواصل مع كتالوج عمران للألعاب. نجمع بيانات الاتصال فقط لتنسيق الطلبات والشحن ولا نشاركها مع أي طرف ثالث.",
  alternates: { canonical: absoluteUrl("/privacy") },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: absoluteUrl("/privacy"),
    title: "سياسة الخصوصية | عمران للألعاب",
    description: "كيفية جمع وحماية بياناتك في كتالوج عمران للألعاب.",
  },
  twitter: { card: "summary_large_image", title: "سياسة الخصوصية | عمران للألعاب", description: "سياسة الخصوصية لكتالوج عمران للألعاب." },
};

export default function PrivacyPage() {
  return (
    <>
      <StructuredData />
      <main>
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white">
          <div className="container-page relative py-14 sm:py-20">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">سياسة الخصوصية</h1>
          </div>
        </div>
        <section className="container-page py-12 sm:py-16">
          <div className="max-w-3xl">
            <h2 className="text-xl font-extrabold text-ink-900">جمع البيانات</h2>
            <p className="mt-3 text-sm text-ink-600 leading-relaxed">نقوم بجمع بيانات الاتصال فقط لتنسيق الطلبات والشحن. لا نشارك بياناتك مع أي طرف ثالث دون موافقتك الصريحة.</p>
            <h2 className="mt-8 text-xl font-extrabold text-ink-900">حماية البيانات</h2>
            <p className="mt-3 text-sm text-ink-600 leading-relaxed">نستخدم بروتوكولات آمنة لحماية بيانات العملاء أثناء عملية الطلب والدفع.</p>
          </div>
        </section>
      </main>
    </>
  );
}
