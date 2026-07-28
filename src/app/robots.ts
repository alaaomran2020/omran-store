import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// مطلوب للتصدير الثابت (output: export)
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/checkout/" }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
