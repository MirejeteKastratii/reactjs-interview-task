import { render } from "@testing-library/react";
import { Empty } from "./Empty";
import "@testing-library/jest-dom";

describe("Empty component", () => {
  it("renders with green color class", () => {
    const { container } = render(<Empty color="green" />);

    expect(container.firstChild).toHaveClass("empty");
    expect(container.firstChild).toHaveClass("green");
    expect(container.firstChild).not.toHaveClass("blue");
  });

  it("renders with blue color class", () => {
    const { container } = render(<Empty color="blue" />);

    expect(container.firstChild).toHaveClass("empty");
    expect(container.firstChild).toHaveClass("blue");
    expect(container.firstChild).not.toHaveClass("green");
  });

  it("renders as small when isSmall is true", () => {
    const { container } = render(<Empty color="green" isSmall={true} />);

    expect(container.firstChild).toHaveClass("empty");
    expect(container.firstChild).toHaveClass("small");
  });

  it("does not render as small when isSmall is false", () => {
    const { container } = render(<Empty color="blue" isSmall={false} />);

    expect(container.firstChild).toHaveClass("empty");
    expect(container.firstChild).not.toHaveClass("small");
  });

  it("renders without isSmall prop", () => {
    const { container } = render(<Empty color="green" />);

    expect(container.firstChild).toHaveClass("empty");
    expect(container.firstChild).not.toHaveClass("small");
  });
});
