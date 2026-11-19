import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { cache } from "react"
import {
  createClient,
  type Asset,
  type ContentfulClientApi,
  type Entry,
  type EntrySkeletonType,
} from "contentful"
import kebabCase from "lodash/kebabCase"

import { CATEGORY_ARTICLES_PER_PAGE } from "@/lib/articles"
import { brand, siteDescription, siteTitle } from "@/lib/brand"
import { getSiteUrl } from "@/lib/site-url"
import {
  ARTICLE_CATEGORIES,
  type AboutData,
  type ArticleCategory,
  type AuthorData,
  type BlogPost,
  type ContentfulImage,
  type HomePageData,
  type Novel,
  type PaginatedArticles,
  type Service,
  type SiteMetadata,
  type Story,
} from "@/lib/types"

const DEFAULT_PAGE_SIZE = CATEGORY_ARTICLES_PER_PAGE

const siteMetadata: SiteMetadata = {
  title: siteTitle,
  description: siteDescription,
  author: brand.name,
  siteUrl: getSiteUrl(),
  defaultKeywords: [...brand.keywords],
}

type ContentfulEntry<T extends EntrySkeletonType = EntrySkeletonType> = Entry<
  T,
  undefined,
  string
>
type ContentfulClient = ContentfulClientApi<undefined>

let client: ContentfulClient | null = null

const fallbackAbout: AboutData = {
  title: brand.roleAr,
  description: siteDescription,
  phone: ["01200000000"],
  mail: "hello@shaghbatta.com",
  facebook: "https://www.facebook.com/ShaghbattaPsychiatrist",
  instagram: "https://www.instagram.com/shaghbatta/",
  soundcloud: "https://soundcloud.com/",
  askfm: "https://ask.fm/",
  whatsapp: ["201200000000"],
  soundCloudTrackHtml:
    '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1500000000&color=%23277ee1"></iframe>',
  instagramFeed: "https://www.instagram.com/p/CWTc5o3IkTb/",
  services: [
    {
      id: "service-1",
      name: "الاستشارات النفسية",
      icon: {
        url: "/brand/symbol.jpeg",
        width: 460,
        height: 460,
        title: "Service",
      },
    },
    {
      id: "service-2",
      name: "ورش الكتابة",
      icon: {
        url: "/brand/symbol.jpeg",
        width: 460,
        height: 460,
        title: "Service",
      },
    },
    {
      id: "service-3",
      name: "برامج التوعية",
      icon: {
        url: "/brand/symbol.jpeg",
        width: 460,
        height: 460,
        title: "Service",
      },
    },
    {
      id: "service-4",
      name: "جلسات الحجز والمتابعة",
      icon: {
        url: "/brand/symbol.jpeg",
        width: 460,
        height: 460,
        title: "Service",
      },
    },
  ],
}

const fallbackAuthor: AuthorData = {
  id: "author-1",
  name: "د. هبة اللكاوي",
  who: "عن المؤسس",
  title: "طبيب أخصائي الطب النفسي وتعديل السلوك",
  facebook: "https://www.facebook.com/ShaghbattaPsychiatrist",
  qualifications: ["بيانات المؤهلات ستظهر عند ربط Contentful"],
  experience: ["بيانات الخبرات ستظهر عند ربط Contentful"],
  publications: ["بيانات الإصدارات ستظهر عند ربط Contentful"],
  shortBio:
    "طبيبة طب نفسي وتعديل سلوك، وروائية وكاتبة. تكتب عن النفس والعلاقات والتربية، وتقدّم جلسات ومتابعة نصية، وورش كتابة.",
  shortBioHtml:
    "<p>طبيبة طب نفسي وتعديل سلوك، وروائية وكاتبة. تكتب عن النفس والعلاقات والتربية، وتقدّم جلسات ومتابعة نصية، وورش كتابة.</p>",
}

