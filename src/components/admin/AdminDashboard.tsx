"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { LogOut, Plus, Save, Search, Store, Trash2 } from "lucide-react";
import { AdminOperationsPanel } from "@/components/admin/AdminOperationsPanel";
import type { CategoryId, Product } from "@/lib/types";

const emptyProduct: Product = {
  id: "",
  slug: "",
  name: "",
  shortDescription: "",
  description: "",
  categoryId: "educational",
  retailPrice: 0,
  wholesalePrice: 0,
  images: [{ src: "/catalog-facebook/facebook-1.jpg", alt: "" }],
  sku: "",
  packaging: { unitsPerCarton: 1, minWholesaleUnits: 1, cartonWeightKg: 0, cartonDimensions: "" },
  ageRange: "",
  material: "",
  origin: "",
  colors: [],
  inStock: true,
  featured: false,
  badges: [],
};

function slugify(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]+/g, "-").replace(/^-|-$/g, "");
}

export function AdminDashboard() {
  const [session, setSession] = useState<{ username: string; role: string } | null>(null);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [products, setProducts] = useState<Product[]>([]);
  const [sha, setSha] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Product>(emptyProduct);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  const selected = useMemo(() => products.find((product) => product.id === selectedId), [products, selectedId]);
  const filteredProducts = useMemo(() => products.filter((product) => `${product.name} ${product.sku}`.toLowerCase().includes(query.toLowerCase())), [products, query]);

  async function loadProducts() {
    setBusy(true);
    setStatus("جاري تحميل المنتجات...");
    const response = await fetch("/api/admin/products", { cache: "no-store" });
    if (response.ok) {
      const data = (await response.json()) as { products: Product[]; sha: string };
      setProducts(data.products);
      setSha(data.sha);
      setStatus("");
    } else if (response.status === 401 || response.status === 503) {
      setSession(null);
      setStatus("");
    } else {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setStatus(data?.error ?? "تعذر تحميل المنتجات.");
    }
    setBusy(false);
  }

  useEffect(() => {
    fetch("/api/admin/session", { cache: "no-store" }).then(async (response) => {
      if (!response.ok) return;
      const data = (await response.json()) as { user: { username: string; role: string } };
      setSession(data.user);
      await loadProducts();
    }).catch(() => undefined);
  }, []);

  function editProduct(product: Product) {
    setSelectedId(product.id);
    setDraft(structuredClone(product));
    setStatus("");
  }

  function addProduct() {
    setSelectedId(null);
    setDraft({ ...structuredClone(emptyProduct), id: `new-${Date.now()}`, sku: "OMR-NEW", name: "منتج جديد" });
    setStatus("");
  }

  function updateDraft<K extends keyof Product>(key: K, value: Product[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function saveDraft() {
    const next = selectedId ? products.map((product) => product.id === selectedId ? draft : product) : [...products, draft];
    setProducts(next);
    setSelectedId(draft.id);
    setStatus("تم حفظ التعديل محلياً. اضغط «حفظ ونشر» لتحديث الموقع.");
  }

  async function publish() {
    if (!draft.name.trim() || !draft.sku.trim()) {
      setStatus("اكتب اسم المنتج والكود أولاً.");
      return;
    }
    const next = selectedId ? products.map((product) => product.id === selectedId ? { ...draft, slug: draft.slug || slugify(draft.name) } : product) : [...products, { ...draft, slug: draft.slug || slugify(draft.name) }];
    setBusy(true);
    setStatus("جاري الحفظ والنشر...");
    const response = await fetch("/api/admin/products", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ products: next, sha }) });
    const data = (await response.json().catch(() => null)) as { error?: string; commitSha?: string } | null;
    if (response.ok) {
      setProducts(next);
      setSha("");
      setStatus(`تم النشر بنجاح. commit: ${data?.commitSha?.slice(0, 8) ?? "تم"}`);
      await loadProducts();
    } else {
      setStatus(data?.error ?? "تعذر النشر. أعد تحميل البيانات وحاول مرة أخرى.");
    }
    setBusy(false);
  }

  async function uploadImage(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/admin/images", { method: "POST", body: formData });
    const data = (await response.json().catch(() => null)) as { src?: string; error?: string } | null;
    if (response.ok && data?.src) {
      updateDraft("images", [{ src: data.src, alt: draft.name }]);
      setStatus("تم رفع الصورة. اضغط «حفظ ونشر» لإضافتها للمنتج.");
    } else setStatus(data?.error ?? "تعذر رفع الصورة.");
    setUploading(false);
  }

  async function loginSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(login) });
    const data = (await response.json().catch(() => null)) as { error?: string; username?: string; role?: string } | null;
    if (response.ok && data?.username) {
      setSession({ username: data.username, role: data.role ?? "editor" });
      setLogin({ username: "", password: "" });
      await loadProducts();
    } else setStatus(data?.error ?? "تعذر تسجيل الدخول.");
    setBusy(false);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setSession(null);
    setProducts([]);
    setSelectedId(null);
  }

  if (!session) {
    return <main className="min-h-screen bg-ink-50 px-4 py-10"><div className="mx-auto max-w-md rounded-3xl bg-white p-6 shadow-xl"><div className="mb-8 text-center"><Store className="mx-auto size-10 text-brand-700" /><h1 className="mt-4 text-2xl font-extrabold text-ink-900">لوحة شركة عمران التجارية</h1><p className="mt-2 text-sm text-ink-500">دخول الفريق لإدارة المنتجات والأسعار</p></div><form onSubmit={loginSubmit} className="space-y-4"><label className="block text-sm font-bold text-ink-700">اسم المستخدم<input value={login.username} onChange={(event) => setLogin({ ...login, username: event.target.value })} className="mt-2 w-full rounded-xl border border-ink-200 px-4 py-3" autoComplete="username" /></label><label className="block text-sm font-bold text-ink-700">كلمة المرور<input type="password" value={login.password} onChange={(event) => setLogin({ ...login, password: event.target.value })} className="mt-2 w-full rounded-xl border border-ink-200 px-4 py-3" autoComplete="current-password" /></label><button disabled={busy} className="w-full rounded-xl bg-brand-700 px-4 py-3 font-bold text-white disabled:opacity-50">دخول</button></form>{status && <p className="mt-4 text-center text-sm text-red-600">{status}</p>}</div></main>;
  }

  return <main dir="rtl" className="min-h-screen bg-ink-50 pb-10"><header className="sticky top-0 z-20 border-b border-ink-100 bg-white/95 px-4 py-3 backdrop-blur"><div className="mx-auto flex max-w-6xl items-center justify-between gap-3"><div><p className="text-xs text-ink-500">مرحباً، {session.username}</p><h1 className="text-lg font-extrabold text-ink-900">إدارة المنتجات</h1></div><button onClick={logout} className="inline-flex items-center gap-1 rounded-xl border border-ink-200 px-3 py-2 text-xs font-bold text-ink-700"><LogOut className="size-4" /> خروج</button></div></header><div className="mx-auto grid max-w-6xl gap-5 px-4 py-5 lg:grid-cols-[320px_1fr]"><section className="rounded-3xl bg-white p-4 shadow-sm"><div className="flex items-center gap-2"><div className="relative flex-1"><Search className="pointer-events-none absolute right-3 top-3 size-4 text-ink-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث عن منتج" className="w-full rounded-xl border border-ink-200 py-2.5 pr-9 pl-3 text-sm" /></div><button onClick={addProduct} className="rounded-xl bg-brand-700 p-3 text-white" aria-label="إضافة منتج"><Plus className="size-5" /></button></div><div className="mt-4 space-y-2">{filteredProducts.map((product) => <button key={product.id} onClick={() => editProduct(product)} className={`w-full rounded-xl p-3 text-right ${selectedId === product.id ? "bg-brand-50 ring-2 ring-brand-300" : "bg-ink-50"}`}><span className="block text-sm font-bold text-ink-900">{product.name}</span><span className="mt-1 block text-xs text-ink-500">{product.sku} · {product.retailPrice} ج.م</span></button>)}</div></section><section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">{selected || selectedId === null ? <><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-extrabold text-ink-900">{selectedId ? "تعديل المنتج" : "منتج جديد"}</h2><p className="mt-1 text-xs text-ink-500">احفظ التعديل محلياً أو احفظ وانشر مباشرة.</p></div><div className="flex gap-2"><button onClick={saveDraft} disabled={busy} className="inline-flex items-center gap-2 rounded-xl border border-brand-200 px-3 py-2 text-sm font-bold text-brand-700"><Save className="size-4" /> حفظ</button><button onClick={publish} disabled={busy} className="rounded-xl bg-accent-500 px-4 py-2 text-sm font-extrabold text-white">حفظ ونشر</button></div></div><div className="grid gap-4 sm:grid-cols-2"><Field label="اسم المنتج" value={draft.name} onChange={(value) => updateDraft("name", value)} /><Field label="الكود SKU" value={draft.sku} onChange={(value) => updateDraft("sku", value)} /><Field label="السعر القطاعي" type="number" value={String(draft.retailPrice)} onChange={(value) => updateDraft("retailPrice", Number(value))} /><Field label="سعر الجملة" type="number" value={String(draft.wholesalePrice)} onChange={(value) => updateDraft("wholesalePrice", Number(value))} /><label className="text-sm font-bold text-ink-700">القسم<select value={draft.categoryId} onChange={(event) => updateDraft("categoryId", event.target.value as CategoryId)} className="mt-2 w-full rounded-xl border border-ink-200 px-3 py-3"><option value="educational">ألعاب تعليمية</option><option value="vehicles">سيارات ومركبات</option><option value="dolls">عرائس ودمى</option><option value="gifts-balloons">هدايا وبالونات</option></select></label><Field label="الفئة العمرية" value={draft.ageRange} onChange={(value) => updateDraft("ageRange", value)} /><div className="sm:col-span-2"><Field label="وصف مختصر" value={draft.shortDescription} onChange={(value) => updateDraft("shortDescription", value)} /><Field label="الوصف التفصيلي" value={draft.description} onChange={(value) => updateDraft("description", value)} area /></div><label className="flex items-center gap-2 text-sm font-bold text-ink-700"><input type="checkbox" checked={draft.inStock} onChange={(event) => updateDraft("inStock", event.target.checked)} /> متوفر حالياً</label><label className="flex items-center gap-2 text-sm font-bold text-ink-700"><input type="checkbox" checked={draft.featured} onChange={(event) => updateDraft("featured", event.target.checked)} /> منتج مميز</label><div className="sm:col-span-2 rounded-2xl border border-dashed border-ink-200 p-4"><p className="text-sm font-bold text-ink-700">صورة المنتج</p><p className="mt-1 text-xs text-ink-500">JPG أو PNG أو WebP، حتى 5 ميجابايت.</p><div className="mt-3 flex flex-wrap items-center gap-3"><input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading || busy} onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadImage(file); event.currentTarget.value = ""; }} className="block w-full text-sm" />{draft.images[0]?.src && <Image src={draft.images[0].src} alt={draft.images[0].alt || draft.name} width={80} height={80} className="size-20 rounded-xl object-cover" />}</div></div></div>{status && <p className="mt-5 rounded-xl bg-brand-50 p-3 text-sm font-bold text-brand-800">{status}</p>}</> : <div className="py-20 text-center text-ink-500">اختر منتجاً للتعديل.</div>}</section><AdminOperationsPanel products={products} /></div></main>;
}

function Field({ label, value, onChange, type = "text", area = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; area?: boolean }) {
  return <label className="mb-4 block text-sm font-bold text-ink-700">{label}{area ? <textarea value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-28 w-full rounded-xl border border-ink-200 px-3 py-3 font-normal" /> : <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-ink-200 px-3 py-3 font-normal" />}</label>;
}
