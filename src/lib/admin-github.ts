import type { Product } from "@/lib/types";

const repo = process.env.ADMIN_GITHUB_REPO ?? "alaaomran2020/omran-store";
const branch = process.env.ADMIN_GITHUB_BRANCH ?? "main";

function token() {
  return process.env.ADMIN_GITHUB_TOKEN ?? "";
}

function headers() {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token()}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

function ensureConfigured() {
  if (!token()) throw new Error("Admin publishing is not configured.");
}

function contentUrl() {
  return `https://api.github.com/repos/${repo}/contents/src/data/catalog-products.json`;
}

export async function readCatalogFromGitHub() {
  ensureConfigured();
  const response = await fetch(`${contentUrl()}?ref=${encodeURIComponent(branch)}`, {
    headers: headers(),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`GitHub catalog read failed: ${response.status}`);
  const body = (await response.json()) as { content?: string; encoding?: string; sha?: string };
  if (!body.content || body.encoding !== "base64" || !body.sha) throw new Error("GitHub returned an invalid catalog payload.");
  const json = Buffer.from(body.content.replace(/\n/g, ""), "base64").toString("utf8");
  return { products: JSON.parse(json) as Product[], sha: body.sha };
}

export async function uploadProductImageToGitHub(file: File, actor: string) {
  ensureConfigured();
  const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);
  if (!allowed.has(file.type)) throw new Error("نوع الصورة غير مدعوم. استخدم JPG أو PNG أو WebP.");
  if (file.size > 5 * 1024 * 1024) throw new Error("حجم الصورة يجب ألا يتجاوز 5 ميجابايت.");
  const extension = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9-_]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "product-image";
  const path = `public/uploads/${Date.now()}-${safeName}.${extension}`;
  const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      message: `chore(admin): upload product image by ${actor}`,
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
      branch,
    }),
  });
  if (!response.ok) throw new Error(`GitHub image upload failed: ${response.status}`);
  return `/${path.replace(/^public\//, "")}`;
}

export async function publishCatalogToGitHub(products: Product[], sha: string, actor: string) {
  ensureConfigured();
  const response = await fetch(contentUrl(), {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      message: `chore(admin): update catalog by ${actor}`,
      content: Buffer.from(`${JSON.stringify(products, null, 2)}\n`, "utf8").toString("base64"),
      sha,
      branch,
    }),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GitHub catalog publish failed: ${response.status} ${detail.slice(0, 240)}`);
  }
  const body = (await response.json()) as { commit?: { sha?: string } };
  return body.commit?.sha ?? null;
}
