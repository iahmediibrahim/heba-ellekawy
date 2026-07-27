import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";

import type { Story } from "@/lib/types";

export function StoriesStrip({ stories }: { stories: Story[] }) {
  return (
    <section className="section-stack">
      <div className="flex items-center justify-between gap-4">
        <Link href="/stories" className="secondary-button">
          عرض كل القصص
        </Link>
        <div className="section-heading">
          <p className="eyebrow">قصص قصيرة</p>
          <h2 className="section-title !text-3xl">القصص القصيرة</h2>
          <p className="section-copy text-sm">لقراءة القصة قم بتحميل ملف الـ PDF</p>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {stories.map((story) => (
          <article key={story.id} className="surface-card p-5">
            <div className="grid items-center gap-4 md:grid-cols-[1fr_auto]">
              <div className="order-2 text-right md:order-1">
                <div className="mb-3 flex items-center justify-end gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{story.title}</h3>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      <span>by {story.authorName ?? "شغبطه"}</span>
                      {story.publishedDate ? <span>{` / ${story.publishedDate}`}</span> : null}
                    </p>
                  </div>
                  <div className="relative size-20 overflow-hidden rounded-2xl bg-[#f6ecef]">
                    {story.heroImage ? (
                      <Image
                        src={story.heroImage.url}
                        alt={story.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : null}
                  </div>
                </div>
                <p className="text-base leading-8 text-[var(--text-muted)]">{story.shortBio}</p>
              </div>
              {story.pdfUrl ? (
                <div className="order-1 flex justify-start md:order-2 md:justify-center">
                  <Link href={story.pdfUrl} className="primary-button">
                    <Download className="size-4" />
                    PDF
                  </Link>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
