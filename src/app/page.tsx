import type { Metadata } from "next"

import { HomeHero } from "@/components/sections/home/home-hero"
import { HomeCta } from "@/components/sections/home/home-cta"
import { HomeFounder } from "@/components/sections/home/home-founder"
import { getHomePageData } from "@/lib/contentful"
import { truncateText } from "@/lib/format"
import { buildMetadata } from "@/lib/metadata"

export const metadata: Metadata = buildMetadata({
  keywords: ["خدماتنا", "الكتابات الأخيرة", "القصص القصيرة"],
  path: "/",
})

export default async function Home() {
  const data = await getHomePageData()

  return (
    <div className="page-shell">
      <HomeHero
        title="مساحة عربية حديثة للقراءة النفسية والأدبية"
        description={truncateText(data.about.description, 220)}
        imageUrl="/brand/banner.png"
        imageAlt="لوحات فنية ترمز إلى النفس والقراءة والكتابة"
      />

      {/* <HomeFeatured
        heroArticle={data.featuredArticles[0]}
        articles={data.featuredArticles.slice(1, 4)}
      /> */}

      {/* <HomeCategories /> */}

      <HomeFounder
        author={data.featuredAuthor}
        // stories={data.latestStories.slice(0, 2)}
        stories={[]}
      />

      {/* <HomeServices services={data.services} /> */}

      <HomeCta />
    </div>
  )
}
