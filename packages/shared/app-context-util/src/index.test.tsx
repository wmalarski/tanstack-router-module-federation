import { describe, expect, test } from "vitest";
import { AppContextLayout } from "./index";

describe("app-context-util", () => {
  test("renders", async () => {
    expect(AppContextLayout).not.toBeNull();
  });
});