const fallbackArticles: BlogPost[] = [
  {
    id: "post-1",
    title: "مقال تجريبي من نسخة الترحيل",
    slug: "migration-sample-article",
    category: "thoughts-and-tips",
    publishDate: "2026-07-23",
    source: brand.name,
    description:
      "هذا محتوى تجريبي مؤقت يظهر فقط عند غياب مفاتيح Contentful في بيئة التطوير.",
    bodyHtml:
      "<p>هذا المقال موجود فقط لضمان أن نسخة Next.js تعمل في بيئة التطوير الحالية. عند إضافة مفاتيح Contentful ستظهر المقالات الأصلية بالكامل بنفس الروابط.</p>",
    authorName: "د. هبة اللكاوي",
    instagram: null,
    featured: true,
    shortStoryImages: [],
  },
]

const fallbackStories: Story[] = [
  {
    id: "story-1",
    title: "قصة تجريبية",
    publishedDate: "2026-07-23",
    authorName: "د. هبة اللكاوي",
    shortBio: "مثال مؤقت للقصة حتى يتم ربط مفاتيح Contentful.",
    pdfUrl: "#",
    pdfFileName: "story.pdf",
    heroImage: {
      url: "/brand/symbol.jpeg",
      width: 460,
      height: 460,
      title: "Story",
    },
  },
]

const fallbackNovels: Novel[] = [
  {
    id: "novel-1",
    title: "رواية تجريبية",
    publishedDate: "2026-07-23",
    authorName: "د. هبة اللكاوي",
    shortBio: "مثال مؤقت للروايات حتى يتم ربط مفاتيح Contentful.",
    shortBioHtml: "<p>مثال مؤقت للروايات حتى يتم ربط مفاتيح Contentful.</p>",
    pdfUrl: "#",
    pdfFileName: "novel.pdf",
    inShop: false,
    heroImage: {
      url: "/brand/logo.jpeg",
      width: 1774,
      height: 887,
      title: "Novel",
    },
  },
]

function hasContentfulConfig() {
  return Boolean(process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN)
}

function getClient(): ContentfulClient | null {
  if (!hasContentfulConfig()) {
    return null
  }

  if (client) {
    return client
  }

  client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  })

  return client
}

function ensureArray<T>(value: T | T[] | undefined | null): T[] {
  if (Array.isArray(value)) {
    return value
  }

  if (value === undefined || value === null) {
    return []
  }

  return [value]
}

function formatAssetUrl(url?: string) {
  if (!url) {
    return ""
  }

  return url.startsWith("//") ? `https:${url}` : url
}

function mapImage(asset?: Asset<undefined, string>): ContentfulImage | undefined {
  if (!asset || typeof asset !== "object" || !("fields" in asset) || !asset.fields) {
    return undefined
  }

  const fields = asset.fields as {
    file?: {
      url?: string
      details?: {
        image?: {
          width?: number
          height?: number
        }
      }
    }
    title?: string
    description?: string
  }

  const file = fields.file
  const details = file?.details?.image
  const url = formatAssetUrl(file?.url)

  if (!url || !details) {
    return undefined
  }

  return {
    url,
    width: details.width ?? 1200,
    height: details.height ?? 800,
    title: String(fields.title ?? ""),
    description: fields.description ? String(fields.description) : undefined,
  }
}

function mapHtmlField(field: unknown): string | undefined {
  if (!field) {
    return undefined
  }

  if (typeof field === "string") {
    return field
  }

  if (typeof field === "object" && field !== null && "nodeType" in field) {
    return documentToHtmlString(field as never)
  }

  return undefined
}

function mapTextField(field: unknown): string {
  if (!field) {
    return ""
  }

  if (typeof field === "string") {
    return field
  }

  if (typeof field === "object" && field !== null && "content" in field) {
    return documentToHtmlString(field as never)
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  }

  return ""
}

function normalizeSlug(value: string) {
  return kebabCase(value)
}

function isArticleCategory(value: string): value is ArticleCategory {
  return ARTICLE_CATEGORIES.includes(value as ArticleCategory)
}

function mapService(entry: ContentfulEntry): Service {
  return {
    id: entry.sys.id,
    name: String(entry.fields.name ?? ""),
    icon: mapImage(entry.fields.icon as Asset<undefined, string> | undefined),
  }
}

