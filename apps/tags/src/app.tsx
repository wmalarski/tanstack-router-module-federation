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
      </UserContext>
    </SupabaseProvider>
  );
};

export default App;
