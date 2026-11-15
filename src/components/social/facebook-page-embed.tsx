"use client"

import Script from "next/script"
import { useEffect, useRef, useState } from "react"

type FacebookSdkWindow = Window & {
  FB?: {
    XFBML?: {
      parse: (element?: HTMLElement) => void
    }
  }
}

export function FacebookPageEmbed({ link }: { link: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    if (!("IntersectionObserver" in window)) {
      const timeout = setTimeout(() => setShouldLoad(true), 0)
      return () => clearTimeout(timeout)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: "300px" },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="surface-card p-5 sm:p-6">
      <div className="mb-6 text-right">
        <p className="eyebrow">المجتمع</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">تابعنا على فيسبوك</h2>
      </div>
      <div id="fb-root" />
      <div
        className="fb-page"
        data-href={link}
        data-tabs="timeline"
        data-width=""
        data-height=""
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote cite={link} className="fb-xfbml-parse-ignore">
          <a href={link} target="_blank" rel="noreferrer">
            Shaghbatta
          </a>
        </blockquote>
      </div>
      {shouldLoad ? (
        <Script
          id="facebook-page-sdk"
          strategy="afterInteractive"
          src="https://connect.facebook.net/ar_AR/sdk.js#xfbml=1&version=v19.0"
          onReady={() => {
            const section = sectionRef.current
            const facebook = (window as FacebookSdkWindow).FB

            if (section) {
              facebook?.XFBML?.parse(section)
            }
          }}
        />
      ) : null}
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex text-sm font-semibold text-[var(--accent)] transition hover:text-[var(--accent-cyan)]"
      >
        فتح صفحتنا على فيسبوك
      </a>
    </section>
  )
}
