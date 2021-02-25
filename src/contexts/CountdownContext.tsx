import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ChallengeContext } from './ChallengeContext'

// Props definition
type CountdownProviderProps = {
  children: ReactNode
}

// Interfaces
interface ICountdownContext {
  start: () => void
  reset: () => void
  isActive: boolean
  minutes: number
  seconds: number
  hasFinished: boolean
}

// Makes the object unmodifiable
const METRICS = Object.freeze({
  // defaultTime: 25 * 60,
  defaultTime: 0.1 * 60,
  secondsPerMinute: 60,
  initialActive: false,
  initialFinished: false,
})

export const CountdownContext = createContext({} as ICountdownContext)

export default function CountdownProvider({
  children,
}: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengeContext)

  const [time, setTime] = useState(METRICS.defaultTime)
  const [isActive, setIsActive] = useState(METRICS.initialActive)
  const [hasFinished, setHasFinished] = useState(METRICS.initialFinished)

  const minutes = Math.floor(time / METRICS.secondsPerMinute)
  const seconds = time % METRICS.secondsPerMinute

  let timeout: NodeJS.Timeout

  // Start the countdown
  function start() {
    setIsActive(true)
  }

  // Update the countdown
  function update() {
    setTime(time - 1)
  }

  // Reset the countdown
  function reset() {
    clearTimeout(timeout)
    setIsActive(METRICS.initialActive)
    setTime(METRICS.defaultTime)
  }

  // Collateral effects
  useEffect(() => {
    if (isActive && time > 0) {
      timeout = setTimeout(update, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider
      value={{ start, reset, isActive, minutes, seconds, hasFinished }}
    >
      {children}
    </CountdownContext.Provider>
  )
}
