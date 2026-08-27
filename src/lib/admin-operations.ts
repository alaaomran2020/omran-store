import type { LeadRecord, OrderRecord } from "@/lib/operations-types";

const repo = process.env.ADMIN_DATA_GITHUB_REPO ?? "";
const branch = process.env.ADMIN_DATA_GITHUB_BRANCH ?? "main";

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
  if (!token() || !repo) throw new Error("Private operations storage is not configured.");
}

function contentUrl(path: string) {
  return `https://api.github.com/repos/${repo}/contents/${path}`;
}

async function readJson<T>(path: string) {
  ensureConfigured();
  const response = await fetch(`${contentUrl(path)}?ref=${encodeURIComponent(branch)}`, { headers: headers(), cache: "no-store" });
  if (!response.ok) throw new Error(`Private operations read failed: ${response.status}`);
  const body = (await response.json()) as { content?: string; encoding?: string; sha?: string };
  if (!body.content || body.encoding !== "base64" || !body.sha) throw new Error("Private operations returned an invalid payload.");
  return { records: JSON.parse(Buffer.from(body.content.replace(/\n/g, ""), "base64").toString("utf8")) as T[], sha: body.sha };
}

async function writeJson<T>(path: string, records: T[], sha: string, actor: string) {
  ensureConfigured();
  const response = await fetch(contentUrl(path), {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      message: `chore(operations): update ${path} by ${actor}`,
      content: Buffer.from(`${JSON.stringify(records, null, 2)}\n`, "utf8").toString("base64"),
      sha,
      branch,
    }),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Private operations write failed: ${response.status} ${detail.slice(0, 240)}`);
  }
  const body = (await response.json()) as { commit?: { sha?: string } };
  return body.commit?.sha ?? null;
}

export function readLeads() {
  return readJson<LeadRecord>("leads.json");
}

export function readOrders() {
  return readJson<OrderRecord>("orders.json");
}

export function writeLeads(records: LeadRecord[], sha: string, actor: string) {
  return writeJson("leads.json", records, sha, actor);
}

export function writeOrders(records: OrderRecord[], sha: string, actor: string) {
  return writeJson("orders.json", records, sha, actor);
}
