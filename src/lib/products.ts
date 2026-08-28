import type { CategoryId, Product } from "@/lib/types";
import { legacyProducts } from "@/lib/legacy-products";

import catalogProductsJson from "@/data/catalog-products.json";

/** الكتالوج المركزي الذي تديره لوحة الإدارة. */
export const catalogProducts: Product[] = catalogProductsJson as Product[];



/** بيانات المنتجات الأصلية محفوظة للتوافق مع منطق السلة واختبارات المشروع القديمة. */
export const products: Product[] = legacyProducts;

export const productMap: Record<string, Product> = [...catalogProducts, ...legacyProducts].reduce(
  (acc, product) => {
    acc[product.id] = product;
    return acc;
  },
  {} as Record<string, Product>,
);

export function getProductById(id: string): Product | undefined {
  return productMap[id];
}

export function getProductBySlug(slug: string): Product | undefined {
  return [...catalogProducts, ...legacyProducts].find((product) => product.slug === slug);
}

export function getProductsByCategory(categoryId: CategoryId): Product[] {
  return catalogProducts.filter((product) => product.categoryId === categoryId);
}

export function countByCategory(): Record<CategoryId, number> {
  return catalogProducts.reduce(
    (acc, product) => {
      acc[product.categoryId] = (acc[product.categoryId] ?? 0) + 1;
      return acc;
    },
    {} as Record<CategoryId, number>,
  );
}
