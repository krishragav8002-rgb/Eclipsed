import type { PhaseId } from '../../state/experienceReducer'
import { GreetingScreen } from './GreetingScreen'
import { LoveQuestion } from './LoveQuestion'
import { MessagePage } from './MessagePage'
import { Phase2 } from './Phase2'
import { Phase3 } from './Phase3'
import { QuickQuestionsTransition } from './QuickQuestionsTransition'
import { WinterTransition } from './WinterTransition'
import { MoonNote } from './MoonNote'

/**
 * Maps a phase id to its screen.
 *
 * Kept separate from the transition wrapper so the wrapper is free to hold two
 * of these at once — the page leaving and the page arriving — without knowing
 * anything about what any phase contains.
 */
export function PhaseScreen({ phase }: { phase: PhaseId }) {
  switch (phase) {
    case 'greeting':
      return <GreetingScreen />
    case 'revealLeft':
      return <MessagePage phase="revealLeft" />
    case 'revealDown':
      return <MessagePage phase="revealDown" />
    case 'quickQuestions':
      return <QuickQuestionsTransition />
    case 'loveQuestion':
      return <LoveQuestion />
    case 'winter':
      return <WinterTransition />
    case 'moonNote':
      return <MoonNote />
    case 'phase2':
      return <Phase2 />
    case 'phase3':
      return <Phase3 />
    default:
      return null
  }
}
