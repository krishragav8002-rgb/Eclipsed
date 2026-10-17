import { PhaseShell } from './components/phases/PhaseShell'
import { GrainOverlay } from './components/scrapbook/GrainOverlay'
import { ScrapbookBackground } from './components/scrapbook/ScrapbookBackground'
import { WinterScene } from './components/winter/WinterScene'
import { BackgroundMusicProvider } from './components/BackgroundMusic'
import { ExperienceProvider } from './state/ExperienceContext'
import { useExperience } from './state/useExperience'

/**
 * The layers themselves. Sits inside the provider so it can read the current
 * phase — the winter veil has to be a fixed, full-bleed sibling of the shared
 * background rather than something a single screen paints for itself.
 */
function Experience() {
  const { state } = useExperience()

  return (
    <>
      <ScrapbookBackground />
      <WinterScene
        active={state.phase === 'winter'}
        nightActive={state.phase === 'moonNote' || state.phase === 'phase2'}
        storybookNightActive={state.phase === 'moonNote'}
      />
      <PhaseShell />
      <GrainOverlay />
    </>
  )
}

export default function App() {
  return (
    <ExperienceProvider>
      <BackgroundMusicProvider>
        <Experience />
      </BackgroundMusicProvider>
    </ExperienceProvider>
  )
}
