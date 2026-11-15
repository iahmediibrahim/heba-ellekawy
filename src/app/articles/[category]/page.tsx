import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ArticleCard } from "@/components/articles/article-card"
import { Breadcrumbs } from "@/components/articles/breadcrumbs"
import { CategoryPagination } from "@/components/articles/category-pagination"
import { CardGrid } from "@/components/ui/card-grid"
import { EmptyState } from "@/components/ui/empty-state"
import { PageHeader } from "@/components/ui/page-header"
import { Section } from "@/components/ui/section"
import { getArticleCategoryStaticParams } from "@/lib/article-static-params"
import { getCategoryTitle, isCategory } from "@/lib/articles"
import { getArticlesByCategory } from "@/lib/contentful"
import { buildMetadata } from "@/lib/metadata"

export const dynamic = "force-static"
export const revalidate = 300

export function generateStaticParams() {
  return getArticleCategoryStaticParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params

  if (!isCategory(category)) {
    return buildMetadata()
  }

  return buildMetadata({
    title: getCategoryTitle(category),
    keywords: ["المقالات", category],
    path: `/articles/${category}`,
  })
}

export default async function ArticleCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params

  if (!isCategory(category)) {
    notFound()
  }

  const { items, pagination } = await getArticlesByCategory(category, 1)

  return (
    <div className="page-shell">
      <Section>
        <PageHeader
          breadcrumbs={
            <Breadcrumbs
              items={[
                { label: "الرئيسية", href: "/" },
                { label: "المدونة", href: "/blog" },
                { label: getCategoryTitle(category) },
              ]}
            />
          }
          eyebrow="التصنيف"
          title={getCategoryTitle(category)}
        />

        {items.length ? (
          <CardGrid columns={3}>
            {items.map((article, index) => (
              <ArticleCard key={article.id} article={article} priority={index === 0} />
            ))}
          </CardGrid>
        ) : (
          <EmptyState>لا توجد مقالات في هذا القسم حاليًا.</EmptyState>
        )}

        {pagination.totalPages > 1 ? (
          <CategoryPagination
            category={category}
            currentPage={1}
            totalPages={pagination.totalPages}
          />
        ) : null}
      </Section>
    </div>
  )
}
