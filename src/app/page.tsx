import { Hero } from "@/components/Hero";
import { CatalogSection } from "@/components/CatalogSection";
import { InstagramFeed } from "@/components/InstagramFeed";
import { FeaturedCategories, PromoBanners, BestSellers, NewArrivals, FlashDeals, TrendingProducts, CustomerReviews, BrandAdvantages, FAQPreview, Newsletter } from "@/components/PremiumSections";
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
      addressLocality: "طنطا",
    },
  };

  const catalog = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "كتالوج ألعاب أطفال بالجملة والقطاعي — عمران للألعاب",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalog) }} />
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Hero />
      <PromoBanners />
      <FeaturedCategories />
      <BestSellers />
      <NewArrivals />
      <FlashDeals />
      <TrendingProducts />
      <CatalogSection />
      <InstagramFeed />
      <CustomerReviews />
      <BrandAdvantages />
      <FAQPreview />
      <Newsletter />
    </>
  );
}
