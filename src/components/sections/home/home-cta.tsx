import { BookOpen, Brain } from "lucide-react"

import { ButtonLink } from "@/components/ui/button"

export function HomeCta() {
  return (
    <section className="brand-panel rounded-[2rem] p-7 text-right lg:p-10">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold text-white">
            <Brain className="size-4" />
            ابدأ من هنا
          </p>
          <h2 className="text-3xl font-black leading-[1.5] text-white sm:text-4xl">
            حجز، قراءة، أو استكشاف عالم د. هبة
          </h2>
          <p className="text-base leading-9 text-white/85">
            تجربة أبسط وأكثر نضجًا تضع المحتوى والخدمة في الواجهة من غير زحام بصري.
          </p>
        </div>

        <div className="flex flex-wrap justify-end gap-3">
          <ButtonLink href="/contact" variant="onBrandFlat">
            احجز جلستك
          </ButtonLink>
          <ButtonLink
            href="/blog"
            variant="outlineOnBrand"
            icon={<BookOpen className="size-4" />}
          >
            ابدأ القراءة
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
