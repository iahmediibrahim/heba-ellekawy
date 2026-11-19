import Link from "next/link"
import { LuMail, LuMapPin, LuMessageCircle, LuPhone } from "react-icons/lu"

import { SocialIcons } from "@/components/social/social-icons"
import type { AboutData } from "@/lib/types"

export function ContactDetails({ about }: { about: AboutData }) {
  const whatsappNumbers = Array.isArray(about.whatsapp)
    ? about.whatsapp
    : about.whatsapp
      ? [about.whatsapp]
      : []
  const contactMethods = [
    ...(about.mail
      ? [
          {
            label: "البريد الإلكتروني",
            value: about.mail,
            href: `mailto:${about.mail}`,
            icon: LuMail,
            direction: "ltr" as const,
            external: false,
          },
        ]
      : []),
    ...about.phone.map((phone) => ({
      label: "هاتف",
      value: phone,
      href: `tel:${phone}`,
      icon: LuPhone,
      direction: "ltr" as const,
      external: false,
    })),
    ...whatsappNumbers.map((whatsapp) => ({
      label: "واتساب",
      value: whatsapp,
      href: `https://wa.me/${whatsapp.replace(/\D/g, "")}`,
      icon: LuMessageCircle,
      direction: "ltr" as const,
      external: true,
    })),
    {
      label: "الموقع",
      value: "عرض الموقع على الخريطة ↗",
      href: "https://maps.google.com/?q=30.7970362,31.0030537",
      icon: LuMapPin,
      direction: "rtl" as const,
      external: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
          تواصل مباشر
        </p>
        <h2 className="text-xl font-bold text-slate-900">وسائل الاتصال</h2>
      </div>

      <dl className="space-y-5">
        {contactMethods.map((method) => {
          const Icon = method.icon

          return (
            <div
              key={`${method.label}-${method.value}`}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="flex size-10 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)]"
              >
                <Icon className="size-4" />
              </span>
              <div className="min-w-0">
                <dt className="mb-1 text-xs font-medium text-[var(--text-muted)]">
                  {method.label}
                </dt>
                <dd className="min-w-0 text-left" dir={method.direction}>
                  <Link
                    href={method.href}
                    target={method.external ? "_blank" : undefined}
                    rel={method.external ? "noreferrer" : undefined}
                    className="break-all text-sm font-semibold text-slate-800 transition hover:text-[var(--accent)] sm:text-base"
                  >
                    {method.value}
                  </Link>
                </dd>
              </div>
            </div>
          )
        })}
      </dl>

      <SocialIcons
        about={about}
        variant="default"
        label="منصات التواصل الاجتماعي"
        className="border-t border-[var(--border)] pt-5"
      />
    </div>
  )
}
