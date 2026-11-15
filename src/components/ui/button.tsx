import Link from "next/link"
import type { ReactNode } from "react"

/**
 * كل أزرار الموقع من مكان واحد، عشان ما يتكرر نفس الكود
 * ولا يتغير شكل زر في مكان ويبقى مختلف في مكان تاني.
 */
export type ButtonVariant =
  "primary" | "secondary" | "onBrand" | "onBrandFlat" | "outlineOnBrand"

export type ButtonSize = "sm" | "md" | "lg"

const variantClasses: Record<ButtonVariant, string> = {
  primary: "primary-button",
  secondary: "secondary-button",
  onBrand:
    "inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--accent-strong)] shadow-lg transition hover:-translate-y-0.5",
  onBrandFlat:
    "inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--accent-strong)] transition hover:-translate-y-0.5",
  outlineOnBrand:
    "inline-flex items-center justify-center gap-2 rounded-full border border-white/45 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/15",
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "",
}

export function ButtonLink({
  href,
  variant = "primary",
  size,
  icon,
  iconPosition = "start",
  children,
  className,
  external = false,
}: {
  href: string
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  iconPosition?: "start" | "end"
  children: ReactNode
  className?: string
  external?: boolean
}) {
  const classes = [
    variantClasses[variant],
    size ? sizeClasses[size] : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ")

  const content =
    iconPosition === "end" ? (
      <>
        {children}
        {icon}
      </>
    ) : (
      <>
        {icon}
        {children}
      </>
    )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}
