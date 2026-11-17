"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" })
    }
  }, [pathname])

  return null
}
