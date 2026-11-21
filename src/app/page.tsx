import type { Metadata } from "next"

import { HomeCategories } from "@/components/sections/home/home-categories"
import { HomeCta } from "@/components/sections/home/home-cta"
import { HomeFounder } from "@/components/sections/home/home-founder"
import { HomeHero } from "@/components/sections/home/home-hero"
import { getHomePageData } from "@/lib/contentful"
import { buildMetadata } from "@/lib/metadata"

export const metadata: Metadata = buildMetadata({
  keywords: ["العلاج النفسي", "مدونة شغبطة", "الروايات والكتب", "الأفلام القصيرة"],
  path: "/",
})

export default async function Home() {
  const data = await getHomePageData()
  const aboutDescription = data.featuredAuthor?.shortBio!
  const name = data.featuredAuthor?.name!

  return (
    <div className="flex flex-col">
      <HomeHero
        imageUrl="/brand/banner.png"
        imageAlt="لوحات فنية عن النفس والقراءة والكتابة"
      />

      <div className="mx-auto flex w-full max-w-[76rem] flex-col gap-10 px-4 py-8 sm:px-6 sm:py-10 lg:gap-16 lg:px-8 lg:py-12">
        <HomeFounder description={aboutDescription} name={name} />
        <HomeCategories />
        <HomeCta />
      </div>
    </div>
  )
}
