import type { ComponentType } from 'react'
import {
  Asterisk,
  CircleDoodle,
  CloudDoodle,
  HalfRing,
  PlusMark,
  Scribble,
  Spark,
  StarDoodle,
  type MarkProps,
} from './doodles'

/**
 * The marks scrawled in the margins of the green plate.
 *
 * The portfolio's page is a green sheet with white dashes and ink dots on it,
 * and doodles drawn in the gaps between its cards. Phase 3 does the same: this
 * layer paints a handful of ink and white marks into the green the sheets never
 * cover — the band above the paper, the band below it on the pages that do not
 * fill the screen, and a thin sliver down each side, where the sheets'
 * intentionally ragged corners let them show through. Marks placed on the sides
 * are kept small, because only the safe-area gutter beside the paper is ever
 * visible.
 *
 * Purely decorative, so it is `aria-hidden` and can never be tapped.
 */

type MarkShape = 'spark' | 'star' | 'plus' | 'halfRing' | 'asterisk' | 'circle' | 'cloud' | 'scribble'

const SHAPES: Record<MarkShape, ComponentType<MarkProps>> = {
  spark: Spark,
  star: StarDoodle,
  plus: PlusMark,
  halfRing: HalfRing,
  asterisk: Asterisk,
  circle: CircleDoodle,
  cloud: CloudDoodle,
  scribble: Scribble,
}

interface MarginMark {
  shape: MarkShape
  /** a plain Tailwind size utility, e.g. `w-6` */
  size: string
  pos: { top?: string; bottom?: string; left?: string; right?: string }
  rotate: number
  /** ink-coloured rather than white — used sparingly, like the pattern's dots */
  ink?: boolean
  delay?: string
  /** how long one bob takes, so the marks do not move in lockstep */
  duration?: string
}

/** Hand-placed, in the clear bands of the plate. Side marks stay small. */
const MARKS: readonly MarginMark[] = [
  { shape: 'spark', size: 'w-6', pos: { top: '5%', left: '6%' }, rotate: -12 },
  { shape: 'plus', size: 'w-4', pos: { top: '7%', right: '8%' }, rotate: 8, ink: true, delay: '0.9s' },
  { shape: 'halfRing', size: 'w-6', pos: { top: '34%', left: '-1%' }, rotate: 14, delay: '1.8s' },
  { shape: 'asterisk', size: 'w-5', pos: { top: '48%', right: '1%' }, rotate: -6, ink: true, delay: '0.4s' },
  { shape: 'cloud', size: 'w-5', pos: { top: '62%', left: '-3%' }, rotate: 5, duration: '11s' },
  { shape: 'circle', size: 'w-6', pos: { bottom: '24%', right: '-2%' }, rotate: 10, delay: '2.6s' },
  { shape: 'scribble', size: 'w-10', pos: { bottom: '11%', left: '3%' }, rotate: -3, delay: '1.2s', duration: '9s' },
  { shape: 'star', size: 'w-4', pos: { bottom: '16%', right: '12%' }, rotate: 6, ink: true, delay: '3.1s' },
]

/**
 * The floating layer itself: absolutely positioned, never interactive, and
 * clipped by the plate so no drift can push a mark over the paper.
 */
export function PaperWorld() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {MARKS.map((mark, i) => {
        const Shape = SHAPES[mark.shape]
        return (
          <span
            key={i}
            className={`p3-mark p3-float ${mark.ink ? 'p3-mark--ink' : ''}`}
            style={{
              ...mark.pos,
              animationDelay: mark.delay,
              animationDuration: mark.duration,
            }}
          >
            {/* the tilt lives on an inner span so the float animation's own
                transform never overwrites it */}
            <span className="block" style={{ transform: `rotate(${mark.rotate}deg)` }}>
              <Shape className={mark.size} />
            </span>
          </span>
        )
      })}
    </div>
  )
}
