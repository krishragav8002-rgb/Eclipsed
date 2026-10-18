import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { LETTER_COPY, LETTER_PAGES } from '../../content/phase2.config'
import { useAutofocus } from '../../hooks/useAutofocus'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Doodle } from '../scrapbook/Doodle'
import { DepthField, type DepthBand } from '../scrapbook/DepthField'
import { ParticleField, SketchScatter, type Particle, type ScatterItem } from '../scrapbook/SketchScatter'
import { Motif, type MotifName } from '../scrapbook/sketches'
import { TapeStrip, type TapeTone } from '../scrapbook/TapeStrip'
import { GiftShell } from './GiftShell'

const SOFT_EASE: [number, number, number, number] = [0.22, 0.9, 0.32, 1]

/** How long the envelope takes to unfold before the first page takes over. */
const OPEN_MS = 760

type Stage = 'closed' | 'opening' | 'open'

/**
 * The golden sketchbook around the letter: hand-drawn flowers, paper clips and
 * stamps, with a little golden dust and a few paper flecks drifting up through
 * the scene. Kept to the screen's margins and bands so the painted page stays
 * legible, and hand-authored so the scatter is the same every visit.
 */
const LETTER_SCATTER: readonly ScatterItem[] = [
  { name: 'stamp', top: '9%', left: '2%', size: '2.5rem', rotate: -8, opacity: 0.34, className: 'text-cocoa-soft', drift: 'sway', duration: 8.5 },
  { name: 'envelope', top: '7%', left: '88%', size: '2.3rem', rotate: 9, opacity: 0.33, className: 'text-cocoa-soft', drift: 'breathe' },
  { name: 'sparkleCluster', top: '6%', left: '22%', size: '1.6rem', rotate: -6, opacity: 0.4, className: 'text-butter-deep', drift: 'twinkle', delay: 0.6 },
  { name: 'flower', top: '30%', left: '1.5%', size: '2rem', rotate: 6, opacity: 0.32, className: 'text-blush-deep', drift: 'sway', delay: 0.4 },
  { name: 'snowflake', top: '26%', left: '91%', size: '1.9rem', rotate: -10, opacity: 0.3, className: 'text-blush-deep', drift: 'breathe', delay: 1.2 },
  { name: 'dotsGrid', top: '43%', left: '0%', size: '2.8rem', rotate: -3, opacity: 0.3, className: 'text-cocoa-soft' },
  { name: 'heart', top: '48%', left: '92%', size: '1.7rem', rotate: 8, opacity: 0.36, className: 'text-blush-deep', drift: 'twinkle', delay: 0.9 },
  { name: 'paperclip', top: '60%', left: '2.5%', size: '2.1rem', rotate: -14, opacity: 0.3, className: 'text-cocoa-soft', drift: 'breathe', delay: 0.7 },
  { name: 'bow', top: '57%', left: '89%', size: '2.2rem', rotate: 7, opacity: 0.34, className: 'text-butter-deep', drift: 'sway', delay: 1.1 },
  { name: 'leaf', top: '72%', left: '3%', size: '2.2rem', rotate: 12, opacity: 0.28, className: 'text-sage-deep', drift: 'sway', delay: 0.3 },
  { name: 'squiggle', top: '76%', left: '86%', size: '3rem', rotate: -4, opacity: 0.32, className: 'text-cocoa-soft', drift: 'drift' },
  { name: 'star', top: '88%', left: '9%', size: '1.5rem', rotate: -8, opacity: 0.4, className: 'text-butter-deep', drift: 'twinkle', delay: 1.4 },
  { name: 'asterisk', top: '90%', left: '20%', size: '1.4rem', rotate: 10, opacity: 0.34, className: 'text-cocoa-soft', drift: 'drift', delay: 0.5 },
  { name: 'swirl', top: '88%', left: '79%', size: '2.2rem', rotate: 6, opacity: 0.3, className: 'text-butter-deep', drift: 'breathe', delay: 0.8 },
]

