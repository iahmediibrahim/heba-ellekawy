import { BookOpen, Download } from "lucide-react"
import Image from "next/image"

import { ButtonLink } from "@/components/ui/button"
import { Prose } from "@/components/ui/prose"
import { brand } from "@/lib/brand"
import { formatDate } from "@/lib/format"
import type { Novel } from "@/lib/types"

export function NovelCard({
  novel,
  priority = false,
}: {
  novel: Novel
  priority?: boolean
}) {
  return (
    <article className="surface-card group grid overflow-hidden transition hover:-translate-y-1 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
      <div className="relative flex h-60 items-center justify-center overflow-hidden bg-[var(--surface-muted)] sm:h-72 md:h-auto md:min-h-[22rem]">
        {novel.heroImage ? (
          <Image
            src={novel.heroImage.url}
            alt={novel.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 35vw, 100vw"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className="object-contain p-4 transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="brand-panel flex h-full w-full items-center justify-center">
            <BookOpen className="size-10 text-white/90" />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-6 p-5 text-right sm:p-6">
        <div className="space-y-3">
          <p className="eyebrow">
            {novel.inShop ? "متوفر في الأسواق" : "نسخة إلكترونية"}
          </p>
          <h2 className="text-xl font-bold leading-8 text-slate-900">{novel.title}</h2>
          <p className="flex flex-wrap items-center gap-x-2 text-xs text-[var(--text-muted)]">
            <span>بقلم {novel.authorName ?? brand.name}</span>
            {novel.publishedDate ? (
              <>
                <span aria-hidden="true">·</span>
                <time dateTime={novel.publishedDate}>
                  {formatDate(novel.publishedDate)}
                </time>
              </>
            ) : null}
          </p>
          {novel.shortBioHtml ? (
            <Prose
              html={novel.shortBioHtml}
              className="break-words line-clamp-5 text-sm leading-7 text-[var(--text-muted)]"
            />
          ) : novel.shortBio ? (
            <p className="line-clamp-5 text-sm leading-7 text-[var(--text-muted)]">
              {novel.shortBio}
            </p>
          ) : null}
        </div>

        {!novel.inShop && novel.pdfUrl ? (
          <div className="flex justify-start">
            <ButtonLink
              href={novel.pdfUrl}
              variant="primary"
              icon={<Download className="size-4" />}
            >
              تحميل الرواية
            </ButtonLink>
          </div>
        ) : null}
      </div>
    </article>
  )
}
