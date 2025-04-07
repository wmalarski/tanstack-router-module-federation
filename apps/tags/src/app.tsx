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
      <Link to="/" className="tags:[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/tags" className="tags:[&.active]:font-bold">
        About
      </Link>
    </>
  );
};

export default App;
