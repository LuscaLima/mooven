import { createContext, ReactNode, useState } from 'react'

import challenges from '../../challenges/index.json'

// Props definition
type ChallengesProviderProps = {
  children: ReactNode
}

// Interfaces
interface IChallenge {
  type: string
  description: string
  amount: number
}

interface IChallengeContext {
  level: number
  currentExperience: number
  experienceToNextLevel: number
  completedChallenges: number
  levelUp: () => void
  startNewChallenge: () => void
  activeChallenge: IChallenge
  resetChallenge: () => void
  completeChallenge: () => void
}

export const ChallengeContext = createContext({} as IChallengeContext)

export default function ChallengesProvider({
  children,
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [completedChallenges, setCompletedChallenges] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  // Expirience
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  // Increases the level
  function levelUp() {
    setLevel(level + 1)
  }

  // Starts a new challenge
  function startNewChallenge() {
    const randomIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomIndex]

    setActiveChallenge(challenge)
  }

  // Complete a challenge
  function completeChallenge() {
    if (!activeChallenge) {
      return
    }

    const { amount } = activeChallenge as IChallenge

    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceToNextLevel) {
      levelUp()
      finalExperience -= experienceToNextLevel
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setCompletedChallenges(completedChallenges + 1)
  }

  // Reset the challenge
  function resetChallenge() {
    setActiveChallenge(null)
  }

  return (
    <ChallengeContext.Provider
      value={{
        level,
        currentExperience,
        experienceToNextLevel,
        completedChallenges,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  )
}
