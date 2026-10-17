import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useExperience } from '../../state/useExperience'
import { PhaseTransition } from '../transitions/PhaseTransition'
import type { PhaseId } from '../../state/experienceReducer'

/** Small contextual chip (not a title) — the only remaining header element. */
const PHASE_LABELS: Record<PhaseId, string> = {
  greeting: 'the birthday',
  revealLeft: 'a little note',
  revealDown: 'a little note',
  quickQuestions: 'quick question',
  loveQuestion: 'the question',
  winter: 'snowfall',
  moonNote: 'a little note',
  phase2: 'page two',
  phase3: 'page three',
}

/**
 * Chrome for every phase. The viewport is locked (no page scroll): the shell
 * fills the dynamic viewport height, respects safe-area insets, and hands each
 * screen a full-height, non-overflowing column to compose inside.
 *
 * The screen itself is rendered by the transition, which needs to hold the
 * leaving page and the arriving page at the same time.
 */
export function PhaseShell() {
  const { state } = useExperience()
  const reduced = useReducedMotion()

  /**
   * Phase 2 (and the placeholder that follows it) paints its own full-bleed
   * night sky, so the shell steps out of the way: no content column, no side
   * gutter, no top padding. The phase owns the whole viewport and adds its own
   * safe-area insets, which is what stops the gallery from reading as a narrow
   * panel floating on the scrapbook desk.
   */
  const fullBleed = state.phase === 'phase2' || state.phase === 'phase3'

  return (
    <div className={`relative flex h-dvh flex-col overflow-hidden ${fullBleed ? '' : 'safe-top'}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header
        className={
          fullBleed
            ? 'safe-top safe-x pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-end'
            : 'safe-x relative z-10 mx-auto flex w-full max-w-3xl shrink-0 items-center justify-end pt-0.5'
        }
      >
        <span className={`rounded-full border px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] shadow-soft ${
          fullBleed
            ? 'border-cream/30 bg-cocoa/55 text-cream/95'
            : 'border-cocoa/15 bg-paper/90 text-cocoa-soft'
        }`}>
          {PHASE_LABELS[state.phase]}
        </span>
      </header>

      <main id="main" tabIndex={-1} className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className={fullBleed ? 'flex min-h-0 flex-1 flex-col' : 'safe-x mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col'}>
          <PhaseTransition phase={state.phase} reduced={reduced} />
        </div>
      </main>
    </div>
  )
}
