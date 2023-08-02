import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userevent from "@testing-library/user-event";
import Header from "@/component/Header";

const userInfo: IUser | undefined = {
  id: "125id",
  name: "test user",
  isAuthor: true,
};

const user = userevent.setup();

const loginFn = jest.fn();

const signUpFn = jest.fn();

describe("Header component", () => {
  it("Renders on screen.", () => {
    const { container } = render(<Header handleLogin= {loginFn} handleSignUp={signUpFn}/>);

    expect(container).toMatchSnapshot();
  });
  it("Shows appropriate buttons when the user is signed in.", () => {
    render(<Header user={userInfo} handleLogin= {loginFn} handleSignUp={signUpFn}/>);

    expect(screen.getByText("Profile")).toBeInTheDocument();
  });
  it("Activates the passed function when the appropriate button is clicked.", async () => {
    render(<Header handleLogin= {loginFn} handleSignUp={signUpFn} />);

    const loginBtn = screen.getByText("Log in");
    const signUpBtn = screen.getByText("Sign up");
    await user.click(loginBtn);

    expect(loginFn).toHaveBeenCalled();

    await user.click(signUpBtn);
    
    expect(signUpFn).toHaveBeenCalled();

    expect(loginFn).toHaveBeenCalledTimes(1);
    expect(signUpFn).toHaveBeenCalledTimes(1);
  });
});
