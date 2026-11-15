import { BookOpen } from "lucide-react"
import type { Metadata } from "next"

import { ArticleCard } from "@/components/articles/article-card"
import { CategoryGrid } from "@/components/sections/category-grid"
import { ButtonLink } from "@/components/ui/button"
import { CardGrid } from "@/components/ui/card-grid"
import { PageHeader } from "@/components/ui/page-header"
import { Section, SectionHeading } from "@/components/ui/section"
import { getLatestArticles } from "@/lib/contentful"
import { buildMetadata } from "@/lib/metadata"

export const dynamic = "force-static"
export const revalidate = 300

export const metadata: Metadata = buildMetadata({
  title: "المدونة",
  description:
    "كل مقالات د. هبة اللكاوي في مكان واحد: مقالات نفسية، مقالات عن العلاقات والتربية، كتابة حرة، ترشيحات كتب وأفلام، ورحلات مع الكتابة.",
  keywords: ["المدونة", "المقالات", "مقالات نفسية", "كتابة حرة"],
  path: "/blog",
})

export default async function BlogPage() {
  const articles = await getLatestArticles(12)

  return (
    <div className="page-shell">
      <Section>
        <PageHeader
          eyebrow="المدونة"
          title="كل المقالات في مكان واحد"
          copy="مجموعة مقالات في النفس والعلاقات والتربية والكتابة الحرة — اختر القسم الذي يناسبك وابدأ القراءة."
        />

        <CategoryGrid />
      </Section>

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="الأحدث" title="أحدث المقالات" />
          <ButtonLink
            href="/articles/psychological"
            variant="secondary"
            icon={<BookOpen className="size-4" />}
          >
            تصفح المقالات النفسية
          </ButtonLink>
        </div>

        {articles.length ? (
          <CardGrid columns={3}>
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </CardGrid>
        ) : (
          <div className="surface-muted p-8 text-center text-[var(--text-muted)]">
            لا توجد مقالات منشورة بعد.
          </div>
        )}
      </Section>
    </div>
  )
}
