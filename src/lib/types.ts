export const ARTICLE_CATEGORIES = [
  "thoughts-and-tips",
  "family-and-educational",
  "psychological",
  "psychotherapy",
  "nominations-for-books-movies-and-novels",
  "other",
  "english-articles",
  "my-journey-with-writing",
  "me-and-places",
  "short-story",
  "short-films",
  "opinion-articles-and-problems-mail",
] as const

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number]

export interface ContentfulImage {
  url: string
  width: number
  height: number
  title: string
  description?: string
}

export interface SeoImage {
  src: string
  width?: number
  height?: number
}

export interface SiteMetadata {
  title: string
  description: string
  author: string
  siteUrl: string
  defaultKeywords: string[]
}

export interface SocialLinks {
  facebook?: string
  instagram?: string
  soundcloud?: string
  askfm?: string
  whatsapp?: string | string[]
}

export interface Service {
  id: string
  name: string
  icon?: ContentfulImage
}

export interface AboutData extends SocialLinks {
  title: string
  description: string
  image?: ContentfulImage
  phone: string[]
  mail?: string
  services: Service[]
  soundCloudTrackHtml?: string
  instagramFeed?: string
}

export interface AuthorData {
  id: string
  name: string
  who?: string
  title?: string
  facebook?: string
  qualifications: string[]
  experience: string[]
  publications: string[]
  shortBio: string
  shortBioHtml?: string
  description: string
  descriptionHtml?: string
  image?: ContentfulImage
}

export interface Story {
  id: string
  title: string
  publishedDate?: string
  authorName?: string
  shortBio?: string
  pdfUrl?: string
  pdfFileName?: string
  heroImage?: ContentfulImage
}

export interface Novel {
  id: string
  title: string
  publishedDate?: string
  authorName?: string
  shortBio?: string
  shortBioHtml?: string
  pdfUrl?: string
  pdfFileName?: string
  inShop: boolean
  heroImage?: ContentfulImage
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  category: ArticleCategory
  publishDate?: string
  source?: string
  description?: string
  bodyHtml?: string
  authorName?: string
  instagram?: string | null
  heroImage?: ContentfulImage
  shortStoryImages: ContentfulImage[]
  featured?: boolean
}

export interface PaginationInfo {
  currentPage: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export interface PaginatedArticles {
  items: BlogPost[]
  pagination: PaginationInfo
}

export interface HomePageData {
  site: SiteMetadata
  about: AboutData
  featuredAuthor?: AuthorData
  featuredArticles: BlogPost[]
  latestStories: Story[]
  services: Service[]
}
