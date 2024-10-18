import { Button } from "antd";
import styles from "./createbutton.module.css";
import { PlusOutlined } from "@ant-design/icons";
interface P {
  children: JSX.Element;
}
export const CreateButton = ({ children }: P) => {
  return (
    <Button>
      {children} <PlusOutlined />
    </Button>
  );
};
