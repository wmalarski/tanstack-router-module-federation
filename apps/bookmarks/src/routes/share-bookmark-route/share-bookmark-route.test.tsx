import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { ShareBookmarkRoute } from "./share-bookmark-route";
import { TestWrapper } from "@trmf/tests-util/test-wrapper";

describe("ShareBookmarkRoute", () => {
  it("renders", async () => {
    const { baseElement } = render(
      <TestWrapper>
        <ShareBookmarkRoute />
      </TestWrapper>,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
