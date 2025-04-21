import { describe, expect, test } from "vitest";
import { useCallbackRef } from "./use-callback-ref";

describe("useCallbackRef", () => {
  test("useCallbackRef", async () => {
    expect(useCallbackRef).not.toBeNull();
  });
});
