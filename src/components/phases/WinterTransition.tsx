import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { motion } from 'motion/react'
import { Snowflake, ArrowRight } from 'lucide-react'
import { useAutofocus } from '../../hooks/useAutofocus'
import { usePhaseTransition } from '../../hooks/usePhaseTransition'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { isInteractiveTarget } from '../../lib/tapTarget'
import { winterMessageFor } from '../../content/site.config'
import { useExperience } from '../../state/useExperience'
import { PaperCard } from '../scrapbook/PaperCard'
import { TapeStrip } from '../scrapbook/TapeStrip'
import { TapCue } from '../ui/TapCue'
import { FlowerButton } from '../ui/FlowerButton'

const SOFT_EASE: [number, number, number, number] = [0.22, 0.9, 0.32, 1]

/**
 * Attempt-specific celebration screen.
 * Shows only the message selected by number of NO attempts (0–8), preserves
 * petal-burst visuals via WinterScene, adds tap-to-continue to moonNote.
 */
export function WinterTransition() {
  const { state } = useExperience()
  const go = usePhaseTransition()
  const reduced = useReducedMotion()
  const containerRef = useAutofocus([])
  const hasAdvanced = useRef(false)

  const attempts = state.noAttempts
  const note = winterMessageFor(attempts)

  const advance = (event: MouseEvent<HTMLElement>) => {
    if (isInteractiveTarget(event.target)) return
    if (hasAdvanced.current) return
    hasAdvanced.current = true
    go('moonNote')
  }

  const handleContinue = () => {
    if (hasAdvanced.current) return
    hasAdvanced.current = true
    go('moonNote')
  }

  const motionDuration = reduced ? 0.01 : 0.6

  return (
    <section
      ref={containerRef}
      onClick={advance}
      aria-labelledby="winter-title"
      className="safe-bottom relative flex h-full min-h-0 flex-1 cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden text-center sm:gap-4"
    >
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: motionDuration, ease: SOFT_EASE }}
        className="w-full max-w-md"
      >
        <PaperCard tone="sky" className="relative p-4 sm:p-6">
          <TapeStrip tone="lilac" className="-top-3 right-6 rotate-3" />
          <h1 id="winter-title" data-autofocus tabIndex={-1} className="title-md">
            {note}
          </h1>
          <div
            className="mt-3 flex items-center justify-center gap-3 text-ice-deep"
            aria-hidden="true"
          >
            <Snowflake size={22} strokeWidth={1.7} />
            <Snowflake size={15} strokeWidth={1.6} />
            <Snowflake size={22} strokeWidth={1.7} />
          </div>
        </PaperCard>
      </motion.div>

      <TapCue />
      <FlowerButton
        icon={ArrowRight}
        onClick={handleContinue}
        data-no-advance
        className="reveal-on-focus"
      >
        Continue
      </FlowerButton>
    </section>
  )
}
