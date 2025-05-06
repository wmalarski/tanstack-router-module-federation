import { describe, expect, test, vitest } from "vitest";
import { FormLayout } from "./form-layout";

vitest.mock("bookmarks/bookmarks-route-tree", () => ({
  getBookmarksRouteTree: () => null,
}));

vitest.mock("tags/tags-route-tree", () => ({
  getTagsRouteTree: () => null,
}));

describe("form-layout", () => {
  test("renders", async () => {
    expect(FormLayout).not.toBeNull();
  });
});
