import { Input } from "antd";
import styles from "./newcategory.module.css";
import { Button } from "@/components";

interface P {
  onSubmit: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
}

export const NewCategory = ({ onSubmit, onCancel, onChange }: P) => {
  return (
    <div className={styles.newCategory}>
      <Input
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
        placeholder="Add a title..."
      />
      <div className={styles.buttons}>
        <Button actionType="save" onClick={onSubmit} />
        <Button actionType="cancel" onClick={onCancel} />
      </div>
    </div>
  );
};
