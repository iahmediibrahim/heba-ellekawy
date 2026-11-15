import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { CardMedia } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { getStories } from "@/lib/contentful";
import { brand } from "@/lib/brand";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "القصص القصيرة",
  keywords: ["قصص قصيرة", "تحميل PDF", "د. هبة اللكاوي"],
  path: "/stories",
});

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="page-shell">
      <Section>
        <PageHeader
          eyebrow="قصص قصيرة"
          title="القصص القصيرة"
          copy="لقراءة القصة قم بتحميل ملف الـ PDF"
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {stories.map((story) => (
            <article key={story.id} className="surface-card p-5">
              <div className="grid items-center gap-4 md:grid-cols-[1fr_auto]">
                <div className="space-y-4 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{story.title}</h2>
                      <p className="mt-2 text-sm text-[var(--text-muted)]">
                        <span>بقلم {story.authorName ?? brand.name}</span>
                        {story.publishedDate ? (
                          <span>{` / ${formatDate(story.publishedDate)}`}</span>
                        ) : null}
                      </p>
                    </div>
                    <div className="relative size-20 overflow-hidden rounded-2xl bg-[var(--surface-muted)]">
                      {story.heroImage ? (
                        <CardMedia
                          src={story.heroImage.url}
                          alt={story.title}
                          fill
                          sizes="80px"
                        />
                      ) : null}
                    </div>
                  </div>
                  <p className="text-base leading-8 text-[var(--text-muted)]">{story.shortBio}</p>
                </div>
                {story.pdfUrl ? (
                  <div className="flex justify-start md:justify-center">
                    <ButtonLink
                      href={story.pdfUrl}
                      variant="primary"
                      icon={<Download className="size-4" />}
                    >
                      PDF
                    </ButtonLink>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
