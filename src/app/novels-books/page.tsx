import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LuBookOpen, LuDownload } from "react-icons/lu"

import { NovelCard } from "@/components/novels/novel-card"
import { NovelsBooksTabs } from "@/components/novels/novels-books-tabs"
import { ButtonLink } from "@/components/ui/button"
import { CardMedia } from "@/components/ui/card"
import { CardGrid } from "@/components/ui/card-grid"
import { EmptyState } from "@/components/ui/empty-state"
import { PageHeader } from "@/components/ui/page-header"
import { Section, SectionHeading } from "@/components/ui/section"
import { brand } from "@/lib/brand"
import { getNovels, getStories } from "@/lib/contentful"
import { formatDate } from "@/lib/format"
import { buildMetadata } from "@/lib/metadata"

export const metadata: Metadata = buildMetadata({
  title: "الروايات والكتب",
  keywords: ["الروايات والكتب", "روايات", "PDF"],
  path: "/novels-books",
})

export default async function NovelsBooksPage() {
  const [novels, stories] = await Promise.all([getNovels(), getStories()])

  if (!novels.length && !stories.length) {
    notFound()
  }

  const inShop = novels.filter((novel) => novel.inShop)
  const electronic = novels.filter((novel) => !novel.inShop)

  return (
    <div className="page-shell">
      <PageHeader
        eyebrow="فضاءات"
        title="الروايات والكتب"
        copy="روايات وكتب وقصص قصيرة في مكان واحد."
      />

      <NovelsBooksTabs
        booksContent={
          <>
            <Section>
              <SectionHeading
                eyebrow="الكتب والروايات"
                title="روايات حالية في الأسواق"
                align="center"
              />

              {inShop.length ? (
                <div className="grid gap-5">
                  {inShop.map((novel, index) => (
                    <NovelCard key={novel.id} novel={novel} priority={index === 0} />
                  ))}
                </div>
              ) : (
                <EmptyState>لا توجد روايات متاحة في الأسواق حاليًا.</EmptyState>
              )}
            </Section>

            <Section className="mt-8">
              <SectionHeading
                eyebrow="نسخ إلكترونية"
                title="روايات إلكترونية"
                copy="لقراءة الرواية قم بتحميل ملف الـ PDF"
                align="center"
              />

              {electronic.length ? (
                <CardGrid columns={2}>
                  {electronic.map((novel) => (
                    <NovelCard key={novel.id} novel={novel} />
                  ))}
                </CardGrid>
              ) : (
                <EmptyState>لا توجد روايات إلكترونية متاحة حاليًا.</EmptyState>
              )}
            </Section>
          </>
        }
        storiesContent={
          <Section id="short-stories" className="scroll-mt-24">
            <SectionHeading
              eyebrow="قصص قصيرة"
              title="القصص القصيرة"
              copy="لقراءة القصة قم بتحميل ملف الـ PDF"
              align="center"
            />

            {stories.length ? (
              <CardGrid columns={2}>
                {stories.map((story, index) => (
                  <article
                    key={story.id}
                    className="surface-card group grid overflow-hidden transition hover:-translate-y-1 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-muted)] md:aspect-auto md:min-h-[18rem]">
                      {story.heroImage ? (
                        <CardMedia
                          src={story.heroImage.url}
                          alt={story.title}
                          fill
                          sizes="(min-width: 768px) 18vw, 100vw"
                          priority={index === 0}
                          className="transition duration-500 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[var(--surface-muted)]">
                          <LuBookOpen className="size-10 text-[var(--text-muted)]" />
                        </div>
                      )}
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/55 to-transparent"
                      />
                    </div>
                    <div className="flex flex-col justify-between gap-6 p-5 text-right sm:p-6">
                      <div className="space-y-3">
                        <p className="eyebrow">قصة قصيرة</p>
                        <h2 className="text-xl font-bold leading-8 text-slate-900">
                          {story.title}
                        </h2>
                        <p className="flex flex-wrap items-center gap-x-2 text-xs text-[var(--text-muted)]">
                          <span>بقلم {story.authorName ?? brand.name}</span>
                          {story.publishedDate ? (
                            <>
                              <span aria-hidden="true">·</span>
                              <time dateTime={story.publishedDate}>
                                {formatDate(story.publishedDate)}
                              </time>
                            </>
                          ) : null}
                        </p>
                        {story.shortBio ? (
                          <p className="line-clamp-4 text-sm leading-7 text-[var(--text-muted)]">
                            {story.shortBio}
                          </p>
                        ) : null}
                      </div>
                      {story.pdfUrl && story.pdfUrl !== "#" ? (
                        <div className="flex justify-start">
                          <ButtonLink
                            href={story.pdfUrl}
                            variant="primary"
                            icon={<LuDownload className="size-4" />}
                          >
                            تحميل القصة
                          </ButtonLink>
                        </div>
                      ) : null}
                    </div>
                  </article>
                ))}
              </CardGrid>
            ) : (
              <EmptyState>لا توجد قصص منشورة حاليًا.</EmptyState>
            )}
          </Section>
        }
      />
    </div>
  )
}
