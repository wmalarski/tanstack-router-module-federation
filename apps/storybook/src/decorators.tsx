import type { Decorator } from "@storybook/react";
import { TestWrapper } from "@trmf/tests-util/test-wrapper";

export const ContextDecorator: Decorator = (Story) => {
  return (
    <TestWrapper>
      <Story />
    </TestWrapper>
  );
};
