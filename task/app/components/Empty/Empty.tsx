import classNames from "classnames";
import styles from "./empty.module.css";
type Color = "green" | "blue";
interface P {
  color: Color;
  isSmall?: boolean;
}
export const Empty = ({ isSmall, color }: P) => {
  return (
    <div
      className={classNames(styles.empty, {
        [styles.small]: isSmall,
        [styles.green]: color === "green",
        [styles.blue]: color === "blue",
      })}
    ></div>
  );
};
