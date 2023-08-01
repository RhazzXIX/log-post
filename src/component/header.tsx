import Link from "next/link";
const Header = ({ user }: { user?: IUser }) => {
  return (
    <header>
      <div className="widthLimiter">
        <Link href={"/"}>
          <h1>Log Pose</h1>
        </Link>
        <button>Log in</button>
        <button>Sign up</button>
      </div>
    </header>
  );
};

export default Header;
