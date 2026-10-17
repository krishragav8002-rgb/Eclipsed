import type { Phase3UniversePage } from '../../content/phase3.config'
import { MediaFrame } from './MediaFrame'
import { PageLabel } from './PageChrome'
import { Scribble, Spark } from './doodles'

/** One line of the multiverse story, paired with its own full, uncropped image. */
export function UniversePage({ page }: { page: Phase3UniversePage }) {
  return (
    <article
      className={`p3-accent-${page.accent} mx-auto flex min-h-0 w-full max-w-lg flex-1 flex-col items-center justify-center gap-3`}
    >
      <div className="p3-sheet p3-sheet--soft relative w-full shrink-0 px-4 pb-4 pt-3.5">
        <div className="flex items-center justify-between gap-3">
          <PageLabel index={page.index} tag="in every universe" />
          <Spark className="w-4 shrink-0 p3-tint-accent opacity-65" />
        </div>
        <h2 data-autofocus tabIndex={-1} className="p3-line mt-2 text-balance">
          {page.message}
        </h2>
        <Scribble className="mt-1.5 h-auto w-24 p3-tint-accent opacity-70" />
      </div>

      <MediaFrame
        wide
        src={page.image.src}
        alt={page.image.alt}
        tilt={-0.6}
        accentTape
        className="min-h-0 w-full shrink"
      />
    </article>
  )
}
