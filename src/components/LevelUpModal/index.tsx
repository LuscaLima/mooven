import { useContext } from 'react'
import { ChallengeContext } from '../../contexts/ChallengeContext'

// Style
import style from './style.module.scss'

export default function LevelUpModal() {
  const { level, closeModalLevel } = useContext(ChallengeContext)

  return (
    <div className={style.levelUpModal}>
      <div className={style.content}>
        <button className={style.close} onClick={closeModalLevel}>
          &times;
        </button>
        <header>{level}</header>
        <strong>Parabéns</strong>
        <p>🎉 Você subiu de nível 🎉</p>
      </div>
    </div>
  )
}
