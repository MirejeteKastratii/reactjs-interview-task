import { render, screen, fireEvent } from "@testing-library/react";
import { NewCategory } from "./NewCategory";
import "@testing-library/jest-dom";

jest.mock("antd", () => ({
  Input: ({ onChange, placeholder, className }: any) => (
    <input
      data-testid="new-category-input"
      className={className}
      placeholder={placeholder}
      onChange={onChange}
    />
  ),
}));

jest.mock("@/components", () => ({
  Button: ({ actionType, onClick }: any) => (
    <button onClick={onClick}>{actionType}</button>
  ),
}));

describe("NewCategory", () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    render(
      <NewCategory
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        onChange={mockOnChange}
      />
    );
  });

  it("renders input with placeholder and buttons", () => {
    expect(screen.getByPlaceholderText("Add a title...")).toBeInTheDocument();
    expect(screen.getByText("save")).toBeInTheDocument();
    expect(screen.getByText("cancel")).toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    const input = screen.getByTestId("new-category-input");
    fireEvent.change(input, { target: { value: "New Category Name" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith("New Category Name");
  });

  it("calls onSubmit when save button is clicked", () => {
    const saveButton = screen.getByText("save");
    fireEvent.click(saveButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when cancel button is clicked", () => {
    const cancelButton = screen.getByText("cancel");
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});
