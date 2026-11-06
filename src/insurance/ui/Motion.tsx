import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { MotionConfig, useReducedMotion } from 'framer-motion'

const MotionSettings = createContext({ paused: false, systemReduced: false, toggle: () => {} })

export function PresentationMotion({ children }: { children: ReactNode }) {
  const systemReduced = !!useReducedMotion()
  const [userPaused, setUserPaused] = useState(false)
  const paused = userPaused || systemReduced
  return <MotionSettings.Provider value={{ paused, systemReduced, toggle: () => setUserPaused(p => !p) }}>
    <MotionConfig reducedMotion={paused ? 'always' : 'user'}>{children}</MotionConfig>
  </MotionSettings.Provider>
}

export const usePresentationMotion = () => useContext(MotionSettings)
export const revealTransition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
