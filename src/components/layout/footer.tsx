import Link from "next/link"
import { LuHeart, LuMail, LuPhone } from "react-icons/lu"

import { BrandLogo } from "@/components/layout/logo"
import { SocialIcons } from "@/components/social/social-icons"
import { brand } from "@/lib/brand"
import { navigationGroups } from "@/lib/navigation"
import type { AboutData } from "@/lib/types"

export function Footer({ about }: { about: AboutData }) {
  const primaryPhone = about.phone[0]
  const links = navigationGroups
    .filter((group) => group.href)
    .map((group) => ({ label: group.label!, href: group.href! }))

  return (
    <footer className="mt-6 border-t border-[var(--border)] bg-[var(--surface)] px-5 pb-6 pt-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <BrandLogo
            variant="wordmark"
            className="w-[190px] self-end sm:order-2 lg:w-[260px]"
            sizes="(min-width: 1024px) 260px, 190px"
          />
          <p className="text-lg leading-7 text-[var(--text-muted)] sm:order-1">
            {brand.tagline}
          </p>
        </div>

        <nav
          aria-label="روابط الفوتر"
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--border)] pt-6 text-sm"
        >
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-semibold text-slate-700 transition hover:text-[var(--accent)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 flex flex-col items-center gap-4 border-t border-[var(--border)] pt-6 text-center text-sm text-[var(--text-muted)] sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {primaryPhone ? (
              <a
                href={`tel:${primaryPhone}`}
                className="inline-flex items-center gap-2 transition hover:text-[var(--accent)]"
              >
                <span dir="ltr">{primaryPhone}</span>
                <LuPhone className="size-4" />
              </a>
            ) : null}
            {about.mail ? (
              <a
                href={`mailto:${about.mail}`}
                className="inline-flex items-center gap-2 transition hover:text-[var(--accent)]"
                dir="ltr"
              >
                <LuMail className="size-4" />
                {about.mail}
              </a>
            ) : null}
            <SocialIcons about={about} />
          </div>

          <span
            className="flex flex-wrap items-center justify-center gap-2 border-t border-[var(--border)] pt-4 sm:border-0 sm:pt-0"
            dir="ltr"
          >
            <span>© {new Date().getFullYear()}</span>
            <span aria-hidden="true">·</span>
            <span>built with</span>
            <LuHeart className="size-4 " />
            <Link
              href="https://ahmediibrahim.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--accent)]"
            >
              By @ahmedIbrahim
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
