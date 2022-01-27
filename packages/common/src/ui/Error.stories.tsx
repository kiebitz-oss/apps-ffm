import type { ComponentMeta, ComponentStory } from "@storybook/react";
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
