import type { MetadataRoute } from "next";

import { getLatestArticles } from "@/lib/contentful";
import { getSiteUrl } from "@/lib/site-url";
import { ARTICLE_CATEGORIES } from "@/lib/types";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const now = new Date()

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/blog", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/author", priority: 0.6 },
    { path: "/stories", priority: 0.7 },
    { path: "/novels-books", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
  ].map(route => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route.priority,
  }))

  const categoryRoutes = ARTICLE_CATEGORIES.map(category => ({
    url: `${siteUrl}/articles/${category}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
    }))

  const articles = await getLatestArticles(200)

  const articleRoutes = articles.map(article => ({
    url: `${siteUrl}/articles/${article.category}/${article.slug}`,
    lastModified: article.publishDate ? new Date(article.publishDate) : now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes]
}
