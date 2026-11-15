import type { Metadata } from "next";

import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { getAboutData } from "@/lib/contentful";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "تواصلي معنا واحجز جلستك",
  description:
    "للتواصل مع د. هبة اللكاوي وحجز الجلسات أو الاستفسار عن الخدمات النفسية وورش الكتابة.",
  keywords: ["التواصل", "الحجز", "الاستفسار", "جلسات"],
  path: "/contact",
});

export default async function ContactPage() {
  const about = await getAboutData();

  return (
    <div className="page-shell">
      <Section>
        <PageHeader
          eyebrow="احجز الآن"
          title="للتواصل معنا وحجز الجلسات أو الاستفسار"
          copy="للاستفسار عن الخدمات أو ترتيب الجلسات، تتوفر عدة وسائل للتواصل."
        />

        <div className="surface-card grid items-start gap-6 p-4 sm:p-6 lg:grid-cols-2 lg:gap-8 lg:p-8">
          <section className="surface-muted p-5 sm:p-6">
            <div className="mb-6 space-y-2 text-right">
              <h2 className="text-2xl font-bold text-slate-900">نموذج الاستفسار</h2>
              <p className="text-sm leading-7 text-[var(--text-muted)]">
                يرجى تعبئة البيانات التالية لإرسال الاستفسار.
              </p>
            </div>
            <ContactForm />
          </section>
          <section>
            <ContactDetails about={about} />
          </section>
        </div>
      </Section>
    </div>
  );
}
