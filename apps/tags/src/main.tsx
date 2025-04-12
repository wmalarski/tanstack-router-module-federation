import React from "react";
import ReactDOM from "react-dom/client";
import { TagsListRoute } from "./routes/tags-list-route";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TagsListRoute />
  </React.StrictMode>,
);
