import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProductById, products } from "@/lib/products";
import { categoryMap } from "@/lib/categories";
import { formatPrice, formatNumber, getUnitPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import { ArrowLeft, Check, Share2, Star, Truck, ShieldCheck, Package, Heart } from "lucide-react";

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
          <li><a href="/" className="hover:text-brand-700">الرئيسية</a></li>
          <li>/</li>
          <li><a href="#products" className="hover:text-brand-700">المنتجات</a></li>
          <li>/</li>
          <li><a href="#" className="text-ink-600">{category?.name}</a></li>
          <li>/</li>
          <li className="font-bold text-ink-800">{product.name}</li>
        </ol>
      </nav>

      {/* Product Details */}
      <section className="container-page py-6 sm:py-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-ink-50 to-white border border-ink-200 shadow-sm aspect-[4/3]">
              <img
                src={product.images[0]?.src ?? "/logo.svg"}
                alt={product.images[0]?.alt ?? product.name}
                className="w-full h-full object-contain p-6 sm:p-10"
              />
              <div className="absolute top-4 start-4 flex flex-col gap-2">
                {product.featured && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-accent-500 px-2.5 py-1 text-[10px] font-extrabold text-white">الأكثر طلباً</span>
                )}
                {!product.inStock && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-ink-700 px-2.5 py-1 text-[10px] font-extrabold text-white">غير متوفر</span>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <a key={idx} href="#" className="relative rounded-2xl overflow-hidden border-2 border-brand-200 bg-white w-20 h-20 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-contain p-2" />
                </a>
              ))}
            </div>
          </div>

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
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={siteConfig.phoneHref} className="inline-flex items-center gap-2 rounded-2xl bg-brand-700 px-6 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-brand-900/15 hover:bg-brand-800 transition-all hover:-translate-y-0.5">
                <Truck className="size-4" aria-hidden="true" />
                طلب عبر واتساب
              </a>
              <a href="#" className="inline-flex items-center gap-2 rounded-2xl bg-ink-900 px-6 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-ink-900/15 hover:bg-ink-950 transition-all hover:-translate-y-0.5">
                شراء الآن
              </a>
              <button type="button" aria-label="مشاركة" className="inline-flex items-center justify-center rounded-2xl bg-ink-100 px-4 py-3.5 text-ink-700 hover:bg-ink-200 transition-colors">
                <Share2 className="size-4" aria-hidden="true" />
              </button>
              <button type="button" aria-label="إضافة للمفضلة" className="inline-flex items-center justify-center rounded-2xl bg-rose-50 px-4 py-3.5 text-rose-600 hover:bg-rose-100 transition-colors">
                <Heart className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-extrabold text-ink-900">منتجات ذات صلة</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="group rounded-2xl bg-white border border-ink-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <img src={p.images[0]?.src ?? "/logo.svg"} alt={p.name} className="w-full h-36 object-contain" />
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
