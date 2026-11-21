"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { LuChevronDown } from "react-icons/lu"

import { isActivePath, type NavigationGroup } from "@/lib/navigation"

export function navigationLinkClass(active: boolean) {
  return active
    ? "text-[var(--accent)]"
    : "text-slate-700 transition hover:text-[var(--accent)]"
}

type NavigationDropdownProps = {
  group: NavigationGroup
  variant?: "nav" | "footer"
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function NavigationDropdown({
  group,
  variant = "nav",
  open,
  onOpenChange,
}: NavigationDropdownProps) {
  const pathname = usePathname()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = open !== undefined
  const isOpen = open ?? internalOpen

  const hasSections = Boolean(group.sections?.length)
  const links = group.items ?? group.sections?.flatMap((section) => section.items) ?? []
  const isActive = links.some((link) => isActivePath(pathname, link.href))
  const isFooter = variant === "footer"

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next)
      }

      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  useEffect(() => {
    // The desktop dropdown remains mounted while CSS hides it on mobile.
    function handlePointerDown(event: MouseEvent) {
      const wrapper = wrapperRef.current

      if (wrapper?.getClientRects().length && !wrapper.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (wrapperRef.current?.getClientRects().length && event.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [setOpen])

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center gap-0.5">
        {group.href ? (
          <Link
            href={group.href}
            className={`inline-flex items-center text-sm font-semibold ${navigationLinkClass(
              isActive || isActivePath(pathname, group.href),
            )}`}
          >
            {group.label}
          </Link>
        ) : (
          <span
            className={`inline-flex items-center text-sm font-semibold ${navigationLinkClass(
              isActive,
            )}`}
          >
            {group.label}
          </span>
        )}
        <button
          type="button"
          aria-expanded={isOpen}
          aria-label={`${isOpen ? "إغلاق" : "فتح"} قائمة ${group.label}`}
          onClick={() => setOpen(!isOpen)}
          className={`inline-flex size-6 items-center justify-center rounded-md text-slate-500 transition hover:text-[var(--accent)] ${
            isOpen ? "rotate-180 text-[var(--accent)]" : ""
          }`}
        >
          <LuChevronDown className="size-4" />
        </button>
      </div>

      <div
        className={`invisible absolute z-30 origin-top rounded-md border border-[var(--border)] bg-[var(--surface)] p-3 opacity-0 shadow-[var(--shadow-card)] transition duration-200 ${
          isFooter ? "bottom-full right-0 mb-3" : "right-0 top-full mt-3"
        } ${isOpen ? "visible translate-y-0 opacity-100" : "translate-y-1"} ${
          hasSections ? "w-[min(42rem,calc(100vw-2rem))]" : "min-w-64"
        }`}
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
                        onClick={() => setOpen(false)}
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
                  onClick={() => setOpen(false)}
                  className={`rounded-md text-right text-sm font-medium transition hover:bg-[var(--surface-muted)] ${
                    isFooter ? "px-3 py-2.5" : "px-4 py-3"
                  } ${
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
