import fs from "node:fs";

const raw = fs.readFileSync(new URL("../src/data/catalog-products.json", import.meta.url), "utf8");
const products = JSON.parse(raw);
const countBy = (key) => Object.fromEntries(Object.entries(Object.groupBy(products, (p) => p[key])).map(([k, v]) => [k, v.length]));
const duplicates = (key) => Object.entries(countBy(key)).filter(([, count]) => count > 1);
const required = ["id", "slug", "name", "categoryId", "retailPrice", "wholesalePrice", "sku", "inStock", "images", "ageRange", "material", "origin"];
const missing = Object.fromEntries(required.map((key) => [key, products.filter((p) => p[key] === undefined || p[key] === null || p[key] === "").length]));
console.log(JSON.stringify({
  productCount: products.length,
  categoryCounts: countBy("categoryId"),
  duplicateIds: duplicates("id"),
  duplicateSlugs: duplicates("slug"),
  duplicateSkus: duplicates("sku"),
  missing,
  outOfStock: products.filter((p) => !p.inStock).length,
  priceRange: {
    minRetail: Math.min(...products.map((p) => p.retailPrice)),
    maxRetail: Math.max(...products.map((p) => p.retailPrice)),
  },
}, null, 2));
