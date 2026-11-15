import { Facebook, Instagram, MessageCircleMore, Music4 } from "lucide-react"
import Link from "next/link"

import type { AboutData } from "@/lib/types"

function normalizeWhatsapp(value: string | string[] | undefined) {
  const phone = Array.isArray(value) ? value[0] : value
  return phone ? phone.replace(/\D/g, "") : undefined
}

export function SocialIcons({ about }: { about: AboutData }) {
  const whatsapp = normalizeWhatsapp(about.whatsapp)

  const items = [
    {
      href: about.facebook,
      label: "Facebook",
      icon: <Facebook className="size-4" />,
      className: "hover:border-[#1877f2] hover:text-[#1877f2]",
    },
    {
      href: about.instagram,
      label: "Instagram",
      icon: <Instagram className="size-4" />,
      className: "hover:border-[#e1306c] hover:text-[#e1306c]",
    },
    {
      href: whatsapp ? `https://wa.me/${whatsapp}` : undefined,
      label: "WhatsApp",
      icon: <MessageCircleMore className="size-4" />,
      className: "hover:border-[#25d366] hover:text-[#25d366]",
    },
    {
      href: about.soundcloud,
      label: "SoundCloud",
      icon: <Music4 className="size-4" />,
      className: "hover:border-[#ff5500] hover:text-[#ff5500]",
    },
  ].filter(item => item.href)

  return (
    <ul className="flex flex-wrap items-center gap-2">
      {items.map(item => (
        <li key={item.label}>
          <Link
            href={item.href!}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            className={`inline-flex size-9 items-center justify-center rounded-full border border-[var(--border)] text-slate-500 transition ${item.className}`}
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
            className="inline-flex h-9 items-center justify-center rounded-full border border-[var(--border)] px-3 text-xs font-bold text-slate-500 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Ask.fm
          </Link>
        </li>
      ) : null}
    </ul>
  )
}
