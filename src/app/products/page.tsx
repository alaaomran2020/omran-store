import type { Metadata } from "next";
import { CatalogSection } from "@/components/CatalogSection";
import { StructuredData } from "@/components/StructuredDataPages";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "كتالوج ألعاب الأطفال والهدايا",
  description:
    "تصفح كتالوج عمران للألعاب في طنطا: ألعاب تعليمية، عرائس ودمى، سيارات وألعاب حركة، وبالونات وهدايا. استفسر عبر واتساب عن التفاصيل والسعر.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "كتالوج ألعاب الأطفال والهدايا | عمران للألعاب",
    description:
      "كتالوج عمران للألعاب في طنطا — تصفح المنتجات واستفسر عبر واتساب.",
    url: "/products",
    type: "website",
  },
};

export default function ProductsPage() {
  return (
    <>
      <StructuredData type="catalog" />
      <div className="pt-4 pb-2">
        <div className="container-page">
          <div className="rounded-[2rem] bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white px-8 py-10 shadow-2xl shadow-brand-900/10 relative overflow-hidden">
            <div className="absolute top-0 end-0 size-64 rounded-full bg-brand-400/10 blur-3xl -translate-y-1/3 translate-x-1/4" aria-hidden="true" />
            <div className="absolute bottom-0 start-0 size-48 rounded-full bg-accent-400/10 blur-3xl" aria-hidden="true" />
            <h1 className="relative z-10 text-3xl sm:text-4xl font-extrabold tracking-tight">ألعاب أطفال وهدايا للاستفسار في طنطا</h1>
            <p className="relative z-10 mt-3 text-sm text-brand-100 max-w-2xl leading-relaxed">
              كتالوج مصوّر قابل للتحديث — 12 سجلاً تجريبياً وصوراً توضيحية مؤقتة. تصفح الأقسام، استخدم البحث، واستفسر عن أي منتج عبر واتساب مباشرة.
              لا يوجد سلة أو دفع إلكتروني في هذه النسخة.
            </p>
          </div>
        </div>
      </div>
      <CatalogSection />
    </>
  );
}