/** Golden dust and a few torn paper flecks, drifting up the whole screen. */
const LETTER_MOTES: readonly Particle[] = [
  { top: '22%', left: '12%', size: '0.3rem', opacity: 0.7, className: 'bg-butter-deep shadow-[0_0_8px_2px_rgba(242,201,76,0.5)]', delay: 0, duration: 9 },
  { top: '38%', left: '82%', size: '0.24rem', opacity: 0.6, className: 'bg-butter-deep shadow-[0_0_7px_2px_rgba(242,201,76,0.45)]', delay: 1.6, duration: 10.5 },
  { top: '54%', left: '18%', size: '0.22rem', opacity: 0.55, className: 'bg-butter-deep', delay: 3.1, duration: 8.5 },
  { top: '66%', left: '72%', size: '0.32rem', opacity: 0.65, className: 'bg-butter-deep shadow-[0_0_8px_2px_rgba(242,201,76,0.4)]', delay: 0.7, duration: 11 },
  { top: '80%', left: '30%', size: '0.2rem', opacity: 0.5, className: 'bg-blush-deep', delay: 2.4, duration: 9.5 },
  { top: '12%', left: '64%', size: '0.26rem', opacity: 0.6, className: 'bg-butter-deep', delay: 4.2, duration: 10 },
  { top: '47%', left: '46%', size: '0.18rem', opacity: 0.45, className: 'bg-butter-deep', delay: 5.5, duration: 12 },
  { top: '28%', left: '2%', size: '0.36rem', opacity: 0.4, className: 'bg-paper/80', shape: 'fleck', delay: 1.1, duration: 11.5 },
  { top: '62%', left: '94%', size: '0.4rem', opacity: 0.38, className: 'bg-paper/80', shape: 'fleck', delay: 2.9, duration: 10.5 },
  { top: '86%', left: '62%', size: '0.34rem', opacity: 0.35, className: 'bg-paper/80', shape: 'fleck', delay: 4.6, duration: 12.5 },
]

/**
 * The screen behind the sketchbook's own depth: distant golden specks that only
 * twinkle, warmer dust rising through the middle distance, and a near band of
 * torn paper flecks with the odd sketched spark or leaf drifting past. Bands
 * wander at different rates, so the warm air around the letter has some real
 * distance to it.
 */
const LETTER_DEPTH: readonly DepthBand[] = [
  {
    depth: 'far',
    parallax: 'slow',
    motes: [
      { top: '14%', left: '18%', size: '0.15rem', opacity: 0.6, className: 'bg-butter-deep shadow-[0_0_7px_2px_rgba(242,201,76,0.45)]', twinkle: true, duration: 5.6 },
      { top: '9%', left: '58%', size: '0.16rem', opacity: 0.62, className: 'bg-butter-deep shadow-[0_0_7px_2px_rgba(242,201,76,0.4)]', twinkle: true, delay: 1.3, duration: 6.2 },
      { top: '26%', left: '84%', size: '0.14rem', opacity: 0.55, className: 'bg-butter-deep', twinkle: true, delay: 2.6, duration: 7 },
      { top: '44%', left: '8%', size: '0.15rem', opacity: 0.5, className: 'bg-blush-deep/80 shadow-[0_0_6px_2px_rgba(232,154,171,0.4)]', twinkle: true, delay: 0.7, duration: 6.6 },
      { top: '60%', left: '92%', size: '0.14rem', opacity: 0.5, className: 'bg-butter-deep', twinkle: true, delay: 3.4, duration: 7.4 },
      { top: '72%', left: '34%', size: '0.16rem', opacity: 0.55, className: 'bg-butter-deep shadow-[0_0_7px_2px_rgba(242,201,76,0.35)]', twinkle: true, delay: 1.9, duration: 5.9 },
      { top: '86%', left: '68%', size: '0.14rem', opacity: 0.48, className: 'bg-blush-deep/75', twinkle: true, delay: 4.1, duration: 7.8 },
      { top: '36%', left: '48%', size: '0.13rem', opacity: 0.45, className: 'bg-butter-deep/80', twinkle: true, delay: 5.2, duration: 8.4 },
    ],
  },
  {
    depth: 'mid',
    parallax: 'mid',
    motes: [
      { top: '20%', left: '26%', size: '0.22rem', opacity: 0.5, className: 'bg-butter-deep', delay: 0.4, duration: 10.5 },
      { top: '38%', left: '70%', size: '0.2rem', opacity: 0.45, className: 'bg-butter-deep/90', delay: 2.1, duration: 12 },
      { top: '52%', left: '14%', size: '0.24rem', opacity: 0.48, className: 'bg-blush-deep/80', delay: 3.3, duration: 11 },
      { top: '66%', left: '56%', size: '0.2rem', opacity: 0.42, className: 'bg-butter-deep', delay: 1.1, duration: 12.5 },
      { top: '30%', left: '88%', size: '0.18rem', opacity: 0.4, className: 'bg-cocoa-soft/60', delay: 4.5, duration: 13 },
      { top: '78%', left: '24%', size: '0.22rem', opacity: 0.44, className: 'bg-butter-deep/85', delay: 5.7, duration: 11.5 },
      { top: '12%', left: '40%', size: '0.18rem', opacity: 0.4, className: 'bg-blush-deep/70', delay: 6.4, duration: 12.8 },
      { top: '90%', left: '80%', size: '0.2rem', opacity: 0.42, className: 'bg-butter-deep/80', delay: 2.8, duration: 13.2 },
    ],
  },
  {
    depth: 'near',
    parallax: 'near',
    motes: [
      { top: '24%', left: '4%', size: '0.34rem', opacity: 0.36, className: 'bg-paper/90', shape: 'fleck', delay: 1.5, duration: 12.5 },
      { top: '58%', left: '94%', size: '0.4rem', opacity: 0.34, className: 'bg-paper/85', shape: 'fleck', delay: 3.1, duration: 13.5 },
      { top: '84%', left: '42%', size: '0.32rem', opacity: 0.3, className: 'bg-paper/80', shape: 'fleck', delay: 5.3, duration: 14.5 },
      { top: '34%', left: '30%', size: '0.9rem', opacity: 0.22, className: 'text-butter-deep/60', sketch: 'spark', duration: 16 },
      { top: '70%', left: '86%', size: '1rem', opacity: 0.2, className: 'text-sage-deep/50', sketch: 'leaf', delay: 2.7, duration: 18 },
      { top: '48%', left: '62%', size: '0.28rem', opacity: 0.34, className: 'bg-butter-deep/80 shadow-[0_0_9px_3px_rgba(242,201,76,0.3)]', delay: 0.8, duration: 11.2 },
    ],
  },
]

