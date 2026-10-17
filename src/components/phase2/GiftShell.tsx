import type { ReactNode } from 'react'
import { useAutofocus } from '../../hooks/useAutofocus'
import { FlowerButton } from '../ui/FlowerButton'
import { SnowFall } from '../winter/SnowFall'
import { Doodle } from '../scrapbook/Doodle'
import { TapeStrip } from '../scrapbook/TapeStrip'
import { Sketch } from '../scrapbook/sketches'
import { BackdropScene } from './BackdropScene'

export type GiftTone = 'letter' | 'red' | 'moon'

/** How the gift's heading is dressed for its world. */
export type GiftHeaderVariant = 'plain' | 'label' | 'marquee'

const BACKGROUNDS: Record<GiftTone, string> = {
  letter: 'letter-bg text-cocoa',
  red: 'playlist-bg text-rose-ink',
  moon: 'video-bg text-moonwhite',
}

const TITLE_COLOURS: Record<GiftTone, string> = {
  letter: 'text-cocoa',
  red: 'text-rose-ink',
  moon: 'text-moonwhite',
}

const EYEBROW_COLOURS: Record<GiftTone, string> = {
  letter: 'text-cocoa-soft',
  red: 'text-rose-ink/70',
  moon: 'text-dream-lavender/85',
}

const HEADER_SHADOWS: Record<GiftTone, string> = {
  letter: '0 1px 0 rgba(255,255,255,0.7)',
  red: '0 1px 0 rgba(255,255,255,0.75)',
  moon: '0 0 26px rgba(199,177,242,0.6)',
}

/** The heading's own type scale, tuned per variant. */
const TITLE_SIZES: Record<GiftHeaderVariant, string> = {
  plain: 'mt-0.5 text-[clamp(1.25rem,5.4vw,1.75rem)]',
  label: 'mt-0.5 text-[clamp(1.2rem,5.2vw,1.7rem)]',
  marquee: 'mt-0.5 text-[clamp(1.25rem,5.4vw,1.85rem)] tracking-[0.06em]',
}

interface GiftShellProps {
  tone: GiftTone
  eyebrow: string
  title: string
  backLabel: string
  onBack: () => void
  /** width of the centred content column (defaults to a readable measure) */
  contentWidth?: string
  /** decorative bits that sit inside the heading, under the title */
  headerExtra?: ReactNode
  /** controls that sit just above the back button (e.g. "Turn the page ♡") */
  controls?: ReactNode
  /** how the heading is dressed — a plain title, a taped journal label or a cinema marquee */
  headerVariant?: GiftHeaderVariant
  /**
   * Run this screen with no ambient motion at all: no drifting snow, no
   * breathing blooms, no twinkling spark in the heading. The film screen asks
   * for this so the phone is left free to decode the video.
   */
  still?: boolean
  /**
   * Full-bleed decoration for this world: scattered sketches, drifting motes,
   * anything that should reach the edges of the screen and sit behind the
   * content. Purely decorative (every layer must be pointer-events-none and
   * aria-hidden), and rendered in front of the shared backdrop atmosphere and
   * behind the snow, so flakes fall in front of it.
   */
  decor?: ReactNode
  children: ReactNode
}

/**
 * The shared frame for every gift: a full-screen themed backdrop that reaches
 * every edge of the viewport, gentle snow, a title, whatever the gift needs in
 * the middle, and the same "Back to the gifts ♡" control at the bottom of all
 * three screens.
 *
 * Pass `still` on a screen that must not animate — the film does, so the phone
 * has nothing to composite while the video plays — and the snow, the drifting
 * blooms and the heading's twinkle are all left out.
 *
 * Only the *content* is held to a readable column — the painted background and
 * the `decor` layer always bleed to the screen edges, so each gift reads as its
 * own world. The heading takes focus when the screen mounts, so the gift is
 * announced the same way every phase of the site is.
 */
