import type { MetadataRoute } from "next";
import { catalogProducts } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const homeItem = {
    url: absoluteUrl("/"),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 1.0,
  };

  const productsItem = {
    url: absoluteUrl("/products"),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  };

  const otherPages = [
    "/about",
    "/contact",
    "/faq",
    "/shipping",
    "/return",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const productItems = catalogProducts.map((product) => ({
    url: absoluteUrl(`/products/${product.slug}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: product.featured ? 0.8 : 0.7,
  }));

  return [
    homeItem,
    productsItem,
    ...otherPages,
    ...productItems,
  ];
}
