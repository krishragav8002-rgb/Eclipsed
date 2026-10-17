import { useEffect, useRef, type DependencyList, type RefObject } from 'react'

interface AutofocusOptions {
  /** don't steal focus on this hook's first run (e.g. initial page load) */
  skipFirst?: boolean
}

/**
 * Focuses the first [data-autofocus] element inside a container
 * whenever the given dependencies change. Used to announce each new
 * page / question to screen readers after a transition.
 */
export function useAutofocus(
  deps: DependencyList,
  options?: AutofocusOptions,
): RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement>(null)
  const firstRun = useRef(true)

  useEffect(() => {
    const skip = options?.skipFirst === true && firstRun.current
    firstRun.current = false
    if (skip) return

    const id = window.setTimeout(() => {
      ref.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus({ preventScroll: true })
    }, 80)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}