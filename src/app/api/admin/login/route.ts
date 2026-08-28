import { NextResponse } from "next/server";
import { authenticate, createAdminSession, isAdminConfigured } from "@/lib/admin-auth";

export const runtime = "edge";

export async function POST(request: Request) {
  if (!isAdminConfigured()) return NextResponse.json({ error: "Admin access is not configured yet." }, { status: 503 });
  const body = (await request.json().catch(() => null)) as { username?: string; password?: string } | null;
  if (!body?.username || !body.password) return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  const identity = authenticate(body.username.trim(), body.password);
  if (!identity) return NextResponse.json({ error: "بيانات الدخول غير صحيحة." }, { status: 401 });
  await createAdminSession(identity);
  return NextResponse.json({ username: identity.username, role: identity.role });
}
