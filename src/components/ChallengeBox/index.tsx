import { useState } from "react";

// Style
import style from "./style.module.scss";

export default function ChallengeBox() {
  const [hasActiveChallenge, setHasActiveChallenge] = useState(true);

  return (
    <div className={style.challengeBox}>
      {hasActiveChallenge ? (
        <div className={style.active}>
          <header>
            <strong>Ganhe 400xp</strong>
          </header>
          <main>
            <img src="icons/hand.svg" alt="Mão com um peso" loading="lazy" />
            <strong>Exercite-se</strong>
            <p>
              É agora Lucas, bora lá meu parça.
              <br />
              Ande por 3 minutos e exercite suas pernas para você ficar suadável
            </p>
          </main>
          <footer>
            <button type="button" className={style.failButton}>
              Falhei
            </button>
            <button type="button" className={style.completeButton}>
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={style.notActive}>
          <strong>
            Inicie um ciclo para receber desafios a serem completados
          </strong>
          <p>
            <img src="icons/level-up.svg" alt="Level up" loading="lazy" />
            Complete-os, ganhe experiência e avançe de nível.
          </p>
        </div>
      )}
    </div>
  );
}
