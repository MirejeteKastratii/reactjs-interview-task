import { Button as AntdBtn } from "antd";
import styles from "./button.module.css";
import {
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteFilled,
} from "@ant-design/icons";

type ActionType = "create" | "save" | "delete" | "cancel";

interface P {
  actionType: ActionType;
  buttonName?: string;
}

const iconMap: Record<P["actionType"], JSX.Element> = {
  save: <CheckOutlined />,
  delete: <DeleteFilled />,
  create: <PlusOutlined />,
  cancel: <CloseOutlined />,
};

const classMap: Record<P["actionType"], string> = {
  delete: styles.delete,
  cancel: styles.delete,
  save: styles.save,
  create: styles.save,
};

export const Button = ({ actionType, buttonName }: P) => {
  return (
    <AntdBtn className={classMap[actionType]}>
      {buttonName && <span className={styles.buttonLabel}>{buttonName}</span>}
      <span className={styles.icon}>{iconMap[actionType]}</span>
    </AntdBtn>
  );
};
