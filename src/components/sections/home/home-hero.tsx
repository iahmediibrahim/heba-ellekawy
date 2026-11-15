import { ArrowUpLeft, BookOpen, Sparkles } from "lucide-react"

import { BrandLogo } from "@/components/layout/logo"
import { ButtonLink } from "@/components/ui/button"
import { CardMedia } from "@/components/ui/card"

export function HomeHero({
  title,
  description,
  imageUrl,
  imageAlt,
}: {
  title: string
  description: string
  imageUrl?: string
  imageAlt: string
}) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="brand-panel flex flex-col justify-between gap-7 rounded-[2rem] p-6 sm:p-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              <Sparkles className="size-4" />
              طبيبة طب نفسي · كاتبة · روائية
            </span>
            <h1 className="text-3xl font-black leading-[1.45] text-white sm:text-4xl">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-white/85">{description}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-3">
          <ButtonLink
            href="/contact"
            variant="onBrand"
            iconPosition="end"
            icon={<ArrowUpLeft className="size-4" />}
          >
            احجز جلستك
          </ButtonLink>
          <ButtonLink
            href="/blog"
            variant="outlineOnBrand"
            icon={<BookOpen className="size-4" />}
          >
            تصفح المدونة
          </ButtonLink>
        </div>
      </div>

      <div className="surface-card overflow-hidden p-3">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[var(--surface-muted)] lg:aspect-square">
          {imageUrl ? (
            <CardMedia
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          ) : (
            <div className="brand-panel flex h-full flex-col items-center justify-center gap-6 p-8 text-center">
              <BrandLogo variant="mark" tone="white" className="w-28" />
              <p className="text-xl font-bold text-white">د. هبة اللكاوي</p>
              <p className="text-sm text-white/80">psychiatrist & psychotherapist</p>
            </div>
          )}

          <div className="absolute inset-x-4 bottom-4">
            <div className="rounded-[1.25rem] bg-white/92 p-4 text-right shadow-[var(--shadow-soft)] backdrop-blur-sm">
              <p className="text-sm font-bold text-[var(--accent)]">
                بقلم د. هبة اللكاوي
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                محتوى عن النفس والكتابة والحياة بتجربة أكثر هدوءًا ووضوحًا.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
