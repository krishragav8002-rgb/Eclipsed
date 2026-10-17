import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { motion } from 'motion/react'
import { useAutofocus } from '../../hooks/useAutofocus'
import { usePhaseTransition } from '../../hooks/usePhaseTransition'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { isInteractiveTarget } from '../../lib/tapTarget'
import { site } from '../../content/site.config'
import { Sunflower } from '../flowers/Sunflower'
import { PaperCard } from '../scrapbook/PaperCard'
import { TapeStrip } from '../scrapbook/TapeStrip'

/**
 * Screen 2 — Brief interstitial: "Btw... Quick question."
 * Appears, holds, fades out, then the question screen eases in.
 */
export function QuickQuestionsTransition() {
  const go = usePhaseTransition()
  const reduced = useReducedMotion()
  const containerRef = useAutofocus([])
  const [leaving, setLeaving] = useState(false)
  const timers = useRef<number[]>([])

  useEffect(() => {
    // ~1750ms total: fade in (400) → hold (~800) → fade out (550) → advance
    timers.current = [
      window.setTimeout(() => setLeaving(true), 1200),
      window.setTimeout(() => go('loveQuestion'), 1750),
    ]
    return () => timers.current.forEach((t) => window.clearTimeout(t))
  }, [go])

  const advance = (event: MouseEvent<HTMLElement>) => {
    if (isInteractiveTarget(event.target)) return
    go('loveQuestion')
  }

  return (
    <section
      ref={containerRef}
      onClick={advance}
      aria-labelledby="transition-title"
      className="safe-bottom relative flex h-full flex-1 cursor-pointer items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={
          leaving && !reduced
            ? { opacity: 0, y: -14, scale: 0.96 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: reduced ? 0.01 : 0.45, ease: [0.22, 0.9, 0.32, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <PaperCard tone="sage" className="relative p-6 sm:p-8">
          <TapeStrip tone="butter" className="-top-3 left-8 -rotate-3" />
          <h1 id="transition-title" data-autofocus tabIndex={-1} className="title-md text-center">
            {site.transitionLine}
          </h1>
          <div className="mt-4 flex items-center justify-center gap-3" aria-hidden="true">
            <Sunflower size={36} sway className="anim-sway" />
            <Sunflower size={28} sway className="anim-sway" style={{ animationDelay: '0.5s' }} />
            <Sunflower size={22} sway className="anim-sway" style={{ animationDelay: '1s' }} />
          </div>
        </PaperCard>
      </motion.div>
    </section>
  )
}
