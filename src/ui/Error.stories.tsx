import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Error } from "./Error";

export default {
  component: Error,
  args: {
    children: "Errormessage",
  },
} as ComponentMeta<typeof Error>;

export const Default: ComponentStory<typeof Error> = (args) => (
  <Error {...args} />
);
