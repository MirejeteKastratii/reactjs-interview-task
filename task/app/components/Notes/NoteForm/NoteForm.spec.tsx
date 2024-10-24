import { render, screen, fireEvent } from "@testing-library/react";
import { NoteForm } from "./NoteForm";
import { Note } from "@/Context";
import "@testing-library/jest-dom";

describe("NoteForm", () => {
  const mockNote: Note = {
    id: 1,
    title: "Sample Note",
    description: "This is a sample description.",
  };

  const mockSubmitNote = jest.fn();
  const mockDeleteNote = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the note form with initial values", () => {
    render(
      <NoteForm
        note={mockNote}
        isEdit={true}
        submitNote={mockSubmitNote}
        deleteNote={mockDeleteNote}
      />
    );

    expect(screen.getByPlaceholderText("Add a title")).toHaveValue(
      mockNote.title
    );
    expect(screen.getByPlaceholderText("Write your note here...")).toHaveValue(
      mockNote.description
    );
    expect(screen.getByText("Save Changes")).toBeInTheDocument();
    expect(screen.getByText("Delete Note")).toBeInTheDocument();
  });

  it("updates title and description on input change", () => {
    render(
      <NoteForm
        note={mockNote}
        isEdit={true}
        submitNote={mockSubmitNote}
        deleteNote={mockDeleteNote}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Add a title"), {
      target: { value: "Updated Title" },
    });
    fireEvent.change(screen.getByPlaceholderText("Write your note here..."), {
      target: { value: "Updated Description" },
    });

    expect(screen.getByPlaceholderText("Add a title")).toHaveValue(
      "Updated Title"
    );
    expect(screen.getByPlaceholderText("Write your note here...")).toHaveValue(
      "Updated Description"
    );
  });

  it("calls submitNote with updated note when Save Changes is clicked", () => {
    render(
      <NoteForm
        note={mockNote}
        isEdit={true}
        submitNote={mockSubmitNote}
        deleteNote={mockDeleteNote}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Add a title"), {
      target: { value: "Updated Title" },
    });
    fireEvent.change(screen.getByPlaceholderText("Write your note here..."), {
      target: { value: "Updated Description" },
    });

    fireEvent.click(screen.getByText("Save Changes"));

    expect(mockSubmitNote).toHaveBeenCalledTimes(1);
    expect(mockSubmitNote).toHaveBeenCalledWith({
      id: mockNote.id,
      title: "Updated Title",
      description: "Updated Description",
    });
  });

  it("calls deleteNote when Delete Note is clicked", () => {
    render(
      <NoteForm
        note={mockNote}
        isEdit={true}
        submitNote={mockSubmitNote}
        deleteNote={mockDeleteNote}
      />
    );

    fireEvent.click(screen.getByText("Delete Note"));

    expect(mockDeleteNote).toHaveBeenCalledTimes(1);
    expect(mockDeleteNote).toHaveBeenCalledWith(mockNote.id);
  });

  it("does not render Delete Note button when isEdit is false", () => {
    render(
      <NoteForm
        note={mockNote}
        isEdit={false}
        submitNote={mockSubmitNote}
        deleteNote={mockDeleteNote}
      />
    );

    expect(screen.queryByText("Delete Note")).not.toBeInTheDocument();
  });
});
