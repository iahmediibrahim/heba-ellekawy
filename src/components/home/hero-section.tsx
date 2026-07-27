import Link from "next/link";
import { ArrowUpLeft, CirclePlay, Sparkles } from "lucide-react";

import type { AboutData, AuthorData } from "@/lib/types";

export function HeroSection({ about, author }: { about: AboutData; author?: AuthorData }) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="surface-card subtle-dot-grid flex flex-col justify-between overflow-hidden p-7 text-right sm:p-8 lg:p-10">
        <div className="space-y-6">
          <span className="pill-badge mr-auto">
            <Sparkles className="size-4" />
            مساحة عربية عن النفس والكتابة والحياة
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-black leading-[1.55] text-slate-950 lg:text-5xl">
              {about.title}
            </h1>
            <p className="max-w-2xl text-lg leading-9 text-[var(--text-muted)]">
              {about.description}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="surface-panel p-4">
              <p className="text-sm font-semibold text-[var(--accent)]">جلسات ومتابعة</p>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                تجربة أوضح للحجز والاستفسار والوصول السريع.
              </p>
            </div>
            <div className="surface-panel p-4">
              <p className="text-sm font-semibold text-[var(--accent)]">محتوى مقروء</p>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                مقالات وقصص وتجارب بصريًا أكثر هدوءًا وسهولة.
              </p>
            </div>
            <div className="surface-panel p-4">
              <p className="text-sm font-semibold text-[var(--accent)]">هوية دافئة</p>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                لمسة حديثة تحافظ على روح شغبطه وقربها من القارئ.
              </p>
            </div>
          </div>
          {author ? (
            <div className="surface-muted inline-flex max-w-max items-center gap-3 px-4 py-3">
              <span className="text-sm text-[var(--text-muted)]">
                بإشراف
              </span>
              <span className="font-semibold text-slate-900">
                {author.name}
                {author.title ? `، ${author.title}` : ""}
              </span>
            </div>
          ) : null}
        </div>

        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <Link href="/contact" className="primary-button">
            احجز جلستك
            <ArrowUpLeft className="size-4" />
          </Link>
          <Link href="/about" className="secondary-button">
            أعرف المزيد
          </Link>
        </div>
      </div>

      <div className="surface-card overflow-hidden p-4 sm:p-5">
        <div className="surface-panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 text-sm text-[var(--text-muted)]">
            <span>فيديو تعريفي</span>
            <span className="inline-flex items-center gap-2 font-semibold text-[var(--accent)]">
              <CirclePlay className="size-4" />
              شغبطه
            </span>
          </div>
          <div className="aspect-video w-full bg-[#120712]">
          <iframe
            className="h-full w-full"
            src="https://www.youtube-nocookie.com/embed/5OiIdgw-ZAI?autoplay=1&modestbranding=1&showinfo=0&rel=0&cc_load_policy=1&iv_load_policy=3&theme=light&fs=0&controls=0"
            title="عن شغبطه"
            allow="autoplay; encrypted-media"
          />
        </div>
        </div>
      </div>
    </section>
  );
}