function mapAuthor(entry: ContentfulEntry | undefined): AuthorData | undefined {
  if (!entry) {
    return undefined
  }

  return {
    id: entry.sys.id,
    name: String(entry.fields.name ?? ""),
    who: entry.fields.who ? String(entry.fields.who) : undefined,
    title: entry.fields.title ? String(entry.fields.title) : undefined,
    facebook: entry.fields.facebook ? String(entry.fields.facebook) : undefined,
    qualifications: ensureArray(entry.fields.qualifications).map(String),
    experience: ensureArray(entry.fields.experience).map(String),
    publications: ensureArray(entry.fields.publications).map(String),
    shortBio: mapTextField(entry.fields.shortBio),
    shortBioHtml: mapHtmlField(entry.fields.shortBio),
    image: mapImage(entry.fields.image as Asset<undefined, string> | undefined),
  }
}

function mapAbout(entry: ContentfulEntry | undefined): AboutData {
  if (!entry) {
    return fallbackAbout
  }

  return {
    title: String(entry.fields.title ?? fallbackAbout.title),
    description: mapTextField(entry.fields.description) || fallbackAbout.description,
    image:
      mapImage(entry.fields.image as Asset<undefined, string> | undefined) ??
      fallbackAbout.image,
    phone: ensureArray(entry.fields.phone).map(String),
    mail: entry.fields.mail ? String(entry.fields.mail) : undefined,
    facebook: entry.fields.facebook ? String(entry.fields.facebook) : undefined,
    instagram: entry.fields.instagram ? String(entry.fields.instagram) : undefined,
    soundcloud: entry.fields.soundcloud ? String(entry.fields.soundcloud) : undefined,
    askfm: entry.fields.askfm ? String(entry.fields.askfm) : undefined,
    whatsapp: ensureArray(entry.fields.whatsapp).map(String),
    soundCloudTrackHtml: mapHtmlField(entry.fields.soundCloudTrack),
    instagramFeed: entry.fields.instagramFeed
      ? String(entry.fields.instagramFeed)
      : undefined,
    services: ensureArray(entry.fields.services as ContentfulEntry[] | undefined).map(
      mapService,
    ),
  }
}

function mapPost(entry: ContentfulEntry): BlogPost {
  const rawCategory = String(entry.fields.category ?? "other")
  const category = isArticleCategory(rawCategory) ? rawCategory : "other"
  const rawSlug = String(entry.fields.slug ?? entry.fields.title ?? entry.sys.id)

  return {
    id: entry.sys.id,
    title: String(entry.fields.title ?? ""),
    slug: normalizeSlug(rawSlug),
    category,
    publishDate: entry.fields.publishDate ? String(entry.fields.publishDate) : undefined,
    source: entry.fields.source ? String(entry.fields.source) : undefined,
    description: mapTextField(entry.fields.description),
    bodyHtml: mapHtmlField(entry.fields.body),
    authorName:
      entry.fields.author &&
      typeof entry.fields.author === "object" &&
      "fields" in entry.fields.author
        ? String((entry.fields.author as ContentfulEntry).fields.name ?? "")
        : undefined,
    instagram: entry.fields.instagram ? String(entry.fields.instagram) : null,
    featured: Boolean(entry.fields.featured),
    heroImage: mapImage(entry.fields.heroImage as Asset<undefined, string> | undefined),
    shortStoryImages: ensureArray(
      entry.fields.shortStory as Asset<undefined, string>[] | undefined,
    )
      .map(mapImage)
      .filter((image): image is ContentfulImage => Boolean(image)),
  }
}

function mapStory(entry: ContentfulEntry): Story {
  const pdfAsset = entry.fields.pdf as Asset<undefined, string> | undefined

  return {
    id: entry.sys.id,
    title: String(entry.fields.title ?? ""),
    publishedDate: entry.fields.publishedDate
      ? String(entry.fields.publishedDate)
      : undefined,
    authorName:
      entry.fields.author &&
      typeof entry.fields.author === "object" &&
      "fields" in entry.fields.author
        ? String((entry.fields.author as ContentfulEntry).fields.name ?? "")
        : undefined,
    shortBio: mapTextField(entry.fields.shortBio),
    pdfUrl: formatAssetUrl(pdfAsset?.fields.file?.url),
    pdfFileName: pdfAsset?.fields.file?.fileName,
    heroImage: mapImage(entry.fields.heroImage as Asset<undefined, string> | undefined),
  }
}

