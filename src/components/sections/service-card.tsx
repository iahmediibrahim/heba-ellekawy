import Image from "next/image"
import Link from "next/link"
import { Brain } from "lucide-react"

import type { Service } from "@/lib/types"

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="surface-card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-muted)]">
        {service.icon ? (
          <Image
            src={service.icon.url}
            alt={service.name}
            fill
            sizes="(min-width: 1280px) 24vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[var(--brand-gradient)]">
            <Brain className="size-10 text-white/90" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 p-5 text-right">
        <h3 className="text-base font-bold leading-8 text-slate-900">{service.name}</h3>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--accent)] transition hover:gap-2.5"
        >
          للاستفسار والحجز
          <span aria-hidden="true">←</span>
        </Link>
      </div>
    </article>
  )
}
