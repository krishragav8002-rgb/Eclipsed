/** Which illustrated world a scene belongs to. */
export type SceneTone = 'gallery' | 'letter' | 'red' | 'moon'

/**
 * A soft vignette that pulls the eye toward the middle of the screen. It sits
 * above the painted backdrop but below everything the visitor reads or taps —
 * the backdrop itself is painted by the screen's own `*-bg` class, which owns
 * the image layers and their fallback colour.
 */
const VIGNETTE: Record<SceneTone, string> = {
  gallery:
    'radial-gradient(78% 62% at 50% 46%, rgba(12,6,28,0) 42%, rgba(12,6,28,0.52) 100%)',
  letter:
    'radial-gradient(72% 58% at 50% 44%, rgba(107,79,58,0) 46%, rgba(107,79,58,0.24) 100%)',
  red: 'radial-gradient(72% 58% at 50% 44%, rgba(168,48,67,0) 46%, rgba(168,48,67,0.22) 100%)',
  moon: 'radial-gradient(72% 58% at 50% 46%, rgba(6,3,18,0) 42%, rgba(6,3,18,0.55) 100%)',
}

interface Bloom {
  className: string
  delay?: number
  duration?: number
}

/**
 * One or two wide, heavily blurred patches of light per world. They only ever
 * animate transform and opacity — the blur itself is static — so the ambient
 * light drifts without asking the phone to re-rasterise a big filter.
 */
const BLOOMS: Record<SceneTone, readonly Bloom[]> = {
  gallery: [
    { className: '-left-24 top-[16%] size-72 bg-royal-lavender/25', duration: 19 },
    { className: '-right-20 bottom-[12%] size-80 bg-royal-lavender/20', delay: 2.6, duration: 23 },
  ],
  letter: [
    { className: '-left-20 top-[10%] size-64 bg-butter/45', duration: 18 },
    { className: '-right-24 bottom-[14%] size-72 bg-blush/30', delay: 2.2, duration: 22 },
  ],
  red: [
    { className: '-left-24 top-[12%] size-64 bg-pastel-red/35', duration: 17 },
    { className: '-right-20 bottom-[10%] size-72 bg-blush-red/30', delay: 2, duration: 21 },
  ],
  moon: [
    { className: '-left-24 top-[18%] size-72 bg-royal-lavender/25', duration: 19 },
    { className: '-right-24 bottom-[16%] size-72 bg-icy-blue/20', delay: 2.8, duration: 24 },
  ],
}

interface BackdropSceneProps {
  tone: SceneTone
  /** skip the drifting blooms, leaving only the still vignette */
  still?: boolean
}

/**
 * The atmosphere shared by every illustrated screen: a vignette to settle the
 * edges and a couple of very slow blooms of light.
 *
 * It is deliberately thin — the scene's own artwork lives in `public/backdrops`
 * and is painted by the screen's background class, where it can be sized and
 * positioned per screen. Everything here is decorative: hidden from assistive
 * tech, never a pointer target, and always behind the content (which the
 * screens keep at `z-10`).
 */
export function BackdropScene({ tone, still = false }: BackdropSceneProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {!still &&
        BLOOMS[tone].map((bloom, i) => (
          <span
            key={i}
            className={`anim-bloom absolute rounded-full blur-3xl ${bloom.className}`}
            style={{
              // the resting value, which is also what a reduced-motion visitor sees
              // once the animation is neutralised — kept inside the animated range
              opacity: 0.7,
              animationDelay: `${bloom.delay ?? 0}s`,
              animationDuration: `${bloom.duration ?? 19}s`,
            }}
          />
        ))}

      <span className="absolute inset-0" style={{ background: VIGNETTE[tone] }} />
    </div>
  )
}
