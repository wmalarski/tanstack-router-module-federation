import { Link } from "@tanstack/react-router";
import "./app.css";

export const App = () => {
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
    </>
  );
};

export default App;
