import { TabTitle, Content } from "@/components";
import styles from "./layout.module.css";

export const Layout = () => {
  return (
    <div className={styles.main}>
      <TabTitle />
      <Content />
    </div>
  );
};
