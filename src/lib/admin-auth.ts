import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "omran_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

type AdminUser = {
  username: string;
  passwordHash: string;
  role?: "admin" | "editor";
};

type AdminSession = {
  username: string;
  role: "admin" | "editor";
  exp: number;
};

function secret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

function users(): AdminUser[] {
  try {
    const value = JSON.parse(process.env.ADMIN_USERS_JSON ?? "[]") as unknown;
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is AdminUser => {
      if (!item || typeof item !== "object") return false;
      const candidate = item as Record<string, unknown>;
      return typeof candidate.username === "string" && typeof candidate.passwordHash === "string";
    });
  } catch {
    return [];
  }
}

function encode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function isAdminConfigured() {
  return secret().length >= 32 && users().length > 0;
}

export function authenticate(username: string, password: string) {
  if (!isAdminConfigured()) return null;
  const user = users().find((candidate) => {
    const [salt, expectedHash] = candidate.passwordHash.split(":");
    if (!salt || !expectedHash) return false;
    const actualHash = scryptSync(password, salt, 32).toString("hex");
    return safeEqual(actualHash, expectedHash);
  });
  if (!user) return null;
  return { username: user.username, role: user.role ?? "editor" as const };
}

export async function createAdminSession(identity: { username: string; role: "admin" | "editor" }) {
  const payload: AdminSession = {
    username: identity.username,
    role: identity.role,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const encoded = encode(JSON.stringify(payload));
  const value = `${encoded}.${sign(encoded)}`;
  const store = await cookies();
  store.set(SESSION_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", { httpOnly: true, expires: new Date(0), path: "/" });
}

export async function getAdminSession(): Promise<AdminSession | null> {
  if (!isAdminConfigured()) return null;
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!value) return null;
  const [encoded, signature] = value.split(".");
  if (!encoded || !signature || !safeEqual(sign(encoded), signature)) return null;
  try {
    const session = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as AdminSession;
    if (!session.username || !session.exp || session.exp < Math.floor(Date.now() / 1000)) return null;
    return session;
  } catch {
    return null;
  }
}
