// Style
import style from "../../style/scss/components/Container.module.scss";

// Props definition
type ContainerProps = {
  children: any;
};

export default function Container(props: ContainerProps) {
  return <div className={style.container}>{props.children}</div>;
}
