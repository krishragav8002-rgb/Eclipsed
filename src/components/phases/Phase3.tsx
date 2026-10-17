import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { motion } from 'motion/react'
import {
  PHASE3_CHROME,
  PHASE3_LIFE_PAGES,
  PHASE3_PAGES,
  PHASE3_UNIVERSE_PAGES,
  type Phase3Page,
} from '../../content/phase3.config'
import { useAutofocus } from '../../hooks/useAutofocus'
import { usePhaseTransition } from '../../hooks/usePhaseTransition'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { isInteractiveTarget } from '../../lib/tapTarget'
import { SketchArrow } from '../phase3/doodles'
import { BirthdayGarden } from '../phase3/BirthdayGarden'
import { LifePage } from '../phase3/LifePage'
import { ProgressRail, TapHint } from '../phase3/PageChrome'
import { PaperWorld } from '../phase3/PaperWorld'
import { UniversePage } from '../phase3/UniversePage'
import { WishPage } from '../phase3/WishPage'

/**
 * PHASE 3 — "In every universe, it's you 💜"
 *
 * The chapter the gifts lead into, in three parts:
 *
 *   A · the life I want with you      pages 01–09   (the nine screens)
 *   B · in every universe             pages 10–14   (the five illustrations)
 *   C · the birthday wish             page 15
 *
 * The visitor taps anywhere to turn the page: no slideshow chrome. A small paper
 * control in the corner goes back, a rail of ink dashes shows how far in we are,
 * and a handwritten "tap" sits beside it — except at the end of Parts A and B,
 * where a deliberate control carries the story forward. The plate — green,
 * dashed and dotted exactly like the portfolio —
 * never changes; only the paper turns.
 *
 * When the wish page is showing, the chapter stops. There is nothing after it.
 */

const SKETCH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * How long a page refuses another tap after turning. Long enough that a
 * double-tap on a phone cannot skip a page, short enough to never feel sticky.
 */
const LOCK_MS = 420
const LOCK_MS_REDUCED = 120

/** Picks the component for a page. Kept outside the render so pages never remount. */
function renderPage(page: Phase3Page) {
  switch (page.kind) {
    case 'life':
      return <LifePage page={page} />
    case 'universe':
      return <UniversePage page={page} />
    case 'wish':
      return <WishPage />
  }
}

export function Phase3() {
  const reduced = useReducedMotion()
  const go = usePhaseTransition()

  const [page, setPage] = useState(0)
  /** which way the last turn went, so pages slide in from the side they came from */
  const [turn, setTurn] = useState<1 | -1>(1)
  const lastTurnAt = useRef(0)
  /** scopes the screen-reader focus to the page currently on screen */
  const sectionRef = useAutofocus([page])

  const total = PHASE3_PAGES.length
  const current = PHASE3_PAGES[page]
  const isFirst = page === 0
  const isLast = page >= total - 1

  /** Part boundaries use deliberate controls to carry the story forward. */
  const atPartAEnd = page === PHASE3_LIFE_PAGES.length - 1
  const atPartBEnd =
    page === PHASE3_LIFE_PAGES.length + PHASE3_UNIVERSE_PAGES.length - 1

  /** Turn one page, ignoring taps that arrive inside the cooldown. */
  const step = useCallback(
    (delta: 1 | -1) => {
      const now = Date.now()
      const lock = reduced ? LOCK_MS_REDUCED : LOCK_MS
      if (now - lastTurnAt.current < lock) return
      lastTurnAt.current = now
      setTurn(delta)
      setPage((p) => Math.min(total - 1, Math.max(0, p + delta)))
    },
    [reduced, total],
  )

  /**
   * Back one page, except on the very first, where it steps out of the chapter
   * and hands the visitor back to their gifts (Phase 2 opens exactly as they
   * left it — nothing here touches that state).
   */
  const onBack = useCallback(() => {
    if (isFirst) {
      go('phase2')
      return
    }
    step(-1)
  }, [isFirst, go, step])

  /** Anywhere on the plate turns the page, except on things that are controls. */
  const onTap = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (isInteractiveTarget(event.target)) return
      step(1)
    },
    [step],
  )

  /**
   * Warm the next page's picture while this one is being read, so turning the
   * page does not show an empty frame.
   */
  useEffect(() => {
    const next = PHASE3_PAGES[page + 1]
    const src =
      next?.kind === 'universe'
        ? next.image.src
        : next?.kind === 'life'
          ? next.media.src
          : undefined
    if (!src) return
    const img = new Image()
    img.src = src
  }, [page])

  return (
    <section
      ref={sectionRef}
      onClick={onTap}
      aria-label="In every universe, it's you"
      className={`p3-world ${current.kind === 'wish' ? 'p3-world--wish' : ''}`}
    >
      <PaperWorld />
      {current.kind === 'wish' && <BirthdayGarden />}

      {/* the turning page. The top padding clears the shell's "page three" chip,
          which floats over the plate's top-right corner; the sides use the
          safe-area gutter so nothing hides under a notch. `aria-live` sits on
          this persistent wrapper (not the keyed page) so the new page is
          reliably announced, exactly as the letter pages do it. */}
      <div
        aria-live="polite"
        className="safe-x relative z-10 flex min-h-0 flex-1 flex-col pt-10 pb-1"
      >
        <motion.div
          key={page}
          initial={reduced ? { opacity: 1 } : { opacity: 0, x: 24 * turn, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: reduced ? 0.01 : 0.42, ease: SKETCH_EASE }}
          className="flex min-h-0 flex-1 flex-col"
        >
          {renderPage(current)}
        </motion.div>
      </div>

      {/* Part boundaries get a deliberate forward control; other pages retain
          the small back control, progress rail and tap cue. */}
      <footer className="safe-bottom safe-x relative z-10 shrink-0 pt-1">
        {(atPartAEnd || atPartBEnd) && (
          <div className="mx-auto mb-2 flex w-full max-w-lg shrink-0 justify-center">
            <motion.button
              type="button"
              onClick={() => step(1)}
              className="p3-btn"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0.01 : 0.5,
                ease: SKETCH_EASE,
                delay: reduced ? 0 : 0.6,
              }}
            >
              {atPartAEnd ? PHASE3_CHROME.partBLabel : PHASE3_CHROME.partCLabel}
            </motion.button>
          </div>
        )}

        <div className="mx-auto flex w-full max-w-lg flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
          <button type="button" onClick={onBack} className="p3-btn">
            <SketchArrow className="w-4 opacity-70" style={{ transform: 'scaleX(-1)' }} />
            {isFirst ? PHASE3_CHROME.exitLabel : PHASE3_CHROME.backLabel}
          </button>

          <span className="flex items-center gap-3">
            <ProgressRail page={page} total={total} />
            {!isLast &&
              !atPartAEnd &&
              !atPartBEnd &&
              (current.kind === 'life' ? (
                <button type="button" onClick={() => step(1)} className="p3-btn">
                  {PHASE3_CHROME.continueLabel}
                </button>
              ) : (
                <TapHint label={PHASE3_CHROME.cueLabel} />
              ))}
          </span>
        </div>
      </footer>

      {/*
        The keyboard twin of tapping the plate. It sits off-screen until it is
        focused, then slides up — so the chapter never depends on a gesture.
      */}
      {!isLast && (
        <button type="button" onClick={() => step(1)} className="reveal-on-focus p3-btn">
          {PHASE3_CHROME.nextLabel}
        </button>
      )}
    </section>
  )
}
