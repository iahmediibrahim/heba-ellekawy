import { ButtonLink } from "@/components/ui/button"
import { truncateText } from "@/lib/format"
import type { AuthorData, Story } from "@/lib/types"

export function HomeFounder({
  author,
  stories,
}: {
  author?: AuthorData
  stories: Story[]
}) {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="surface-card p-6 text-right lg:p-8">
        <p className="eyebrow">عن المؤسس</p>
        <h2 className="mt-2 text-3xl font-black text-slate-950">
          {author?.name ?? "د. هبة اللكاوي"}
        </h2>
        {author?.title ? (
          <p className="mt-3 text-base text-[var(--text-muted)]">{author.title}</p>
        ) : null}
        {author?.shortBio ? (
          <p className="mt-4 text-base leading-9 text-[var(--text-muted)]">
            {truncateText(author.shortBio, 240)}
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <ButtonLink href="/author" variant="primary">
            السيرة الكاملة
          </ButtonLink>
        </div>
      </div>

      {/* <div className="surface-card p-6 lg:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <ButtonLink href="/stories" variant="secondary">
            عرض كل القصص
          </ButtonLink>
          <div className="text-right">
            <p className="eyebrow">قصص قصيرة</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">مختارات</h2>
          </div>
        </div>

        {stories.length ? (
          <div className="grid gap-4">
            {stories.map((story) => (
              <article key={story.id} className="surface-muted p-4">
                <div className="grid items-center gap-4 sm:grid-cols-[5.5rem_1fr]">
                  <div className="relative h-24 overflow-hidden rounded-[1.1rem] bg-white sm:w-[5.5rem]">
                    {story.heroImage ? (
                      <CardMedia
                        src={story.heroImage.url}
                        alt={story.title}
                        fill
                        sizes="88px"
                      />
                    ) : null}
                  </div>
                  <div className="text-right">
                    <h3 className="text-lg font-bold text-slate-900">{story.title}</h3>
                    {story.shortBio ? (
                      <p className="mt-2 line-clamp-2 text-sm leading-7 text-[var(--text-muted)]">
                        {story.shortBio}
                      </p>
                    ) : null}
                    {story.pdfUrl ? (
                      <div className="mt-3">
                        <Link
                          href={story.pdfUrl}
                          className="secondary-button px-4 py-2 text-sm"
                        >
                          تحميل PDF
                        </Link>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState>لا توجد قصص منشورة حاليًا.</EmptyState>
        )}
      </div> */}
    </section>
  )
}
