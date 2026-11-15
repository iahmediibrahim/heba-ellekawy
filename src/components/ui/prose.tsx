import type { ReactNode } from "react"

/**
 * المحتوى الطويل (مقال / سيرة) بنفس تنسيق `.content-html`.
 */
export function Prose({
  html,
  className,
  dir = "rtl",
}: {
  html: string
  className?: string
  dir?: "rtl" | "ltr"
}) {
  return (
    <div
      dir={dir}
      className={`content-html ${className ?? ""}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
