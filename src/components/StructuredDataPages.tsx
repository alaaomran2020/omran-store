import { JsonLd } from "@/components/JsonLd";
import { catalogProducts } from "@/lib/products";
import {
  organizationJsonLd,
  websiteJsonLd,
  localBusinessJsonLd,
  itemListJsonLd,
} from "@/lib/seo";

/**
 * البيانات المنظمة للصفحات الداخلية.
 * - Organization + WebSite تُدرجان دائماً لتوحيد هوية الكيان.
 * - type="catalog": قائمة المنتجات ItemList.
 * - type="about" أو "contact": كيان النشاط التجاري المحلي LocalBusiness.
 * - type="none": Organization + WebSite فقط.
 */
export function StructuredData({
  type,
}: {
  type?: "catalog" | "about" | "contact" | "none";
}) {
  return (
    <JsonLd
      data={[
        organizationJsonLd(),
        websiteJsonLd(),
        ...(type === "catalog"
          ? [itemListJsonLd(catalogProducts, "كتالوج ألعاب أطفال — عمران للألعاب")]
          : []),
        ...(type === "about" || type === "contact" ? [localBusinessJsonLd()] : []),
      ]}
    />
  );
}
