import type { Metadata } from "next";

import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { getAboutData } from "@/lib/contentful";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "للتواصل معنا وحجز الجلسات او الاستفسار",
  description: "Contact us to request a quote!",
  keywords: ["التواصل", "الحجز", "الاستفسار"],
});

export default async function ContactPage() {
  const about = await getAboutData();

  return (
    <div className="page-shell">
      <div className="section-heading" data-align="center">
        <p className="eyebrow">احجز الآن</p>
        <h1 className="section-title">للتواصل معنا وحجز الجلسات او الاستفسار</h1>
      </div>
      <div className="surface-card grid gap-6 p-6 lg:grid-cols-2 lg:p-8">
        <section>
          <ContactDetails about={about} />
        </section>
        <section className="surface-muted p-6">
          <div className="mb-6 text-right">
            <h2 className="text-2xl font-bold text-slate-900">للاستفسار يمكنك تعبئة النموذج وارساله.</h2>
          </div>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
