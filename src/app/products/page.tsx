import type { Metadata } from "next";
import { CatalogSection } from "@/components/CatalogSection";
import { StructuredData } from "@/components/StructuredDataPages";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "كتالوج ألعاب الأطفال",
  description:
    "كتالوج عمران للألعاب — تصفّح 12 منتجاً حقيقياً لعبة أطفال وعرائس وألعاب تعليمية وهدايا وبالونات. استفسر عن السعر والتوفر عبر واتساب مباشرة.",
  alternates: { canonical: absoluteUrl("/products") },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: absoluteUrl("/products"),
    siteName: siteConfig.name,
    title: "كتالوج ألعاب الأطفال | عمران للألعاب",
    description:
      "كتالوج مصوّر بألعاب أطفال وعرائس وألعاب تعليمية وهدايا وبالونات — 12 منتجاً بصور حقيقية، استفسر عبر واتساب.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "كتالوج ألعاب الأطفال | عمران للألعاب",
    description: "تصفّح الكتالوج واستفسر عن أي منتج عبر واتساب مباشرة.",
    images: ["/og-image.png"],
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
            <h1 className="relative z-10 text-3xl sm:text-4xl font-extrabold tracking-tight">كتالوج عمران للألعاب</h1>
            <p className="relative z-10 mt-3 text-sm text-brand-100 max-w-2xl leading-relaxed">
              كتالوج مصوّر — 12 منتجاً بصور حقيقية. تصفح الأقسام، استخدم البحث، واستفسر عن أي منتج عبر واتساب مباشرة.
              لا يوجد سلة أو دفع إلكتروني في هذه النسخة.
            </p>
          </div>
        </div>
      </div>
      <CatalogSection />
    </>
  );
}
