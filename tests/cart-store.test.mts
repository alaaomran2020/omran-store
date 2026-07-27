/**
 * اختبارات مخزن السلة الخارجي (يعمل في بيئة Node مع localStorage وهمي).
 */
import assert from "node:assert/strict";
import test, { beforeEach } from "node:test";

// محاكاة بيئة المتصفح قبل تحميل المخزن
class MemoryStorage {
  private data = new Map<string, string>();
  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    this.data.set(key, value);
  }
  removeItem(key: string): void {
    this.data.delete(key);
  }
  clear(): void {
    this.data.clear();
  }
}

const memoryStorage = new MemoryStorage();
const listeners: Record<string, ((event: unknown) => void)[]> = {};

Object.defineProperty(globalThis, "window", {
  configurable: true,
  value: {
    localStorage: memoryStorage,
    addEventListener: (type: string, fn: (event: unknown) => void) => {
      (listeners[type] ??= []).push(fn);
    },
    removeEventListener: () => {},
  },
});

const store = await import("@/lib/cart-store");

beforeEach(() => {
  store.clearCart();
  store.setPricingMode("retail");
});

test("الحالة الابتدائية على الخادم فارغة وبوضع القطاعي", () => {
  const initial = store.getServerSnapshot();
  assert.deepEqual(initial.items, []);
  assert.equal(initial.mode, "retail");
  assert.equal(initial.hydrated, false);
});

test("إضافة صنف وزيادة كميته", () => {
  store.addQuantity("p-1001", 12);
  assert.deepEqual(store.getSnapshot().items, [
    { productId: "p-1001", quantity: 12 },
  ]);

  store.addQuantity("p-1001", 12);
  assert.equal(store.getSnapshot().items[0]?.quantity, 24);
});

test("الإنقاص إلى الصفر يحذف الصنف", () => {
  store.addQuantity("p-1002", 8);
  store.addQuantity("p-1002", -8);
  assert.equal(store.getSnapshot().items.length, 0);
});

test("ضبط كمية محددة وحذفها بالصفر", () => {
  store.setItemQuantity("p-2001", 5);
  assert.equal(store.getSnapshot().items[0]?.quantity, 5);

  store.setItemQuantity("p-2001", 0);
  assert.equal(store.getSnapshot().items.length, 0);
});

test("تجاهل المنتجات غير الموجودة", () => {
  store.addQuantity("لا-يوجد", 3);
  store.setItemQuantity("لا-يوجد", 3);
  assert.equal(store.getSnapshot().items.length, 0);
});

test("حذف صنف وإفراغ السلة", () => {
  store.addQuantity("p-1001", 2);
  store.addQuantity("p-3001", 4);
  assert.equal(store.getSnapshot().items.length, 2);

  store.removeItem("p-1001");
  assert.equal(store.getSnapshot().items.length, 1);

  store.clearCart();
  assert.equal(store.getSnapshot().items.length, 0);
});

test("تبديل وضع التسعير وحفظه", () => {
  store.togglePricingMode();
  assert.equal(store.getSnapshot().mode, "wholesale");
  assert.equal(
    memoryStorage.getItem("omran.pricing-mode.v1"),
    "wholesale",
    "الوضع محفوظ في التخزين المحلي",
  );

  store.togglePricingMode();
  assert.equal(store.getSnapshot().mode, "retail");
});

test("السلة تُحفظ في التخزين المحلي", () => {
  store.addQuantity("p-4001", 50);
  const raw = memoryStorage.getItem("omran.cart.v1");
  assert.ok(raw, "توجد بيانات محفوظة");
  assert.deepEqual(JSON.parse(raw), [{ productId: "p-4001", quantity: 50 }]);
});

test("المشتركون يُخطرون عند التغيير", () => {
  let calls = 0;
  const unsubscribe = store.subscribe(() => {
    calls += 1;
  });

  store.addQuantity("p-1001", 1);
  store.setItemQuantity("p-1001", 3);
  store.removeItem("p-1001");
  unsubscribe();

  store.addQuantity("p-1001", 1);
  assert.equal(calls, 3, "لا إخطار بعد إلغاء الاشتراك");
});
