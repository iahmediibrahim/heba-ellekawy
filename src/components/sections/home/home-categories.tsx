import { Section, SectionHeading } from "@/components/ui/section"
import { CategoryGrid } from "@/components/sections/category-grid"

export function HomeCategories() {
  return (
    <Section>
      <SectionHeading
        eyebrow="المدونة"
        title="تصفّح حسب القسم"
        copy="كل الأقسام مجمّعة تحت مدونة واحدة لتسهيل الوصول للمقال المناسب."
      />

      <CategoryGrid />
    </Section>
  )
}
