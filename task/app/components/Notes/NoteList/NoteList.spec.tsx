import { render, screen, fireEvent } from "@testing-library/react";
import { NoteList } from "./NoteList";
import { Note } from "@/Context";
import "@testing-library/jest-dom";

describe("NoteList", () => {
  const mockNotes: Note[] = [
    { id: 1, title: "Note 1", description: "Description 1" },
    { id: 2, title: "Note 2", description: "Description 2" },
    { id: 3, title: "Annother One", description: "Description 3" },
  ];

  const mockOnNoteSelect = jest.fn();
  const mockOnCreateNote = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the NoteList with notes", () => {
    render(
      <NoteList
        list={mockNotes}
        selectedNoteId={0}
        onNoteSelect={mockOnNoteSelect}
        onCreateNote={mockOnCreateNote}
      />
    );

    expect(screen.getByText("Create Note")).toBeInTheDocument();
    expect(screen.getByText("Note 1")).toBeInTheDocument();
    expect(screen.getByText("Note 2")).toBeInTheDocument();
    expect(screen.getByText("Annother One")).toBeInTheDocument();
  });

  it("calls onCreateNote when Create Note button is clicked", () => {
    render(
      <NoteList
        list={mockNotes}
        selectedNoteId={0}
        onNoteSelect={mockOnNoteSelect}
        onCreateNote={mockOnCreateNote}
      />
    );

    fireEvent.click(screen.getByText("Create Note"));
    expect(mockOnCreateNote).toHaveBeenCalledTimes(1);
  });

  it("filters notes based on search input", () => {
    render(
      <NoteList
        list={mockNotes}
        selectedNoteId={0}
        onNoteSelect={mockOnNoteSelect}
        onCreateNote={mockOnCreateNote}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Search..."), {
      target: { value: "Note" },
    });

    expect(screen.getByText("Note 1")).toBeInTheDocument();
    expect(screen.getByText("Note 2")).toBeInTheDocument();
    expect(screen.queryByText("Annother One")).not.toBeInTheDocument();
  });

  it("calls onNoteSelect when a note is clicked", () => {
    render(
      <NoteList
        list={mockNotes}
        selectedNoteId={0}
        onNoteSelect={mockOnNoteSelect}
        onCreateNote={mockOnCreateNote}
      />
    );

    fireEvent.click(screen.getByText("Note 1"));
    expect(mockOnNoteSelect).toHaveBeenCalledTimes(1);
    expect(mockOnNoteSelect).toHaveBeenCalledWith(mockNotes[0].id);
  });

  it("applies the full class to the button wrapper when a note is selected", () => {
    const { container } = render(
      <NoteList
        list={mockNotes}
        selectedNoteId={1}
        onNoteSelect={mockOnNoteSelect}
        onCreateNote={mockOnCreateNote}
      />
    );

    expect(container.querySelector(".noteListButtons")).toHaveClass(
      "noteListButtonsFull"
    );
  });
});
