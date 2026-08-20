import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProductById, products } from "@/lib/products";
import { categoryMap } from "@/lib/categories";
import { formatPrice, formatNumber, getUnitPrice } from "@/lib/format";
import { Package } from "lucide-react";
import { ProductActions } from "@/components/ProductActions";
import { ProductGallery } from "@/components/ProductGallery";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductById(products.find((p) => p.slug === slug)?.id ?? "");
  if (!product) notFound();

  const category = categoryMap[product.categoryId];
  const related = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3);
  const unitPrice = getUnitPrice(product, "retail");

  return (
    <main>
      {/* Breadcrumb */}
      <nav aria-label="مسار التنقل" className="container-page pt-6 pb-2 text-xs text-ink-400">
        <ol className="flex items-center gap-2 flex-wrap">
          <li><Link href="/" className="hover:text-brand-700">الرئيسية</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/products" className="hover:text-brand-700">المنتجات</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/products" className="text-ink-600">{category?.name}</Link></li>
          <li aria-hidden="true">/</li>
          <li className="font-bold text-ink-800">{product.name}</li>
        </ol>
      </nav>

      {/* Product Details */}
      <section className="container-page py-6 sm:py-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14">
          {/* Images */}
          <ProductGallery
            name={product.name}
            images={product.images}
            featured={product.featured}
            inStock={product.inStock}
          />

          {/* Info */}
          <div>
            <span className="inline-block rounded-lg bg-brand-50 px-2.5 py-1 text-[11px] font-extrabold text-brand-700">{category?.name}</span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight leading-tight">{product.name}</h1>
            <p className="mt-4 text-sm text-ink-600 leading-relaxed">{product.description}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="num text-3xl font-extrabold text-brand-800">{formatPrice(unitPrice)}</span>
              <span className="text-sm text-ink-400">سعر القطعة</span>
            </div>

            {/* Features */}
            <ul className="mt-6 grid grid-cols-2 gap-2">
              {[
                { label: "الفئة العمرية", value: product.ageRange },
                { label: "الخامة", value: product.material },
                { label: "بلد المنشأ", value: product.origin },
                { label: "كود الصنف", value: product.sku },
              ].map((spec) => (
                <li key={spec.label} className="rounded-xl bg-ink-50 border border-ink-100 px-3 py-2.5 text-xs">
                  <span className="text-ink-400">{spec.label}:</span>{" "}
                  <span className="font-bold text-ink-800">{spec.value}</span>
                </li>
              ))}
            </ul>

            {/* Packaging */}
            <div className="mt-6 rounded-2xl bg-gradient-to-r from-brand-50 to-white border border-brand-100 p-4">
              <h3 className="text-sm font-extrabold text-brand-900 flex items-center gap-2">
                <Package className="size-4" aria-hidden="true" /> بيانات التعبئة
              </h3>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <span className="rounded-lg bg-white border border-brand-100 px-3 py-2"><span className="text-ink-400">الكرتونة:</span> <span className="num font-bold text-ink-800">{formatNumber(product.packaging.unitsPerCarton)} قطعة</span></span>
                <span className="rounded-lg bg-white border border-brand-100 px-3 py-2"><span className="text-ink-400">أقل جملة:</span> <span className="num font-bold text-ink-800">{formatNumber(product.packaging.minWholesaleUnits)} قطعة</span></span>
                <span className="rounded-lg bg-white border border-brand-100 px-3 py-2"><span className="text-ink-400">الوزن:</span> <span className="num font-bold text-ink-800">{product.packaging.cartonWeightKg} كجم</span></span>
                <span className="rounded-lg bg-white border border-brand-100 px-3 py-2"><span className="text-ink-400">الأبعاد:</span> <span className="font-bold text-ink-800">{product.packaging.cartonDimensions}</span></span>
              </div>
            </div>

            {/* Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1 rounded-full bg-ink-900 text-white px-3 py-1 text-[11px] font-bold">{badge}</span>
              ))}
            </div>

            {/* Actions */}
            <ProductActions product={product} />
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-extrabold text-ink-900">منتجات ذات صلة</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="group rounded-2xl bg-white border border-ink-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="relative h-36 w-full">
                    <Image
                      src={p.images[0]?.src ?? "/logo.svg"}
                      alt={p.images[0]?.alt ?? p.name}
                      fill
                      sizes="(min-width: 640px) 30vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                  <h3 className="mt-4 text-sm font-extrabold text-ink-900 group-hover:text-brand-800 transition-colors">{p.name}</h3>
                  <p className="mt-1 text-xs text-ink-500">{p.shortDescription}</p>
                  <span className="mt-3 block num text-base font-extrabold text-brand-800">{formatPrice(getUnitPrice(p, "retail"))}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
