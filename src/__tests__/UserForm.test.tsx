import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserForm from "@/component/UserForm";
import userEvent from "@testing-library/user-event";

const fetch = (global.fetch = jest.fn());

Object.defineProperty(window, "location", {
  writable: true,
  value: { reload: jest.fn() },
});

const user = userEvent.setup();

const userInfo: IUser | undefined = {
  id: "125id",
  name: "testUser1234",
  isAuthor: true,
};

const userInput = {
  username: "testUser1234",
  password: "testPass1234",
  passwordConfirmation: "testPass1234",
};

const sendData = {
  mode: "cors",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const errorMessages = [
  {
    message: "Error in username field",
    value: "user",
    field: "username",
  },
  {
    message: "Error in password field",
    value: "user",
    field: "password",
  },
  {
    message: "Error in passwordConfirmation field",
    value: "user",
    field: "passwordConfirmation",
  },
];

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

  describe("User inputs and form submission", () => {
    beforeEach(() => {
      fetch.mockClear();
    });

    it("Let's the user sign-up", async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ message: "Response ok", userInfo }),
      });

      render(<UserForm key={"sign-up"} version={"sign-up"} />);

      const usernameInput = screen.getByLabelText(/Username/);
      const passwordInput = screen.getByLabelText("Password:");
      const submitBtn = screen.getByRole("button", { name: "Submit" });
      const passwordConfirmationInput = screen.getByLabelText(/confirm/i);

      await user.type(usernameInput, userInput.username);
      await user.type(passwordInput, userInput.password);
      await user.type(
        passwordConfirmationInput,
        userInput.passwordConfirmation
      );

      expect(usernameInput).toHaveValue("testUser1234");
      expect(passwordInput).toHaveValue("testPass1234");
      expect(passwordConfirmationInput).toHaveValue("testPass1234");

      await user.click(submitBtn);

      expect(fetch).toHaveBeenCalled();
      expect(fetch.mock.calls[0][0]).toMatch(
        "https://blog-api-86j6.onrender.com/users"
      );
      expect(fetch.mock.calls[0][1]).toEqual({
        body: JSON.stringify({ ...userInput }),
        ...sendData,
      });
    });

    it("Let's the user log-in", async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ message: "Response ok", userInfo }),
      });

      render(<UserForm key={"log-in"} version={"log-in"} />);

      const usernameInput = screen.getByLabelText(/Username/);
      const passwordInput = screen.getByLabelText("Password:");
      const submitBtn = screen.getByRole("button", { name: "Submit" });

      await user.type(usernameInput, userInput.username);
      await user.type(passwordInput, userInput.password);

      expect(usernameInput).toHaveValue("testUser1234");
      expect(passwordInput).toHaveValue("testPass1234");

      await user.click(submitBtn);

      expect(fetch).toHaveBeenCalled();
      expect(fetch.mock.calls[0][0]).toMatch(
        "https://blog-api-86j6.onrender.com/session"
      );
      expect(fetch.mock.calls[0][1]).toEqual({
        body: JSON.stringify({
          username: userInput.username,
          password: userInput.password,
        }),
        ...sendData,
      });
    });

    it("Informs the user about input errors.", async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: () => Promise.resolve(errorMessages),
      });

      render(<UserForm key={"log-in"} version={"sign-up"} />);

      const usernameInput = screen.getByLabelText(/Username/);
      const passwordInput = screen.getByLabelText("Password:");
      const passwordConfirmationInput = screen.getByLabelText(/confirm/i);
      const submitBtn = screen.getByRole("button", { name: "Submit" });

      await user.type(usernameInput, userInput.username);
      await user.type(passwordInput, userInput.password);
      await user.type(
        passwordConfirmationInput,
        userInput.passwordConfirmation
      );

      expect(
        screen.queryByText(errorMessages[0].message)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(errorMessages[1].message)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(errorMessages[2].message)
      ).not.toBeInTheDocument();

      await user.click(submitBtn);

      expect(screen.getByText(errorMessages[0].message)).toBeInTheDocument();
      expect(screen.getByText(errorMessages[1].message)).toBeInTheDocument();
      expect(screen.getByText(errorMessages[2].message)).toBeInTheDocument();
    });
  });
});
