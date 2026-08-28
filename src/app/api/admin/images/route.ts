import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { uploadProductImageToGitHub } from "@/lib/admin-github";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "اختر صورة أولاً." }, { status: 400 });
  try {
    const src = await uploadProductImageToGitHub(file, session.username);
    return NextResponse.json({ src });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "تعذر رفع الصورة." }, { status: 400 });
  }
}
