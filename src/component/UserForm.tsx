export default function UserForm({ version }: { version: string }) {
  return (
    <form action="">
      <label htmlFor="username">
        Username:
        <input type="text" id="username" name="username" />
      </label>
      <label htmlFor="password">
        Password:
        <input type="password" name="password" id="password" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
