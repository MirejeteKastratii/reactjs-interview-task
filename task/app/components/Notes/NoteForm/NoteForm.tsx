import { Divider, Form, Input } from "antd";
import { Button, Empty } from "@/components";
import styles from "./noteform.module.css";
import { useEffect, useState } from "react";
import { type Note } from "@/Context";

const { TextArea } = Input;
interface P {
  note: Note;
  isEdit: boolean;
  submitNote: (note: Note) => void;
  deleteNote: (noteId: number) => void;
}
export const NoteForm = ({ note, isEdit, submitNote, deleteNote }: P) => {
  const [editedNote, setEditedNote] = useState<Note>({
    id: 0,
    title: "",
    description: "",
  });

  useEffect(() => {
    setEditedNote(note);
  }, [note]);

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
        <Input
          placeholder="Add a title"
          variant="borderless"
          value={editedNote?.title}
          onChange={(e) =>
            setEditedNote((prev) => ({ ...prev, title: e.target.value }))
          }
          data-testid="note_title"
        />

        <Divider />
        <TextArea
          value={editedNote?.description}
          className={styles.textarea}
          placeholder="Write your note here..."
          variant="borderless"
          onChange={(e) =>
            setEditedNote((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          data-testid="note_description"
        />
      </Form>
      <div className={styles.formButtons}>
        <Button
          actionType="save"
          buttonName="Save Changes"
          onClick={() => submitNote(editedNote)}
        />
        {isEdit && (
          <Button
            actionType="delete"
            buttonName="Delete Note"
            onClick={() => deleteNote(note.id)}
          />
        )}
      </div>
    </div>
  );
};
