import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "./Button";

export default {
  component: Button,
  args: {
    children: "Click me",
  },
  // argTypes: { onClick: { action: "click " } },
} as ComponentMeta<typeof Button>;

export const Default: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);
