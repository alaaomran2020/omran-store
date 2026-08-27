"use client";

import { useEffect, useMemo, useState } from "react";
import { ClipboardList, RefreshCw, Save } from "lucide-react";
import type { Product } from "@/lib/types";
import type { LeadRecord, LeadStatus, OrderRecord } from "@/lib/operations-types";

const statusLabels: Record<LeadStatus, string> = {
  new: "جديد",
  contacted: "تم التواصل",
  qualified: "مؤهل",
  negotiating: "تفاوض",
  won: "تم البيع",
  lost: "مفقود",
};

const emptyLead = (product?: Product): LeadRecord => ({
  leadId: `lead-${Date.now()}`,
  createdAt: new Date().toISOString(),
  status: "new",
  productId: product?.id ?? "",
  sku: product?.sku ?? "",
  category: product?.categoryId ?? "",
  source: "whatsapp",
  medium: "none",
  campaign: "(not set)",
});

export function AdminOperationsPanel({ products }: { products: Product[] }) {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [leadSha, setLeadSha] = useState("");
  const [orderSha, setOrderSha] = useState("");
  const [leadDraft, setLeadDraft] = useState<LeadRecord>(emptyLead(products[0]));
  const [orderDraft, setOrderDraft] = useState({ orderId: `order-${Date.now()}`, transactionId: `txn-${Date.now()}`, leadId: "", value: "" });
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const productMap = useMemo(() => new Map(products.map((product) => [product.id, product])), [products]);

  async function load() {
    setBusy(true);
    const [leadResponse, orderResponse] = await Promise.all([fetch("/api/admin/leads", { cache: "no-store" }), fetch("/api/admin/orders", { cache: "no-store" })]);
    if (leadResponse.ok) {
      const data = (await leadResponse.json()) as { leads: LeadRecord[]; sha: string };
      setLeads(data.leads);
      setLeadSha(data.sha);
    }
    if (orderResponse.ok) {
      const data = (await orderResponse.json()) as { orders: OrderRecord[]; sha: string };
      setOrders(data.orders);
      setOrderSha(data.sha);
    }
    if (!leadResponse.ok || !orderResponse.ok) setStatus("مخزن العمليات غير مهيأ بعد أو لا يمكن الوصول إليه.");
    setBusy(false);
  }

  useEffect(() => {
    if (products.length > 0) setLeadDraft((current) => current.productId ? current : emptyLead(products[0]));
    void load();
  }, [products]);

  function chooseProduct(productId: string) {
    const product = productMap.get(productId);
    if (!product) return;
    setLeadDraft((current) => ({ ...current, productId, sku: product.sku, category: product.categoryId }));
  }

  async function saveLead() {
    if (!leadDraft.productId || !leadSha) return setStatus("اختر المنتج وتأكد من تهيئة المخزن الخاص.");
    setBusy(true);
    const next = leads.some((lead) => lead.leadId === leadDraft.leadId) ? leads.map((lead) => lead.leadId === leadDraft.leadId ? leadDraft : lead) : [...leads, leadDraft];
    const response = await fetch("/api/admin/leads", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ leads: next, sha: leadSha }) });
    const data = (await response.json().catch(() => null)) as { commitSha?: string; error?: string } | null;
    if (response.ok) {
      setLeads(next);
      setLeadSha(data?.commitSha ?? leadSha);
      setStatus("تم حفظ Lead في السجل الخاص.");
      setLeadDraft(emptyLead(products[0]));
    } else setStatus(data?.error ?? "تعذر حفظ Lead.");
    setBusy(false);
  }

  async function saveOrder() {
    const lead = leads.find((item) => item.leadId === orderDraft.leadId);
    const value = Number(orderDraft.value);
    if (!lead || !orderSha || !Number.isFinite(value) || value < 0) return setStatus("اختر Lead وأدخل قيمة طلب صحيحة.");
    const product = productMap.get(lead.productId);
    if (!product) return setStatus("المنتج المرتبط بالـ Lead غير موجود في الكتالوج.");
    setBusy(true);
    const next: OrderRecord[] = [...orders, { orderId: orderDraft.orderId, transactionId: orderDraft.transactionId, leadId: lead.leadId, confirmedAt: new Date().toISOString(), value, currency: "EGP", items: [{ productId: product.id, sku: product.sku, category: product.categoryId, price: value, quantity: 1 }] }];
    const response = await fetch("/api/admin/orders", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orders: next, sha: orderSha }) });
    const data = (await response.json().catch(() => null)) as { commitSha?: string; error?: string } | null;
    if (response.ok) {
      setOrders(next);
      setOrderSha(data?.commitSha ?? orderSha);
      setStatus("تم تسجيل الطلب المؤكد.");
      setOrderDraft({ orderId: `order-${Date.now()}`, transactionId: `txn-${Date.now()}`, leadId: "", value: "" });
    } else setStatus(data?.error ?? "تعذر حفظ الطلب.");
    setBusy(false);
  }

  return <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6 lg:col-span-2"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold text-brand-700">تشغيل ومتابعة</p><h2 className="mt-1 flex items-center gap-2 text-xl font-extrabold text-ink-900"><ClipboardList className="size-5" /> العملاء والطلبات</h2><p className="mt-1 text-xs text-ink-500">سجل داخلي للفريق فقط، بلا أسماء أو أرقام أو نصوص محادثات.</p></div><button onClick={() => void load()} disabled={busy} className="inline-flex items-center gap-1 rounded-xl border border-ink-200 px-3 py-2 text-xs font-bold text-ink-700"><RefreshCw className="size-4" /> تحديث</button></div><div className="mt-5 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl bg-ink-50 p-4"><h3 className="font-extrabold text-ink-900">إضافة أو تحديث Lead</h3><div className="mt-3 space-y-3"><label className="block text-xs font-bold text-ink-700">المنتج<select value={leadDraft.productId} onChange={(event) => chooseProduct(event.target.value)} className="mt-1 w-full rounded-xl border border-ink-200 bg-white px-3 py-3"><option value="">اختر المنتج</option>{products.map((product) => <option key={product.id} value={product.id}>{product.name} — {product.sku}</option>)}</select></label><label className="block text-xs font-bold text-ink-700">الحالة<select value={leadDraft.status} onChange={(event) => setLeadDraft({ ...leadDraft, status: event.target.value as LeadStatus })} className="mt-1 w-full rounded-xl border border-ink-200 bg-white px-3 py-3">{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><div className="grid grid-cols-2 gap-2"><input aria-label="مصدر Lead" value={leadDraft.source} onChange={(event) => setLeadDraft({ ...leadDraft, source: event.target.value })} placeholder="المصدر" className="rounded-xl border border-ink-200 px-3 py-3 text-sm" /><input aria-label="الحملة" value={leadDraft.campaign} onChange={(event) => setLeadDraft({ ...leadDraft, campaign: event.target.value })} placeholder="الحملة" className="rounded-xl border border-ink-200 px-3 py-3 text-sm" /></div><button onClick={() => void saveLead()} disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-3 text-sm font-extrabold text-white"><Save className="size-4" /> حفظ Lead</button></div></div><div className="rounded-2xl bg-ink-50 p-4"><h3 className="font-extrabold text-ink-900">تسجيل طلب مؤكد</h3><div className="mt-3 space-y-3"><select aria-label="Lead" value={orderDraft.leadId} onChange={(event) => setOrderDraft({ ...orderDraft, leadId: event.target.value })} className="w-full rounded-xl border border-ink-200 bg-white px-3 py-3 text-sm"><option value="">اختر Lead</option>{leads.map((lead) => <option key={lead.leadId} value={lead.leadId}>{lead.leadId} — {lead.sku} — {statusLabels[lead.status]}</option>)}</select><input aria-label="قيمة الطلب" type="number" min="0" value={orderDraft.value} onChange={(event) => setOrderDraft({ ...orderDraft, value: event.target.value })} placeholder="قيمة الطلب بالجنيه" className="w-full rounded-xl border border-ink-200 px-3 py-3 text-sm" /><button onClick={() => void saveOrder()} disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-4 py-3 text-sm font-extrabold text-white"><Save className="size-4" /> حفظ الطلب</button></div></div></div>{status && <p className="mt-4 rounded-xl bg-brand-50 p-3 text-sm font-bold text-brand-800">{status}</p>}<div className="mt-5 grid gap-2 sm:grid-cols-2"><div className="rounded-xl border border-ink-100 p-3 text-sm"><span className="text-ink-500">Leads</span><strong className="mx-2 text-brand-800">{leads.length}</strong></div><div className="rounded-xl border border-ink-100 p-3 text-sm"><span className="text-ink-500">طلبات مؤكدة</span><strong className="mx-2 text-accent-700">{orders.length}</strong></div></div></section>;
}
