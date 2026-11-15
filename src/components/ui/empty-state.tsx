import type { ReactNode } from "react"

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <p role="status" className="surface-muted p-8 text-center text-[var(--text-muted)]">
      {children}
    </p>
  )
}
