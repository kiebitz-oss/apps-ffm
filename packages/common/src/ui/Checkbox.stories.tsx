import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Checkbox } from "./Checkbox";

export default {
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

export const Default: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);
