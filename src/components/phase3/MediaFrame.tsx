import { useState } from 'react'
import { Pencil, Spark, StarDoodle } from './doodles'

interface MediaFrameProps {
  src: string
  alt: string
  /**
   * `wide` gives Part B's seasonal illustrations the whole width of the screen;
   * the default keeps Part A's little GIFs down at a size the words can share.
   */
  wide?: boolean
  /** a hand-placed tilt, in degrees */
  tilt?: number
  /** tint the tape with the page's accent rather than the default butter */
  accentTape?: boolean
  className?: string
}

/**
 * A picture taped into the page: cream paper, an ink outline, a deliberately
 * irregular corner and a hard offset shadow — the portfolio's card treatment,
 * borrowed exactly.
 *
 * The image is never cropped: it is capped by `--p3-media` (or the wider cap on
 * the seasonal screens) and keeps its own proportions, so no part of the
 * artwork is ever lost. If the file cannot be shown, the frame turns into a
 * dashed box of ink marks carrying the picture's description instead of a
 * broken-image icon.
 */
export function MediaFrame({
  src,
  alt,
  wide = false,
  tilt = 0,
  accentTape = false,
  className = '',
}: MediaFrameProps) {
  const [failed, setFailed] = useState(false)

  return (
    <figure
      className={`p3-frame p3-frame--plate ${wide ? 'p3-frame--wide' : ''} ${className}`}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      <span className={`p3-tape -left-3 -top-2.5 -rotate-6 ${accentTape ? 'p3-tape--accent' : ''}`} />
      <span className={`p3-tape -right-3 -top-2.5 rotate-6 ${accentTape ? 'p3-tape--accent' : ''}`} />

      {failed ? (
        <span className="p3-fallback">
          <Pencil className="w-6" />
          <Spark className="w-4" />
          <StarDoodle className="w-5" />
          <span className="sr-only">{alt}</span>
        </span>
      ) : (
        <img src={src} alt={alt} decoding="async" onError={() => setFailed(true)} />
      )}

    </figure>
  )
}
