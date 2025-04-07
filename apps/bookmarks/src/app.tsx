import { Link } from "@tanstack/react-router";
import "./app.css";

export const App = () => {
  return (
    <>
      <div className="host">
        <div className="card">
          <div className="title">I'm the bookmarks app</div>
        </div>
      </div>
      <Link to="/" className="bookmarks:[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/tags" className="bookmarks:[&.active]:font-bold">
        About
      </Link>
    </>
  );
};

export default App;
