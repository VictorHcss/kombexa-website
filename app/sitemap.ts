import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return ["/", "/tour", "/demo", "/privacidade"].map((path) => ({
    url: new URL(path, base).toString(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
