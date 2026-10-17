import type { CSSProperties } from 'react'
import { Sketch, type SketchName } from './sketches'

/** How far back a band of particles sits — which sets its blur and its speed. */
export type Depth = 'far' | 'mid' | 'near'

/** The slow parallax the whole band borrows, so each depth drifts at its own rate. */
export type BandParallax = 'none' | 'slow' | 'mid' | 'near'

export interface DepthMote {
  /** position as a percentage of the layer — scales with the viewport */
  top: string
  left: string
  /** the mote's diameter (or the width of a sketched one), e.g. '0.3rem' */
  size: string
  /** colour and glow classes (bg-* / text-* / shadow-*) */
  className?: string
  opacity?: number
  /** seconds */
  delay?: number
  duration?: number
  /** a round mote of dust, or a little torn paper fleck */
  shape?: 'dot' | 'fleck'
  /** draw a hand-drawn motif instead of a plain mote — a snowflake, a note, a spark */
  sketch?: SketchName
  /** sparkle in and out where it sits, instead of rising through the scene */
  twinkle?: boolean
}

/**
 * One depth band. Motes inside a band share a blur and a drift rate; the bands
 * themselves move against each other, which is what makes the field read as
 * having distance rather than being one flat sprinkle.
 */
export interface DepthBand {
  depth: Depth
  motes: readonly DepthMote[]
  parallax?: BandParallax
}

const PARALLAX_CLASS: Record<BandParallax, string> = {
  none: '',
  slow: 'anim-band-slow',
  mid: 'anim-band-mid',
  near: 'anim-band-near',
}

/**
 * Distant motes are softened with a whisper of blur. It is applied per mote and
 * only on the far band — a static 1px blur on an element a few pixels across is
 * cheap, where blurring a whole full-screen layer would not be.
 */
const DEPTH_SKIN: Record<Depth, string> = {
  far: 'blur-[1px]',
  mid: '',
  near: '',
}

interface DepthFieldProps {
  bands: readonly DepthBand[]
  className?: string
}

/**
 * Layered drifting particles for the sketchbook worlds: a far band of tiny,
 * softly glowing stars, a middle band of dust and a near band of larger, faster
 * flecks — plus the odd sketched snowflake or music note among them.
 *
 * Every band is oversized past the screen edges (its parallax drift can never
 * uncover a corner) and every mote animates only `transform`/`opacity`, so
 * phones composite the whole field on the GPU. The tables are written by hand,
 * so the arrangement is identical every visit. Decorative only: the field never
 * takes pointer events and is hidden from assistive tech.
 */
export function DepthField({ bands, className = '' }: DepthFieldProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {bands.map((band, b) => (
        <div
          key={`${band.depth}-${b}`}
          className={`absolute -inset-8 ${PARALLAX_CLASS[band.parallax ?? 'none']}`}
        >
          {band.motes.map((mote, i) => {
            const skin = `${DEPTH_SKIN[band.depth]} ${mote.className ?? ''}`
            const timing: CSSProperties = {
              animationDelay: `${mote.delay ?? 0}s`,
              animationDuration: `${mote.duration ?? 9}s`,
            }

            if (mote.sketch) {
              return (
                <span
                  key={i}
                  className="absolute"
                  style={{ top: mote.top, left: mote.left, width: mote.size, opacity: mote.opacity ?? 0.5 }}
                >
                  <Sketch
                    name={mote.sketch}
                    className={`h-auto w-full ${
                      mote.twinkle ? 'anim-twinkle' : 'anim-float'
                    } ${skin}`}
                    style={timing}
                  />
                </span>
              )
            }

            return (
              <span
                key={i}
                className={`absolute block ${
                  mote.shape === 'fleck' ? 'rounded-[1px]' : 'rounded-full'
                } ${mote.twinkle ? 'anim-twinkle' : 'anim-dust'} ${skin}`}
                style={
                  {
                    top: mote.top,
                    left: mote.left,
                    width: mote.size,
                    height: mote.size,
                    opacity: mote.opacity ?? 0.6,
                    '--mote-opacity': String(mote.opacity ?? 0.6),
                    ...timing,
                  } as CSSProperties
                }
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
