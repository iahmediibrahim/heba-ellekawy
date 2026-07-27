import type { Metadata } from "next";

import { getSiteUrl } from "@/lib/site-url";
import type { SeoImage } from "@/lib/types";

const siteTitle = "شغبطة - بقلم د.هبة اللكاوي";
const siteDescription =
  "بقلم د. هبة اللكاوي طبيب أخصائي الطب النفسي وتعديل السلوك ، روائية وكاتبة ، معدة وحكاءة";

export function buildMetadata({
  title,
  description = siteDescription,
  keywords = [],
  image,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: SeoImage;
} = {}): Metadata {
  const siteUrl = getSiteUrl();
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const imageUrl = image?.src ? (image.src.startsWith("http") ? image.src : `${siteUrl}${image.src}`) : `${siteUrl}/images/shaghbatta.jpg`;

  return {
    metadataBase: new URL(siteUrl),
    title: fullTitle,
    description,
    keywords,
    openGraph: {
      title: fullTitle,
      description,
      url: siteUrl,
      siteName: siteTitle,
      locale: "ar_EG",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: image?.width,
          height: image?.height,
          alt: title ?? siteTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}
