import { useReducer, type ReactNode } from 'react'
import { experienceReducer, initialState } from './experienceReducer'
import { ExperienceContext } from './useExperience'

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(experienceReducer, initialState)
  return (
    <ExperienceContext.Provider value={{ state, dispatch }}>
      {children}
    </ExperienceContext.Provider>
  )
}
