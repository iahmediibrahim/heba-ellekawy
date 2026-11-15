import { brand } from "@/lib/brand"
import { formatDate } from "@/lib/format"
import type { BlogPost } from "@/lib/types"

export function ArticleMeta({
  article,
  className,
  tone = "muted",
}: {
  article: Pick<BlogPost, "authorName" | "category" | "publishDate">
  className?: string
  tone?: "muted" | "on-brand"
}) {
  const isEnglish = article.category === "english-articles"
  const toneClass = tone === "on-brand" ? "text-white/75" : "text-[var(--text-muted)]"

  return (
    <p
      className={`text-sm ${toneClass} ${className ?? ""}`.trim()}
      dir={isEnglish ? "ltr" : "rtl"}
    >
      <span>
        {isEnglish ? "by" : "بقلم"} {article.authorName ?? brand.name}
      </span>
      {article.publishDate ? (
        <time
          dateTime={article.publishDate}
        >{` · ${formatDate(article.publishDate)}`}</time>
      ) : null}
    </p>
  )
}
