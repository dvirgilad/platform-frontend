import type { Meta, StoryObj } from "@storybook/react";

import Card from "./Card";
import { fn } from "@storybook/test";
import { TestRouter } from "cypress/TestRouter";
import CappMenuItems from "@components/applications/application/CappMenuItems";

const projectName = "Project";
const cappName = "example";

const meta = {
  component: Card,
  decorators: [
    (Story) => (
      <TestRouter>
        <Story />
      </TestRouter>
    ),
  ],
  parameters: {
    backgrounds: {
      default: "mono/basic-13",
    },
    args: { onClick: fn() },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div>deployment link</div>,
    menuChildren: (
      <CappMenuItems projectName={projectName} applicationName={cappName} />
    ),
  },
};
