import { render, screen, fireEvent } from "@testing-library/react";
import { CategoryListItem } from "./CategoryListItem";
import { Category } from "@/Context";
import "@testing-library/jest-dom";

describe("CategoryListItem component", () => {
  const mockCategory: Category = {
    id: 1,
    name: "Category",
    notes: [{ id: 1, title: "Note 1", description: "Description 1" }],
  };

  const mockOnCategorySelect = jest.fn();

  it("renders category name and note count", () => {
    render(
      <CategoryListItem
        isOpen={false}
        category={mockCategory}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    expect(screen.getByText("Category (1)")).toBeInTheDocument();
  });

  it("calls onCategorySelect when clicked", () => {
    render(
      <CategoryListItem
        isOpen={false}
        category={mockCategory}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    const categoryItem = screen.getByText("Category (1)");
    fireEvent.click(categoryItem);

    expect(mockOnCategorySelect).toHaveBeenCalledTimes(1);
    expect(mockOnCategorySelect).toHaveBeenCalledWith(1);
  });

  it("renders the closed icon when isOpen is false", () => {
    render(
      <CategoryListItem
        isOpen={false}
        category={mockCategory}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    expect(screen.getByTestId("CaretDownFilled")).toBeInTheDocument();
    expect(screen.queryByTestId("CaretRightFilled")).not.toBeInTheDocument();
  });

  it("renders the open icon when isOpen is true", () => {
    render(
      <CategoryListItem
        isOpen={true}
        category={mockCategory}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    expect(screen.getByTestId("CaretRightFilled")).toBeInTheDocument();
    expect(screen.queryByTestId("CaretDownFilled")).not.toBeInTheDocument();
  });

  it("has 'open' class when isOpen is true", () => {
    const { container } = render(
      <CategoryListItem
        isOpen={true}
        category={mockCategory}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    const categoryWrapper = container.firstChild;
    expect(categoryWrapper).toHaveClass("open");
  });

  it("does not have 'open' class when isOpen is false", () => {
    const { container } = render(
      <CategoryListItem
        isOpen={false}
        category={mockCategory}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    const categoryWrapper = container.firstChild;
    expect(categoryWrapper).not.toHaveClass("open");
  });
});
