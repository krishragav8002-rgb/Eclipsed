import type { CSSProperties, ReactNode } from 'react'

interface PhotoFrameProps {
  children: ReactNode
  caption?: string
  className?: string
  /** hand-placed tilt in degrees */
  rotate?: number
  style?: CSSProperties
}

/** A polaroid-style photo frame with a handwritten caption. */
export function PhotoFrame({
  children,
  caption,
  className = '',
  rotate = 0,
  style,
}: PhotoFrameProps) {
  return (
    <figure
      className={`paper paper-tex relative rounded-[10px] p-3 pb-9 shadow-lifted ${className}`}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined, ...style }}
    >
      <div className="relative overflow-hidden rounded-[6px] bg-paper-dim">{children}</div>
      {caption && (
        <figcaption className="hand absolute inset-x-0 bottom-1.5 text-center text-cocoa-soft">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
