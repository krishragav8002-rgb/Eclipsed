import { ChevronLeft } from 'lucide-react'
import type { MouseEvent } from 'react'
import { motion } from 'motion/react'
import { useAutofocus } from '../../hooks/useAutofocus'
import { usePhaseTransition } from '../../hooks/usePhaseTransition'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { isInteractiveTarget } from '../../lib/tapTarget'
import { site } from '../../content/site.config'
import { previousPhase, type PhaseId } from '../../state/experienceReducer'
import { Sunflower } from '../flowers/Sunflower'
import { PaperCard } from '../scrapbook/PaperCard'
import { TapeStrip } from '../scrapbook/TapeStrip'
import { FlowerButton } from '../ui/FlowerButton'
import { ArrowRight } from 'lucide-react'
import { TapCue } from '../ui/TapCue'
import babyGirlGif from '../../../gifs/Baby girl.gif'

interface MessagePageProps {
  /** which of the two greeting messages this page shows */
  phase: 'revealLeft' | 'revealDown'
}

const CONTENT: Record<
  MessagePageProps['phase'],
  {
    titleId: string
    message: string
    tone: 'blush' | 'butter'
    tape: 'blush' | 'butter'
    tapeSide: string
    next: PhaseId
    /** Optional scrapbook GIF shown directly underneath the message. */
    gif?: string
  }
> = {
  revealLeft: {
    titleId: 'reveal-left-title',
    message: site.revealLeft,
    tone: 'blush',
    tape: 'butter',
    tapeSide: 'right-6 rotate-3',
    next: 'revealDown',
  },
  revealDown: {
    titleId: 'reveal-down-title',
    message: site.revealDown,
    tone: 'butter',
    tape: 'blush',
    tapeSide: 'left-6 -rotate-3',
    next: 'quickQuestions',
    gif: babyGirlGif,
  },
}

/**
 * A full-screen message page. It is its own page (not an overlay): tap
 * anywhere to continue to the next page, or use the small icon-only back
 * control to step to the previous one.
 */
export function MessagePage({ phase }: MessagePageProps) {
  const go = usePhaseTransition()
  const reduced = useReducedMotion()
  const containerRef = useAutofocus([])
  const { titleId, message, tone, tape, tapeSide, next, gif } = CONTENT[phase]

  const advance = (event: MouseEvent<HTMLElement>) => {
    if (isInteractiveTarget(event.target)) return
    go(next)
  }

  return (
    <section
      ref={containerRef}
      onClick={advance}
      aria-labelledby={titleId}
      className="relative flex h-full flex-1 cursor-pointer flex-col overflow-hidden"
    >
      {/* Content */}
      <div className="safe-bottom relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduced ? 0.01 : 0.5, ease: [0.22, 0.9, 0.32, 1] }}
          className="w-full max-w-md"
        >
          <PaperCard tone={tone} className="relative p-6 text-center sm:p-8">
            <TapeStrip tone={tape} className={`-top-3 ${tapeSide}`} />
            <h1 id={titleId} data-autofocus tabIndex={-1} className="title-md">
              {message}
            </h1>
            {gif && (
              <img
                src={gif}
                alt="Baby girl"
                draggable={false}
                className="mx-auto mt-4 block h-auto w-auto max-h-[26dvh] max-w-full rounded-card shadow-soft"
              />
            )}
            <div className="mt-4 flex items-center justify-center gap-3" aria-hidden="true">
              <Sunflower size={30} sway className="anim-sway" />
              <Sunflower size={22} sway className="anim-sway" style={{ animationDelay: '0.6s' }} />
            </div>
          </PaperCard>
        </motion.div>

        <TapCue />
      </div>

      {/* Subtle back control (icon only) */}
      <button
        type="button"
        onClick={() => go(previousPhase(phase))}
        aria-label="Go back to the previous page"
        className="absolute left-1 top-1 z-20 inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-cocoa-soft/70 transition-colors hover:bg-paper/70 hover:text-cocoa"
      >
        <ChevronLeft size={22} aria-hidden="true" />
      </button>

      {/* Keyboard-only continue — slides in when focused, invisible otherwise */}
      <FlowerButton
        icon={ArrowRight}
        onClick={() => go(next)}
        className="reveal-on-focus"
      >
        Continue
      </FlowerButton>
    </section>
  )
}
