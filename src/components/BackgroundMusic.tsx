import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Music2 } from 'lucide-react'
import type { ReactNode } from 'react'

interface BackgroundMusicContextValue {
  setVideoPlaying: (playing: boolean) => void
}

const BackgroundMusicContext = createContext<BackgroundMusicContextValue | null>(null)
const DISMISSED_KEY = 'birthday-music-prompt-dismissed'

function wasPromptDismissed(): boolean {
  try {
    return window.sessionStorage.getItem(DISMISSED_KEY) === 'true'
  } catch (error) {
    console.warn('Could not read the music prompt preference for this tab.', error)
    return false
  }
}

function rememberPromptDismissal() {
  try {
    window.sessionStorage.setItem(DISMISSED_KEY, 'true')
  } catch (error) {
    console.warn('Could not save the music prompt preference for this tab.', error)
  }
}

function describeAudioError(audio: HTMLAudioElement): string {
  switch (audio.error?.code) {
    case MediaError.MEDIA_ERR_ABORTED:
      return 'Audio loading was interrupted. Tap to try again.'
    case MediaError.MEDIA_ERR_NETWORK:
      return 'The audio file could not be fetched. Check that public/audio/pesamale.mp3 is deployed.'
    case MediaError.MEDIA_ERR_DECODE:
      return 'Your browser could not decode this audio file.'
    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
      return 'The audio file is missing or unsupported. Check public/audio/pesamale.mp3.'
    default:
      return 'The soundtrack could not be played. Tap to try again.'
  }
}

export function BackgroundMusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const enabledRef = useRef(false)
  const videoPlayingRef = useRef(false)
  const dismissedRef = useRef(false)
  const autoplayAttemptedRef = useRef(false)
  const reloadBeforeRetryRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoPlaying, setVideoPlayingState] = useState(false)
  const [promptVisible, setPromptVisible] = useState(false)
  const [showControl, setShowControl] = useState(false)
  const [status, setStatus] = useState('')

  const handlePlaybackFailure = useCallback((error: unknown, source: 'autoplay' | 'manual' | 'resume') => {
    enabledRef.current = false
    setIsPlaying(false)
    setShowControl(true)

    const blocked = error instanceof DOMException && error.name === 'NotAllowedError'
    if (blocked && source === 'autoplay' && !dismissedRef.current) {
      setPromptVisible(true)
      setStatus('')
      return
    }

    setPromptVisible(false)
    const audio = audioRef.current
    setStatus(blocked ? 'Your browser blocked playback. Tap to try again.' : audio ? describeAudioError(audio) : 'The soundtrack could not be played. Tap to try again.')
  }, [])

  const startMusic = useCallback(
    (source: 'autoplay' | 'manual' | 'resume') => {
      const audio = audioRef.current
      if (!audio || videoPlayingRef.current) return

      enabledRef.current = true
      setStatus('')
      if (reloadBeforeRetryRef.current) {
        reloadBeforeRetryRef.current = false
        audio.load()
      }
      const playback = audio.play()
      void playback.catch((error: unknown) => handlePlaybackFailure(error, source))
    },
    [handlePlaybackFailure],
  )

  const setVideoPlaying = useCallback(
    (playing: boolean) => {
      if (videoPlayingRef.current === playing) return
      videoPlayingRef.current = playing
      setVideoPlayingState(playing)

      const audio = audioRef.current
      if (playing) {
        audio?.pause()
      } else if (enabledRef.current) {
        startMusic('resume')
      }
    },
    [startMusic],
  )

  const dismissPrompt = useCallback(() => {
    dismissedRef.current = true
    rememberPromptDismissal()
    setPromptVisible(false)
    setShowControl(true)
  }, [])

  const toggleMusic = useCallback(() => {
    if (enabledRef.current) {
      enabledRef.current = false
      setStatus('')
      audioRef.current?.pause()
      return
    }
    startMusic('manual')
  }, [startMusic])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    dismissedRef.current = wasPromptDismissed()
    audio.volume = 1

    const handlePlaying = () => {
      enabledRef.current = true
      setIsPlaying(true)
      setShowControl(true)
      setPromptVisible(false)
      setStatus('')
    }
    const handlePause = () => setIsPlaying(false)
    const handleError = () => {
      reloadBeforeRetryRef.current = true
      enabledRef.current = false
      setIsPlaying(false)
      setPromptVisible(false)
      setShowControl(true)
      setStatus(describeAudioError(audio))
    }

    audio.addEventListener('playing', handlePlaying)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('error', handleError)
    if (!autoplayAttemptedRef.current) {
      autoplayAttemptedRef.current = true
      startMusic('autoplay')
    }

    return () => {
      audio.removeEventListener('playing', handlePlaying)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('error', handleError)
    }
  }, [startMusic])

  return (
    <BackgroundMusicContext.Provider value={{ setVideoPlaying }}>
      <audio ref={audioRef} src="/audio/pesamale.mp3" loop preload="auto" className="sr-only" />
      {children}
      {promptVisible ? (
        <aside className="music-dock" aria-live="polite">
          <p className="music-dock__message">A little music for your birthday? 💚🎶</p>
          <div className="music-dock__actions">
            <button type="button" className="music-dock__button music-dock__button--primary" onClick={() => startMusic('manual')}>
              Play music ♡
            </button>
            <button type="button" className="music-dock__button" onClick={dismissPrompt}>
              Not now
            </button>
          </div>
        </aside>
      ) : showControl && !videoPlaying ? (
        <div className="music-dock music-dock--control">
          <button
            type="button"
            className={`music-dock__toggle${isPlaying ? ' music-dock__toggle--playing' : ''}`}
            onClick={toggleMusic}
            aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
            aria-pressed={isPlaying}
            title={status || (isPlaying ? 'Pause background music' : 'Play background music')}
          >
            <Music2 aria-hidden="true" size={20} strokeWidth={2.2} />
          </button>
          {status && <span className="music-dock__status">{status}</span>}
        </div>
      ) : null}
    </BackgroundMusicContext.Provider>
  )
}

export function useBackgroundMusic() {
  const context = useContext(BackgroundMusicContext)
  if (!context) {
    throw new Error('useBackgroundMusic must be used within BackgroundMusicProvider.')
  }
  return context
}