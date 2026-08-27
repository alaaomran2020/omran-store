import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { readOrders, writeOrders } from "@/lib/admin-operations";
import type { OrderRecord } from "@/lib/operations-types";

export const runtime = "nodejs";

function validateOrders(value: unknown): OrderRecord[] {
  if (!Array.isArray(value)) throw new Error("يجب أن يكون سجل الطلبات قائمة.");
  const orderIds = new Set<string>();
  const transactionIds = new Set<string>();
  return value.map((item) => {
    if (!item || typeof item !== "object") throw new Error("سجل الطلب غير صالح.");
    const order = item as Partial<OrderRecord>;
    if (typeof order.orderId !== "string" || !order.orderId.trim() || orderIds.has(order.orderId)) throw new Error("رقم الطلب مفقود أو مكرر.");
    if (typeof order.transactionId !== "string" || !order.transactionId.trim() || transactionIds.has(order.transactionId)) throw new Error("رقم المعاملة مفقود أو مكرر.");
    if (typeof order.leadId !== "string" || typeof order.confirmedAt !== "string" || order.currency !== "EGP") throw new Error("بيانات الطلب الأساسية غير مكتملة.");
    if (typeof order.value !== "number" || !Number.isFinite(order.value) || order.value < 0) throw new Error("قيمة الطلب غير صالحة.");
    if (!Array.isArray(order.items) || order.items.length === 0) throw new Error("يجب أن يحتوي الطلب على منتج واحد على الأقل.");
    for (const item of order.items) {
      if (!item || typeof item !== "object") throw new Error("عنصر الطلب غير صالح.");
      if (typeof item.productId !== "string" || typeof item.sku !== "string" || typeof item.category !== "string" || typeof item.price !== "number" || item.price < 0 || typeof item.quantity !== "number" || item.quantity <= 0) throw new Error("بيانات عنصر الطلب غير صالحة.");
    }
    orderIds.add(order.orderId);
    transactionIds.add(order.transactionId);
    return order as OrderRecord;
  });
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  try {
    const result = await readOrders();
    return NextResponse.json({ orders: result.records, sha: result.sha });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "تعذر قراءة سجل الطلبات." }, { status: 502 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  const body = (await request.json().catch(() => null)) as { orders?: unknown; sha?: string } | null;
  if (!body?.sha || typeof body.sha !== "string") return NextResponse.json({ error: "نسخة سجل الطلبات غير محددة." }, { status: 400 });
  try {
    const orders = validateOrders(body.orders);
    const commitSha = await writeOrders(orders, body.sha, session.username);
    return NextResponse.json({ ok: true, commitSha });
  } catch (error) {
    const message = error instanceof Error ? error.message : "تعذر حفظ سجل الطلبات.";
    return NextResponse.json({ error: message }, { status: message.includes("409") ? 409 : 400 });
  }
}
