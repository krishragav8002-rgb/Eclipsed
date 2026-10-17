import { useEffect, useState, type ComponentType } from 'react'
import { motion } from 'motion/react'
import type { GiftCardLayout } from '../../content/phase2.config'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { GiftId } from '../../state/experienceReducer'
import { Motif, MysteryMark, type MotifName } from '../scrapbook/sketches'
import { TapSparkles } from '../scrapbook/TapSparkles'
import { LetterArt, PlaylistArt, VideoArt } from './giftArt'

const ART: Record<GiftId, ComponentType<{ className?: string }>> = {
  letter: LetterArt,
  playlist: PlaylistArt,
  video: VideoArt,
}

interface Decal {
  name: MotifName
  className: string
}

/**
 * The little pressed details each card wears, in its own gift's language —
 * envelopes and paper clips for the letter, notes and records for the playlist,
 * film and moons for the film. They sit in the corners the mark and the title
 * never reach, so nothing important is ever covered.
 */
const DECALS: Record<GiftId, readonly Decal[]> = {
  letter: [
    { name: 'envelope', className: 'left-[8%] top-[9%] w-[22%] opacity-55' },
    { name: 'paperclip', className: 'right-[9%] top-[9%] w-[15%] -rotate-12 opacity-50' },
  ],
  playlist: [
    { name: 'record', className: 'left-[8%] top-[9%] w-[18%] opacity-55' },
    { name: 'musicNote', className: 'right-[9%] top-[9%] w-[19%] rotate-6 opacity-60' },
    { name: 'heart', className: 'left-[7%] top-[46%] w-[12%] -rotate-6 opacity-45' },
  ],
  video: [
    { name: 'filmStrip', className: 'left-[7%] top-[10%] w-[36%] opacity-45' },
    { name: 'crescent', className: 'right-[9%] top-[9%] w-[15%] opacity-60' },
    { name: 'star', className: 'left-[8%] top-[46%] w-[11%] rotate-6 opacity-50' },
  ],
}

/** Sparkles that hover around the mystery mark while a gift is still shut. */
const MARK_SPARKS = [
  { name: 'spark', className: 'right-[15%] top-[24%] w-[10%]' },
  { name: 'sparkleCluster', className: 'bottom-[21%] left-[16%] w-[13%]' },
  { name: 'star', className: 'right-[20%] bottom-[27%] w-[8%]' },
] as const satisfies readonly Decal[]

interface GiftCardProps {
  id: GiftId
  title: string
  layout: GiftCardLayout
  /** already opened this visit — keeps its soft glow */
  opened: boolean
  /** the visitor has just come back from this gift, so the card reveals itself */
  justReturned: boolean
  /** open this gift */
  onOpen: () => void
}

/**
 * One gift in the gallery: a small scrapbook sheet floating in the night sky,
 * wearing the colours of the world behind it.
 *
 * Until the gift is opened the card shows a big hand-drawn question mark — a
 * little mystery, never a spoiler — and only swaps to the gift's own
 * illustration and title once the visitor has actually been in and come back
 * out. Both are keyed off `justReturned`, so the reveal plays the moment the
 * gallery returns and the card keeps its glow from then on.
 *
 * The whole card is a single button, so the touch target is the entire sheet.
 * The tilt, the float and the paper texture live on wrapper elements, which
 * leaves the button's own transform free for tap feedback.
 */
