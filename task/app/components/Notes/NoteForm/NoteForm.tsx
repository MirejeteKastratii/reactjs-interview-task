import { Form, Input } from "antd";
import { Button } from "../../Button";
const { TextArea } = Input;
import styles from "./noteform.module.css";
import { Empty } from "../../Empty/Empty";
type FormType = "create" | "edit";
interface P {
  formType: FormType;
}
export const NoteForm = () => {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.formHeaderWrapper}>
        <span className={styles.controls}>
          <Empty color="blue" />
          <Empty color="blue" />
          <Empty color="green" />
        </span>
        <span className={styles.controls}>
          <Empty isSmall color="blue" />
          <Empty isSmall color="blue" />
          <Empty isSmall color="blue" />
        </span>
      </div>
      <Form className={styles.form}>
        <Input placeholder="Add a title" />
        <TextArea placeholder="Write your note here..." />
      </Form>
      <div className={styles.formButtons}>
        <Button actionType="delete" buttonName="Delete Note" />
        <Button actionType="save" buttonName="Save Changes" />
      </div>
    </div>
  );
};
