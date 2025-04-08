import { Link } from "@tanstack/react-router";
import { AppContextProvider } from "@trmf/app-context-util";
import { Button } from "@trmf/ui/components/button";
import "@trmf/ui/globals.css";
import "./app.css";

export const App = () => {
  return (
    <AppContextProvider>
      <div className="host">
        <div className="card">
          <div className="title">I'm the bookmarks app</div>
          {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        </div>
      </div>
      <Link className="bookmarks:[&.active]:font-bold" to="/">
        Home
      </Link>{" "}
      <Link className="bookmarks:[&.active]:font-bold" to="/tags">
        About
      </Link>
      <Button>Bookmarks</Button>
    </AppContextProvider>
  );
};

export default App;
