import { Link, useRouteContext } from "@tanstack/react-router";
import { UserContext } from "@trmf/auth-util";
import { SupabaseProvider } from "@trmf/supabase-util";
import { Button } from "@trmf/ui/components/button";
import "@trmf/ui/globals.css";
import "./app.css";

export const App = () => {
  const context = useRouteContext({ from: "/" });

  return (
    <SupabaseProvider supabase={context.supabase}>
      <UserContext value={context.user}>
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
      </UserContext>
    </SupabaseProvider>
  );
};

export default App;
