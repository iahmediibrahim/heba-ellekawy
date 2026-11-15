import type { ReactNode } from "react"

/**
 * غلاف للأقسام: يضمن نفس التنسيق والمسافات في كل صفحة.
 */
export function Section({
  children,
  className,
  id,
  labelledBy,
}: {
  children: ReactNode
  className?: string
  id?: string
  labelledBy?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`section-stack ${className ?? ""}`.trim()}
    >
      {children}
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "right",
  level = 2,
  id,
  children,
}: {
  eyebrow?: string
  title: ReactNode
  copy?: string
  align?: "right" | "center"
  level?: 1 | 2 | 3
  id?: string
  children?: ReactNode
}) {
  const Heading = `h${level}` as "h1" | "h2" | "h3"

  return (
    <div className="section-heading" data-align={align}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Heading id={id} className="section-title">
        {title}
      </Heading>
      {copy ? <p className="section-copy">{copy}</p> : null}
      {children}
    </div>
  )
}
