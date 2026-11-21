import { LuArrowLeft } from "react-icons/lu"

import { ButtonLink } from "@/components/ui/button"

export function HomeFounder({
  description,
  name,
}: {
  description: string
  name: string
}) {
  return (
    <section className="flex flex-col items-center gap-4 text-center">
      <div className="flex items-center justify-center gap-5">
        <span aria-hidden="true" className="h-px w-16 bg-[var(--border-strong)]" />
        <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">عني</h2>
        <span aria-hidden="true" className="h-px w-16 bg-[var(--border-strong)]" />
      </div>
      <h4 className="text-xl mt-4 font-bold text-[var(--text)] sm:text-lg">{name}</h4>
      <p className="max-w-3xl text-sm leading-8 text-slate-700 sm:text-base" dir="rtl">
        {description}
      </p>
      <ButtonLink
        href="/author"
        variant="secondary"
        icon={<LuArrowLeft className="size-4" aria-hidden="true" />}
        iconPosition="end"
        className="!rounded-md !bg-transparent px-8 py-2 shadow-none"
      >
        المزيد عنّي
      </ButtonLink>
    </section>
  )
}
