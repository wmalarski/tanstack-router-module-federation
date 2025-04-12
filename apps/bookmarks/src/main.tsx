import React from "react";
import ReactDOM from "react-dom/client";
import { BookmarkListRoute } from "./routes/bookmark-list-route/bookmark-list-route";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BookmarkListRoute />
  </React.StrictMode>,
);
