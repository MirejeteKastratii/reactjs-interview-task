import { render, screen, fireEvent } from "@testing-library/react";
import { NotesProvider, useNotes } from "./Context";
import "@testing-library/jest-dom";

const TestComponent = () => {
  const { categories, addNote, editNote, deleteNote, addCategory } = useNotes();

  return (
    <div>
      <button onClick={() => addCategory("New Category")}>Add Category</button>
      <button
        onClick={() =>
          addNote(
            {
              id: 11,
              title: "Note 11",
              description: "Description for note 11",
            },
            1
          )
        }
      >
        Add Note to Category 1
      </button>
      <button
        onClick={() =>
          editNote(
            {
              id: 1,
              title: "Updated Note 1",
              description: "Updated Description",
            },
            1
          )
        }
      >
        Edit Note 1 in Category 1
      </button>
      <button onClick={() => deleteNote(1, 1)}>
        Delete Note 1 from Category 1
      </button>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <h3>{category.name}</h3>
            <ul>
              {category.notes.map((note) => (
                <li key={note.id}>
                  <p>{note.title}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

describe("NotesProvider", () => {
  beforeEach(() => {
    render(
      <NotesProvider>
        <TestComponent />
      </NotesProvider>
    );
  });

  it("renders initial categories and notes", () => {
    expect(screen.getByText("Sample category")).toBeInTheDocument();
    expect(screen.getByText("Note 1")).toBeInTheDocument();
    expect(screen.getByText("Note 2")).toBeInTheDocument();
    expect(screen.getByText("Note 3")).toBeInTheDocument();
    expect(screen.getByText("Note 4")).toBeInTheDocument();
  });

  it("adds a new category", () => {
    fireEvent.click(screen.getByText("Add Category"));
    expect(screen.getByText("New Category")).toBeInTheDocument();
  });

  it("adds a note to a category", () => {
    fireEvent.click(screen.getByText("Add Note to Category 1"));
    expect(screen.getByText("Note 11")).toBeInTheDocument();
  });

  it("edits a note in a category", () => {
    fireEvent.click(screen.getByText("Edit Note 1 in Category 1"));
    expect(screen.getByText("Updated Note 1")).toBeInTheDocument();
  });

  it("deletes a note from a category", () => {
    fireEvent.click(screen.getByText("Delete Note 1 from Category 1"));
    expect(screen.queryByText("Note 1")).not.toBeInTheDocument();
  });

  it("throws an error when used outside of NotesProvider", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    const RenderTestComponent = () => {
      return <TestComponent />;
    };

    expect(() => render(<RenderTestComponent />)).toThrow(
      "Not used within provider."
    );

    consoleErrorSpy.mockRestore();
  });
});
