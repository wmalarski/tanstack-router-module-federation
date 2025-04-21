import { describe, expect, test } from "vitest";
import { getPostgrestData } from "./index";

describe("supabase utils", () => {
  test("getPostgrestData", async () => {
    expect(getPostgrestData).not.toBeNull();
  });
});
