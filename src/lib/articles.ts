import { ARTICLE_CATEGORIES, type ArticleCategory } from "@/lib/types";

const categoryTitles: Record<ArticleCategory, string> = {
  "thoughts-and-tips": "خواطر ونصائح (متجدد)",
  "family-and-educational": "مقالات عن العلاقات والتربية",
  psychological: "مقالات نفسية",
  "nominations-for-books-movies-and-novels": "ترشيحات الكتب والافلام والروايات",
  other: "مقالات أخرى",
  "english-articles": "English Articles",
  "my-journey-with-writing": "رحلتي مع الكتابة",
  "me-and-places": "أنا والأماكن",
  "short-story": "قصص مصوره",
  "opinion-articles-and-problems-mail": "مقالات الرأي وبريد المشكلات",
};

export function isCategory(value: string): value is ArticleCategory {
  return ARTICLE_CATEGORIES.includes(value as ArticleCategory);
}

export function getCategoryTitle(category: ArticleCategory) {
  return categoryTitles[category];
}
