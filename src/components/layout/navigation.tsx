"use client"

import { ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo, useState } from "react"

import { BrandLogo } from "@/components/layout/logo"
import type { AboutData } from "@/lib/types"

type NavigationGroup = {
  label: string
  href?: string
  items?: { label: string; href: string }[]
}

const navigationGroups: NavigationGroup[] = [
  { label: "الرئيسية", href: "/" },
  {
    label: "لنفسية أفضل",
    items: [
      { label: "خواطر ونصائح نفسية", href: "/articles/thoughts-and-tips" },
      {
        label: "مقالات عن العلاقات والتربية",
        href: "/articles/family-and-educational",
      },
      { label: "مقالات نفسية", href: "/articles/psychological" },
      {
        label: "بريد المشكلات",
        href: "/articles/opinion-articles-and-problems-mail",
      },
    ],
  },
  {
    label: "كتابة حرة",
    items: [
      { label: "خواطر ومقالات عامة", href: "/articles/other" },
      {
        label: "ترشيحات الكتب والافلام والروايات",
        href: "/articles/nominations-for-books-movies-and-novels",
      },
      { label: "أنا والأماكن", href: "/articles/me-and-places" },
      { label: "رحلتي مع الكتابة", href: "/articles/my-journey-with-writing" },
      { label: "قصص مصوره", href: "/articles/short-story" },
      { label: "English Articles", href: "/articles/english-articles" },
    ],
  },
  { label: "الروايات والكتب", href: "/novels-books" },
  { label: "القصص القصيرة", href: "/stories" },
  {
    label: "من أنا",
    items: [
      { label: "عن المؤسس", href: "/author" },
      { label: "عن شغبطه و خدماتها", href: "/about" },
    ],
  },
]

function linkClass(active: boolean) {
  return active
    ? "text-[var(--accent)]"
    : "text-slate-700 transition hover:text-[var(--accent)]"
}

export function Navigation({ about }: { about: AboutData }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const groupedItems = useMemo(() => navigationGroups, [])
  const primaryPhone = about.phone[0]

  return (
    <header className="glass-header sticky top-0 z-40 border-b border-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <BrandLogo variant="large" />
          </div>
          <div className="md:hidden">
            <BrandLogo variant="small" />
          </div>
          <div className="hidden text-right lg:block">
            <p className="text-sm font-semibold text-[var(--accent)]">شغبطه</p>
            <p className="text-xs text-[var(--text-muted)]">مساحة نفسية وأدبية</p>
          </div>
        </div>

        <nav className="hidden items-center justify-center gap-6 md:flex lg:gap-7">
          {groupedItems.map(group =>
            group.href ? (
              <Link
                key={group.label}
                href={group.href}
                className={`text-sm font-semibold ${linkClass(pathname === group.href)}`}
              >
                {group.label}
              </Link>
            ) : (
              <div key={group.label} className="group relative">
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 text-sm font-semibold ${linkClass(
                    group.items?.some(item => pathname.startsWith(item.href)) ?? false,
                  )}`}
                >
                  {group.label}
                  <ChevronDown className="size-4" />
                </button>
                <div className="invisible absolute right-0 top-full z-20 mt-4 min-w-72 rounded-[1.4rem] border border-[var(--border)] bg-white p-3 opacity-0 shadow-[var(--shadow-card)] transition group-hover:visible group-hover:opacity-100">
                  <div className="flex flex-col gap-1.5">
                    {group.items?.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-xl px-4 py-3 text-right text-sm font-medium transition hover:bg-[var(--surface-muted)] ${
                          pathname.startsWith(item.href)
                            ? "bg-[var(--surface-muted)] text-[var(--accent)]"
                            : "text-slate-700"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {primaryPhone ? (
            <Link href={`tel:${primaryPhone}`} className="secondary-button px-4 py-2.5 text-sm">
              {primaryPhone}
            </Link>
          ) : null}
          <Link href="/contact" className="primary-button px-5 py-2.5 text-sm">
            احجز جلستك
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(current => !current)}
          className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white p-3 text-[var(--accent)] md:hidden"
          aria-label="فتح القائمة"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-[var(--border)] bg-white px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 text-right">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="primary-button mb-2 w-full"
            >
              احجز جلستك
            </Link>
            {groupedItems.map(group =>
              group.href ? (
                <Link
                  key={group.label}
                  href={group.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-2xl px-4 py-3 font-semibold ${
                    pathname === group.href
                      ? "bg-[var(--surface-muted)] text-[var(--accent)]"
                      : "text-slate-700"
                  }`}
                >
                  {group.label}
                </Link>
              ) : (
                <div
                  key={group.label}
                  className="rounded-2xl border border-[var(--border)] px-4 py-3"
                >
                  <p className="mb-2 font-semibold text-[var(--accent)]">{group.label}</p>
                  <div className="flex flex-col gap-1.5">
                    {group.items?.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`rounded-xl px-3 py-2 text-sm ${
                          pathname.startsWith(item.href)
                            ? "bg-[var(--surface-muted)] text-[var(--accent)]"
                            : "text-slate-700"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
