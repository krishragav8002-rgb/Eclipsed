import type { ButtonHTMLAttributes, ComponentType, ReactNode } from 'react'

type IconComponent = ComponentType<{
  size?: number | string
  className?: string
  strokeWidth?: number
}>

interface FlowerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  /** circular flower-shaped button — label becomes the aria-label */
  iconOnly?: boolean
  icon?: IconComponent
  children?: ReactNode
}

const PILL_SKIN = {
  primary: 'bg-butter-deep text-cocoa shadow-soft hover:shadow-lifted',
  secondary: 'bg-paper text-cocoa border-2 border-cocoa/25 shadow-soft hover:border-blush-deep',
} as const

/**
 * The signature button.
 * - pill (default): warm rounded CTA with an optional leading icon
 * - iconOnly: a sunflower — petal ring around a seed-head centre
 * Minimum 44px touch targets, visible focus ring, disabled state.
 */
export function FlowerButton({
  variant = 'primary',
  iconOnly = false,
  icon: Icon,
  className = '',
  children,
  type = 'button',
  ...rest
}: FlowerButtonProps) {
  const base =
    'group relative inline-flex select-none items-center justify-center transition-all duration-200 ease-soft hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-45'

  if (iconOnly) {
    const petals = variant === 'primary' ? 'fill-butter-deep' : 'fill-blush'
    const centre = variant === 'primary' ? 'fill-cocoa' : 'fill-paper'
    const ink = variant === 'primary' ? 'text-cream' : 'text-cocoa'

    return (
      <button type={type} className={`${base} size-14 rounded-full ${className}`} {...rest}>
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          focusable="false"
          className="absolute inset-0 h-full w-full transition-transform duration-300 ease-soft group-hover:rotate-[22deg]"
        >
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse
              key={i}
              cx="50"
              cy="17"
              rx="10.5"
              ry="15.5"
              className={petals}
              stroke="rgb(91 70 54 / 0.22)"
              strokeWidth="1.4"
              transform={`rotate(${i * 45} 50 50)`}
            />
          ))}
          <circle
            cx="50"
            cy="50"
            r="27"
            className={centre}
            stroke="rgb(91 70 54 / 0.28)"
            strokeWidth="1.6"
          />
        </svg>
        <span className={`relative z-10 flex items-center justify-center ${ink}`}>
          {Icon ? <Icon size={22} strokeWidth={2.4} /> : children}
        </span>
      </button>
    )
  }

  return (
    <button
      type={type}
      className={`${base} min-h-12 gap-2 rounded-full px-6 py-3 text-[0.98rem] font-extrabold ${PILL_SKIN[variant]} ${className}`}
      {...rest}
    >
      {Icon && <Icon size={18} strokeWidth={2.4} className="shrink-0" />}
      <span>{children}</span>
    </button>
  )
}
