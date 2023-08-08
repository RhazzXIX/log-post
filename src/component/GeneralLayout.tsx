"use client";

import { useState } from "react";
import Header from "./Header";
import UserForm from "./UserForm";

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Component state
  const [userForm, setUserForm] = useState({ isShown: false, version: "" });

  // Handling user form
  const showLoginForm = () => {
    setUserForm({ isShown: true, version: "log-in" });
  };
  const showSignUpForm = () => {
    setUserForm({ isShown: true, version: "sign-up" });
  };
  const hideForm = () => {
    setUserForm({ isShown: false, version: "" });
  };
  const closeFormSection = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).id !== "userFormSection") return;
    setUserForm({ isShown: false, version: "" });
  };
  // Render layout
  return (
    <div id="genLayout">
      <Header handleLogin={showLoginForm} handleSignUp={showSignUpForm} />
      {userForm.isShown && (
        <section id="userFormSection" onClick={closeFormSection}>
          <UserForm
            key={userForm.version}
            version={userForm.version}
            closeForm={hideForm}
          />
        </section>
      )}
      {children}
    </div>
  );
}
