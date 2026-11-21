import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { FaFacebookF } from "react-icons/fa6"

import { ArticleCard } from "@/components/articles/article-card"
import { ButtonLink } from "@/components/ui/button"
import { CardMedia } from "@/components/ui/card"
import { CardGrid } from "@/components/ui/card-grid"
import { EmptyState } from "@/components/ui/empty-state"
import { Prose } from "@/components/ui/prose"
import { SectionHeading } from "@/components/ui/section"
import { getAuthorData, getLatestArticles } from "@/lib/contentful"
import { buildMetadata } from "@/lib/metadata"

export async function generateMetadata(): Promise<Metadata> {
  const author = await getAuthorData()

  if (!author) {
    notFound()
  }

  const description = author.shortBio.replace(/\s+/g, " ").trim() || author.description

  return buildMetadata({
    title: `${author.name} ${author.title ? `- ${author.title}` : ""}`,
    description,
    keywords: ["عن المؤسس", "السيرة الذاتية", "د. هبة اللكاوي"],
    path: "/author",
    image: author?.image
      ? {
          src: author.image.url,
          width: author.image.width,
          height: author.image.height,
        }
      : undefined,
  })
}

export default async function AuthorPage() {
  const [author, latestArticles] = await Promise.all([
    getAuthorData(),
    getLatestArticles(3),
  ])

  if (!author) {
    notFound()
  }

  return (
    <div className="page-shell">
      <section className="surface-card grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:p-10">
        <div className="relative order-1 mx-auto aspect-[4/5] w-full max-w-[220px] overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface-muted)] lg:order-2">
          {author.image ? (
            <CardMedia
              src={author.image.url}
              alt={author.name}
              fill
              sizes="(min-width: 1024px) 240px, 60vw"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center p-4 text-center text-sm font-bold text-[var(--text-muted)]">
              {author.name}
            </div>
          )}
        </div>

        <div className="order-2 space-y-4 text-right lg:order-1">
          <p className="eyebrow">من آنا</p>
          <h1 className="flex flex-wrap items-center gap-3 text-3xl font-black text-slate-950 sm:text-4xl">
            {author.name}
          </h1>
          {author.title ? (
            <p className="text-base font-semibold leading-8 text-[var(--text-muted)]">
              {author.title}
            </p>
          ) : null}
          {author.facebook ? (
            <ButtonLink
              href={author.facebook}
              variant="secondary"
              external
              className="bg-[#1877f2]/10 text-[#1877f2]"
              icon={<FaFacebookF className="size-4" aria-hidden="true" />}
            >
              Facebook
            </ButtonLink>
          ) : null}
        </div>
      </section>

      <section className="section-stack">
        <SectionHeading eyebrow="نبذة" title="عن هبة" />
        <Prose
          html={author.descriptionHtml ?? `<p>${author.description}</p>`}
          className="surface-card p-6 text-right text-base leading-9 text-slate-600 sm:p-8"
        />
      </section>

      <section className="section-stack">
        <SectionHeading
          eyebrow="من كتاباتي"
          title="أحدث المقالات"
          copy="قراءات مختارة من مدونة شغبطة."
        />
        {latestArticles.length ? (
          <CardGrid columns={3}>
            {latestArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} priority={index === 0} />
            ))}
          </CardGrid>
        ) : (
          <EmptyState>لا توجد مقالات منشورة حاليًا.</EmptyState>
        )}
      </section>
    </div>
  )
}
