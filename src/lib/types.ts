/**
 * أنواع البيانات الأساسية لمتجر شركة عمران التجارية
 * Core domain types for the Omran Trading Company store.
 */

/** وضع التسعير: قطاعي (تجزئة) أو جملة */
export type PricingMode = "retail" | "wholesale";

/** معرفات الأقسام المتاحة في الكتالوج */
export type CategoryId =
  | "vehicles"
  | "dolls"
  | "educational"
  | "gifts-balloons";

/** أسماء الأيقونات المستخدمة من مكتبة lucide-react */
export type IconName =
  | "car"
  | "baby"
  | "graduation-cap"
  | "gift"
  | "layout-grid";

export interface Category {
  id: CategoryId;
  /** الاسم المعروض بالعربية */
  name: string;
  /** وصف مختصر للقسم */
  description: string;
  /** اسم الأيقونة المرتبطة بالقسم */
  icon: IconName;
  /** لون تمييزي للقسم (Tailwind-friendly hex) */
  accent: string;
}

export interface ProductImage {
  /** مسار الصورة داخل مجلد public */
  src: string;
  /** نص بديل للصورة */
  alt: string;
}

/** بيانات التعبئة والشحن الخاصة بتجار الجملة */
export interface PackagingInfo {
  /** عدد القطع داخل الكرتونة الواحدة */
  unitsPerCarton: number;
  /** أقل كمية للبيع بسعر الجملة (بالقطعة) */
  minWholesaleUnits: number;
  /** وزن الكرتونة بالكيلوجرام */
  cartonWeightKg: number;
  /** أبعاد الكرتونة (سم) */
  cartonDimensions: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** وصف مختصر يظهر في بطاقة المنتج */
  shortDescription: string;
  /** وصف تفصيلي يظهر في نافذة العرض السريع */
  description: string;
  categoryId: CategoryId;
  /** سعر القطعة للبيع القطاعي بالجنيه المصري */
  retailPrice: number;
  /** سعر القطعة لتجار الجملة بالجنيه المصري */
  wholesalePrice: number;
  images: ProductImage[];
  sku: string;
  packaging: PackagingInfo;
  /** الفئة العمرية المناسبة */
  ageRange: string;
  /** الخامة المستخدمة في التصنيع */
  material: string;
  /** بلد المنشأ */
  origin: string;
  /** الألوان المتاحة */
  colors: string[];
  /** حالة التوفر في المخزن */
  inStock: boolean;
  /** منتج مميز يظهر ضمن المختارات */
  featured: boolean;
  /** ملاحظات تعريفية قصيرة تظهر على البطاقة */
  badges: string[];
}

export interface CartItem {
  productId: string;
  /** الكمية بالقطعة */
  quantity: number;
}

/** عنصر السلة بعد ربطه ببيانات المنتج وحساب الأسعار */
export interface ResolvedCartItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  /** عدد الكراتين المكافئ (يُستخدم في وضع الجملة) */
  cartons: number;
}

export interface CartTotals {
  itemCount: number;
  unitCount: number;
  subtotal: number;
}

export type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";