function mapNovel(entry: ContentfulEntry): Novel {
  const pdfAsset = entry.fields.pdf as Asset<undefined, string> | undefined

  return {
    id: entry.sys.id,
    title: String(entry.fields.title ?? ""),
    publishedDate: entry.fields.publishedDate
      ? String(entry.fields.publishedDate)
      : undefined,
    authorName:
      entry.fields.author &&
      typeof entry.fields.author === "object" &&
      "fields" in entry.fields.author
        ? String((entry.fields.author as ContentfulEntry).fields.name ?? "")
        : undefined,
    shortBio: mapTextField(entry.fields.shortBio),
    shortBioHtml: mapHtmlField(entry.fields.shortBio),
    pdfUrl: formatAssetUrl(pdfAsset?.fields.file?.url),
    pdfFileName: pdfAsset?.fields.file?.fileName,
    inShop: Boolean(entry.fields.inShop),
    heroImage: mapImage(entry.fields.heroImage as Asset<undefined, string> | undefined),
  }
}

export function getSiteMetadata() {
  return siteMetadata
}

export const getAboutData = cache(async function getAboutData() {
  const contentfulClient = getClient()

  if (contentfulClient === null) {
    return fallbackAbout
  }

  const response = await contentfulClient.getEntries({
    content_type: "about",
    limit: 1,
    include: 2,
  })

  return mapAbout(response.items[0])
})

export const getAuthorData = cache(async function getAuthorData() {
  const contentfulClient = getClient()

  if (contentfulClient === null) {
    return fallbackAuthor
  }

  const response = await contentfulClient.getEntries({
    content_type: "person",
    include: 2,
  })

  const owner =
    response.items.find((entry: ContentfulEntry) =>
      String(entry.fields.who ?? "").includes("المؤسس"),
    ) ??
    response.items.find((entry: ContentfulEntry) =>
      String(entry.fields.name ?? "").includes("هبة"),
    ) ??
    response.items[0]

  return mapAuthor(owner as ContentfulEntry | undefined) ?? fallbackAuthor
})

export const getLatestArticles = cache(async function getLatestArticles(limit = 5) {
  const contentfulClient = getClient()

  if (contentfulClient === null) {
    return fallbackArticles.slice(0, limit)
  }

  const response = await contentfulClient.getEntries({
    content_type: "blogPost",
    order: ["-fields.publishDate"],
    limit,
    include: 2,
  })

  return response.items.map((item: ContentfulEntry) => mapPost(item))
})

export const getSitemapArticles = cache(async function getSitemapArticles() {
  const contentfulClient = getClient()

  if (contentfulClient === null) {
    return fallbackArticles.map(({ category, slug, publishDate }) => ({
      category,
      slug,
      publishDate,
    }))
  }

  const response = await contentfulClient.getEntries({
    content_type: "blogPost",
    order: ["-fields.publishDate"],
    select: ["fields.category", "fields.slug", "fields.title", "fields.publishDate"],
    limit: 1000,
    include: 0,
  })

  return response.items.map((item: ContentfulEntry) => {
    const article = mapPost(item)

    return {
      category: article.category,
      slug: article.slug,
      publishDate: article.publishDate,
    }
  })
})

export const getFeaturedArticles = cache(async function getFeaturedArticles(limit = 8) {
  const contentfulClient = getClient()

  if (contentfulClient === null) {
    return fallbackArticles.filter((article) => article.featured).slice(0, limit)
  }

  const response = await contentfulClient.getEntries({
    content_type: "blogPost",
    "fields.featured": true,
    order: ["-fields.publishDate"],
    limit,
    include: 2,
  })

  return response.items.map((item: ContentfulEntry) => mapPost(item))
})

export const getStories = cache(async function getStories() {
  const contentfulClient = getClient()

  if (contentfulClient === null) {
    return fallbackStories
  }

  const response = await contentfulClient.getEntries({
    content_type: "story",
    order: ["-fields.publishedDate"],
    include: 2,
  })

  return response.items.map((item: ContentfulEntry) => mapStory(item))
})

