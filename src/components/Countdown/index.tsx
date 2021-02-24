import { useEffect, useState } from "react";

// Style
import style from "./style.module.scss";

// Makes the object unmodifiable
const METRICS = Object.freeze({
  // defaultTime: 25 * 60,
  defaultTime: 0.1 * 60,
  secondsPerMinute: 60,
  initialActive: false,
  initialFinished: false,
});

export default function Countdown() {
  const [time, setTime] = useState(METRICS.defaultTime);
  const [isActive, setIsActive] = useState(METRICS.initialActive);
  const [hasFinished, setHasFinished] = useState(METRICS.initialFinished);

  const minutes = Math.floor(time / METRICS.secondsPerMinute);
  const seconds = time % METRICS.secondsPerMinute;

  const [minLeft, minRight] = minutes.toString().padStart(2, "0").split("");
  const [secLeft, secRight] = seconds.toString().padStart(2, "0").split("");

  let timeout: NodeJS.Timeout;

  // Start the countdown
  function start() {
    setIsActive(true);
  }

  // Update the countdown
  function update() {
    setTime(time - 1);
  }

  // Reset the countdown
  function reset() {
    clearTimeout(timeout);
    setIsActive(METRICS.initialActive);
    setTime(METRICS.defaultTime);
  }

  // Collateral effects
  useEffect(() => {
    const currentTime = parseInt(localStorage.getItem("currentTime"));
    const isActive = localStorage.getItem("isActive") === "true";

    if (currentTime && isActive) {
      setTime(currentTime - 1);
      start();
    }
  }, []);

  useEffect(() => {
    if (isActive && time > 0) {
      timeout = setTimeout(update, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
    }
  }, [isActive, time]);

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
          Ciclo encerrado
        </button>
      ) : (
        <button type="button" className={style.countdownButton} onClick={start}>
          Iniciar ciclo
        </button>
      )}
    </>
  );
}
