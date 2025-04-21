import { describe, expect, test } from "vitest";
import { insertBookmarkMutationOptions } from "./index";

describe("bookmarks data access", () => {
  test("insertBookmarkMutationOptions", async () => {
    expect(insertBookmarkMutationOptions).not.toBeNull();
  });
});
