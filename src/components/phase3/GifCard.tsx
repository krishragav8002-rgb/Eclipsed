import { useState } from 'react'
import { HeartDoodle, Pencil, Spark, StarDoodle } from './doodles'

interface GifCardProps {
  /** the imported GIF for this screen */
  src: string
  /**
   * a description for screen readers. Empty by default — the message above the
   * card carries the meaning, so the picture is left as decoration until someone
   * who has actually seen it fills this in.
   */
  alt?: string
  className?: string
}

/**
 * Part A's GIF card: one picture taped into the page, sitting directly under the
 * message.
 *
 * It is the chapter's usual card treatment — cream paper, an ink outline, a
 * deliberately uneven corner and a hard offset shadow (`p3-frame`), with the
 * tape tinted by the screen's accent. The card takes whatever height is left
 * after the message and the picture inside is always shown whole: `object-fit:
 * contain` means nothing is ever cropped, stretched or pushed off the screen,
 * however tall or short the phone is. If the file cannot be shown, the card
 * draws the chapter's ink-and-paper sketch in its place.
 */
export function GifCard({ src, alt = '', className = '' }: GifCardProps) {
  const [failed, setFailed] = useState(false)

  return (
    <figure className={`p3-frame p3-card relative ${className}`}>
      {/* the washi tape holding it to the page, as on every other card here */}
      <span aria-hidden="true" className="p3-tape p3-tape--accent -left-3 -top-2.5 -rotate-6" />
      <span aria-hidden="true" className="p3-tape p3-tape--accent -right-3 -top-2.5 rotate-6" />

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

      {/* a couple of marks drawn into the card's own bottom margin, where they
          can never land on top of the picture */}
      <span aria-hidden="true" className="pointer-events-none absolute bottom-2 right-3 rotate-6">
        <HeartDoodle className="w-5 p3-tint-accent opacity-70" />
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3.5 right-11 -rotate-12"
      >
        <StarDoodle className="w-3.5 p3-tint-accent opacity-45" />
      </span>
    </figure>
  )
}
