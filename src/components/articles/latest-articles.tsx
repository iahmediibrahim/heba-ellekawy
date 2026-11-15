import Image from "next/image";
import Link from "next/link";

import { brand } from "@/lib/brand";
import { formatDate } from "@/lib/format";
import type { BlogPost } from "@/lib/types";

export function LatestArticles({ articles }: { articles: BlogPost[] }) {
  return (
    <section className="surface-card p-6">
      <div className="mb-6 text-right">
        <p className="eyebrow">الأحدث</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">الكتابات الأخيرة</h2>
      </div>
      <div className="space-y-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.category}/${article.slug}`}
            className="surface-muted flex items-center gap-4 p-3 transition hover:-translate-y-0.5"
          >
            <div className="relative size-20 overflow-hidden rounded-2xl bg-[var(--surface-muted)]">
              {article.heroImage ? (
                <Image
                  src={article.heroImage.url}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : null}
            </div>
            <div className="flex-1 text-right">
              <h3 className="line-clamp-2 font-semibold text-slate-900">{article.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                <span>
                  {article.category === "english-articles" ? "by" : "بقلم"}{" "}
                  {article.authorName ?? brand.name}
                </span>
                {article.publishDate ? <span>{` / ${formatDate(article.publishDate)}`}</span> : null}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
