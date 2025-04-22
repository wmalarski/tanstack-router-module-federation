import { describe, expect, test } from "vitest";
import { TagsListRoute } from "./tags-list-route";

describe("tags-list-route", () => {
  test("renders", async () => {
    expect(TagsListRoute).not.toBeNull();
  });
});
