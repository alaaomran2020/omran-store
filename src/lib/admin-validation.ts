import type { Product } from "@/lib/types";

const categoryIds = new Set(["vehicles", "dolls", "educational", "gifts-balloons"]);

export function validateCatalog(value: unknown): Product[] {
  if (!Array.isArray(value) || value.length > 500) throw new Error("Catalog must be an array with at most 500 products.");
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();
  const seenSkus = new Set<string>();
  for (const item of value) {
    if (!item || typeof item !== "object") throw new Error("Each product must be an object.");
    const product = item as Partial<Product>;
    const textFields = [product.id, product.slug, product.name, product.shortDescription, product.description, product.sku];
    if (textFields.some((field) => typeof field !== "string" || field.trim().length === 0 || field.length > 10000)) {
      throw new Error("Product text fields are invalid.");
    }
    if (seenIds.has(product.id!) || seenSlugs.has(product.slug!) || seenSkus.has(product.sku!)) {
      throw new Error("Product ids, slugs, and SKUs must be unique.");
    }
    seenIds.add(product.id!);
    seenSlugs.add(product.slug!);
    seenSkus.add(product.sku!);
    if (typeof product.categoryId !== "string" || !categoryIds.has(product.categoryId)) throw new Error("Product category is invalid.");
    if (!Number.isFinite(product.retailPrice) || product.retailPrice! < 0 || !Number.isFinite(product.wholesalePrice) || product.wholesalePrice! < 0) {
      throw new Error("Product prices must be non-negative numbers.");
    }
    if (!Array.isArray(product.images) || product.images.length === 0 || product.images.length > 10) throw new Error("Each product needs between 1 and 10 images.");
    if (product.images.some((image) => !image || typeof image.src !== "string" || !image.src.startsWith("/"))) throw new Error("Product image paths must be local absolute paths.");
  }
  return value as Product[];
}
