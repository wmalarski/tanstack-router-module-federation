import type { User } from "@supabase/supabase-js";
import { expect, test } from "vitest";
import { createMockUser } from "./index";

test("auth mocks", () => {
  test("creates mock user", async () => {
    const user: User = createMockUser();
    expect(user).not.toBeNull();
  });
});
