import { render, screen } from "@testing-library/react";
import { Layout } from "./Layout";
import "@testing-library/jest-dom";

jest.mock("@/components/TabTitle", () => ({
  TabTitle: () => <div data-testid="tab-title">Tab Title</div>,
}));

jest.mock("@/components/Content", () => ({
  Content: () => <div data-testid="content">Content</div>,
}));

describe("Layout", () => {
  it("renders the main layout with TabTitle and Content", () => {
    const { container } = render(<Layout />);

    expect(container.firstChild).toHaveClass("main");
    expect(screen.getByTestId("tab-title")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });
});
