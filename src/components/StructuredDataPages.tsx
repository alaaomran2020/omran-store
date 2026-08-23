import { siteConfig } from "@/lib/site";
import { catalogProducts } from "@/lib/products";
import { categoryMap } from "@/lib/categories";

export function StructuredData({ type }: { type?: "catalog" | "about" | "contact" }) {
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
    name: "كتالوج ألعاب أطفال — عمران للألعاب",
    numberOfItems: catalogProducts.length,
    itemListElement: catalogProducts.slice(0, 12).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        sku: product.sku,
        description: product.shortDescription,
        category: categoryMap[product.categoryId]?.name,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      {(type === "catalog" || !type) && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalog) }} />
      )}
    </>
  );
}
