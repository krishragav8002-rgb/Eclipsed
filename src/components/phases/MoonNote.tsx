import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useAutofocus } from '../../hooks/useAutofocus'
import { usePhaseTransition } from '../../hooks/usePhaseTransition'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { isInteractiveTarget } from '../../lib/tapTarget'
import { useExperience } from '../../state/useExperience'
import { PaperCard } from '../scrapbook/PaperCard'
import { TapCue } from '../ui/TapCue'
import { FlowerButton } from '../ui/FlowerButton'

const SOFT_EASE: [number, number, number, number] = [0.22, 0.9, 0.32, 1]
const POP_EASE: [number, number, number, number] = [0.34, 1.5, 0.64, 1]

const MAIN_AT = 0.6
const ASIDE_AT = 1.0

/**
 * Personal messages screen after celebration.
 * Shows: "Ragav will always love you the most, my sweet Moonpie💜" always.
 * If NO-attempt count > 1, also show: "PS: I would have spammed YES as soon as I saw the question😒"
 */
export function MoonNote() {
  const { state } = useExperience()
  const go = usePhaseTransition()
  const reduced = useReducedMotion()
  const containerRef = useAutofocus([])
  const hasAdvanced = useRef(false)

  const attempts = state.noAttempts
  const showAside = attempts >= 1

  const advance = (event: MouseEvent<HTMLElement>) => {
    if (isInteractiveTarget(event.target)) return
    if (hasAdvanced.current) return
    hasAdvanced.current = true
    go('phase2')
  }

  const handleContinue = () => {
    if (hasAdvanced.current) return
    hasAdvanced.current = true
    go('phase2')
  }

  return (
    <section
      ref={containerRef}
      onClick={advance}
      aria-labelledby="moon-title"
      className="safe-bottom relative flex h-full min-h-0 flex-1 cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden text-center"
    >
      <div className="flex w-full max-w-md flex-col items-center gap-4">
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0.01 : 0.7, ease: SOFT_EASE }}
          className="w-full"
        >
          <PaperCard tone="lilac" className="relative px-4 py-4 sm:px-5 sm:py-5">
            <h1 id="moon-title" data-autofocus tabIndex={-1} className="winter-note text-cocoa">
              Ragav will always love you the most, my sweet Moonpie💜
            </h1>
          </PaperCard>
        </motion.div>

        {showAside && (
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.94, rotate: -3 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{
              duration: reduced ? 0.01 : 0.5,
              delay: reduced ? 0 : ASIDE_AT,
              ease: POP_EASE,
            }}
          >
            <PaperCard tone="lavender" rotate={-1.2} className="px-3.5 py-2">
              <p className="hand text-[1.05rem] text-cocoa">
                PS: I would have spammed YES as soon as I saw the question😒
              </p>
            </PaperCard>
          </motion.div>
        )}


      </div>

      <TapCue className="text-frost" />
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