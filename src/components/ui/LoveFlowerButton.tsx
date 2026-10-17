import { useId } from 'react'
import type { ButtonHTMLAttributes, CSSProperties } from 'react'

export type LoveFlowerVariant = 'yes' | 'no'

interface LoveFlowerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: LoveFlowerVariant
  /** Button diameter in px */
  size?: number
  /** Custom label (defaults to YES/NO) */
  label?: string
  /** Increment to re-trigger the wiggle animation (used after a NO tap) */
  wiggleKey?: number
}

/* ------------------------------------------------------------
   Geometry (drawn in a 0..100 viewBox, scaled to `size`).

   A sunflower head: 12 elongated petals + a second offset inner
   ring, radiating from a seed head. Each petal is ONE smooth
   closed cubic-Bézier path (rounded tip, no corners), filled —
   never stroked per petal — so the outer edge reads as a single
   clean contour and every tip stays inside the viewBox.
   ------------------------------------------------------------ */

const petalPath = (base: number, tip: number, halfWidth: number) =>
  `M0 ${-base} ` +
  `C${halfWidth} ${-base * 1.45} ${halfWidth} ${-tip * 0.82} 0 ${-tip} ` +
  `C${-halfWidth} ${-tip * 0.82} ${-halfWidth} ${-base * 1.45} 0 ${-base} Z`

const OUTER_PATH = petalPath(16, 47, 9.2)
const INNER_PATH = petalPath(13, 39, 7.2)
const CENTRE_R = 23

const OUTER_ANGLES = Array.from({ length: 12 }, (_, i) => i * 30)
const INNER_ANGLES = Array.from({ length: 12 }, (_, i) => i * 30 + 15)
const SEED_DOTS = Array.from({ length: 10 }, (_, i) => {
  const angle = (i * 36 * Math.PI) / 180
  const r = CENTRE_R * 0.56
  return { x: 50 + Math.cos(angle) * r, y: 50 + Math.sin(angle) * r }
})

/** Foil colours per variant: gold for YES, emerald-green for NO. */
const METAL = {
  yes: {
    outer: [
      'var(--color-gold-deep)',
      'var(--color-gold)',
      'var(--color-gold-light)',
      'var(--color-gold)',
      'var(--color-gold-deep)',
    ],
    inner: ['var(--color-gold)', 'var(--color-gold-light)', 'var(--color-gold)'],
    ring: ['var(--color-gold-deep)', 'var(--color-gold-light)', 'var(--color-gold-deep)'],
    centre: ['var(--color-bronze)', 'var(--color-bronze-deep)'],
  },
  no: {
    outer: [
      'var(--color-emerald-deep)',
      'var(--color-emerald)',
      'var(--color-emerald-light)',
      'var(--color-emerald)',
      'var(--color-emerald-deep)',
    ],
    inner: ['var(--color-emerald)', 'var(--color-emerald-light)', 'var(--color-emerald)'],
    ring: [
      'var(--color-emerald-deep)',
      'var(--color-emerald-light)',
      'var(--color-emerald-deep)',
    ],
    centre: ['var(--color-pine)', 'var(--color-pine-deep)'],
  },
} as const

const toStops = (colors: readonly string[]) =>
  colors.map((color, i) => ({
    color,
    offset: colors.length === 1 ? 0 : i / (colors.length - 1),
  }))

/**
 * An illustrated sunflower-shaped button with a brushed-metal finish.
 * The label sits inside the tappable seed head.
 * The whole flower is one <button> — not a rectangle with an icon.
 *
 * The metals "catch the light": hovering, pressing or focusing brightens the
 * foil, lifts the ring and sweeps a specular sheen across the petals (see
 * `.love-flower-btn` in global.css).
 */
