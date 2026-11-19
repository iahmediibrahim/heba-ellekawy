"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { LuChevronDown, LuMenu, LuX } from "react-icons/lu"

import { BrandLogo } from "@/components/layout/logo"
import { isActivePath, navigationGroups, type NavigationGroup } from "@/lib/navigation"

function linkClass(active: boolean) {
  return active
    ? "text-[var(--accent)]"
    : "text-slate-700 transition hover:text-[var(--accent)]"
}

function GroupDropdown({
  group,
  pathname,
  open,
  onOpenChange,
}: {
  group: NavigationGroup
  pathname: string
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const hasSections = Boolean(group.sections?.length)
  const links = group.items ?? group.sections?.flatMap((section) => section.items) ?? []

  useEffect(() => {
    // The desktop dropdown remains mounted while CSS hides it on mobile.
    function handlePointerDown(event: MouseEvent) {
      const wrapper = wrapperRef.current

      if (wrapper?.getClientRects().length && !wrapper.contains(event.target as Node)) {
        onOpenChange(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (wrapperRef.current?.getClientRects().length && event.key === "Escape") {
        onOpenChange(false)
      }
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onOpenChange])

  const isActive = links.some((link) => isActivePath(pathname, link.href))

  return (
    <div
      ref={wrapperRef}
      className="group relative"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
    >
      <div className="flex items-center gap-0.5">
        {group.href ? (
          <Link
            href={group.href}
            className={`inline-flex items-center text-sm font-semibold ${linkClass(
              isActive || isActivePath(pathname, group.href),
            )}`}
          >
            {group.label}
          </Link>
        ) : (
          <span
            className={`inline-flex items-center text-sm font-semibold ${linkClass(
              isActive,
            )}`}
          >
            {group.label}
          </span>
        )}
        <button
          type="button"
          aria-expanded={open}
          aria-label={`${open ? "إغلاق" : "فتح"} قائمة ${group.label}`}
          onClick={() => onOpenChange(!open)}
          className={`inline-flex size-6 items-center justify-center rounded-md text-slate-500 transition hover:text-[var(--accent)] ${
            open ? "rotate-180 text-[var(--accent)]" : ""
          }`}
        >
          <LuChevronDown className="size-4" />
        </button>
      </div>

      <div
        className={`invisible absolute right-0 top-full z-30 mt-3 origin-top rounded-md border border-[var(--border)] bg-[var(--surface)] p-3 opacity-0 shadow-[var(--shadow-card)] transition duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "translate-y-1"
        } ${hasSections ? "w-[min(42rem,calc(100vw-2rem))]" : "min-w-64"}`}
      >
        {group.sections ? (
          <div className="grid gap-1 sm:grid-cols-2">
            {group.sections.map((section) => (
              <div key={section.title} className="p-2">
                <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wide text-[var(--accent-cyan)]">
                  {section.title}
                </p>
                <div className="flex flex-col gap-1">
                  {section.items.map((item) => {
                    const active = isActivePath(pathname, item.href)

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => onOpenChange(false)}
                        className={`rounded-md px-3 py-2.5 text-sm font-medium transition hover:bg-[var(--surface-muted)] ${
                          active
                            ? "bg-[var(--surface-muted)] text-[var(--accent)]"
                            : "text-slate-700"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {group.items?.map((item) => {
              const active = isActivePath(pathname, item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className={`rounded-md px-4 py-3 text-right text-sm font-medium transition hover:bg-[var(--surface-muted)] ${
                    active
                      ? "bg-[var(--surface-muted)] text-[var(--accent)]"
                      : "text-slate-700"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export function Navigation() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [lastPath, setLastPath] = useState(pathname)

  if (lastPath !== pathname) {
    setLastPath(pathname)
    setMenuOpen(false)
    setOpenGroup(null)
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <>
      <a href="#main-content" className="skip-link">
        تخطَّ إلى المحتوى
      </a>

      <header className="glass-header sticky top-3 z-40 mx-auto w-[calc(100%-1.5rem)] max-w-7xl rounded-[var(--radius-card)] border border-[var(--border)] shadow-[var(--shadow-soft)] sm:w-[calc(100%-2.5rem)]">
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
                <GroupDropdown
                  key={group.label}
                  group={group}
                  pathname={pathname}
                  open={openGroup === group.label}
                  onOpenChange={(next) => setOpenGroup(() => (next ? group.label : null))}
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
            onClick={() => setMenuOpen((current) => !current)}
            className="order-1 inline-flex items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] p-3 text-[var(--accent)] lg:hidden"
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <LuX className="size-5" /> : <LuMenu className="size-5" />}
          </button>
        </div>

        {menuOpen ? (
          <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto rounded-b-[var(--radius-card)] border-t border-[var(--border)] bg-[var(--surface)] px-4 py-5 lg:hidden">
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
                        onClick={() =>
                          setOpenGroup((current) =>
                            current === group.label ? null : group.label,
                          )
                        }
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
