import type { Category, CategoryId } from "@/lib/types";

/** أقسام الكتالوج المعتمدة لدى الشركة */
export const categories: Category[] = [
  {
    id: "vehicles",
    name: "سيارات وألعاب حركة",
    description: "سيارات وشاحنات وألعاب تعمل بالبطارية أو بالدفع اليدوي.",
    icon: "car",
    accent: "#1d4ed8",
  },
  {
    id: "dolls",
    name: "عرائس ومجسمات",
    description: "عرائس بأحجام متعددة ومجسمات شخصيات وحيوانات.",
    icon: "baby",
    accent: "#be185d",
  },
  {
    id: "educational",
    name: "ألعاب تعليمية",
    description: "مكعبات وتركيبات وأدوات تنمية مهارات لمراحل عمرية مختلفة.",
    icon: "graduation-cap",
    accent: "#047857",
  },
  {
    id: "gifts-balloons",
    name: "هدايا وبالونات",
    description: "بالونات لاتكس وفويل ومستلزمات تجهيز المناسبات والهدايا.",
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
