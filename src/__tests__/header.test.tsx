import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/component/header";

const user: IUser = {
  id: "125id",
  name: "test user",
  isAuthor: true,
};

describe("Header component", () => {
  it("Renders on screen", () => {
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });
  it("Shows appropriate buttons when the user is signed in", () => {
    render(<Header user={user} />);

    expect(screen.getByText("Profile")).toBeInTheDocument();
  });
});
