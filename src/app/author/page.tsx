import type { Metadata } from "next"
import { Facebook } from "lucide-react"

import { LatestArticles } from "@/components/articles/latest-articles"
import { ButtonLink } from "@/components/ui/button"
import { CardMedia } from "@/components/ui/card"
import { Prose } from "@/components/ui/prose"
import { getAuthorData, getLatestArticles } from "@/lib/contentful"
import { buildMetadata } from "@/lib/metadata"

export async function generateMetadata(): Promise<Metadata> {
  const author = await getAuthorData()

  return buildMetadata({
    title: author
      ? `${author.name} ${author.title ? `- ${author.title}` : ""}`
      : "عن المؤسس",
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
  })
}

export default async function AuthorPage() {
  const [author, latestArticles] = await Promise.all([
    getAuthorData(),
    getLatestArticles(5),
  ])

  const authorSections = [
    { id: "qualifications", title: "المؤهلات", items: author.qualifications },
    { id: "experience", title: "الخبرات", items: author.experience },
    { id: "publications", title: "الإصدارات الكتابية", items: author.publications },
  ]

  return (
    <div className="page-shell page-shell--grid lg:grid-cols-[1.35fr_0.65fr]">
      <div className="space-y-6">
        <section className="brand-panel grid gap-6 rounded-[var(--radius-card)] p-6 sm:p-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(150px,0.7fr)] lg:p-10">
          <div className="space-y-4">
            <p className="brand-eyebrow">عن المؤسس</p>
            <h1 className="flex flex-wrap items-center gap-3 text-3xl font-black text-white sm:text-4xl">
              {author.name}
              {author.who ? (
                <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                  {author.who}
                </span>
              ) : null}
            </h1>
            {author.title ? (
              <p className="text-base font-semibold text-white/80">{author.title}</p>
            ) : null}
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-[190px] overflow-hidden rounded-3xl border border-white/25 bg-[var(--surface-muted)]">
            {author.image ? (
              <CardMedia
                src={author.image.url}
                alt={author.name}
                fill
                sizes="(min-width: 1024px) 20vw, 60vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center p-4 text-center text-sm font-bold text-[var(--text-muted)]">
                {author.name}
              </div>
            )}
          </div>
        </section>

        <Prose
          html={author.shortBioHtml ?? `<p>${author.shortBio}</p>`}
          className="surface-card p-6 text-right text-base leading-9 text-slate-600 sm:p-8"
        />

        {author.facebook ? (
          <div className="flex justify-start">
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

        <nav
          aria-label="أقسام السيرة الذاتية"
          className="surface-card flex flex-wrap gap-2 p-4"
        >
          {authorSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {section.title}
            </a>
          ))}
        </nav>

        <div className="grid gap-4 sm:grid-cols-2">
          {authorSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="surface-card scroll-mt-24 p-5 sm:p-6"
            >
              <h2 className="mb-3 text-xl font-bold text-[var(--accent)]">
                {section.title}
              </h2>
              <ul className="space-y-2 text-sm leading-7 text-[var(--text-muted)]">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-3 size-1.5 shrink-0 rounded-full bg-[var(--accent-cyan)]"
                    />
                    <span>{item}.</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
      <aside className="space-y-6">
        <LatestArticles articles={latestArticles} />
      </aside>
    </div>
  )
}
