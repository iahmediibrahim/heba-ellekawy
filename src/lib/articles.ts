import { ARTICLE_CATEGORIES, type ArticleCategory } from "@/lib/types"

const categoryTitles: Record<ArticleCategory, string> = {
  "thoughts-and-tips": "خواطر ونصائح نفسية",
  "family-and-educational": "مقالات عن العلاقات والتربية",
  psychological: "مقالات نفسية",
  "nominations-for-books-movies-and-novels": "ترشيحات الكتب والأفلام والروايات",
  other: "خواطر ومقالات عامة",
  "english-articles": "English Articles",
  "my-journey-with-writing": "رحلتي مع الكتابة",
  "me-and-places": "أنا والأماكن",
  "short-story": "قصص مصورة",
  "opinion-articles-and-problems-mail": "بريد المشكلات",
}

export function isCategory(value: string): value is ArticleCategory {
  return ARTICLE_CATEGORIES.includes(value as ArticleCategory)
}

export function getCategoryTitle(category: ArticleCategory) {
  return categoryTitles[category]
}
