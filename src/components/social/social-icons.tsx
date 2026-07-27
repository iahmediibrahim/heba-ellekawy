import { Facebook, Instagram, MessageCircleMore, Music4 } from "lucide-react"
import Image from "next/image"
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
      icon: <Facebook className="size-5" />,
      className:
        "bg-[#1877f2]/10 text-[#1877f2] hover:bg-[#1877f2] hover:text-white",
    },
    {
      href: about.instagram,
      label: "Instagram",
      icon: <Instagram className="size-5" />,
      className:
        "bg-[#e1306c]/10 text-[#e1306c] hover:bg-[#e1306c] hover:text-white",
    },
    {
      href: whatsapp ? `https://wa.me/${whatsapp}` : undefined,
      label: "WhatsApp",
      icon: <MessageCircleMore className="size-5" />,
      className:
        "bg-[#25d366]/10 text-[#25d366] hover:bg-[#25d366] hover:text-white",
    },
    {
      href: about.soundcloud,
      label: "SoundCloud",
      icon: <Music4 className="size-5" />,
      className:
        "bg-[#ff5500]/10 text-[#ff5500] hover:bg-[#ff5500] hover:text-white",
    },
  ].filter(item => item.href)

  return (
    <ul className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
      {items.map(item => (
        <li key={item.label}>
          <Link
            href={item.href!}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            className={`inline-flex size-11 items-center justify-center rounded-full border border-white/60 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${item.className}`}
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
            className="inline-flex h-11 min-w-20 items-center justify-center rounded-full border border-[var(--border)] bg-white/85 px-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Image
              src="/images/askfm.png"
              alt="Ask.fm"
              width={70}
              height={20}
              style={{ width: "auto", height: "20px" }}
            />
          </Link>
        </li>
      ) : null}
    </ul>
  )
}
