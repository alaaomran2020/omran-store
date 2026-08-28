import { NextResponse } from "next/server";
import { getAdminSession, isAdminConfigured } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  const user = await getAdminSession();
  if (!user) return NextResponse.json({ configured: isAdminConfigured() }, { status: 401 });
  return NextResponse.json({ user: { username: user.username, role: user.role } });
}
