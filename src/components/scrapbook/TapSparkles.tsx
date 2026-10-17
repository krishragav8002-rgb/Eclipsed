import { motion } from 'motion/react'
import { Sketch } from './sketches'

/** A handful of sparks, thrown outwards, at hand-chosen angles and sizes. */
const SPARKS = [
  { x: -34, y: -22, scale: 0.9, delay: 0 },
  { x: 30, y: -28, scale: 1.15, delay: 0.05 },
  { x: 40, y: 12, scale: 0.78, delay: 0.1 },
  { x: -30, y: 22, scale: 1, delay: 0.08 },
  { x: 6, y: -40, scale: 0.7, delay: 0.14 },
  { x: -8, y: 36, scale: 0.85, delay: 0.02 },
]

interface TapSparklesProps {
  /** colour classes for the sparks (text-*) */
  className?: string
}

/**
 * A one-shot sparkle burst, played once when a card or a row is tapped.
 *
 * Mount it with a changing `key` so React remounts it and the animation replays;
 * it costs six tiny SVG nodes for well under a second, then rests at zero
 * opacity. Callers skip it entirely when the visitor prefers reduced motion.
 */
export function TapSparkles({ className = '' }: TapSparklesProps) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 top-1/2 z-20 ${className}`}
    >
      {SPARKS.map((spark, i) => (
        <motion.span
          key={i}
          className="absolute block"
          style={{
            width: `${12 * spark.scale}px`,
            height: `${12 * spark.scale}px`,
            marginLeft: `${-6 * spark.scale}px`,
            marginTop: `${-6 * spark.scale}px`,
          }}
          initial={{ opacity: 0, x: spark.x * 0.25, y: spark.y * 0.25, scale: 0.4 }}
          animate={{ opacity: [0, 1, 0], x: spark.x, y: spark.y, scale: [0.4, 1, 0.7] }}
          transition={{ duration: 0.62, delay: spark.delay, ease: 'easeOut' }}
        >
          <Sketch name="spark" className="h-full w-full" />
        </motion.span>
      ))}
    </span>
  )
}
