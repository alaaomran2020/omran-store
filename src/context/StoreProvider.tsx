"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import * as store from "@/lib/cart-store";
import { getProductById } from "@/lib/products";
import { getMinQuantity, getUnitPrice } from "@/lib/format";
import type {
  CartItem,
  CartTotals,
  PricingMode,
  Product,
  ResolvedCartItem,
} from "@/lib/types";

export interface StoreContextValue {
  /** وضع التسعير الحالي */
  mode: PricingMode;
  setMode: (mode: PricingMode) => void;
  toggleMode: () => void;

  /** عناصر السلة الخام */
  items: CartItem[];
  /** عناصر السلة بعد ربطها بالمنتجات وحساب الأسعار */
  resolvedItems: ResolvedCartItem[];
  totals: CartTotals;

  addItem: (product: Product, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getQuantity: (productId: string) => number;

  /** حالة درج السلة */
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  /** يصبح true بعد قراءة البيانات المحفوظة في المتصفح */
  hydrated: boolean;
  /** معرّف آخر منتج تمت إضافته — يُستخدم لإظهار تأكيد بصري مؤقت */
  lastAddedId: string | null;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  const { items, mode, hydrated } = snapshot;

  const [isCartOpen, setCartOpen] = useState(false);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const addedTimer = useRef<number | null>(null);

  // منع تمرير الصفحة خلف درج السلة
  useEffect(() => {
    if (!isCartOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isCartOpen]);

  // تنظيف مؤقت مؤشر "تمت الإضافة" عند إزالة المكوّن
  useEffect(() => {
    return () => {
      if (addedTimer.current !== null) window.clearTimeout(addedTimer.current);
    };
  }, []);

  const flagAdded = useCallback((productId: string) => {
    setLastAddedId(productId);
    if (addedTimer.current !== null) window.clearTimeout(addedTimer.current);
    addedTimer.current = window.setTimeout(() => setLastAddedId(null), 1800);
  }, []);

  const addItem = useCallback(
    (product: Product, quantity?: number) => {
      const amount = Math.max(1, quantity ?? getMinQuantity(product, mode));
      store.addQuantity(product.id, amount);
      flagAdded(product.id);
    },
    [mode, flagAdded],
  );

  const incrementItem = useCallback(
    (productId: string) => {
      const product = getProductById(productId);
      if (!product) return;
      const step =
        mode === "wholesale" ? Math.max(1, product.packaging.unitsPerCarton) : 1;
      store.addQuantity(productId, step);
    },
    [mode],
  );

  const decrementItem = useCallback(
    (productId: string) => {
      const product = getProductById(productId);
      if (!product) return;
      const step =
        mode === "wholesale" ? Math.max(1, product.packaging.unitsPerCarton) : 1;
      store.addQuantity(productId, -step);
    },
    [mode],
  );

  const resolvedItems = useMemo<ResolvedCartItem[]>(
    () =>
      items.flatMap((item) => {
        const product = getProductById(item.productId);
        if (!product) return [];
        const unitPrice = getUnitPrice(product, mode);
        const unitsPerCarton = Math.max(1, product.packaging.unitsPerCarton);
        return [
          {
            product,
            quantity: item.quantity,
            unitPrice,
            lineTotal: unitPrice * item.quantity,
            cartons: Math.round((item.quantity / unitsPerCarton) * 100) / 100,
          },
        ];
      }),
    [items, mode],
  );

  const totals = useMemo<CartTotals>(
    () =>
      resolvedItems.reduce<CartTotals>(
        (acc, item) => ({
          itemCount: acc.itemCount + 1,
          unitCount: acc.unitCount + item.quantity,
          subtotal: acc.subtotal + item.lineTotal,
        }),
        { itemCount: 0, unitCount: 0, subtotal: 0 },
      ),
    [resolvedItems],
  );

  const getQuantity = useCallback(
    (productId: string) =>
      items.find((item) => item.productId === productId)?.quantity ?? 0,
    [items],
  );

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const value = useMemo<StoreContextValue>(
    () => ({
      mode,
      setMode: store.setPricingMode,
      toggleMode: store.togglePricingMode,
      items,
      resolvedItems,
      totals,
      addItem,
      setQuantity: store.setItemQuantity,
      incrementItem,
      decrementItem,
      removeItem: store.removeItem,
      clearCart: store.clearCart,
      getQuantity,
      isCartOpen,
      openCart,
      closeCart,
      hydrated,
      lastAddedId,
    }),
    [
      mode,
      items,
      resolvedItems,
      totals,
      addItem,
      incrementItem,
      decrementItem,
      getQuantity,
      isCartOpen,
      openCart,
      closeCart,
      hydrated,
      lastAddedId,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
