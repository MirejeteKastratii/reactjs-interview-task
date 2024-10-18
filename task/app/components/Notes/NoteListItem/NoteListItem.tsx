import styles from "./notelistitem.module.css";

interface P {
  noteTitle: string;
  noteText: string;
}

export const NoteListItem = ({ noteTitle, noteText }: P) => {
  return (
    <div className={styles.noteWrapper}>
      <h1 className={styles.noteTitle}>{noteTitle}</h1>
      <p className={styles.noteText}>{noteText}</p>
    </div>
  );
};
