import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// مطلوب للتصدير الثابت (output: export)
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
