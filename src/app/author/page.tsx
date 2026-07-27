import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Facebook } from "lucide-react";

import { LatestArticles } from "@/components/articles/latest-articles";
import { getAuthorData, getLatestArticles } from "@/lib/contentful";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const author = await getAuthorData();

  return buildMetadata({
    title: author ? `${author.name} ${author.title ? `- ${author.title}` : ""}` : "عن المؤسس",
    description: author?.shortBio,
    keywords: ["عن المؤسس", "هبة اللكاوي", "شغبطه"],
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
    <div className="page-shell grid lg:grid-cols-[1.35fr_0.65fr]">
      <section className="surface-card p-6 lg:p-8">
        <div className="space-y-6">
          <div className="space-y-4 text-right">
            <h1 className="text-4xl font-black text-slate-900">
              {author.name}
              {author.who ? <span className="pill-badge mr-3 px-4 py-2 text-base">{author.who}</span> : null}
            </h1>
            {author.title ? <p className="text-lg text-[var(--text-muted)]">{author.title}</p> : null}
            <div
              className="content-html max-w-3xl text-right text-base leading-9 text-slate-600"
              dangerouslySetInnerHTML={{ __html: author.shortBioHtml ?? `<p>${author.shortBio}</p>` }}
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-4xl bg-[#f6ecef]">
                {author.image ? (
                  <Image
                    src={author.image.url}
                    alt={author.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 28vw, 100vw"
                  />
                ) : null}
              </div>
              {author.facebook ? (
                <div className="flex justify-center">
                  <Link
                    href={author.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="secondary-button bg-[#1877f2]/10 text-[#1877f2]"
                  >
                    <Facebook className="size-4" />
                    Facebook
                  </Link>
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
      </section>

      <aside className="space-y-6">
        <LatestArticles articles={latestArticles} />
      </aside>
    </div>
  );
}
