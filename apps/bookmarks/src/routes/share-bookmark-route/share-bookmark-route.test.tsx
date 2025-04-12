import { expect, it, test } from "vitest";
import { render } from "vitest-browser-react";
import { ShareBookmarkRoute } from "./share-bookmark-route";

test("ShareBookmarkRoute", () => {
  it("renders", async () => {
    const { getByText, getByRole } = render(<ShareBookmarkRoute />);

    await expect.element(getByText("Hello Vitest x1!")).toBeInTheDocument();
    await getByRole("button", { name: "Increment " }).click();

    await expect.element(getByText("Hello Vitest x2!")).toBeInTheDocument();
  });
});
