import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { useAutofocus } from '../../hooks/useAutofocus'
import { usePhaseTransition } from '../../hooks/usePhaseTransition'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { site } from '../../content/site.config'
import { PaperCard } from '../scrapbook/PaperCard'
import { TapeStrip } from '../scrapbook/TapeStrip'
import { LoveFlowerButton } from '../ui/LoveFlowerButton'

/* ------------------------------------------------------------
   The question arena.

   The heading sits at the very top and the NO-tap message card
   lives directly under it — both stay put while the flowers play
   below them in a measured, relative "arena".

   YES holds the right side of the arena until the NO flower is
   dismissed for good; then it glides to the exact centre.

   NO starts on the left, but on every tap it flees to a brand-new
   random spot inside the arena: always fully on screen, never
   under the question/card, never overlapping YES and never
   landing where it just was. It still shrinks a little each tap
   and vanishes completely after the eighth.
   ------------------------------------------------------------ */

const MAX_ATTEMPTS = 8

/** Even geometric shrink for NO (baseline ÷ ~0.883 per tap). With a
 *  ~132px baseline the final tap settles around 55px — still tappable. */
const NO_SCALES = [1, 0.883, 0.78, 0.689, 0.609, 0.537, 0.475, 0.419]

/** Keep every flower at least this far from the arena edge (px). */
const EDGE_PAD = 12

/** Minimum breathing room between the NO and YES flowers (px). */
const YES_GAP = 14

/** How much YES grows once it owns the arena on its own. */
const YES_GROW = 1.35

/** Reaction GIFs for the escaping NO flower: `gifs/Attempt gifs/<n>.gif` belongs
 *  to the state with n completed NO taps — `0.gif` sits beside the untouched
 *  question, `1.gif` answers the first tap, and `8.gif` the eighth and final
 *  one — so the file's number always equals the attempt counter. Loaded through
 *  Vite's glob so a missing file simply shows no reaction instead of breaking
 *  the build. */
const REACTION_GIFS: Record<number, string> = {}
const reactionFiles = import.meta.glob('../../../gifs/Attempt gifs/*.gif', {
  eager: true,
  import: 'default',
})
for (const [filePath, url] of Object.entries(reactionFiles)) {
  if (typeof url !== 'string') continue
  const attemptNumber = Number.parseInt(filePath.split('/').pop() ?? '', 10)
  if (Number.isFinite(attemptNumber)) REACTION_GIFS[attemptNumber] = url
}

const clamp = (min: number, value: number, max: number) => Math.min(max, Math.max(min, value))

interface Point {
  x: number
  y: number
}

