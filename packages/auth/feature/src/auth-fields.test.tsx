import { describe, expect, test } from "vitest";
import { AuthFields } from "./auth-fields";

describe("auth-fields", () => {
  test("renders", async () => {
    expect(AuthFields).not.toBeNull();
  });
});
