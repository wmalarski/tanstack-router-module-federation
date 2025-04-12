import { Link } from "@tanstack/react-router";
import { Button } from "@trmf/ui/components/button";

export const BookmarksList = () => {
  return (
    <>
      <div className="host">
        <div className="card">
          <div className="title">I'm the bookmarks app</div>
        </div>
      </div>
      <Link className="tags:[&.active]:font-bold" to="/">
        Home
      </Link>{" "}
      <Link className="tags:[&.active]:font-bold" to="/tags">
        About
      </Link>
      <Button>Bookmarks</Button>
    </>
  );
};
