import { NextResponse } from "next/server";
import { getAdminSession, isAdminConfigured } from "@/lib/admin-auth";
import { publishCatalogToGitHub, readCatalogFromGitHub } from "@/lib/admin-github";
import { validateCatalog } from "@/lib/admin-validation";

export const runtime = "nodejs";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: isAdminConfigured() ? "غير مصرح." : "لوحة الإدارة غير مهيأة بعد." }, { status: isAdminConfigured() ? 401 : 503 });
  try {
    const catalog = await readCatalogFromGitHub();
    return NextResponse.json({ products: catalog.products, sha: catalog.sha });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "تعذر قراءة الكتالوج." }, { status: 502 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  const body = (await request.json().catch(() => null)) as { products?: unknown; sha?: string } | null;
  if (!body?.sha || typeof body.sha !== "string") return NextResponse.json({ error: "نسخة الكتالوج غير محددة." }, { status: 400 });
  try {
    const products = validateCatalog(body.products);
    const commitSha = await publishCatalogToGitHub(products, body.sha, session.username);
    return NextResponse.json({ ok: true, commitSha });
  } catch (error) {
    const message = error instanceof Error ? error.message : "تعذر نشر الكتالوج.";
    const status = message.includes("409") ? 409 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
