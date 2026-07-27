import { ArrowUpLeft, BookOpen, CirclePlay, Sparkles } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { getHomePageData } from "@/lib/contentful"
import { buildMetadata } from "@/lib/metadata"

export const metadata: Metadata = buildMetadata({
  keywords: ["خدماتنا", "الكتابات الأخيرة", "القصص القصيرة"],
})

function trimText(value: string | undefined, limit: number) {
  if (!value) {
    return ""
  }

  return value.length > limit ? `${value.slice(0, limit).trim()}...` : value
}

export default async function Home() {
  const data = await getHomePageData()
  const heroArticle = data.featuredArticles[0]
  const articleGrid = data.featuredArticles.slice(1, 4)
  const storyGrid = data.latestStories.slice(0, 2)
  const heroImage = data.about.image ?? data.featuredAuthor?.image
  const aboutExcerpt = trimText(data.about.description, 220)
  const authorExcerpt = trimText(data.featuredAuthor?.shortBio, 240)

  return (
    <div className="page-shell">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6 text-right">
          <span className="pill-badge mr-auto">
            <Sparkles className="size-4" />
            شغبطه
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-black leading-[1.55] text-slate-950 sm:text-5xl">
              مساحة عربية حديثة للقراءة النفسية والأدبية
            </h1>
            <p className="max-w-2xl text-lg leading-9 text-[var(--text-muted)]">
              {aboutExcerpt}
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-3">
            <Link href="/contact" className="primary-button">
              احجز جلستك
              <ArrowUpLeft className="size-4" />
            </Link>
            <Link href="/about" className="secondary-button">
              تعرف على شغبطه
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link
              href="/articles/psychological"
              className="surface-muted block p-4 text-right transition hover:-translate-y-0.5"
            >
              <p className="text-sm font-semibold text-[var(--accent)]">لنفسية أفضل</p>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                مقالات نفسية وعلاقات وتربية.
              </p>
            </Link>
            <Link
              href="/articles/other"
              className="surface-muted block p-4 text-right transition hover:-translate-y-0.5"
            >
              <p className="text-sm font-semibold text-[var(--accent)]">كتابة حرة</p>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                خواطر وتجارب ومقالات عامة.
              </p>
            </Link>
            <Link
              href="/stories"
              className="surface-muted block p-4 text-right transition hover:-translate-y-0.5"
            >
              <p className="text-sm font-semibold text-[var(--accent)]">القصص القصيرة</p>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                قصص للقراءة والتحميل.
              </p>
            </Link>
          </div>
        </div>

        <div className="surface-card overflow-hidden p-3">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#efe3e8]">
            {heroImage ? (
              <Image
                src={heroImage.url}
                alt={heroImage.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            ) : null}
            <div className="absolute inset-x-4 bottom-4">
              <div className="rounded-[1.25rem] bg-white/92 p-4 text-right shadow-[var(--shadow-soft)]">
                <p className="text-sm font-semibold text-[var(--accent)]">
                  بقلم د. هبة اللكاوي
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                  محتوى عن النفس والكتابة والحياة بتجربة أكثر هدوءًا ووضوحًا.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {heroArticle ? (
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="surface-card overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-80 bg-[#f2e6eb]">
                {heroArticle.heroImage ? (
                  <Image
                    src={heroArticle.heroImage.url}
                    alt={heroArticle.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 32vw, 100vw"
                  />
                ) : null}
              </div>
              <div className="flex flex-col justify-between gap-5 p-6 text-right lg:p-8">
                <div className="space-y-4">
                  <span className="pill-badge w-fit">مقال مميز</span>
                  <h2 className="text-3xl font-black leading-[1.65] text-slate-950">
                    {heroArticle.title}
                  </h2>
                  {heroArticle.description ? (
                    <p className="text-base leading-9 text-[var(--text-muted)]">
                      {trimText(heroArticle.description, 220)}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-wrap justify-end gap-3">
                  <Link
                    href={`/articles/${heroArticle.category}/${heroArticle.slug}`}
                    className="primary-button"
                  >
                    اقرأ المقال
                  </Link>
                  <Link href={`/articles/${heroArticle.category}`} className="secondary-button">
                    المزيد من القسم
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-4">
            {articleGrid.map(article => (
              <Link
                key={article.id}
                href={`/articles/${article.category}/${article.slug}`}
                className="surface-card grid gap-4 p-4 text-right transition hover:-translate-y-0.5 sm:grid-cols-[5.5rem_1fr]"
              >
                <div className="relative h-24 overflow-hidden rounded-[1.1rem] bg-[#f2e6eb] sm:w-[5.5rem]">
                  {article.heroImage ? (
                    <Image
                      src={article.heroImage.url}
                      alt={article.title}
                      fill
                      className="object-cover"
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
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface-card p-6 text-right lg:p-8">
          <p className="eyebrow">عن المؤسس</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">
            {data.featuredAuthor?.name ?? "د. هبة اللكاوي"}
          </h2>
          {data.featuredAuthor?.title ? (
            <p className="mt-3 text-base text-[var(--text-muted)]">
              {data.featuredAuthor.title}
            </p>
          ) : null}
          {authorExcerpt ? (
            <p className="mt-4 text-base leading-9 text-[var(--text-muted)]">
              {authorExcerpt}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <Link href="/author" className="primary-button">
              السيرة الكاملة
            </Link>
            <Link href="/about" className="secondary-button">
              عن شغبطه
            </Link>
          </div>
        </div>

        <div className="surface-card p-6 lg:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <Link href="/stories" className="secondary-button">
              عرض كل القصص
            </Link>
            <div className="text-right">
              <p className="eyebrow">قصص قصيرة</p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">مختارات</h2>
            </div>
          </div>
          <div className="grid gap-4">
            {storyGrid.map(story => (
              <article key={story.id} className="surface-muted p-4">
                <div className="grid items-center gap-4 sm:grid-cols-[5.5rem_1fr]">
                  <div className="relative h-24 overflow-hidden rounded-[1.1rem] bg-[#f2e6eb] sm:w-[5.5rem]">
                    {story.heroImage ? (
                      <Image
                        src={story.heroImage.url}
                        alt={story.title}
                        fill
                        className="object-cover"
                        sizes="88px"
                      />
                    ) : null}
                  </div>
                  <div className="text-right">
                    <h3 className="text-lg font-bold text-slate-900">{story.title}</h3>
                    {story.shortBio ? (
                      <p className="mt-2 line-clamp-2 text-sm leading-7 text-[var(--text-muted)]">
                        {story.shortBio}
                      </p>
                    ) : null}
                    {story.pdfUrl ? (
                      <div className="mt-3">
                        <Link href={story.pdfUrl} className="secondary-button px-4 py-2 text-sm">
                          تحميل PDF
                        </Link>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.services.slice(0, 4).map(service => (
          <article key={service.id} className="surface-card p-5 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-[var(--surface-muted)]">
              {service.icon ? (
                <Image
                  src={service.icon.url}
                  alt={service.name}
                  width={64}
                  height={64}
                  className="h-11 w-11 object-contain"
                />
              ) : null}
            </div>
            <h3 className="text-base font-bold leading-8 text-slate-900">{service.name}</h3>
          </article>
        ))}
      </section>

      <section className="surface-card p-7 text-right lg:p-9">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-4">
            <p className="eyebrow">ابدأ من هنا</p>
            <h2 className="text-4xl font-black leading-[1.55] text-slate-950">
              حجز، قراءة، أو استكشاف عالم شغبطه
            </h2>
            <p className="text-base leading-9 text-[var(--text-muted)]">
              تجربة أبسط وأكثر نضجًا تضع المحتوى والخدمة في الواجهة من غير زحام بصري.
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-3">
            <Link href="/contact" className="primary-button">
              احجز جلستك
            </Link>
            <Link href="/articles/thoughts-and-tips" className="secondary-button">
              <BookOpen className="size-4" />
              ابدأ القراءة
            </Link>
            {data.about.soundCloudTrackHtml ? (
              <Link href="/about" className="secondary-button">
                <CirclePlay className="size-4" />
                المزيد عن شغبطه
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}
