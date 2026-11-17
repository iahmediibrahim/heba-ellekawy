import type { Metadata } from "next"

import { HomeCta } from "@/components/sections/home/home-cta"
import { HomeFounder } from "@/components/sections/home/home-founder"
import { getHomePageData } from "@/lib/contentful"
import { buildMetadata } from "@/lib/metadata"

export const metadata: Metadata = buildMetadata({
  keywords: ["خدماتنا", "الكتابات الأخيرة", "القصص القصيرة"],
  path: "/",
})

export default async function Home() {
  const data = await getHomePageData()
  const heroImage = data.about.image ?? data.featuredAuthor?.image

  return (
    <div className="page-shell">
      {/* <HomeHero
        title="مساحة عربية حديثة للقراءة النفسية والأدبية"
        description={truncateText(data.about.description, 220)}
        imageUrl={heroImage?.url}
        imageAlt={heroImage?.title ?? "د. هبة اللكاوي"}
      /> */}

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
