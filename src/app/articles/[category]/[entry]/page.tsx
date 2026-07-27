import { ArrowLeft, ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ArticleCard } from "@/components/articles/article-card"
import { LatestArticles } from "@/components/articles/latest-articles"
import { ShareButtons } from "@/components/articles/share-buttons"
import { FacebookPageEmbed } from "@/components/social/facebook-page-embed"
import { getArticleEntryStaticParams } from "@/lib/article-static-params"
import { getCategoryTitle, isCategory } from "@/lib/articles"
import {
  getArticleByCategoryAndSlug,
  getArticlesByCategory,
  getLatestArticles,
  getSiteMetadata,
} from "@/lib/contentful"
import { buildMetadata } from "@/lib/metadata"
import type { ContentfulImage } from "@/lib/types"

export const dynamic = "force-static"
export const revalidate = 300

export async function generateStaticParams() {
  return getArticleEntryStaticParams()
}

type PageParams = {
  category: string
  entry: string
}

function isPageEntry(value: string) {
  return /^\d+$/.test(value)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { category, entry } = await params

  if (!isCategory(category)) {
    return buildMetadata()
  }

  if (isPageEntry(entry)) {
    return buildMetadata({
      title: `${getCategoryTitle(category)} - صفحة ${entry}`,
      keywords: ["المقالات", category, entry],
    })
  }

  const post = await getArticleByCategoryAndSlug(category, entry)

  if (!post) {
    return buildMetadata()
  }

  return buildMetadata({
    title: post.title,
    description: post.description,
    keywords: [category, post.title],
    image: post.heroImage
      ? {
          src: post.heroImage.url,
          width: post.heroImage.width,
          height: post.heroImage.height,
        }
      : undefined,
  })
}

function CategoryPagination({
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
        const pageNumber = index + 1
        const href =
          pageNumber === 1
            ? `/articles/${category}`
            : `/articles/${category}/${pageNumber}`

        return (
          <Link
            key={href}
            href={href}
            className={`inline-flex size-11 items-center justify-center rounded-full border text-sm font-semibold transition ${
              pageNumber === currentPage
                ? "border-[#7e275c] bg-[#7e275c] text-white"
                : "border-[#ead9e2] bg-white text-slate-700 hover:border-[#7e275c]"
            }`}
          >
            {pageNumber}
          </Link>
        )
      })}
    </nav>
  )
}

function PostMedia({ images }: { images: ContentfulImage[] }) {
  if (!images.length) {
    return null
  }

  return (
    <div className="grid gap-4">
      {images.map((image: ContentfulImage) => (
        <div
          key={image.url}
          className="relative aspect-[16/10] overflow-hidden rounded-4xl bg-[#f6ecef]"
        >
          <Image
            src={image.url}
            alt={image.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
        </div>
      ))}
    </div>
  )
}

export default async function ArticleEntryPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { category, entry } = await params

  if (!isCategory(category)) {
    notFound()
  }

  if (isPageEntry(entry)) {
    const currentPage = Number(entry)

    if (!Number.isInteger(currentPage) || currentPage < 2) {
      notFound()
    }

    const { items, pagination } = await getArticlesByCategory(
      category,
      currentPage,
    )

    if (currentPage > pagination.totalPages) {
      notFound()
    }

    return (
      <div className="page-shell">
        <div className="section-heading" data-align="center">
          <p className="eyebrow">صفحات المقالات</p>
          <h1 className="section-title">{getCategoryTitle(category)}</h1>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        <CategoryPagination
          category={category}
          currentPage={currentPage}
          totalPages={pagination.totalPages}
        />
      </div>
    )
  }

  const [post, latestArticles] = await Promise.all([
    getArticleByCategoryAndSlug(category, entry),
    getLatestArticles(5),
  ])

  if (!post) {
    notFound()
  }

  const isEnglish = category === "english-articles"
  const site = getSiteMetadata()
  const shareUrl = `${site.siteUrl}/articles/${post.category}/${post.slug}`

  return (
    <div className="page-shell grid lg:grid-cols-[1.35fr_0.65fr]">
      <section className="surface-card p-6 lg:p-8">
        <div className={`space-y-6 ${isEnglish ? "text-left" : "text-right"}`}>
          <header className="space-y-3">
            <h1 className="text-4xl font-black text-slate-900">
              {post.title}
              {post.source ? (
                <span className="pill-badge mr-3 px-4 py-2 text-sm">
                  {post.source}
                </span>
              ) : null}
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              <span>by {post.authorName ?? "شغبطه"}</span>
              {post.publishDate ? (
                <span>{` / ${post.publishDate}`}</span>
              ) : null}
            </p>
          </header>

          {post.heroImage ? (
            <div className="relative aspect-video overflow-hidden rounded-4xl bg-[#f6ecef]">
              <Image
                src={post.heroImage.url}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </div>
          ) : null}

          <div
            className={`content-html text-base leading-9 text-slate-700 ${isEnglish ? "mx-auto max-w-3xl text-left" : "mx-auto max-w-3xl text-right"}`}
            dangerouslySetInnerHTML={{
              __html: post.bodyHtml ?? `<p>${post.description ?? ""}</p>`,
            }}
          />

          <PostMedia images={post.shortStoryImages} />

          <div className="space-y-4">
            <h2 className="text-center text-lg font-bold text-slate-900">
              مشاركة المقال:
            </h2>
            <ShareButtons url={shareUrl} title={post.title} />
          </div>

          <div className={isEnglish ? "text-left" : "text-right"}>
            <Link
              href={`/articles/${post.category}`}
              className="primary-button"
            >
              {isEnglish ? (
                <ArrowLeft className="size-4" />
              ) : (
                <ArrowRight className="size-4" />
              )}
              {isEnglish ? "Back To Articles" : "الرجوع للمقالات"}
            </Link>
          </div>
        </div>
      </section>

      <aside className="space-y-6">
        <LatestArticles articles={latestArticles} />
        <FacebookPageEmbed link="https://www.facebook.com/ShaghbattaPsychiatrist/" />
      </aside>
    </div>
  )
}
