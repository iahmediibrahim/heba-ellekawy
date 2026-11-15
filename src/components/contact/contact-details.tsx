import Link from "next/link";
import { Mail, MapPin, MessageCircleMore, Phone } from "lucide-react";

import { SocialIcons } from "@/components/social/social-icons";
import type { AboutData } from "@/lib/types";

export function ContactDetails({ about }: { about: AboutData }) {
  const whatsappNumbers = Array.isArray(about.whatsapp)
    ? about.whatsapp
    : about.whatsapp
      ? [about.whatsapp]
      : []

  return (
    <div className="space-y-6 p-1 sm:p-2">
      <div>
        <div className="mb-5 space-y-2 text-right">
          <p className="eyebrow">تواصل مباشر</p>
          <h2 className="text-2xl font-bold text-slate-900">طرق التواصل المباشر</h2>
          <p className="text-sm leading-7 text-[var(--text-muted)]">
            تتوفر الوسائل التالية للتواصل المباشر.
          </p>
        </div>
        <div className="surface-muted divide-y divide-[var(--border)] px-4">
          {about.phone.length ? (
            <div className="flex flex-wrap items-center justify-between gap-3 py-4">
              <h3 className="font-semibold text-[var(--accent)]">اتصال هاتفي</h3>
              <div className="flex flex-wrap justify-end gap-3">
                {about.phone.map((phone) => (
                  <Link
                    key={phone}
                    href={`tel:${phone}`}
                    className="secondary-button"
                    dir="ltr"
                  >
                    <Phone className="size-4" />
                    <span>{phone}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {whatsappNumbers.length ? (
            <div className="flex flex-wrap items-center justify-between gap-3 py-4">
              <h3 className="font-semibold text-[var(--accent)]">واتساب</h3>
              <div className="flex flex-wrap justify-end gap-3">
                {whatsappNumbers.map((whatsapp) => (
                  <Link
                    key={whatsapp}
                    href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="secondary-button"
                    dir="ltr"
                  >
                    <MessageCircleMore className="size-4" />
                    <span>{whatsapp}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {about.mail ? (
            <div className="flex flex-wrap items-center justify-between gap-3 py-4">
              <h3 className="font-semibold text-[var(--accent)]">البريد الإلكتروني</h3>
              <div className="flex justify-end">
                <Link
                  href={`mailto:${about.mail}`}
                  className="secondary-button"
                  dir="ltr"
                >
                  <Mail className="size-4" />
                  <span>{about.mail}</span>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-right text-xl font-bold text-slate-900">منصات التواصل الاجتماعي</h3>
        <div className="surface-panel p-4">
          <SocialIcons about={about} />
        </div>
      </div>

      <div className="surface-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <MapPin className="size-5 text-[var(--accent)]" />
          <h3 className="text-right font-semibold text-slate-900">موقع العيادة</h3>
        </div>
        <iframe
          title="موقع العيادة على خرائط Google"
          loading="lazy"
          className="block h-56 w-full sm:h-64"
          src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d856.7998892388964!2d31.00251357924195!3d30.797037600841673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e2!4m3!3m2!1d30.797036199999997!2d31.003053899999998!4m3!3m2!1d30.797036199999997!2d31.0030537!5e0!3m2!1sen!2sus!4v1593282988913!5m2!1sen!2sus"
        />
      </div>
    </div>
  );
}
