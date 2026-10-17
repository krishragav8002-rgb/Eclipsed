import type { CSSProperties } from 'react'
import { Petal } from './Petal'

interface PetalFieldProps {
  /** how many petals drift across the area */
  count?: number
  className?: string
}

/** Deterministic petal layout so the field never jumps between renders. */
const PETAL_LAYOUT = [
  { left: 6, size: 14, color: 'var(--color-blush)', dur: 16, delay: 0, drift: 34 },
  { left: 18, size: 10, color: 'var(--color-butter)', dur: 20, delay: 5, drift: -26 },
  { left: 32, size: 12, color: 'var(--color-lilac)', dur: 18, delay: 2.5, drift: 22 },
  { left: 47, size: 9, color: 'var(--color-blush)', dur: 22, delay: 8, drift: -18 },
  { left: 61, size: 13, color: 'var(--color-butter)', dur: 17, delay: 1.5, drift: 28 },
  { left: 74, size: 11, color: 'var(--color-sky)', dur: 21, delay: 6.5, drift: -30 },
  { left: 86, size: 15, color: 'var(--color-blush)', dur: 19, delay: 3.5, drift: 24 },
  { left: 94, size: 10, color: 'var(--color-butter)', dur: 23, delay: 10, drift: -22 },
]

/**
 * Slowly falling petals (CSS animation only).
 * Decorative and pointer-transparent; static under reduced motion.
 */
export function PetalField({ count = 6, className = '' }: PetalFieldProps) {
  const petals = PETAL_LAYOUT.slice(0, Math.max(0, Math.min(count, PETAL_LAYOUT.length)))

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {petals.map((petal, i) => (
        <span
          key={i}
          className="petal-fall absolute top-0 block"
          style={
            {
              left: `${petal.left}%`,
              animationDuration: `${petal.dur}s`,
              animationDelay: `${petal.delay}s`,
              '--drift': `${petal.drift}px`,
              opacity: 0.7,
            } as CSSProperties
          }
        >
          <Petal size={petal.size} color={petal.color} />
        </span>
      ))}
    </div>
  )
}
