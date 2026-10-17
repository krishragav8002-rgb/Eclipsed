import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { usePhaseTransition } from '../../hooks/usePhaseTransition'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { GiftId } from '../../state/experienceReducer'
import { useExperience } from '../../state/useExperience'
import { GiftGallery } from '../phase2/GiftGallery'
import { LetterGift } from '../phase2/LetterGift'
import { PlaylistGift } from '../phase2/PlaylistGift'
import { VideoGift } from '../phase2/VideoGift'

const SOFT_EASE: [number, number, number, number] = [0.22, 0.9, 0.32, 1]

/** How long the gift layer takes to fade away when the visitor comes back. */
const CLOSE_MS = 260

function GiftScreen({ gift, onBack }: { gift: GiftId; onBack: () => void }) {
  switch (gift) {
    case 'letter':
      return <LetterGift onBack={onBack} />
    case 'playlist':
      return <PlaylistGift onBack={onBack} />
    case 'video':
      return <VideoGift onBack={onBack} />
  }
}

/**
 * Phase 2 — "Under the Moon".
 *
 * The gallery and the three gifts all live inside this one phase: a gift opens
 * over the gallery, which stays mounted underneath. Coming back is therefore
 * not a remount at all — the cards keep their positions, their float phases and
 * their glow, and the only thing that changes is which gifts have been opened
 * (tracked in the shared experience state, so it also survives a trip to the
 * Phase 3 placeholder and back).
 *
 * A card goes straight into its gift on the first tap; the title and the
 * illustration are revealed by the card the moment the visitor comes back out,
 * which is when they have actually seen the gift. `returned` is that moment: it
 * names the gift just closed so its card can play its reveal, and is cleared as
 * soon as another gift is opened.
 */
export function Phase2() {
  const { state, dispatch } = useExperience()
  const go = usePhaseTransition()
  const reduced = useReducedMotion()

  const [view, setView] = useState<GiftId | null>(null)
  const [leaving, setLeaving] = useState(false)
  /** The gift the visitor has just come back from, if any. */
  const [returned, setReturned] = useState<GiftId | null>(null)

  const opened = useMemo(() => new Set(state.openedGifts), [state.openedGifts])

  // A gift is marked as opened the moment its screen appears.
  useEffect(() => {
    if (view) dispatch({ type: 'openGift', gift: view })
  }, [view, dispatch])

  // Tapping an unopened card opens that gift straight away — no title-first step.
  const openGift = useCallback((gift: GiftId) => {
    setReturned(null)
    setView(gift)
  }, [])

  const closeGift = useCallback(() => setLeaving(true), [])

  // Closing is a short fade: drop the layer once it has played out, and hand the
  // gift back to the gallery so its card can reveal itself.
  useEffect(() => {
    if (!leaving) return
    const id = window.setTimeout(
      () => {
        setLeaving(false)
        setReturned(view)
        setView(null)
      },
      reduced ? 20 : CLOSE_MS,
    )
    return () => window.clearTimeout(id)
  }, [leaving, reduced, view])

  return (
    <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <GiftGallery
        opened={opened}
        justReturned={returned}
        onOpen={openGift}
        onContinue={() => go('phase3')}
        inert={view !== null}
      />

      {view && (
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.985 }}
          animate={leaving ? { opacity: 0, y: 8, scale: 0.99 } : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduced ? 0.01 : CLOSE_MS / 1000, ease: SOFT_EASE }}
          className="absolute inset-0 z-20 flex min-h-0 flex-col"
        >
          <GiftScreen gift={view} onBack={closeGift} />
        </motion.div>
      )}
    </section>
  )
}
