import Image from "next/image"
import Link from "next/link"

import { ArticleMeta } from "@/components/articles/article-meta"
import { getCategoryTitle } from "@/lib/articles"
import type { BlogPost } from "@/lib/types"

export function ArticleCard({
  article,
  priority = false,
  featured = false,
}: {
  article: BlogPost
  priority?: boolean
  featured?: boolean
}) {
  return (
    <article
      className={`surface-card flex overflow-hidden transition hover:-translate-y-1 ${
        featured ? "group flex-col md:grid md:grid-cols-2" : "h-full flex-col"
      }`}
    >
      <div
        className={`relative aspect-[16/10] overflow-hidden bg-[var(--surface-muted)] ${
          featured ? "md:order-2 md:aspect-auto md:min-h-[24rem]" : ""
        }`}
      >
        {article.heroImage ? (
          <Image
            src={article.heroImage.url}
            alt={article.title}
            fill
            className={`object-cover transition duration-500 ${
              featured ? "group-hover:scale-[1.03]" : "hover:scale-[1.03]"
            }`}
            sizes={
              featured
                ? "(min-width: 1024px) 50vw, 100vw"
                : "(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
            }
            priority={priority}
            fetchPriority={priority ? "high" : undefined}
            loading={priority ? "eager" : "lazy"}
          />
        ) : null}
        <div className="absolute inset-x-4 top-4 flex justify-between gap-3">
          <span className="pill-badge bg-white/88 px-3 py-2 text-xs">
            {getCategoryTitle(article.category)}
          </span>
        </div>
      </div>
      <div
        className={`flex flex-1 flex-col justify-between gap-4 p-6 ${
          featured ? "md:order-1 md:p-8 lg:p-10" : ""
        }`}
      >
        <div className="space-y-3 text-right">
          <h3
            className={`font-bold leading-9 text-slate-900 ${
              featured ? "text-2xl sm:text-3xl" : "text-xl"
            }`}
          >
            {article.title}
          </h3>
          <ArticleMeta article={article} />
          {article.description ? (
            <p
              className={
                article.category === "english-articles"
                  ? "line-clamp-6 text-left text-[var(--text-muted)]"
                  : "line-clamp-6 text-right text-[var(--text-muted)]"
              }
            >
              {article.description}
            </p>
          ) : null}
        </div>
        <div
          className={article.category === "english-articles" ? "text-left" : "text-right"}
        >
          <Link
            href={`/articles/${article.category}/${article.slug}`}
            className={featured ? "primary-button" : "secondary-button"}
          >
            {article.category === "english-articles" ? "Read More" : "أقرأ المزيد"}
          </Link>
        </div>
      </div>
    </article>
  )
}
