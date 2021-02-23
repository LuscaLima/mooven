// Style
import { useEffect, useState } from "react";
import style from "./style.module.scss";

// Makes the object unmodifiable
const METRICS = Object.freeze({
  defaultMinutes: 25,
  secondsPerMinute: 60,
  initialActive: false,
  oneSecond: 1000,
});

export default function Countdown() {
  const [time, setTime] = useState(
    METRICS.defaultMinutes * METRICS.secondsPerMinute
  );
  const [active, setActive] = useState(METRICS.initialActive);

  const minutes = Math.floor(time / METRICS.secondsPerMinute);
  const seconds = time % METRICS.secondsPerMinute;

  const [minLeft, minRight] = minutes.toString().padStart(2, "0").split("");
  const [secLeft, secRight] = seconds.toString().padStart(2, "0").split("");

  // Start the countdown
  function start() {
    setActive(true);
  }

  // Update the countdown
  function update() {
    setTime(time - 1);
    localStorage.setItem("currentTime", time.toString());
  }

  // Collateral effects
  useEffect(() => {
    const initialTime = parseInt(localStorage.getItem("currentTime"));

    if (initialTime) {
      setTime(initialTime - 2);
      start();
    }
  }, []);

  useEffect(() => {
    if (active && time > 0) {
      setTimeout(update, METRICS.oneSecond);
    }
  }, [active, time]);

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
      <button type="button" className={style.countdownButton} onClick={start}>
        Iniciar um ciclo
      </button>
    </>
  );
}
