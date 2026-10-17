import type { Phase3LifePage } from '../../content/phase3.config'
import { PHASE3_LIFE_PAGES } from '../../content/phase3.config'
import { GifCard } from './GifCard'
import { HeartDoodle } from './doodles'

/**
 * One screen of Part A — "the life I want with you".
 *
 * All nine screens share one shape, so nothing is invented page by page: the
 * count on the first line, the message written large on a leaf of paper, and the
 * GIF card taped directly underneath it. The picture never sits above the words
 * and never inside them — the message is read first, then the picture answers it.
 *
 * The card takes the height that is left after the message, and the picture
 * inside is always shown whole, so the same screen reads correctly on a small
 * phone and on a tall one without anything being cropped or scrolled.
 */

/** `09` — worked out from the list, so the count can never drift from the truth. */
const TOTAL = String(PHASE3_LIFE_PAGES.length).padStart(2, '0')

export function LifePage({ page }: { page: Phase3LifePage }) {
  return (
    <article
      className={`p3-accent-${page.accent} mx-auto flex min-h-0 w-full max-w-lg flex-1 flex-col items-center justify-center gap-4`}
    >
      {/* the message, near the top of the screen, on the chapter's quieter sheet */}
      <div className="p3-sheet p3-sheet--soft w-full shrink-0 px-4 pb-4 pt-3.5">
        <div className="flex items-center justify-between gap-3">
          <p className="p3-progress">
            <span className="p3-progress-now">{page.index}</span>
            <span>/ {TOTAL}</span>
          </p>

          {/* one small mark at the end of that line, where the words never reach */}
          <span aria-hidden="true" className="shrink-0">
            <HeartDoodle className="w-5 rotate-6 p3-tint-accent opacity-70" />
          </span>
        </div>

        <p data-autofocus tabIndex={-1} className="p3-msg-text mt-2">
          {page.message}
        </p>
      </div>

      <GifCard src={page.media.src} alt={page.media.alt ?? ''} className="w-full flex-1" />
    </article>
  )
}
