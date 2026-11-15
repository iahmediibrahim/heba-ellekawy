import { createClient } from "contentful"
import kebabCase from "lodash/kebabCase"

import { ARTICLE_CATEGORIES, type ArticleCategory } from "@/lib/types"

const POSTS_PER_PAGE = 6

type RawArticle = {
  category: string
  slug?: string
  title?: string
}

let client: ReturnType<typeof createClient> | null = null

function hasContentfulConfig() {
  return Boolean(process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN)
}

function getClient() {
  if (!hasContentfulConfig()) {
    return null
  }

  if (client) {
    return client
  }

  client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  })

  return client
}

function isCategory(value: string): value is ArticleCategory {
  return ARTICLE_CATEGORIES.includes(value as ArticleCategory)
}

function normalizeSlug(value: string) {
  return kebabCase(value)
}

async function getAllRawArticles(): Promise<RawArticle[]> {
  const contentfulClient = getClient()

  if (contentfulClient === null) {
    return []
  }

  const response = await contentfulClient.getEntries({
    content_type: "blogPost",
    select: ["fields.category", "fields.slug", "fields.title"],
    limit: 1000,
    include: 0,
  })

  return response.items.map((item) => ({
    category: String(item.fields.category ?? ""),
    slug: item.fields.slug ? String(item.fields.slug) : undefined,
    title: item.fields.title ? String(item.fields.title) : undefined,
  }))
}

export function getArticleCategoryStaticParams() {
  return ARTICLE_CATEGORIES.map((category) => ({ category }))
}

export async function getArticleEntryStaticParams() {
  const articles = await getAllRawArticles()
  const params: Array<{ category: string; entry: string }> = []
  const categoryCounts = new Map<ArticleCategory, number>()

  for (const article of articles) {
    if (!isCategory(article.category)) {
      continue
    }

    categoryCounts.set(article.category, (categoryCounts.get(article.category) ?? 0) + 1)

    const source = article.slug ?? article.title

    if (!source) {
      continue
    }

    params.push({
      category: article.category,
      entry: normalizeSlug(source),
    })
  }

  for (const category of ARTICLE_CATEGORIES) {
    const count = categoryCounts.get(category) ?? 0
    const totalPages = Math.ceil(count / POSTS_PER_PAGE)

    for (let page = 2; page <= totalPages; page += 1) {
      params.push({
        category,
        entry: String(page),
      })
    }
  }

  return params
}
