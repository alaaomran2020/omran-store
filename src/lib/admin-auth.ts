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

// إنشاء التوقيع باستخدام Web Crypto API ليتوافق مع Edge Runtime
async function sign(payload: string) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret());
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(payload));
  return Buffer.from(signature).toString("base64url");
}

// تشفير كلمات المرور باستخدام PBKDF2 (بديل scrypt ليتوافق مع Edge Runtime)
async function hashPassword(password: string, salt: string) {
  const encoder = new TextEncoder();
  const passKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations: 100000,
      hash: "SHA-256",
    },
    passKey,
    256 // 32 bytes
  );
  return Buffer.from(hashBuffer).toString("hex");
}

// مقارنة آمنة للوقت (Constant-time comparison) مبنية برمجياً
function safeEqual(left: string, right: string) {
  const a = new TextEncoder().encode(left);
  const b = new TextEncoder().encode(right);
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a[i] ^ b[i];
  }
  return result === 0;
}

export function isAdminConfigured() {
  return secret().length >= 32 && users().length > 0;
}

export async function authenticate(username: string, password: string) {
  if (!isAdminConfigured()) return null;
  
  const user = users().find((u) => u.username === username);
  if (!user) return null;

  const [salt, expectedHash] = user.passwordHash.split(":");
  if (!salt || !expectedHash) return null;

  const actualHash = await hashPassword(password, salt);
  if (!safeEqual(actualHash, expectedHash)) return null;

  return { username: user.username, role: user.role ?? "editor" as const };
}

export async function createAdminSession(identity: { username: string; role: "admin" | "editor" }) {
  const payload: AdminSession = {
    username: identity.username,
    role: identity.role,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const encoded = encode(JSON.stringify(payload));
  const signature = await sign(encoded);
  const value = `${encoded}.${signature}`;
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
  if (!encoded || !signature) return null;

  const expectedSignature = await sign(encoded);
  if (!safeEqual(expectedSignature, signature)) return null;

  try {
    const session = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as AdminSession;
    if (!session.username || !session.exp || session.exp < Math.floor(Date.now() / 1000)) return null;
    return session;
  } catch {
    return null;
  }
}
