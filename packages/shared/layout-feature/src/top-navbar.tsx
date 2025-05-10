import { Link } from "@tanstack/react-router";
import { SignOutButton } from "@trmf/auth-feature/sign-out-button";
import { useUser } from "@trmf/auth-util";

export const TopNavbar = () => {
  const user = useUser();

  return (
    <nav className="flex flex-row gap-2 p-2">
      <ul>
        <li>
          <Link className="host:[&.active]:font-bold" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="host:[&.active]:font-bold" to="/tags">
            About
          </Link>
        </li>
        <li>
          <Link className="host:[&.active]:font-bold" to="/share">
            Share
          </Link>
        </li>
        {user ? (
          <li>
            <SignOutButton />
          </li>
        ) : null}
      </ul>
    </nav>
  );
};
