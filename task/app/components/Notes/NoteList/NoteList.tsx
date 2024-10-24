import { useState } from "react";
import classNames from "classnames";
import { type Note } from "@/Context";
import { Button, NoteListItem, Search } from "@/components";
import styles from "./noteliststyles.module.css";

interface P {
  list: Note[];
  selectedNoteId: number;
  onNoteSelect: (id: number) => void;
  onCreateNote: () => void;
}

export const NoteList = ({
  list,
  selectedNoteId,
  onNoteSelect,
  onCreateNote,
}: P) => {
  const [search, setSearch] = useState<string>("");

  const filteredNotes = list.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className={styles.noteListWrapper}>
      <div
        className={classNames(styles.noteListButtons, {
          [styles.noteListButtonsFull]: Boolean(selectedNoteId),
        })}
      >
        <Button
          actionType="create"
          buttonName="Create Note"
          onClick={onCreateNote}
        />
        <Search setSearch={setSearch} data-testid="search_input" />
      </div>
      <div className={styles.notes}>
        {filteredNotes.map((el) => (
          <NoteListItem
            key={el.id}
            note={el}
            onNoteSelect={onNoteSelect}
            isSelected={el.id === selectedNoteId}
          />
        ))}
      </div>
    </div>
  );
};
