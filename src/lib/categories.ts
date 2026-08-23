import type { Category, CategoryId } from "@/lib/types";

/** أقسام الكتالوج المعتمدة لدى الشركة */
export const categories: Category[] = [
  {
    id: "vehicles",
    name: "سيارات وألعاب حركة",
    description:
      "سيارات بجهاز تحكم، شاحنات، ودراجات أطفال للحركة واللعب.",
    icon: "car",
    accent: "#1d4ed8",
  },
  {
    id: "dolls",
    name: "عرائس ومجسمات",
    description:
      "عرائس ودمى ودباديب ومجسمات مناسبة للّعب والهدايا.",
    icon: "baby",
    accent: "#be185d",
  },
  {
    id: "educational",
    name: "ألعاب تعليمية",
    description:
      "مكعبات تركيب، بازل، وألعاب تساعد على التعلّم وتنمية المهارات.",
    icon: "graduation-cap",
    accent: "#047857",
  },
  {
    id: "gifts-balloons",
    name: "هدايا وبالونات",
    description:
      "بالونات، أطقم مناسبات، وعلب هدايا للاحتفالات والمناسبات.",
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
