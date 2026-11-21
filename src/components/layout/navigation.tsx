"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { LuChevronDown, LuMenu, LuX } from "react-icons/lu"

import { BrandLogo } from "@/components/layout/logo"
import {
  NavigationDropdown,
  navigationLinkClass as linkClass,
} from "@/components/layout/navigation-dropdown"
import { isActivePath, navigationGroups } from "@/lib/navigation"

export function Navigation() {
  const pathname = usePathname()
  const [menuOpenForPath, setMenuOpenForPath] = useState<string | null>(null)
  const [openGroupState, setOpenGroupState] = useState<{
    path: string
    label: string
  } | null>(null)

  const menuOpen = menuOpenForPath === pathname
  const openGroup = openGroupState?.path === pathname ? openGroupState.label : null

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  function setMenuOpen(open: boolean) {
    setMenuOpenForPath(open ? pathname : null)
  }

  function setOpenGroup(label: string | null) {
    setOpenGroupState(label ? { path: pathname, label } : null)
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        تخطَّ إلى المحتوى
      </a>

      <header className="glass-header sticky top-0 z-40 w-full border-b border-[var(--border)] shadow-[var(--shadow-soft)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="order-3 flex items-center gap-3">
            <div className="hidden lg:block">
              <BrandLogo variant="horizontal" className="w-[300px]" sizes="300px" />
            </div>
            <div className="lg:hidden">
              <BrandLogo variant="mark" className="w-11" sizes="44px" />
            </div>
          </div>

          <nav className="order-2 hidden items-center justify-center gap-6 lg:flex">
            {navigationGroups.map((group) =>
              group.href && !group.sections ? (
                <Link
                  key={group.label}
                  href={group.href}
                  className={`text-sm font-semibold ${linkClass(
                    isActivePath(pathname, group.href),
                  )}`}
                >
                  {group.label}
                </Link>
              ) : (
                <NavigationDropdown
                  key={group.label}
                  group={group}
                  open={openGroup === group.label}
                  onOpenChange={(next) => setOpenGroup(next ? group.label : null)}
                />
              ),
            )}
          </nav>

          <div className="order-1 hidden items-center gap-3 lg:flex">
            <Link href="/contact" className="primary-button px-5 py-2.5 text-sm">
              احجز جلستك
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="order-1 inline-flex items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] p-3 text-[var(--accent)] lg:hidden"
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <LuX className="size-5" /> : <LuMenu className="size-5" />}
          </button>
        </div>

        {menuOpen ? (
          <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-[var(--border)] bg-[var(--surface)] px-4 py-5 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 text-right">
              <Link href="/contact" className="primary-button mb-2 w-full">
                احجز جلستك
              </Link>

              {navigationGroups.map((group) => {
                const groupLinks = group.items ?? []

                if (!group.sections && !group.items) {
                  return (
                    <Link
                      key={group.label}
                      href={group.href!}
                      className={`rounded-md px-4 py-3 font-semibold ${
                        isActivePath(pathname, group.href!)
                          ? "bg-[var(--surface-muted)] text-[var(--accent)]"
                          : "text-slate-700"
                      }`}
                    >
                      {group.label}
                    </Link>
                  )
                }

                const expanded = openGroup === group.label
                const isGroupActive = [
                  ...groupLinks,
                  ...(group.sections?.flatMap((section) => section.items) ?? []),
                ].some((link) => isActivePath(pathname, link.href))

                return (
                  <div
                    key={group.label}
                    className="rounded-md border border-[var(--border)] px-4 py-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      {group.href ? (
                        <Link
                          href={group.href}
                          className={`font-semibold ${
                            isGroupActive
                              ? "text-[var(--accent)]"
                              : "text-[var(--accent-cyan)]"
                          }`}
                        >
                          {group.label}
                        </Link>
                      ) : (
                        <span
                          className={`font-semibold ${
                            isGroupActive
                              ? "text-[var(--accent)]"
                              : "text-[var(--accent-cyan)]"
                          }`}
                        >
                          {group.label}
                        </span>
                      )}
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-label={`${expanded ? "إغلاق" : "فتح"} قائمة ${group.label}`}
                        onClick={() => setOpenGroup(expanded ? null : group.label)}
                        className={`inline-flex size-8 items-center justify-center rounded-md bg-[var(--surface-muted)] text-[var(--accent)] transition ${
                          expanded ? "rotate-180" : ""
                        }`}
                      >
                        <LuChevronDown className="size-4" />
                      </button>
                    </div>

                    {expanded ? (
                      <div className="mt-3 flex flex-col gap-3">
                        {group.sections?.map((section) => (
                          <div key={section.title}>
                            <p className="mb-1.5 px-1 text-xs font-bold uppercase tracking-wide text-[var(--accent-cyan)]">
                              {section.title}
                            </p>
                            <div className="flex flex-col gap-1">
                              {section.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className={`rounded-md px-3 py-2 text-sm ${
                                    isActivePath(pathname, item.href)
                                      ? "bg-[var(--surface-muted)] text-[var(--accent)]"
                                      : "text-slate-700"
                                  }`}
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}

                        {group.items?.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`rounded-md px-3 py-2 text-sm ${
                              isActivePath(pathname, item.href)
                                ? "bg-[var(--surface-muted)] text-[var(--accent)]"
                                : "text-slate-700"
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}
      </header>
    </>
  )
}
