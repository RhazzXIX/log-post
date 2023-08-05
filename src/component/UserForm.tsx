"use client";
import { ChangeEvent, FormEvent, useState } from "react";

export default function UserForm({ version }: { version: string }) {
  // Component state and variables.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const url =
    version === "sign-up"
      ? "https://blog-api-86j6.onrender.com/users"
      : "https://blog-api-86j6.onrender.com/session";

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
    if (version === "sign-up")
      formData.passwordConfirmation = passwordConfirmation;
    
    // Fetch data
    const apiData = await fetch(url, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error: Error) => {
        throw new Error(error.message);
      });
    
    console.log(apiData);
  };

  return (
    <form action="" method="POST" onSubmit={handleSubmitForm}>
      <label htmlFor="username">
        Username:
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleUsernameInput}
          value={username}
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          id="password"
          onChange={handlePasswordInput}
          value={password}
        />
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
          />
        </label>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}
