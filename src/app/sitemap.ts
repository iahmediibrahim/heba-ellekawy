import type { MetadataRoute } from "next"

import { CATEGORY_ARTICLES_PER_PAGE } from "@/lib/articles"
import { getSitemapArticles } from "@/lib/contentful"
import { getSiteUrl } from "@/lib/site-url"
import { ARTICLE_CATEGORIES } from "@/lib/types"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const now = new Date()

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/blog", priority: 0.9 },
    { path: "/author", priority: 0.6 },
    { path: "/stories", priority: 0.7 },
    { path: "/novels-books", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
  ].map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route.priority,
  }))

  const categoryRoutes = ARTICLE_CATEGORIES.map((category) => ({
    url: `${siteUrl}/articles/${category}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const articles = await getSitemapArticles()
  const categoryCounts = new Map<string, number>()

  for (const article of articles) {
    categoryCounts.set(article.category, (categoryCounts.get(article.category) ?? 0) + 1)
  }

  const categoryPaginationRoutes = ARTICLE_CATEGORIES.flatMap((category) => {
    const totalPages = Math.ceil(
      (categoryCounts.get(category) ?? 0) / CATEGORY_ARTICLES_PER_PAGE,
    )

    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => {
      const page = index + 2

      return {
        url: `${siteUrl}/articles/${category}/${page}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.5,
      }
    })
  })

  const articleRoutes = articles.map((article) => ({
    url: `${siteUrl}/articles/${article.category}/${article.slug}`,
    lastModified: article.publishDate ? new Date(article.publishDate) : now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...categoryPaginationRoutes,
    ...articleRoutes,
  ]
}
