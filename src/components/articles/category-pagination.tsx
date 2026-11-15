import Link from "next/link"

import type { ArticleCategory } from "@/lib/types"

export function CategoryPagination({
  category,
  currentPage,
  totalPages,
}: {
  category: ArticleCategory
  currentPage: number
  totalPages: number
}) {
  return (
    <nav
      aria-label="صفحات المقالات"
      className="flex items-center justify-center gap-2"
      dir="rtl"
    >
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1
        const href =
          page === 1 ? `/articles/${category}` : `/articles/${category}/${page}`
        const isCurrentPage = page === currentPage

        return (
          <Link
            key={href}
            href={href}
            aria-current={isCurrentPage ? "page" : undefined}
            className={`inline-flex size-11 items-center justify-center rounded-full border text-sm font-semibold transition ${
              isCurrentPage
                ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                : "border-[var(--border)] bg-white/90 text-slate-700 hover:border-[var(--accent)]"
            }`}
          >
            {page}
          </Link>
        )
      })}
    </nav>
  )
}
