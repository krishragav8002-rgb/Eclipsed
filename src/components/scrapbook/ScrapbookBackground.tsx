import { Sunflower } from '../flowers/Sunflower'
import { PetalField } from '../flowers/PetalField'
import { Doodle } from './Doodle'

/**
 * The scrapbook desk: warm cream paper, a bullet-journal dot grid,
 * soft pastel light blooms, hand-placed sunflowers and doodles.
 * Fixed, decorative, and pointer-transparent.
 */
export function ScrapbookBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base paper */}
      <div className="absolute inset-0 bg-cream" />
      <div className="dot-grid absolute inset-0 opacity-70" />

      {/* soft pastel light blooms */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blush/70 blur-3xl" />
      <div className="absolute -right-28 top-1/4 h-80 w-80 rounded-full bg-butter/60 blur-3xl" />
      <div className="absolute -left-20 bottom-1/4 h-64 w-64 rounded-full bg-sky/70 blur-3xl" />
      <div className="absolute right-1/4 -bottom-28 h-72 w-72 rounded-full bg-lilac/60 blur-3xl" />

      {/* slow drifting petals behind everything */}
      <PetalField count={5} className="opacity-70" />

      {/* hand-placed sunflowers */}
      <Sunflower
        sway
        size={110}
        className="absolute -right-7 -top-5 rotate-12 opacity-95 sm:size-32"
        style={{ animationDelay: '0.8s' }}
      />
      <Sunflower
        sway
        size={84}
        className="absolute -left-8 bottom-24 -rotate-12 opacity-90 sm:size-28"
        style={{ animationDelay: '2.1s' }}
      />
      <Sunflower
        sway
        size={64}
        className="absolute right-5 bottom-44 hidden rotate-6 opacity-85 sm:block md:size-24"
        style={{ animationDelay: '3.4s' }}
      />

      {/* doodles */}
      <Doodle
        name="heart"
        className="anim-float absolute left-7 top-40 w-6 text-sage-deep/85"
        style={{ animationDelay: '1.2s' }}
      />
      <Doodle
        name="sparkle"
        className="anim-float absolute right-12 top-64 w-7 text-butter-deep"
        style={{ animationDelay: '2.6s' }}
      />
      <Doodle
        name="heart"
        className="anim-float absolute bottom-10 left-1/3 w-5 text-sage-deep"
        style={{ animationDelay: '0.4s' }}
      />
      <Doodle
        name="star"
        className="anim-float absolute bottom-64 left-10 w-5 text-sage-deep/80"
        style={{ animationDelay: '4s' }}
      />
    </div>
  )
}
