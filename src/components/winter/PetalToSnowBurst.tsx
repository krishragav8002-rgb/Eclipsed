import { motion } from 'motion/react'
import { Snowflake } from 'lucide-react'
import { Petal } from '../flowers/Petal'

/**
 * A celebratory burst that leaves the YES flower as sunflower petals and
 * arrives as delicate winter particles: every piece is drawn twice and
 * cross-faded mid-flight, so the warm gold hands over to frost as it travels.
 *
 * Deterministic layout, transform/opacity only, purely decorative. It is
 * mounted by the winter scene, so it plays exactly once per arrival.
 */

interface Particle {
  angle: number
  distance: number
  delay: number
  size: number
  /** the sunflower petal it starts as */
  petal: string
  /** what it becomes by the end of its flight */
  becomes: 'snowflake' | 'speck'
}

const PARTICLES: Particle[] = [
  { angle: 0, distance: 168, delay: 0, size: 20, petal: 'var(--color-butter)', becomes: 'snowflake' },
  { angle: 30, distance: 142, delay: 0.04, size: 14, petal: 'var(--color-butter-deep)', becomes: 'speck' },
  { angle: 62, distance: 178, delay: 0.08, size: 22, petal: 'var(--color-gold-light)', becomes: 'snowflake' },
  { angle: 96, distance: 150, delay: 0.12, size: 16, petal: 'var(--color-butter)', becomes: 'snowflake' },
  { angle: 128, distance: 186, delay: 0.16, size: 12, petal: 'var(--color-butter-deep)', becomes: 'speck' },
  { angle: 158, distance: 146, delay: 0.2, size: 24, petal: 'var(--color-gold-light)', becomes: 'snowflake' },
  { angle: 192, distance: 172, delay: 0.24, size: 15, petal: 'var(--color-butter)', becomes: 'snowflake' },
  { angle: 222, distance: 152, delay: 0.28, size: 18, petal: 'var(--color-butter-deep)', becomes: 'speck' },
  { angle: 254, distance: 180, delay: 0.32, size: 21, petal: 'var(--color-gold-light)', becomes: 'snowflake' },
  { angle: 286, distance: 148, delay: 0.36, size: 13, petal: 'var(--color-butter)', becomes: 'speck' },
  { angle: 316, distance: 176, delay: 0.4, size: 19, petal: 'var(--color-butter-deep)', becomes: 'snowflake' },
  { angle: 344, distance: 156, delay: 0.44, size: 16, petal: 'var(--color-gold-light)', becomes: 'snowflake' },
]

/** When the petal has fully become winter, relative to each particle's start. */
const MORPH_AT = 0.28

export function PetalToSnowBurst({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {PARTICLES.map((particle, index) => {
        const radians = (particle.angle * Math.PI) / 180

        return (
          <motion.div
            key={index}
            initial={{ x: 0, y: 0, scale: 0.2, rotate: 0 }}
            animate={{
              x: Math.cos(radians) * particle.distance,
              y: Math.sin(radians) * particle.distance,
              scale: 1,
              rotate: particle.angle + 220,
            }}
            transition={{ duration: 1.5, delay: particle.delay, ease: [0.16, 0.8, 0.3, 1] }}
            className="absolute left-1/2 top-[46%]"
            style={{
              width: particle.size,
              height: particle.size,
              marginLeft: -particle.size / 2,
              marginTop: -particle.size / 2,
            }}
          >
            {/* the whole piece fades away only at the end of its flight */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: particle.delay + 0.9,
                ease: 'easeIn',
              }}
              className="relative h-full w-full"
            >
              <motion.span
                className="absolute inset-0 grid place-items-center"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{
                  duration: 0.45,
                  delay: particle.delay + MORPH_AT,
                  ease: 'easeOut',
                }}
              >
                <Petal size={particle.size} color={particle.petal} />
              </motion.span>

              <motion.span
                className="snow-flake absolute inset-0 grid place-items-center text-frost"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.45,
                  delay: particle.delay + MORPH_AT,
                  ease: 'easeOut',
                }}
              >
                {particle.becomes === 'snowflake' ? (
                  <Snowflake size={particle.size + 4} strokeWidth={1.7} aria-hidden="true" />
                ) : (
                  <span className="block size-1.5 rounded-full bg-ice-deep/85" />
                )}
              </motion.span>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
