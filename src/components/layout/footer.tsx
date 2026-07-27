import Link from "next/link";
import { Heart, Phone } from "lucide-react";

import { BrandLogo } from "@/components/layout/logo";
import { SocialIcons } from "@/components/social/social-icons";
import type { AboutData } from "@/lib/types";

export function Footer({ about }: { about: AboutData }) {
  const primaryPhone = about.phone[0];
  const footerLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "عن شغبطه", href: "/about" },
    { label: "القصص القصيرة", href: "/stories" },
    { label: "الروايات والكتب", href: "/novels-books" },
    { label: "احجز جلستك", href: "/contact" },
  ];

  return (
    <footer className="mt-20 px-4 pb-6 sm:px-6 lg:px-8">
      <div className="surface-card mx-auto max-w-7xl overflow-hidden">
        <div className="grid gap-8 px-6 py-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-10 lg:py-12">
          <div className="space-y-5 text-right">
            <span className="pill-badge">مساحة نفسية وأدبية أكثر قربًا</span>
            <h2 className="text-3xl font-black text-slate-900">شغبطه</h2>
            <p className="max-w-xl text-sm leading-8 text-[var(--text-muted)]">
            بقلم د. هبة اللكاوي طبيب أخصائي الطب النفسي وتعديل السلوك ، روائية وكاتبة ، معدة
            وحكاءة
            </p>
            <div className="flex justify-end lg:justify-start">
              <BrandLogo variant="footer" />
            </div>
          </div>

          <div className="space-y-4 text-right">
            <h3 className="text-lg font-bold text-slate-900">روابط سريعة</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-[var(--border)] bg-white/70 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[var(--border-strong)] hover:text-[var(--accent)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-5 text-right">
            <h3 className="text-lg font-bold text-slate-900">تواصلي معنا</h3>
            <SocialIcons about={about} />
            {primaryPhone ? (
              <div className="flex justify-end lg:justify-start">
                <Link
                  href={`tel:${primaryPhone}`}
                  className="secondary-button"
                >
                  <Phone className="size-4" />
                  <span>{primaryPhone}</span>
                </Link>
              </div>
            ) : null}
            {about.mail ? (
              <p className="text-sm text-[var(--text-muted)]">{about.mail}</p>
            ) : null}
          </div>
        </div>

        <div className="border-t border-[var(--border)] bg-white/60 px-6 py-4 text-center text-sm text-[var(--text-muted)]">
          <span className="inline-flex flex-wrap items-center justify-center gap-2" dir="ltr">
            <span>shaghbatta.com © {new Date().getFullYear()}, designed and developed with</span>
            <Heart className="size-4 text-[#ff6a5d]" />
            <Link
              href="https://ahmedibrahim.ninja/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#ff6a5d]"
            >
              @ahmedIbrahim
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
