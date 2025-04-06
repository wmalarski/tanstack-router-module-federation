import { Link } from "@tanstack/react-router";

export const App = () => {
  return (
    <>
      <div className="host">
        <div className="card">
          <div className="title">I'm the todos app</div>
        </div>
      </div>
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
    </>
  );
};

export default App;
