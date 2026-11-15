import type { ReactNode } from "react"

/**
 * تخطيط الصفحات ذات العمودين (المقال + الشريط الجانبي).
 */
export function ContentLayout({
  children,
  aside,
}: {
  children: ReactNode
  aside?: ReactNode
}) {
  if (!aside) {
    return <div className="page-shell">{children}</div>
  }

  return (
    <div className="page-shell page-shell--grid lg:grid-cols-[1.35fr_0.65fr]">
      <section className="surface-card p-6 lg:p-8">{children}</section>
      <aside className="space-y-6">{aside}</aside>
    </div>
  )
}
