import Image from "next/image"
import Link from "next/link"

type LogoVariant = "mark" | "horizontal" | "stacked" | "wordmark"

type LogoConfig = {
  src: string
  width: number
  height: number
  alt: string
}

const logoAssets: Record<LogoVariant, LogoConfig> = {
  mark: {
    src: "/brand/symbol.jpeg",
    width: 460,
    height: 460,
    alt: "شعار د. هبة اللكاوي",
  },
  horizontal: {
    src: "/brand/logo.jpeg",
    width: 1774,
    height: 887,
    alt: "د. هبة اللكاوي - طبيبة الطب النفسي والعلاج النفسي",
  },
  stacked: {
    src: "/brand/logo.jpeg",
    width: 1774,
    height: 887,
    alt: "د. هبة اللكاوي - طبيبة الطب النفسي والعلاج النفسي",
  },
  wordmark: {
    src: "/brand/logo.jpeg",
    width: 1774,
    height: 887,
    alt: "د. هبة اللكاوي - طبيبة الطب النفسي والعلاج النفسي",
  },
}

export function BrandLogo({
  variant = "mark",
  href = "/",
  className,
  sizes,
  priority = false,
}: {
  variant?: LogoVariant
  href?: string
  className?: string
  sizes: string
  priority?: boolean
}) {
  const config = logoAssets[variant]

  return (
    <Link
      href={href}
      aria-label={config.alt}
      className={`flex items-center justify-center overflow-hidden ${className ?? ""}`}
    >
      <Image
        priority={priority}
        src={config.src}
        alt={config.alt}
        width={config.width}
        height={config.height}
        sizes={sizes}
        className={
          variant === "mark" ? "h-auto w-full" : "h-16 w-full object-cover"
        }
      />
    </Link>
  )
}
