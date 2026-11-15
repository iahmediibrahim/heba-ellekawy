import type { Metadata } from "next";
import { Download } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { CardMedia } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Prose } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { getNovels } from "@/lib/contentful";
import { brand } from "@/lib/brand";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "الروايات والكتب",
  keywords: ["الروايات والكتب", "روايات", "PDF"],
  path: "/novels-books",
});

export default async function NovelsBooksPage() {
  const novels = await getNovels();
  const inShop = novels.filter((novel) => novel.inShop);
  const electronic = novels.filter((novel) => !novel.inShop);

  return (
    <div className="page-shell">
      <Section>
        <PageHeader
          eyebrow="الكتب والروايات"
          title="روايات حالية في الأسواق"
          align="center"
        />

        <div className="space-y-5">
          {inShop.map((novel) => (
            <article key={novel.id} className="surface-card p-5 lg:p-6">
              <div className="grid items-center gap-6 lg:grid-cols-[0.28fr_0.72fr]">
                <div className="flex justify-center">
                  <div className="relative aspect-[3/4] w-full max-w-[195px] overflow-hidden rounded-3xl bg-[var(--surface-muted)]">
                    {novel.heroImage ? (
                      <CardMedia
                        src={novel.heroImage.url}
                        alt={novel.title}
                        fill
                        sizes="195px"
                      />
                    ) : null}
                  </div>
                </div>
                <div className="space-y-4 text-center">
                  <h2 className="text-3xl font-bold text-slate-900">{novel.title}</h2>
                  <p className="text-sm text-[var(--text-muted)]">
                    <span>بقلم {novel.authorName ?? brand.name}</span>
                    {novel.publishedDate ? (
                      <span>{` / ${formatDate(novel.publishedDate)}`}</span>
                    ) : null}
                  </p>
                  <Prose
                    html={novel.shortBioHtml ?? `<p>${novel.shortBio ?? ""}</p>`}
                    className="mx-auto max-w-3xl text-base leading-9 text-[var(--text-muted)]"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="نسخ إلكترونية"
          title="روايات إلكترونية"
          copy="لقراءة الرواية قم بتحميل ملف الـ PDF"
          align="center"
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {electronic.map((novel) => (
            <article key={novel.id} className="surface-card p-5">
              <div className="grid items-center gap-6 md:grid-cols-[0.42fr_0.58fr]">
                <div className="flex justify-center">
                  <div className="relative aspect-[3/4] w-full max-w-[195px] overflow-hidden rounded-3xl bg-[var(--surface-muted)]">
                    {novel.heroImage ? (
                      <CardMedia
                        src={novel.heroImage.url}
                        alt={novel.title}
                        fill
                        sizes="195px"
                      />
                    ) : null}
                  </div>
                </div>
                <div className="space-y-4 text-center">
                  <h3 className="text-2xl font-bold text-slate-900">{novel.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    <span>بقلم {novel.authorName ?? brand.name}</span>
                    {novel.publishedDate ? (
                      <span>{` / ${formatDate(novel.publishedDate)}`}</span>
                    ) : null}
                  </p>
                  <p className="text-base leading-8 text-[var(--text-muted)]">{novel.shortBio}</p>
                  {novel.pdfUrl ? (
                    <div>
                      <ButtonLink
                        href={novel.pdfUrl}
                        variant="primary"
                        icon={<Download className="size-4" />}
                      >
                        PDF
                      </ButtonLink>
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
