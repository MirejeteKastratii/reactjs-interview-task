import { Button as AntdBtn } from "antd";
import styles from "./button.module.css";
import {
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import classNames from "classnames";

type ActionType = "create" | "save" | "delete" | "cancel";

interface P {
  actionType: ActionType;
  onClick?: () => void;
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

export const Button = ({ actionType, onClick, buttonName }: P) => {
  return (
    <AntdBtn
      className={classNames(classMap[actionType], styles.button)}
      onClick={onClick}
    >
      {buttonName && <span className={styles.buttonLabel}>{buttonName}</span>}
      <span
        className={classNames(styles.icon, {
          [styles.hasBorder]: buttonName,
        })}
      >
        {iconMap[actionType]}
      </span>
    </AntdBtn>
  );
};
