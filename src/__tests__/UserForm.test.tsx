import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserForm from "@/component/UserForm";

describe("UserForm component", () => {
  it("Renders on screen", () => {
    const { container } = render(<UserForm version={"log-in"} />);
    expect(container).toMatchSnapshot();
  });
});
