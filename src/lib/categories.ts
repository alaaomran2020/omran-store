import type { Category, CategoryId } from "@/lib/types";

/** أقسام الكتالوج المعتمدة لدى الشركة */
export const categories: Category[] = [
  {
    id: "vehicles",
    name: "سيارات وألعاب حركة",
    description:
      "سيارات بجهاز تحكم وشاحنات ودراجات أطفال — أصناف الحركة الأسرع دوراناً في أي محل ألعاب.",
    icon: "car",
    accent: "#1d4ed8",
  },
  {
    id: "dolls",
    name: "عرائس ومجسمات",
    description:
      "عرائس ودمى ودباديب ومجسمات بأحجام تناسب الهدايا وواجهات العرض — طلب ثابت طوال العام ويشتد في مواسم الأعياد.",
    icon: "baby",
    accent: "#be185d",
  },
  {
    id: "educational",
    name: "ألعاب تعليمية",
    description:
      "مكعبات تركيب وبازل الحروف وأدوات تنمية المهارات — الفئة التي تبحث عنها الأمهات ودور الحضانة وتعيد شراءها.",
    icon: "graduation-cap",
    accent: "#047857",
  },
  {
    id: "gifts-balloons",
    name: "هدايا وبالونات",
    description:
      "بالونات لاتكس وفويل وأطقم تجهيز حفلات وعلب هدايا — كل ما تحتاجه محلات المناسبات وأعياد الميلاد في مكان واحد.",
    icon: "gift",
    accent: "#b45309",
  },
];

/** خريطة سريعة للوصول إلى بيانات القسم عبر المعرف */
export const categoryMap: Record<CategoryId, Category> = categories.reduce(
  (acc, category) => {
    acc[category.id] = category;
    return acc;
  },
  {} as Record<CategoryId, Category>,
);

export function getCategory(id: CategoryId): Category | undefined {
  return categoryMap[id];
}
