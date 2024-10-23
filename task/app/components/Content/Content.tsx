import { type Note, useNotes } from "@/Context";
import { CategoryMenu, NoteForm, NoteList } from "@/components";
import styles from "./content.module.css";
import { useState } from "react";

export const Content = () => {
  const [selected, setSelected] = useState<{
    categoryId: number;
    noteId: number;
  }>({ categoryId: 0, noteId: 0 });

  const [createNote, setCreateNote] = useState<Note | undefined>(undefined);

  const { categories, addNote, editNote, deleteNote } = useNotes();

  const noteList = categories.find(
    (el) => el.id === selected.categoryId
  )?.notes;

  const note = noteList?.find((el) => el.id === selected.noteId);

  const handleSelectCategory = (id: number) => {
    if (createNote) return;
    setSelected((prev) => ({
      categoryId: prev.categoryId === id ? 0 : id,
      noteId: 0,
    }));
  };

  const handleCreateNote = () => {
    setSelected((prev) => ({ ...prev, noteId: 0 }));
    setCreateNote({ title: "", id: Math.random(), description: "" });
  };

  const handleSubmitNote = (note: Note) => {
    setCreateNote(undefined);
    setSelected((prev) => ({ ...prev, noteId: 0 }));

    if (note.id === selected.noteId) return editNote(note, selected.categoryId);
    addNote(note, selected.categoryId);
  };

  const handleDeleteNote = (noteId: number) => {
    setSelected((prev) => ({ ...prev, noteId: 0 }));
    deleteNote(noteId, selected.categoryId);
  };

  return (
    <div className={styles.content}>
      <CategoryMenu
        onCategorySelect={handleSelectCategory}
        selectedCategory={selected.categoryId}
      />
      <div className={styles.notesContainer}>
        {noteList && !createNote && (
          <NoteList
            list={noteList}
            onNoteSelect={(id) => {
              setSelected((prev) => ({
                ...prev,
                noteId: prev.noteId === id ? 0 : id, // deselect on double tap
              }));
            }}
            onCreateNote={handleCreateNote}
            selectedNoteId={selected.noteId}
          />
        )}
        {!selected.categoryId && (
          <div className={styles.emptyNote}>select a category</div>
        )}
        {(createNote || note) && (
          <NoteForm
            note={createNote || note || { id: 0, title: "", description: "" }}
            submitNote={handleSubmitNote}
            deleteNote={handleDeleteNote}
            isEdit={!createNote}
          />
        )}
      </div>
    </div>
  );
};
