import Link from "next/link"
import { Heart, Mail, Phone } from "lucide-react"

import { BrandLogo } from "@/components/layout/logo"
import { SocialIcons } from "@/components/social/social-icons"
import { brand } from "@/lib/brand"
import { navigationGroups } from "@/lib/navigation"
import type { AboutData } from "@/lib/types"

export function Footer({ about }: { about: AboutData }) {
  const primaryPhone = about.phone[0]
  const links = navigationGroups
    .filter(group => group.href)
    .map(group => ({ label: group.label!, href: group.href! }))

  return (
    <footer className="mt-6 border-t border-[var(--border)] bg-white px-5 pb-6 pt-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <BrandLogo variant="wordmark" className="w-[190px] sm:order-2" />
          <p className="text-sm leading-7 text-[var(--text-muted)] sm:order-1">
            {brand.tagline}
          </p>
        </div>

        <nav
          aria-label="روابط الفوتر"
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--border)] pt-6 text-sm"
        >
          {links.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="font-semibold text-slate-700 transition hover:text-[var(--accent)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/about"
            className="font-semibold text-slate-700 transition hover:text-[var(--accent)]"
          >
            عن المنصة
          </Link>
          <Link
            href="/author"
            className="font-semibold text-slate-700 transition hover:text-[var(--accent)]"
          >
            عن المؤسس
          </Link>
        </nav>

        <div className="mt-6 flex flex-col gap-4 border-t border-[var(--border)] pt-6 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {primaryPhone ? (
              <a
                href={`tel:${primaryPhone}`}
                className="inline-flex items-center gap-2 transition hover:text-[var(--accent)]"
              >
                <Phone className="size-4" />
                <span dir="ltr">{primaryPhone}</span>
              </a>
            ) : null}
            {about.mail ? (
              <a
                href={`mailto:${about.mail}`}
                className="inline-flex items-center gap-2 transition hover:text-[var(--accent)]"
                dir="ltr"
              >
                <Mail className="size-4" />
                {about.mail}
              </a>
            ) : null}
            <SocialIcons about={about} />
          </div>

          <span className="inline-flex flex-wrap items-center gap-2" dir="ltr">
            <span>© {new Date().getFullYear()} {brand.nameEn}</span>
            <span aria-hidden="true">·</span>
            <span>built with</span>
            <Heart className="size-4 text-[#ff6a5d]" />
            <Link
              href="https://ahmedibrahim.ninja/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[var(--accent)]"
            >
              @ahmedIbrahim
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
