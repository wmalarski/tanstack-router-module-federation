import { describe, expect, test } from "vitest";
import { getUserQueryOptions } from "./index";

describe("auth data access", () => {
  test("getUserQueryOptions", async () => {
    expect(getUserQueryOptions).not.toBeNull();
  });
});
