import Link from "next/link"
import { FaFacebookF, FaInstagram, FaSoundcloud, FaWhatsapp } from "react-icons/fa6"

import type { AboutData } from "@/lib/types"

function normalizeWhatsapp(value: string | string[] | undefined) {
  const phone = Array.isArray(value) ? value[0] : value
  return phone ? phone.replace(/\D/g, "") : undefined
}

export function SocialIcons({
  about,
  variant = "default",
  label,
  className,
}: {
  about: AboutData
  variant?: "default" | "on-brand"
  label?: string
  className?: string
}) {
  const whatsapp = normalizeWhatsapp(about.whatsapp)

  const items = [
    {
      href: about.facebook,
      label: "Facebook",
      icon: <FaFacebookF className="size-4" aria-hidden="true" />,
      className: "hover:border-[#1877f2] hover:text-[#1877f2]",
    },
    {
      href: about.instagram,
      label: "Instagram",
      icon: <FaInstagram className="size-4" aria-hidden="true" />,
      className: "hover:border-[#e1306c] hover:text-[#e1306c]",
    },
    {
      href: whatsapp ? `https://wa.me/${whatsapp}` : undefined,
      label: "WhatsApp",
      icon: <FaWhatsapp className="size-4" aria-hidden="true" />,
      className: "hover:border-[#25d366] hover:text-[#25d366]",
    },
    {
      href: about.soundcloud,
      label: "SoundCloud",
      icon: <FaSoundcloud className="size-4" aria-hidden="true" />,
      className: "hover:border-[#ff5500] hover:text-[#ff5500]",
    },
  ].filter((item) => item.href)
  const hasAskFm = Boolean(about.askfm)

  if (!items.length && !hasAskFm) {
    return null
  }

  const baseClassName =
    variant === "on-brand"
      ? "border-white/25 text-white/85"
      : "border-[var(--border)] text-slate-500"

  const list = (
    <ul className="flex flex-wrap items-center gap-2">
      {items.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href!}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            className={`inline-flex size-9 items-center justify-center rounded-full border transition ${baseClassName} ${item.className}`}
          >
            {item.icon}
          </Link>
        </li>
      ))}
      {about.askfm ? (
        <li>
          <Link
            href={about.askfm}
            target="_blank"
            rel="noreferrer"
            aria-label="Ask.fm"
            className={`inline-flex h-9 items-center justify-center rounded-full border px-3 text-xs font-bold transition ${
              variant === "on-brand"
                ? "border-white/25 text-white/85 hover:border-white hover:text-white"
                : "border-[var(--border)] text-slate-500 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }`}
          >
            Ask.fm
          </Link>
        </li>
      ) : null}
    </ul>
  )

  return label ? (
    <nav aria-label={label} className={className}>
      {list}
    </nav>
  ) : (
    list
  )
}
