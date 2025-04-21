import { describe, expect, test } from "vitest";
import { deleteTagMutationOptions } from "./index";

describe("tags data access", () => {
  test("deleteTagMutationOptions", async () => {
    expect(deleteTagMutationOptions).not.toBeNull();
  });
});
