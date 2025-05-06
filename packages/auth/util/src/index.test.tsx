import type { User } from "@supabase/supabase-js";
import { createMockUser } from "@trmf/auth-mocks";
import { describe, expect, test } from "vitest";
import { UserContext, useUser } from "./index";

describe("UserContext", () => {
  test("renders name", async () => {
    const user: User = createMockUser();

    // const { getByText, getByRole } = render(
    //   <UserContext value={{ user }}>
    //     <Component />
    //   </UserContext>,
    // );

    // await expect.element(getByText("Hello Vitest x1!")).toBeInTheDocument();
    // await getByRole("button", { name: "Increment " }).click();

    // await expect.element(getByText("Hello Vitest x2!")).toBeInTheDocument();
  });
});

const Component = () => {
  const user = useUser();

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};
