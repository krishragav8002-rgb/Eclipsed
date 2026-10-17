import { useCallback, useRef } from 'react'
import { useExperience } from '../state/useExperience'
import { useReducedMotion } from './useReducedMotion'
import type { ExperienceAction, PhaseId } from '../state/experienceReducer'

/**
 * Shared advance cooldown. It lives at module scope so it survives the
 * per-phase remount — otherwise a fast double-tap could ride the remount and
 * skip a page.
 */
let lastAdvanceAt = 0

interface GoOptions {
  /** hold the swap for a moment (e.g. let a celebration burst play first) */
  delay?: number
  /** how many NO presses preceded this hop — stored for the winter screen */
  noAttempts?: number
}

/**
 * Reusable phase transition helper with an in-flight guard.
 * Prevents double-dispatch during animations, both within one screen and
 * across a screen swap.
 */
export function usePhaseTransition() {
  const { state, dispatch } = useExperience()
  const reduced = useReducedMotion()
  const inFlight = useRef(false)

  const go = useCallback(
    (target: PhaseId, opts?: GoOptions) => {
      if (inFlight.current || target === state.phase) return
      const now = Date.now()
      if (now - lastAdvanceAt < (reduced ? 90 : 420)) return
      inFlight.current = true
      lastAdvanceAt = now

      const run = () => {
        const action: ExperienceAction =
          opts?.noAttempts === undefined
            ? { type: 'go', phase: target }
            : { type: 'go', phase: target, noAttempts: opts.noAttempts }
        dispatch(action)
        // Reset guard after the cross-fade completes
        window.setTimeout(() => {
          inFlight.current = false
        }, reduced ? 50 : 450)
      }

      if (opts?.delay) {
        window.setTimeout(run, opts.delay)
      } else {
        run()
      }
    },
    [dispatch, state.phase, reduced],
  )

  return go
}
