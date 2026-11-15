import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export type BreadcrumbItem = {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="مسار التصفح" className="flex flex-wrap items-center gap-1 text-sm">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-1">
          {index > 0 ? (
            <ChevronLeft className="size-4 text-[var(--accent-cyan)]" />
          ) : null}
          {item.href ? (
            <Link
              href={item.href}
              className="font-semibold text-[var(--accent)] transition hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[var(--text-muted)]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
