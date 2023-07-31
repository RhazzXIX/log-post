import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../app/page";

describe("Home component", () => {
  it("Renders on screen", () => {
    const { container } = render(<Home />);

    expect(container).toMatchSnapshot();
  });
});
