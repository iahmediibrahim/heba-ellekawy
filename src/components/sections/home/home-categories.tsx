import Link from "next/link"
import { LuArrowLeft } from "react-icons/lu"

import { spaceLinks } from "@/lib/navigation"

export function HomeCategories() {
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-center gap-5">
        <span aria-hidden="true" className="h-px w-16 bg-[var(--border-strong)]" />
        <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">فضاءات</h2>
        <span aria-hidden="true" className="h-px w-16 bg-[var(--border-strong)]" />
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2" dir="rtl">
        {spaceLinks.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex min-h-14 items-center justify-between gap-4 rounded-md border border-[var(--border-strong)] px-5 py-3 text-right font-semibold text-slate-800 transition hover:bg-white hover:text-[var(--accent)]"
            >
              <span>{item.label}</span>
              <LuArrowLeft className="size-4 shrink-0" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
