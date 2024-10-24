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
  isBig?: boolean;
  buttonName?: string;
  onClick?: () => void;
}

const iconMap: Record<P["actionType"], JSX.Element> = {
  save: <CheckOutlined data-testid="Check" />,
  delete: <DeleteFilled data-testid="Delete" />,
  create: <PlusOutlined data-testid="Plus" />,
  cancel: <CloseOutlined data-testid="Close" />,
};

const classMap: Record<P["actionType"], string> = {
  delete: styles.delete,
  cancel: styles.delete,
  save: styles.save,
  create: styles.save,
};

export const Button = ({ actionType, onClick, buttonName, isBig }: P) => {
  return (
    <AntdBtn
      className={classNames(classMap[actionType], styles.button, {
        [styles.big]: isBig,
      })}
      onClick={onClick}
    >
      {buttonName && <span className={styles.buttonLabel}>{buttonName}</span>}
      <span
        className={classNames(styles.icon, {
          [styles.greenBorder]:
            buttonName && (actionType === "create" || actionType === "save"),
          [styles.redBorder]:
            buttonName && (actionType === "cancel" || actionType === "delete"),
        })}
      >
        {iconMap[actionType]}
      </span>
    </AntdBtn>
  );
};
