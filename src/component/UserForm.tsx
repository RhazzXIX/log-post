export default function UserForm({ version }: { version: string }) {
  return (
    <form action="" method="POST">
      <label htmlFor="username">
        Username:
        <input type="text" id="username" name="username" />
      </label>
      <label htmlFor="password">
        Password:
        <input type="password" name="password" id="password" />
      </label>
      {/* Logic to show password confirmation for version sign-up */}
      {version === "sign-up" && (
        <label htmlFor="passwordConfirmation">
          Confirm password:
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
          />
        </label>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}
