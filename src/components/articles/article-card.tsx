import Image from "next/image"
import Link from "next/link"

import { ArticleMeta } from "@/components/articles/article-meta"
import { getCategoryTitle } from "@/lib/articles"
import type { BlogPost } from "@/lib/types"

export function ArticleCard({
  article,
  priority = false,
}: {
  article: BlogPost
  priority?: boolean
}) {
  return (
    <article className="surface-card flex h-full flex-col overflow-hidden transition hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-muted)]">
        {article.heroImage ? (
          <Image
            src={article.heroImage.url}
            alt={article.title}
            fill
            className="object-cover transition duration-500 hover:scale-[1.03]"
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
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
      <div className="flex flex-1 flex-col justify-between gap-4 p-6">
        <div className="space-y-3 text-right">
          <h3 className="text-xl font-bold leading-9 text-slate-900">{article.title}</h3>
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
            className="secondary-button"
          >
            {article.category === "english-articles" ? "Read More" : "أقرأ المزيد"}
          </Link>
        </div>
      </div>
    </article>
  )
}
