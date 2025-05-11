import { Link } from "@tanstack/react-router";
import { SignOutButton } from "@trmf/auth-feature/sign-out-button";
import { useUser } from "@trmf/auth-util";

export const TopNavbar = () => {
  const user = useUser();

  return (
    <nav className="layout:py-4">
      <ul className="layout:mx-auto layout:flex layout:w-full layout:max-w-xl layout:flex-row layout:items-center layout:gap-2">
        <li>
          <Link className="layout:[&.active]:font-bold" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="layout:[&.active]:font-bold" to="/tags">
            Tags
          </Link>
        </li>
        <li>
          <Link className="layout:[&.active]:font-bold" to="/share">
            Share
          </Link>
        </li>
        {user ? (
          <li className="layout:flex layout:w-full layout:grow layout:justify-end">
            <SignOutButton />
          </li>
        ) : null}
      </ul>
    </nav>
  );
};
