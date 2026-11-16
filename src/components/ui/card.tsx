import Image from "next/image"
import type { ElementType, ReactNode } from "react"

/**
 * بطاقات الموقع: نفس الأسطح والظلال المستخدمة في كل مكان.
 */
export function Card({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode
  className?: string
  as?: ElementType
}) {
  return <Tag className={`surface-card ${className ?? ""}`.trim()}>{children}</Tag>
}

export function CardMuted({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode
  className?: string
  as?: ElementType
}) {
  return <Tag className={`surface-muted ${className ?? ""}`.trim()}>{children}</Tag>
}

export function CardMedia({
  src,
  alt,
  sizes,
  className,
  ratio = "aspect-[16/10]",
  priority = false,
  fill = false,
  quality,
}: {
  src?: string
  alt: string
  sizes?: string
  className?: string
  ratio?: string
  priority?: boolean
  quality?: number
  /** يملأ الحاوية الأب بدل ما يحدد ارتفاعه بنفسه */
  fill?: boolean
}) {
  const wrapper = fill
    ? "absolute inset-0"
    : `relative ${ratio} overflow-hidden bg-[var(--surface-muted)]`

  return (
    <div className={`${wrapper} ${className ?? ""}`.trim()}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          loading={priority ? "eager" : "lazy"}
          quality={quality}
          sizes={sizes}
          className="object-cover"
        />
      ) : null}
    </div>
  )
}

export function CardBody({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={className}>{children}</div>
}
