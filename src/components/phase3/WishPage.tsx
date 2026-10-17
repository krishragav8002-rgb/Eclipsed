import { motion } from 'motion/react'
import { PHASE3_WISH } from '../../content/phase3.config'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { HeartDoodle, Scribble, Spark } from './doodles'
import coupleImage from '../../../couple-transparent.png'

/**
 * The last screen of the whole experience.
 *
 * A hand-drawn couple sits above a warm paper letter, framed by the green garden
 * that appears only on this final screen.
 *
 * There is no cue and no forward action here on purpose: once this page appears,
 * the experience is finished. The only control left is the small way back.
 */

const SKETCH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function rise(delay: number, reduced: boolean) {
  return {
    initial: reduced ? { opacity: 1 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.01 : 0.6, ease: SKETCH_EASE, delay: reduced ? 0 : delay },
  }
}

export function WishPage() {
  const reduced = useReducedMotion()
  const page = PHASE3_WISH

  return (
    <article
      className={`wish-scene p3-accent-${page.accent} relative flex min-h-0 flex-1 flex-col items-center justify-center`}
    >
      <div className="wish-card-wrap relative z-10 w-full">
        <img
          src={coupleImage}
          alt="A couple leaning together with their foreheads touching"
          className="wish-couple pointer-events-none relative z-0 mx-auto block object-contain"
          draggable={false}
        />
        <motion.div
          className="wish-paper relative z-10 flex flex-col items-center px-4 py-4 text-center sm:px-6 sm:py-5"
          {...rise(0, reduced)}
        >
          <motion.div {...rise(0.15, reduced)}>
            <h2 data-autofocus tabIndex={-1} className="wish-heading text-balance">
              {page.heading}
            </h2>
          </motion.div>

          <motion.span className="mt-1.5 block" {...rise(0.35, reduced)}>
            <Scribble
              className="mx-auto h-auto w-32 p3-tint-accent opacity-80"
              strokeWidth={2}
            />
          </motion.span>

          <motion.p className="p3-body mt-2.5 text-pretty" {...rise(0.5, reduced)}>
            {page.message}
          </motion.p>

          <motion.span
            aria-hidden="true"
            className="my-2.5 block w-20 border-t border-dashed p3-rule"
            {...rise(0.7, reduced)}
          />

          <motion.p className="wish-hand text-pretty" {...rise(0.8, reduced)}>
            {page.personalNote}
          </motion.p>

          <motion.p className="wish-hand mt-1 opacity-80" {...rise(0.95, reduced)}>
            {page.signature}
          </motion.p>
          <HeartDoodle className="absolute -bottom-3 right-7 w-5 rotate-12 p3-tint-accent opacity-75" />
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="wish-leaf absolute -left-3 top-1/2 w-6 -rotate-12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 27C9 14 17 7 28 5c-1 11-8 19-21 22Zm4-2 12-13m-9 5 6 2m-2-6 5 1" />
          </svg>
        </motion.div>
      </div>
    </article>
  )
}
