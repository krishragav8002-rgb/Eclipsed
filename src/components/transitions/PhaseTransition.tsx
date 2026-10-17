import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { previousPhase, type PhaseId } from '../../state/experienceReducer'
import { PhaseScreen } from '../phases/PhaseScreen'

const SOFT_EASE: [number, number, number, number] = [0.22, 0.9, 0.32, 1]

/**
 * How long the leaving page takes to clear the screen. Deliberately inside the
 * shared advance cooldown in `usePhaseTransition` (420ms), so a new hop can
 * never begin until the previous one has finished — at most two pages are ever
 * on screen, and only for the length of one slide.
 */
const DURATION = 0.4

type SlideDirection = 'left' | 'right' | 'down' | 'up' | 'rise'

/** The choreography for a hop, keyed by where the flow is heading. */
const FORWARD: Partial<Record<PhaseId, SlideDirection>> = {
  revealLeft: 'left', // birthday page slides out left → first note arrives
  revealDown: 'down', // first note slides down → second note arrives
}

const OPPOSITE: Record<SlideDirection, SlideDirection> = {
  left: 'right',
  right: 'left',
  down: 'up',
  up: 'down',
  rise: 'rise',
}

/** Unit offset a page travels, as a percentage of its own size. */
const OFFSETS: Record<SlideDirection, { x: string; y: string }> = {
  left: { x: '-100%', y: '0%' },
  right: { x: '100%', y: '0%' },
  down: { x: '0%', y: '100%' },
  up: { x: '0%', y: '-100%' },
  rise: { x: '0%', y: '0%' },
}

/**
 * Which way a single hop moves. Forward hops use the choreography above, a
 * step back mirrors it, and every other hop keeps the original soft rise.
 */
function directionFor(from: PhaseId, to: PhaseId): SlideDirection {
  if (previousPhase(to) === from) return FORWARD[to] ?? 'rise'
  if (previousPhase(from) === to) return OPPOSITE[FORWARD[from] ?? 'rise']
  return 'rise'
}

/** Where a page starts: off-screen for a slide, a little low for a rise. */
function enterPose(direction: SlideDirection, reduced: boolean) {
  if (reduced) return { opacity: 1 }
  const offset = OFFSETS[direction]
  if (direction === 'rise') return { opacity: 0, x: 0, y: 14, scale: 0.99 }
  return { opacity: 0, x: offset.x, y: offset.y }
}

/** Where a page ends up: settled, centred, fully opaque. */
const REST_POSE = { opacity: 1, x: 0, y: 0, scale: 1 }

/** Where a page goes as it leaves. */
function exitPose(direction: SlideDirection, reduced: boolean) {
  if (reduced) return { opacity: 0 }
  const offset = OFFSETS[direction]
  if (direction === 'rise') return { opacity: 0, x: 0, y: 0 }
  return { opacity: 0, x: offset.x, y: offset.y }
}

interface Page {
  phase: PhaseId
  /** the direction of the hop that brought this page in */
  direction: SlideDirection
}

/** One page on screen: either the one arriving, or the one leaving. */
interface Layer extends Page {
  leaving: boolean
}

interface PhaseTransitionProps {
  /** the phase that should be on screen now */
  phase: PhaseId
  reduced: boolean
}

/**
 * Page transition between phases.
 *
 * The arriving page eases in and the leaving page eases out **at the same
 * time**, so the two notes hand over like pages of a book: left for the first
 * hop, down for the next one, mirrored when stepping back.
 *
 * This is a hand-rolled hand-off rather than `AnimatePresence`: the leaving
 * page is simply held in state for the length of one slide and then dropped by
 * a timer. There is no exit-coordination lifecycle to get stuck in, so React
 * StrictMode's double-mounting in development cannot leave a wrapper frozen in
 * its exit pose. The leaving page is `inert` and untouchable while it slides
 * away, and under reduced motion the whole thing collapses to an instant swap
 * with no second layer at all.
 *
 * The leaving page is always rendered first — the slot it already occupied — so
 * the hand-off only ever deletes the old head child and appends the new one.
 * Nothing is re-ordered, and the arriving page is stacked on top.
 */
export function PhaseTransition({ phase, reduced }: PhaseTransitionProps) {
  const [page, setPage] = useState<Page>({ phase, direction: 'rise' })
  const [outgoing, setOutgoing] = useState<Page | null>(null)
  const showingRef = useRef(phase)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    const from = showingRef.current
    if (from === phase) return
    showingRef.current = phase

    const direction = directionFor(from, phase)
    setPage({ phase, direction })

    if (reduced) {
      setOutgoing(null)
      return
    }

    setOutgoing({ phase: from, direction })
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null
      setOutgoing(null)
    }, DURATION * 1000)
  }, [phase, reduced])

  // Drop any pending hand-off timer if this wrapper ever unmounts mid-slide.
  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    },
    [],
  )

  const layers: Layer[] = outgoing
    ? [
        { ...outgoing, leaving: true },
        { ...page, leaving: false },
      ]
    : [{ ...page, leaving: false }]

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      {layers.map((layer) => (
        <motion.div
          key={layer.phase}
          inert={layer.leaving}
          initial={layer.leaving ? false : enterPose(layer.direction, reduced)}
          animate={layer.leaving ? exitPose(layer.direction, reduced) : REST_POSE}
          transition={{ duration: reduced ? 0.01 : DURATION, ease: SOFT_EASE }}
          className={`absolute inset-0 flex min-h-0 flex-col ${
            layer.leaving ? 'pointer-events-none z-0' : 'z-10'
          }`}
        >
          <PhaseScreen phase={layer.phase} />
        </motion.div>
      ))}
    </div>
  )
}
