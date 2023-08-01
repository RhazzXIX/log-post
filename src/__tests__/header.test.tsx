import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/component/header";

describe("Header component", () => {
  it("Renders on screen", () => {
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });
});
