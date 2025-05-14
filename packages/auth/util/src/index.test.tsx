import type { User } from "@supabase/supabase-js";
import { createMockUser } from "@trmf/auth-mocks";
import { describe, expect, test } from "vitest";

describe("UserContext", () => {
  test("renders name", async () => {
    const user: User = createMockUser();
    expect(user).toBeDefined();
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
