import { Hero } from "@/components/Hero";
import { CategoriesSection } from "@/components/CategoriesSection";
import { CatalogSection } from "@/components/CatalogSection";
import { WholesaleSection } from "@/components/WholesaleSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { siteConfig } from "@/lib/site";
import { products } from "@/lib/products";
import { categoryMap } from "@/lib/categories";

/** بيانات منظمة لمحركات البحث */
function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: `+${siteConfig.whatsappNumber}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
      addressLocality: "القاهرة",
    },
  };

  const catalog = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "كتالوج منتجات شركة عمران التجارية",
    numberOfItems: products.length,
    itemListElement: products.slice(0, 12).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        sku: product.sku,
        description: product.shortDescription,
        category: categoryMap[product.categoryId]?.name,
        offers: {
          "@type": "Offer",
          priceCurrency: siteConfig.currency,
          price: product.retailPrice,
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalog) }}
      />
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Hero />
      <CategoriesSection />
      <CatalogSection />
      <WholesaleSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
