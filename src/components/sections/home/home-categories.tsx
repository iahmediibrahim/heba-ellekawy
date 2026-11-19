import { CategoryGrid } from "@/components/sections/category-grid"
import { Section, SectionHeading } from "@/components/ui/section"

export function HomeCategories() {
  return (
    <Section>
      <SectionHeading
        eyebrow="فضاءات"
        title="تصفّح حسب القسم"
        copy="كل الأقسام مجمّعة تحت مدونة واحدة لتسهيل الوصول للمقال المناسب."
      />

      <CategoryGrid />
    </Section>
  )
}