export function LoveQuestion() {
  const go = usePhaseTransition()
  const reduced = useReducedMotion()
  const containerRef = useAutofocus([])

  // NO button state
  const [attempt, setAttempt] = useState(0) // completed taps, 0..MAX_ATTEMPTS
  const [noMessage, setNoMessage] = useState<string>('')
  const [vanishing, setVanishing] = useState(false)
  const [noMounted, setNoMounted] = useState(true)
  const [noCentre, setNoCentre] = useState<Point | null>(null)
  const lockRef = useRef(false)

  // YES celebration + relocation state
  const [celebrating, setCelebrating] = useState(false)
  const [yesCentred, setYesCentred] = useState(false)

  // Arena measurement — the flowers are positioned inside this box.
  const arenaRef = useRef<HTMLDivElement>(null)
  const [arena, setArena] = useState({ w: 0, h: 0 })

  useLayoutEffect(() => {
    const measure = () => {
      const rect = arenaRef.current?.getBoundingClientRect()
      if (rect) setArena({ w: rect.width, h: rect.height })
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (arenaRef.current) observer.observe(arenaRef.current)
    window.addEventListener('orientationchange', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('orientationchange', measure)
    }
  }, [])

  const { w: arenaW, h: arenaH } = arena

  /** Reaction GIF for the current attempt — the counter is the index, so `0.gif`
   *  waits on the untouched question, each tap answers with its own file, and the
   *  eighth and final tap shows `8.gif` beside the last message. Derived from
   *  `attempt`, so it can never drift out of sync with the message or the
   *  attempt counter. */
  const reactionGif = REACTION_GIFS[attempt]

  // Both flowers are sized to the arena so they always fit comfortably.
  const buttonSize = arenaW ? clamp(84, arenaW * 0.34, 132) : 104
  const noScale = vanishing ? 0 : NO_SCALES[Math.min(attempt, MAX_ATTEMPTS - 1)]
  const visualNo = buttonSize * noScale

  /** Keeps a centre coordinate fully inside the arena (with edge padding). */
  const safeAxis = (value: number, half: number, extent: number) => {
    if (extent <= 0) return value
    const lo = EDGE_PAD + half
    const hi = extent - EDGE_PAD - half
    return hi <= lo ? extent / 2 : clamp(lo, value, hi)
  }

  const noHome: Point = { x: EDGE_PAD + buttonSize / 2, y: arenaH / 2 }
  const yesHome: Point = { x: arenaW - EDGE_PAD - buttonSize / 2, y: arenaH / 2 }
  const arenaCentre: Point = { x: arenaW / 2, y: arenaH / 2 }

  const noDisplay = noCentre ?? noHome
  const noCx = safeAxis(noDisplay.x, visualNo / 2, arenaW)
  const noCy = safeAxis(noDisplay.y, visualNo / 2, arenaH)

  const yesTarget = yesCentred ? arenaCentre : yesHome
  // Once NO is gone, YES grows — but never past what the arena can hold.
  const yesGrow = yesCentred && buttonSize
    ? Math.max(
        1,
        Math.min(
          YES_GROW,
          (arenaW - 2 * EDGE_PAD) / buttonSize,
          (arenaH - 2 * EDGE_PAD) / buttonSize,
        ),
      )
    : 1
  const yesCx = safeAxis(yesTarget.x, (buttonSize * yesGrow) / 2, arenaW)
  const yesCy = safeAxis(yesTarget.y, (buttonSize * yesGrow) / 2, arenaH)

  /** Pick a fresh spot for NO: on-screen, clear of YES, away from where it was. */
  const pickNoCentre = useCallback((): Point => {
    const half = (buttonSize * noScale) / 2
    let minX = EDGE_PAD + half
    let maxX = arenaW - EDGE_PAD - half
    let minY = EDGE_PAD + half
    let maxY = arenaH - EDGE_PAD - half
    if (maxX <= minX) minX = maxX = arenaW / 2
    if (maxY <= minY) minY = maxY = arenaH / 2

    // YES keeps its home spot for as long as NO exists, so measure against that.
    const yesNow = { x: arenaW - EDGE_PAD - buttonSize / 2, y: arenaH / 2 }
    const clearX = half + buttonSize / 2 // half-widths of NO + YES
    const clearY = half + buttonSize / 2 // figures are circular, so y matches x
    const minJump = Math.max(48, Math.min(arenaW, arenaH) * 0.22)
    const prev = noCentre ?? { x: EDGE_PAD + buttonSize / 2, y: arenaH / 2 }

    let best: Point | null = null
    let bestClearance = -Infinity
    for (let i = 0; i < 120; i += 1) {
      const candidate = {
        x: minX + Math.random() * (maxX - minX),
        y: minY + Math.random() * (maxY - minY),
      }
      // A square flower never touches YES when it is clear on either axis.
      const clearance = Math.max(
        Math.abs(candidate.x - yesNow.x) - clearX,
        Math.abs(candidate.y - yesNow.y) - clearY,
      )
      if (clearance > bestClearance) {
        bestClearance = clearance
        best = candidate
      }
      if (clearance < YES_GAP) continue // too close to YES — try again
      // land somewhere genuinely different
      if (Math.hypot(candidate.x - prev.x, candidate.y - prev.y) >= minJump) return candidate
    }
    // Extremely tight arena: fall back to the roomiest spot we saw.
    return best ?? { x: minX, y: minY }
  }, [arenaH, arenaW, buttonSize, noCentre, noScale])

  const handleNo = (fromKeyboard: boolean) => {
    if (lockRef.current) return
    if (attempt >= MAX_ATTEMPTS) return

    lockRef.current = true
    setNoMessage(site.noMessages[attempt])
    const next = attempt + 1
    setAttempt(next)

    // Flee to a new spot — but stay put for keyboard users so they are
    // not forced to chase a moving target.
    if (!fromKeyboard) setNoCentre(pickNoCentre())

    if (next >= MAX_ATTEMPTS) {
      // Final tap: show the last message, then let NO disappear for good
      // and bring YES to the middle of the arena.
      setVanishing(true)
      window.setTimeout(
        () => {
          setNoMounted(false)
          setYesCentred(true)
        },
        reduced ? 0 : 460,
      )
    }

    window.setTimeout(() => {
      lockRef.current = false
    }, 340)
  }

  const handleYes = () => {
    if (celebrating) return
    setCelebrating(true)
    window.setTimeout(
      () => {
        // Hand the real NO-button counter over to the winter celebration.
        go('winter', { noAttempts: attempt })
      },
      reduced ? 200 : 950,
    )
  }

  const noAriaLabel = `${site.noLabel} — attempt ${Math.min(attempt + 1, MAX_ATTEMPTS)} of ${MAX_ATTEMPTS}`

  return (
    <section
      ref={containerRef}
      aria-labelledby="love-title"
      className="relative flex h-full flex-1 flex-col overflow-hidden"
    >
      <div className="safe-bottom relative z-10 flex min-h-0 flex-1 flex-col">
        <h1
          id="love-title"
          data-autofocus
          tabIndex={-1}
          className="display shrink-0 pt-2 text-center leading-tight"
        >
          {site.loveQuestion}
        </h1>

        {/* NO-tap message and its reaction GIF — both sit in fixed-height rows
            directly under the question so the flowers below never shift, no
            matter how the text wraps or which reaction is showing. */}
        <div className="flex shrink-0 flex-col items-center px-3 pt-2">
          <div
            aria-live="polite"
            className="flex h-[7rem] w-full items-start justify-center text-center"
          >
            {noMessage && (
              <motion.div
                key={noMessage}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.32, ease: [0.22, 0.9, 0.32, 1] }}
                className="w-full"
              >
                <PaperCard tone="blush" className="relative p-3.5 text-center">
                  <TapeStrip tone="butter" className="-top-3 right-6 rotate-3" />
                  <p className="hand text-[1.15rem] text-cocoa">{noMessage}</p>
                </PaperCard>
              </motion.div>
            )}
          </div>

          {/* Reaction band — a constant reserved height keeps the arena (and the
              flowers inside it) perfectly still while the reaction swaps. Every
              counter value 0–8 has its own file, so the band only sits empty if
              one of them is missing. */}
          <div
            aria-hidden="true"
            className="flex h-[min(22dvh,9rem)] w-full shrink-0 items-center justify-center"
          >
            {reactionGif && (
              <img
                key={reactionGif}
                src={reactionGif}
                alt=""
                draggable={false}
                className="block h-full w-full object-contain"
              />
            )}
          </div>
        </div>

        {/* Arena — the flowers roam inside this measured box. */}
        <div ref={arenaRef} className="relative min-h-0 flex-1 overflow-hidden">
          {noMounted && (
            <LoveFlowerButton
              variant="no"
              size={buttonSize}
              label={site.noLabel}
              wiggleKey={attempt}
              onClick={(event) => handleNo(event.detail === 0)}
              disabled={vanishing}
              aria-label={noAriaLabel}
              style={{
                position: 'absolute',
                left: noCx - buttonSize / 2,
                top: noCy - buttonSize / 2,
                zIndex: 20,
                transform: `scale(${noScale})`,
                opacity: vanishing ? 0 : 1,
                pointerEvents: vanishing ? 'none' : undefined,
                transition:
                  'left 420ms var(--ease-soft), top 420ms var(--ease-soft), transform 420ms var(--ease-soft), opacity 320ms var(--ease-soft)',
              }}
            />
          )}

          <LoveFlowerButton
            variant="yes"
            size={buttonSize}
            label={site.yesLabel}
            onClick={handleYes}
            disabled={celebrating}
            aria-label={`${site.yesLabel} — ${site.loveQuestion}`}
            style={{
              position: 'absolute',
              left: yesCx - buttonSize / 2,
              top: yesCy - buttonSize / 2,
              zIndex: 10,
              transform: `scale(${yesGrow})`,
              transformOrigin: 'center center',
              transition:
                'left 520ms var(--ease-soft), top 520ms var(--ease-soft), transform 520ms var(--ease-soft)',
            }}
          />

          {celebrating && (
            <CelebrationBurst centerX={yesCx} centerY={yesCy} reduced={reduced} />
          )}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------
   Deterministic celebration burst — petals + hearts fly out
   from the YES flower. Purely decorative; suppressed under
   reduced motion.
   ------------------------------------------------------------ */

const BURST_PARTICLES = [
  { angle: 0, distance: 180, delay: 0, type: 'petal', color: 'var(--color-butter)' },
  { angle: 36, distance: 160, delay: 0.05, type: 'heart', color: 'var(--color-heart)' },
  { angle: 72, distance: 190, delay: 0.1, type: 'petal', color: 'var(--color-blush)' },
  { angle: 108, distance: 150, delay: 0.15, type: 'heart', color: 'var(--color-heart-deep)' },
  { angle: 144, distance: 170, delay: 0.2, type: 'petal', color: 'var(--color-butter-deep)' },
  { angle: 180, distance: 160, delay: 0.25, type: 'heart', color: 'var(--color-blush)' },
  { angle: 216, distance: 180, delay: 0.3, type: 'petal', color: 'var(--color-lilac)' },
  { angle: 252, distance: 155, delay: 0.35, type: 'heart', color: 'var(--color-heart)' },
  { angle: 288, distance: 175, delay: 0.4, type: 'petal', color: 'var(--color-sky)' },
  { angle: 324, distance: 165, delay: 0.45, type: 'heart', color: 'var(--color-blush-deep)' },
]

function CelebrationBurst({
  centerX,
  centerY,
  reduced,
}: {
  centerX: number
  centerY: number
  reduced: boolean
}) {
  if (reduced) return null

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {BURST_PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
            y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
            scale: 0.3,
            rotate: p.angle + 360,
            opacity: 0,
          }}
          transition={{ duration: 0.8, delay: p.delay, ease: [0.22, 0.9, 0.32, 1] }}
          className="absolute"
          style={{
            width: p.type === 'petal' ? 16 : 14,
            height: p.type === 'petal' ? 24 : 14,
            left: centerX,
            top: centerY,
            transformOrigin: 'center center',
          }}
        >
          {p.type === 'petal' ? (
            <svg
              viewBox="0 0 40 60"
              className="h-full w-full"
              fill={p.color}
              stroke="rgb(91 70 54 / 0.16)"
              strokeWidth="1.4"
            >
              <path d="M20 2 C31 15 33 40 20 58 C7 40 9 15 20 2 Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-full w-full" fill={p.color}>
              <path d="M12 20.4c-1-.8-8.2-5.2-9.9-9.6C.6 7.2 2.9 4 6.2 4c2.2 0 4.3 1.3 5.8 3.4C13.5 5.3 15.6 4 17.8 4c3.3 0 5.6 3.2 4.1 6.8-1.7 4.4-8.9 8.8-9.9 9.6Z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  )
}
