import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./tooltip";

const meta = {
  title: "Example/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Tooltip>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    renderReference: (props) => {
      console.log(props);

      return <div {...props}>Hover on Me</div>;
    },
    renderFloating: (props) => {
      console.log(props);

      return <Tooltip.Balloon {...props}>Hello!</Tooltip.Balloon>;
    },
  },
};

export default meta;
