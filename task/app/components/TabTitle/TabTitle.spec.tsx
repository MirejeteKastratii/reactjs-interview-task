import { fireEvent, render, screen } from "@testing-library/react";
import { TabTitle } from "./TabTitle";
import "@testing-library/jest-dom";

describe("TabTitle", () => {
  it("renders the tab title text correctly", () => {
    render(<TabTitle />);
    const titleElement = screen.getByText("Your Notes");

    expect(titleElement).toBeInTheDocument();
  });

  it("renders the close icon", () => {
    render(<TabTitle />);
    const iconElement = screen.getByTestId("close-button");

    expect(iconElement).toBeInTheDocument();
  });

  it("does not close on X click", () => {
    render(<TabTitle />);
    const iconElement = screen.getByTestId("close-button");
    const titleElement = screen.getByText("Your Notes");

    fireEvent.click(iconElement);

    expect(iconElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });
});
