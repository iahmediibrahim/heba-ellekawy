import type { Metadata } from "next"
import Link from "next/link"
import { LuArrowUpLeft, LuCompass, LuHouse, LuPenLine } from "react-icons/lu"

import { BrandLogo } from "@/components/layout/logo"
import { ButtonLink } from "@/components/ui/button"
import { Section, SectionHeading } from "@/components/ui/section"

export const metadata: Metadata = {
  title: "الصفحة غير موجودة",
  robots: { index: false, follow: false },
}

const suggestions = [
  { label: "الرئيسية", href: "/", icon: LuHouse },
  { label: "فضاءات", href: "/blog", icon: LuPenLine },
  { label: "القصص القصيرة", href: "/novels-books#short-stories", icon: LuCompass },
  { label: "تواصلي معنا", href: "/contact", icon: LuArrowUpLeft },
]

export default function NotFound() {
  return (
    <div className="page-shell">
      <section className="surface-card flex flex-col items-center gap-6 px-6 py-14 text-center">
        <BrandLogo
          variant="mark"
          className="w-20 rounded-2xl bg-white p-2"
          sizes="80px"
        />

        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--text-muted)]">
          404
        </p>

        <h1 className="text-3xl font-black leading-[1.5] text-slate-950 sm:text-4xl">
          الصفحة اللي بتدور عليها مش موجودة
        </h1>

        <p className="max-w-xl text-base leading-9 text-[var(--text-muted)]">
          يمكن يكون الرابط قديم أو اتغيّر. جرّب تتصفح الأقسام من تحت، أو ارجع للصفحة
          الرئيسية.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <ButtonLink
            href="/"
            variant="onBrandFlat"
            icon={<LuHouse className="size-4" />}
          >
            الصفحة الرئيسية
          </ButtonLink>
          <ButtonLink
            href="/blog"
            variant="secondary"
            icon={<LuPenLine className="size-4" />}
          >
            فضاءات
          </ButtonLink>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="روابط مفيدة" title="من هنا تقدر تبدأ" align="center" />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {suggestions.map((item) => {
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
