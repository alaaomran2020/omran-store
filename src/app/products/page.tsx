import type { Metadata } from "next";
import { CatalogGrid } from "@/components/CatalogGrid";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "كتالوج المنتجات",
  description: `تصفح كل أصناف ${siteConfig.name} بأسعار الجملة والقطاعي — سيارات وعرائس وألعاب تعليمية وبالونات وهدايا.`,
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <div className="container-page py-8">
      <h1 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
        كتالوج المنتجات
      </h1>
      <p className="mt-1.5 max-w-2xl text-sm text-ink-600">
        بدّل بين سعر الجملة والقطاعي، وصفِّ حسب القسم — كل الأسعار معلنة بدون
        رسوم خفية.
      </p>

      <div className="mt-6">
        <CatalogGrid />
      </div>
    </div>
  );
}
