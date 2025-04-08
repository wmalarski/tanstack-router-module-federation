import { Link } from "@tanstack/react-router";
import { AppContextProvider } from "@trmf/app-context-util";
import { useUserContext } from "@trmf/auth-util";
import { Button } from "@trmf/ui/components/button";
import "@trmf/ui/globals.css";
import "./app.css";

export const App = () => {
  return (
    <AppContextProvider>
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
    </AppContextProvider>
  );
};

const UserInfo = () => {
  const user = useUserContext();

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};

export default App;
