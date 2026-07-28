"use client";

import dynamic from "next/dynamic";
import { useStore } from "@/context/StoreProvider";

// درج السلة في حزمة منفصلة — لا يُحمَّل إلا عند فتحه لأول مرة
const CartDrawer = dynamic(() =>
  import("@/components/CartDrawer").then((m) => m.CartDrawer),
);

/** غلاف خفيف يؤجّل تحميل درج السلة حتى يطلبه المستخدم */
export function DeferredCartDrawer() {
  const { isCartOpen } = useStore();
  if (!isCartOpen) return null;
  return <CartDrawer />;
}
