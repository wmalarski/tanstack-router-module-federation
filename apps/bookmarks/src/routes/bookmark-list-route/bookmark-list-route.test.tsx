import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { BookmarkListRoute } from "./bookmark-list-route";
import { TestWrapper } from "@trmf/tests-util/test-wrapper";

describe("BookmarkListRoute", () => {
  test("renders name", async () => {
    const { baseElement } = render(
      <TestWrapper>
        <BookmarkListRoute />
      </TestWrapper>,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
