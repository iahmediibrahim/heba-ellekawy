import { ArrowLeft, ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ArticleCard } from "@/components/articles/article-card"
import { ArticleMeta } from "@/components/articles/article-meta"
import { Breadcrumbs } from "@/components/articles/breadcrumbs"
import { CategoryPagination } from "@/components/articles/category-pagination"
import { LatestArticles } from "@/components/articles/latest-articles"
import { ShareButtons } from "@/components/articles/share-buttons"
import { JsonLd } from "@/components/seo/json-ld"
import { FacebookPageEmbed } from "@/components/social/facebook-page-embed"
import { CardGrid } from "@/components/ui/card-grid"
import { ContentLayout } from "@/components/ui/content-layout"
import { EmptyState } from "@/components/ui/empty-state"
import { PageHeader } from "@/components/ui/page-header"
import { Section } from "@/components/ui/section"
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
      path: `/articles/${category}/${entry}`,
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
    type: "article",
    path: `/articles/${category}/${post.slug}`,
    image: post.heroImage
      ? {
          src: post.heroImage.url,
          width: post.heroImage.width,
          height: post.heroImage.height,
        }
      : undefined,
  })
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
          className="relative aspect-[16/10] overflow-hidden rounded-4xl bg-[var(--surface-muted)]"
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

    const { items, pagination } = await getArticlesByCategory(category, currentPage)

    if (currentPage > pagination.totalPages) {
      notFound()
    }

    return (
      <div className="page-shell">
        <Section>
          <PageHeader
            breadcrumbs={
              <Breadcrumbs
                items={[
                  { label: "الرئيسية", href: "/" },
                  { label: "فضاءات", href: "/blog" },
                  { label: getCategoryTitle(category) },
                ]}
              />
            }
            eyebrow="صفحات المقالات"
            title={getCategoryTitle(category)}
          />
          {items.length ? (
            <CardGrid columns={3}>
              {items.map((article, index) => (
                <ArticleCard key={article.id} article={article} priority={index === 0} />
              ))}
            </CardGrid>
          ) : (
            <EmptyState>لا توجد مقالات في هذا القسم حاليًا.</EmptyState>
          )}
          <CategoryPagination
            category={category}
            currentPage={currentPage}
            totalPages={pagination.totalPages}
          />
        </Section>
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
    <ContentLayout
      aside={
        <>
          <LatestArticles articles={latestArticles} />
          <FacebookPageEmbed link="https://www.facebook.com/ShaghbattaPsychiatrist/" />
        </>
      }
    >
      <div className={`space-y-6 ${isEnglish ? "text-left" : "text-right"}`}>
        <div className="flex flex-wrap justify-center">
          <Breadcrumbs
            items={[
              { label: "الرئيسية", href: "/" },
              { label: "فضاءات", href: "/blog" },
              { label: getCategoryTitle(category), href: `/articles/${category}` },
            ]}
          />
        </div>
        <header
          className={`brand-panel space-y-4 rounded-[var(--radius-card)] p-6 sm:p-8 ${
            isEnglish ? "text-left" : "text-right"
          }`}
        >
          <p className="brand-eyebrow">{getCategoryTitle(category)}</p>
          <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl">
            {post.title}
            {post.source ? (
              <span className="mr-3 mt-2 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                {post.source}
              </span>
            ) : null}
          </h1>
          <ArticleMeta
            article={post}
            className={isEnglish ? "text-left" : "text-right"}
            tone="on-brand"
          />
        </header>

        {post.heroImage ? (
          <div className="relative aspect-video overflow-hidden rounded-4xl bg-[var(--surface-muted)]">
            <Image
              src={post.heroImage.url}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority
              fetchPriority="high"
              loading="eager"
              quality={60}
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
          <h2 className="text-center text-lg font-bold text-slate-900">مشاركة المقال:</h2>
          <ShareButtons url={shareUrl} title={post.title} />
        </div>

        <div className={isEnglish ? "text-left" : "text-right"}>
          <Link href={`/articles/${post.category}`} className="primary-button">
            {isEnglish ? (
              <ArrowLeft className="size-4" />
            ) : (
              <ArrowRight className="size-4" />
            )}
            {isEnglish ? "Back To Articles" : "الرجوع للمقالات"}
          </Link>
        </div>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": shareUrl,
            },
            headline: post.title,
            ...(post.description ? { description: post.description } : {}),
            ...(post.publishDate ? { datePublished: post.publishDate } : {}),
            ...(post.heroImage ? { image: [post.heroImage.url] } : {}),
            author: {
              "@type": "Person",
              name: post.authorName ?? site.author,
            },
            publisher: {
              "@type": "Organization",
              name: site.author,
              url: site.siteUrl,
              logo: {
                "@type": "ImageObject",
                url: `${site.siteUrl}/brand/logo.jpeg`,
              },
            },
            articleSection: getCategoryTitle(category),
            inLanguage: isEnglish ? "en" : "ar-EG",
          }}
        />
      </div>
    </ContentLayout>
  )
}