interface PageTrim {
  tapes: readonly { tone: TapeTone; className: string }[]
  corner: { name: MotifName; className: string }
  edge: { name: MotifName; className: string }
}

/**
 * Each page of the letter is trimmed a little differently — different tape,
 * different pressed details in the corners — so flicking through feels like
 * turning over real scrapbook sheets rather than re-reading one template.
 */
const PAGE_TRIMS: readonly PageTrim[] = [
  {
    tapes: [
      { tone: 'butter', className: '-top-3 left-6 -rotate-3' },
      { tone: 'blush', className: '-top-3 right-6 rotate-2' },
    ],
    corner: { name: 'flower', className: 'right-3 top-4 w-6 text-blush-deep/55' },
    edge: { name: 'swirl', className: 'bottom-2 left-3 w-7 text-butter-deep/45' },
  },
  {
    tapes: [{ tone: 'blush', className: '-top-3 left-1/2 -translate-x-1/2 rotate-1' }],
    corner: { name: 'envelope', className: 'right-3 top-4 w-6 text-cocoa-soft' },
    edge: { name: 'leaf', className: 'bottom-2 left-3 w-7 text-sage-deep/55' },
  },
  {
    tapes: [
      { tone: 'butter', className: '-top-3 left-5 rotate-2' },
      { tone: 'butter', className: '-bottom-3 right-7 -rotate-3' },
    ],
    corner: { name: 'bow', className: 'right-3 top-5 w-6 text-butter-deep/60' },
    edge: { name: 'paperclip', className: 'bottom-3 left-3 w-5 -rotate-12 text-cocoa-soft' },
  },
  {
    tapes: [
      { tone: 'blush', className: '-top-3 left-4 -rotate-2' },
      { tone: 'butter', className: '-top-3 right-5 rotate-3' },
    ],
    corner: { name: 'heart', className: 'right-3 top-4 w-5 text-blush-deep/60' },
    edge: { name: 'snowflake', className: 'bottom-2 left-3 w-6 text-butter-deep/55' },
  },
]

/**
 * Gift one — a warm paper letter in a golden sketchbook.
 *
 * It arrives closed under a glowing wax seal. Tapping the seal unfolds the
 * envelope (the flap lifts, the note rises) and the letter opens onto separate
 * pages, never one long scrolling document. Every word lives in `LETTER_PAGES`;
 * every decoration is drawn in CSS and SVG, so nothing here needs a network.
 */
