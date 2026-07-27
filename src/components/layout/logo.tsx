import Image from "next/image"
import Link from "next/link"

type LogoVariant = "small" | "large" | "footer"

const logoConfig: Record<
  LogoVariant,
  { src: string; width: number; height: number; alt: string }
> = {
  small: {
    src: "/images/shaghbatta-logo.png",
    width: 50,
    height: 50,
    alt: "شعار شغبطه",
  },
  large: {
    src: "/images/shaghbatta-logo.png",
    width: 82,
    height: 82,
    alt: "شعار شغبطه",
  },
  footer: {
    src: "/images/shaghbatta-logo-horizontal.png",
    width: 220,
    height: 80,
    alt: "شعار شغبطه الأفقي",
  },
}

export function BrandLogo({
  variant = "small",
  href = "/",
}: {
  variant?: LogoVariant
  href?: string
}) {
  const config = logoConfig[variant]

  return (
    <Link href={href} className="inline-flex items-center justify-center">
      <Image
        priority
        src={config.src}
        alt={config.alt}
        width={config.width}
        height={config.height}
        style={
          variant === "footer" ? { width: "220px", height: "auto" } : undefined
        }
      />
    </Link>
  )
}
