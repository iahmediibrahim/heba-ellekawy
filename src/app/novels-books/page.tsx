import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";

import { getNovels } from "@/lib/contentful";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "الروايات والكتب",
  keywords: ["الروايات والكتب", "روايات", "PDF"],
});

export default async function NovelsBooksPage() {
  const novels = await getNovels();
  const inShop = novels.filter((novel) => novel.inShop);
  const electronic = novels.filter((novel) => !novel.inShop);

  return (
    <div className="page-shell">
      <section className="section-stack">
        <div className="section-heading" data-align="center">
          <p className="eyebrow">الكتب والروايات</p>
          <h1 className="section-title">روايات حاليه ف الاسواق</h1>
        </div>
        <div className="space-y-5">
          {inShop.map((novel) => (
            <article key={novel.id} className="surface-card p-5 lg:p-6">
              <div className="grid items-center gap-6 lg:grid-cols-[0.28fr_0.72fr]">
                <div className="flex justify-center">
                  <div className="relative aspect-[3/4] w-full max-w-[195px] overflow-hidden rounded-3xl bg-[#f6ecef]">
                    {novel.heroImage ? (
                      <Image
                        src={novel.heroImage.url}
                        alt={novel.title}
                        fill
                        className="object-cover"
                        sizes="195px"
                      />
                    ) : null}
                  </div>
                </div>
                <div className="space-y-4 text-center">
                  <h2 className="text-3xl font-bold text-slate-900">{novel.title}</h2>
                  <p className="text-sm text-[var(--text-muted)]">
                    <span>by {novel.authorName ?? "شغبطه"}</span>
                    {novel.publishedDate ? <span>{` / ${novel.publishedDate}`}</span> : null}
                  </p>
                  <div
                    className="content-html mx-auto max-w-3xl text-base leading-9 text-[var(--text-muted)]"
                    dangerouslySetInnerHTML={{ __html: novel.shortBioHtml ?? `<p>${novel.shortBio ?? ""}</p>` }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-stack">
        <div className="section-heading" data-align="center">
          <p className="eyebrow">نسخ إلكترونية</p>
          <h2 className="section-title">روايات الكترونيه</h2>
          <p className="section-copy">لقراءة الرواية قم بتحميل ملف الـ PDF</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {electronic.map((novel) => (
            <article key={novel.id} className="surface-card p-5">
              <div className="grid items-center gap-6 md:grid-cols-[0.42fr_0.58fr]">
                <div className="flex justify-center">
                  <div className="relative aspect-[3/4] w-full max-w-[195px] overflow-hidden rounded-3xl bg-[#f6ecef]">
                    {novel.heroImage ? (
                      <Image
                        src={novel.heroImage.url}
                        alt={novel.title}
                        fill
                        className="object-cover"
                        sizes="195px"
                      />
                    ) : null}
                  </div>
                </div>
                <div className="space-y-4 text-center">
                  <h3 className="text-2xl font-bold text-slate-900">{novel.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    <span>by {novel.authorName ?? "شغبطه"}</span>
                    {novel.publishedDate ? <span>{` / ${novel.publishedDate}`}</span> : null}
                  </p>
                  <p className="text-base leading-8 text-[var(--text-muted)]">{novel.shortBio}</p>
                  {novel.pdfUrl ? (
                    <div>
                      <Link href={novel.pdfUrl} className="primary-button">
                        <Download className="size-4" />
                        PDF
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