export function GiftCard({ id, title, layout, opened, justReturned, onOpen }: GiftCardProps) {
  const reduced = useReducedMotion()
  const [burst, setBurst] = useState(0)
  const Art = ART[id]

  // Coming back from the gift is the reveal, so it deserves the same little
  // sparkle a tap gets.
  useEffect(() => {
    if (justReturned && !reduced) setBurst((n) => n + 1)
  }, [justReturned, reduced])

  return (
    <div className={`gift-card-frame gift-card-frame--${id} relative shrink-0 ${layout.insetClass}`}>
      <div className="h-full w-full" style={{ transform: `rotate(${layout.rotate}deg)` }}>
        <div
          className="card-float w-full"
          style={{
            animationDuration: `${layout.floatDuration}s`,
            animationDelay: `${layout.floatDelay}s`,
          }}
        >
          <div className="relative h-full w-full">
            {/* layered paper: a second sheet peeking out behind the card */}
            <span
              aria-hidden="true"
              className="absolute inset-0 translate-x-1 translate-y-1.5 rotate-[1.6deg] rounded-[22px] border"
              style={{
                background: 'var(--card-backing)',
                borderColor: 'var(--card-backing)',
              }}
            />

            <motion.button
              type="button"
              onClick={() => {
                setBurst((n) => n + 1)
                onOpen()
              }}
              whileTap={reduced ? undefined : { scale: 0.96 }}
              aria-label={opened ? `Open ${title}` : 'Open this gift'}
              className={`paper-tex gift-card cursor-pointer sm:p-4 ${opened ? 'gift-card-open' : ''}`}
            >
              {/* washi tape, tinted for this gift */}
              <span
                aria-hidden="true"
                className="tape-stripe absolute -top-2 left-1/2 h-4 w-20 -translate-x-1/2 -rotate-2 rounded-[3px] opacity-95 shadow-tape sm:h-5 sm:w-24"
                style={{ backgroundColor: 'var(--card-tape)' }}
              />

              {/* stitched inner border */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-1.5 rounded-[17px] border border-dashed border-current opacity-25"
                style={{ color: 'var(--card-ink)' }}
              />

              {/* the pressed details, in this gift's palette */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ color: 'var(--card-accent)' }}
              >
                {DECALS[id].map((decal) => (
                  <Motif key={decal.name} name={decal.name} className={`absolute ${decal.className}`} />
                ))}
                {id === 'letter' ? (
                  <span
                    className="wax-dot absolute left-[7%] top-[45%] aspect-square w-[13%] rotate-6 rounded-full opacity-70"
                  />
                ) : null}
              </span>

              {opened ? (
                <>
                  <motion.span
                    key={justReturned ? 'medal-return' : 'medal'}
                    aria-hidden="true"
                    initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: reduced ? 0.01 : 0.5, ease: [0.34, 1.45, 0.64, 1] }}
                    className="grid h-[42%] shrink-0 aspect-square place-items-center rounded-full text-midnight"
                    style={{
                      background: 'var(--card-medal)',
                      boxShadow:
                        'inset 0 1px 0 rgb(255 255 255 / 0.85), 0 6px 14px rgb(41 32 68 / 0.26)',
                    }}
                  >
                    <Art className="h-[62%] w-[62%]" />
                  </motion.span>

                  <motion.span
                    key={justReturned ? 'title-return' : 'title'}
                    initial={reduced ? false : { opacity: 0, y: 6, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: reduced ? 0.01 : 0.45, ease: [0.34, 1.5, 0.64, 1] }}
                    className="max-w-[96%] text-center text-[0.8rem] font-extrabold leading-tight sm:text-[0.95rem]"
                    style={{ color: 'var(--card-ink)' }}
                  >
                    {title}
                  </motion.span>
                </>
              ) : (
                <>
                  <span className="relative grid h-[58%] w-full place-items-center">
                    <span
                      aria-hidden="true"
                      className="mystery-halo absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                    />
                    <MysteryMark
                      className="mystery-mark anim-mark relative z-10 h-full w-auto"
                      style={{ color: 'var(--card-accent)' }}
                    />
                  </span>

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{ color: 'var(--card-accent)' }}
                  >
                    {MARK_SPARKS.map((spark) => (
                      <Motif
                        key={spark.name}
                        name={spark.name}
                        className={`anim-twinkle absolute ${spark.className}`}
                      />
                    ))}
                  </span>
                </>
              )}

              {/* a little sparkle burst when the card is tapped — and again when
                  the visitor comes back and the card reveals itself */}
              {burst > 0 && !reduced ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20"
                  style={{ color: 'var(--card-accent)' }}
                >
                  <TapSparkles key={burst} />
                </span>
              ) : null}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
