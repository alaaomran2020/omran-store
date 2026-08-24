import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { catalogProducts } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo";

/** مطلوب للتصدير الثابت (output: export) */
export const dynamic = "force-static";

/** الصفحات الثابتة للموقع مع أولوية الزحف وتكرار التحديث. */
const staticPages: Array<{ path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly"; title?: string }> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/products", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/shipping", priority: 0.4, changeFrequency: "yearly" },
  { path: "/return", priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.4, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...staticPages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...catalogProducts.map((product) => ({
      url: absoluteUrl(`/products/${product.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
