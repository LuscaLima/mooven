// Style
import style from "./style.module.scss";

export default function Profile() {
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
          Level <strong>22</strong>
        </p>
      </div>
    </div>
  );
}
