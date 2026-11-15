import { ArrowUpLeft, BookOpen } from "lucide-react"
import Link from "next/link"

import { ButtonLink } from "@/components/ui/button"
import { CardMedia } from "@/components/ui/card"
import { truncateText } from "@/lib/format"
import type { BlogPost } from "@/lib/types"

export function HomeFeatured({
  heroArticle,
  articles,
}: {
  heroArticle?: BlogPost
  articles: BlogPost[]
}) {
  if (!heroArticle) {
    return null
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <article className="surface-card overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-80 bg-[var(--surface-muted)]">
            {heroArticle.heroImage ? (
              <CardMedia
                src={heroArticle.heroImage.url}
                alt={heroArticle.title}
                fill
                sizes="(min-width: 1024px) 32vw, 100vw"
              />
            ) : null}
          </div>
          <div className="flex flex-col justify-between gap-5 p-6 text-right lg:p-8">
            <div className="space-y-4">
              <span className="pill-badge w-fit">مقال مميز</span>
              <h2 className="text-3xl font-black leading-[1.6] text-slate-950">
                {heroArticle.title}
              </h2>
              {heroArticle.description ? (
                <p className="text-base leading-9 text-[var(--text-muted)]">
                  {truncateText(heroArticle.description, 220)}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap justify-end gap-3">
              <ButtonLink
                href={`/articles/${heroArticle.category}/${heroArticle.slug}`}
                variant="primary"
              >
                اقرأ المقال
              </ButtonLink>
              <ButtonLink href="/blog" variant="secondary">
                المزيد من المدونة
              </ButtonLink>
            </div>
          </div>
        </div>
      </article>

      <div className="grid gap-4">
        {articles.map(article => (
          <Link
            key={article.id}
            href={`/articles/${article.category}/${article.slug}`}
            className="surface-card grid gap-4 p-4 text-right transition hover:-translate-y-0.5 sm:grid-cols-[5.5rem_1fr]"
          >
            <div className="relative h-24 overflow-hidden rounded-[1.1rem] bg-[var(--surface-muted)] sm:w-[5.5rem]">
              {article.heroImage ? (
                <CardMedia
                  src={article.heroImage.url}
                  alt={article.title}
                  fill
                  sizes="88px"
                />
              ) : null}
            </div>
            <div>
              <h3 className="line-clamp-2 text-lg font-bold leading-8 text-slate-900">
                {article.title}
              </h3>
              {article.description ? (
                <p className="mt-2 line-clamp-2 text-sm leading-7 text-[var(--text-muted)]">
                  {article.description}
                </p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
