import { CloseOutlined } from "@ant-design/icons";
import styles from "./tabtitle.module.css";
export const TabTitle = () => {
  return (
    <div className={styles.tabTitle}>
      <p>Your Notes</p>
      <CloseOutlined />
    </div>
  );
};
