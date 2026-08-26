import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
const userId = process.env.INSTAGRAM_USER_ID;
const apiVersion = process.env.INSTAGRAM_API_VERSION || "v26.0";
const apiHost = process.env.INSTAGRAM_API_HOST || "graph.instagram.com";
const username = process.env.INSTAGRAM_USERNAME || "omrantoys.store";
const profileUrl = process.env.INSTAGRAM_PROFILE_URL || `https://www.instagram.com/${username}`;
const outputPath = path.resolve("src/data/instagram-feed.json");
const tempOutputPath = `${outputPath}.tmp`;

if (!accessToken) {
  throw new Error("Missing INSTAGRAM_ACCESS_TOKEN. Add it as a GitHub Actions secret; never commit it.");
}

if (!userId) {
  throw new Error("Missing INSTAGRAM_USER_ID. Add the Instagram professional account ID as a GitHub Actions variable.");
}

function asString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function absoluteHttpUrl(value) {
  const url = asString(value);
  return /^https?:\/\//i.test(url) ? url : null;
}

async function getJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    const message = body?.error?.message || `Meta API request failed with HTTP ${response.status}`;
    throw new Error(message);
  }
  return body;
}

function mediaUrlsFor(item) {
  const children = Array.isArray(item.children?.data) ? item.children.data : [];
  const candidates = [
    item.media_url,
    ...children.flatMap((child) => [child.media_url, child.thumbnail_url]),
    item.thumbnail_url,
  ];

  return [...new Set(candidates.map(absoluteHttpUrl).filter(Boolean))];
}

function normalizeItem(item) {
  const mediaUrls = mediaUrlsFor(item);
  const permalink = absoluteHttpUrl(item.permalink);
  if (!asString(item.id) || !permalink) return null;

  return {
    id: asString(item.id),
    mediaType: asString(item.media_type) || "IMAGE",
    imageUrl: mediaUrls[0] || null,
    mediaUrls,
    thumbnailUrl: absoluteHttpUrl(item.thumbnail_url),
    permalink,
    caption: asString(item.caption).slice(0, 800),
    timestamp: asString(item.timestamp) || null,
  };
}

const fields = [
  "id",
  "media_type",
  "media_url",
  "thumbnail_url",
  "permalink",
  "caption",
  "timestamp",
  "children{media_type,media_url,thumbnail_url}",
].join(",");

const query = new URLSearchParams({
  fields,
  limit: "12",
  access_token: accessToken,
});

const endpoint = `https://${apiHost}/${apiVersion}/${encodeURIComponent(userId)}/media?${query.toString()}`;
const response = await getJson(endpoint);
if (!Array.isArray(response.data)) {
  throw new Error("Meta API returned an invalid media payload: data must be an array.");
}

const items = response.data.map(normalizeItem).filter(Boolean).sort((a, b) => {
  const left = a.timestamp ? Date.parse(a.timestamp) : 0;
  const right = b.timestamp ? Date.parse(b.timestamp) : 0;
  return right - left;
});

let previousItemCount = 0;
try {
  const previous = JSON.parse(await readFile(outputPath, "utf8"));
  previousItemCount = Array.isArray(previous.items) ? previous.items.length : 0;
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

if (items.length === 0 && previousItemCount > 0) {
  throw new Error("Meta API returned zero media items; preserving the last valid Instagram feed.");
}

const feed = {
  username,
  profileUrl,
  lastSyncedAt: new Date().toISOString(),
  items,
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(tempOutputPath, `${JSON.stringify(feed, null, 2)}\n`, "utf8");
await rename(tempOutputPath, outputPath);

console.log(`Instagram feed synced: ${items.length} item(s) written to ${outputPath}`);
if (items.some((item) => !item.imageUrl)) {
  console.warn("Some items have no downloadable image URL; the website will show a safe link fallback.");
}
