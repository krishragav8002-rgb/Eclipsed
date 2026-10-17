import type { ReactNode } from 'react'

/** Visible-to-screen-readers-only text. */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>
}
