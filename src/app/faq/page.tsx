import type { Metadata } from "next";
import { StructuredData } from "@/components/StructuredDataPages";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/lib/faqs";
import { faqJsonLd, absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة",
  description:
    "إجابات على أكثر الاستفسارات شيوعاً حول أسعار الجملة والقطاعي، مدة الشحن للمحافظات، وسياسة الإرجاع في كتالوج عمران للألعاب.",
  alternates: { canonical: absoluteUrl("/faq") },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: absoluteUrl("/faq"),
    siteName: siteConfig.name,
    title: "الأسئلة الشائعة | عمران للألعاب",
    description: "إجابات سريعة حول الحد الأدنى للطلب، الشحن، والسياسات من كتالوج عمران للألعاب.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: { card: "summary_large_image", title: "الأسئلة الشائعة | عمران للألعاب", description: siteConfig.description, images: ["/og-image.png"] },
};

export default function FAQPage() {
  return (
    <>
      <StructuredData type="none" />
      <JsonLd data={faqJsonLd(faqs)} />
      <main>
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white">
          <div className="container-page relative py-14 sm:py-20">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">الأسئلة الشائعة</h1>
            <p className="mt-3 text-sm text-brand-100">إجابات على أكثر الاستفسارات شيوعاً من عملائنا الكرام.</p>
          </div>
        </div>
        <section className="container-page py-12 sm:py-16">
          <FaqAccordion faqs={faqs} />
        </section>
      </main>
    </>
  );
}
