import { Link } from "@tanstack/react-router";
import { Button } from "@trmf/ui/components/button";
import "@trmf/ui/globals.css";
import "./app.css";

export const App = () => {
  return (
    <>
      <div className="host">
        <div className="card">
          <div className="title">I'm the bookmarks app</div>
        </div>
      </div>
      <Link className="bookmarks:[&.active]:font-bold" to="/">
        Home
      </Link>{" "}
      <Link className="bookmarks:[&.active]:font-bold" to="/tags">
        About
      </Link>
      <Button>Bookmarks</Button>
    </>
  );
};

export default App;
