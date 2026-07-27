import { getProductById } from "@/lib/products";
import type { CartItem, PricingMode } from "@/lib/types";

/**
 * مخزن حالة خارجي بسيط للسلة ووضع التسعير.
 * يُقرأ عبر useSyncExternalStore حتى يتم ترطيب الحالة من localStorage
 * دون إحداث فرق بين ما يرسمه الخادم وما يرسمه المتصفح.
 */

const CART_STORAGE_KEY = "omran.cart.v1";
const PRICING_STORAGE_KEY = "omran.pricing-mode.v1";

export interface StoreState {
  items: CartItem[];
  mode: PricingMode;
  /** يصبح true بعد قراءة القيم المحفوظة في المتصفح */
  hydrated: boolean;
}

/** الحالة الأولية المستخدمة على الخادم وفي أول رسم بالمتصفح */
const INITIAL_STATE: StoreState = {
  items: [],
  mode: "retail",
  hydrated: false,
};

let state: StoreState = INITIAL_STATE;
let didHydrate = false;
const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

function setState(next: Partial<StoreState>): void {
  state = { ...state, ...next };
  emit();
}

function readCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((entry): entry is CartItem => {
        if (typeof entry !== "object" || entry === null) return false;
        const candidate = entry as Partial<CartItem>;
        return (
          typeof candidate.productId === "string" &&
          typeof candidate.quantity === "number" &&
          Number.isFinite(candidate.quantity) &&
          candidate.quantity > 0
        );
      })
      .filter((entry) => Boolean(getProductById(entry.productId)))
      .map((entry) => ({
        productId: entry.productId,
        quantity: Math.max(1, Math.floor(entry.quantity)),
      }));
  } catch {
    return [];
  }
}

function readMode(): PricingMode {
  const stored = window.localStorage.getItem(PRICING_STORAGE_KEY);
  return stored === "wholesale" || stored === "retail" ? stored : "retail";
}

function persist(): void {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    window.localStorage.setItem(PRICING_STORAGE_KEY, state.mode);
  } catch {
    // التخزين غير متاح (تصفح خاص مثلاً) — نتجاهل الخطأ ونكمل بالحالة في الذاكرة
  }
}

/** قراءة القيم المحفوظة مرة واحدة عند أول اشتراك في المتصفح */
function hydrateOnce(): void {
  if (didHydrate || typeof window === "undefined") return;
  didHydrate = true;
  state = { items: readCart(), mode: readMode(), hydrated: true };
}

/** مزامنة الحالة بين تبويبات المتصفح المفتوحة */
function onStorage(event: StorageEvent): void {
  if (event.key === CART_STORAGE_KEY) {
    setState({ items: readCart() });
  } else if (event.key === PRICING_STORAGE_KEY) {
    setState({ mode: readMode() });
  }
}

export function subscribe(listener: () => void): () => void {
  const isFirst = listeners.size === 0;
  hydrateOnce();
  listeners.add(listener);
  if (isFirst && typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
    }
  };
}

export function getSnapshot(): StoreState {
  return state;
}

export function getServerSnapshot(): StoreState {
  return INITIAL_STATE;
}

/* ------------------------------ الإجراءات ------------------------------ */

export function setPricingMode(mode: PricingMode): void {
  setState({ mode });
  persist();
}

export function togglePricingMode(): void {
  setPricingMode(state.mode === "retail" ? "wholesale" : "retail");
}

/** إضافة كمية إلى صنف (قيمة سالبة للإنقاص) */
export function addQuantity(productId: string, amount: number): void {
  if (!getProductById(productId)) return;
  const existing = state.items.find((item) => item.productId === productId);

  if (!existing) {
    if (amount <= 0) return;
    setState({ items: [...state.items, { productId, quantity: amount }] });
  } else {
    const next = existing.quantity + amount;
    setState({
      items:
        next <= 0
          ? state.items.filter((item) => item.productId !== productId)
          : state.items.map((item) =>
              item.productId === productId ? { ...item, quantity: next } : item,
            ),
    });
  }
  persist();
}

/** ضبط كمية صنف على قيمة محددة (صفر أو أقل يحذف الصنف) */
export function setItemQuantity(productId: string, quantity: number): void {
  if (!getProductById(productId)) return;
  const rounded = Math.floor(quantity);

  if (rounded <= 0) {
    setState({ items: state.items.filter((item) => item.productId !== productId) });
  } else if (state.items.some((item) => item.productId === productId)) {
    setState({
      items: state.items.map((item) =>
        item.productId === productId ? { ...item, quantity: rounded } : item,
      ),
    });
  } else {
    setState({ items: [...state.items, { productId, quantity: rounded }] });
  }
  persist();
}

export function removeItem(productId: string): void {
  setState({ items: state.items.filter((item) => item.productId !== productId) });
  persist();
}

export function clearCart(): void {
  setState({ items: [] });
  persist();
}
