import { describe, expect, test } from "vitest";
import { TagsList } from "./tags-list";

describe("tags-list", () => {
  test("renders", async () => {
    expect(TagsList).not.toBeNull();
  });
});
