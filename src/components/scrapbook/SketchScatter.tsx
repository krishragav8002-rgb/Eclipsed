import type { CSSProperties } from 'react'
import { Motif, type MotifName } from './sketches'

/** Which gentle motion a scattered motif borrows. */
export type DriftKind = 'sway' | 'drift' | 'twinkle' | 'breathe' | 'wave' | 'none'

export interface ScatterItem {
  name: MotifName
  /** position as a percentage of the layer — scales with the viewport */
  top: string
  left: string
  /** width, e.g. '2.4rem' */
  size: string
  rotate?: number
  /** layer opacity, for depth */
  opacity?: number
  /** colour classes (text-*) */
  className?: string
  drift?: DriftKind
  /** seconds */
  delay?: number
  duration?: number
  flip?: boolean
}

const DRIFT_CLASS: Record<DriftKind, string> = {
  sway: 'anim-sway',
  drift: 'anim-float',
  twinkle: 'anim-twinkle',
  breathe: 'anim-breathe',
  /** a sketched sound wave breathing along its own axis */
  wave: 'anim-wave',
  none: '',
}

interface SketchScatterProps {
  items: readonly ScatterItem[]
  className?: string
  /**
   * Draw every motif exactly where it was placed, with no motion at all. Used
   * by the film screen, which gives the phone nothing to composite but the
   * video itself.
   */
  still?: boolean
}

/**
 * A hand-placed layer of sketchbook motifs.
 *
 * Positions are percentages of the layer, so the arrangement stays responsive
 * instead of relying on brittle pixel coordinates, and the table is authored by
 * hand rather than generated — the scatter looks intentional and renders
 * identically every time. Decorative only: it never takes pointer events and is
 * hidden from assistive tech.
 */
export function SketchScatter({ items, className = '', still = false }: SketchScatterProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {items.map((item, i) => (
        <span
          key={`${item.name}-${i}`}
          className="absolute"
          style={{
            top: item.top,
            left: item.left,
            width: item.size,
            opacity: item.opacity ?? 0.55,
            transform: `rotate(${item.rotate ?? 0}deg) scaleX(${item.flip ? -1 : 1})`,
          }}
        >
          <Motif
            name={item.name}
            className={`w-full ${item.className ?? ''} ${still ? '' : DRIFT_CLASS[item.drift ?? 'none']}`}
            style={
              still
                ? undefined
                : {
                    animationDelay: `${item.delay ?? 0}s`,
                    animationDuration: item.duration ? `${item.duration}s` : undefined,
                  }
            }
          />
        </span>
      ))}
    </div>
  )
}

export interface Particle {
  top: string
  left: string
  /** diameter, e.g. '0.3rem' */
  size: string
  /** colour and glow classes (bg-* / shadow-*) */
  className?: string
  opacity?: number
  delay?: number
  duration?: number
  /** a round mote of dust, or a little torn paper fleck */
  shape?: 'dot' | 'fleck'
}

interface ParticleFieldProps {
  items: readonly Particle[]
  className?: string
}

/**
 * Slow-drifting motes — golden dust in the letter, blush confetti in the
 * journal, icy specks in the cinema. Pure CSS transform/opacity animation, and
 * a small, hand-picked count so phones stay smooth.
 */
export function ParticleField({ items, className = '' }: ParticleFieldProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {items.map((p, i) => (
        <span
          key={i}
          className={`anim-dust absolute ${p.shape === 'fleck' ? 'rounded-[1px]' : 'rounded-full'} ${p.className ?? ''}`}
          style={
            {
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              opacity: p.opacity ?? 0.6,
              '--mote-opacity': String(p.opacity ?? 0.6),
              animationDelay: `${p.delay ?? 0}s`,
              animationDuration: `${p.duration ?? 9}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
