import type { Preview } from "@storybook/react";
import { ContextDecorator } from "../src/decorators";

const preview: Preview = {
  decorators: [ContextDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
