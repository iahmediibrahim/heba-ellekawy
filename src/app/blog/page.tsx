import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { LuSearch } from "react-icons/lu"

import { ArticleCard } from "@/components/articles/article-card"
import { CategoryGrid } from "@/components/sections/category-grid"
import { CardGrid } from "@/components/ui/card-grid"
import { CustomDropdown } from "@/components/ui/custom-dropdown"
import { EmptyState } from "@/components/ui/empty-state"
import { PageHeader } from "@/components/ui/page-header"
import { Section, SectionHeading } from "@/components/ui/section"
import { getCategoryTitle, isCategory } from "@/lib/articles"
import { getArticles, getFeaturedArticles } from "@/lib/contentful"
import { buildMetadata } from "@/lib/metadata"
import { ARTICLE_CATEGORIES } from "@/lib/types"

export const revalidate = 300

const ARTICLES_PER_PAGE = 12

export const metadata: Metadata = buildMetadata({
  title: "مدونة شغبطة",
  description:
    "مدونة شغبطة تضم مقالات د. هبة اللكاوي في الصحة النفسية والعلاج النفسي والكتابة الحرة والأفلام القصيرة.",
  keywords: ["مدونة شغبطة", "فضاءات", "العلاج النفسي", "الأفلام القصيرة"],
  path: "/blog",
})

function getPageHref(page: number, query: string, category?: string) {
  const params = new URLSearchParams()

  if (query) {
    params.set("q", query)
  }

  if (category) {
    params.set("category", category)
  }

  if (page > 1) {
    params.set("page", String(page))
  }

  const search = params.toString()

  return search ? `/blog?${search}` : "/blog"
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const query = typeof params.q === "string" ? params.q.trim().slice(0, 100) : ""
  const requestedCategory =
    typeof params.category === "string" ? params.category : undefined
  const category =
    requestedCategory && isCategory(requestedCategory) ? requestedCategory : undefined
  const requestedPage = typeof params.page === "string" ? Number(params.page) : 1
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1
  const hasFilters = Boolean(query || category)
  const [result, featuredArticles] = await Promise.all([
    getArticles(page, ARTICLES_PER_PAGE, query, category),
    !hasFilters && page === 1 ? getFeaturedArticles(1) : Promise.resolve([]),
  ])
  const { items: articles, pagination } = result

  if (page > pagination.totalPages) {
    redirect(getPageHref(pagination.totalPages, query, category))
  }

  if (!hasFilters && pagination.totalItems === 0) {
    notFound()
  }

  const featuredArticle =
    !hasFilters && page === 1 ? (featuredArticles[0] ?? articles[0]) : undefined
  const listingArticles = featuredArticle
    ? articles.filter((article) => article.id !== featuredArticle.id)
    : articles

  return (
    <div className="page-shell">
      <Section className="gap-5">
        <PageHeader
          eyebrow="فضاءات"
          title="مدونة شغبطة"
          copy="كل المقالات والتصنيفات في مكان واحد — اختر القسم الذي يناسبك وابدأ القراءة."
        />

        <CategoryGrid headingLevel={2} />
      </Section>

      <Section>
        {featuredArticle ? (
          <div className="section-stack">
            <SectionHeading eyebrow="مختارات" title="مقال مميز" />
            <ArticleCard article={featuredArticle} featured priority />
          </div>
        ) : null}

        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow={hasFilters ? "نتائج البحث" : "مكتبة المقالات"}
            title={hasFilters ? "نتائج المقالات" : "جميع المقالات"}
            copy={`${pagination.totalItems} مقال`}
          />
        </div>

        <form
          action="/blog"
          method="get"
          role="search"
          className="surface-card grid gap-3 p-4 md:grid-cols-[minmax(0,1.3fr)_minmax(220px,0.7fr)_auto] md:items-end"
        >
          <label className="space-y-2 text-sm font-semibold text-slate-800">
            <span>ابحث في المقالات</span>
            <input
              type="search"
              name="q"
              defaultValue={query}
              maxLength={100}
              dir="auto"
              placeholder="عنوان المقال أو كلمة مفتاحية"
              className="input-field"
            />
          </label>
          <CustomDropdown
            label="التصنيف"
            name="category"
            value={category ?? ""}
            options={[
              { value: "", label: "كل التصنيفات" },
              ...ARTICLE_CATEGORIES.map((item) => ({
                value: item,
                label: getCategoryTitle(item),
              })),
            ]}
          />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="primary-button inline-flex items-center justify-center gap-2"
            >
              <LuSearch className="size-4" aria-hidden="true" />
              بحث
            </button>
            {hasFilters ? (
              <Link
                href="/blog"
                className="text-sm font-semibold text-[var(--accent)] transition hover:text-[var(--accent-cyan)]"
              >
                مسح التصفية
              </Link>
            ) : null}
          </div>
        </form>

        {listingArticles.length ? (
          <CardGrid columns={3}>
            {listingArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </CardGrid>
        ) : hasFilters || !featuredArticle ? (
          <EmptyState>
            {hasFilters
              ? "لم نعثر على مقالات تطابق اختياراتك."
              : "لا توجد مقالات منشورة حاليًا."}
          </EmptyState>
        ) : null}

        {pagination.totalPages > 1 ? (
          <nav
            aria-label="صفحات المقالات"
            className="flex items-center justify-center gap-4"
            dir="rtl"
          >
            {page > 1 ? (
              <Link
                href={getPageHref(page - 1, query, category)}
                className="secondary-button"
              >
                السابق
              </Link>
            ) : (
              <span className="secondary-button opacity-50" aria-disabled="true">
                السابق
              </span>
            )}
            <span className="text-sm font-semibold text-[var(--text-muted)]">
              صفحة {page} من {pagination.totalPages}
            </span>
            {page < pagination.totalPages ? (
              <Link
                href={getPageHref(page + 1, query, category)}
                className="secondary-button"
              >
                التالي
              </Link>
            ) : (
              <span className="secondary-button opacity-50" aria-disabled="true">
                التالي
              </span>
            )}
          </nav>
        ) : null}
      </Section>
    </div>
  )
}
