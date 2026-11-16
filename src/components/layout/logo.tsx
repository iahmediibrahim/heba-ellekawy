import Image from "next/image"
import Link from "next/link"

type LogoVariant = "mark" | "horizontal" | "stacked" | "wordmark"
type LogoTone = "color" | "white"

type LogoConfig = {
  src: string
  width: number
  height: number
  alt: string
}

const logoAssets: Record<LogoVariant, Record<LogoTone, LogoConfig>> = {
  mark: {
    color: {
      src: "/brand/logo-mark.png",
      width: 512,
      height: 512,
      alt: "شعار د. هبة اللكاوي",
    },
    white: {
      src: "/brand/logo-mark-white.png",
      width: 512,
      height: 512,
      alt: "شعار د. هبة اللكاوي",
    },
  },
  horizontal: {
    color: {
      src: "/brand/logo-horizontal.png",
      width: 1200,
      height: 206,
      alt: "د. هبة اللكاوي - طبيبة الطب النفسي والعلاج النفسي",
    },
    white: {
      src: "/brand/logo-horizontal-white.png",
      width: 1200,
      height: 206,
      alt: "د. هبة اللكاوي - طبيبة الطب النفسي والعلاج النفسي",
    },
  },
  stacked: {
    color: {
      src: "/brand/logo-stacked.png",
      width: 700,
      height: 1050,
      alt: "د. هبة اللكاوي - طبيبة الطب النفسي والعلاج النفسي",
    },
    white: {
      src: "/brand/logo-stacked-white.png",
      width: 700,
      height: 1050,
      alt: "د. هبة اللكاوي - طبيبة الطب النفسي والعلاج النفسي",
    },
  },
  wordmark: {
    color: {
      src: "/brand/logo-wordmark.png",
      width: 1200,
      height: 262,
      alt: "د. هبة اللكاوي - طبيبة الطب النفسي والعلاج النفسي",
    },
    white: {
      src: "/brand/logo-wordmark-white.png",
      width: 1200,
      height: 262,
      alt: "د. هبة اللكاوي - طبيبة الطب النفسي والعلاج النفسي",
    },
  },
}

export function BrandLogo({
  variant = "mark",
  tone = "color",
  href = "/",
  className,
  sizes,
  priority = false,
}: {
  variant?: LogoVariant
  tone?: LogoTone
  href?: string
  className?: string
  sizes: string
  priority?: boolean
}) {
  const config = logoAssets[variant][tone]

  return (
    <Link
      href={href}
      aria-label={config.alt}
      className={` flex items-center justify-center ${className ?? ""}`}
    >
      <Image
        priority={priority}
        src={config.src}
        alt={config.alt}
        width={config.width}
        height={config.height}
        sizes={sizes}
        className="h-auto w-full"
      />
    </Link>
  )
}
