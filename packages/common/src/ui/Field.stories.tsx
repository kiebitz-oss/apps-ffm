import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Field } from "./Field";

export default {
  component: Field,
  args: {
    name: "field",
    children: "Field",
  },
} as ComponentMeta<typeof Field>;

export const Default: ComponentStory<typeof Field> = (args) => (
  <Field {...args} />
);