export function LoveFlowerButton({
  variant,
  size = 128,
  label,
  wiggleKey,
  className = '',
  style,
  disabled,
  onClick,
  ...rest
}: LoveFlowerButtonProps) {
  const isYes = variant === 'yes'
  const metal = METAL[variant]
  const uid = useId().replace(/:/g, '')

  const outerGradId = `${uid}-outer`
  const innerGradId = `${uid}-inner`
  const centreGradId = `${uid}-centre`
  const ringGradId = `${uid}-ring`

  const showWiggle = wiggleKey !== undefined && wiggleKey > 0

  const buttonStyle: CSSProperties = {
    width: size,
    height: size,
    // caller style last so it can drive transform/opacity (NO shrink)
    ...style,
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    onClick?.(e)
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={`love-flower-btn group relative cursor-pointer disabled:cursor-default ${className}`}
      style={buttonStyle}
      onClick={handleClick}
      {...rest}
    >
      <span className="flower-lift absolute inset-0 block">
        <span
          key={wiggleKey}
          className={`absolute inset-0 flex items-center justify-center ${showWiggle ? 'anim-wiggle' : ''}`}
        >
          <svg
            viewBox="0 0 100 100"
            className="flower-svg h-full w-full"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient id={outerGradId} x1="0" y1="0" x2="1" y2="1">
                {toStops(metal.outer).map((s, i) => (
                  <stop key={i} offset={s.offset} style={{ stopColor: s.color }} />
                ))}
              </linearGradient>
              <linearGradient id={innerGradId} x1="0.1" y1="0" x2="0.9" y2="1">
                {toStops(metal.inner).map((s, i) => (
                  <stop key={i} offset={s.offset} style={{ stopColor: s.color }} />
                ))}
              </linearGradient>
              <radialGradient id={centreGradId} cx="0.38" cy="0.32" r="0.85">
                {toStops(metal.centre).map((s, i) => (
                  <stop key={i} offset={s.offset} style={{ stopColor: s.color }} />
                ))}
              </radialGradient>
              <linearGradient id={ringGradId} x1="0" y1="0" x2="1" y2="1">
                {toStops(metal.ring).map((s, i) => (
                  <stop key={i} offset={s.offset} style={{ stopColor: s.color }} />
                ))}
              </linearGradient>
            </defs>

            {/* One soft halo behind the petals → the outer edge reads as a
                single clean contour instead of many stroked petal outlines. */}
            <g
              fill="rgb(91 70 54 / 0.18)"
              transform="translate(50 50) scale(1.045)"
            >
              {OUTER_ANGLES.map((a) => (
                <path key={`oh-${a}`} d={OUTER_PATH} transform={`rotate(${a})`} />
              ))}
              {INNER_ANGLES.map((a) => (
                <path key={`ih-${a}`} d={INNER_PATH} transform={`rotate(${a})`} />
              ))}
            </g>

            {/* Outer petal layer (deeper foil) */}
            <g fill={`url(#${outerGradId})`} transform="translate(50 50)">
              {OUTER_ANGLES.map((a) => (
                <path key={`o-${a}`} d={OUTER_PATH} transform={`rotate(${a})`} />
              ))}
            </g>

            {/* Inner petal layer (offset, lighter foil) */}
            <g fill={`url(#${innerGradId})`} transform="translate(50 50)">
              {INNER_ANGLES.map((a) => (
                <path key={`i-${a}`} d={INNER_PATH} transform={`rotate(${a})`} />
              ))}
            </g>

            {/* Seed head (tappable centre) with a polished metal ring */}
            <circle cx={50} cy={50} r={CENTRE_R} fill={`url(#${centreGradId})`} />
            <circle
              className="flower-ring"
              cx={50}
              cy={50}
              r={CENTRE_R}
              fill="none"
              stroke={`url(#${ringGradId})`}
              strokeWidth={2.4}
            />
            <circle
              cx={50}
              cy={50}
              r={CENTRE_R - 7}
              fill="none"
              stroke="rgb(255 253 247 / 0.24)"
              strokeWidth={1}
              strokeDasharray="2 3"
            />
            <g fill="rgb(255 253 247 / 0.34)">
              {SEED_DOTS.map((dot, i) => (
                <circle key={i} cx={dot.x} cy={dot.y} r={1.5} />
              ))}
            </g>
          </svg>
        </span>

        {/* Specular sweep — the foil catching the light on interaction */}
        <span aria-hidden="true" className="flower-sheen" />

        {/* Label inside the seed head */}
        <span
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: Math.max(12, size * 0.12),
            letterSpacing: '0.03em',
            lineHeight: 1,
            color: 'var(--color-cream)',
            textShadow: '0 1px 2px rgb(45 30 20 / 0.5)',
          }}
        >
          {label ?? (isYes ? 'YES' : 'NO')}
        </span>
      </span>
    </button>
  )
}
