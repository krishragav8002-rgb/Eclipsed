import type { CSSProperties } from 'react'
import { Snowflake } from 'lucide-react'

/** Deterministic flake layout, so the drift never jumps between renders. */
const FLAKES = [
  { left: 4, size: 16, dur: 15, delay: 0, drift: 26, opacity: 0.85 },
  { left: 13, size: 11, dur: 19, delay: 4.5, drift: -20, opacity: 0.7 },
  { left: 24, size: 20, dur: 13, delay: 1.5, drift: 18, opacity: 0.9 },
  { left: 35, size: 12, dur: 21, delay: 7, drift: -28, opacity: 0.65 },
  { left: 45, size: 15, dur: 16, delay: 3, drift: 22, opacity: 0.8 },
  { left: 56, size: 10, dur: 23, delay: 9.5, drift: -16, opacity: 0.6 },
  { left: 66, size: 18, dur: 14, delay: 5.5, drift: 30, opacity: 0.9 },
  { left: 76, size: 13, dur: 18, delay: 2, drift: -24, opacity: 0.75 },
  { left: 86, size: 17, dur: 15, delay: 8, drift: 20, opacity: 0.85 },
  { left: 94, size: 12, dur: 20, delay: 11, drift: -18, opacity: 0.7 },
]

interface SnowFallProps {
  className?: string
  /** flake colour — override on screens that must avoid the icy-blue tint */
  flakeClassName?: string
}

/**
 * Snow drifting down a screen — CSS only, pointer-transparent. Lives in its own
 * layer so the winter scene, the gallery and every gift screen share one drift.
 */
export function SnowFall({ className = '', flakeClassName = 'text-frost' }: SnowFallProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {FLAKES.map((flake, index) => (
        <span
          key={index}
          className={`snow-fall snow-flake absolute top-0 block ${flakeClassName}`}
          style={
            {
              left: `${flake.left}%`,
              animationDuration: `${flake.dur}s`,
              animationDelay: `${flake.delay}s`,
              '--drift': `${flake.drift}px`,
              '--snow-opacity': flake.opacity,
            } as CSSProperties
          }
        >
          <Snowflake size={flake.size} strokeWidth={1.6} aria-hidden="true" />
        </span>
      ))}
    </div>
  )
}
