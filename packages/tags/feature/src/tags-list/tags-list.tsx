import { Link } from "@tanstack/react-router";
import { useUser } from "@trmf/auth-util";
import { Button } from "@trmf/ui/components/button";

export const TagsList = () => {
  return (
    <>
      <div className="host">
        <div className="card">
          <div className="title">I'm the tags app</div>
        </div>
      </div>
      <Link className="tags:[&.active]:font-bold" to="/">
        Home
      </Link>{" "}
      <Link className="tags:[&.active]:font-bold" to="/tags">
        About
      </Link>
      <Button>Tags</Button>
      <UserInfo />
    </>
  );
};

const UserInfo = () => {
  const user = useUser();

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};
