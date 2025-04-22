import { describe, expect, test } from "vitest";
import { TopNavbar } from "./top-navbar";

describe("top-navbar", () => {
  test("renders", async () => {
    expect(TopNavbar).not.toBeNull();
  });
});
