import type { Metadata } from "next";
import { Facebook } from "lucide-react";

import { LatestArticles } from "@/components/articles/latest-articles";
import { ButtonLink } from "@/components/ui/button";
import { CardMedia } from "@/components/ui/card";
import { ContentLayout } from "@/components/ui/content-layout";
import { Prose } from "@/components/ui/prose";
import { getAuthorData, getLatestArticles } from "@/lib/contentful";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const author = await getAuthorData();

  return buildMetadata({
    title: author ? `${author.name} ${author.title ? `- ${author.title}` : ""}` : "عن المؤسس",
    description: author?.shortBio,
    keywords: ["عن المؤسس", "السيرة الذاتية", "د. هبة اللكاوي"],
    path: "/author",
    image: author?.image
      ? {
          src: author.image.url,
          width: author.image.width,
          height: author.image.height,
        }
      : undefined,
  });
}

export default async function AuthorPage() {
  const [author, latestArticles] = await Promise.all([getAuthorData(), getLatestArticles(5)]);

  if (!author) {
    return null;
  }

  return (
    <ContentLayout
      aside={<LatestArticles articles={latestArticles} />}
    >
      <div className="space-y-6">
        <div className="space-y-4 text-right">
          <h1 className="text-4xl font-black text-slate-900">
            {author.name}
            {author.who ? (
              <span className="pill-badge mr-3 px-4 py-2 text-base">{author.who}</span>
            ) : null}
          </h1>
          {author.title ? (
            <p className="text-lg text-[var(--text-muted)]">{author.title}</p>
          ) : null}
          <Prose
            html={author.shortBioHtml ?? `<p>${author.shortBio}</p>`}
            className="max-w-3xl text-right text-base leading-9 text-slate-600"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-4xl bg-[var(--surface-muted)]">
              {author.image ? (
                <CardMedia
                  src={author.image.url}
                  alt={author.name}
                  fill
                  sizes="(min-width: 1024px) 28vw, 100vw"
                />
              ) : null}
            </div>
            {author.facebook ? (
              <div className="flex justify-center">
                <ButtonLink
                  href={author.facebook}
                  variant="secondary"
                  external
                  className="bg-[#1877f2]/10 text-[#1877f2]"
                  icon={<Facebook className="size-4" />}
                >
                  Facebook
                </ButtonLink>
              </div>
            ) : null}
          </div>

          <div className="space-y-6 text-right">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[var(--accent)]">المؤهلات</h2>
              <ul className="space-y-2 text-[var(--text-muted)]">
                {author.qualifications.map((item) => (
                  <li key={item}>• {item}.</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[var(--accent)]">الخبرات</h2>
              <ul className="space-y-2 text-[var(--text-muted)]">
                {author.experience.map((item) => (
                  <li key={item}>• {item}.</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[var(--accent)]">الإصدارات الكتابية</h2>
              <ul className="space-y-2 text-[var(--text-muted)]">
                {author.publications.map((item) => (
                  <li key={item}>• {item}.</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
