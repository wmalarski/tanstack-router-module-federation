import { expect, test } from "vitest";
import { createMockUser } from "./index";
import type { User } from "@supabase/supabase-js";

test("auth mocks", () => {
  test("creates mock user", async () => {
    const user: User = createMockUser();
    expect(user).not.toBeNull();
  });
});
