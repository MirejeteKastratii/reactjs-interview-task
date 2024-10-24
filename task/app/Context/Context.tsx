import React, { createContext, useContext, useState } from "react";

export interface Note {
  id: number;
  title: string;
  description: string;
}

export interface Category {
  id: number;
  name: string;
  notes: Note[];
}

interface NotesContextType {
  categories: Category[];
  addNote: (note: Note, categoryId: number) => void;
  editNote: (note: Note, categoryId: number) => void;
  deleteNote: (noteId: number, categoryId: number) => void;
  addCategory: (categoryName: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error("Not used within provider.");
  return context;
};

const defaultCategories = [
  {
    id: 1,
    name: "Sample category",
    notes: [
      { id: 1, title: "Note 1", description: "Description for note 1" },
      { id: 2, title: "Note 2", description: "Description for note 2" },
      { id: 3, title: "Note 3", description: "Description for note 3" },
      { id: 4, title: "Note 4", description: "Description for note 4" },
      { id: 5, title: "Note 5", description: "Description for note 5" },
      { id: 6, title: "Note 6", description: "Description for note 6" },
      { id: 7, title: "Note 7", description: "Description for note 7" },
      { id: 8, title: "Note 8", description: "Description for note 8" },
      { id: 9, title: "Note 9", description: "Description for note 9" },
      { id: 10, title: "Note 10", description: "Description for note 10" },
    ],
  },
  { id: 2, name: "Sample category 1", notes: [] },
  { id: 3, name: "Sample category 2", notes: [] },
];

export const NotesProvider = ({ children }: { children: JSX.Element }) => {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);

  const addNote = (note: Note, categoryId: number) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? { ...category, notes: [...category.notes, note] }
          : category
      )
    );
  };

  const editNote = (note: Note, categoryId: number) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              notes: category.notes.map((noteEl) =>
                noteEl.id === note.id ? note : noteEl
              ),
            }
          : category
      )
    );
  };

  const deleteNote = (noteId: number, categoryId: number) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              notes: category.notes.filter((note) => note.id !== noteId),
            }
          : category
      )
    );
  };

  const addCategory = (categoryName: string) => {
    setCategories((prev) => [
      ...prev,
      { id: Math.random(), name: categoryName, notes: [] },
    ]);
  };

  return (
    <NotesContext.Provider
      value={{ categories, addNote, editNote, deleteNote, addCategory }}
    >
      {children}
    </NotesContext.Provider>
  );
};
