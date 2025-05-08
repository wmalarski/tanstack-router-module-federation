import type { Meta, StoryObj } from "@storybook/react";

import { TopNavbar } from "./top-navbar";

const meta = {
  args: {},
  component: TopNavbar,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  title: "shared/layout-feature/TopNavbar",
} satisfies Meta<typeof TopNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {},
};
