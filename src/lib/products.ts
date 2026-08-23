import type { CategoryId, Product } from "@/lib/types";
import { legacyProducts } from "@/lib/legacy-products";

/**
 * كتالوج عمران للألعاب — النسخة الاحترافية
 * 12 منتجاً مصوراً من الصور الحقيقية المتاحة (catalog-facebook)
 * الأسعار تُعرض كـ "استفسر عن السعر" — السعر النهائي عبر واتساب
 * البيانات منظمة لتكون جاهزة للتوسع وإضافة السعر لاحقاً
 */
export const catalogProducts: Product[] = [
  {
    id: "fb-001",
    slug: "rubber-band-geometry-board",
    name: "لوحة الأشكال الهندسية بالمطاط",
    shortDescription: "لعبة تعليمية لتنمية التفكير المنطقي والإبداع عبر تشكيل الأشكال بالمطاط.",
    description:
      "لوحة تعليمية خشبية مع أوتاد ومطاط ملون لتشكيل حروف وأشكال هندسية. تنمي التركيز والتنسيق البصري الحركي، مناسبة للعرض في قسم الألعاب التعليمية. التفاصيل النهائية والسعر يُحددان عند الاستفسار عبر واتساب.",
    categoryId: "educational",
    retailPrice: 0,
    wholesalePrice: 0,
    images: [
      { src: "/catalog-facebook/facebook-5.jpg", alt: "لوحة الأشكال الهندسية بالمطاط" },
      { src: "/catalog-facebook/facebook-1.jpg", alt: "لوحة الأشكال الهندسية - زاوية أخرى" },
    ],
    sku: "OMR-EDU-001",
    packaging: { unitsPerCarton: 24, minWholesaleUnits: 12, cartonWeightKg: 8.5, cartonDimensions: "60×40×40 سم" },
    ageRange: "من 3 إلى 8 سنوات",
    material: "خشب + مطاط",
    origin: "مستورد",
    colors: ["متعدد الألوان"],
    inStock: true,
    featured: true,
    badges: ["تعليمي", "تنمية مهارات"],
  },
  {
    id: "fb-002",
    slug: "pink-art-kit-150",
    name: "حقيبة الرسم الوردية 150 قطعة",
    shortDescription: "حقيبة فنية متكاملة بألوان خشبية وشمعية ومائية وأدوات رسم داخل حقيبة وردية.",
    description:
      "مجموعة أدوات رسم وتلوين 150 قطعة داخل حقيبة وردية أنيقة بطبقات منظمة. تشمل ألوان خشبية، شمعية، مائية، أقلام تحديد وملحقات. مثالية كهدية تعليمية. السعر والتوفر عبر واتساب.",
    categoryId: "educational",
    retailPrice: 0,
    wholesalePrice: 0,
    images: [
      { src: "/catalog-facebook/facebook-6.jpg", alt: "حقيبة الرسم الوردية 150 قطعة" },
      { src: "/catalog-facebook/facebook-2.jpg", alt: "حقيبة الرسم الوردية - محتويات" },
    ],
    sku: "OMR-EDU-002",
    packaging: { unitsPerCarton: 12, minWholesaleUnits: 6, cartonWeightKg: 12, cartonDimensions: "55×45×40 سم" },
    ageRange: "من 4 سنوات فأكثر",
    material: "بلاستيك + ألوان فنية",
    origin: "مستورد",
    colors: ["وردي"],
    inStock: true,
    featured: true,
    badges: ["هدية مثالية", "150 قطعة"],
  },
  {
    id: "fb-003",
    slug: "blue-art-kit-150",
    name: "حقيبة الرسم الزرقاء 150 قطعة",
    shortDescription: "حقيبة فنية زرقاء متعددة الأقسام للأنشطة الإبداعية والرسم الحر.",
    description:
      "حقيبة أدوات رسم زرقاء بتصميم عملي متعدد الطبقات، تضم ألواناً متنوعة وأدوات للرسم والتلوين. مناسبة للمدارس والحضانات والهدايا. استفسر عن السعر والتوفر عبر واتساب.",
    categoryId: "educational",
    retailPrice: 0,
    wholesalePrice: 0,
    images: [
      { src: "/catalog-facebook/facebook-7.jpg", alt: "حقيبة الرسم الزرقاء 150 قطعة" },
      { src: "/catalog-facebook/facebook-3.jpg", alt: "حقيبة الرسم الزرقاء - تفاصيل" },
    ],
    sku: "OMR-EDU-003",
    packaging: { unitsPerCarton: 12, minWholesaleUnits: 6, cartonWeightKg: 12, cartonDimensions: "55×45×40 سم" },
    ageRange: "من 4 سنوات فأكثر",
    material: "بلاستيك + ألوان فنية",
    origin: "مستورد",
    colors: ["أزرق"],
    inStock: true,
    featured: true,
    badges: ["تعليمي", "هدية"],
  },
  {
    id: "fb-004",
    slug: "doll-set-with-accessories",
    name: "طقم دميتين مع إكسسوارات الأناقة",
    shortDescription: "طقم دمى بملابس عصرية وحقائب وإكسسوارات داخل علبة عرض جذابة.",
    description:
      "طقم دميتين بفساتين وإكسسوارات متنوعة — حقائب، أحذية، ونظارات — داخل عبوة عرض شفافة. مناسب للعب التخيلي والإهداء. تفاصيل المقاسات والخامات والسعر عبر واتساب.",
    categoryId: "dolls",
    retailPrice: 0,
    wholesalePrice: 0,
    images: [
      { src: "/catalog-facebook/facebook-8.jpg", alt: "طقم دميتين مع إكسسوارات" },
      { src: "/catalog-facebook/facebook-4.jpg", alt: "طقم دميتين - عرض جانبي" },
    ],
    sku: "OMR-DOL-001",
    packaging: { unitsPerCarton: 18, minWholesaleUnits: 9, cartonWeightKg: 10, cartonDimensions: "65×45×50 سم" },
    ageRange: "من 3 إلى 10 سنوات",
    material: "بلاستيك آمن + قماش",
    origin: "مستورد",
    colors: ["متعدد"],
    inStock: true,
    featured: true,
    badges: ["علبة عرض", "إكسسوارات"],
  },
  {
    id: "fb-005",
    slug: "fashion-doll-collection",
    name: "مجموعة دمى الموضة والأزياء",
    shortDescription: "دمى بملابس موضة متنوعة وتسريحات شعر قابلة للتصفيف.",
    description:
      "تشكيلة دمى موضة بملابس عصرية وتسريحات شعر قابلة للتصفيف، تشجع على اللعب التخيلي وتنمية الذوق. العبوة مناسبة للرف والهدايا. للاستفسار عن الألوان المتاحة والسعر تواصل عبر واتساب.",
    categoryId: "dolls",
    retailPrice: 0,
    wholesalePrice: 0,
    images: [
      { src: "/catalog-facebook/facebook-2.jpg", alt: "مجموعة دمى الموضة والأزياء" },
      { src: "/catalog-facebook/facebook-8.jpg", alt: "دمى الموضة - تفاصيل" },
    ],
    sku: "OMR-DOL-002",
    packaging: { unitsPerCarton: 24, minWholesaleUnits: 12, cartonWeightKg: 9, cartonDimensions: "60×40×45 سم" },
    ageRange: "من 3 سنوات فأكثر",
    material: "بلاستيك آمن",
    origin: "مستورد",
    colors: ["وردي", "بنفسجي", "أزرق"],
    inStock: true,
    featured: true,
    badges: ["موضة", "هدية"],
  },
  {
    id: "fb-006",
    slug: "offroad-rc-car",
    name: "سيارة دفع رباعي كبيرة للطرق الوعرة",
    shortDescription: "سيارة لعب كبيرة بعجلات قوية وتصميم واقعي لمحاكاة الطرق الوعرة.",
    description:
      "سيارة دفع رباعي كبيرة الحجم بعجلات مطاطية وتصميم هيكل قوي يتحمل اللعب اليومي. تعمل بالدفع اليدوي، مناسبة للعب الداخلي والخارجي. استفسر عن المقاسات والأسعار عبر واتساب.",
    categoryId: "vehicles",
    retailPrice: 0,
    wholesalePrice: 0,
    images: [
      { src: "/catalog-facebook/facebook-3.jpg", alt: "سيارة دفع رباعي كبيرة للطرق الوعرة" },
      { src: "/catalog-facebook/facebook-4.jpg", alt: "سيارة دفع رباعي - تفاصيل العجلات" },
    ],
    sku: "OMR-VEH-001",
    packaging: { unitsPerCarton: 8, minWholesaleUnits: 4, cartonWeightKg: 14, cartonDimensions: "75×50×55 سم" },
    ageRange: "من 3 إلى 10 سنوات",
    material: "بلاستيك مقوى",
    origin: "مستورد",
    colors: ["أحمر", "أزرق", "أصفر"],
    inStock: true,
    featured: true,
    badges: ["متانة عالية", "بدون بطاريات"],
  },
  {
    id: "fb-007",
    slug: "mini-metal-cars-set",
    name: "طقم سيارات معدنية صغيرة 6 قطع",
    shortDescription: "ست سيارات معدنية بألوان متنوعة داخل علبة عرض اقتصادية سريعة الدوران.",
    description:
      "طقم 6 سيارات معدنية مصبوبة بألوان وموديلات متنوعة، بعجلات حرة الحركة وعلبة كرتون تتحول لوحدة عرض. صنف اقتصادي مثالي لمحلات الهدايا والأكشاك. للاستفسار عن السعر والتوفر عبر واتساب.",
    categoryId: "vehicles",
    retailPrice: 0,
    wholesalePrice: 0,
    images: [
      { src: "/catalog-facebook/facebook-4.jpg", alt: "طقم سيارات معدنية 6 قطع" },
      { src: "/catalog-facebook/facebook-3.jpg", alt: "سيارات معدنية - علبة العرض" },
    ],
    sku: "OMR-VEH-002",
    packaging: { unitsPerCarton: 24, minWholesaleUnits: 12, cartonWeightKg: 10, cartonDimensions: "60×40×35 سم" },
    ageRange: "من 3 سنوات فأكثر",
    material: "معدن مصبوب",
    origin: "مستورد",
    colors: ["ألوان متنوعة"],
    inStock: true,
    featured: false,
    badges: ["سريع الدوران", "علبة عرض"],
  },
  {
    id: "fb-008",
    slug: "kitchen-play-set",
    name: "مجموعة المطبخ الصغير للأطفال",
    shortDescription: "لعبة مطبخ مع أدوات طهي وملحقات لتنمية اللعب التخيلي.",
    description:
      "مجموعة مطبخ صغير تشمل أدوات طهي وملحقات آمنة للأطفال، تشجع على اللعب التخيلي وتنمية المهارات الاجتماعية. مناسبة للهدايا وقسم الألعاب التعليمية. السعر عبر واتساب.",
    categoryId: "educational",
    retailPrice: 0,
    wholesalePrice: 0,
    images: [
      { src: "/catalog-facebook/facebook-9.jpg", alt: "مجموعة المطبخ الصغير للأطفال" },
      { src: "/catalog-facebook/facebook-10.jpg", alt: "مطبخ صغير - محتويات" },
    ],
    sku: "OMR-EDU-004",
    packaging: { unitsPerCarton: 16, minWholesaleUnits: 8, cartonWeightKg: 9, cartonDimensions: "62×42×48 سم" },
    ageRange: "من 3 إلى 8 سنوات",
    material: "بلاستيك آمن",
    origin: "مستورد",
    colors: ["وردي", "أزرق"],
    inStock: true,
    featured: false,
    badges: ["لعب تخيلي", "آمن للأطفال"],
  },
  {
    id: "fb-009",
    slug: "doctor-play-set",
    name: "طقم أدوات الطبيب للأطفال",
    shortDescription: "حقيبة أدوات طبيب مع سماعة وحقن وأدوات فحص للعب التمثيلي.",
    description:
      "طقم أدوات طبيب للأطفال داخل حقيبة عملية، يشمل سماعة، حقن، ومقص وأدوات فحص بلاستيكية آمنة. يساعد على تقليل الخوف من زيارة الطبيب وتنمية التعاطف. استفسر عبر واتساب.",
    categoryId: "educational",
    retailPrice: 0,
    wholesalePrice: 0,
    images: [
      { src: "/catalog-facebook/facebook-10.jpg", alt: "طقم أدوات الطبيب للأطفال" },
      { src: "/catalog-facebook/facebook-9.jpg", alt: "أدوات الطبيب - تفاصيل" },
    ],
    sku: "OMR-EDU-005",
    packaging: { unitsPerCarton: 20, minWholesaleUnits: 10, cartonWeightKg: 8, cartonDimensions: "58×40×42 سم" },
    ageRange: "من 3 إلى 7 سنوات",
    material: "بلاستيك آمن",
    origin: "مستورد",
    colors: ["أبيض", "أزرق"],
    inStock: true,
    featured: true,
    badges: ["تعليمي", "لعب تمثيلي"],
  },
  {
    id: "fb-010",
    slug: "party-balloons-gift-set",
    name: "مجموعة بالونات وهدايا الحفلات",
    shortDescription: "تشكيلة بالونات وزينة حفلات بألوان مرحة لتجهيز أعياد الميلاد.",
    description:
      "مجموعة بالونات وزينة حفلات بألوان متنوعة وتصاميم مرحة، تشمل بالونات هيليوم وزينة طاولة وأطقم مناسبات. مثالية لمنظمي الحفلات ومحلات الهدايا. للاستفسار عن المحتويات والسعر عبر واتساب.",
    categoryId: "gifts-balloons",
    retailPrice: 0,
    wholesalePrice: 0,
    images: [
      { src: "/catalog-facebook/facebook-11.jpg", alt: "مجموعة بالونات وهدايا الحفلات" },
      { src: "/catalog-facebook/facebook-12.jpg", alt: "بالونات الحفلات - ألوان متنوعة" },
    ],
    sku: "OMR-GFT-001",
    packaging: { unitsPerCarton: 50, minWholesaleUnits: 25, cartonWeightKg: 6, cartonDimensions: "55×40×30 سم" },
    ageRange: "لجميع الأعمار",
    material: "لاتكس + بلاستيك",
    origin: "مستورد",
    colors: ["ألوان متنوعة"],
    inStock: true,
    featured: true,
    badges: ["حفلات", "ألوان مرحة"],
  },
  {
    id: "fb-011",
    slug: "plush-doll-soft",
    name: "دمية قطنية محشوة ناعمة",
    shortDescription: "دمية قماشية محشوة بملمس ناعم وآمن للأطفال، مناسبة للعناق والهدايا.",
    description:
      "دمية قطنية محشوة بملمس ناعم وخياطة متينة، آمنة للأطفال من عمر سنة. مناسبة كهدية مواليد وديكور غرف الأطفال. تتوفر بألوان ومقاسات متنوعة. استفسر عبر واتساب عن المتاح.",
    categoryId: "dolls",
    retailPrice: 0,
    wholesalePrice: 0,
    images: [
      { src: "/catalog-facebook/facebook-12.jpg", alt: "دمية قطنية محشوة ناعمة" },
      { src: "/catalog-facebook/facebook-11.jpg", alt: "دمية قطنية - تفاصيل القماش" },
    ],
    sku: "OMR-DOL-003",
    packaging: { unitsPerCarton: 30, minWholesaleUnits: 15, cartonWeightKg: 7, cartonDimensions: "60×45×45 سم" },
    ageRange: "من سنة فأكثر",
    material: "قطن + بوليستر",
    origin: "مستورد",
    colors: ["وردي", "بيج", "أزرق فاتح"],
    inStock: true,
    featured: false,
    badges: ["ناعمة", "آمنة للأطفال"],
  },
  {
    id: "fb-012",
    slug: "wooden-puzzle-educational",
    name: "بازل خشبي تعليمي للأشكال والألوان",
    shortDescription: "لعبة بازل خشبية لتعليم الأشكال والألوان والأرقام بطريقة ممتعة.",
    description:
      "بازل خشبي تعليمي بألوان زاهية وقطع كبيرة آمنة، يساعد على تنمية التركيز والتنسيق الحركي والتعرف على الأشكال. مناسب للحضانات والمنازل. للاستفسار عن السعر والتوفر عبر واتساب.",
    categoryId: "educational",
    retailPrice: 0,
    wholesalePrice: 0,
    images: [
      { src: "/catalog-facebook/facebook-1.jpg", alt: "بازل خشبي تعليمي للأشكال" },
      { src: "/catalog-facebook/facebook-5.jpg", alt: "بازل خشبي - تفاصيل القطع" },
    ],
    sku: "OMR-EDU-006",
    packaging: { unitsPerCarton: 36, minWholesaleUnits: 18, cartonWeightKg: 9, cartonDimensions: "58×38×40 سم" },
    ageRange: "من سنتين فأكثر",
    material: "خشب طبيعي",
    origin: "مستورد",
    colors: ["متعدد الألوان"],
    inStock: true,
    featured: false,
    badges: ["خشبي", "تعليمي"],
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
