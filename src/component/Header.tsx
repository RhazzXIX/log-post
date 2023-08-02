import Link from "next/link";
const Header = ({
  user,
  handleLogin,
  handleSignUp,
}: {
  user?: IUser;
  handleLogin: () => void;
  handleSignUp: () => void;
}) => {
  // Render jsx element.
  return (
    <header>
      <div className="widthLimiter">
        <Link href={"/"}>
          <h1>Log Pose</h1>
        </Link>
        {/* conditional for buttons if user is logged in */}
        {user ? (
          <Link href={"/user"} className="linkBtn">
            Profile
          </Link>
        ) : (
          <>
            <button onClick={handleLogin}>Log in</button>
            <button onClick={handleSignUp}>Sign up</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
