import { createContext, useContext, type Dispatch } from 'react'
import type { ExperienceAction, ExperienceState } from './experienceReducer'

export interface ExperienceContextValue {
  state: ExperienceState
  dispatch: Dispatch<ExperienceAction>
}

export const ExperienceContext = createContext<ExperienceContextValue | null>(null)

export function useExperience(): ExperienceContextValue {
  const ctx = useContext(ExperienceContext)
  if (!ctx) throw new Error('useExperience must be used inside <ExperienceProvider>')
  return ctx
}
