import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Baby,
  BadgeCheck,
  Car,
  Clock,
  Gift,
  GraduationCap,
  LayoutGrid,
  MapPin,
  MessageCircle,
  Package,
  Truck,
} from "lucide-react";
import { siteConfig, activeBranches } from "@/lib/site";
import { products, countByCategory } from "@/lib/products";
import { categories, categoryMap } from "@/lib/categories";
import { formatNumber, formatPrice, getWholesaleSavingPercent } from "@/lib/format";
import { buildInquiryUrl } from "@/lib/whatsapp";
import type { IconName } from "@/lib/types";

const iconMap: Record<IconName, typeof Car> = {
  car: Car,
  baby: Baby,
  "graduation-cap": GraduationCap,
  gift: Gift,
  "layout-grid": LayoutGrid,
};

const trustPoints = [
  {
    icon: Package,
    title: "كميات واضحة",
    body: "عدد قطع الكرتونة والدستة معلن على كل صنف.",
  },
  {
    icon: BadgeCheck,
    title: "أسعار برة المنافسة",
    body: "سعر جملة وقطاعي معلن بدون رسوم خفية.",
  },
  {
    icon: Truck,
    title: "شحن لكل المحافظات",
    body: "تحديد قيمة الشحن والتسليم قبل تنفيذ الطلب.",
  },
  {
    icon: Clock,
    title: "رد سريع",
    body: siteConfig.workingHours,
  },
];

/** بيانات منظمة لمحركات البحث */
function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    telephone: `+${siteConfig.whatsappNumber}`,
    openingHours: siteConfig.workingHours,
    address: activeBranches.map((branch) => ({
      "@type": "PostalAddress",
      addressCountry: "EG",
      addressLocality: "طنطا",
      streetAddress: branch.address,
    })),
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram].filter(
      Boolean,
    ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
    />
  );
}

export default function HomePage() {
  const counts = countByCategory();
  // أبرز العروض: أعلى نسبة توفير عند الجملة
  const deals = [...products]
    .filter((product) => product.inStock)
    .sort((a, b) => getWholesaleSavingPercent(b) - getWholesaleSavingPercent(a))
    .slice(0, 4);

  return (
    <>
      <StructuredData />

      {/* البنر الرئيسي */}
      <section className="bg-brand-900 text-white">
        <div className="container-page py-12 sm:py-16">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
            جملة وقطاعي · توريد لكل المحافظات
          </span>

          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            {siteConfig.name}
            <span className="mt-2 block text-accent-300">
              {siteConfig.tagline}
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-100">
            أكبر تشكيل لعب أطفال وبالونات ومستلزمات حفلات وهدايا. أسعار الجملة
            معلنة بالكرتونة والدستة، والقطاعي متاح للأفراد على نفس الأصناف.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="press flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-brand-900 hover:bg-brand-50"
            >
              تصفح الكتالوج والأسعار
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={buildInquiryUrl("قائمة أسعار الجملة والأصناف المتاحة")}
              target="_blank"
              rel="noopener noreferrer"
              className="press flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/20"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              طلب قائمة الأسعار
            </a>
          </div>

          <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6">
            <div>
              <dt className="text-xs text-brand-100">صنف جاهز للتوريد</dt>
              <dd className="num text-2xl font-extrabold text-accent-300">
                {formatNumber(products.length)}+
              </dd>
            </div>
            <div>
              <dt className="text-xs text-brand-100">أقسام رئيسية</dt>
              <dd className="num text-2xl font-extrabold text-accent-300">
                {formatNumber(categories.length)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-brand-100">فروع في طنطا</dt>
              <dd className="num text-2xl font-extrabold text-accent-300">
                {formatNumber(activeBranches.length)}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* أقسام سريعة */}
      <section className="py-12">
        <div className="container-page">
          <h2 className="text-2xl font-extrabold text-ink-900">
            تصفح الأقسام
          </h2>
          <p className="mt-1 text-sm text-ink-600">
            اختر قسمك وانتقل مباشرة إلى أصنافه بالأسعار والكميات.
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = iconMap[category.icon];
              return (
                <li key={category.id}>
                  <Link
                    href={`/products?cat=${category.id}`}
                    className="card-surface lift flex h-full flex-col gap-2 p-4"
                  >
                    <span
                      className="flex size-11 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${category.accent}1a` }}
                    >
                      <Icon
                        className="size-5"
                        style={{ color: category.accent }}
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className="text-sm font-extrabold text-ink-900">
                      {category.name}
                    </h3>
                    <p className="num mt-auto text-xs font-semibold text-ink-500">
                      {formatNumber(counts[category.id] ?? 0)} صنف
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* أبرز العروض */}
      <section className="bg-white py-12">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-extrabold text-ink-900">
                أبرز العروض
              </h2>
              <p className="mt-1 text-sm text-ink-600">
                أعلى نسب توفير عند الشراء بالجملة.
              </p>
            </div>
            <Link
              href="/products"
              className="press flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-900"
            >
              كل المنتجات
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {deals.map((product, index) => {
              const saving = getWholesaleSavingPercent(product);
              const cover = product.images[0];
              return (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.id}`}
                    className="card-surface lift flex h-full flex-col overflow-hidden"
                  >
                    <span className="relative block aspect-square bg-ink-100">
                      {cover && (
                        <Image
                          src={cover.src}
                          alt={cover.alt}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover"
                          priority={index < 2}
                        />
                      )}
                      {saving > 0 && (
                        <span className="absolute top-2 start-2 rounded-md bg-accent-500 px-2 py-1 text-[11px] font-extrabold text-white">
                          وفّر <span className="num">{saving}</span>%
                        </span>
                      )}
                    </span>
                    <span className="flex flex-1 flex-col gap-1 p-3">
                      <span className="text-[11px] font-semibold text-ink-500">
                        {categoryMap[product.categoryId]?.name}
                      </span>
                      <span className="line-clamp-2 text-sm font-bold text-ink-900">
                        {product.name}
                      </span>
                      <span className="num mt-auto pt-2 text-base font-extrabold text-brand-800">
                        {formatPrice(product.wholesalePrice)}
                        <span className="text-[11px] font-semibold text-ink-500">
                          {" "}
                          / قطعة جملة
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* شريط الثقة */}
      <section className="py-12">
        <div className="container-page">
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {trustPoints.map((point) => (
              <li key={point.title} className="card-surface p-4">
                <point.icon
                  className="size-5 text-brand-700"
                  aria-hidden="true"
                />
                <h3 className="mt-2 text-sm font-extrabold text-ink-900">
                  {point.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-600">
                  {point.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* شبكة الفروع */}
      <section className="bg-white py-12">
        <div className="container-page">
          <h2 className="text-2xl font-extrabold text-ink-900">فروعنا</h2>
          <p className="mt-1 text-sm text-ink-600">
            {siteConfig.workingHours} — الاستلام من الفرع متاح بدون رسوم شحن.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {activeBranches.map((branch) => (
              <li key={branch.id} className="card-surface lift p-4">
                <h3 className="flex items-center gap-2 text-sm font-extrabold text-ink-900">
                  <MapPin
                    className="size-4 shrink-0 text-brand-700"
                    aria-hidden="true"
                  />
                  {branch.name}
                </h3>
                <p className="mt-1.5 text-sm text-ink-600">{branch.address}</p>
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press mt-3 inline-flex rounded-lg bg-ink-100 px-3 py-2 text-xs font-bold text-ink-800 hover:bg-ink-200"
                >
                  الاتجاهات على الخريطة
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
