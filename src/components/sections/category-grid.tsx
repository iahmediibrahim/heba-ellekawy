import Link from "next/link"
import { LuArrowUpLeft, LuBrain, LuGlobe } from "react-icons/lu"

import { blogSections } from "@/lib/navigation"

export function CategoryGrid({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3"

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {blogSections.map((section) => (
        <div key={section.title} className="surface-card p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
              {section.title.includes("نفسية") ? (
                <LuBrain className="size-5" />
              ) : (
                <LuGlobe className="size-5" />
              )}
            </span>
            <Heading className="text-xl font-bold text-slate-900">
              {section.title}
            </Heading>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="surface-muted flex items-center justify-between gap-2 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[var(--border-strong)] hover:text-[var(--accent)]"
                >
                  <span>{item.label}</span>
                  <LuArrowUpLeft className="size-4 shrink-0 text-[var(--accent-cyan)]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
