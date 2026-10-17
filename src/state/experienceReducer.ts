/* ============================================================
   Phase / navigation state.
   Content (site.config) stays separate from interaction state.
   The flow is a simple linear tap-through, so the state is the
   current phase plus the one fact a later screen needs: how
   many times NO was pressed when YES was chosen.
   ============================================================ */

export type PhaseId =
  | 'greeting'
  | 'revealLeft'
  | 'revealDown'
  | 'quickQuestions'
  | 'loveQuestion'
  | 'winter'
  | 'moonNote'
  | 'phase2'
  | 'phase3'

/** The three gifts in Phase 2. */
export type GiftId = 'letter' | 'playlist' | 'video'

export const PHASE_ORDER: PhaseId[] = [
  'greeting',
  'revealLeft',
  'revealDown',
  'quickQuestions',
  'loveQuestion',
  'winter',
  'moonNote',
  'phase2',
  'phase3',
]

export interface ExperienceState {
  phase: PhaseId
  /** How many times the NO flower was actually pressed by the time YES was
   *  chosen (0–8). Captured at the YES tap so the winter celebration can pick
   *  its message from the real counter rather than from a render count. */
  noAttempts: number
  /** Phase 2 gifts opened during this visit, in the order they were opened.
   *  Lives in the shared state so it survives a trip to the Phase 3 placeholder
   *  and back — returning to a gift never resets its opened status. */
  openedGifts: GiftId[]
}

export type ExperienceAction =
  | { type: 'go'; phase: PhaseId; noAttempts?: number }
  | { type: 'openGift'; gift: GiftId }
  | { type: 'reset' }

export const initialState: ExperienceState = {
  phase: 'greeting',
  noAttempts: 0,
  openedGifts: [],
}

/** The phase immediately before `phase` (or `phase` itself at the start). */
export function previousPhase(phase: PhaseId): PhaseId {
  const index = PHASE_ORDER.indexOf(phase)
  return index > 0 ? PHASE_ORDER[index - 1] : phase
}

export function experienceReducer(
  state: ExperienceState,
  action: ExperienceAction,
): ExperienceState {
  switch (action.type) {
    case 'go':
      // No-op if target is current phase — prevents skips/duplicates
      if (state.phase === action.phase) return state
      return {
        phase: action.phase,
        // Only the YES hand-off supplies a count; every other hop keeps it.
        noAttempts: action.noAttempts ?? state.noAttempts,
        // Opened gifts are a property of the visit, not of the page.
        openedGifts: state.openedGifts,
      }

    case 'openGift':
      // Never un-open, and never list the same gift twice.
      if (state.openedGifts.includes(action.gift)) return state
      return { ...state, openedGifts: [...state.openedGifts, action.gift] }

    case 'reset':
      return initialState

    default:
      return state
  }
}
