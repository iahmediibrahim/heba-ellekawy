"use client"

import Image from "next/image"
import { useState } from "react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

import type { ContentfulImage } from "@/lib/types"

export function PostMedia({ images }: { images: ContentfulImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images.length) {
    return null
  }

  const index = Math.min(activeIndex, images.length - 1)
  const image = images[index]
  const showControls = images.length > 1

  function goTo(nextIndex: number) {
    setActiveIndex((nextIndex + images.length) % images.length)
  }

  return (
    <div
      role="region"
      aria-label="معرض صور المقال"
      tabIndex={showControls ? 0 : undefined}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          goTo(index + 1)
        } else if (event.key === "ArrowRight") {
          goTo(index - 1)
        }
      }}
      className="space-y-3"
    >
      <div className="relative overflow-hidden rounded-4xl bg-[var(--surface-muted)]">
        <Image
          key={image.url}
          src={image.url}
          alt={image.title}
          width={image.width}
          height={image.height}
          className="mx-auto h-auto w-full object-contain"
          sizes="(min-width: 1024px) 60vw, 100vw"
        />

        {showControls ? (
          <div dir="ltr" className="absolute inset-x-0 top-1/2 flex justify-between px-3">
            <button
              type="button"
              aria-label="الصورة السابقة"
              onClick={() => goTo(index - 1)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)] shadow-[var(--shadow-soft)] transition hover:bg-[var(--surface-muted)]"
            >
              <LuChevronRight className="size-5" />
            </button>
            <button
              type="button"
              aria-label="الصورة التالية"
              onClick={() => goTo(index + 1)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)] shadow-[var(--shadow-soft)] transition hover:bg-[var(--surface-muted)]"
            >
              <LuChevronLeft className="size-5" />
            </button>
          </div>
        ) : null}
      </div>

      {showControls ? (
        <>
          <p
            aria-live="polite"
            dir="ltr"
            className="text-center text-xs font-semibold text-[var(--text-muted)]"
          >
            {index + 1} / {images.length}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {images.map((item, itemIndex) => (
              <button
                key={item.url}
                type="button"
                aria-label={`عرض الصورة ${itemIndex + 1}`}
                aria-pressed={itemIndex === index}
                onClick={() => setActiveIndex(itemIndex)}
                className={`relative size-16 overflow-hidden rounded-md border-2 transition ${
                  itemIndex === index
                    ? "border-[var(--accent)]"
                    : "border-[var(--border)] opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
