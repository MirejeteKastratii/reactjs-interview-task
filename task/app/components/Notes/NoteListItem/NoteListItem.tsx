import { type Note } from "@/Context";
import styles from "./notelistitem.module.css";
import classNames from "classnames";

interface P {
  note: Note;
  isSelected: boolean;
  onNoteSelect: (id: number) => void;
}

export const NoteListItem = ({ note, isSelected, onNoteSelect }: P) => {
  return (
    <div
      className={classNames(styles.noteWrapper, {
        [styles.selected]: isSelected,
      })}
      onClick={() => onNoteSelect(note.id)}
    >
      <h1 className={styles.noteTitle}>{note.title}</h1>
      <p className={styles.noteText}>{note.description}</p>
    </div>
  );
};
