import type { Metadata } from "next"

import { NovelCard } from "@/components/novels/novel-card"
import { CardGrid } from "@/components/ui/card-grid"
import { EmptyState } from "@/components/ui/empty-state"
import { PageHeader } from "@/components/ui/page-header"
import { Section, SectionHeading } from "@/components/ui/section"
import { getNovels } from "@/lib/contentful"
import { buildMetadata } from "@/lib/metadata"

export const metadata: Metadata = buildMetadata({
  title: "الروايات والكتب",
  keywords: ["الروايات والكتب", "روايات", "PDF"],
  path: "/novels-books",
})

export default async function NovelsBooksPage() {
  const novels = await getNovels()
  const inShop = novels.filter((novel) => novel.inShop)
  const electronic = novels.filter((novel) => !novel.inShop)

  return (
    <div className="page-shell">
      <Section>
        <PageHeader
          eyebrow="الكتب والروايات"
          title="روايات حالية في الأسواق"
          align="center"
        />

        {inShop.length ? (
          <div className="grid gap-5">
            {inShop.map((novel, index) => (
              <NovelCard key={novel.id} novel={novel} priority={index === 0} />
            ))}
          </div>
        ) : (
          <EmptyState>لا توجد روايات متاحة في الأسواق حاليًا.</EmptyState>
        )}
      </Section>

      <Section>
        <SectionHeading
          eyebrow="نسخ إلكترونية"
          title="روايات إلكترونية"
          copy="لقراءة الرواية قم بتحميل ملف الـ PDF"
          align="center"
        />

        {electronic.length ? (
          <CardGrid columns={2}>
            {electronic.map((novel) => (
              <NovelCard key={novel.id} novel={novel} />
            ))}
          </CardGrid>
        ) : (
          <EmptyState>لا توجد روايات إلكترونية متاحة حاليًا.</EmptyState>
        )}
      </Section>
    </div>
  )
}
