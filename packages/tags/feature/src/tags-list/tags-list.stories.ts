import type { Meta, StoryObj } from "@storybook/react";

import { TagsList } from "./tags-list";

const meta = {
  component: TagsList,
  parameters: { layout: "fullscreen" },
  title: "tags/feature/TagsList",
} satisfies Meta<typeof TagsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {};
