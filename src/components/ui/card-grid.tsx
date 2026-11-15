import type { ReactNode } from "react"

/**
 * شبكة موحّدة للبطاقات، بعدد أعمدة متوافق مع التصميم الحالي.
 */
export function CardGrid({
  children,
  columns = 3,
  className,
}: {
  children: ReactNode
  columns?: 2 | 3 | 4
  className?: string
}) {
  const columnsClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 xl:grid-cols-3",
    4: "sm:grid-cols-2 xl:grid-cols-4",
  }[columns]

  return (
    <div
      className={`grid gap-5 ${columnsClass} ${className ?? ""}`.trim()}
    >
      {children}
    </div>
  )
}
