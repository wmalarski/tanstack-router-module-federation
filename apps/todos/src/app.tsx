import { Link } from "@tanstack/react-router";
import "./app.css";

export const App = () => {
  return (
    <>
      <div className="host">
        <div className="card">
          <div className="title">I'm the todos app</div>
        </div>
      </div>
      <Link to="/" className="todos:[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/tags" className="todos:[&.active]:font-bold">
        About
      </Link>
    </>
  );
};

export default App;
