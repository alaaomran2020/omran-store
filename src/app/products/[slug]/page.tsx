import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { catalogProducts } from "@/lib/products";
import { categoryMap } from "@/lib/categories";
import { ProductActions } from "@/components/ProductActions";
import { ProductGallery } from "@/components/ProductGallery";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd, productJsonLd, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { buildInquiryUrl } from "@/lib/whatsapp";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

function getCatalogProduct(slug: string) {
  return catalogProducts.find((product) => product.slug === slug);
}

export async function generateStaticParams() {
  return catalogProducts.map((p) => ({ slug: p.slug }));
}

/** تحسين SEO لكل صفحة منتج: عنوان ووصف ورابط قانوني وبيانات مشاركة فريدة. */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getCatalogProduct(slug);

  if (!product) {
    return {
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  // `<title>` يمر عبر قالب التخطيط العام الذي يضيف اسم الموقع تلقائيًا.
  const title = product.name;
  const socialTitle = `${product.name} | ${siteConfig.name}`;
  const description = product.shortDescription || product.description;
  const url = `/products/${product.slug}`;
  const imageSrc = product.images[0]?.src;
  const imageAlt = product.images[0]?.alt ?? product.name;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "ar_EG",
      url,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      images: imageSrc ? [{ url: absoluteUrl(imageSrc), width: 1200, height: 1200, alt: imageAlt }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: imageSrc ? [absoluteUrl(imageSrc)] : [],
    },
    other: {
      "product:retailer_item_id": product.sku,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getCatalogProduct(slug);
  if (!product) notFound();

  const category = categoryMap[product.categoryId];
  const related = catalogProducts.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3);

  return (
    <main>
      <JsonLd
        data={[
          organizationJsonLd(),
          websiteJsonLd(),
          productJsonLd(product, category),
          breadcrumbJsonLd([
            { name: "الرئيسية", path: "/" },
            { name: "الكتالوج", path: "/products" },
            { name: category?.name ?? "الأقسام", path: "/products" },
            { name: product.name, path: `/products/${product.slug}` },
          ]),
        ]}
      />
      {/* Breadcrumb */}
      <nav aria-label="مسار التنقل" className="container-page pt-6 pb-2 text-xs text-ink-400">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link href="/" className="hover:text-brand-700">
              الرئيسية
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/products" className="hover:text-brand-700">
              الكتالوج
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/products" className="text-ink-600">
              {category?.name}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-bold text-ink-800">{product.name}</li>
        </ol>
      </nav>

      {/* Product Details */}
      <section className="container-page py-6 sm:py-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14">
          {/* Images */}
          <ProductGallery name={product.name} images={product.images} featured={product.featured} inStock={product.inStock} />

          {/* Info */}
          <div>
            <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-[11px] font-extrabold text-brand-700">
              {category?.name} • كتالوج
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight leading-tight">{product.name}</h1>
            <p className="mt-4 text-sm text-ink-600 leading-relaxed">{product.description}</p>

            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="text-xs font-extrabold text-emerald-800">السعر والتوفر</p>
              <p className="mt-1 text-lg font-extrabold text-emerald-900">استفسر عبر واتساب</p>
              <p className="mt-1 text-xs leading-relaxed text-emerald-800/80">
                كتالوج فقط — لا يوجد شراء مباشر. اضغط زر واتساب أدناه وسيرد فريق المبيعات بالسعر والتوفر وخيارات التوصيل.
              </p>
              <a
                href={buildInquiryUrl(`الاستفسار عن ${product.name} - ${product.sku}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex text-xs font-bold text-emerald-700 hover:text-emerald-900 underline"
              >
                استفسار سريع عبر واتساب
              </a>
            </div>

            {/* Features */}
            <ul className="mt-6 grid grid-cols-2 gap-2.5">
              {[
                { label: "الفئة العمرية", value: product.ageRange },
                { label: "الخامة", value: product.material },
                { label: "بلد المنشأ", value: product.origin },
                { label: "كود الصنف", value: product.sku },
              ].map((spec) => (
                <li key={spec.label} className="rounded-xl bg-ink-50 border border-ink-100 px-3 py-3 text-xs">
                  <span className="text-ink-400 block text-[10px]">{spec.label}</span>
                  <span className="font-bold text-ink-900 mt-1 block">{spec.value}</span>
                </li>
              ))}
            </ul>

            {/* Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1 rounded-full bg-ink-900 text-white px-3 py-1.5 text-[11px] font-bold">
                  {badge}
                </span>
              ))}
              <span className="inline-flex items-center gap-1 rounded-full bg-white border border-ink-200 px-3 py-1.5 text-[11px] font-bold text-ink-700">
                صور كتالوج توضيحية
              </span>
            </div>

            {/* Actions */}
            <ProductActions product={product} />
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-extrabold text-ink-900">منتجات ذات صلة من نفس القسم</h2>
            <p className="mt-2 text-sm text-ink-500">تصفح المزيد من {category?.name}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="group rounded-[1.5rem] bg-white border border-ink-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="relative h-40 w-full overflow-hidden rounded-xl bg-ink-50">
                    <Image
                      src={p.images[0]?.src ?? "/logo.svg"}
                      alt={p.images[0]?.alt ?? p.name}
                      fill
                      sizes="(min-width: 640px) 30vw, 100vw"
                      className="object-contain p-2 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="mt-4 text-sm font-extrabold text-ink-900 group-hover:text-brand-800 transition-colors line-clamp-2">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-xs text-ink-500 line-clamp-2">{p.shortDescription}</p>
                  <span className="mt-3 inline-flex text-xs font-bold text-emerald-700">استفسر عبر واتساب →</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
