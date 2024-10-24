import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "./Search";
import "@testing-library/jest-dom";

describe("Search", () => {
  const mockSetSearch = jest.fn();
  const renderSearchComponent = () =>
    render(<Search setSearch={mockSetSearch} />);
  const inputElement = () => screen.getByPlaceholderText("Search...");

  beforeEach(() => {
    jest.clearAllMocks();
    renderSearchComponent();
  });

  it("renders the input field with the correct placeholder", () => {
    expect(inputElement()).toBeInTheDocument();
    expect(inputElement()).toHaveValue("");
  });

  it("calls setSearch with the correct value on input change", () => {
    fireEvent.change(inputElement(), { target: { value: "test" } });

    expect(mockSetSearch).toHaveBeenCalledTimes(1);
    expect(mockSetSearch).toHaveBeenCalledWith("test");
  });

  it("calls setSearch with correct values on multiple changes", () => {
    fireEvent.change(inputElement(), { target: { value: "first" } });
    fireEvent.change(inputElement(), { target: { value: "second" } });
    fireEvent.change(inputElement(), { target: { value: "third" } });

    expect(mockSetSearch).toHaveBeenCalledTimes(3);
    expect(mockSetSearch).toHaveBeenNthCalledWith(1, "first");
    expect(mockSetSearch).toHaveBeenNthCalledWith(2, "second");
    expect(mockSetSearch).toHaveBeenNthCalledWith(3, "third");
  });
});
