import { useContext, useEffect, useState } from 'react'
import { CountdownContext } from '../../contexts/CountdownContext'

// Style
import style from './style.module.scss'

export default function Countdown() {
  const { start, reset, isActive, hasFinished, minutes, seconds } = useContext(
    CountdownContext
  )

  const [minLeft, minRight] = minutes.toString().padStart(2, '0').split('')
  const [secLeft, secRight] = seconds.toString().padStart(2, '0').split('')

  return (
    <>
      <div className={style.countdown}>
        <div className={style.minutes}>
          <span>{minLeft}</span>
          <span>{minRight}</span>
        </div>
        <span>:</span>
        <div className={style.seconds}>
          <span>{secLeft}</span>
          <span>{secRight}</span>
        </div>
      </div>
      {isActive ? (
        <button
          type="button"
          className={`${style.countdownButton} ${style.abandon}`}
          onClick={reset}
        >
          Abandonar ciclo <span>&times;</span>
        </button>
      ) : hasFinished ? (
        <button disabled className={style.countdownButton}>
          Ciclo encerrado{' '}
          <img src="icons/check_circle.svg" alt="Ícone de ciclo concluído" />
        </button>
      ) : (
        <button type="button" className={style.countdownButton} onClick={start}>
          Iniciar ciclo
        </button>
      )}
    </>
  )
}
