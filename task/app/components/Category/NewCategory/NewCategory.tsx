import { Input } from "antd";
import styles from "./newcategory.module.css";
import { Button } from "../../Button";

export const NewCategory = () => {
  return (
    <div className={styles.newCategory}>
      <Input className={styles.input} placeholder="Add a title..." />
      <div className={styles.buttons}>
        <Button actionType="save" />
        <Button actionType="cancel" />
      </div>
    </div>
  );
};
