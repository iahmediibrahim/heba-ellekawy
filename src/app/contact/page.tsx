import type { Metadata } from "next"

import { ContactDetails } from "@/components/contact/contact-details"
import { ContactForm } from "@/components/contact/contact-form"
import { Section } from "@/components/ui/section"
import { getAboutData } from "@/lib/contentful"
import { buildMetadata } from "@/lib/metadata"

export const metadata: Metadata = buildMetadata({
  title: "التواصل وحجز الجلسات",
  description:
    "للتواصل مع د. هبة اللكاوي وحجز الجلسات أو الاستفسار عن الخدمات النفسية وورش الكتابة.",
  keywords: ["التواصل", "الحجز", "الاستفسار", "جلسات"],
  path: "/contact",
})

export default async function ContactPage() {
  const about = await getAboutData()

  return (
    <div className="page-shell">
      <Section className="gap-0">
        <div className="surface-card grid overflow-hidden lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <aside className="surface-muted order-2 flex flex-col gap-8 border-0 p-6 sm:p-8 lg:order-1 lg:p-10">
            <div className="space-y-4">
              <p className="text-sm font-bold tracking-wide text-[var(--text-muted)]">
                مساحة للتواصل
              </p>
              <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                التواصل وحجز الجلسات
              </h1>
              <p className="max-w-md text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                للاستفسار عن الخدمات أو ترتيب الجلسات، يمكن إرسال رسالة أو اختيار وسيلة
                التواصل المناسبة.
              </p>
            </div>

            <div aria-hidden="true" className="h-px bg-[var(--border)]" />
            <ContactDetails about={about} />
          </aside>

          <section className="order-1 space-y-7 p-5 text-right sm:p-8 lg:order-2 lg:p-10">
            <div className="space-y-2">
              <p className="eyebrow">نموذج التواصل</p>
              <h2 className="text-2xl font-bold text-slate-900">إرسال استفسار</h2>
              <p className="text-sm leading-7 text-[var(--text-muted)]">
                يرجى تعبئة البيانات التالية لإرسال الاستفسار.
              </p>
            </div>
            <ContactForm />
          </section>
        </div>
      </Section>
    </div>
  )
}
