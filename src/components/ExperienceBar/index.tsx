// Style
import style from "./style.module.scss";

export default function ExperienceBar() {
  return (
    <header className={style.experienceBar}>
      <span className={style.from}>0 xp</span>
      <div className={style.progress}>
        <div className={style.done} style={{ width: "60%" }}>
          <span className={style.current}>360 xp</span>
        </div>
      </div>
      <span className={style.to}>600 xp</span>
    </header>
  );
}
