import { useContext } from 'react'
import { ChallengeContext } from '../../contexts/ChallengeContext'

// Style
import style from './style.module.scss'

export default function Profile() {
  const { level } = useContext(ChallengeContext)

  return (
    <div className={style.profile}>
      <img
        src="https://github.com/luscalima.png"
        alt="Lusca Lima"
        loading="lazy"
        className={style.photo}
      />
      <div className={style.description}>
        <h3 className={style.name}>Lusca Lima</h3>
        <p className={style.level}>
          <img src="icons/level.svg" alt="Ícone de nível do usuário" />
          Level <strong>{level}</strong>
        </p>
      </div>
    </div>
  )
}
