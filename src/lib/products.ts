import type { CategoryId, Product } from "@/lib/types";
import { legacyProducts } from "@/lib/legacy-products";

/**
 * كتالوج مؤقت مبني على الصور العامة المتاحة من فيسبوك.
 * الأسعار الرقمية مؤقتة تقنياً ولا تُعرض في الواجهة؛ السعر المعتمد يُضاف لاحقاً.
 */
export const catalogProducts: Product[] = [
  {
    id: "fb-001",
    slug: "rubber-band-geometry-chess",
    name: "لعبة التفكير الهندسي بالمطاط",
    shortDescription: "لعبة تفكير وتركيب مستوحاة من تحديات الهندسة، مناسبة للعرض والاستفسار.",
    description:
      "لعبة تفكير وتركيب تعتمد على ترتيب القطع أو الأربطة وفق تحديات مختلفة. الاسم والوصف النهائيان والسعر قابلون للمراجعة والإضافة لاحقاً.",
    categoryId: "educational",
    retailPrice: 0,
    wholesalePrice: 0,
    images: [
      {
        src: "/catalog-facebook/facebook-5.jpg",
        alt: "لعبة تفكير وتركيب من كتالوج عمران للألعاب",
      },
    ],
    sku: "FB-001",
    packaging: { unitsPerCarton: 0, minWholesaleUnits: 0, cartonWeightKg: 0, cartonDimensions: "يُضاف لاحقاً" },
    ageRange: "يُضاف لاحقاً",
    material: "يُضاف لاحقاً",
    origin: "يُضاف لاحقاً",
    colors: ["متنوع"],
    inStock: true,
    featured: true,
    badges: ["بيانات مؤقتة", "السعر يُضاف لاحقاً"],
  },
  {
    id: "fb-002",
    slug: "pink-art-kit",
    name: "حقيبة أدوات الرسم الوردية",
    shortDescription: "مجموعة ألوان وأدوات رسم داخل حقيبة عملية للأنشطة الإبداعية والهدايا.",
    description:
      "مجموعة ألوان وأدوات رسم متعددة الأقسام داخل حقيبة وردية سهلة العرض والحمل. تفاصيل المحتويات والسعر النهائيان يُضافان بعد مراجعة المنتج.",
    categoryId: "educational",
    retailPrice: 0,
    wholesalePrice: 0,
    images: [
      { src: "/catalog-facebook/facebook-6.jpg", alt: "حقيبة أدوات الرسم الوردية" },
    ],
    sku: "FB-002",
    packaging: { unitsPerCarton: 0, minWholesaleUnits: 0, cartonWeightKg: 0, cartonDimensions: "يُضاف لاحقاً" },
    ageRange: "يُضاف لاحقاً",
    material: "يُضاف لاحقاً",
    origin: "يُضاف لاحقاً",
    colors: ["وردي"],
    inStock: true,
    featured: true,
    badges: ["بيانات مؤقتة", "السعر يُضاف لاحقاً"],
  },
  {
    id: "fb-003",
    slug: "blue-art-kit",
    name: "حقيبة أدوات الرسم الزرقاء",
    shortDescription: "مجموعة أدوات رسم وتلوين متعددة الأقسام داخل حقيبة سهلة الحمل.",
    description:
      "مجموعة أدوات للرسم والتلوين تظهر داخل حقيبة زرقاء متعددة الأقسام. تفاصيل المحتويات والسعر النهائيان يُضافان بعد مراجعة المنتج.",
    categoryId: "educational",
    retailPrice: 0,
    wholesalePrice: 0,
    images: [
      { src: "/catalog-facebook/facebook-7.jpg", alt: "حقيبة أدوات الرسم الزرقاء" },
    ],
    sku: "FB-003",
    packaging: { unitsPerCarton: 0, minWholesaleUnits: 0, cartonWeightKg: 0, cartonDimensions: "يُضاف لاحقاً" },
    ageRange: "يُضاف لاحقاً",
    material: "يُضاف لاحقاً",
    origin: "يُضاف لاحقاً",
    colors: ["أزرق"],
    inStock: true,
    featured: true,
    badges: ["بيانات مؤقتة", "السعر يُضاف لاحقاً"],
  },
  {
    id: "fb-004",
    slug: "doll-set-with-accessories",
    name: "طقم دميتين مع إكسسوارات",
    shortDescription: "طقم دمى داخل عبوة عرض، مناسب للعب التخيلي والإهداء.",
    description:
      "طقم دمى بملابس وإكسسوارات داخل عبوة عرض. الاسم التجاري والمواصفات والسعر النهائيون يُضافون بعد مراجعة المنتج.",
    categoryId: "dolls",
    retailPrice: 0,
    wholesalePrice: 0,
    images: [
      { src: "/catalog-facebook/facebook-8.jpg", alt: "طقم دميتين مع إكسسوارات" },
    ],
    sku: "FB-004",
    packaging: { unitsPerCarton: 0, minWholesaleUnits: 0, cartonWeightKg: 0, cartonDimensions: "يُضاف لاحقاً" },
    ageRange: "يُضاف لاحقاً",
    material: "يُضاف لاحقاً",
    origin: "يُضاف لاحقاً",
    colors: ["متنوع"],
    inStock: true,
    featured: true,
    badges: ["بيانات مؤقتة", "السعر يُضاف لاحقاً"],
  },
];

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
  return catalogProducts.find((product) => product.slug === slug);
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
