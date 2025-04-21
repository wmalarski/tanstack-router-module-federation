import type { User } from "@supabase/supabase-js";
import { describe, expect, test } from "vitest";
import { createMockUser } from "./index";

describe("auth mocks", () => {
  test("creates mock user", async () => {
    const user: User = createMockUser();
    expect(user).not.toBeNull();
  });
});
