import { CatalogSection } from "@/components/CatalogSection";
import { StructuredData } from "@/components/StructuredDataPages";

export default function ProductsPage() {
  return (
    <>
      <StructuredData type="catalog" />
      <div className="pt-4 pb-2">
        <div className="container-page">
          <div className="rounded-[2rem] bg-gradient-to-r from-brand-900 via-brand-800 to-brand-950 text-white px-8 py-10 shadow-2xl shadow-brand-900/10 relative overflow-hidden">
            <div className="absolute top-0 end-0 size-64 rounded-full bg-brand-400/10 blur-3xl -translate-y-1/3 translate-x-1/4" aria-hidden="true" />
            <h1 className="relative z-10 text-3xl sm:text-4xl font-extrabold tracking-tight">كتالوج المنتجات</h1>
            <p className="relative z-10 mt-3 text-sm text-brand-100">تصفح كل الأصناف بأسعار الجملة والقطاعي المعلنة</p>
          </div>
        </div>
      </div>
      <CatalogSection />
    </>
  );
}