export const getNovels = cache(async function getNovels() {
  const contentfulClient = getClient()

  if (contentfulClient === null) {
    return fallbackNovels
  }

  const response = await contentfulClient.getEntries({
    content_type: "novel",
    order: ["-fields.publishedDate"],
    include: 2,
  })

  return response.items.map((item: ContentfulEntry) => mapNovel(item))
})

export const getArticles = cache(async function getArticles(
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  search = "",
  category?: ArticleCategory,
): Promise<PaginatedArticles> {
  const currentPage = Math.max(1, Math.floor(page))
  const currentPageSize = Math.max(1, Math.floor(pageSize))
  const normalizedSearch = search.trim().toLocaleLowerCase()
  const contentfulClient = getClient()

  if (contentfulClient === null) {
    const items = fallbackArticles.filter((post: BlogPost) => {
      const matchesCategory = !category || post.category === category
      const searchableText =
        `${post.title} ${post.description ?? ""} ${post.bodyHtml ?? ""}`.toLocaleLowerCase()
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
    const totalPages = Math.max(1, Math.ceil(items.length / currentPageSize))

    return {
      items: items.slice(
        (currentPage - 1) * currentPageSize,
        currentPage * currentPageSize,
      ),
      pagination: {
        currentPage,
        pageSize: currentPageSize,
        totalItems: items.length,
        totalPages,
      },
    }
  }

  const response = await contentfulClient.getEntries({
    content_type: "blogPost",
    ...(category ? { "fields.category": category } : {}),
    ...(search.trim() ? { query: search.trim() } : {}),
    order: ["-fields.publishDate"],
    limit: currentPageSize,
    skip: (currentPage - 1) * currentPageSize,
    include: 2,
  })

  return {
    items: response.items.map((item: ContentfulEntry) => mapPost(item)),
    pagination: {
      currentPage,
      pageSize: currentPageSize,
      totalItems: response.total,
      totalPages: Math.max(1, Math.ceil(response.total / currentPageSize)),
    },
  }
})

export const getArticlesByCategory = cache(async function getArticlesByCategory(
  category: ArticleCategory,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
): Promise<PaginatedArticles> {
  return getArticles(page, pageSize, "", category)
})

export const getArticleByCategoryAndSlug = cache(
  async function getArticleByCategoryAndSlug(category: ArticleCategory, slug: string) {
    const normalizedTarget = normalizeSlug(decodeURIComponent(slug))
    const decodedSlug = decodeURIComponent(slug)

    const contentfulClient = getClient()

    if (contentfulClient === null) {
      return (
        fallbackArticles.find(
          (item: BlogPost) =>
            item.category === category &&
            (item.slug === normalizedTarget ||
              normalizeSlug(item.title) === normalizedTarget),
        ) ?? null
      )
    }

    const directResponse = await contentfulClient.getEntries({
      content_type: "blogPost",
      "fields.category": category,
      "fields.slug": decodedSlug,
      limit: 1,
      include: 2,
    })

    if (directResponse.items.length > 0) {
      return mapPost(directResponse.items[0] as ContentfulEntry)
    }

    const response = await contentfulClient.getEntries({
      content_type: "blogPost",
      "fields.category": category,
      limit: 200,
      include: 2,
    })

    const match = response.items
      .map((item: ContentfulEntry) => mapPost(item))
      .find(
        (item: BlogPost) =>
          item.slug === normalizedTarget ||
          normalizeSlug(item.title) === normalizedTarget,
      )

    return match ?? null
  },
)

export const getHomePageData = cache(
  async function getHomePageData(): Promise<HomePageData> {
    const [about, featuredAuthor, featuredArticles, latestStories] = await Promise.all([
      getAboutData(),
      getAuthorData(),
      getFeaturedArticles(8),
      getStories(),
    ])

    return {
      site: getSiteMetadata(),
      about,
      featuredAuthor,
      featuredArticles,
      latestStories: latestStories.slice(0, 2),
      services: about.services,
    }
  },
)
