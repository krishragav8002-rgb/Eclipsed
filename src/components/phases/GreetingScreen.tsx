import type { MouseEvent } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { usePhaseTransition } from '../../hooks/usePhaseTransition'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { isInteractiveTarget } from '../../lib/tapTarget'
import { site } from '../../content/site.config'
import { Sunflower } from '../flowers/Sunflower'
import { FlowerButton } from '../ui/FlowerButton'
import { TapCue } from '../ui/TapCue'
import celebratingCat from '../../../gifs/Celebrating cat.gif'

/**
 * Screen 1 — the birthday page.
 * Tap anywhere to continue into the flow. A pulsing cue shows the page is
 * interactive; a keyboard-only "Continue" control slides in on focus.
 */
export function GreetingScreen() {
  const go = usePhaseTransition()
  const reduced = useReducedMotion()

  const advance = (event: MouseEvent<HTMLElement>) => {
    if (isInteractiveTarget(event.target)) return
    go('revealLeft')
  }

  return (
    <section
      onClick={advance}
      aria-labelledby="greeting-title"
      className="relative flex h-full flex-1 cursor-pointer flex-col overflow-hidden"
    >
      {/* Content layer — calm and balanced, no visible controls */}
      <div className="safe-bottom relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduced ? 0.01 : 0.6, ease: [0.22, 0.9, 0.32, 1] }}
          className="w-full max-w-xl"
        >
          <h1 id="greeting-title" className="display mx-auto">
            {site.heroHeading}
          </h1>
          <img
            src={celebratingCat}
            alt="A cat celebrating"
            draggable={false}
            className="mx-auto mt-5 block h-auto w-auto max-h-[32dvh] max-w-full rounded-card shadow-soft"
          />
        </motion.div>

        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0.01 : 0.6, delay: reduced ? 0 : 0.25 }}
          className="flex items-center justify-center gap-4"
        >
          <Sunflower size={30} sway className="anim-sway" style={{ animationDelay: '0.3s' }} />
          <Sunflower size={44} sway className="anim-sway" />
          <Sunflower size={30} sway className="anim-sway" style={{ animationDelay: '0.9s' }} />
        </motion.div>

        <TapCue />
      </div>

      {/* Keyboard-only continue — slides in when focused, invisible otherwise */}
      <FlowerButton
        icon={ArrowRight}
        onClick={() => go('revealLeft')}
        className="reveal-on-focus"
      >
        Continue
      </FlowerButton>
    </section>
  )
}