export function LetterGift({ onBack }: { onBack: () => void }) {
  const reduced = useReducedMotion()
  const [stage, setStage] = useState<Stage>('closed')
  const [page, setPage] = useState(0)
  /** which way the next sheet flies in from: forward a page, or back one */
  const [turn, setTurn] = useState<1 | -1>(1)

  // Announce the page whenever it changes (and the seal while it is still shut).
  const contentRef = useAutofocus([stage, page])

  const lastPage = LETTER_PAGES.length - 1
  const isLast = page >= lastPage
  const isFirst = page <= 0
  const current = LETTER_PAGES[page]
  const trim = PAGE_TRIMS[page % PAGE_TRIMS.length]
  const opening = stage === 'opening'
  const isOpen = stage === 'open'

  /** Turn to a page, remembering which way, so the sheet slides in from that side. */
  function goToPage(next: number) {
    const target = Math.max(0, Math.min(next, lastPage))
    if (target === page) return
    setTurn(target > page ? 1 : -1)
    setPage(target)
  }

  // Let the envelope finish unfolding before the first page takes over.
  useEffect(() => {
    if (stage !== 'opening') return
    const id = window.setTimeout(() => setStage('open'), reduced ? 0 : OPEN_MS)
    return () => window.clearTimeout(id)
  }, [stage, reduced])

  /** one motion value per animated envelope part */
  const flapTransition = { duration: reduced ? 0.01 : 0.52, ease: SOFT_EASE }

  return (
    <GiftShell
      tone="letter"
      eyebrow={LETTER_COPY.eyebrow}
      title={LETTER_COPY.title}
      backLabel={LETTER_COPY.backLabel}
      onBack={onBack}
      decor={
        <>
          <DepthField bands={LETTER_DEPTH} className="z-0" />
          <SketchScatter items={LETTER_SCATTER} className="z-0" />
        </>
      }
      controls={
        isOpen ? (
          <div className="mb-1.5 flex flex-col items-center gap-1">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                className="letter-btn"
                onClick={() => goToPage(page - 1)}
                disabled={isFirst}
              >
                <Doodle name="arrow" className="w-4 -scale-x-100" />
                {LETTER_COPY.prevLabel}
              </button>
              <button
                type="button"
                className="letter-btn"
                onClick={() => goToPage(page + 1)}
                disabled={isLast}
              >
                {LETTER_COPY.turnLabel}
                <Doodle name="arrow" className="w-4" />
              </button>
            </div>
          </div>
        ) : undefined
      }
    >
      <section ref={contentRef} className="relative flex min-h-0 flex-1 flex-col">
        {isOpen ? (
          <motion.div
            key="open"
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduced ? 0.01 : 0.45, ease: SOFT_EASE }}
            className="relative flex min-h-0 flex-1 flex-col"
          >
            {/* a soft sheet of sunlight and two sketch layers behind the page */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 rounded-[28px]"
              style={{
                background:
                  'radial-gradient(70% 55% at 18% 0%, rgba(251,226,138,0.5) 0%, rgba(251,226,138,0) 70%), radial-gradient(60% 50% at 96% 90%, rgba(232,154,171,0.28) 0%, rgba(232,154,171,0) 68%)',
              }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-1.5 -rotate-[0.7deg] rounded-[22px] border border-butter-deep/25 bg-paper/70"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-1 rotate-[0.5deg] rounded-[22px] border border-cocoa/10 bg-[#fffdf6]"
            />

            <div className="letter-sheet paper-tex relative flex min-h-0 flex-1 flex-col px-5 pb-3 pt-7">
              {/* golden dust and paper flecks, drifting up over the page itself */}
              <ParticleField items={LETTER_MOTES} className="rounded-[inherit]" />

              {trim.tapes.map((tape) => (
                <TapeStrip key={tape.className} tone={tape.tone} className={tape.className} />
              ))}

              <Motif
                name={trim.corner.name}
                className={`pointer-events-none absolute ${trim.corner.className}`}
              />
              <Motif
                name={trim.edge.name}
                className={`pointer-events-none absolute ${trim.edge.className}`}
              />
              <Doodle name="sparkle" className="absolute bottom-4 right-4 w-4 text-butter-deep/50" />

              {/* a hand-inked page stamp, so every sheet is numbered */}
              <span
                aria-hidden="true"
                className="absolute bottom-3.5 left-3.5 grid size-8 -rotate-6 place-items-center rounded-full border border-dashed border-cocoa/35 text-[0.6rem] font-extrabold text-cocoa-soft"
              >
                {page + 1}
              </span>

              <div
                className="no-scrollbar relative z-10 min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-1"
                aria-live="polite"
              >
                <motion.div
                  key={page}
                  initial={
                    reduced ? { opacity: 1 } : { opacity: 0, x: 26 * turn, rotate: -1.6 * turn }
                  }
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ duration: reduced ? 0.01 : 0.46, ease: SOFT_EASE }}
                >
                  {current.heading && <p className="eyebrow text-cocoa-soft">{current.heading}</p>}
                  <p
                    data-autofocus
                    tabIndex={-1}
                    className="hand-letter mt-2 whitespace-pre-line text-cocoa"
                  >
                    {current.body}
                  </p>
                  {current.signOff && (
                    <p className="hand-letter mt-4 pb-1 pr-2 text-right text-cocoa">
                      {current.signOff}
                    </p>
                  )}
                </motion.div>
              </div>

              <div className="mt-2 flex items-center justify-center gap-1.5">
                {LETTER_PAGES.map((_, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className={`size-1.5 rounded-full ${i === page ? 'bg-butter-deep' : 'bg-cocoa/20'}`}
                  />
                ))}
                <span className="ml-1.5 text-[0.66rem] font-extrabold uppercase tracking-[0.14em] text-cocoa-soft">
                  {LETTER_COPY.pageLabel} {page + 1} / {LETTER_PAGES.length}
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="closed"
            initial={false}
            animate={
              opening
                ? { opacity: [1, 1, 0], scale: [1, 1.015, 0.97] }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: reduced ? 0.01 : 0.76, times: [0, 0.6, 1], ease: SOFT_EASE }}
            className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-2 pt-8"
          >
            <button
              type="button"
              onClick={() => setStage(reduced ? 'open' : 'opening')}
              disabled={opening}
              aria-label={LETTER_COPY.sealLabel}
              className="relative w-full max-w-[20rem] cursor-pointer"
            >
              <span className="envelope relative block aspect-[3/2] w-full">
                {/* the note, waiting inside the pocket */}
                <motion.span
                  aria-hidden="true"
                  initial={false}
                  animate={opening ? { y: -30, opacity: 1 } : { y: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0.01 : 0.5, delay: reduced ? 0 : 0.2, ease: SOFT_EASE }}
                  className="absolute inset-x-5 bottom-3 h-[52%] rounded-t-[5px] border border-butter-deep/40 bg-[linear-gradient(180deg,#fffdf5,#fbeecf)] shadow-[0_-3px_10px_rgba(107,79,58,0.22)]"
                />

                {/* the folded front of the envelope */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[16px]"
                  style={{
                    clipPath: 'polygon(0 0, 54% 50%, 0 100%)',
                    background: 'linear-gradient(90deg, #e3c684 0%, #f7e6bd 100%)',
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[16px]"
                  style={{
                    clipPath: 'polygon(100% 0, 46% 50%, 100% 100%)',
                    background: 'linear-gradient(270deg, #e3c684 0%, #f7e6bd 100%)',
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[16px]"
                  style={{
                    clipPath: 'polygon(0 100%, 50% 43%, 100% 100%)',
                    background: 'linear-gradient(0deg, #d9b568 0%, #f7e6bd 100%)',
                  }}
                />

                {/* the flap, which lifts when the seal breaks */}
                <motion.span
                  aria-hidden="true"
                  initial={false}
                  animate={{ rotateX: opening ? -166 : 0 }}
                  transition={flapTransition}
                  className="absolute inset-x-0 top-0 h-[64%] origin-top rounded-t-[16px]"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    background: 'linear-gradient(180deg, #fdf4dc 0%, #e8cb84 100%)',
                    filter: 'drop-shadow(0 3px 4px rgba(150,102,20,0.4))',
                    transformPerspective: 900,
                  }}
                />

                {/* the wax seal, with its shine and its patient little pulse */}
                <motion.span
                  initial={false}
                  animate={opening ? { scale: 0.35, opacity: 0, rotate: -20 } : { scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ duration: reduced ? 0.01 : 0.3, ease: SOFT_EASE }}
                  className="absolute left-1/2 top-[52%] -ml-8 -mt-8 grid size-16 place-items-center"
                >
                  <span aria-hidden="true" className="wax-seal absolute inset-0 rounded-full" />
                  <span aria-hidden="true" className="wax-shine absolute inset-[14%] rounded-full" />
                  <span aria-hidden="true" className="relative text-[1.4rem] leading-none">
                    💜
                  </span>
                </motion.span>

                <TapeStrip tone="butter" className="-top-2 left-1/2 -translate-x-1/2 -rotate-2" />
              </span>
            </button>

            <p className="hand text-center text-[1.2rem] text-cocoa">{LETTER_COPY.closedHint}</p>

            <div className="pointer-events-none absolute inset-x-4 bottom-2 flex items-center justify-between opacity-70">
              <Doodle name="heart" className="w-5 text-blush-deep/60" />
              <Doodle name="star" className="w-4 text-butter-deep/70" />
              <Doodle name="sparkle" className="w-4 text-blush-deep/50" />
            </div>
          </motion.div>
        )}
      </section>
    </GiftShell>
  )
}
