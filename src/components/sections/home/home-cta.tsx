import { LuCalendarDays } from "react-icons/lu"

import { ButtonLink } from "@/components/ui/button"

export function HomeCta() {
  return (
    <section className="flex flex-col items-center gap-3 text-center">
      <LuCalendarDays className="size-8 text-slate-900" aria-hidden="true" />
      <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">حجز الجلسات</h2>
      <p className="text-sm leading-7 text-[var(--text-muted)] sm:text-base">
        لحجز جلسة نفسية أو للاستفسار عن المواعيد المتاحة.
      </p>
      <ButtonLink
        href="/contact"
        variant="primary"
        className="!min-w-40 !rounded-md !bg-black px-10 py-3 shadow-none hover:!shadow-none"
      >
        احجز جلسة
      </ButtonLink>
    </section>
  )
}
