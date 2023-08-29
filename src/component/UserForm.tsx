"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Loading from "./Loading";

export default function UserForm({
  version,
  setUser,
  closeForm,
}: {
  version: string;
  setUser: () => void;
  closeForm: () => void;
}) {
  // Component state and variables.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [formErrorMessages, setFormErrorMessages] = useState<IFormErrMessage[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  // Fetch url
  const formUrl =
    version === "sign-up"
      ? "http://localhost:3050/users"
      : "http://localhost:3050/session";

  // Error messages
  const [usernameError] = formErrorMessages.filter(
    (errorMessage) => errorMessage.field === "username"
  );

  const [passwordError] = formErrorMessages.filter(
    (errorMessage) => errorMessage.field === "password"
  );
  const [passwordConfirmationError] = formErrorMessages.filter(
    (errorMessage) => errorMessage.field === "passwordConfirmation"
  );

  // User input handlers.
  const handleUsernameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handlePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(e.target.value);
  };

  // Form submission handler.
  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    // Form data to be sent
    const formData: {
      username: string;
      password: string;
      passwordConfirmation?: string;
    } = {
      username,
      password,
    };

    // Logic to add password confirmation incase of sign-up version.
    if (version === "sign-up") {
      // Local validation.
      if (password !== passwordConfirmation) {
        setFormErrorMessages([
          {
            message: "Password and password confirmation do not match.",
            value: passwordConfirmation,
            field: "passwordConfirmation",
          },
        ]);
        return;
      }
      formData.passwordConfirmation = passwordConfirmation;
    }

    // Reset Form Error messages.
    setFormErrorMessages([]);

    // Set loading
    setLoading(true);

    // Fetch data
    try {
      // Response
      const response = await fetch(formUrl, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      // Response data
      const apiData: IFormErrMessage[] | signUpOkResponse =
        await response.json();

      // Check if response is ok.
      if (response.ok) {
        // Set user
        console.log(apiData);
        window.location.reload();
      } else {
        // Set API data for form error message.
        setFormErrorMessages(apiData as IFormErrMessage[]);
        (apiData as IFormErrMessage[]).forEach(
          (errorMessage: IFormErrMessage) => {
            switch (errorMessage.field) {
              case "username":
                setUsername(errorMessage.value);
                break;
              case "password":
                setPassword(errorMessage.value);
                break;
              case "passwordConfirmation":
                setPasswordConfirmation(errorMessage.value);
                break;
            }
          }
        );
      }

      // Close loading.
      setLoading(false);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  // Render form
  return (
    <form action="" method="POST" onSubmit={handleSubmitForm} id="userForm">
      <button type="button" className="closeBtn" onClick={closeForm}>
        x
      </button>
      <label htmlFor="username">
        Username:
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleUsernameInput}
          minLength={3}
          value={username}
          required
        />
        {/* Logic for rendering error message. */}
        {usernameError && (
          <p className="formErrorMessage">{usernameError.message}</p>
        )}
      </label>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          id="password"
          onChange={handlePasswordInput}
          minLength={5}
          value={password}
          required
        />
        {passwordError && (
          <p className="formErrorMessage">{passwordError.message}</p>
        )}
      </label>

      {/* Logic to show password confirmation for version sign-up */}
      {version === "sign-up" && (
        <label htmlFor="passwordConfirmation">
          Confirm password:
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            onChange={handlePasswordConfirmation}
            value={passwordConfirmation}
            required
          />
          {passwordConfirmationError && (
            <p className="formErrorMessage">
              {passwordConfirmationError.message}
            </p>
          )}
        </label>
      )}
      {loading ? <Loading /> : <button type="submit">Submit</button>}
    </form>
  );
}
