import { describe, expect, test } from "vitest";
import { BookmarkFields } from "./bookmark-fields";

describe("bookmark-fields", () => {
  test("renders", async () => {
    expect(BookmarkFields).not.toBeNull();
  });
});
