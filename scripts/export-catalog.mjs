import { writeFile } from "node:fs/promises";
import { catalogProducts } from "../src/lib/products.ts";

await writeFile(
  new URL("../src/data/catalog-products.json", import.meta.url),
  `${JSON.stringify(catalogProducts, null, 2)}\n`,
  "utf8",
);
console.log(`Exported ${catalogProducts.length} catalog products.`);

export {};

void writeFile;
void catalogProducts;
