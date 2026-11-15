import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/articles/article-card";
import { Breadcrumbs } from "@/components/articles/breadcrumbs";
import { CardGrid } from "@/components/ui/card-grid";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { getArticleCategoryStaticParams } from "@/lib/article-static-params";
import { getCategoryTitle, isCategory } from "@/lib/articles";
import { getArticlesByCategory } from "@/lib/contentful";
import { buildMetadata } from "@/lib/metadata";

export const dynamic = "force-static";
export const revalidate = 300;

export function generateStaticParams() {
  return getArticleCategoryStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  if (!isCategory(category)) {
    return buildMetadata();
  }

  return buildMetadata({
    title: getCategoryTitle(category),
    keywords: ["المقالات", category],
    path: `/articles/${category}`,
  });
}

export function CategoryPagination({
  category,
  currentPage,
  totalPages,
}: {
  category: string
  currentPage: number
  totalPages: number
}) {
  return (
    <nav className="flex items-center justify-center gap-2" dir="rtl">
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        const href = page === 1 ? `/articles/${category}` : `/articles/${category}/${page}`;

        return (
          <Link
            key={href}
            href={href}
            className={`inline-flex size-11 items-center justify-center rounded-full border text-sm font-semibold transition ${
              page === currentPage
                ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                : "border-[var(--border)] bg-white/90 text-slate-700 hover:border-[var(--accent)]"
            }`}
          >
            {page}
          </Link>
        );
      })}
    </nav>
  );
}

export default async function ArticleCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!isCategory(category)) {
    notFound();
  }

  const { items, pagination } = await getArticlesByCategory(category, 1);

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

        <CardGrid columns={3}>
          {items.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </CardGrid>

        {pagination.totalPages > 1 ? (
          <CategoryPagination
            category={category}
            currentPage={1}
            totalPages={pagination.totalPages}
          />
        ) : null}
      </Section>
    </div>
  );
}
