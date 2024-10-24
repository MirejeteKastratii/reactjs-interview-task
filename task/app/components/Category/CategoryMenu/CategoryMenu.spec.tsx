import { render, screen, fireEvent } from "@testing-library/react";
import { CategoryMenu } from "./CategoryMenu";
import { useNotes } from "@/Context";
import "@testing-library/jest-dom"; // For matchers like toBeInTheDocument

jest.mock("@/Context", () => ({
  useNotes: jest.fn(),
}));

jest.mock("@/components", () => ({
  Button: ({ isBig, actionType, buttonName, onClick }: any) => (
    <button onClick={onClick}>{buttonName}</button>
  ),
  CategoryListItem: ({ isOpen, category, onCategorySelect }: any) => (
    <div
      data-testid="category-item"
      onClick={() => onCategorySelect(category.id)}
    >
      {category.name}
    </div>
  ),
  NewCategory: ({ onCancel, onChange, onSubmit }: any) => (
    <div>
      <input
        data-testid="new-category-input"
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={onSubmit}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  ),
}));

describe("CategoryMenu", () => {
  const mockCategories = [
    { id: 1, name: "Category 1", notes: [] },
    { id: 2, name: "Category 2", notes: [] },
  ];

  const mockAddCategory = jest.fn();
  const mockOnCategorySelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNotes as jest.Mock).mockReturnValue({
      categories: mockCategories,
      addCategory: mockAddCategory,
    });
  });

  it("renders categories from context", () => {
    render(<CategoryMenu onCategorySelect={mockOnCategorySelect} />);

    const categoryItems = screen.getAllByTestId("category-item");
    expect(categoryItems.length).toBe(mockCategories.length);
    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Category 2")).toBeInTheDocument();
  });

  it("calls onCategorySelect when a category is clicked", () => {
    render(<CategoryMenu onCategorySelect={mockOnCategorySelect} />);

    const categoryItem = screen.getByText("Category 1");
    fireEvent.click(categoryItem);

    expect(mockOnCategorySelect).toHaveBeenCalledTimes(1);
    expect(mockOnCategorySelect).toHaveBeenCalledWith(1);
  });

  it("displays 'Create category' button when no category is being created", () => {
    render(<CategoryMenu onCategorySelect={mockOnCategorySelect} />);

    expect(screen.getByText("Create category")).toBeInTheDocument();
  });

  it("shows new category input when 'Create category' button is clicked", () => {
    render(<CategoryMenu onCategorySelect={mockOnCategorySelect} />);

    const createButton = screen.getByText("Create category");
    fireEvent.click(createButton);

    expect(screen.getByTestId("new-category-input")).toBeInTheDocument();
  });

  it("allows canceling the new category creation", () => {
    render(<CategoryMenu onCategorySelect={mockOnCategorySelect} />);

    fireEvent.click(screen.getByText("Create category"));
    fireEvent.click(screen.getByText("Cancel"));

    expect(screen.queryByTestId("new-category-input")).not.toBeInTheDocument();
    expect(screen.getByText("Create category")).toBeInTheDocument();
  });

  it("calls addCategory when submitting a new category", () => {
    render(<CategoryMenu onCategorySelect={mockOnCategorySelect} />);

    fireEvent.click(screen.getByText("Create category"));

    const input = screen.getByTestId("new-category-input");
    fireEvent.change(input, { target: { value: "New Category" } });
    fireEvent.click(screen.getByText("Save"));

    expect(mockAddCategory).toHaveBeenCalledTimes(1);
    expect(mockAddCategory).toHaveBeenCalledWith("New Category");
  });

  it("hides new category input after submitting", () => {
    render(<CategoryMenu onCategorySelect={mockOnCategorySelect} />);

    fireEvent.click(screen.getByText("Create category"));

    const input = screen.getByTestId("new-category-input");
    fireEvent.change(input, { target: { value: "New Category" } });
    fireEvent.click(screen.getByText("Save"));

    expect(screen.queryByTestId("new-category-input")).not.toBeInTheDocument();
    expect(screen.getByText("Create category")).toBeInTheDocument();
  });
});
