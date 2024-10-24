import { render, screen, fireEvent } from "@testing-library/react";
import { Content } from "./Content";
import { NotesProvider, useNotes } from "@/Context";
import "@testing-library/jest-dom";

const renderWithContext = (ui: React.ReactElement) => {
  return render(<NotesProvider>{ui}</NotesProvider>);
};

jest.mock("@/Context", () => {
  return {
    ...jest.requireActual("@/Context"),
    useNotes: jest.fn(),
  };
});

describe("Content Component", () => {
  const category1 = {
    id: 1,
    name: "Category 1",
    notes: [
      { id: 1, title: "First Note", description: "Description of first note" },
      {
        id: 2,
        title: "Second Note",
        description: "Description of second note",
      },
      { id: 3, title: "Third Note", description: "Description of third note" },
    ],
  };

  const category2 = { id: 2, name: "Category 2", notes: [] };

  beforeEach(() => {
    (useNotes as jest.Mock).mockReturnValue({
      categories: [category1, category2],
      addNote: jest.fn(),
      editNote: jest.fn(),
      deleteNote: jest.fn(),
    });
  });

  it("renders without crashing", () => {
    renderWithContext(<Content />);
    expect(screen.getByText(/select a category/i)).toBeInTheDocument();
  });

  it("selecting a category updates selected category", () => {
    renderWithContext(<Content />);
    fireEvent.click(screen.getByText(/category 1/i));
    expect(screen.queryByText(/select a category/i)).not.toBeInTheDocument();
  });

  it("displays notes when a category is selected", () => {
    renderWithContext(<Content />);
    fireEvent.click(screen.getByText(/category 1/i));

    expect(screen.getByText("First Note")).toBeInTheDocument();
    expect(screen.getByText("Second Note")).toBeInTheDocument();
    expect(screen.getByText("Third Note")).toBeInTheDocument();
  });

  it("filters notes based on search input", () => {
    renderWithContext(<Content />);
    fireEvent.click(screen.getByText(/category 1/i));

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "First" } });

    expect(screen.getByText("First Note")).toBeInTheDocument();
    expect(screen.queryByText("Second Note")).not.toBeInTheDocument();
    expect(screen.queryByText("Third Note")).not.toBeInTheDocument();
  });
});