export function GiftShell({
  tone,
  eyebrow,
  title,
  backLabel,
  onBack,
  contentWidth = 'max-w-xl',
  headerExtra,
  controls,
  headerVariant = 'plain',
  decor,
  still = false,
  children,
}: GiftShellProps) {
  const containerRef = useAutofocus([])

  // The red playlist screen stays strictly red-only, so its snow is warm cream
  // rather than the icy-blue frost the other screens use.
  const flakeClassName = tone === 'red' ? 'text-paper/85' : 'text-frost'

  return (
    <section
      ref={containerRef}
      aria-label={title}
      className={`relative flex h-full min-h-0 flex-1 flex-col overflow-hidden ${BACKGROUNDS[tone]}`}
    >
      <BackdropScene tone={tone} still={still} />

      {decor}

      {!still && (
        <SnowFall
          className={tone === 'letter' ? 'opacity-40' : 'opacity-70'}
          flakeClassName={flakeClassName}
        />
      )}

      <header className="safe-top safe-x relative z-10 shrink-0 pb-1 text-center">
        {headerVariant === 'label' ? (
          <div className="relative mx-auto mt-6 w-fit max-w-[94%] -rotate-1">
            <div className="relative rounded-[18px] border border-dashed border-cherry/40 bg-paper/95 px-4 pb-2 pt-2.5 shadow-soft">
              <TapeStrip
                tone="blush"
                className="-left-4 -top-2.5 -rotate-6"
                style={{ height: '1.15rem', width: '3.25rem' }}
              />
              <TapeStrip
                tone="blush"
                className="-right-4 -top-2.5 rotate-6"
                style={{ height: '1.15rem', width: '3.25rem', backgroundColor: 'var(--color-pastel-red)' }}
              />
              <p
                className={`text-[0.55rem] font-extrabold uppercase tracking-[0.26em] ${EYEBROW_COLOURS[tone]}`}
              >
                {eyebrow}
              </p>
              <h1
                data-autofocus
                tabIndex={-1}
                className={`${TITLE_SIZES.label} leading-tight ${TITLE_COLOURS[tone]}`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  textShadow: HEADER_SHADOWS[tone],
                }}
              >
                {title}
              </h1>
              <Doodle name="underline" className="mx-auto mt-0.5 h-auto w-32 text-cherry/50" />
              {headerExtra}
            </div>
          </div>
        ) : headerVariant === 'marquee' ? (
          <div className="relative mx-auto mt-6 w-fit max-w-[94%]">
            <p
              className={`text-[0.55rem] font-extrabold uppercase tracking-[0.3em] ${EYEBROW_COLOURS[tone]}`}
            >
              {eyebrow}
            </p>
            <h1
              data-autofocus
              tabIndex={-1}
              className={`${TITLE_SIZES.marquee} leading-tight ${TITLE_COLOURS[tone]}`}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                textShadow: HEADER_SHADOWS[tone],
              }}
            >
              {title}
            </h1>
            <span
              aria-hidden="true"
              className="film-perfs mx-auto mt-1.5 block h-1.5 w-36 rounded-[3px] opacity-60"
            />
            <span
              aria-hidden="true"
              className="mt-1 flex items-center justify-center gap-2 text-icy-blue/70"
            >
              <Sketch name="crescent" className="w-3.5" />
              <Sketch name="spark" className={still ? 'w-3' : 'anim-twinkle w-3'} />
              <Sketch name="crescent" className="w-3.5 -scale-x-100" />
            </span>
            {headerExtra}
          </div>
        ) : (
          <>
            <p
              className={`mt-6 text-[0.58rem] font-extrabold uppercase tracking-[0.26em] ${EYEBROW_COLOURS[tone]}`}
            >
              {eyebrow}
            </p>
            <h1
              data-autofocus
              tabIndex={-1}
              className={`${TITLE_SIZES.plain} leading-tight ${TITLE_COLOURS[tone]}`}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                textShadow: HEADER_SHADOWS[tone],
              }}
            >
              {title}
            </h1>
            {headerExtra}
          </>
        )}
      </header>

      <div className="safe-x relative z-10 flex min-h-0 w-full flex-1 flex-col">
        <div className={`mx-auto flex min-h-0 w-full flex-1 flex-col px-1 py-2 ${contentWidth}`}>
          {children}
        </div>
      </div>

      <footer className="safe-bottom safe-x relative z-10 shrink-0">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-1.5 pt-1">
          {controls}
          {tone === 'letter' ? (
            <button type="button" onClick={onBack} className="letter-btn">
              {backLabel}
            </button>
          ) : (
            <FlowerButton variant="secondary" onClick={onBack}>
              {backLabel}
            </FlowerButton>
          )}
        </div>
      </footer>
    </section>
  )
}
