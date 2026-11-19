"use client"

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react"

const tabs = [
  { id: "books", label: "الروايات والكتب" },
  { id: "stories", label: "القصص القصيرة" },
] as const

type TabId = (typeof tabs)[number]["id"]

export function NovelsBooksTabs({
  booksContent,
  storiesContent,
}: {
  booksContent: ReactNode
  storiesContent: ReactNode
}) {
  const [activeTab, setActiveTab] = useState<TabId>("books")
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  useEffect(() => {
    if (window.location.hash === "#short-stories") {
      setActiveTab("stories")
    }
  }, [])

  useEffect(() => {
    if (activeTab === "stories" && window.location.hash === "#short-stories") {
      document.getElementById("short-stories")?.scrollIntoView()
    }
  }, [activeTab])

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined

    if (event.key === "ArrowLeft") {
      nextIndex = (index + 1) % tabs.length
    } else if (event.key === "ArrowRight") {
      nextIndex = (index + tabs.length - 1) % tabs.length
    } else if (event.key === "Home") {
      nextIndex = 0
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1
    }

    if (nextIndex === undefined) {
      return
    }

    event.preventDefault()
    tabRefs.current[nextIndex]?.focus()
    setActiveTab(tabs[nextIndex].id)
  }

  return (
    <div className="space-y-6">
      <div
        role="tablist"
        aria-label="أقسام الروايات والقصص"
        className="surface-card flex flex-wrap justify-center gap-2 p-2"
        dir="rtl"
      >
        {tabs.map((tab, index) => {
          const selected = activeTab === tab.id

          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element
              }}
              type="button"
              role="tab"
              id={`${tab.id}-tab`}
              aria-selected={selected}
              aria-controls={`${tab.id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`rounded-full px-5 py-3 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                selected
                  ? "bg-[var(--accent)] text-white"
                  : "text-slate-600 hover:bg-[var(--surface-muted)] hover:text-[var(--accent)]"
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div
        id="books-panel"
        role="tabpanel"
        aria-labelledby="books-tab"
        tabIndex={0}
        hidden={activeTab !== "books"}
      >
        {booksContent}
      </div>
      <div
        id="stories-panel"
        role="tabpanel"
        aria-labelledby="stories-tab"
        tabIndex={0}
        hidden={activeTab !== "stories"}
      >
        {storiesContent}
      </div>
    </div>
  )
}
