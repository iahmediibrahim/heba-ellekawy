import { ArrowUpLeft, Compass, Home, PenLine } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { BrandLogo } from "@/components/layout/logo"
import { ButtonLink } from "@/components/ui/button"
import { Section, SectionHeading } from "@/components/ui/section"

export const metadata: Metadata = {
  title: "الصفحة غير موجودة",
  robots: { index: false, follow: false },
}

const suggestions = [
  { label: "الرئيسية", href: "/", icon: Home },
  { label: "المدونة", href: "/blog", icon: PenLine },
  { label: "القصص القصيرة", href: "/stories", icon: Compass },
  { label: "تواصلي معنا", href: "/contact", icon: ArrowUpLeft },
]

export default function NotFound() {
  return (
    <div className="page-shell">
      <section className="brand-panel flex flex-col items-center gap-6 rounded-[2rem] px-6 py-14 text-center">
        <BrandLogo variant="mark" tone="white" className="w-20" />

        <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/70">
          404
        </p>

        <h1 className="text-3xl font-black leading-[1.5] text-white sm:text-4xl">
          الصفحة اللي بتدور عليها مش موجودة
        </h1>

        <p className="max-w-xl text-base leading-9 text-white/85">
          يمكن يكون الرابط قديم أو اتغيّر. جرّب تتصفح الأقسام من تحت، أو ارجع
          للصفحة الرئيسية.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <ButtonLink
            href="/"
            variant="onBrandFlat"
            icon={<Home className="size-4" />}
          >
            الصفحة الرئيسية
          </ButtonLink>
          <ButtonLink
            href="/blog"
            variant="outlineOnBrand"
            icon={<PenLine className="size-4" />}
          >
            تصفح المدونة
          </ButtonLink>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="روابط مفيدة"
          title="من هنا تقدر تبدأ"
          align="center"
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {suggestions.map(item => {
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className="surface-card flex items-center gap-3 p-5 text-right transition hover:-translate-y-0.5"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon className="size-5" />
                </span>
                <span className="font-bold text-slate-900">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </Section>
    </div>
  )
}
