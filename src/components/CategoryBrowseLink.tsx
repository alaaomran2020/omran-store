"use client";

import { useStore } from "@/context/StoreProvider";
import type { CategoryId } from "@/lib/types";

interface CategoryBrowseLinkProps {
  categoryId: CategoryId;
  className?: string;
  children: React.ReactNode;
}

/**
 * رابط ينتقل إلى الكتالوج مع تطبيق فلتر قسم محدد.
 * يُستخدم في أماكن لا تملك وصولاً مباشراً لحالة الكتالوج (مثل التذييل).
 */
export function CategoryBrowseLink({
  categoryId,
  className,
  children,
}: CategoryBrowseLinkProps) {
  const { browseCategory } = useStore();

  return (
    <a
      href="#products"
      onClick={(event) => {
        event.preventDefault();
        browseCategory(categoryId);
      }}
      className={className}
    >
      {children}
    </a>
  );
}
