import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";
import "@testing-library/jest-dom";

describe("Button", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the create button correctly", () => {
    render(
      <Button actionType="create" onClick={mockOnClick} buttonName="Create" />
    );

    const buttonElement = screen.getByRole("button", { name: /Create/i });
    expect(buttonElement).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("renders the save button correctly", () => {
    render(
      <Button actionType="save" onClick={mockOnClick} buttonName="Save" />
    );

    const buttonElement = screen.getByRole("button", { name: /Save/i });
    expect(buttonElement).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("renders the delete button correctly", () => {
    render(
      <Button actionType="delete" onClick={mockOnClick} buttonName="Delete" />
    );

    const buttonElement = screen.getByRole("button", { name: /Delete/i });
    expect(buttonElement).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("renders the cancel button correctly", () => {
    render(
      <Button actionType="cancel" onClick={mockOnClick} buttonName="Cancel" />
    );

    const buttonElement = screen.getByRole("button", { name: /Cancel/i });
    expect(buttonElement).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("calls onClick when the button is clicked", () => {
    render(
      <Button actionType="create" onClick={mockOnClick} buttonName="Create" />
    );
    const buttonElement = screen.getByRole("button", { name: /Create/i });

    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("adds 'big' class when isBig is true", () => {
    render(
      <Button
        actionType="create"
        onClick={mockOnClick}
        buttonName="Create"
        isBig
      />
    );

    const buttonElement = screen.getByRole("button", { name: /Create/i });
    expect(buttonElement).toHaveClass("big");
  });

  it("does not add 'big' class when isBig is false", () => {
    render(
      <Button
        actionType="create"
        onClick={mockOnClick}
        buttonName="Create"
        isBig={false}
      />
    );

    const buttonElement = screen.getByRole("button", { name: /Create/i });
    expect(buttonElement).not.toHaveClass("big");
  });
});
