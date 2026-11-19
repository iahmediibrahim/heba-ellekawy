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
        className={`flex flex-col gap-2 py-2 ${
          align === "center" ? "items-center text-center" : "items-start text-right"
        }`}
      >
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="max-w-4xl text-2xl font-black leading-tight text-[var(--foreground)] sm:text-3xl">
          {title}
        </h1>
        {copy ? (
          <p className="max-w-3xl text-sm leading-7 text-[var(--text-muted)] sm:text-base">
            {copy}
          </p>
        ) : null}
      </header>
    </div>
  )
}

export { Breadcrumbs }
