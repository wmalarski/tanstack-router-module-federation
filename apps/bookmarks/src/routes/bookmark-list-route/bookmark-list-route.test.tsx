import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { BookmarkListRoute } from "./bookmark-list-route";

test("BookmarkListRoute", () => {
  test("renders name", async () => {
    const { getByText, getByRole } = render(<BookmarkListRoute />);

    await expect.element(getByText("Hello Vitest x1!")).toBeInTheDocument();
    await getByRole("button", { name: "Increment " }).click();

    await expect.element(getByText("Hello Vitest x2!")).toBeInTheDocument();
  });
});
