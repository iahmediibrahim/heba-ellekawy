import { ArrowUpLeft, Brain, Globe2 } from "lucide-react"
import Link from "next/link"

import { blogSections } from "@/lib/navigation"

export function CategoryGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {blogSections.map(section => (
        <div key={section.title} className="surface-card p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
              {section.title.includes("نفسية") ? (
                <Brain className="size-5" />
              ) : (
                <Globe2 className="size-5" />
              )}
            </span>
            <h3 className="text-xl font-bold text-slate-900">{section.title}</h3>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {section.items.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="surface-muted flex items-center justify-between gap-2 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[var(--border-strong)] hover:text-[var(--accent)]"
                >
                  <span>{item.label}</span>
                  <ArrowUpLeft className="size-4 shrink-0 text-[var(--accent-cyan)]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
