import { render, screen, fireEvent } from "@testing-library/react";
import { NoteListItem } from "./NoteListItem";
import { Note } from "@/Context";
import "@testing-library/jest-dom";

describe("NoteListItem", () => {
  const mockNote: Note = {
    id: 1,
    title: "Note Title",
    description: "Note Description",
  };

  const mockOnNoteSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders note title and description", () => {
    render(
      <NoteListItem
        note={mockNote}
        isSelected={false}
        onNoteSelect={mockOnNoteSelect}
      />
    );

    expect(screen.getByText("Note Title")).toBeInTheDocument();
    expect(screen.getByText("Note Description")).toBeInTheDocument();
  });

  it("applies selected class when isSelected is true", () => {
    const { container } = render(
      <NoteListItem
        note={mockNote}
        isSelected={true}
        onNoteSelect={mockOnNoteSelect}
      />
    );

    expect(container.firstChild).toHaveClass("noteWrapper");
    expect(container.firstChild).toHaveClass("selected");
  });

  it("does not apply selected class when isSelected is false", () => {
    const { container } = render(
      <NoteListItem
        note={mockNote}
        isSelected={false}
        onNoteSelect={mockOnNoteSelect}
      />
    );

    expect(container.firstChild).toHaveClass("noteWrapper");
    expect(container.firstChild).not.toHaveClass("selected");
  });

  it("calls onNoteSelect when the note is clicked", () => {
    render(
      <NoteListItem
        note={mockNote}
        isSelected={false}
        onNoteSelect={mockOnNoteSelect}
      />
    );

    fireEvent.click(screen.getByText("Note Title"));
    expect(mockOnNoteSelect).toHaveBeenCalledTimes(1);
    expect(mockOnNoteSelect).toHaveBeenCalledWith(mockNote.id);
  });
});
