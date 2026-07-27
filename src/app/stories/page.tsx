import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";

import { getStories } from "@/lib/contentful";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "القصص القصيرة",
  keywords: ["قصص قصيرة", "PDF", "شغبطه"],
});

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="page-shell">
      <div className="section-heading" data-align="center">
        <p className="eyebrow">قصص قصيرة</p>
        <h1 className="section-title">القصص القصيرة</h1>
        <p className="section-copy">لقراءة القصة قم بتحميل ملف الـ PDF</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {stories.map((story) => (
          <article key={story.id} className="surface-card p-5">
            <div className="grid items-center gap-4 md:grid-cols-[1fr_auto]">
              <div className="space-y-4 text-right">
                <div className="flex items-center justify-end gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{story.title}</h2>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">
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
                <div className="flex justify-start md:justify-center">
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
    </div>
  );
}
