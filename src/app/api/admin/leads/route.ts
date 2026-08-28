import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { readLeads, writeLeads } from "@/lib/admin-operations";
import type { LeadRecord, LeadStatus } from "@/lib/operations-types";

export const runtime = "nodejs";
const statuses = new Set<LeadStatus>(["new", "contacted", "qualified", "negotiating", "won", "lost"]);

function validateLeads(value: unknown): LeadRecord[] {
  if (!Array.isArray(value)) throw new Error("يجب أن يكون سجل العملاء قائمة.");
  const ids = new Set<string>();
  return value.map((item) => {
    if (!item || typeof item !== "object") throw new Error("سجل العميل غير صالح.");
    const lead = item as Partial<LeadRecord>;
    if (typeof lead.leadId !== "string" || !lead.leadId.trim() || ids.has(lead.leadId)) throw new Error("معرف العميل مفقود أو مكرر.");
    if (typeof lead.createdAt !== "string" || typeof lead.productId !== "string" || typeof lead.sku !== "string" || typeof lead.category !== "string") throw new Error("بيانات العميل الأساسية غير مكتملة.");
    if (!statuses.has(lead.status as LeadStatus)) throw new Error("حالة العميل غير صالحة.");
    if (typeof lead.source !== "string" || typeof lead.medium !== "string" || typeof lead.campaign !== "string") throw new Error("بيانات مصدر العميل غير مكتملة.");
    ids.add(lead.leadId);
    return lead as LeadRecord;
  });
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  try {
    const result = await readLeads();
    return NextResponse.json({ leads: result.records, sha: result.sha });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "تعذر قراءة سجل العملاء." }, { status: 502 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  const body = (await request.json().catch(() => null)) as { leads?: unknown; sha?: string } | null;
  if (!body?.sha || typeof body.sha !== "string") return NextResponse.json({ error: "نسخة سجل العملاء غير محددة." }, { status: 400 });
  try {
    const leads = validateLeads(body.leads);
    const commitSha = await writeLeads(leads, body.sha, session.username);
    return NextResponse.json({ ok: true, commitSha });
  } catch (error) {
    const message = error instanceof Error ? error.message : "تعذر حفظ سجل العملاء.";
    return NextResponse.json({ error: message }, { status: message.includes("409") ? 409 : 400 });
  }
}
