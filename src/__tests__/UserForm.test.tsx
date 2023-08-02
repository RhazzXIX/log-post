import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserForm from "@/component/UserForm";

describe("UserForm component", () => {
  it("Renders on screen", () => {
    const { container } = render(<UserForm version={"log-in"} />);
    expect(container).toMatchSnapshot();
  });
  it("Shows the confirm password input if the versions is sign-up", () => {
    const { rerender } = render(<UserForm version="log-in" />);

    expect(screen.queryByLabelText("Confirm password")).not.toBeInTheDocument();

    rerender(<UserForm version="sign-up" />);

    expect(screen.queryByLabelText("Confirm password:")).toBeInTheDocument();
  });
});
