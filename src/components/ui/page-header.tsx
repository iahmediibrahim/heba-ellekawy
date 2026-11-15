import type { ReactNode } from "react"

import { Breadcrumbs } from "@/components/articles/breadcrumbs"

/**
 * ترويسة موحّدة لكل الصفحات: مسار التصفح + عنوان القسم + الوصف.
 */
export function PageHeader({
  eyebrow,
  title,
  copy,
  breadcrumbs,
  align = "center",
}: {
  eyebrow?: string
  title: ReactNode
  copy?: string
  breadcrumbs?: ReactNode
  align?: "right" | "center"
}) {
  return (
    <div className="space-y-4">
      {breadcrumbs ? (
        <div className={align === "center" ? "flex justify-center" : "flex"}>
          {breadcrumbs}
        </div>
      ) : null}
      <header
        className={`brand-panel flex flex-col gap-3 rounded-[var(--radius-card)] p-6 sm:p-8 lg:p-10 ${
          align === "center" ? "items-center text-center" : "items-start text-right"
        }`}
      >
        {eyebrow ? <p className="brand-eyebrow">{eyebrow}</p> : null}
        <h1 className="max-w-4xl text-3xl font-black leading-tight text-white sm:text-4xl">
          {title}
        </h1>
        {copy ? (
          <p className="max-w-3xl text-sm leading-7 text-white/85 sm:text-base">{copy}</p>
        ) : null}
      </header>
    </div>
  )
}

export { Breadcrumbs }
