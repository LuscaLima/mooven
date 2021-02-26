import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookie from 'js-cookie'

import challenges from '../../challenges/index.json'

// Components
import LevelUpModal from '../components/LevelUpModal'

// Props definition
type ChallengesProviderProps = {
  children: ReactNode
  level?: number
  currentExperience?: number
  completedChallenges?: number
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
  closeModalLevel: () => void
}

export const ChallengeContext = createContext({} as IChallengeContext)

export default function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  )
  const [completedChallenges, setCompletedChallenges] = useState(
    rest.completedChallenges ?? 0
  )
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isModalLevelOpen, setIsModalLevelOpen] = useState(false)

  // Collateral effects
  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookie.set('level', level.toString())
    Cookie.set('currentExperience', currentExperience.toString())
    Cookie.set('completedChallenges', completedChallenges.toString())
  }, [level, currentExperience, completedChallenges])

  // Expirience
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  // Increases the level
  function levelUp() {
    setLevel(level + 1)
    setIsModalLevelOpen(true)
  }

  // Close the level modal
  function closeModalLevel() {
    setIsModalLevelOpen(false)
  }

  // Starts a new challenge
  function startNewChallenge() {
    const randomIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomIndex]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🏃‍♂️', {
        body: `Valendo ${challenge.amount} XP`,
        lang: 'pt-BR',
        icon: '/favicon.png',
        image: `/icons/${challenge.type}.svg`,
        requireInteraction: true,
        vibrate: [200, 100, 200],
      })
    }
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
        closeModalLevel,
      }}
    >
      {children}

      {isModalLevelOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  )
}
