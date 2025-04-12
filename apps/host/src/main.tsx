import { getSupabaseClient } from "@trmf/supabase-util";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { getAsyncRouteTree } from "./router/route-tree";

const routeTree = getAsyncRouteTree();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App routeTree={routeTree} supabase={getSupabaseClient()} />
  </React.StrictMode>,
);
