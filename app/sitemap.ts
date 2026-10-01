import type { MetadataRoute } from "next";
import { nav, getPosts } from "@/lib/content";
import { legalPages, site } from "@/lib/site";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", ...nav, ...legalPages.map((l) => `legal/${l}`), ...(await getPosts()).map((p) => `blog/${p.slug}`)];
  return pages.map((p) => ({ url: `${site.url}/${p}`, lastModified: new Date() }));
}
