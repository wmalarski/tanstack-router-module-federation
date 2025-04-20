import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { UserContext, useUser } from "./index";
import type { User } from "@supabase/supabase-js";

test("UserContext", () => {
  test("renders name", async () => {
    const user: User = createMoc;

    const { getByText, getByRole } = render(
      <UserContext value={{ user }}>
        <Component />
      </UserContext>,
    );

    await expect.element(getByText("Hello Vitest x1!")).toBeInTheDocument();
    await getByRole("button", { name: "Increment " }).click();

    await expect.element(getByText("Hello Vitest x2!")).toBeInTheDocument();
  });
});

const Component = () => {
  const user = useUser();

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};
