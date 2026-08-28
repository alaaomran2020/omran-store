import { siteConfig } from "@/lib/site";
import { categoryMap } from "@/lib/categories";
import type { Category, Product } from "@/lib/types";

/**
 * أدوات المساعدة الخاصة بتحسين محركات البحث (SEO) والبيانات المنظمة (JSON-LD).
 * يتم تركّز كل منطق بناء البيانات المنظمة هنا ليُستخدم عبر الصفحات كافة.
 */

/** يبني رابطاً مطلقاً من مسار نسبي مع ضمان عدم تكرار الشرطة المائلة أو فقدانها. */
export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url.replace(/\/+$/, "");
  if (path === "/" || path === "") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** يزيل وسوم HTML من النصوص الناتجة (مثلاً من محرر نصي) لإدراجها بصورة آمنة داخل البيانات المنظمة. */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

/** مسار الصورة الأولى لمجموعة منتجة أو الشعار كقيمة احتياطية. */
function firstImage(product: Product): string {
  const src = product.images[0]?.src;
  return src ? absoluteUrl(src) : absoluteUrl(siteConfig.logoUrl);
}

// ---------------------------------------------------------------------------
// بيانات منظمة عامة
// ---------------------------------------------------------------------------

/** بيانات المنظمة (Organization) — تُدرج في كل الصفحات لبناء هوية الكيان. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logoUrl),
    image: absoluteUrl(siteConfig.logoUrl),
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: `+${siteConfig.whatsappNumber}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
      addressRegion: "الغربية",
      addressLocality: "طنطا",
      streetAddress: "ميدان السيد البدوي وفرع الاستاد",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${siteConfig.whatsappNumber}`,
      contactType: "sales",
      availableLanguage: ["Arabic", "English"],
      areaServed: "EG",
    },
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram].filter(Boolean),
  };
}

/** بيانات الموقع (WebSite) — تُدرج في الصفحة الرئيسية وتدعم نتائج البحث بموقع الموقع. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: absoluteUrl(),
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "ar-EG",
  };
}

/** بيانات كيان النشاط التجاري المحلي (LocalBusiness) — تدعم البحث المحلي لمنطقة طنطا/الغربية. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Store"],
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.logoUrl),
    description: siteConfig.description,
    telephone: `+${siteConfig.whatsappNumber}`,
    email: siteConfig.email,
    priceRange: "$$",
    currenciesAccepted: siteConfig.currency,
    paymentAccepted: "Cash",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "23:00",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "ميدان السيد البدوي وفرع الاستاد",
      addressLocality: "طنطا",
      addressRegion: "الغربية",
      postalCode: "31511",
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.793,
      longitude: 30.999,
    },
    areaServed: { "@type": "Country", name: "Egypt" },
    hasMap: siteConfig.branches[0]?.mapUrl,
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram].filter(Boolean),
    department: siteConfig.branches
      .filter((branch) => branch.active)
      .map((branch) => ({
        "@type": "LocalBusiness",
        name: branch.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: branch.address,
          addressLocality: "طنطا",
          addressRegion: "الغربية",
          addressCountry: "EG",
        },
        url: siteConfig.url,
      })),
  };
}

/** بيانات مسار التنقل (BreadcrumbList) تُستخدم في صفحات المنتجات والصفحات الداخلية. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** بيانات قائمة المنتجات (ItemList) لصفحة الكتالوج. */
export function itemListJsonLd(products: Product[], name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => {
      const category = categoryMap[product.categoryId];
      return {
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/products/${product.slug}`),
        item: {
          "@type": "Product",
          "@id": `${absoluteUrl(`/products/${product.slug}`)}#product`,
          name: product.name,
          sku: product.sku,
          image: product.images.map((img) => absoluteUrl(img.src)),
          description: product.description || product.shortDescription,
          brand: { "@type": "Brand", name: siteConfig.name },
          category: category?.name,
        },
      };
    }),
  };
}

/** بيانات المنتج (Product) — تُدرج في صفحة المنتج لتفعيل النتائج الغنية. */
export function productJsonLd(product: Product, category?: Category) {
  const image = firstImage(product);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteUrl(`/products/${product.slug}`)}#product`,
    name: product.name,
    description: product.description || product.shortDescription,
    sku: product.sku,
    mpn: product.sku,
    category: category?.name,
    brand: { "@type": "Brand", name: siteConfig.name },
    image: product.images.map((img) => absoluteUrl(img.src)),
    url: absoluteUrl(`/products/${product.slug}`),
    additionalProperty: [
      { "@type": "PropertyValue", name: "الفئة العمرية", value: product.ageRange },
      { "@type": "PropertyValue", name: "الخامة", value: product.material },
      { "@type": "PropertyValue", name: "بلد المنشأ", value: product.origin },
      { "@type": "PropertyValue", name: "كود الصنف", value: product.sku },
      {
        "@type": "PropertyValue",
        name: "الألوان المتاحة",
        value: product.colors.join("، "),
      },
      ...(product.badges.length > 0
        ? [{ "@type": "PropertyValue", name: "شارات", value: product.badges.join("، ") }]
        : []),
    ],
    ...(image ? { image: image } : {}),
  };
}

/** بيانات الأسئلة الشائعة (FAQPage) — مفعلة في صفحة الأسئلة الشائعة. */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

/** إعادة تصدير خريطة الأقسام لسهولة الوصول داخل الوحدات المستخدمة. */
export { categoryMap };
