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
    <div className="section-heading" data-align={align}>
      {breadcrumbs ? (
        <div className={align === "center" ? "flex justify-center" : ""}>
          {breadcrumbs}
        </div>
      ) : null}
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="section-title">{title}</h1>
      {copy ? <p className="section-copy">{copy}</p> : null}
    </div>
  )
}

export { Breadcrumbs }
