import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Input } from "./Input";

export default {
  component: Input,
} as ComponentMeta<typeof Input>;

export const Default: ComponentStory<typeof Input> = (args) => (
  <Input {...args} />
);
