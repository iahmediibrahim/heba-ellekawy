import type { Metadata } from "next"

import { brand, siteDescription, siteTitle } from "@/lib/brand"
import { getSiteUrl } from "@/lib/site-url"
import type { SeoImage } from "@/lib/types"

const DEFAULT_OG_IMAGE = {
  src: "/brand/banner-cyan.png",
  width: 1200,
  height: 675,
}

export function buildMetadata({
  title,
  description = siteDescription,
  keywords = [],
  image,
  type = "website",
  path,
}: {
  title?: string
  description?: string
  keywords?: string[]
  image?: SeoImage
  type?: "website" | "article"
  /** المسار الحالي للصفحة، لاستخدامه في canonical */
  path?: string
} = {}): Metadata {
  const siteUrl = getSiteUrl()
  const fullTitle = title ? `${title} | ${brand.name}` : siteTitle
  const resolvedImage = image ?? DEFAULT_OG_IMAGE
  const imageUrl = resolvedImage.src.startsWith("http")
    ? resolvedImage.src
    : `${siteUrl}${resolvedImage.src}`

  return {
    metadataBase: new URL(siteUrl),
    title: fullTitle,
    description,
    keywords: [...brand.keywords, ...keywords],
    ...(path ? { alternates: { canonical: path } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      url: path ? `${siteUrl}${path}` : siteUrl,
      siteName: siteTitle,
      locale: "ar_EG",
      type,
      images: [
        {
          url: imageUrl,
          width: resolvedImage.width,
          height: resolvedImage.height,
          alt: title ?? brand.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  }
}
