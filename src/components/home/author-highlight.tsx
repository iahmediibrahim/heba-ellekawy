import Image from "next/image";
import Link from "next/link";

import type { AuthorData } from "@/lib/types";

export function AuthorHighlight({ author }: { author?: AuthorData }) {
  if (!author) {
    return null;
  }

  return (
    <section className="surface-card p-6 sm:p-7">
      <div className="grid items-center gap-6 md:grid-cols-[0.8fr_1.2fr]">
        <div className="flex justify-center">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] bg-[#f6ecef]">
            {author.image ? (
              <Image
                src={author.image.url}
                alt={author.name}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 30vw, 80vw"
              />
            ) : null}
          </div>
        </div>
        <div className="space-y-4 text-right">
          <div className="space-y-2">
            <span className="pill-badge">
              عن المؤسس
            </span>
            <h2 className="text-3xl font-bold text-slate-900">
              {author.name} {author.who ? <span className="text-[var(--accent)]">| {author.who}</span> : null}
            </h2>
            {author.title ? <p className="text-base text-[var(--text-muted)]">{author.title}</p> : null}
          </div>
          <p className="line-clamp-6 text-base leading-9 text-[var(--text-muted)]">{author.shortBio}</p>
          <div className="flex justify-end">
            <Link href="/author" className="primary-button">
              اقرأ السيرة كاملة
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
